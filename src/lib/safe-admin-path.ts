/**
 * Only allow post-login redirects to same-origin admin paths.
 * Blocks open redirects (`https://…`, `//evil`, `\evil`, etc.).
 */
export function safeAdminRedirectPath(raw: string | null | undefined): string {
  const fallback = "/admin";
  if (!raw) return fallback;

  // Reject absolute / protocol-relative / backslash tricks
  if (
    !raw.startsWith("/") ||
    raw.startsWith("//") ||
    raw.includes("://") ||
    raw.includes("\\") ||
    /%2f%2f/i.test(raw)
  ) {
    return fallback;
  }

  // Decode once and re-check (e.g. /%2f%2fevil.com)
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return fallback;
  }
  if (
    !decoded.startsWith("/") ||
    decoded.startsWith("//") ||
    decoded.includes("://") ||
    decoded.includes("\\")
  ) {
    return fallback;
  }

  const pathOnly = decoded.split(/[?#]/, 1)[0] ?? "";

  // Stay inside the admin surface (allow /admin?tab=…)
  if (pathOnly !== "/admin" && !pathOnly.startsWith("/admin/")) {
    return fallback;
  }

  // Block nested login loops with hostile next params
  if (pathOnly === "/admin/login" || pathOnly.startsWith("/admin/login/")) {
    return fallback;
  }

  return decoded;
}
