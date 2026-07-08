import { ValidationError } from "@/lib/validation-error";

const MAX_DATA_URL_CHARS = 1_500_000;

const DATA_URL_PREFIXES = [
  "data:image/jpeg;base64,",
  "data:image/png;base64,",
  "data:image/webp;base64,",
] as const;

/** Restrict uploaded/stored images to site paths or compressed data URLs. */
export function assertSafeImageSrc(src: string, opts?: { optional?: boolean }): string | null {
  const trimmed = src.trim();
  if (!trimmed) {
    if (opts?.optional) return null;
    throw new ValidationError("Image is required.");
  }

  if (trimmed.startsWith("/")) {
    if (trimmed.includes("..") || trimmed.includes("\\")) {
      throw new ValidationError("Invalid image path.");
    }
    if (!/^\/[a-zA-Z0-9/_.-]+$/.test(trimmed)) {
      throw new ValidationError("Invalid image path.");
    }
    return trimmed;
  }

  const hasAllowedPrefix = DATA_URL_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
  if (!hasAllowedPrefix) {
    throw new ValidationError("Only JPEG, PNG, or WebP images are allowed.");
  }
  if (trimmed.length > MAX_DATA_URL_CHARS) {
    throw new ValidationError("Image file is too large. Use a smaller image.");
  }

  return trimmed;
}
