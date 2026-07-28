import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, adminSessionCookieOptions } from "@/lib/admin-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const cleared = { ...adminSessionCookieOptions(), maxAge: 0 };

  // Clear current cookie name
  res.cookies.set(ADMIN_SESSION_COOKIE, "", cleared);

  // Clear legacy name if present (pre-__Host- rollout)
  if (ADMIN_SESSION_COOKIE !== "admin_session") {
    res.cookies.set("admin_session", "", { ...cleared, secure: false });
  }

  return res;
}
