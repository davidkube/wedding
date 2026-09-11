"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { gallery } from "@/content";
import { Photo } from "@/components/ui/Photo";

function Print({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const item = gallery.stills[index];
  const side = index - 1;
  const x = useTransform(progress, [0, .65, 1], [`${side * 6}%`, `${side * 88}%`, `${side * 100}%`]);
  const y = useTransform(progress, [0, .65, 1], [70 + index * 12, side === 0 ? -30 : 40, -60]);
  const rotate = useTransform(progress, [0, .65, 1], [side * 3, side * 14, side * 19]);
  const rotateY = useTransform(progress, [0, .65], [side * -28, side * 7]);
  return <motion.figure className="overture-print" style={{ x, y, rotate, rotateY, zIndex: index === 1 ? 3 : 2 }}>
    <div className="overture-image"><Photo image={item.image} sizes="(max-width: 700px) 46vw, 340px" /></div>
    <figcaption><span>{item.caption}</span><span>0{index + 1}</span></figcaption>
  </motion.figure>;
}

/** The sticky viewport is outside the clipping stage so native scrolling stays intact. */
export function AlbumOverture() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const titleX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const rule = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <section ref={ref} className="album-overture" aria-label={gallery.overture.label}>
    <div className="overture-sticky">
      <div className="overture-meta"><span>{gallery.overture.archive}</span><span>{gallery.overture.established}</span></div>
      <div className="overture-stage">
        <motion.h2 style={reduced ? undefined : { x: titleX }} className="overture-title">{gallery.overture.title} <em>{gallery.overture.emphasis}</em></motion.h2>
        <div className="overture-prints">
          {reduced ? gallery.stills.slice(0, 3).map((item, index) => <figure key={item.file} className="overture-print"><div className="overture-image"><Photo image={item.image} sizes="33vw" /></div><figcaption>{item.caption}<span>0{index + 1}</span></figcaption></figure>) : [0, 1, 2].map(index => <Print key={index} index={index} progress={scrollYProgress} />)}
        </div>
      </div>
      <div className="overture-foot"><span>{gallery.overture.caption}</span><span className="overture-scroll">{gallery.overture.scroll}</span></div>
      <motion.div aria-hidden className="overture-progress" style={reduced ? { scaleX: 1 } : { scaleX: rule }} />
    </div>
  </section>;
}
