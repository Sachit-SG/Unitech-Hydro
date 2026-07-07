"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin fixed scroll-progress line at the very top of the viewport.
 * Leans into the engineering/technical identity — subtle, brand-neutral premium cue.
 * Sits above the header; pointer-events off so it never blocks interaction.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand-cyan"
    />
  );
}
