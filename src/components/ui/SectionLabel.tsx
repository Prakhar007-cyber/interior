import { cn } from "@/lib/utils";

/**
 * Small editorial eyebrow with a leading rule — e.g. "— Selected Work".
 * Used to introduce sections in a consistent, restrained way.
 */
export function SectionLabel({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "label flex items-center gap-3",
        dark ? "text-stone-light" : "text-stone",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          dark ? "bg-stone-light/50" : "bg-stone/50",
        )}
      />
      {children}
    </span>
  );
}
