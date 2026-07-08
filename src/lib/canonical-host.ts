/** Primary public hostname — used for SEO, sitemap, and redirects. */
export const CANONICAL_HOST = "unitechhydropower.com";

/** Hostnames that should 308-redirect to the canonical site. */
const ALTERNATE_HOSTS = new Set([
  "www.unitechhydropower.com",
  "unitechhydropower.com.np",
  "www.unitechhydropower.com.np",
]);

export function getRequestHost(request: Request): string | null {
  const raw = request.headers.get("host");
  if (!raw) return null;
  return raw.split(":")[0]?.toLowerCase() ?? null;
}

export function isAlternateHost(host: string | null): boolean {
  return host != null && ALTERNATE_HOSTS.has(host);
}
