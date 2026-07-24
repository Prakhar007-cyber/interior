"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const LINES = ["INTERIOR ARCHITECTURE", "EST. 2018"];

/**
 * Cinematic first-load preloader. Wordmark fades in, a thin architectural line
 * draws across the viewport, the studio credentials reveal, then the whole
 * panel lifts away to expose the hero. Shows once per browser session.
 */
export function Preloader() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // The cinematic intro is reserved for the homepage landing only.
    if (pathname !== "/") return;
    const seen = sessionStorage.getItem("av-preloaded");
    if (seen) return;
    // Client-only: sessionStorage can't be read during SSR, so the loader is
    // activated after mount rather than derived during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);

    // Lock scrolling while the loader plays.
    document.documentElement.classList.add("lenis-stopped");
    window.__lenis?.stop();

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("av-preloaded", "1");
      setActive(false);
    }, 2900);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const release = () => {
    document.documentElement.classList.remove("lenis-stopped");
    window.__lenis?.start();
  };

  return (
    <AnimatePresence onExitComplete={release}>
      {active && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink text-bone"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              ATELIER VÉRA
            </motion.p>
          </div>

          {/* Thin architectural line drawing across the screen */}
          <motion.div
            className="my-8 h-px bg-stone-light/60"
            initial={{ width: 0 }}
            animate={{ width: "min(70vw, 40rem)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          />

          <div className="flex items-center gap-6 overflow-hidden">
            {LINES.map((line, i) => (
              <motion.span
                key={line}
                className="label text-stone-light"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.4 + i * 0.12,
                }}
              >
                {line}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
