"use client";

// React Bits — CountUp (https://reactbits.dev). MIT licensed, adapted to TS.
// Animates a number from `from` to `to` with a spring when it enters view.

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  separator?: string;
  /** Render 150000 -> "150,000" or, when compact, a plain grouped number. */
  formatCompact?: boolean;
}

export function CountUp({
  to,
  from = 0,
  duration = 2,
  className,
  separator = ",",
  formatCompact = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 90,
    duration: duration * 1000,
  });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, motionValue, to]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (!ref.current) return;
      const rounded = Math.round(latest);
      const formatted = formatCompact
        ? rounded.toLocaleString("en-IN")
        : rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      ref.current.textContent = formatted;
    });
    return () => unsubscribe();
  }, [springValue, separator, formatCompact]);

  return (
    <span ref={ref} className={className}>
      {from}
    </span>
  );
}
