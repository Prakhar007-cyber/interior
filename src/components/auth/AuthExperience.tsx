"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { unsplash } from "@/lib/images";
import { TransitionLink } from "@/components/layout/PageTransition";

type Mode = "signin" | "signup";

const media: Record<Mode, { image: string; alt: string }> = {
  signin: {
    image: "1615529182904-14819c35db37",
    alt: "A calm, light-filled interior — Atelier Véra client portal",
  },
  signup: {
    image: "1600047509807-ba8f99d2cdde",
    alt: "A warm contemporary living space — Atelier Véra client portal",
  },
};

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Split-screen client-portal auth. Sign in and sign up share one persistent
 * component: switching mode slides the image panel across the screen while the
 * form panel slides the opposite way and its fields crossfade. The URL is
 * updated with history.replaceState so the component never unmounts (which is
 * what makes the transition possible). On mobile it collapses to a stacked
 * layout with a simple crossfade.
 */
export function AuthExperience({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [submitted, setSubmitted] = useState(false);

  const toggle = () => {
    const nextMode: Mode = mode === "signin" ? "signup" : "signin";
    setMode(nextMode);
    setSubmitted(false);
    window.history.replaceState(null, "", `/${nextMode}`);
  };

  const imageIsLeft = mode === "signin";

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-bone lg:h-dvh">
      {/* ---------- Desktop: sliding split screen ---------- */}
      <div className="hidden h-full lg:block">
        {/* Image panel */}
        <motion.div
          className="absolute top-0 h-full w-1/2 overflow-hidden"
          animate={{ left: imageIsLeft ? "0%" : "50%" }}
          initial={false}
          transition={{ duration: 0.9, ease }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={mode}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <Image
                src={unsplash(media[mode].image, 1600)}
                alt={media[mode].alt}
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/40" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-bone">
            <TransitionLink href="/" className="font-serif text-lg">
              ATELIER <span className="italic">Véra</span>
            </TransitionLink>
            <div>
              <span className="label text-bone/70">Client Portal</span>
              <p className="mt-4 max-w-sm font-serif text-3xl leading-tight">
                {mode === "signin"
                  ? "Welcome back to your projects."
                  : "Begin your journey with the studio."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form panel */}
        <motion.div
          className="absolute top-0 flex h-full w-1/2 items-center justify-center px-16"
          animate={{ left: imageIsLeft ? "50%" : "0%" }}
          initial={false}
          transition={{ duration: 0.9, ease }}
        >
          <div className="w-full max-w-md">
            <FormBody
              mode={mode}
              submitted={submitted}
              onSubmit={() => setSubmitted(true)}
              onToggle={toggle}
            />
          </div>
        </motion.div>
      </div>

      {/* ---------- Mobile: stacked with crossfade ---------- */}
      <div className="lg:hidden">
        <div className="relative h-52 w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={mode}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={unsplash(media[mode].image, 900)}
                alt={media[mode].alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/40" />
            </motion.div>
          </AnimatePresence>
          <div className="relative z-10 flex h-full flex-col justify-between p-6 text-bone">
            <TransitionLink href="/" className="font-serif text-lg">
              ATELIER <span className="italic">Véra</span>
            </TransitionLink>
            <span className="label text-bone/70">Client Portal</span>
          </div>
        </div>

        <div className="bg-bone px-5 py-10">
          <FormBody
            mode={mode}
            submitted={submitted}
            onSubmit={() => setSubmitted(true)}
            onToggle={toggle}
          />
        </div>
      </div>
    </div>
  );
}

/** The form itself — fields crossfade between sign in and sign up. */
function FormBody({
  mode,
  submitted,
  onSubmit,
  onToggle,
}: {
  mode: Mode;
  submitted: boolean;
  onSubmit: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="bg-bone lg:bg-transparent">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-bone">
              <Check className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-serif text-3xl tracking-tight text-ink">
              You&apos;re all set.
            </h2>
            <p className="mt-3 max-w-sm text-stone">
              This client portal is a concept demo — no account is actually
              created. In a live studio, you&apos;d now see your project timeline
              and documents here.
            </p>
            <TransitionLink
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm text-clay"
            >
              Return to the studio <ArrowUpRight className="h-4 w-4" />
            </TransitionLink>
          </motion.div>
        ) : (
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease }}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink">
              {mode === "signin" ? "Welcome back." : "Create your account."}
            </h1>
            <p className="mt-3 text-stone">
              {mode === "signin"
                ? "Sign in to access your projects and documents."
                : "Join the Atelier Véra client portal."}
            </p>

            <div className="mt-8 space-y-5">
              {mode === "signup" && <Input label="Full Name" type="text" required />}
              <Input label="Email" type="email" required />
              {mode === "signup" && <Input label="Phone" type="tel" required />}
              <Input label="Password" type="password" required />
              {mode === "signup" && (
                <Input label="Confirm Password" type="password" required />
              )}
            </div>

            {mode === "signin" && (
              <div className="mt-5 flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-stone">
                  <input type="checkbox" className="accent-clay" />
                  Remember me
                </label>
                <button type="button" className="text-stone underline underline-offset-4">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-ink py-4 text-sm tracking-wide text-bone transition-colors hover:bg-clay"
            >
              {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
            </button>

            {mode === "signin" && (
              <button
                type="button"
                onClick={onSubmit}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 py-4 text-sm text-ink transition-colors hover:bg-ink/5"
              >
                <GoogleMark />
                Continue with Google
              </button>
            )}

            <p className="mt-8 text-center text-sm text-stone">
              {mode === "signin" ? "New client?" : "Already with us?"}{" "}
              <button
                type="button"
                onClick={onToggle}
                className="font-medium text-clay underline underline-offset-4"
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({
  label,
  type,
  required,
}: {
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="label mb-2 block text-stone">{label}</span>
      <input
        type={type}
        required={required}
        className="w-full border-b border-ink/20 bg-transparent py-2.5 text-ink placeholder:text-stone focus:border-clay focus:outline-none"
      />
    </label>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5 0-.7-.1-1.4-.2-2z" opacity="0" />
      <path fill="currentColor" d="M12 5c1.6 0 3 .6 4.1 1.6l3-3A10 10 0 0 0 2.9 7.3l3.5 2.7A6 6 0 0 1 12 5z" />
      <path fill="currentColor" d="M12 23c2.7 0 5-1 6.6-2.6l-3.3-2.6c-.9.6-2 1-3.3 1a6 6 0 0 1-5.6-4.1l-3.5 2.7A10 10 0 0 0 12 23z" />
      <path fill="currentColor" d="M22.5 12.5c0-.7-.1-1.4-.2-2H12v3.9h5.5a4.7 4.7 0 0 1-2 3.1l3.3 2.6c1.9-1.8 3-4.4 3-7.6z" />
    </svg>
  );
}
