import { couple } from "@/content";
import { cn } from "@/lib/cn";

/** Hand-drawn ring around the initials. Drawn once, used in the nav and footer. */
export function Monogram({ className, size = 38 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={couple.names}
      className={cn("shrink-0 text-olive", className)}
    >
      <path
        d="M32 6.5c9-1 17 3 22 10 5 7 5.5 17 1.5 24.5-4 7.5-12.5 13-21.5 13.5-9 .5-18-4-23-11.5-5-7.5-5-17.5-1-25 4-7.5 12-11 22-11.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontSize="19"
        fontStyle="italic"
        fill="currentColor"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {couple.initials}
      </text>
    </svg>
  );
}
