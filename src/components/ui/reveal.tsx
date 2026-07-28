"use client";

import { motion, type Variants } from "framer-motion";

/** Canonical sitewide reveal curve/duration/distance -- keep every scroll-reveal on this. */
export const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const REVEAL_DURATION = 0.55;
export const REVEAL_DISTANCE = 20;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay },
  }),
};

type RevealProps = {
  children: React.ReactNode;
  /** Stagger start in seconds. */
  delay?: number;
  className?: string;
  /** Render as a specific element if needed (defaults to div). */
  as?: "div" | "section";
};

/**
 * Fade-up on first scroll into view. Small client island so server pages stay server.
 * Respects reduced-motion via framer-motion's global reducedMotion handling.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}
