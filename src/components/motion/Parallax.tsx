"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** How far the inner layer travels, as a fraction of its own height. */
  strength?: number;
  /** Extra scale so the moving layer never shows its edges. */
  scale?: number;
};

/**
 * Parallax frame: the outer box clips, the inner layer drifts as the frame
 * moves through the viewport. Put an absolutely positioned image inside.
 */
export function Parallax({ children, className, strength = 0.18, scale = 1.18 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-strength * 100}%`, `${strength * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduce ? undefined : { y, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Shifts a block vertically on scroll; used to offset columns at different speeds. */
export function Drift({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
