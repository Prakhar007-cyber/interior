"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { unsplash } from "@/lib/images";
import { scrollToHash } from "@/lib/scroll";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

// Two-line headline, revealed line by line with a mask.
const headline = ["Spaces,", "shaped around you."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Scroll parallax: image drifts up slowly, content fades as you leave.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Gentle mouse parallax on the hero image (desktop only, transform-based).
  const onMouseMove = (e: React.MouseEvent) => {
    const el = imageRef.current;
    if (!el) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative h-svh w-full overflow-hidden bg-ink"
    >
      {/* Background image: scales down on load, parallax on scroll + mouse */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <motion.div
          ref={imageRef}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.1 }}
          className="absolute -inset-8 transition-transform duration-500 ease-out will-change-transform"
        >
          <Image
            src={unsplash("1600607687939-ce8a6c25118c", 2400)}
            alt="A warm, light-filled contemporary living room designed by Atelier Véra"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/20 to-ink/70" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-20"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="label mb-6 text-bone/80"
        >
          Atelier Véra — Interior Architecture &amp; Design
        </motion.span>

        <h1 className="max-w-5xl font-serif text-bone">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.98]"
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: 0.6 + i * 0.14 }}
              >
                {i === 1 ? <span className="italic">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex items-center gap-3 text-bone/80">
            <span className="text-sm">Interior Architecture &amp; Design</span>
            <span className="h-1 w-1 rounded-full bg-bone/50" />
            <span className="text-sm">India</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              href="/#projects"
              variant="solid"
              arrow
              className="bg-bone text-ink hover:bg-clay hover:text-bone"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#projects");
              }}
            >
              Explore Our Work
            </Button>
            <Button
              href="/#contact"
              variant="outline"
              className="border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#contact");
              }}
            >
              Start a Project
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToHash("#intro")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone/70 md:flex"
      >
        <span className="text-[0.6rem] tracking-[0.3em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
