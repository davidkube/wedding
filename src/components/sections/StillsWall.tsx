"use client";

import { motion } from "motion/react";
import { gallery } from "@/content";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Drift } from "@/components/motion/Parallax";
import { Wave } from "@/components/ui/Wave";

const TILT = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.4];

/**
 * The stills wall as a desk scrapbook (M25, M28): prints scattered on the
 * dark ground with filename captions, tape, and a print-grain overlay.
 */
export function StillsWall() {
  return (
    <Section id="stills" ground="dark" className="relative overflow-hidden pb-[clamp(72px,10vw,140px)]">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <Reveal className="inline-block border border-dashed border-olive-light px-[18px] py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-olive-light">
          {gallery.label}
        </Reveal>
        <Stagger className="mt-[clamp(24px,3vw,44px)] grid grid-cols-2 gap-x-[clamp(14px,2.4vw,32px)] gap-y-[clamp(24px,3vw,40px)] md:grid-cols-3">
          {gallery.stills.map((s, i) => (
            <Drift key={s.caption} distance={[18, 40, 28][i % 3]}>
              <StaggerItem>
                <motion.figure
                  className="polaroid relative m-0"
                  initial={{ rotate: TILT[i % TILT.length] }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 2 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  {i % 2 === 0 && <span aria-hidden className="tape absolute -top-2 right-3 h-4 w-12 rotate-[8deg]" />}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Photo image={s.image} placeholder={s.placeholder} tone="dark" sizes="(max-width: 768px) 50vw, 360px" />
                  </div>
                  <figcaption className="absolute inset-x-2 bottom-1 flex items-baseline justify-between gap-2 font-mono text-[10px] text-ink-soft">
                    <span className="truncate">{s.file}</span>
                    <span className="shrink-0 text-coral">{String(i + 1).padStart(2, "0")}</span>
                  </figcaption>
                </motion.figure>
                <div className="mt-2.5 font-serif text-[14px] italic text-oat-dim">{s.caption}</div>
              </StaggerItem>
            </Drift>
          ))}
        </Stagger>
      </div>
      <Wave fill="#f1ddd6" flip />
    </Section>
  );
}
