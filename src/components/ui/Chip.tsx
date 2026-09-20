"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  name?: string;
  type?: "button" | "submit";
  /** Tighter type and padding for chips packed into a grid. */
  compact?: boolean;
};

/** Debossed pill, as if pressed into the card; sinks deeper and turns olive when selected. */
export function Chip({ selected, onClick, children, className, type = "button", compact }: Props) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-pressed={selected}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex h-10 items-center rounded-full border font-mono transition-[background-color,box-shadow,color] duration-200",
        compact ? "px-2.5 text-[11px]" : "px-4 text-[12px]",
        selected
          ? "border-olive-black/40 bg-olive text-oat shadow-[inset_0_3px_6px_rgba(0,0,0,0.38),inset_0_1px_2px_rgba(0,0,0,0.3)]"
          : "border-olive/60 bg-olive-pale text-ink shadow-[inset_0_2px_4px_rgba(38,43,33,0.22),inset_0_-1px_0_rgba(255,255,255,0.55)] hover:bg-[#cfd5b8]",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
