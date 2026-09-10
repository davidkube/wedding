"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Splits text into words and slides each up from behind a clipping mask.
 * Lines are passed separately so the serif can break exactly where we want.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h1",
}: {
  lines: ReadonlyArray<string>;
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "div";
}) {
  let i = 0;
  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <span key={li} className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", lineClassName)}>
          {line.split(" ").map((word, wi) => {
            const idx = i++;
            return (
              <motion.span
                key={wi}
                className="inline-block will-change-transform"
                initial={{ y: "110%", rotate: 3, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE, delay: delay + idx * 0.09 }}
              >
                {word}
                {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
