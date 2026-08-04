"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A refined two-part cursor: a small precise dot and a trailing ring that
 * lerps toward the pointer. Interactive elements opt in with data attributes:
 *   data-cursor="hover"            -> ring grows
 *   data-cursor-label="VIEW"       -> ring becomes a labelled disc
 * Only renders on devices with a fine pointer (desktop). No-op otherwise.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    // Enable only after mount: matchMedia isn't available during SSR, so this
    // is a legitimate client-only feature-detection gate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pointer.x, y: pointer.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Ring trails the dot with a simple lerp for a soft, weighted feel.
    const loop = () => {
      ring.x += (pointer.x - ring.x) * 0.15;
      ring.y += (pointer.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor-label], [data-cursor='hover'], a, button",
      );
      if (!target) {
        setHovering(false);
        setLabel("");
        return;
      }
      const lbl = target.getAttribute("data-cursor-label");
      setLabel(lbl ?? "");
      setHovering(true);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-9999">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-0.75 -mt-0.75 h-1.5 w-1.5 rounded-full bg-ink mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full transition-[width,height,background-color] duration-300 ease-out-expo"
        style={{
          width: label ? 84 : hovering ? 48 : 34,
          height: label ? 84 : hovering ? 48 : 34,
          marginLeft: label ? -42 : hovering ? -24 : -17,
          marginTop: label ? -42 : hovering ? -24 : -17,
          backgroundColor: label
            ? "var(--color-ink)"
            : "transparent",
          border: label ? "none" : "1px solid rgba(26,24,21,0.45)",
        }}
      >
        {label ? (
          <span className="label text-[0.5rem] text-bone">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
