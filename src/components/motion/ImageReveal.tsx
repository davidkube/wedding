"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Wipes a photo in from a clipped edge while the picture settles from a
 * slight zoom. Wrap the aspect-ratio box, not the image.
 *
 * The in-view observer sits on an unclipped wrapper: Chrome's
 * IntersectionObserver honours clip-path, so a fully clipped element would
 * never count as visible and the wipe would never start.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  // Keep every keyframe in the same units so the browser's animation API accepts them.
  const start = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" }[from];
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <motion.div
        className="relative h-full w-full overflow-hidden"
        variants={{
          hidden: { clipPath: start },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE, delay } },
        }}
      >
        <motion.div
          className="h-full w-full"
          variants={{
            hidden: { scale: 1.18 },
            show: { scale: 1, transition: { duration: 1.5, ease: EASE, delay } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
