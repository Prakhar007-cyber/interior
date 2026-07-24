"use client";

import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";

/** Editorial opening statement, revealed word-by-word as you scroll through. */
export function Introduction() {
  return (
    <section id="intro" className="bg-bone py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Atelier Véra</SectionLabel>
        </Reveal>

        <ScrollReveal
          className="mt-10 max-w-5xl font-serif text-[clamp(2rem,5.5vw,4.75rem)] leading-[1.05] tracking-tight text-ink"
        >
          We don&apos;t decorate spaces. We shape how they feel.
        </ScrollReveal>

        <div className="mt-16 flex justify-end">
          <Reveal className="max-w-md">
            <p className="text-lg leading-relaxed text-stone">
              We design considered interiors where architecture, material, light
              and everyday life come together — quiet, warm and built to last.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
