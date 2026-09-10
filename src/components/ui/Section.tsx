import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const grounds = {
  blush: "bg-blush",
  rose: "bg-rose",
  oat: "bg-oat",
  kraft: "kraft-paper",
  dark: "bg-olive-black text-oat",
} as const;

type Props = ComponentPropsWithoutRef<"section"> & {
  ground?: keyof typeof grounds;
  /** Narrow: 760px, default: 1120px */
  width?: "default" | "narrow";
  tight?: boolean;
};

/** Full-width colour band with the standard padding and inner max-width. */
export function Section({ ground = "blush", width = "default", tight, className, children, ...rest }: Props) {
  return (
    <section
      className={cn(
        grounds[ground],
        tight ? "py-[clamp(20px,3vw,44px)]" : "py-[clamp(48px,7vw,104px)]",
        "px-[clamp(16px,4vw,64px)] scroll-mt-16",
        className,
      )}
      {...rest}
    >
      <div className={cn("mx-auto", width === "narrow" ? "max-w-[760px]" : "max-w-[1120px]")}>{children}</div>
    </section>
  );
}
