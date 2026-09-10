import { cn } from "@/lib/cn";

/**
 * A soft wavy edge (W14's dividers). Sits at the bottom of a band and is
 * filled with the colour of whatever comes next.
 */
export function Wave({ className, fill = "#1f251b", flip }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 bottom-[-1px] block h-[clamp(28px,6vw,80px)] w-full", flip && "-scale-x-100", className)}
    >
      <path
        d="M0 46 C 180 10, 300 80, 480 52 S 780 10, 960 44 S 1280 78, 1440 30 L1440 80 L0 80 Z"
        fill={fill}
      />
    </svg>
  );
}
