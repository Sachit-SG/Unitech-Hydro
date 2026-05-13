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
  GalleryFilterLabel,
} from "@/lib/gallery-data";
import { galleryFilterLabels } from "@/lib/gallery-data";

type GalleryProjectViewProps = {
  title: string;
  images: GalleryDetailImage[];
};

export function GalleryProjectView({ title, images }: GalleryProjectViewProps) {
  const [category, setCategory] = useState<GalleryFilterLabel>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = useMemo(() => {
    if (category === "All") return images;
    return images.filter((img) => img.category === category);
  }, [images, category]);

  const slides = useMemo(
    () => filtered.map((img) => ({ src: img.src, alt: img.alt })),
    [filtered],
  );

  useEffect(() => {
    setLightboxOpen(false);
    setLightboxIndex(0);
  }, [category]);

  const openAt = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Link
        href="/gallery"
        className="fixed left-4 top-20 z-[210] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00EAFF] shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-[#00EAFF]/40 hover:bg-black/60 hover:text-white md:left-6 md:top-24"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Back to gallery
      </Link>

      <header className="border-b border-white/10 px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-28">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        <nav
          className="mt-8 flex flex-wrap gap-2"
          aria-label="Photo categories"
        >
          {galleryFilterLabels.map((label) => {
            const active = category === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setCategory(label)}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-all",
                  active
                    ? "border-[#00EAFF] bg-[#00EAFF]/15 text-[#00EAFF]"
                    : "border-white/20 bg-white/5 text-white/70 hover:border-white/35 hover:text-white",
                )}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1800px] px-4 pb-16 pt-6 md:px-10 md:pb-24 md:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            role="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="columns-1 gap-x-4 md:columns-3 lg:columns-4"
          >
            {filtered.map((img, i) => (
              <motion.figure
                key={`${img.src}-${img.category}-${i}`}
                role="listitem"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: Math.min(i * 0.03, 0.24) }}
                className="mb-4 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => openAt(i)}
                  className="group relative w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-[#0B2043]/80 text-left shadow-md shadow-black/40 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#00EAFF]"
                >
                  <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-8">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#00EAFF]/90">
                      {img.category}
                    </span>
                  </figcaption>
                </button>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-white/55">
            No photos in this category yet.
          </p>
        ) : null}
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
