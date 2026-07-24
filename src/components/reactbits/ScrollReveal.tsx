"use client";

// React Bits — ScrollReveal (https://reactbits.dev). MIT licensed, adapted.
// Reveals a paragraph word-by-word as it scrolls through the viewport, easing
// each word from dim + blurred to sharp. Great for editorial statements.

import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollRevealProps {
  children: string;
  className?: string;
  baseOpacity?: number;
  enableBlur?: boolean;
}

export function ScrollReveal({
  children,
  className,
  baseOpacity = 0.12,
  enableBlur = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const words = useMemo(
    () =>
      children.split(/(\s+)/).map((word, i) =>
        word.match(/^\s+$/) ? (
          word
        ) : (
          <span key={i} data-word className="inline-block">
            {word}
          </span>
        ),
      ),
    [children],
  );

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const wordEls = el.querySelectorAll<HTMLElement>("[data-word]");
      if (reduce) {
        gsap.set(wordEls, { opacity: 1, filter: "none" });
        return;
      }

      gsap.fromTo(
        wordEls,
        {
          opacity: baseOpacity,
          filter: enableBlur ? "blur(4px)" : "none",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {words}
    </p>
  );
}
