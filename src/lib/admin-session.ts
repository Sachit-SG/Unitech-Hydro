import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

/** Prefer __Host- in production (Secure + Path=/ + no Domain). */
export const ADMIN_SESSION_COOKIE =
  process.env.NODE_ENV === "production" ? "__Host-admin_session" : "admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const MIN_SIGNING_SECRET_LENGTH = 32;

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SIGNING_SECRET?.trim();
  if (!secret || secret.length < MIN_SIGNING_SECRET_LENGTH) {
    throw new Error(
      `SESSION_SIGNING_SECRET must be set and at least ${MIN_SIGNING_SECRET_LENGTH} characters. Do not reuse ADMIN_SECRET.`,
    );
  }
  return new TextEncoder().encode(secret);
}

/** Digest both sides so length cannot be inferred from compare timing. */
export function passwordsMatch(input: string, secret: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(secret, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function createAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function verifyAdminSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
