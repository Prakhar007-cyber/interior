"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { unsplash } from "@/lib/images";

/**
 * A cinematic full-screen interlude. As it scrolls the image slowly zooms, the
 * overlay deepens and the statement reveals — a moment of pause between
 * sections.
 */
export function VisualBreak() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const overlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.45, 0.7]);

  return (
    <section ref={ref} className="relative flex h-svh items-center justify-center overflow-hidden bg-ink">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={unsplash("1615873968403-89e068629265", 2400)}
          alt="An expansive, softly lit interior at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-ink" />

      <div className="relative z-10 px-5 text-center">
        <h2 className="font-serif text-bone">
          {["Good design isn’t seen.", "It’s experienced."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block text-[clamp(2.25rem,6.5vw,6rem)] leading-[1.05]"
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              >
                {i === 1 ? <span className="italic">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
