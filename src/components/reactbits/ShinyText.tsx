"use client";

// React Bits — ShinyText (https://reactbits.dev). MIT licensed, adapted to TS.
// A subtle highlight sweeps across the text on a loop. Tuned to our warm
// palette so it reads as a quiet shimmer, not a flashy gradient.

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function ShinyText({ text, className = "", speed = 5 }: ShinyTextProps) {
  return (
    <span
      className={`av-shiny ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
      <style jsx>{`
        .av-shiny {
          color: color-mix(in srgb, var(--color-stone) 70%, transparent);
          background: linear-gradient(
            120deg,
            transparent 20%,
            var(--color-ink) 50%,
            transparent 80%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          animation: av-shine linear infinite;
        }
        @keyframes av-shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .av-shiny {
            animation: none;
            color: var(--color-stone);
            -webkit-text-fill-color: currentColor;
          }
        }
      `}</style>
    </span>
  );
}
