"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Smooth scrolling (Lenis) plus a global reduced-motion switch for Motion. */
export function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: !reduced }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
