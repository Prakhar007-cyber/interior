"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { contact } from "@/data/site";

/**
 * Tasteful floating WhatsApp entry point — an ink pill that reveals a label on
 * hover, appearing only after the user starts scrolling so it never competes
 * with the hero. Deliberately not a giant green bubble.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "Hello Atelier Véra, I'd like to discuss a project.",
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-6 right-5 z-[800] flex items-center gap-2 rounded-full border border-bone/15 bg-ink/95 py-3 pl-3 pr-4 text-bone shadow-lg backdrop-blur-sm md:bottom-8 md:right-8"
          data-cursor-label="CHAT"
        >
          <MessageCircle className="h-5 w-5 text-clay-soft" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[8rem] group-hover:opacity-100">
            WhatsApp us
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
