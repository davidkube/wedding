"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gallery } from "@/content";
import { Photo } from "@/components/ui/Photo";

export function StillsWall() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const count = gallery.stills.length;
  const move = (step: number) => setActive(value => (value + step + count) % count);
  return <section id="stills" className="contact-room" aria-label={gallery.deck.label}>
    <div className="contact-copy">
      <span className="mono-caps">{gallery.deck.eyebrow}</span>
      <h2>{gallery.deck.title[0]}<br />{gallery.deck.title[1]}<br /><em>{gallery.deck.emphasis}</em></h2>
      <p>{gallery.deck.description}<br />{gallery.deck.invitation}</p>
      <div className="album-controls">
        <button type="button" onClick={() => move(-1)} aria-label={gallery.deck.previous}>←</button>
        <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
        <button type="button" onClick={() => move(1)} aria-label={gallery.deck.next}>→</button>
      </div>
    </div>
    <div className="contact-deck">
      {gallery.stills.map((item, index) => {
        const depth = (index - active + count) % count;
        return <motion.figure key={item.file} className="contact-print" aria-hidden={depth !== 0}
          animate={{ rotate: depth === 0 ? -3 : depth % 2 ? 8 : -9, x: depth * 5, y: depth * -8, scale: 1 - depth * .035 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 115, damping: 19 }}
          style={{ zIndex: count - depth }}>
          <div className="contact-photo"><Photo image={item.image} placeholder={item.placeholder} tone="rose" sizes="(max-width: 760px) 80vw, 480px" /></div>
          <figcaption><span>{item.caption}</span><span>0{index + 1}</span></figcaption>
        </motion.figure>;
      })}
    </div>
    <div className="contact-index" aria-label={gallery.deck.choose}>
      {gallery.stills.map((item, index) => <button key={item.file} type="button" aria-label={`Show ${item.caption}`} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span><span>{item.caption}</span><span aria-hidden>↗</span></button>)}
    </div>
  </section>;
}
