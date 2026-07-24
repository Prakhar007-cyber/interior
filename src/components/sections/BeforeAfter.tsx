"use client";

import { beforeAfter } from "@/data/site";
import { ComparisonSlider } from "@/components/ui/ComparisonSlider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";

// Alt text pairs for each comparison (kept out of the slider for clarity).
const alts = [
  { before: "Living room before renovation, dated and cluttered", after: "Living room after redesign, calm and light-filled" },
  { before: "Kitchen before renovation", after: "Kitchen after redesign, warm and minimal" },
];

/** Interactive before/after transformations — instantly legible to clients. */
export function BeforeAfter() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Before &amp; After</SectionLabel>
          </Reveal>
          <Reveal delayIndex={1}>
            <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-tight text-ink">
              Transformation is in the details.
            </h2>
          </Reveal>
          <Reveal delayIndex={2}>
            <p className="mt-5 max-w-md text-stone">
              Drag to see how a considered redesign reshapes not just a room, but
              the way it feels to live in.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {beforeAfter.map((pair, i) => (
            <Reveal key={pair.title} delayIndex={i}>
              <figure>
                <ComparisonSlider
                  before={pair.before}
                  after={pair.after}
                  beforeAlt={alts[i]?.before ?? "Before"}
                  afterAlt={alts[i]?.after ?? "After"}
                />
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <span className="font-serif text-lg text-ink">{pair.title}</span>
                  <span className="text-sm text-stone">{pair.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
