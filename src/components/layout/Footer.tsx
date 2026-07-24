"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { navLinks, contact } from "@/data/site";
import { scrollToHash } from "@/lib/scroll";
import { TransitionLink } from "@/components/layout/PageTransition";

/** Oversized editorial footer with a giant wordmark that reveals on scroll. */
export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") scrollToHash(href);
    else router.push(href);
  };

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        {/* Top row: statement + links */}
        <div className="grid gap-12 border-b border-bone/15 pb-16 md:grid-cols-2">
          <div>
            <p className="max-w-md font-serif text-2xl leading-snug text-bone/90 md:text-3xl">
              Spaces, shaped around you.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone-light">
              An interior architecture &amp; design studio crafting considered
              residential, hospitality and commercial spaces across India.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="label text-stone">Menu</span>
              {navLinks.slice(0, 4).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={go(l.href)}
                  className="text-sm text-bone/80 transition-colors hover:text-clay-soft"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-stone">Social</span>
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-bone/80 transition-colors hover:text-clay-soft"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-stone">Contact</span>
              <a href={`mailto:${contact.email}`} className="text-sm text-bone/80 transition-colors hover:text-clay-soft">
                {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-sm text-bone/80 transition-colors hover:text-clay-soft">
                {contact.phone}
              </a>
              <span className="text-sm leading-relaxed text-stone-light">{contact.address}</span>
            </div>
          </div>
        </div>

        {/* Giant wordmark, revealed on scroll */}
        <div className="overflow-hidden py-10">
          <motion.h2
            initial={{ y: "40%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-mega font-serif leading-[0.8] tracking-tight text-bone"
          >
            ATELIER<span className="text-clay">.</span>
            <br />
            VÉRA
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4 border-t border-bone/15 pt-8 text-xs text-stone-light sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Atelier Véra. All rights reserved.</span>
          <div className="flex gap-6">
            <TransitionLink href="/signin" className="transition-colors hover:text-bone">
              Client Portal
            </TransitionLink>
            <span>Design &amp; build — a fictional studio.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
