"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/cn";
import type { PublicBlogArticle } from "@/lib/blog-public";
import { NewsArticleGrid } from "@/components/news/news-article-grid";
import { Reveal } from "@/components/ui/reveal";

type View = "blog" | "news";

type BlogNewsFeedProps = {
  blogArticles: PublicBlogArticle[];
  newsArticles: PublicBlogArticle[];
};

const tabs: { id: View; label: string }[] = [
  { id: "blog", label: "Blog" },
  { id: "news", label: "News" },
];

function BlogNewsFeedInner({ blogArticles, newsArticles }: BlogNewsFeedProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view: View = searchParams.get("view") === "news" ? "news" : "blog";

  const articles = view === "blog" ? blogArticles : newsArticles;
  const emptyMessage =
    view === "blog" ?
      "No blog posts yet. Write and publish articles in Admin → Blog."
    : "No news links yet. Add external news in Admin → News.";

  function setView(next: View) {
    router.replace(next === "news" ? "/blog?view=news" : "/blog", { scroll: false });
  }

  return (
    <section className="py-28 first:pt-10">
      <Reveal className="flex flex-wrap items-center gap-6 border-b border-[#0A3A63]/12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setView(tab.id)}
            className={cn(
              "border-b-2 px-1 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
              tab.id === view ?
                "border-[#22D3EE] text-[#0A3A63]"
              : "border-transparent text-brand-slate/60 hover:text-[#0A3A63]",
            )}
            aria-pressed={tab.id === view}
          >
            {tab.label}
          </button>
        ))}
      </Reveal>

      <div className="mt-10">
        <NewsArticleGrid articles={articles} emptyMessage={emptyMessage} />
      </div>
    </section>
  );
}

export function BlogNewsFeed(props: BlogNewsFeedProps) {
  return (
    <Suspense
      fallback={
        <section className="py-28 first:pt-10">
          <p className="text-center text-brand-slate/70">Loading…</p>
        </section>
      }
    >
      <BlogNewsFeedInner {...props} />
    </Suspense>
  );
}
