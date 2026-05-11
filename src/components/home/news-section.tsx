"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

type NewsItem = {
  category: "Company Update" | "Project Milestone" | "Annual Report";
  date: string;
  title: string;
  excerpt: string;
  image: string;
};

const NEWS: NewsItem[] = [
  {
    category: "Company Update",
    date: "May 2026",
    title: "Corporate updates and disclosures",
    excerpt:
      "Placeholder stream for official notices, governance updates, and stakeholder communications.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Project Milestone",
    date: "May 2026",
    title: "Upper Phawa operational highlights",
    excerpt:
      "Placeholder for operational milestones, maintenance windows, and generation notices.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Annual Report",
    date: "May 2026",
    title: "Reports & presentations archive",
    excerpt:
      "Placeholder for investor-ready reports, presentations, and regulator-approved releases.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Company Update",
    date: "Apr 2026",
    title: "Leadership and governance notes",
    excerpt:
      "Placeholder for board notices and governance updates after filing confirmation.",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Project Milestone",
    date: "Mar 2026",
    title: "Development pipeline progress",
    excerpt:
      "Placeholder for feasibility-stage updates, permits, and transmission planning.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    category: "Annual Report",
    date: "Feb 2026",
    title: "Investor materials (public-ready)",
    excerpt:
      "Placeholder for prospectus-ready documents and approved summaries.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
  },
];

export function NewsSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.92;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const items = useMemo(() => NEWS, []);

  return (
    <section className="border-t border-slate-200/60 bg-slate-50 py-16">
      <div className="mx-auto max-w-[1440px] px-8 md:px-20">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <span
              className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan"
              aria-hidden
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                Newsroom
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
                Latest News &amp; Insights
              </h2>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-slate-200 bg-white text-brand-slate shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.18)]"
              aria-label="Previous news"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-slate-200 bg-white text-brand-slate shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.18)]"
              aria-label="Next news"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <motion.div
              key={`${item.category}-${item.title}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="min-h-[450px] snap-start"
            >
              <Link
                href="/news"
                className="group flex h-full flex-none w-[min(520px,92vw)] flex-col overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.22),0_12px_34px_-18px_rgba(0,26,51,0.28)] sm:w-[min(520px,72vw)] md:w-[min(520px,46vw)] lg:w-[440px] xl:w-[460px]"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-[4px]">
                  <Image
                    src={item.image}
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
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-cyan">
                      {item.category}
                    </p>
                    <p className="text-xs text-brand-slate/60">{item.date}</p>
                  </div>
                  <p className="mt-4 font-heading text-lg font-bold leading-snug text-brand-blue">
                    {item.title}
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-brand-slate/80">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto pt-6">
                    <p className="text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-cyan">
                      Read more
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-[4px] border border-slate-200 bg-white px-6 py-3 font-sans text-sm font-semibold text-brand-blue shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.18)]"
          >
            Explore All News →
          </Link>
        </div>
      </div>
    </section>
  );
}

