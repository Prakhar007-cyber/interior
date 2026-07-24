"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { unsplash } from "@/lib/images";

const words = [
  { word: "Light", note: "The first material we design with.", image: "1512918728675-ed5a9ecdebfd" },
  { word: "Material", note: "Honest, natural, made to age well.", image: "1531835551805-16d864c8d311" },
  { word: "Proportion", note: "The quiet order beneath every room.", image: "1449247709967-d4461a6a6103" },
  { word: "Texture", note: "What a space feels like to touch.", image: "1524758631624-e2822e304c36" },
  { word: "Life", note: "The way you actually live, every day.", image: "1600585154340-be6161a56a0c" },
];

/**
 * A pinned philosophy sequence. The section is tall; an inner sticky panel
 * stays in view while scroll progress selects which word — and its paired
 * image — is active, crossfading between them.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(words.length - 1, Math.floor(v * words.length));
    setActive(idx);
  });

  return (
    <section
      ref={ref}
      className="relative bg-ink"
      style={{ height: `${words.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Crossfading imagery */}
        {words.map((w, i) => (
          <motion.div
            key={w.word}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={unsplash(w.image, 2000)}
              alt={`${w.word} — ${w.note}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/55" />
          </motion.div>
        ))}

        {/* Foreground word */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <span className="label text-stone-light">Our Philosophy</span>

          <div className="mt-8 h-[9rem] md:h-[16rem]">
            {words.map((w, i) => (
              <motion.div
                key={w.word}
                className="absolute"
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : 30,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-mega font-serif uppercase leading-none tracking-tight text-bone">
                  {w.word}
                </h2>
                <p className="mt-4 text-lg text-bone/80">{w.note}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="mt-16 flex gap-3">
            {words.map((w, i) => (
              <span
                key={w.word}
                className={`h-px w-10 transition-colors duration-500 ${
                  active === i ? "bg-clay" : "bg-bone/25"
                }`}
              />
            ))}
          </div>

          <p className="mt-10 max-w-md text-bone/70">
            We begin with how a space should feel, then design everything around
            it.
          </p>
        </div>
      </div>
    </section>
  );
}
