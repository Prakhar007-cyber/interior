"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

type FormData = {
  type: string;
  area: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
};

const emptyForm: FormData = {
  type: "",
  area: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  message: "",
};

const projectTypes = ["Apartment", "Villa", "Penthouse", "Office", "Restaurant", "Other"];
const areas = ["Under 1,000 sq ft", "1,000–2,500", "2,500–5,000", "5,000+"];
const budgets = ["₹10–20L", "₹20–40L", "₹40L–₹1Cr", "₹1Cr+"];

const steps = [
  "What are you designing?",
  "Approximate area",
  "Project budget",
  "Your details",
  "Tell us about your project",
];

// Slide transition shared by every step panel.
const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export function Contact() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // Auto-advance after choosing an option in the selection steps.
  const choose = (patch: Partial<FormData>) => {
    set(patch);
    setTimeout(next, 260);
  };

  const canProceed =
    (step === 0 && data.type) ||
    (step === 1 && data.area) ||
    (step === 2 && data.budget) ||
    (step === 3 && data.name && data.email && data.phone) ||
    step === 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: we simply show the success state.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-ink py-24 text-bone md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Left: invitation */}
        <div>
          <SectionLabel dark>Enquire</SectionLabel>
          <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight text-bone">
            Let&apos;s create
            <br />
            something{" "}
            <span className="italic text-clay-soft">lasting.</span>
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-stone-light">
            Tell us a little about your space and how you want it to feel. We take
            on a small number of projects each year, and we&apos;d love to hear
            about yours.
          </p>

          {/* Step indicator */}
          {!submitted && (
            <div className="mt-12 hidden gap-3 lg:flex">
              {steps.map((label, i) => (
                <div key={label} className="flex-1">
                  <div
                    className={`h-px w-full transition-colors duration-500 ${
                      i <= step ? "bg-clay" : "bg-bone/20"
                    }`}
                  />
                  <span
                    className={`mt-3 block text-[0.65rem] tracking-wide transition-colors duration-500 ${
                      i === step ? "text-bone" : "text-stone"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: form / success */}
        <div className="relative min-h-104 rounded-sm border border-bone/12 bg-charcoal/40 p-6 md:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full min-h-96 flex-col items-start justify-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay text-bone">
                  <Check className="h-6 w-6" />
                </span>
                <h3 className="mt-8 font-serif text-3xl tracking-tight text-bone md:text-4xl">
                  Thank you, {data.name || "friend"}.
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-stone-light">
                  Your enquiry is with the studio. We read every message
                  personally and will be in touch within two working days to start
                  the conversation.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(0);
                    setData(emptyForm);
                  }}
                  className="mt-8 text-sm text-clay-soft underline underline-offset-4"
                >
                  Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <span className="label text-stone">
                    Step 0{step + 1} — {steps[step]}
                  </span>
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {step === 0 && (
                        <ChoiceGrid
                          options={projectTypes}
                          value={data.type}
                          onSelect={(v) => choose({ type: v })}
                        />
                      )}
                      {step === 1 && (
                        <ChoiceGrid
                          options={areas}
                          value={data.area}
                          onSelect={(v) => choose({ area: v })}
                        />
                      )}
                      {step === 2 && (
                        <ChoiceGrid
                          options={budgets}
                          value={data.budget}
                          onSelect={(v) => choose({ budget: v })}
                        />
                      )}
                      {step === 3 && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field label="Name" value={data.name} onChange={(v) => set({ name: v })} required />
                          <Field label="Phone" type="tel" value={data.phone} onChange={(v) => set({ phone: v })} required />
                          <Field label="Email" type="email" value={data.email} onChange={(v) => set({ email: v })} required />
                          <Field label="City" value={data.city} onChange={(v) => set({ city: v })} />
                        </div>
                      )}
                      {step === 4 && (
                        <div>
                          <label className="label mb-3 block text-stone">Your project</label>
                          <textarea
                            value={data.message}
                            onChange={(e) => set({ message: e.target.value })}
                            rows={6}
                            placeholder="A few words about your space, your timeline and what you're hoping for…"
                            className="w-full resize-none rounded-sm border border-bone/15 bg-bone/5 p-4 text-bone placeholder:text-stone focus:border-clay focus:outline-none"
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="flex items-center gap-2 text-sm text-stone-light transition-opacity disabled:pointer-events-none disabled:opacity-0"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canProceed}
                      className="flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-sm text-ink transition-colors hover:bg-clay hover:text-bone disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm tracking-wide text-bone transition-colors hover:bg-clay-soft"
                    >
                      START THE CONVERSATION <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/** Grid of large selectable option chips used by the choice steps. */
function ChoiceGrid({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded-sm border px-5 py-6 text-left font-serif text-lg transition-all duration-300 ${
            value === option
              ? "border-clay bg-clay/10 text-bone"
              : "border-bone/15 text-bone/80 hover:border-bone/40"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** Minimal underlined text field. */
function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="label mb-2 block text-stone">
        {label}
        {required && <span className="text-clay-soft"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-bone/20 bg-transparent py-2 text-bone placeholder:text-stone focus:border-clay focus:outline-none"
      />
    </label>
  );
}
