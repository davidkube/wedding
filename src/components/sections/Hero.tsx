"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content";
import { Wave } from "@/components/ui/Wave";
import { Lace } from "@/components/ui/Lace";
import { FilmStrip } from "@/components/ui/FilmStrip";
import { LinkButton } from "@/components/ui/Button";
import { SplitLines } from "@/components/motion/SplitWords";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One message, one action: the names, a date-and-place line, and RSVP /
 * The day buttons beside the film strip. The invitation card lives in RSVP.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const blockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: blockRef, offset: ["start start", "end start"] });
  const blockY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const blockOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <div id="top">
      <section className="wine-depth relative z-10 overflow-hidden px-[clamp(16px,4vw,64px)] pb-[clamp(72px,9vw,120px)] pt-[clamp(96px,12vw,150px)] text-oat">
        <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <Lace />
          <div className="grid gap-[clamp(28px,4vw,56px)] pt-[clamp(48px,5vw,72px)] md:grid-cols-[1fr_clamp(220px,26vw,320px)] md:items-center">
            <motion.div ref={blockRef} style={reduce ? undefined : { y: blockY, opacity: blockOpacity }}>
              <SplitLines
                lines={hero.nameLines}
                align={["left", "left"]}
                delay={0.25}
                className="display text-blush text-[clamp(64px,11vw,176px)] leading-[0.95] tracking-[3px]"
              />
              <motion.p
                className="mono-caps mt-[clamp(20px,2.5vw,32px)] text-blush/80 tracking-[0.16em]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
              >
                {hero.meta}
              </motion.p>
              <motion.div
                className="mt-[clamp(20px,2.5vw,32px)] flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
              >
                {hero.ctas.map((c) => (
                  <LinkButton key={c.href} href={c.href} variant={c.primary ? "primary" : "light"}>
                    {c.label}
                  </LinkButton>
                ))}
              </motion.div>
            </motion.div>

            <FilmStrip className="md:aspect-auto md:min-h-[clamp(440px,50vw,620px)] md:self-stretch" />
          </div>
        </div>
        <Wave fill="oat" elevated />
      </section>
    </div>
  );
}
