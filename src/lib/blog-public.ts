import type { Post } from "@/lib/repos";
import { safePublicHttpUrl } from "@/lib/safe-url";

export type PublicBlogArticle = {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatArticleDateLong(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function articleHref(post: Post): string {
  const external = safePublicHttpUrl(post.external_url);
  if (external) return external;
  if (post.category === "Blog") return `/blog/${post.slug}`;
  return `/news/${post.slug}`;
}

/** Map a published DB post for /news and the homepage carousel. */
export function mapPostToArticle(post: Post): PublicBlogArticle {
  return {
    id: post.id,
    slug: post.slug,
    category: post.category,
    date: formatDate(post.published_at),
    title: post.title,
    excerpt: post.excerpt ?? "",
    image: post.cover_url ?? "/gallery/overview-1.jpeg",
    href: articleHref(post),
  };
}

export function mapPostsToArticles(posts: Post[]): PublicBlogArticle[] {
  return posts.map(mapPostToArticle);
}

/** Split stored body text into paragraphs for article pages. */
export function splitArticleBody(body: string | null | undefined): string[] {
  if (!body?.trim()) return [];
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
