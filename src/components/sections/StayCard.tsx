"use client";

import { motion } from "motion/react";
import type { StayCard as StayCardT } from "@/content";
import { Photo } from "@/components/ui/Photo";

export function StayCard({ stay }: { stay: StayCardT }) {
  return (
    <motion.a
      href={stay.href}
      target="_blank"
      rel="noreferrer"
      className="group block"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div className="absolute inset-0" variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <Photo image={stay.image} placeholder={stay.placeholder} tone={stay.tone} sizes="(max-width: 768px) 100vw, 360px" />
        </motion.div>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3 font-serif text-[24px] text-ink">
        <span>{stay.name}</span>
        <motion.span className="text-coral" variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}>
          ↗
        </motion.span>
      </div>
      <div className="mt-1 font-mono text-[12px] text-ink-soft">{stay.meta}</div>
    </motion.a>
  );
}
