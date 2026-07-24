"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { unsplash } from "@/lib/images";

/** Full-bleed parallax hero for a project case study, with a masked title. */
export function ProjectHero({
  image,
  title,
  location,
  category,
}: {
  image: string;
  title: string;
  location: string;
  category: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={unsplash(image, 2400)}
            alt={`${title} — ${location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-20">
        <div className="flex items-center gap-3 text-bone/80">
          <span className="label">{category}</span>
          <span className="h-1 w-1 rounded-full bg-bone/50" />
          <span className="text-sm">{location}</span>
        </div>
        <h1 className="mt-5 overflow-hidden font-serif text-bone">
          <motion.span
            className="block text-[clamp(2.75rem,10vw,9rem)] leading-[0.95]"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {title}
          </motion.span>
        </h1>
      </div>
    </div>
  );
}
