"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useCallback, useEffect } from "react";
import type { Still } from "@/content";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  stills: ReadonlyArray<Still>;
  /** Index of the open still, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
};

/**
 * A still projected on the dark wall: the print at full size with its
 * filename underneath, arrows either side, Escape or the backdrop to leave.
 */
export function Lightbox({ stills, index, onChange }: Props) {
  const lenis = useLenis();
  const open = index !== null;
  const still = index !== null ? stills[index] : null;
  const count = stills.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis, onChange, step]);

  return (
    <AnimatePresence>
      {still?.image && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={still.image.alt}
          data-lenis-prevent
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-olive-black/95 px-[clamp(16px,4vw,64px)] py-16 text-oat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={() => onChange(null)}
        >
          <div aria-hidden className="grain pointer-events-none absolute inset-0" />

          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Close"
            autoFocus
            className="absolute right-[clamp(12px,3vw,40px)] top-[clamp(12px,3vw,32px)] flex h-11 w-11 items-center justify-center rounded-full border border-oat/40 font-mono text-[18px] leading-none text-oat transition-colors hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            ×
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              className="relative m-0 flex max-w-full flex-col items-center"
              initial={{ opacity: 0, scale: 0.96, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="polaroid pb-8">
                {/* Same 3:2 framing as the wall, sized to the viewport (108vh keeps it under 72vh tall). */}
                <div className="relative aspect-[3/2] w-[min(92vw,1100px,108vh)]">
                  <Image src={still.image.src} alt={still.image.alt} fill sizes="(max-width: 1200px) 92vw, 1100px" priority className="object-cover" />
                </div>
                <figcaption className="absolute inset-x-3 bottom-2 flex items-baseline justify-between gap-3 font-mono text-[11px] text-ink-soft">
                  <span className="truncate">{still.file}</span>
                  <span className="shrink-0 text-coral">{String(index + 1).padStart(2, "0")}</span>
                </figcaption>
              </div>
            </motion.figure>
          </AnimatePresence>

          {count > 1 && (
            <div className="mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-oat-dim" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => step(-1)} className="py-2 transition-colors hover:text-coral">
                ← prev
              </button>
              <span aria-hidden>·</span>
              <button type="button" onClick={() => step(1)} className="py-2 transition-colors hover:text-coral">
                next →
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
