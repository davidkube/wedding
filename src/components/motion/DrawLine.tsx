"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A vertical rule that draws itself as the wrapped content scrolls past.
 * Children are laid out normally; the line sits in the column you choose.
 */
export function DrawLineFrame({
  children,
  className,
  lineClassName,
}: {
  children: ReactNode;
  className?: string;
  lineClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 80, damping: 24 });
  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        aria-hidden
        className={cn("absolute top-0 bottom-0 w-px origin-top bg-olive-light", lineClassName)}
        style={{ scaleY }}
      />
      {children}
    </div>
  );
}
