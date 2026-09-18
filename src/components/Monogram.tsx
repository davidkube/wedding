import { couple } from "@/content";
import { cn } from "@/lib/cn";
import { MARK_PATHS, MARK_VIEWBOX } from "./mark/graphic";

/** Site mark from `src/app/WDDING LOGO-02.svg` (nav, hero ticket, footer). */
export function Monogram({ className, size = 38 }: { className?: string; size?: number }) {
  const height = size * (605.94 / 602.78);

  return (
    <svg
      width={size}
      height={height}
      viewBox={MARK_VIEWBOX}
      role="img"
      aria-label={couple.names}
      className={cn("shrink-0 text-[#f6b419]", className)}
    >
      {MARK_PATHS.map((d) => (
        <path key={d.slice(0, 16)} fill="currentColor" d={d} />
      ))}
    </svg>
  );
}
