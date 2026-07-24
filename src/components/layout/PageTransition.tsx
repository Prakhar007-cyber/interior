"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

/**
 * Provides a branded route transition. A solid clay/ink panel wipes up over the
 * viewport with the wordmark, the router navigates underneath, then the panel
 * lifts away to reveal the new page. Fast (≈0.5s each way) so it never drags.
 */
export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // stage: 0 idle · 1 covering (then navigate) · 2 revealing
  const [stage, setStage] = useState(0);
  const targetRef = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (stage !== 0) return;
      targetRef.current = href;
      setStage(1);
    },
    [stage],
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <AnimatePresence>
        {stage !== 0 && (
          <motion.div
            key="transition-panel"
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-ink"
            initial={{ y: "100%" }}
            animate={{ y: stage === 1 ? "0%" : "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (stage === 1 && targetRef.current) {
                // Panel now covers the screen — swap the route underneath.
                router.push(targetRef.current);
                targetRef.current = null;
                // Give the new route a beat to mount, then lift the panel.
                window.setTimeout(() => setStage(2), 120);
              } else if (stage === 2) {
                setStage(0);
              }
            }}
          >
            <motion.span
              className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-bone"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ATELIER VÉRA
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}

/**
 * Drop-in replacement for next/link that plays the branded wipe before
 * navigating. Falls back to a normal link for modified clicks / new tabs.
 */
export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { navigate } = useTransition();
  const hrefStr = typeof href === "string" ? href : href.toString();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        // If a caller already handled the click (e.g. smooth-scrolling to a
        // hash on the home page), don't also fire the page transition.
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.button === 1 ||
          hrefStr.startsWith("http")
        ) {
          return;
        }
        e.preventDefault();
        navigate(hrefStr);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
