"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/reveal";

export type FeatureIconAccent = {
  inactive: { box: string; icon: string };
  active: { box: string; icon: string };
};

export type InteractiveFeature = {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  iconAccent: FeatureIconAccent;
};

type InteractiveFeaturesProps = {
  features: InteractiveFeature[];
  /** Tailwind background class for the active progress fill (e.g. `bg-[#22D3EE]`) */
  progressGradientLight?: string;
  /** Ms each feature stays active before auto-advancing */
  duration?: number;
  className?: string;
};

const AUTO_ADVANCE_MS = 6000;

export function InteractiveFeatures({
  features,
  progressGradientLight = "bg-[#22D3EE]",
  duration = AUTO_ADVANCE_MS,
  className,
}: InteractiveFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const selectFeature = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  // Deep-link: /about#vision or #mission opens the matching tab.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (!hash) return;
      const idx = features.findIndex((f) => f.title.toLowerCase().includes(hash));
      if (idx >= 0) {
        setActiveIndex(idx);
        setProgress(0);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [features]);

  useEffect(() => {
    if (features.length <= 1) return;

    setProgress(0);
    const tickMs = 50;
    const increment = (tickMs / duration) * 100;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          setActiveIndex((current) => (current + 1) % features.length);
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => window.clearInterval(interval);
  }, [activeIndex, duration, features.length]);

  const active = features[activeIndex];

  if (!active) return null;

  return (
    <div className={cn("w-full", className)}>
      <Reveal className="mb-10 md:mb-14">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#22D3EE]">About Us</p>
        <h2 className="mt-4 font-heading text-[1.65rem] font-bold leading-tight tracking-tight text-[#0A3A63] sm:text-3xl md:text-4xl lg:text-5xl lg:whitespace-nowrap">
          Clean Energy for Nepal&apos;s&nbsp;Future.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
        <ul className="flex flex-col gap-3" role="tablist" aria-label="Company pillars">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            const Icon = feature.icon;

            return (
              <li key={feature.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`feature-panel-${feature.id}`}
                  id={`feature-tab-${feature.id}`}
                  onClick={() => selectFeature(index)}
                  className={cn(
                    "w-full rounded-xl border p-5 text-left transition-all duration-300",
                    isActive
                      ? "border-[#0A3A63] bg-[#0A3A63] text-white shadow-lg shadow-[#0A3A63]/20"
                      : "border-slate-200/80 bg-white text-slate-500 shadow-sm hover:border-slate-300 hover:shadow-md"
                  )}
                >
                  {isActive ? (
                    <div
                      className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/15"
                      aria-hidden
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-75 ease-linear",
                          progressGradientLight
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  ) : null}

                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border shadow-sm",
                        isActive
                          ? feature.iconAccent.active.box
                          : feature.iconAccent.inactive.box
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isActive
                            ? feature.iconAccent.active.icon
                            : feature.iconAccent.inactive.icon
                        )}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block font-heading text-lg font-bold",
                          isActive ? "text-white" : "text-[#0A3A63]"
                        )}
                      >
                        {feature.title}
                      </span>
                      <span
                        className={cn(
                          "mt-2 block text-sm leading-relaxed",
                          isActive ? "text-slate-300" : "text-slate-500"
                        )}
                      >
                        {feature.description}
                      </span>
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="relative min-h-[280px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm sm:min-h-[360px] lg:min-h-[420px]"
          role="tabpanel"
          id={`feature-panel-${active.id}`}
          aria-labelledby={`feature-tab-${active.id}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={activeIndex === 0}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A3A63]/50 via-transparent to-transparent"
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
