import { ValidationError } from "@/lib/validation-error";

/** Allow only http(s) URLs for external news links and redirects. */
export function parsePublicHttpUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new ValidationError("A valid URL is required.");
  }
  if (trimmed.length > 2048) {
    throw new ValidationError("URL is too long.");
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new ValidationError("Please enter a valid URL (including https://).");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new ValidationError("URL must use http or https.");
  }

  return url.href;
}

export function safePublicHttpUrl(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    return parsePublicHttpUrl(raw);
  } catch {
    return null;
  }
}
