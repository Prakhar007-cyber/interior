"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { unsplash } from "@/lib/images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TransitionLink } from "@/components/layout/PageTransition";

/**
 * Featured work presented as a sequence of cinematic, full-width case-study
 * rows. Each row reveals on scroll, zooms on hover and carries a VIEW PROJECT
 * cursor label. Alternating alignment keeps the rhythm editorial.
 */
export function FeaturedProjects() {
  return (
    <section id="projects" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-6 font-serif text-display leading-[0.95] tracking-tight text-ink">
              Featured
              <br />
              <span className="italic text-clay">Projects</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone">
            A selection of recent residences, villas and spaces — each a study in
            light, material and considered living.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-24 md:gap-32">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TransitionLink
                href={`/projects/${project.slug}`}
                className="group block"
                data-cursor-label="VIEW PROJECT"
              >
                <div
                  className={`grid items-center gap-8 md:grid-cols-12 ${
                    i % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="md:col-span-8 md:[direction:ltr]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-paper sm:aspect-[16/10]">
                      <Image
                        src={unsplash(project.cover, 1600)}
                        alt={`${project.title}, ${project.location} — ${project.category}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
                      <span className="pointer-events-none absolute left-5 top-5 font-serif text-6xl text-bone/90 mix-blend-difference md:text-7xl">
                        {project.index}
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="md:col-span-4 md:[direction:ltr]">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                          {project.title}
                        </h3>
                        <div className="mt-4 flex items-center gap-3 text-stone">
                          <span className="text-sm">{project.location}</span>
                          <span className="h-1 w-1 rounded-full bg-stone/60" />
                          <span className="text-sm">{project.category}</span>
                        </div>
                        <span className="mt-1 block text-sm text-stone-light">
                          {project.year}
                        </span>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-500 group-hover:border-clay group-hover:bg-clay group-hover:text-bone">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </TransitionLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
