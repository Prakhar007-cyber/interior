"use client";

import { stats } from "@/data/testimonials";
import { CountUp } from "@/components/reactbits/CountUp";
import { Reveal } from "@/components/animations/Reveal";

/** Minimal animated practice numbers — counts up on entering the viewport. */
export function Stats() {
  return (
    <section className="bg-ink py-24 text-bone md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delayIndex={i} className="text-center md:text-left">
              <div className="flex items-baseline justify-center font-serif text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight text-bone md:justify-start">
                <CountUp
                  to={stat.value}
                  duration={2.2}
                  formatCompact={"format" in stat}
                />
                <span className="text-clay-soft">{stat.suffix}</span>
              </div>
              <p className="label mt-4 text-stone-light">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
