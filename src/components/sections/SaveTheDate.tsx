"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { event, saveTheDate } from "@/content";
import { Ghost } from "@/components/motion/Ghost";
import { Reveal } from "@/components/motion/Reveal";

const TICK = 30_000;
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, TICK);
  return () => clearInterval(id);
}

/** Ticks every half minute; null on the server and first paint so the markup matches. */
function useCountdown(target: string) {
  const bucket = useSyncExternalStore(subscribe, () => Math.floor(Date.now() / TICK), () => null);
  if (bucket === null) return null;
  const diff = Math.max(0, new Date(target).getTime() - bucket * TICK);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return { days, hours, minutes, passed: diff === 0 };
}

/**
 * The supper-club poster moment (W07, candidate B): spaced caps, giant coral
 * numerals on olive-black and a live countdown in mono.
 */
export function SaveTheDate() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 0.94]);
  const spacing = useTransform(scrollYProgress, [0, 0.5], ["0.12em", "-0.02em"]);
  const c = useCountdown(event.start);
  const l = saveTheDate.countdown;

  return (
    <section ref={ref} className="relative overflow-hidden bg-olive-black px-[clamp(16px,4vw,64px)] py-[clamp(56px,9vw,128px)] text-center text-oat">
      <Ghost letter={saveTheDate.ghost} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 !text-[clamp(300px,60vw,900px)] text-olive-glow !opacity-[0.06]" distance={60} />
      <div className="relative mx-auto max-w-[1120px]">
        <Reveal className="font-body text-[clamp(11px,1.2vw,14px)] font-medium uppercase tracking-[0.5em] text-olive-glow">
          {saveTheDate.eyebrow.split(" ").join(" · ")}
        </Reveal>
        <motion.div
          className="display mt-[clamp(10px,2vw,24px)] whitespace-nowrap font-serif text-coral-light text-[clamp(64px,17vw,236px)] leading-none tabular-nums"
          style={reduce ? undefined : { scale, letterSpacing: spacing }}
        >
          {saveTheDate.numerals}
        </motion.div>
        <Reveal delay={1} className="mx-auto mt-[clamp(14px,2vw,28px)] font-mono text-[clamp(11px,1.1vw,14px)] uppercase tracking-[0.14em] text-oat-dim">
          {saveTheDate.line}
        </Reveal>
        <Reveal delay={2} className="mt-[clamp(20px,3vw,40px)] inline-flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 border border-dashed border-olive-light/70 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-olive-light">
          {c?.passed ? (
            <span>{l.passed}</span>
          ) : (
            <>
              <span className="tabular-nums">
                <b className="font-serif text-[clamp(22px,2.4vw,32px)] font-normal not-italic text-oat">{c ? c.days : "—"}</b> {l.days}
              </span>
              <span className="tabular-nums">
                <b className="font-serif text-[clamp(22px,2.4vw,32px)] font-normal text-oat">{c ? String(c.hours).padStart(2, "0") : "—"}</b> {l.hours}
              </span>
              <span className="tabular-nums">
                <b className="font-serif text-[clamp(22px,2.4vw,32px)] font-normal text-oat">{c ? String(c.minutes).padStart(2, "0") : "—"}</b> {l.minutes}
              </span>
              <span className="text-coral-light">{l.toGo}</span>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
