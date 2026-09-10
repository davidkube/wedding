"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { hero } from "@/content";
import { downloadIcs } from "@/lib/calendar";
import { Button, LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Wave } from "@/components/ui/Wave";
import { SplitLines } from "@/components/motion/SplitWords";
import { CoralBloom, LeafSprig, MustardSpray, PaleFrond } from "@/components/Illustrations";
import { Monogram } from "@/components/Monogram";

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

  // Botanicals: each layer scrolls at its own speed, and leans with the pointer.
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const leafY = useTransform(blockP, [0, 1], [0, -160]);
  const bloomY = useTransform(blockP, [0, 1], [0, -60]);
  const sprayY = useTransform(blockP, [0, 1], [0, -220]);
  const frondY = useTransform(blockP, [0, 1], [0, -110]);
  const leafX = useTransform(mx, (v) => v * -18);
  const bloomX = useTransform(mx, (v) => v * 26);
  const sprayX = useTransform(mx, (v) => v * 12);
  const frondX = useTransform(mx, (v) => v * -30);
  const bloomRotate = useTransform(mx, (v) => v * 6);
  const leafTilt = useTransform(my, (v) => v * -8);

  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

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
      <section
        onMouseMove={reduce ? undefined : onMove}
        className="relative overflow-hidden bg-blush px-[clamp(16px,4vw,64px)] pb-[clamp(20px,3vw,40px)] pt-[clamp(104px,15vw,180px)]"
      >
        {/* botanicals */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-[5vw] top-[9vw] w-[clamp(84px,20vw,280px)] md:-left-[3vw] md:top-[3vw]"
          style={reduce ? undefined : { y: leafY, x: leafX, rotate: leafTilt }}
          {...fade(0.5)}
        >
          <LeafSprig className="w-full" />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-[3vw] top-[14vw] w-[clamp(90px,15vw,220px)] md:top-[6vw]"
          style={reduce ? undefined : { y: bloomY, x: bloomX, rotate: bloomRotate }}
          {...fade(0.7)}
        >
          <CoralBloom className="w-full" />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[2vw] bottom-[-3vw] hidden w-[clamp(80px,11vw,170px)] sm:block"
          style={reduce ? undefined : { y: sprayY, x: sprayX }}
          {...fade(0.9)}
        >
          <MustardSpray className="w-full" />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-[2vw] bottom-[6vw] w-[clamp(140px,24vw,340px)]"
          style={reduce ? undefined : { y: frondY, x: frondX }}
          {...fade(1.1)}
        >
          <PaleFrond className="w-full" />
        </motion.div>

        <motion.div ref={blockRef} className="relative mx-auto max-w-[1280px]" style={reduce ? undefined : { y: blockY, opacity: blockOpacity }}>
          <motion.div className="eyebrow text-center text-coral" {...fade(0.1)}>
            {hero.eyebrow}
          </motion.div>
          <SplitLines
            lines={hero.nameLines}
            align={["left", "right"]}
            delay={0.25}
            className="display -mx-[0.06em] mt-[clamp(14px,2vw,28px)] text-olive text-[clamp(78px,19.5vw,272px)] leading-[0.88]"
          />
          <div className="mt-[clamp(20px,3vw,44px)] flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <motion.div className="font-mono text-[clamp(12px,1.1vw,15px)] tracking-[0.04em]" {...fade(0.8)}>
              {hero.dateLine}
            </motion.div>
            <motion.div className="flex flex-wrap gap-3" {...fade(0.95)}>
              <LinkButton href={hero.primaryCta.href}>{hero.primaryCta.label}</LinkButton>
              <Button variant="secondary" onClick={downloadIcs}>
                {hero.secondaryCta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section ref={bandRef} className="relative overflow-x-clip bg-rose px-[clamp(16px,4vw,64px)] pb-[clamp(60px,9vw,120px)] pt-[clamp(20px,3vw,44px)]">
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
              <span aria-hidden className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-ink/25 bg-rose" />
              <span aria-hidden className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-ink/25 bg-rose" />
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
        <Wave fill="#1f251b" />
      </section>
    </div>
  );
}
