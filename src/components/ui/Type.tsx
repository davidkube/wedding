import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ className, tone = "coral", ...rest }: ComponentPropsWithoutRef<"div"> & { tone?: "coral" | "ink" | "olive" | "muted" }) {
  const tones = { coral: "text-coral", ink: "text-ink", olive: "text-olive", muted: "text-stone" };
  return <div className={cn("eyebrow", tones[tone], className)} {...rest} />;
}

export function Title({ className, ...rest }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn("display mt-3 text-olive text-[clamp(40px,6vw,84px)] text-balance", className)}
      {...rest}
    />
  );
}

export function Mono({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("font-mono text-[12px]", className)} {...rest} />;
}
