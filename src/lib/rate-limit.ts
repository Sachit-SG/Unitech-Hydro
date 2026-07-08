import "server-only";
import { getSql, isDbConfigured } from "@/lib/db";

type Bucket = { hits: number; resetAt: number };

const memoryBuckets = new Map<string, Bucket>();

export function getClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";

  return "unknown";
}

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

async function checkRateLimitDb(
  bucketKey: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult | null> {
  if (!isDbConfigured()) return null;

  try {
    const sql = getSql();
    const rows = (await sql`
      insert into rate_limit_buckets as b (bucket_key, hits, reset_at)
      values (
        ${bucketKey},
        1,
        now() + (${windowSeconds} * interval '1 second')
      )
      on conflict (bucket_key) do update set
        hits = case
          when b.reset_at <= now() then 1
          else b.hits + 1
        end,
        reset_at = case
          when b.reset_at <= now() then now() + (${windowSeconds} * interval '1 second')
          else b.reset_at
        end
      returning hits, extract(epoch from (reset_at - now()))::int as retry_after
    `) as { hits: number; retry_after: number }[];

    const row = rows[0];
    if (!row) return { allowed: true };

    if (row.hits > limit) {
      return { allowed: false, retryAfterSeconds: Math.max(1, row.retry_after) };
    }
    return { allowed: true };
  } catch (err) {
    console.error("[rate-limit] db fallback to memory", err);
    return null;
  }
}

function checkRateLimitMemory(
  bucketKey: string,
  limit: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  const existing = memoryBuckets.get(bucketKey);

  if (!existing || existing.resetAt <= now) {
    memoryBuckets.set(bucketKey, { hits: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true };
  }

  existing.hits += 1;
  if (existing.hits > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }
  return { allowed: true };
}

export async function checkRateLimit(
  bucketKey: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const dbResult = await checkRateLimitDb(bucketKey, limit, windowSeconds);
  if (dbResult) return dbResult;
  return checkRateLimitMemory(bucketKey, limit, windowSeconds);
}

export async function enforceRateLimit(
  request: Request,
  namespace: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const ip = getClientIp(request);
  return checkRateLimit(`${namespace}:${ip}`, limit, windowSeconds);
}
