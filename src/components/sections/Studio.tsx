"use client";

import { unsplash } from "@/lib/images";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { RevealImage } from "@/components/animations/RevealImage";
import { ShinyText } from "@/components/reactbits/ShinyText";

const pillars = [
  { title: "Philosophy", body: "Quiet, warm and considered. We design for how a space feels before how it looks." },
  { title: "Approach", body: "Architecture-led and detail-obsessed, from first sketch to final styling." },
  { title: "Team", body: "A close studio of architects, interior designers and makers working as one." },
  { title: "Craftsmanship", body: "We partner with India's finest artisans to build things meant to last." },
];

/** The studio story, told through an asymmetric editorial layout. */
export function Studio() {
  return (
    <section id="studio" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left column: heading + lead */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>The Studio</SectionLabel>
            </Reveal>
            <Reveal delayIndex={1}>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight text-ink">
                A studio built on
                <br />
                <span className="italic text-clay">restraint.</span>
              </h2>
            </Reveal>
            <Reveal delayIndex={2}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-stone">
                Atelier Véra is an interior architecture and design studio working
                across India. Since{" "}
                <ShinyText text="2018" className="font-medium" />, we have shaped
                homes, villas and spaces defined not by trend, but by how they make
                you feel.
              </p>
            </Reveal>

            {/* Detail image */}
            <div className="mt-10 hidden lg:block">
              <RevealImage
                id="1583847268964-b28dc8f51f92"
                alt="A detail of hand-finished plaster and brass in an Atelier Véra interior"
                className="aspect-4/3"
                sizes="40vw"
              />
            </div>
          </div>

          {/* Right column: large image + pillars */}
          <div className="lg:col-span-7">
            <div className="relative aspect-16/11 overflow-hidden bg-paper">
              <Image
                src={unsplash("1519710164239-da123dc03ef4", 1600)}
                alt="Inside the Atelier Véra studio"
                fill
                sizes="60vw"
                className="object-cover"
              />
            </div>

            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delayIndex={i}>
                  <div className="border-t border-line pt-5">
                    <h3 className="font-serif text-xl text-ink">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
