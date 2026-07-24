"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/site";
import { scrollToHash } from "@/lib/scroll";
import { TransitionLink } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

/**
 * Transparent navbar that subtly transforms on scroll. Over a dark full-bleed
 * hero (home + project pages) it uses light text; once scrolled — or on pages
 * without a dark hero — it gains a translucent bone backing with dark text.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") scrollToHash(href);
    else router.push(href);
  };

  // Pages that open with a dark full-bleed hero image.
  const overHero = pathname === "/" || pathname.startsWith("/projects/");
  const light = overHero && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[900] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || !overHero
            ? "bg-bone/80 py-3 shadow-[0_1px_0_0_rgba(26,24,21,0.08)] backdrop-blur-md"
            : "bg-gradient-to-b from-ink/40 to-transparent py-6",
        )}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          {/* Wordmark */}
          <TransitionLink
            href="/"
            className={cn(
              "font-serif text-lg tracking-tight transition-colors duration-500",
              light ? "text-bone" : "text-ink",
            )}
            aria-label="Atelier Véra — home"
          >
            ATELIER <span className="italic">Véra</span>
          </TransitionLink>

          {/* Center links (desktop) */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleAnchor(link.href)}
                  className={cn(
                    "group relative text-sm transition-colors duration-500",
                    light ? "text-bone/85 hover:text-bone" : "text-ink/80 hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                      light ? "bg-bone" : "bg-ink",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button
                href="/#contact"
                variant="outline"
                arrow
                className={cn(
                  "px-5 py-2.5 text-xs",
                  light &&
                    "border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink",
                )}
                onClick={handleAnchor("/#contact")}
              >
                Start a Project
              </Button>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden",
                light ? "border-bone/40 text-bone" : "border-ink/20 text-ink",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
