import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const labelClass = "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft";

export function Label({ className, as = "label", ...rest }: ComponentPropsWithoutRef<"label"> & { as?: "label" | "legend" }) {
  if (as === "legend") return <legend className={cn(labelClass, className)} {...(rest as ComponentPropsWithoutRef<"legend">)} />;
  return <label className={cn(labelClass, className)} {...rest} />;
}

const inputBase =
  "w-full border border-ink/25 bg-blush px-3 text-[15px] text-ink shadow-[inset_0_2px_4px_rgba(38,43,33,0.16),inset_0_-1px_0_rgba(255,255,255,0.5)] placeholder:text-stone focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive-light/60 transition";

export function Input({ className, ...rest }: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(inputBase, "h-11", className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(inputBase, "min-h-[72px] py-2.5 text-[14px]", className)} {...rest} />;
}
