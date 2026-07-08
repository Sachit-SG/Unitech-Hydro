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

export function NewsArticleGrid({
  articles,
  emptyMessage = "No published posts yet.",
}: NewsArticleGridProps) {
  if (articles.length === 0) {
    return <p className="text-center text-brand-slate/70">{emptyMessage}</p>;
  }

  return (
    <Reveal className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((a) => {
        const external = a.href.startsWith("http");
        return (
          <Link
            key={a.id}
            href={a.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.22),0_12px_34px_-18px_rgba(10,31,51,0.28)]"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-[4px]">
              <PostCoverImage
                src={a.image}
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
                  {a.category}
                </p>
                <p className="text-xs text-brand-slate/60">{a.date}</p>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-brand-blue">
                {a.title}
              </h3>
              {a.excerpt ?
                <p className="mt-3 font-sans text-sm leading-relaxed text-brand-slate/80">
                  {a.excerpt}
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
      })}
    </Reveal>
  );
}
