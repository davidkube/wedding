import { cn } from "@/lib/cn";

/** Match `h-[…]` on the wave SVG — use for pulling the next section up under it. */
export const waveOverlapClass = "-mt-[clamp(28px,6vw,80px)]";

/** Default section top padding plus one wave height (pairs with `waveOverlapClass`). */
export const waveOverlapPaddingClass = "pt-[clamp(76px,13vw,184px)]";

const FILLS = {
  wine: "var(--color-wine)",
  oat: "var(--color-oat)",
  /** Dark section band (olive black in the palette). */
  olive: "var(--color-olive-black)",
  "olive-black": "var(--color-olive-black)",
  rose: "var(--color-rose)",
  blush: "var(--color-blush)",
} as const;

export type WaveFill = keyof typeof FILLS;

function resolveFill(fill: WaveFill | string) {
  return fill in FILLS ? FILLS[fill as WaveFill] : fill;
}

/**
 * A soft wavy edge (W14's dividers). Sits at the bottom of a band and is
 * filled with the colour of whatever comes next.
 */
export function Wave({
  className,
  fill = "olive-black",
  flip,
  elevated,
}: {
  className?: string;
  fill?: WaveFill | string;
  flip?: boolean;
  /** Paint above the next section so the scallop isn't covered by its flat background. */
  elevated?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-[-1px] block h-[clamp(28px,6vw,80px)] w-full",
        elevated && "z-10",
        flip && "-scale-x-100",
        className,
      )}
    >
      <path
        d="M0 46 C 180 10, 300 80, 480 52 S 780 10, 960 44 S 1280 78, 1440 30 L1440 80 L0 80 Z"
        fill={resolveFill(fill)}
      />
    </svg>
  );
}
