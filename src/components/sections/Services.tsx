"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { services } from "@/data/services";
import { unsplash } from "@/lib/images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Services as an interactive list. On desktop, hovering a row crossfades the
 * paired image in the sticky panel. On mobile it becomes an accordion that
 * expands to reveal the description and image inline.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>What We Do</SectionLabel>
          </Reveal>
          <Reveal delayIndex={1}>
            <h2 className="mt-6 font-serif text-display leading-[0.95] tracking-tight text-ink">
              Services
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* List */}
          <div className="lg:col-span-7">
            <ul className="border-t border-line">
              {services.map((service, i) => (
                <li key={service.title} className="border-b border-line">
                  {/* Row */}
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setOpen(open === i ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="label text-stone">{service.number}</span>
                      <span
                        className={`font-serif text-2xl tracking-tight transition-colors duration-300 md:text-4xl ${
                          active === i ? "text-clay" : "text-ink"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-stone transition-transform duration-500 lg:hidden ${
                        open === i ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  {/* Desktop description (always visible on hover-active row) */}
                  <div className="hidden pb-6 lg:block">
                    <AnimatePresence mode="wait">
                      {active === i && (
                        <motion.p
                          key={service.title}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="max-w-xl pl-[3.25rem] text-sm leading-relaxed text-stone"
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile accordion */}
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="pb-6">
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper">
                            <Image
                              src={unsplash(service.image, 1000)}
                              alt={service.title}
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          </div>
                          <p className="mt-4 text-sm leading-relaxed text-stone">
                            {service.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky image panel (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-paper">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={unsplash(service.image, 1200)}
                    alt={service.title}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
