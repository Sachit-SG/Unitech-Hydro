import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

/** Digest both sides so length cannot be inferred from compare timing. */
export function passwordsMatch(input: string, secret: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(secret, "utf8").digest();
  return timingSafeEqual(a, b);
}
