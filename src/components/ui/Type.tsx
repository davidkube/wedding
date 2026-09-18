import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { PageSectionId } from "@/content/sections";
import { numberedEyebrow } from "@/content/sections";
import { cn } from "@/lib/cn";

export function Eyebrow({
  className,
  tone = "coral",
  sectionId,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { tone?: "coral" | "ink" | "olive" | "muted"; sectionId?: PageSectionId; children?: ReactNode }) {
  const tones = { coral: "text-coral", ink: "text-ink", olive: "text-olive", muted: "text-stone" };
  const label = sectionId && children != null ? numberedEyebrow(sectionId, String(children)) : children;
  return (
    <div className={cn("eyebrow", tones[tone], className)} {...rest}>
      {label}
    </div>
  );
}

export function Title({ className, ...rest }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn("display mt-3 text-[clamp(40px,6vw,84px)] text-balance", className)}
      {...rest}
    />
  );
}

export function Mono({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("font-mono text-[12px]", className)} {...rest} />;
}
