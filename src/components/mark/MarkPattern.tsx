import { useId } from "react";
import { cn } from "@/lib/cn";
import { MARK_PATHS } from "./graphic";

/** Crop out the large empty margins in the source SVG. */
const CROPPED_VIEWBOX = "138 78 326 446";
const TILE_W = 14;
const TILE_H = 20;

type Props = {
  className?: string;
  /** Mark colour (CSS). */
  fill?: string;
  opacity?: number;
};

/**
 * Tiled watermark of the wedding mark — tight staggered chain like the save-the-date.
 */
export function MarkPattern({ className, fill = "var(--color-blush)", opacity = 0.11 }: Props) {
  const patternId = `mark-pattern-${useId().replace(/:/g, "")}`;
  const markId = `${patternId}-mark`;

  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} preserveAspectRatio="none">
      <defs>
        <symbol id={markId} viewBox={CROPPED_VIEWBOX}>
          {MARK_PATHS.map((d) => (
            <path key={d.slice(0, 12)} d={d} />
          ))}
        </symbol>
        <pattern id={patternId} width={TILE_W} height={TILE_H} patternUnits="userSpaceOnUse">
          <use
            href={`#${markId}`}
            x="-1"
            width={TILE_W + 2}
            height={TILE_H}
            opacity={opacity}
            fill={fill}
            preserveAspectRatio="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
