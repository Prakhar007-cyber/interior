"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/journal";
import { unsplash } from "@/lib/images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TransitionLink } from "@/components/layout/PageTransition";

/** Editorial journal index — one feature, then a pair, magazine-style. */
export function Journal() {
  const [feature, ...rest] = articles;

  return (
    <section id="journal" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
          <div>
            <SectionLabel>Journal</SectionLabel>
            <h2 className="mt-6 font-serif text-display leading-[0.95] tracking-tight text-ink">
              Notes on
              <br />
              <span className="italic text-clay">living well</span>
            </h2>
          </div>
        </div>

        {/* Feature */}
        <TransitionLink
          href={`/journal/${feature.slug}`}
          className="group mt-14 grid gap-8 md:grid-cols-2 md:items-center"
          data-cursor-label="READ"
        >
          <div className="relative aspect-16/11 overflow-hidden bg-paper">
            <Image
              src={unsplash(feature.image, 1400)}
              alt={feature.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 text-stone">
              <span className="label">{feature.category}</span>
              <span className="h-1 w-1 rounded-full bg-stone/50" />
              <span className="text-sm">{feature.readTime}</span>
            </div>
            <h3 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-ink md:text-5xl">
              {feature.title}
            </h3>
            <p className="mt-5 max-w-md leading-relaxed text-stone">
              {feature.excerpt}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-ink">
              Read the article
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </TransitionLink>

        {/* Pair */}
        <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2">
          {rest.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <TransitionLink
                href={`/journal/${article.slug}`}
                className="group block"
                data-cursor-label="READ"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-paper">
                  <Image
                    src={unsplash(article.image, 1000)}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-stone">
                  <span className="label">{article.category}</span>
                  <span className="h-1 w-1 rounded-full bg-stone/50" />
                  <span className="text-sm">{article.date}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-ink md:text-3xl">
                  {article.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
                  {article.excerpt}
                </p>
              </TransitionLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
