import { PageShell } from "@/components/page-shell";
import { NewsArticleGrid } from "@/components/news/news-article-grid";
import { mapPostsToArticles } from "@/lib/blog-public";
import { dbReady, listPosts } from "@/lib/repos";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News",
  description: "News and notices — Unitech Hydropower Company Limited.",
};

export default async function NewsPage() {
  let articles: ReturnType<typeof mapPostsToArticles> = [];
  if (dbReady()) {
    try {
      articles = mapPostsToArticles(await listPosts({ publishedOnly: true }));
    } catch {
      articles = [];
    }
  }

  return (
    <PageShell title="News">
      <section className="py-28 first:pt-10">
        {articles.length === 0 ?
          <p className="text-center text-brand-slate/70">
            No published posts yet. Add them in the admin Blog tab.
          </p>
        : <NewsArticleGrid articles={articles} />}
      </section>
    </PageShell>
  );
}
