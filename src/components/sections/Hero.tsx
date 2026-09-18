"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero, numberedEyebrow } from "@/content";
import { LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Wave } from "@/components/ui/Wave";
import { SplitLines } from "@/components/motion/SplitWords";
import { Monogram } from "@/components/Monogram";
import { MarkPattern } from "@/components/mark/MarkPattern";

const EASE = [0.16, 1, 0.3, 1] as const;
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export function Hero() {
  const reduce = useReducedMotion();
  const blockRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  // Typographic block drifts up and fades slightly as the band takes over.
  const { scrollYProgress: blockP } = useScroll({ target: blockRef, offset: ["start start", "end start"] });
  const blockY = useTransform(blockP, [0, 1], [0, -80]);
  const blockOpacity = useTransform(blockP, [0, 0.9], [1, 0.35]);

  // Photo grows out of the band and parallaxes as you scroll through it; the
  // ticket card travels more slowly so it seems to float above the print.
  const { scrollYProgress: bandP } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const imgY = useTransform(bandP, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(bandP, [0, 0.5, 1], [1.25, 1.12, 1.2]);
  const frameScale = useTransform(bandP, [0, 0.4], [0.94, 1]);
  const frameRadius = useTransform(bandP, [0, 0.4], [24, 2]);
  const ticketY = useTransform(bandP, [0, 1], [70, -70]);
  const ticketRotate = useTransform(bandP, [0, 1], [-4, 1]);

  const t = hero.ticket;

  return (
    <div id="top">
      <section className="relative overflow-hidden bg-wine px-[clamp(16px,4vw,64px)] pb-[clamp(20px,3vw,40px)] pt-[clamp(104px,15vw,180px)] text-oat">
        <MarkPattern className="z-0" />
        <motion.div ref={blockRef} className="relative z-[1] mx-auto max-w-[1280px]" style={reduce ? undefined : { y: blockY, opacity: blockOpacity }}>
          <motion.div className="eyebrow text-center text-coral-light" {...fade(0.1)}>
            {numberedEyebrow("top", hero.eyebrow)}
          </motion.div>
          <SplitLines
            lines={hero.nameLines}
            align={["left", "right"]}
            delay={0.25}
            className="display mt-[clamp(14px,2vw,28px)] px-[clamp(12px,4vw,48px)] text-blush text-[clamp(68px,17vw,240px)] leading-[0.95]"
          />
          <motion.div className="mt-[clamp(20px,3vw,44px)] flex justify-center" {...fade(0.8)}>
            <LinkButton href={hero.primaryCta.href}>{hero.primaryCta.label}</LinkButton>
          </motion.div>
        </motion.div>
      </section>

      <section ref={bandRef} className="relative overflow-x-clip bg-oat px-[clamp(16px,4vw,64px)] pb-[clamp(60px,9vw,120px)] pt-[clamp(20px,3vw,44px)]">
        <div className="relative mx-auto max-w-[1120px]">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden border border-ink/15 sm:aspect-[16/10] md:aspect-[16/8]"
            style={reduce ? undefined : { scale: frameScale, borderRadius: frameRadius }}
          >
            <motion.div className="absolute inset-0 will-change-transform" style={reduce ? undefined : { y: imgY, scale: imgScale }}>
              {hero.media.video ? (
                <video
                  className="h-full w-full object-cover"
                  src={hero.media.video}
                  poster={hero.media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ objectPosition: hero.media.objectPosition }}
                />
              ) : (
                <Photo
                  image={{ src: hero.media.src, alt: hero.media.alt, objectPosition: hero.media.objectPosition }}
                  sizes="(max-width: 1200px) 100vw, 1120px"
                  priority
                />
              )}
            </motion.div>
            <div aria-hidden className="sprockets absolute inset-x-0 top-0 h-2.5 text-olive-black/80" />
            <div aria-hidden className="sprockets absolute inset-x-0 bottom-0 h-2.5 text-olive-black/80" />
          </motion.div>

          {/* ticket card (W01): the invitation as an object */}
          <motion.div
            className="relative z-10 mx-auto -mt-10 w-[min(100%,380px)] md:absolute md:bottom-[-56px] md:left-[clamp(8px,3vw,40px)] md:mx-0 md:mt-0 md:w-[clamp(280px,30vw,380px)]"
            style={reduce ? undefined : { y: ticketY, rotate: ticketRotate }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.2 }}
          >
            <div className="relative border border-ink/25 bg-oat text-ink shadow-[0_2px_0_rgba(38,43,33,0.2),0_24px_48px_-24px_rgba(38,43,33,0.5)]">
              <div className="pinstripe h-3 border-b border-ink/15" aria-hidden />
              <span aria-hidden className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-ink/25 bg-oat" />
              <span aria-hidden className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-ink/25 bg-oat" />
              <div className="px-6 pb-5 pt-4 text-center">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[9.5px] text-coral">{t.eyebrow}</span>
                  <Monogram size={30} />
                </div>
                <div className="mt-3 font-serif text-[clamp(26px,2.6vw,34px)] leading-none text-olive">{t.names}</div>
                <div className="mx-auto mt-3 flex items-center gap-2 font-mono text-[10px] text-stone">
                  <span className="h-px flex-1 bg-stone/60" />
                  <span>✦</span>
                  <span className="h-px flex-1 bg-stone/60" />
                </div>
                <div className="mt-3 font-serif text-[15px] italic">{t.date}</div>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-dotted border-stone pt-3 font-mono text-[11px] uppercase tracking-[0.08em]">
                  <div>
                    <div className="text-stone">at</div>
                    <div className="mt-0.5 text-ink">{t.time}</div>
                  </div>
                  <div>
                    <div className="text-stone">where</div>
                    <div className="mt-0.5 text-ink">{t.place}</div>
                  </div>
                </div>
                <div className="mt-3 border-t border-dotted border-stone pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-coral">{t.admit}</div>
              </div>
            </div>
          </motion.div>
        </div>
        <Wave fill="olive-black" elevated />
      </section>
    </div>
  );
}
