"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { gallery, type Still } from "@/content";
import { Photo } from "@/components/ui/Photo";

function FilmFrame({ item, index, progress }: { item: Still; index: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const x = useTransform(progress, [0, 1], ["-6%", "6%"]);
  return <figure className="film-frame">
    <div className="film-image"><motion.div className="film-image-inner" style={reduced ? undefined : { x }}><Photo image={item.image} placeholder={item.placeholder} tone="rose" sizes="(max-width: 760px) 75vw, 420px" /></motion.div></div>
    <figcaption><span>0{index + 1}</span><span>{item.caption}</span><span aria-hidden>✦</span></figcaption>
  </figure>;
}

/** Native touch scrolling with mouse drag enhancement; no wheel or touch interception. */
export function AlbumOverture() {
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; left: number } | null>(null);
  const reduced = useReducedMotion();
  const { scrollXProgress } = useScroll({ container: viewport });
  function down(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, left: event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  }
  function release(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function step(direction: number) {
    const el = viewport.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * .75, behavior: reduced ? "instant" : "smooth" });
  }
  return <section className="film-room" aria-labelledby="film-title">
    <div className="film-heading"><div><span className="mono-caps">{gallery.overture.archive}</span><h2 id="film-title">{gallery.overture.title} <em>{gallery.overture.emphasis}</em></h2></div><p id="film-help">{gallery.film.hint}</p></div>
    <div ref={viewport} className="film-viewport" tabIndex={0} role="region" aria-label={gallery.film.label} aria-describedby="film-help" data-lenis-prevent
      onPointerDown={down} onPointerMove={event => { if (drag.current) event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x); }}
      onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}
      onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1); }
        if (event.key === "Home" || event.key === "End") { event.preventDefault(); const el = event.currentTarget; el.scrollTo({ left: event.key === "Home" ? 0 : el.scrollWidth, behavior: "instant" }); }
      }}>
      <div className="film-track">{gallery.stills.map((item, index) => <FilmFrame key={item.file} item={item} index={index} progress={scrollXProgress} />)}</div>
    </div>
    <div className="film-footer"><span>{gallery.overture.caption}</span><div className="film-meter" aria-hidden><motion.div style={{ scaleX: scrollXProgress }} /></div><div className="album-controls"><button type="button" onClick={() => step(-1)} aria-label={gallery.film.previous}>←</button><button type="button" onClick={() => step(1)} aria-label={gallery.film.next}>→</button></div></div>
  </section>;
}
