"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { dressCode, faq } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Title } from "@/components/ui/Type";
import { LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

function Item({ q, a, open, onToggle, last }: { q: string; a: string; open: boolean; onToggle: () => void; last: boolean }) {
  return (
    <div className={cn("py-4", !last && "border-b border-dotted border-ink")}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-start justify-between gap-4 text-left">
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
    <Section id="faq" ground="kraft" className="relative">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(24px,4vw,64px)]">
        <Reveal className="relative">
          <Eyebrow tone="ink">{faq.eyebrow}</Eyebrow>
          <Title>{faq.title}</Title>
          <motion.div
            className="absolute right-0 -top-2 rounded-full bg-oat px-4 py-2.5 font-serif text-[18px] italic text-coral shadow-[0_2px_0_rgba(38,43,33,0.25)]"
            initial={{ rotate: -7, scale: 0, opacity: 0 }}
            whileInView={{ rotate: -7, scale: 1, opacity: 1 }}
            whileHover={{ rotate: 2, scale: 1.06 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 }}
          >
            {faq.sticker}
          </motion.div>
          <LinkButton variant="ink" href={faq.emailCta.href} className="mt-7">
            {faq.emailCta.label} →
          </LinkButton>
        </Reveal>

        <Reveal delay={1}>
          {faq.items.map((it, i) => (
            <Item key={it.q} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} last={i === faq.items.length - 1} />
          ))}
        </Reveal>
      </div>

      <div className="mt-[clamp(40px,6vw,80px)]">
        <Reveal>
          <Eyebrow tone="ink">{dressCode.eyebrow}</Eyebrow>
        </Reveal>
        <Stagger className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {dressCode.cards.map((c) => (
            <StaggerItem key={c.title}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo image={c.image} placeholder={c.placeholder} tone={c.tone} sizes="(max-width: 768px) 100vw, 360px" />
              </div>
              <div className="mt-2.5 font-serif text-[22px]">{c.title}</div>
            </StaggerItem>
          ))}
          <StaggerItem className="grid grid-cols-3 content-start gap-2">
            {dressCode.swatches.map((s) => {
              const [r, g, b] = [1, 3, 5].map((i) => parseInt(s.hex.slice(i, i + 2), 16));
              return (
                <div key={s.hex}>
                  <motion.div
                    className="h-[180px] origin-bottom"
                    style={{ background: s.hex }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                  <div className="mt-2 font-mono text-[10.5px] leading-[1.5]">
                    <b className="font-medium">{s.name}</b>
                    <br />
                    {s.hex}
                    <br />
                    <span className="text-ink-soft">
                      {r} {g} {b}
                    </span>
                  </div>
                </div>
              );
            })}
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  );
}
