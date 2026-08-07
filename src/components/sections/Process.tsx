"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { processSteps } from "@/data/process";
import { unsplash } from "@/lib/images";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Scroll-driven process timeline. Each stage reports when it reaches the middle
 * of the viewport and becomes "active", updating the sticky number + image on
 * the left. On mobile the image is shown inline within each step.
 */
export function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="max-w-2xl">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="mt-6 font-serif text-display leading-[0.95] tracking-tight text-ink">
            The <span className="italic text-clay">Process</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Sticky visual (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 aspect-4/5 overflow-hidden bg-paper">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={unsplash(step.image, 1200)}
                    alt={step.title}
                    fill
                    sizes="45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/10" />
                </motion.div>
              ))}
              <span className="absolute bottom-6 left-6 font-serif text-[6rem] leading-none text-bone mix-blend-difference">
                {processSteps[active].number}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="border-t border-line py-10 first:border-t-0 lg:min-h-[60vh] lg:py-16"
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className={`font-serif text-2xl transition-colors duration-500 ${
                      active === i ? "text-clay" : "text-stone-light"
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3 className="font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">
                    {step.title}
                  </h3>
                </div>

                {/* Inline image on mobile */}
                <div className="relative mt-6 aspect-16/10 w-full overflow-hidden bg-paper lg:hidden">
                  <Image
                    src={unsplash(step.image, 900)}
                    alt={step.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
