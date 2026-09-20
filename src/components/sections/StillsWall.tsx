"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { gallery, numberedEyebrow } from "@/content";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Drift } from "@/components/motion/Parallax";
import { Lightbox } from "@/components/Lightbox";

const TILT = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.4];

/**
 * The stills wall as a desk scrapbook (M25, M28): prints scattered on the
 * dark ground with filename captions, tape, and a print-grain overlay.
 * Any print opens full size in the lightbox.
 */
export function StillsWall() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="stills" ground="olive" className="relative z-10 overflow-hidden">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <Reveal className="inline-block border border-dashed border-olive-light/70 px-[18px] py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-olive-light">
          {numberedEyebrow("stills", gallery.label)}
        </Reveal>
        <Stagger className="mt-[clamp(24px,3vw,44px)] grid grid-cols-2 gap-x-[clamp(14px,2.4vw,32px)] gap-y-[clamp(24px,3vw,40px)] md:grid-cols-3">
          {gallery.stills.map((s, i) => (
            <Drift key={s.file} distance={[18, 40, 28][i % 3]}>
              <StaggerItem>
                <motion.figure
                  className="polaroid relative m-0"
                  initial={{ rotate: TILT[i % TILT.length] }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 2 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  {i % 2 === 0 && <span aria-hidden className="tape absolute -top-2 right-3 h-4 w-12 rotate-[8deg]" />}
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`View ${s.file} full size`}
                    className="relative block aspect-[3/2] w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                  >
                    <Photo image={s.image} placeholder={s.placeholder} tone="dark" sizes="(max-width: 768px) 50vw, 360px" />
                  </button>
                  <figcaption className="absolute inset-x-2 bottom-1 flex items-baseline justify-between gap-2 font-mono text-[10px] text-ink-soft">
                    <span className="truncate">{s.file}</span>
                    <span className="shrink-0 text-coral">{String(i + 1).padStart(2, "0")}</span>
                  </figcaption>
                </motion.figure>
              </StaggerItem>
            </Drift>
          ))}
        </Stagger>
      </div>
      <Lightbox stills={gallery.stills} index={open} onChange={setOpen} />
    </Section>
  );
}
