"use client";

import { useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { gallery } from "@/content";
import { Photo } from "@/components/ui/Photo";

/** The same prints move from a closed stack to an open contact sheet using FLIP layout projection. */
export function StillsWall() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const toggle = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const count = gallery.stills.length;
  const transition = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 95, damping: 21 };
  function close() { setOpen(false); toggle.current?.focus({ preventScroll: true }); }
  return <LayoutGroup><motion.section layout transition={transition} id="stills" className={`contact-room transforming-album ${open ? "album-open" : ""}`} aria-label={gallery.deck.label}
    onKeyDown={event => { if (event.key === "Escape" && open) { event.preventDefault(); close(); } }}>
    <motion.div layout="position" transition={transition} className="contact-copy">
      <span className="mono-caps">{gallery.deck.eyebrow}</span>
      <h2>{gallery.deck.title[0]}<br />{gallery.deck.title[1]}<br /><em>{gallery.deck.emphasis}</em></h2>
      <p>{gallery.deck.description}<br />{gallery.deck.invitation}</p>
      <button ref={toggle} className="album-toggle" type="button" aria-expanded={open} aria-controls="album-prints" onClick={() => open ? close() : setOpen(true)}>{open ? gallery.deck.close : gallery.deck.open}<span aria-hidden>{open ? "−" : "↗"}</span></button>
      <div className="album-controls">
        <button type="button" onClick={() => setActive(value => (value - 1 + count) % count)} aria-label={gallery.deck.previous}>←</button>
        <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}<span className="sr-only"> — {gallery.stills[active].caption}</span></span>
        <button type="button" onClick={() => setActive(value => (value + 1) % count)} aria-label={gallery.deck.next}>→</button>
      </div>
    </motion.div>
    <div id="album-prints" className="contact-deck">
      {gallery.stills.map((item, index) => {
        const depth = (index - active + count) % count;
        return <motion.figure layout key={item.file} className={`contact-print ${active === index ? "print-selected" : ""}`} aria-hidden={!open && depth !== 0}
          animate={{ rotate: open ? 0 : depth === 0 ? -3 : depth % 2 ? 8 : -9, x: open ? 0 : depth * 5, y: open ? 0 : depth * -8, scale: open ? 1 : 1 - depth * .035 }} transition={transition} style={{ zIndex: count - depth }}>
          <div className="contact-photo"><Photo image={item.image} placeholder={item.placeholder} tone="rose" sizes="(max-width: 760px) 80vw, 480px" /></div>
          <figcaption><span>{item.caption}</span><span>0{index + 1}</span></figcaption>
        </motion.figure>;
      })}
    </div>
    <div className="contact-index" aria-label={gallery.deck.choose}>
      {gallery.stills.map((item, index) => <button key={item.file} type="button" aria-label={`Show ${item.caption}`} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span><span>{item.caption}</span><span aria-hidden>↗</span></button>)}
    </div>
  </motion.section></LayoutGroup>;
}
