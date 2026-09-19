"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const SIT = "/images/cat/sit.png";
const WALK = ["/images/cat/walk-1.webp", "/images/cat/walk-2.webp", "/images/cat/walk-3.webp"];
/** Line across the viewport (fraction of its height) the cat keeps pace with. */
const ANCHOR = 0.5;
/** Either side of a stop, within this many px the cat sits instead of walking. */
const REST = 40;
/** Pixels of travel per walking frame. */
const STRIDE = 22;
/** Quiet time after the last scroll event before the cat parks on a stop. */
const IDLE_MS = 160;

type Stop = { x: number; y: number };

/** Hold at each stop, then walk the gap between neighbouring stops. */
function settle(raw: number, ys: number[]) {
  const first = ys[0];
  const last = ys[ys.length - 1];
  if (raw <= first) return first;
  if (raw >= last) return last;
  for (const y of ys) if (Math.abs(raw - y) <= REST) return y;
  for (let i = 0; i < ys.length - 1; i++) {
    const a = ys[i] + REST;
    const b = ys[i + 1] - REST;
    if (raw > a && raw < b) return ys[i] + ((raw - a) / (b - a)) * (ys[i + 1] - ys[i]);
  }
  return raw;
}

/** Layout position of `node` inside `root`, ignoring transforms. */
function offsetWithin(node: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = node;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/**
 * A black cat that sits on each timeline stop and pads down the line to the
 * next one as the page scrolls. Drop it inside a `relative` container whose
 * stops are marked with `data-cat-stop`.
 */
export function CatWalk() {
  const ref = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<Stop[]>([]);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const x = useMotionValue(0);
  const target = useMotionValue(0);
  const y = useSpring(target, { stiffness: 90, damping: 20, mass: 0.6 });

  const update = useCallback(() => {
    const el = ref.current;
    const stops = stopsRef.current;
    if (!el || stops.length === 0) return;
    const raw = window.innerHeight * ANCHOR - el.getBoundingClientRect().top;
    target.set(reduce ? stops[0].y : settle(raw, stops.map((s) => s.y)));
  }, [reduce, target]);

  // Once scrolling stops, walk to the nearest stop that is on screen and stand there.
  const park = useCallback(() => {
    const el = ref.current;
    const stops = stopsRef.current;
    if (!el || stops.length === 0) return;
    const top = el.getBoundingClientRect().top;
    const raw = window.innerHeight * ANCHOR - top;
    const onScreen = stops.filter((s) => top + s.y > 0 && top + s.y < window.innerHeight);
    const pool = onScreen.length ? onScreen : stops;
    const nearest = pool.reduce((a, b) => (Math.abs(b.y - raw) < Math.abs(a.y - raw) ? b : a));
    target.set(reduce ? stops[0].y : nearest.y);
  }, [reduce, target]);

  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onScroll = useCallback(() => {
    update();
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(park, IDLE_MS);
  }, [update, park]);
  useEffect(() => () => {
    if (idle.current) clearTimeout(idle.current);
  }, []);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const measure = () => {
      const dots = Array.from(host.querySelectorAll<HTMLElement>("[data-cat-stop]"));
      stopsRef.current = dots.map((d) => {
        const o = offsetWithin(d, host);
        return { x: o.x + d.offsetWidth / 2, y: o.y + d.offsetHeight / 2 };
      });
      if (stopsRef.current.length) {
        x.set(stopsRef.current[0].x);
        if (target.get() === 0) y.jump(stopsRef.current[0].y);
      }
      park();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [park, x, target, y]);

  useMotionValueEvent(scrollY, "change", onScroll);

  // 1 walking down the page, -1 walking back up; the walk frames flip to match.
  const dir = useMotionValue(1);
  const prevY = useRef(0);
  useMotionValueEvent(y, "change", (v) => {
    const d = v - prevY.current;
    prevY.current = v;
    if (Math.abs(d) > 0.5) dir.set(d < 0 ? -1 : 1);
  });

  const frame = useTransform(y, (v) => {
    if (reduce) return 0;
    const stops = stopsRef.current;
    // Before the stops are measured (or once settled on one), stand rather than mid-stride.
    if (stops.length === 0 || stops.some((s) => Math.abs(v - s.y) < 2)) return 0;
    return 1 + (Math.floor(v / STRIDE) % WALK.length);
  });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-20">
      <motion.div className="absolute h-14 w-14" style={{ left: x, top: y, x: "-50%", y: "-92%" }}>
        <Frame src={SIT} index={0} frame={frame} />
        {WALK.map((src, i) => (
          <Frame key={src} src={src} index={i + 1} frame={frame} flip={dir} />
        ))}
      </motion.div>
    </div>
  );
}

function Frame({ src, index, frame, flip }: { src: string; index: number; frame: MotionValue<number>; flip?: MotionValue<number> }) {
  const opacity = useTransform(frame, (f) => (f === index ? 1 : 0));
  return (
    <motion.div className="absolute inset-0" style={{ opacity, scaleY: flip }}>
      <Image src={src} alt="" fill sizes="56px" className="object-contain object-bottom" />
    </motion.div>
  );
}
