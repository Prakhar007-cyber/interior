"use client";

import { ArrowUpRight } from "lucide-react";
import { Magnet } from "@/components/reactbits/Magnet";
import { TransitionLink } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-bone hover:bg-clay",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink hover:text-clay",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof TransitionLink>, "href" | "children" | "className">)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

/**
 * Primary interactive element. Renders as a branded transition link when given
 * an internal href, an external anchor for http links, or a button otherwise.
 * Optionally wrapped in a magnetic field for a tactile hover.
 */
export function Button({
  children,
  variant = "solid",
  className,
  arrow = false,
  magnetic = true,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  let el: React.ReactNode;
  if (href && href.startsWith("http")) {
    el = (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  } else if (href) {
    el = (
      <TransitionLink href={href} className={classes} {...(rest as object)}>
        {inner}
      </TransitionLink>
    );
  } else {
    el = (
      <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnet className="inline-block">{el}</Magnet> : el;
}
