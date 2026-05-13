"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useCountUp(
  target: number,
  decimals: number,
  enabled: boolean,
  delay: number,
) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(
    decimals > 0 ? Number(0).toFixed(decimals) : "0",
  );

  useEffect(() => {
    if (!enabled) return;
    if (reduceMotion) {
      setText(
        decimals > 0
          ? target.toFixed(decimals)
          : Math.round(target).toString(),
      );
      return;
    }
    const controls = animate(0, target, {
      duration: decimals > 0 ? 1.45 : 1.25,
      delay,
      ease: easeOutExpo,
      onUpdate: (latest) =>
        setText(
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toString(),
        ),
    });
    return () => controls.stop();
  }, [enabled, target, decimals, delay, reduceMotion]);

  return text;
}

type TechnicalStatusBarProps = {
  dockedToHero?: boolean;
  /** Slim blue ribbon for in-flow hero placement (not pinned to viewport bottom). */
  heroRibbon?: boolean;
  /** Full-width strip directly under the hero — solid investment navy, no top gap. */
  postHero?: boolean;
  /** When set, gates count-up (e.g. reveal after scroll expansion completes). */
  countEnabled?: boolean;
  className?: string;
};

export function TechnicalStatusBar({
  dockedToHero = false,
  heroRibbon = false,
  postHero = false,
  countEnabled,
  className,
}: TechnicalStatusBarProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const countGate = countEnabled !== undefined ? countEnabled : inView;

  const operationalMw = useCountUp(5.8, 1, countGate, 0);
  const pipelineMw = useCountUp(15, 0, countGate, 0.1);

  const dockedVisual = dockedToHero || heroRibbon || postHero;

  return (
    <section
      ref={ref}
      className={cn(
        postHero
          ? "relative z-10 mt-0 w-full border-t border-white/10 bg-[#0B2043] py-6 md:py-5"
          : dockedToHero
            ? "absolute bottom-0 left-0 right-0 z-30 border-t border-white/15 backdrop-blur-lg"
            : heroRibbon
              ? "relative z-30 w-full border-t border-white/15 backdrop-blur-lg"
              : "rounded-[4px] border-y border-brand-slate/10 backdrop-blur-md",
        !postHero && (dockedToHero || heroRibbon) ? "bg-brand-blue/80 h-20" : null,
        !postHero && !dockedToHero && !heroRibbon ? "bg-white/45 py-14" : null,
        className,
      )}
      aria-labelledby="technical-status-heading"
    >
      <h2 id="technical-status-heading" className="sr-only">
        Technical status
      </h2>
      <div
        className={cn(
          "mx-auto relative grid h-full max-w-[1440px] grid-cols-2 items-center px-8 md:px-20",
        )}
      >
        <div className="flex items-center justify-center text-center md:px-6">
          <div className="flex items-baseline gap-3 leading-none">
            <p
              className={cn(
                "font-heading text-3xl font-bold tabular-nums tracking-tight leading-none",
                dockedVisual ? "text-glacier" : "text-brand-blue",
              )}
            >
              {operationalMw}
              <span className="ml-1 text-2xl font-bold leading-none text-[#00EAFF]">
                MW
              </span>
            </p>
            <span
              className={cn(
                "text-sm font-bold leading-none",
                dockedVisual ? "text-white/40" : "text-brand-slate/40",
              )}
              aria-hidden
            >
              •
            </span>
            <p
              className={cn(
                "text-sm font-bold uppercase tracking-[0.1em] leading-none",
                dockedVisual ? "text-white/85" : "text-brand-slate/70",
              )}
            >
              Operational
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center leading-none md:px-6">
          <div className="flex items-baseline gap-3 leading-none">
            <p
              className={cn(
                "font-heading text-3xl font-bold tabular-nums tracking-tight leading-none",
                dockedVisual ? "text-glacier" : "text-brand-blue",
              )}
            >
              {pipelineMw}
              <span className="ml-1 text-2xl font-bold leading-none text-[#00EAFF]">
                MW
              </span>
            </p>
            <span
              className={cn(
                "text-sm font-bold leading-none",
                dockedVisual ? "text-white/40" : "text-brand-slate/40",
              )}
              aria-hidden
            >
              •
            </span>
            <p
              className={cn(
                "text-sm font-bold uppercase tracking-[0.1em] leading-none",
                dockedVisual ? "text-white/85" : "text-brand-slate/70",
              )}
            >
              In pipeline
            </p>
          </div>
          <p
            className={cn(
              "mt-1 text-xs leading-none",
              dockedVisual ? "text-white/60" : "text-brand-slate/60",
            )}
          >
            Middle Iwa Khola — feasibility stage
          </p>
        </div>

        <span
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2",
            dockedVisual ? "bg-white/20" : "bg-brand-slate/20",
          )}
          aria-hidden
        />
      </div>
    </section>
  );
}
