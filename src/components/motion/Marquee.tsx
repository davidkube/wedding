"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * An endless line of text that drifts sideways on its own and speeds up,
 * or reverses, with the scroll velocity. Four copies keep it seamless.
 */
export function Marquee({
  text,
  className,
  baseVelocity = 1.4,
  copies = 4,
}: {
  text: string;
  className?: string;
  /** Percent of one copy per second at rest. */
  baseVelocity?: number;
  copies?: number;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-100 / copies, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)} aria-hidden>
      <motion.div className="flex w-max will-change-transform" style={{ x }}>
        {Array.from({ length: copies }).map((_, i) => (
          <span key={i} className="block pr-[0.35em]">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
