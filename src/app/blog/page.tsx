import { PageShell } from "@/components/page-shell";
import { BlogNewsFeed } from "@/components/news/blog-news-feed";
import { mapPostsToArticles } from "@/lib/blog-public";
import { dbReady, listPosts } from "@/lib/repos";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog & News",
  description:
    "Articles, press releases, and notices — Unitech Hydropower Company Limited.",
};

export default async function BlogPage() {
  let blogArticles: ReturnType<typeof mapPostsToArticles> = [];
  let newsArticles: ReturnType<typeof mapPostsToArticles> = [];

  if (dbReady()) {
    try {
      const [blogPosts, newsPosts] = await Promise.all([
        listPosts({ publishedOnly: true, category: "Blog" }),
        listPosts({ publishedOnly: true, category: "News" }),
      ]);
      blogArticles = mapPostsToArticles(blogPosts);
      newsArticles = mapPostsToArticles(newsPosts);
    } catch {
      blogArticles = [];
      newsArticles = [];
    }
  }

  return (
    <PageShell title="Blog & News">
      <BlogNewsFeed blogArticles={blogArticles} newsArticles={newsArticles} />
    </PageShell>
  );
}
