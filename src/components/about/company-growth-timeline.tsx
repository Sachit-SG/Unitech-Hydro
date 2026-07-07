"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type CompanyTimelineEvent = {
  date: string;
  title: string;
  description?: string;
  registrationNo?: string;
  /** Highlight dot — Public Limited & COD */
  milestone?: boolean;
};

type CompanyGrowthTimelineProps = {
  events: readonly CompanyTimelineEvent[];
  className?: string;
  theme?: "light" | "dark";
};

function TimelineText({
  event,
  theme,
  index,
}: {
  event: CompanyTimelineEvent;
  theme: "light" | "dark";
  index: number;
}) {
  const isDark = theme === "dark";
  const reduceMotion = useReducedMotion();

  const content = (
    <div
      className={cn(
        "transition-all duration-300 hover:-translate-y-1",
        isDark &&
          "rounded-[4px] border border-white/10 bg-black/30 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-5"
      )}
    >
      <span
        className={cn(
          "mb-1 block font-mono text-[11px] tracking-[0.2em] md:text-xs",
          isDark
            ? "text-[#22D3EE] drop-shadow-[0_0_14px_rgba(34,211,238,0.45)]"
            : "text-[#22D3EE]"
        )}
      >
        {event.date} BS
      </span>
      <h4
        className={cn(
          "text-lg font-bold leading-snug md:text-xl",
          isDark
            ? "text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]"
            : "text-[#0A3A63]"
        )}
      >
        {event.title}
      </h4>
      {event.registrationNo ? (
        <p
          className={cn(
            "mt-1 text-sm",
            isDark
              ? "text-slate-400 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]"
              : "text-slate-500"
          )}
        >
          Registration no. {event.registrationNo}
        </p>
      ) : null}
      {event.description ? (
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            isDark
              ? "text-slate-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              : "text-slate-500"
          )}
        >
          {event.description}
        </p>
      ) : null}
    </div>
  );

  if (!isDark || reduceMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20"
    >
      {content}
    </motion.div>
  );
}

function TimelineDot({
  milestone,
  theme,
}: {
  milestone?: boolean;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <span
      className={cn(
        "relative z-20 rounded-full",
        isDark ? "ring-4 ring-[#0A3A63]" : "bg-[#0A3A63] ring-4 ring-white",
        milestone
          ? cn(
              "h-4 w-4 bg-[#22D3EE]",
              isDark && "shadow-[0_0_22px_rgba(34,211,238,0.75)]"
            )
          : cn("h-3 w-3", !isDark && "bg-[#0A3A63]", isDark && "bg-white/90")
      )}
      aria-hidden
    />
  );
}

function TimelineTracingBeam({
  variant,
  progress,
  reduceMotion,
}: {
  variant: "desktop" | "mobile";
  progress: import("framer-motion").MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const isDesktop = variant === "desktop";

  return (
    <>
      <div
        className={cn(
          "absolute top-0 z-20 bg-white/15",
          isDesktop
            ? "left-1/2 hidden h-full w-px -translate-x-1/2 md:block"
            : "left-[23px] h-full w-px md:hidden"
        )}
        aria-hidden
      />
      <motion.div
        className={cn(
          "absolute top-0 z-20 origin-top bg-[#22D3EE] shadow-[0_0_15px_#22D3EE]",
          isDesktop
            ? "left-1/2 hidden h-full w-[2px] -translate-x-1/2 md:block"
            : "left-[23px] h-full w-[2px] -translate-x-1/2 md:hidden"
        )}
        style={{ scaleY: reduceMotion ? 1 : progress }}
        aria-hidden
      />
    </>
  );
}

export function CompanyGrowthTimeline({
  events,
  className,
  theme = "light",
}: CompanyGrowthTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const beamProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={cn("relative z-20 mx-auto max-w-5xl py-4 md:py-6", className)}
      role="list"
      aria-label="Company milestones timeline"
    >
      {isDark ? (
        <>
          <TimelineTracingBeam
            variant="desktop"
            progress={beamProgress}
            reduceMotion={reduceMotion}
          />
          <TimelineTracingBeam
            variant="mobile"
            progress={beamProgress}
            reduceMotion={reduceMotion}
          />
        </>
      ) : (
        <>
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-200 md:block"
            aria-hidden
          />
          <div
            className="absolute left-[23px] top-0 h-full w-px bg-slate-200 md:hidden"
            aria-hidden
          />
        </>
      )}

      {events.map((event, index) => {
        const isEven = index % 2 === 0;
        const isLast = index === events.length - 1;

        return (
          <div
            key={`${event.date}-${event.title}`}
            role="listitem"
            className={cn("group relative z-20 w-full", isLast ? "mb-0" : "mb-6 md:mb-7")}
          >
            <div className="relative z-20 w-full pl-14 text-left md:hidden">
              <div className="absolute left-[23px] top-4 z-20 -translate-x-1/2">
                <TimelineDot milestone={event.milestone} theme={theme} />
              </div>
              <TimelineText event={event} theme={theme} index={index} />
            </div>

            <div className="relative z-20 hidden w-full items-center justify-between md:flex">
              <div
                className={cn(
                  "z-20 w-5/12",
                  isEven ? "pr-5 text-right md:pr-6" : "invisible pointer-events-none"
                )}
                aria-hidden={!isEven}
              >
                {isEven ? (
                  <TimelineText event={event} theme={theme} index={index} />
                ) : (
                  <span />
                )}
              </div>

              <div className="relative z-20 flex w-2/12 justify-center">
                <TimelineDot milestone={event.milestone} theme={theme} />
              </div>

              <div
                className={cn(
                  "z-20 w-5/12",
                  !isEven ? "pl-5 text-left md:pl-6" : "invisible pointer-events-none"
                )}
                aria-hidden={isEven}
              >
                {!isEven ? (
                  <TimelineText event={event} theme={theme} index={index} />
                ) : (
                  <span />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
