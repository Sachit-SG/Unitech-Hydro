"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type CountUpProps = {
  /** Target number to count to. */
  value: number;
  decimals?: number;
  /** Rendered before the number (e.g. "$"). */
  prefix?: string;
  /** Rendered after the number (e.g. " cr.", "%"). */
  suffix?: string;
  durationSeconds?: number;
  className?: string;
};

/**
 * Animates a number counting up from 0 the first time it scrolls into view.
 * Respects reduced-motion (renders the final value immediately).
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationSeconds,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const format = (n: number) =>
    decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  const [text, setText] = useState(format(0));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setText(format(value));
      return;
    }
    const controls = animate(0, value, {
      duration: durationSeconds ?? (decimals > 0 ? 1.45 : 1.25),
      ease: easeOutExpo,
      onUpdate: (latest) => setText(format(latest)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, decimals, durationSeconds, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{text}</span>
      {suffix}
    </span>
  );
}
