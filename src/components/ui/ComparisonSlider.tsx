"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { unsplash } from "@/lib/images";

/**
 * Draggable before/after image comparison. Works with mouse, touch and pen via
 * pointer events, and with the keyboard via a slider role + arrow keys. The
 * "before" layer is clipped to the handle position with clip-path (transform-
 * friendly, no layout thrash).
 */
export function ComparisonSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-4/3 w-full touch-none select-none overflow-hidden bg-paper md:aspect-16/10"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      data-cursor-label="DRAG"
    >
      {/* After (base layer) */}
      <Image
        src={unsplash(after, 1600)}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] tracking-[0.2em] text-bone backdrop-blur-sm">
        AFTER
      </span>

      {/* Before (clipped top layer) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={unsplash(before, 1600)}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-bone/80 px-3 py-1 text-[0.6rem] tracking-[0.2em] text-ink backdrop-blur-sm">
          BEFORE
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-bone"
        style={{ left: `${pos}%` }}
      >
        <button
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-bone text-ink shadow-lg"
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
