import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon Postgres client (HTTP driver — works on Node dev and Cloudflare Workers).
 * DATABASE_URL comes from `.env.local` in dev, and a Cloudflare secret in production.
 *
 * Lazy on purpose: importing this module never throws, so callers can try/catch and
 * fall back to static data until Neon is connected.
 *
 *   import { getSql, isDbConfigured } from "@/lib/db";
 *   if (isDbConfigured()) {
 *     const rows = await getSql()`select * from posts where status = 'published'`;
 *   }
 */
let cached: NeonQueryFunction<false, false> | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql(): NeonQueryFunction<false, false> {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (dev) or a Cloudflare secret (prod).",
    );
  }
  cached = neon(url);
  return cached;
}
