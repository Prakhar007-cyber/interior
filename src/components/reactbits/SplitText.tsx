"use client";

// React Bits — SplitText (https://reactbits.dev). MIT licensed, adapted to TS.
// Splits text into words/chars and staggers them in with GSAP when scrolled
// into view. Honours prefers-reduced-motion by rendering the text statically.

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SplitTextProps {
  text: string;
  className?: string;
  splitType?: "words" | "chars";
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  text,
  className,
  splitType = "words",
  delay = 0.05,
  duration = 0.8,
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      const units = el.querySelectorAll<HTMLElement>("[data-split-unit]");
      gsap.set(units, { yPercent: 110, opacity: 0 });
      gsap.to(units, {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger: delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  const parts = splitType === "words" ? text.split(" ") : text.split("");

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {parts.map((part, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <span data-split-unit className="inline-block will-change-transform">
            {part}
            {splitType === "words" && i < parts.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
      {/* Accessible, un-split copy for screen readers */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
