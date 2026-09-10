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
};

/** Olive-light pill with an olive border; olive when selected. */
export function Chip({ selected, onClick, children, className, type = "button" }: Props) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-pressed={selected}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex h-10 items-center rounded-full border border-olive px-4 font-mono text-[12px] transition-colors duration-200",
        selected ? "bg-olive text-oat" : "bg-olive-pale text-ink hover:bg-[#cfd5b8]",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
