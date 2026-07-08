import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { mapPostToArticle } from "@/lib/blog-public";
import type { Post } from "@/lib/repos";
import { PostCoverImage } from "@/components/news/post-cover-image";

type RelatedNewsSidebarProps = {
  posts: Post[];
  currentSlug: string;
  listingHref?: string;
  heading?: string;
  seeAllLabel?: string;
};

export function RelatedNewsSidebar({
  posts,
  currentSlug,
  listingHref = "/news",
  heading = "Related News",
  seeAllLabel = "See all",
}: RelatedNewsSidebarProps) {
  const related = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3)
    .map(mapPostToArticle);

  if (related.length === 0) return null;

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <h2 className="font-heading text-lg font-bold text-brand-blue">{heading}</h2>
        <Link
          href={listingHref}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate/60 transition-colors hover:text-brand-cyan"
        >
          {seeAllLabel}
        </Link>
      </div>

      <ul className="mt-5 space-y-5">
        {related.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group block overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/50 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <PostCoverImage
                    src={item.image}
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="320px"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-cyan">
                      {item.category}
                    </span>
                    {external ?
                      <ExternalLink
                        className="size-3.5 shrink-0 text-brand-slate/45"
                        aria-hidden
                      />
                    : null}
                  </div>
                  <p className="font-heading text-sm font-bold leading-snug text-brand-blue group-hover:text-brand-cyan">
                    {item.title}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
