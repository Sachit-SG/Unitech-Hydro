import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  adminSessionCookieOptions,
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
} from "@/lib/admin-session";
import { apiErrorResponse } from "@/lib/api-error";
import { enforceRateLimit } from "@/lib/rate-limit";

function passwordsMatch(input: string, secret: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    const limit = await enforceRateLimit(request, "admin-login", 5, 15 * 60);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSeconds ?? 60) },
        },
      );
    }

    const secret = process.env.ADMIN_SECRET?.trim();
    if (!secret) {
      console.error("[admin-login] ADMIN_SECRET is not configured");
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as { password?: string };
    if (!body.password || !passwordsMatch(body.password, secret)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const sessionToken = await createAdminSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, adminSessionCookieOptions());
    return res;
  } catch (err) {
    return apiErrorResponse(err, "admin-login");
  }
}
