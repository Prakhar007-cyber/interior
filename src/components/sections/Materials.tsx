"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { materials } from "@/data/materials";
import { unsplash } from "@/lib/images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Tactile materials strip. Swiper powers a free-scrolling, draggable row of
 * macro material cards — genuinely the right tool for touch-friendly horizontal
 * scrolling that also behaves on desktop.
 */
export function Materials() {
  return (
    <section className="overflow-hidden bg-charcoal py-24 text-bone md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel dark>Palette</SectionLabel>
            </Reveal>
            <Reveal delayIndex={1}>
              <h2 className="mt-6 font-serif text-display leading-[0.95] tracking-tight text-bone">
                Material <span className="italic text-clay-soft">matters.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delayIndex={2}>
            <p className="max-w-xs text-sm leading-relaxed text-stone-light">
              We favour honest, natural materials — chosen in the hand, not from a
              catalogue. Drag to explore the palette.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 pl-5 md:pl-10">
        <Swiper
          modules={[FreeMode]}
          freeMode
          grabCursor
          slidesPerView="auto"
          spaceBetween={16}
          className="!overflow-visible"
        >
          {materials.map((material) => (
            <SwiperSlide
              key={material.name}
              className="!w-[72vw] sm:!w-[42vw] md:!w-[28vw] lg:!w-[22vw]"
              data-cursor-label="DRAG"
            >
              <div className="group relative aspect-[3/4] overflow-hidden bg-ink">
                <Image
                  src={unsplash(material.image, 900)}
                  alt={`${material.name} — ${material.note}`}
                  fill
                  sizes="(max-width: 768px) 72vw, 28vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <span className="font-serif text-2xl text-bone">
                    {material.name}
                  </span>
                  <span className="label text-bone/60">{material.note}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
