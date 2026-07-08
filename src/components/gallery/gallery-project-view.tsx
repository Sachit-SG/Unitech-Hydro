"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import type {
  GalleryDetailImage,
} from "@/lib/gallery-data";
import { galleryBentoItems } from "@/lib/gallery-data";

type GalleryProjectViewProps = {
  projectId: string;
  title: string;
  images: GalleryDetailImage[];
};

export function GalleryProjectView({ projectId, title, images }: GalleryProjectViewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = useMemo(
    () => images.map((img) => ({ src: img.src, alt: img.alt })),
    [images],
  );

  useEffect(() => {
    setLightboxOpen(false);
    setLightboxIndex(0);
  }, [projectId]);

  const openAt = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05080f] via-black to-[#0A3A63]/35 text-white">
      <Link
        href="/gallery"
        className="fixed left-4 top-20 z-[210] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#22D3EE] shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-[#22D3EE]/40 hover:bg-black/60 hover:text-white md:left-6 md:top-24"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Back to gallery
      </Link>

      <header className="border-b border-white/10 px-6 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
        <div className="mx-auto w-full max-w-[1400px]">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 font-sans text-sm text-white/50">
            {images.length} photo{images.length === 1 ? "" : "s"}
          </p>
          <nav
            className="mt-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Gallery projects"
          >
            <div className="flex w-max min-w-0 flex-wrap gap-2 md:w-auto">
              {galleryBentoItems.map((item) => {
                const active = projectId === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/gallery/${item.id}`}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-all",
                      active
                        ? "border-[#22D3EE] bg-[#22D3EE]/15 text-[#22D3EE]"
                        : "border-white/20 bg-white/5 text-white/70 hover:border-white/35 hover:text-white",
                    )}
                  >
                    {item.projectName}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-8 md:px-10 md:pb-24 md:pt-10">
        <motion.ul
          role="list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
          className="w-full list-none gap-4 space-y-4 p-0 [column-gap:1rem] sm:columns-2 md:gap-5 lg:columns-3"
        >
          {images.map((img, i) => (
            <motion.li
              key={`${img.src}-${i}`}
              role="listitem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: Math.min(i * 0.03, 0.24) }}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => openAt(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-[#0A3A63]/80 text-left shadow-md shadow-black/40 outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.w ?? 1600}
                  height={img.h ?? 1200}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Caption reveals on hover */}
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-sans text-xs leading-snug text-white/90">
                    {img.alt}
                  </span>
                </figcaption>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </main>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        on={{
          view: ({ index: next }) => setLightboxIndex(next),
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.94)" },
        }}
        carousel={{ finite: true, preload: 1 }}
        animation={{ fade: 220 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  );
}
