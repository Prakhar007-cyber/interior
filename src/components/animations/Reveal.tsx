"use client";

import { motion, type Variants } from "motion/react";

/**
 * Lightweight fade-and-rise wrapper used across sections. Animates once when it
 * scrolls into view. Motion automatically respects prefers-reduced-motion when
 * the user has it enabled at the OS level via its reducedMotion config, but we
 * also keep the movement small so it degrades gracefully.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.08,
    },
  }),
};

export function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delayIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}
