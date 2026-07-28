"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PublicBlogArticle } from "@/lib/blog-public";
import { Reveal } from "@/components/ui/reveal";
import { PostCoverImage } from "@/components/news/post-cover-image";

type NewsArticleGridProps = {
  articles: PublicBlogArticle[];
  emptyMessage?: string;
};

function isExternal(href: string): boolean {
  return href.startsWith("http");
}

function FeaturedArticleCard({ article }: { article: PublicBlogArticle }) {
  const external = isExternal(article.href);
  return (
    <Link
      href={article.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative block h-[360px] w-full overflow-hidden rounded-xl md:h-[440px]"
    >
      <PostCoverImage
        src={article.image}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#22D3EE] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A3A63]">
            Latest {article.category}
          </span>
          <span className="text-xs font-semibold text-white/70">{article.date}</span>
        </div>
        <h2 className="mt-4 max-w-3xl font-heading text-2xl font-bold leading-tight text-white md:text-4xl">
          {article.title}
        </h2>
        {article.excerpt ?
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            {article.excerpt}
          </p>
        : null}
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-[#22D3EE]">
          {external ? "Open link" : "Read article"}
        </p>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: PublicBlogArticle }) {
  const external = isExternal(article.href);
  return (
    <Link
      href={article.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.22),0_12px_34px_-18px_rgba(10,31,51,0.28)]"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-t-[4px]">
        <PostCoverImage
          src={article.image}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 30vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-cyan">
            {article.category}
          </p>
          <p className="text-xs text-brand-slate/60">{article.date}</p>
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-brand-blue">
          {article.title}
        </h3>
        {article.excerpt ?
          <p className="mt-3 font-sans text-sm leading-relaxed text-brand-slate/80">
            {article.excerpt}
          </p>
        : null}
        <p
          className={cn(
            "mt-6 text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-cyan",
          )}
        >
          {external ? "Open link" : "Read article"}
        </p>
      </div>
    </Link>
  );
}

export function NewsArticleGrid({
  articles,
  emptyMessage = "No published posts yet.",
}: NewsArticleGridProps) {
  if (articles.length === 0) {
    return <p className="text-center text-brand-slate/70">{emptyMessage}</p>;
  }

  const [featured, ...rest] = articles;

  return (
    <div className="space-y-10">
      <Reveal>
        <FeaturedArticleCard article={featured} />
      </Reveal>
      {rest.length > 0 ?
        <Reveal delay={0.1} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </Reveal>
      : null}
    </div>
  );
}
