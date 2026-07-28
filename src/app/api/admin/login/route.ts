import { NextResponse } from "next/server";
import {
  adminSessionCookieOptions,
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  passwordsMatch,
} from "@/lib/admin-session";
import { apiErrorResponse } from "@/lib/api-error";
import { enforceRateLimit } from "@/lib/rate-limit";

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

    let body: { password?: unknown };
    try {
      body = (await request.json()) as { password?: unknown };
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const password = typeof body.password === "string" ? body.password : "";
    if (!password || !passwordsMatch(password, secret)) {
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
