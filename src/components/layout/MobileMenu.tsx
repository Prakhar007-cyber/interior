"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { navLinks, contact } from "@/data/site";
import { scrollToHash } from "@/lib/scroll";

const menuVariants = {
  closed: { clipPath: "inset(0% 0% 100% 0%)" },
  open: { clipPath: "inset(0% 0% 0% 0%)" },
};

const listVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  closed: {},
};

const itemVariants = {
  closed: { y: 40, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** Fullscreen ink menu with staggered serif links. */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("lenis-stopped");
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    onClose();
    // Wait for the close animation before scrolling / navigating.
    setTimeout(() => {
      if (pathname === "/") scrollToHash(href);
      else router.push(href);
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col bg-ink text-bone lg:hidden"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <span className="font-serif text-lg">
              ATELIER <span className="italic">Véra</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/25"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <motion.ul
            className="flex flex-1 flex-col justify-center gap-1 px-5"
            variants={listVariants}
            initial="closed"
            animate="open"
          >
            {navLinks.map((link) => (
              <motion.li key={link.href} variants={itemVariants} className="overflow-hidden">
                <button
                  onClick={() => go(link.href)}
                  className="font-serif text-5xl leading-tight text-bone/90 transition-colors hover:text-clay-soft"
                >
                  {link.label}
                </button>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            className="flex flex-col gap-4 border-t border-bone/15 px-5 py-8"
          >
            <a href={`mailto:${contact.email}`} className="text-stone-light">
              {contact.email}
            </a>
            <div className="flex gap-6">
              {contact.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="label text-bone/70">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
