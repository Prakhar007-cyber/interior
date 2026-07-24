"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Editorial testimonial section — one large quote at a time, gently rotating. */
export function Testimonials() {
  const [index, setIndex] = useState(0);

  const go = useCallback((dir: number) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance; resets whenever the index changes (including manual moves).
  useEffect(() => {
    const t = setTimeout(() => go(1), 6500);
    return () => clearTimeout(t);
  }, [index, go]);

  const current = testimonials[index];

  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionLabel>In Their Words</SectionLabel>

        <div className="mt-12 min-h-[16rem] md:min-h-[20rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-4xl font-serif text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.1] tracking-tight text-ink">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <span className="h-px w-10 bg-clay" />
                <div>
                  <p className="text-base text-ink">{current.name}</p>
                  <p className="text-sm text-stone">{current.project}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <span className="ml-2 text-sm text-stone">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
