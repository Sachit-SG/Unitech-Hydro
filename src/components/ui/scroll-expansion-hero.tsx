"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";

/** Tagline split: part 1 + "Developing Nation" when the string matches; else midpoint words. */
function splitHeroTitle(full: string): [string, string] {
  const trimmed = full.trim();
  const marker = "Developing Nation";
  const idx = trimmed.lastIndexOf(marker);
  if (idx !== -1) {
    const left = trimmed.slice(0, idx).trimEnd();
    return [left, trimmed.slice(idx)];
  }
  const parts = trimmed.split(/\s+/);
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

export type ScrollExpandMediaProps = {
  mediaType: "image" | "video";
  mediaSrc: string;
  bgImageSrc: string;
  title: string;
  scrollToExpand: string;
  textBlend?: boolean;
  mediaAlt?: string;
  mediaPosterSrc?: string;
  bgAlt?: string;
};

export function ScrollExpandMedia({
  mediaType,
  mediaSrc,
  bgImageSrc,
  title,
  scrollToExpand,
  textBlend = false,
  mediaAlt = "Hydropower project — operational powerhouse",
  mediaPosterSrc,
  bgAlt = "High-altitude river and mountain landscape",
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobileState(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const CINEMATIC_HEIGHT_RATIO = 0.65;

  const mediaWidthPx = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) {
      if (typeof window !== "undefined") return window.innerWidth;
      return 1920;
    }
    const baseWidth = isMobileState ? 380 : 720;
    return baseWidth + p * (isMobileState ? 750 : 1600);
  });

  const mediaHeightPx = useTransform(
    mediaWidthPx,
    (w) => w * CINEMATIC_HEIGHT_RATIO,
  );

  const hintOpacity = useTransform(
    scrollYProgress,
    reduceMotion ? [0, 1] : [0, 0.2],
    reduceMotion ? [0, 0] : [1, 0],
  );
  const hintY = useTransform(
    scrollYProgress,
    reduceMotion ? [0, 1] : [0, 0.2],
    reduceMotion ? [0, 0] : [0, 12],
  );
  const textTranslateX = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return 0;
    return v * (isMobileState ? 60 : 80);
  });
  const titleLeftX = useTransform(textTranslateX, (t) => `-${t}%`);
  const titleRightX = useTransform(textTranslateX, (t) => `${t}%`);
  const titleOpacity = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return 1;
    return Math.max(0, 1 - v * 1.5);
  });

  const [titleLeft, titleRight] = splitHeroTitle(title);

  const titleHeadingClass = cn(
    "m-0 whitespace-nowrap text-center font-heading text-2xl font-extrabold leading-tight tracking-wider text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] md:text-4xl lg:text-5xl",
    textBlend && "mix-blend-difference",
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[240vh] w-full scroll-mt-0"
      aria-label="Hero"
    >
      <div className="sticky top-16 h-[calc(100svh-4rem)] w-full overflow-hidden bg-brand-blue">
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageSrc}
            alt={bgAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Base veil — push background back so foreground media reads as the hero */}
          <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
          {/* Cool wash — ties recess into River Blue without vintage grading */}
          <div
            className="pointer-events-none absolute inset-0 bg-brand-blue/25"
            aria-hidden
          />
          {/* Edge shadow: darker toward perimeter, slightly clearer at center (above video) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 92% 86% at 50% 46%, rgba(0, 0, 0, 0) 22%, rgba(0, 0, 0, 0.42) 62%, rgba(0, 0, 0, 0.78) 100%)",
            }}
            aria-hidden
          />
          {/* Corner vignette — extra depth at frame edges */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(85% 72% at 0% 0%, rgba(0, 0, 0, 0.4), transparent 50%),
                radial-gradient(85% 72% at 100% 0%, rgba(0, 0, 0, 0.4), transparent 50%),
                radial-gradient(85% 72% at 0% 100%, rgba(0, 0, 0, 0.4), transparent 50%),
                radial-gradient(85% 72% at 100% 100%, rgba(0, 0, 0, 0.4), transparent 50%)
              `,
            }}
            aria-hidden
          />
        </div>

        <motion.div
          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-[0_28px_90px_rgba(0,0,0,0.42)] will-change-[width,height]"
          style={{
            width: mediaWidthPx,
            height: mediaHeightPx,
          }}
        >
          <div className="relative h-full w-full">
            {mediaType === "video" ? (
              <video
                key={mediaSrc}
                className="absolute inset-0 h-full w-full object-cover object-center"
                src={mediaSrc}
                poster={mediaPosterSrc}
                muted
                playsInline
                loop
                autoPlay
                preload="auto"
                aria-label={mediaAlt}
              />
            ) : (
              <Image
                src={mediaSrc}
                alt={mediaAlt}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </motion.div>

        <div className="pointer-events-none relative z-[25] h-full w-full">
          <div
            role="group"
            aria-label={title}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2"
          >
            <motion.h2
              className={titleHeadingClass}
              style={{ x: titleLeftX, opacity: titleOpacity }}
            >
              {titleLeft}
            </motion.h2>
            <motion.h2
              className={titleHeadingClass}
              style={{ x: titleRightX, opacity: titleOpacity }}
            >
              {titleRight}
            </motion.h2>
          </div>

          <motion.p
            className="absolute bottom-10 left-1/2 z-[27] -translate-x-1/2 px-4 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75 sm:bottom-12 sm:text-xs"
            style={{ opacity: hintOpacity, y: hintY }}
          >
            {scrollToExpand}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
