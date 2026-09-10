"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Smooth scrolling (Lenis) plus a global reduced-motion switch for Motion. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
