"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content";
import { downloadIcs } from "@/lib/calendar";
import { Button, LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { SplitLines } from "@/components/motion/SplitWords";

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

  // Photo grows out of the band and parallaxes as you scroll through it.
  const { scrollYProgress: bandP } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const imgY = useTransform(bandP, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(bandP, [0, 0.5, 1], [1.25, 1.12, 1.2]);
  const frameScale = useTransform(bandP, [0, 0.4], [0.94, 1]);
  const frameRadius = useTransform(bandP, [0, 0.4], [24, 2]);

  return (
    <div id="top">
      <section className="bg-blush px-[clamp(16px,4vw,64px)] pb-[clamp(28px,4vw,56px)] pt-[clamp(112px,16vw,200px)] text-center">
        <motion.div ref={blockRef} style={reduce ? undefined : { y: blockY, opacity: blockOpacity }}>
          <motion.div className="eyebrow text-coral" {...fade(0.1)}>
            {hero.eyebrow}
          </motion.div>
          <SplitLines
            lines={hero.nameLines}
            delay={0.25}
            className="display mx-auto mt-[clamp(14px,2vw,28px)] text-olive text-[clamp(64px,13vw,184px)] leading-[0.92]"
          />
          <motion.div className="mt-[clamp(16px,2.4vw,32px)] font-mono text-[clamp(12px,1.1vw,15px)] tracking-[0.04em]" {...fade(0.8)}>
            {hero.dateLine}
          </motion.div>
          <motion.div className="mt-[clamp(20px,2.6vw,36px)] flex flex-wrap justify-center gap-3" {...fade(0.95)}>
            <LinkButton href={hero.primaryCta.href}>{hero.primaryCta.label}</LinkButton>
            <Button variant="secondary" onClick={downloadIcs}>
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section ref={bandRef} className="bg-rose px-[clamp(16px,4vw,64px)] py-[clamp(20px,3vw,44px)]">
        <motion.div
          className="relative mx-auto aspect-[16/9] max-w-[1120px] overflow-hidden border border-ink/15 md:aspect-[16/8]"
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
        </motion.div>
      </section>
    </div>
  );
}
