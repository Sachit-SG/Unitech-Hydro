"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { PublicBlogArticle } from "@/lib/blog-public";
import { Reveal } from "@/components/ui/reveal";
import { PostCoverImage } from "@/components/news/post-cover-image";

const filters = ["All", "Corporate", "Projects", "Reports"] as const;
type Filter = (typeof filters)[number];

type NewsArticleGridProps = {
  articles: PublicBlogArticle[];
};

export function NewsArticleGrid({ articles }: NewsArticleGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return articles;
    return articles.filter((a) => a.category === activeFilter);
  }, [articles, activeFilter]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-[4px] border border-slate-200/80 bg-white p-3 shadow-sm">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={cn(
              "rounded-[4px] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
              f === activeFilter
                ? "bg-brand-blue text-white"
                : "text-brand-slate hover:bg-slate-50 hover:text-brand-blue",
            )}
            aria-pressed={f === activeFilter}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ?
        <p className="mt-10 text-center text-brand-slate/70">
          No posts in this category yet.
        </p>
      : <Reveal className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((a) => (
            <Link
              key={a.id}
              href={a.href}
              {...(a.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
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
                <p className="mt-3 font-sans text-sm leading-relaxed text-brand-slate/80">
                  {a.excerpt}
                </p>
                <p className="mt-6 text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-cyan">
                  Read article
                </p>
              </div>
            </Link>
          ))}
        </Reveal>
      }
    </>
  );
}
