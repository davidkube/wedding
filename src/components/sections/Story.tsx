"use client";

import { motion } from "motion/react";
import { story } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Drift } from "@/components/motion/Parallax";
import { Ghost } from "@/components/motion/Ghost";
import { Road } from "@/components/motion/Road";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Story() {
  return (
    <Section id="story" ground="blush" className="relative overflow-hidden">
      <Ghost letter="P" className="-left-[0.1em] top-[12%]" />
      <div className="relative">
        <Reveal className="flex items-baseline justify-between gap-4 border-b border-ink pb-2.5">
          <span className="font-serif text-[clamp(32px,4vw,56px)] leading-none text-olive">{story.startYear}</span>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <span className="font-serif text-[clamp(32px,4vw,56px)] leading-none text-olive">{story.endYear}</span>
        </Reveal>

        <div className="mt-[clamp(24px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(28px,4vw,56px)]">
          <div>
            <Reveal className="mb-4 font-serif text-[clamp(22px,2.2vw,28px)] italic text-ink">{story.roadLabel}</Reveal>
            <Road count={story.chapters.length}>
              {story.chapters.map((c, i) => (
                <Reveal key={c.when} delay={i * 0.5} amount={0.6} className="flex min-h-[84px] flex-col justify-center py-3 pl-2">
                  <span className="font-mono text-[12px] text-coral">{c.when}</span>
                  <span className="mt-1 font-serif text-[clamp(19px,1.8vw,22px)] leading-[1.1]">{c.what}</span>
                </Reveal>
              ))}
            </Road>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 md:gap-6">
            {story.photos.map((p, i) => (
              <Drift key={i} distance={i === 0 ? 30 : -30} className={i === 1 ? "mt-10" : ""}>
                <Reveal delay={i}>
                  <motion.figure
                    className="polaroid m-0"
                    initial={{ rotate: i === 0 ? -3 : 2.5 }}
                    whileHover={{ rotate: 0, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  >
                    <span aria-hidden className="tape absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-4deg]" />
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.15 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: EASE }}
                      >
                        <Photo
                          image={"src" in p && p.src ? { src: p.src, alt: p.alt, objectPosition: p.objectPosition } : undefined}
                          placeholder={p.placeholder}
                          tone="rose"
                          sizes="(max-width: 768px) 50vw, 280px"
                        />
                      </motion.div>
                    </div>
                    <figcaption className="absolute inset-x-2 bottom-1.5 text-center font-serif text-[14px] italic text-ink-soft">{p.caption}</figcaption>
                  </motion.figure>
                </Reveal>
              </Drift>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
