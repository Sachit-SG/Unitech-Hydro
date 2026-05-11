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
  className?: string;
};

export function TechnicalStatusBar({
  dockedToHero = false,
  className,
}: TechnicalStatusBarProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const operationalMw = useCountUp(5.8, 1, inView, 0);
  const pipelineMw = useCountUp(15, 0, inView, 0.1);

  return (
    <section
      ref={ref}
      className={cn(
        dockedToHero
          ? "absolute bottom-0 left-0 right-0 z-30 border-t border-white/15 backdrop-blur-lg"
          : "rounded-[4px] border-y border-brand-slate/10 backdrop-blur-md",
        dockedToHero ? "bg-brand-blue/80 py-6" : "bg-white/45 py-14",
        className,
      )}
      aria-labelledby="technical-status-heading"
    >
      <h2 id="technical-status-heading" className="sr-only">
        Technical status
      </h2>
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] flex-col items-stretch justify-center px-8 md:flex-row md:px-20",
          dockedToHero
            ? "divide-y divide-white/15 md:divide-x md:divide-y-0 md:divide-white/20"
            : "divide-y divide-brand-slate/15 md:divide-x md:divide-y-0 md:divide-brand-slate/20",
        )}
      >
        <div className="flex flex-1 flex-col items-center py-5 text-center md:px-6 md:py-0">
          <p
            className={cn(
              "font-heading text-3xl font-bold tabular-nums tracking-tight",
              dockedToHero ? "text-glacier" : "text-brand-blue",
            )}
          >
            {operationalMw}
            <span className="text-brand-cyan"> MW</span>
          </p>
          <p
            className={cn(
              "mt-1 text-xs font-semibold uppercase tracking-widest",
              dockedToHero ? "text-white/75" : "text-brand-slate/70",
            )}
          >
            Operational
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center py-5 text-center md:px-6 md:py-0">
          <p
            className={cn(
              "font-heading text-3xl font-bold tabular-nums tracking-tight",
              dockedToHero ? "text-glacier" : "text-brand-blue",
            )}
          >
            {pipelineMw}
            <span className="text-brand-cyan"> MW</span>
          </p>
          <p
            className={cn(
              "mt-1 text-xs font-semibold uppercase tracking-widest",
              dockedToHero ? "text-white/75" : "text-brand-slate/70",
            )}
          >
            In pipeline
          </p>
          <p
            className={cn(
              "mt-2 inline-flex max-w-[14rem] items-center justify-center rounded-[4px] px-2 py-1 text-[11px] leading-snug",
              dockedToHero
                ? "bg-brand-blue/80 text-white/70"
                : "bg-brand-blue/10 text-brand-blue",
            )}
          >
            Middle Iwa Khola — feasibility stage
          </p>
        </div>
      </div>
    </section>
  );
}
