"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

let dismissed = false;

export function SiteNoticePopup() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [images, setImages] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(dismissed);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/popup", { cache: "no-store" });
        const data = (await res.json()) as { images?: unknown };
        const fromDb = Array.isArray(data.images)
          ? data.images.filter((s): s is string => typeof s === "string" && s.length > 0)
          : [];
        if (!cancelled) setImages(fromDb);
      } catch {
        if (!cancelled) setImages([]);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Reveal soon after the visitor starts scrolling (not deep into the hero).
  useEffect(() => {
    if (!isHome) return;
    if (typeof window === "undefined") return;
    const threshold = Math.min(120, window.innerHeight * 0.12);
    const onScroll = () => {
      if (window.scrollY > threshold) {
        setRevealed(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!images) return;
    setActiveIndex((i) => Math.min(i, Math.max(0, images.length - 1)));
  }, [images]);

  const canShow = useMemo(() => {
    return isHome && loaded && revealed && images.length > 0 && !isDismissed;
  }, [isHome, loaded, revealed, images.length, isDismissed]);

  const close = () => {
    dismissed = true;
    setIsDismissed(true);
  };

  const current = images.length > 0 ? images[activeIndex] : null;
  const multi = images.length > 1;

  return (
    <AnimatePresence>
      {canShow && current ?
        <motion.div
          key="notice-popup"
          className="fixed inset-0 z-[240] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            aria-label="Close notice"
            onClick={close}
            className="absolute inset-0 cursor-default bg-[#06233f]/55 backdrop-blur-[3px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-[min(94vw,920px)] max-h-[90vh] flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Notice"
          >
            <button
              type="button"
              onClick={close}
              className="absolute -right-1 -top-1 z-20 rounded-full bg-[#0A3A63]/90 p-2.5 text-white shadow-lg transition-colors hover:bg-[#0A3A63] sm:right-2 sm:top-2"
              aria-label="Close notice"
            >
              <X className="size-5" aria-hidden />
            </button>

            {/* Full-bleed image — no white card frame */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt="Notice"
              className="max-h-[85vh] w-full rounded-xl object-contain shadow-[0_24px_80px_-12px_rgba(6,35,63,0.65)]"
            />

            {multi ?
              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  className={cn(
                    "rounded-full bg-white/95 p-2.5 text-[#0A3A63] shadow-md transition-colors hover:bg-white",
                    activeIndex === 0 && "pointer-events-none opacity-40",
                  )}
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  aria-label="Previous notice"
                  disabled={activeIndex === 0}
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                  {activeIndex + 1} / {images.length}
                </p>
                <button
                  type="button"
                  className={cn(
                    "rounded-full bg-white/95 p-2.5 text-[#0A3A63] shadow-md transition-colors hover:bg-white",
                    activeIndex === images.length - 1 &&
                      "pointer-events-none opacity-40",
                  )}
                  onClick={() =>
                    setActiveIndex((i) => Math.min(images.length - 1, i + 1))
                  }
                  aria-label="Next notice"
                  disabled={activeIndex === images.length - 1}
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            : null}
          </motion.div>
        </motion.div>
      : null}
    </AnimatePresence>
  );
}
