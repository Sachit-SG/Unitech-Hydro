import type { Post } from "@/lib/repos";

export type PublicBlogArticle = {
  id: string;
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

/** Map a published DB post for /news and the homepage carousel. */
export function mapPostToArticle(post: Post): PublicBlogArticle {
  return {
    id: post.id,
    category: post.category,
    date: formatDate(post.published_at),
    title: post.title,
    excerpt: post.excerpt ?? "",
    image: post.cover_url ?? "/gallery/overview-1.jpeg",
    href: post.external_url ?? "/news",
  };
}

export function mapPostsToArticles(posts: Post[]): PublicBlogArticle[] {
  return posts.map(mapPostToArticle);
}
