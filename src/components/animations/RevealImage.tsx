"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * A masked image reveal: a bone panel wipes away while the photograph settles
 * from a slight zoom to rest. Used for the cinematic entrance of key images.
 * The wrapper must define its own size / aspect ratio (the image uses `fill`).
 */
export function RevealImage({
  id,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  width = 2000,
}: {
  id: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-paper", className)}>
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={unsplash(id, width)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>

      {/* Panel that lifts to reveal the image beneath */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-bone"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}
