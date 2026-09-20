"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { dressCode, faq } from "@/content";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-dotted border-oat/35 py-4">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full cursor-pointer items-start justify-between gap-4 text-left">
        <span className="font-serif text-[20px] leading-[1.15]">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="mt-0.5 font-mono text-[16px] leading-none">
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-[48ch] pt-2.5 text-[14px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <Section id="faq" ground="wine" className="relative z-0 overflow-hidden">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <Reveal className="flex flex-wrap items-start gap-x-6 gap-y-2">
        <Title className="text-blush">{faq.title}</Title>
        <motion.div
          className="mt-4 rounded-full bg-oat px-4 py-2.5 font-serif text-[18px] italic text-coral shadow-[0_2px_0_rgba(38,43,33,0.25)]"
          initial={{ rotate: -7, scale: 0, opacity: 0 }}
          whileInView={{ rotate: -7, scale: 1, opacity: 1 }}
          whileHover={{ rotate: 2, scale: 1.06 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 }}
        >
          {faq.sticker}
        </motion.div>
      </Reveal>

      <Reveal delay={1} className="mt-[clamp(20px,3vw,36px)] grid gap-x-[clamp(24px,4vw,64px)] md:grid-cols-2">
        {faq.items.map((it, i) => (
          <Item key={it.q} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </Reveal>

      <div className="mt-[clamp(40px,6vw,80px)]">
        <Reveal className="inline-block border border-dashed border-olive-light/70 px-[18px] py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-olive-light">
          {dressCode.eyebrow}
        </Reveal>
        <Stagger className="mt-[clamp(20px,3vw,36px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(16px,3vw,40px)]">
          {dressCode.cards.map((c) => (
            <StaggerItem key={c.title}>
              <ImageReveal>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Photo image={c.image} placeholder={c.placeholder} tone={c.tone} sizes="(max-width: 768px) 100vw, 560px" />
                </div>
              </ImageReveal>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-[clamp(20px,3vw,36px)] inline-block max-w-full border border-dashed border-olive-light/70 px-[18px] py-2 font-mono text-[11px] uppercase leading-[1.7] tracking-[0.14em] text-olive-light">
          {dressCode.avoid}
        </Reveal>
      </div>
    </Section>
  );
}
