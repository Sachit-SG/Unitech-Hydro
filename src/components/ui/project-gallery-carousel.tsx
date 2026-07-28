"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type GallerySlide = {
  src: string;
  alt: string;
};

const INTERVAL_MS = 5000;

export function ProjectGalleryCarousel({
  slides,
  className,
}: {
  slides: GallerySlide[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const n = slides.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((prev) => (prev + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (n <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % n);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [n]);

  if (n === 0) return null;

  return (
    <div
      className={cn(
        "group relative isolate h-full min-h-[280px] w-full overflow-hidden rounded-xl bg-slate-200 shadow-lg shadow-brand-blue/10",
        className,
      )}
    >
      <div className="relative h-full min-h-[280px] w-full">
        {slides.map((slide, i) => (
          <Image
            key={`${slide.src}-${i}`}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className={cn(
              "object-cover object-center transition-opacity duration-500",
              i === index ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
            priority={i === 0}
            aria-hidden={i !== index}
          />
        ))}
        <div
          className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-tr from-black/25 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      {n > 1 ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 inset-y-0 z-20 flex items-center justify-between px-3",
            "opacity-0 transition-opacity duration-200",
            "group-hover:pointer-events-auto group-hover:opacity-100",
            "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
          )}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            className="pointer-events-auto rounded-[4px] border border-white/25 bg-black/50 p-2.5 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline focus-visible:ring-2 focus-visible:ring-brand-cyan"
            aria-label="Previous project image"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="pointer-events-auto rounded-[4px] border border-white/25 bg-black/50 p-2.5 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline focus-visible:ring-2 focus-visible:ring-brand-cyan"
            aria-label="Next project image"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}

      {n > 1 ? (
        <div
          className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden
        >
          {slides.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-white/50",
                i === index && "bg-brand-cyan w-4",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
