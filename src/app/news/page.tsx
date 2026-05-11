import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "News",
  description:
    "News and notices — Unitech Hydropower Company Limited.",
};

const HERO_NEWS =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2400&q=80";

const filters = ["All", "Corporate", "Projects", "Reports"] as const;

const articles = [
  {
    category: "Corporate",
    date: "May 2026",
    title: "Corporate updates and disclosures",
    excerpt:
      "Placeholder for official notices, governance updates, and investor communications aligned to approved releases.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Projects",
    date: "May 2026",
    title: "Upper Phawa operational highlights",
    excerpt:
      "Placeholder for operational milestones and plant notices once cleared for public publication.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Reports",
    date: "May 2026",
    title: "Reports & presentations archive",
    excerpt:
      "Placeholder for public-facing reports and presentations (AGM extracts, summaries, and filings).",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Corporate",
    date: "Apr 2026",
    title: "Governance and leadership updates",
    excerpt:
      "Placeholder for board notices and corporate governance items after filing confirmation.",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export default function NewsPage() {
  return (
    <PageShell
      title="News"
      subtitle="Notices, AGM materials, and corporate updates will appear here as they are published."
      heroImageSrc={HERO_NEWS}
      heroOverlayClassName="bg-black/45"
    >
      <section className="py-28 first:pt-10">
        <div className="flex flex-wrap items-center gap-2 rounded-[4px] border border-slate-200/80 bg-white p-3 shadow-sm">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={cn(
                "rounded-[4px] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                f === "All"
                  ? "bg-brand-blue text-white"
                  : "text-brand-slate hover:bg-slate-50 hover:text-brand-blue",
              )}
              aria-pressed={f === "All"}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={`${a.category}-${a.title}`}
              href="#"
              className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.22),0_12px_34px_-18px_rgba(0,26,51,0.28)]"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-[4px]">
                <Image
                  src={a.image}
                  alt=""
                  role="presentation"
                  fill
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
        </div>
      </section>
    </PageShell>
  );
}
