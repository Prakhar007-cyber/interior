"use client";

// React Bits — Magnet (https://reactbits.dev). MIT licensed, adapted to TS.
// Wraps children and gently pulls them toward the pointer on hover, creating a
// tactile magnetic interaction. Disabled on touch / reduced-motion.

import { useRef, useState } from "react";
import { motion } from "motion/react";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  /** Pixels of travel at the edge of the trigger area. */
  strength?: number;
  padding?: number;
}

export function Magnet({
  children,
  className,
  strength = 24,
  padding = 60,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const radius = Math.max(rect.width, rect.height) / 2 + padding;

    if (dist < radius) {
      setPos({ x: (dx / radius) * strength, y: (dy / radius) * strength });
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
