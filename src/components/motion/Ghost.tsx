"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A giant translucent serif letter behind a section, drifting at its own
 * speed (W07's ghost initials). The parent needs `relative overflow-hidden`.
 */
export function Ghost({
  letter,
  className,
  distance = 90,
}: {
  letter: string;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn("ghost-letter absolute z-0 text-[clamp(220px,42vw,640px)]", className)}
      style={reduce ? undefined : { y }}
    >
      {letter}
    </motion.div>
  );
}
