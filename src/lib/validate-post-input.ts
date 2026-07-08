import type { PostCategory, PostInput } from "@/lib/repos";
import { assertSafeImageSrc } from "@/lib/safe-image-src";
import { parsePublicHttpUrl } from "@/lib/safe-url";
import { ValidationError } from "@/lib/validation-error";

const ALLOWED_CATEGORIES: PostCategory[] = ["Blog", "News"];

export function sanitizePostInput(input: PostInput): PostInput {
  const title = input.title?.trim() ?? "";
  if (!title || title.length > 200) {
    throw new ValidationError("Title is required (max 200 characters).");
  }

  const category = input.category ?? "Blog";
  if (!ALLOWED_CATEGORIES.includes(category)) {
    throw new ValidationError("Invalid post category.");
  }

  const cover_url = assertSafeImageSrc(input.cover_url ?? "", { optional: true });

  let external_url: string | null = null;
  if (input.external_url?.trim()) {
    external_url = parsePublicHttpUrl(input.external_url);
  }

  if (category === "News" && input.status === "published" && !external_url) {
    throw new ValidationError("Published news items require an external https link.");
  }

  if (category === "Blog" && input.status === "published") {
    const body = input.body?.trim() ?? "";
    if (!body || body.length < 10) {
      throw new ValidationError("Published blog articles require content.");
    }
  }

  const body = input.body?.trim() || null;
  const excerpt =
    input.excerpt?.trim() ||
    (body ? body.slice(0, 280) : null) ||
    null;

  if (category === "Blog" && body && body.length > 100_000) {
    throw new ValidationError("Article content is too long.");
  }

  return {
    ...input,
    title,
    category,
    cover_url,
    external_url: category === "Blog" ? null : external_url,
    body: category === "Blog" ? body : null,
    excerpt: category === "News" ? null : excerpt,
  };
}
