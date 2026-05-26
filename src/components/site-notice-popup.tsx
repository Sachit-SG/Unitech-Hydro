"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

const POPUP_IMAGES_KEY = "unitech_popup_images_v1";

// Dismissal persists across route changes, but resets on full page refresh.
let dismissed = false;

function safeParseImages(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v) => typeof v === "string" && v.length > 0);
  } catch {
    return [];
  }
}

export function SiteNoticePopup() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [images, setImages] = useState<string[] | null>(null);
  const [isDismissed, setIsDismissed] = useState(dismissed);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = safeParseImages(window.localStorage.getItem(POPUP_IMAGES_KEY));
    setImages(stored);
  }, []);

  // Keep the carousel index valid if images are changed in admin.
  useEffect(() => {
    if (!images) return;
    setActiveIndex((i) => Math.min(i, Math.max(0, images.length - 1)));
  }, [images]);

  const canShow = useMemo(() => {
    return isHome && Boolean(images?.length) && !isDismissed;
  }, [isHome, images, isDismissed]);

  if (!canShow) return null;
  if (!images || images.length === 0) return null;

  const current = images[activeIndex]!;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-20 z-[210] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-xl backdrop-blur-md">
          <div className="flex items-start justify-between gap-4 p-4 md:p-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                  Notice
                </p>
                {images.length > 1 ? (
                  <p className="text-xs text-brand-slate/60">
                    {activeIndex + 1}/{images.length}
                  </p>
                ) : null}
              </div>

              <div className="mt-3 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#0B2043]/5">
                <img
                  src={current}
                  alt="Notice image"
                  className="h-full w-full object-cover"
                />
              </div>

              {images.length > 1 ? (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className={cn(
                      "rounded-full p-2 text-[#0B2043] transition-colors hover:bg-slate-100",
                      activeIndex === 0 && "opacity-40 hover:bg-transparent"
                    )}
                    onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                    aria-label="Previous notice"
                    disabled={activeIndex === 0}
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>

                  <div className="flex items-center gap-2">
                    {images.map((_, idx) => (
                      <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        className={cn(
                          "h-1.5 w-6 rounded-full transition-colors",
                          idx === activeIndex ? "bg-brand-cyan" : "bg-slate-200"
                        )}
                        aria-hidden
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className={cn(
                      "rounded-full p-2 text-[#0B2043] transition-colors hover:bg-slate-100",
                      activeIndex === images.length - 1 &&
                        "opacity-40 hover:bg-transparent"
                    )}
                    onClick={() =>
                      setActiveIndex((i) =>
                        Math.min(images.length - 1, i + 1)
                      )
                    }
                    aria-label="Next notice"
                    disabled={activeIndex === images.length - 1}
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => {
                dismissed = true;
                setIsDismissed(true);
              }}
              className="rounded-full p-2 text-[#0B2043] transition-colors hover:bg-slate-100"
              aria-label="Collapse notice popup"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

