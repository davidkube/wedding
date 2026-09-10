"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The names at wordmark scale, rising out of a clip as the footer arrives. */
export function Wordmark({ text }: { text: string }) {
  return (
    <div className="mt-3 overflow-hidden">
      <motion.div
        className="display text-oat text-[clamp(56px,13.5vw,196px)] leading-[0.85] tracking-[-0.03em] text-balance"
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        {text}
      </motion.div>
    </div>
  );
}
