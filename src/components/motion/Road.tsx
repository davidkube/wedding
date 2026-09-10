"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const W = 56;
const AMP = 20;

/**
 * "Our winding road" (W01): a wavy line that draws itself as you scroll,
 * with a coral stop for each chapter. The path is built in pixels from the
 * measured column height, so stops land exactly on the line.
 */
export function Road({ count, children, className }: { count: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 55%"] });
  const pathLength = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 70, damping: 22 });

  const H = height || 1;
  const xAt = (t: number) => W / 2 + AMP * Math.sin(t * Math.PI * 2);
  const pts = Array.from({ length: 81 }, (_, i) => {
    const t = i / 80;
    return [xAt(t), t * H] as const;
  });
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const stops = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    return { x: xAt(t), y: t * H, t };
  });

  return (
    <div ref={ref} className={cn("relative grid grid-cols-[56px_1fr]", className)}>
      {height > 0 && (
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute left-0 top-0 overflow-visible">
          <path d={d} fill="none" stroke="#a9b37f" strokeWidth="1" strokeDasharray="3 4" />
          <motion.path d={d} fill="none" stroke="#5d6b3b" strokeWidth="2" strokeLinecap="round" style={reduce ? undefined : { pathLength }} />
        </svg>
      )}
      {height > 0 &&
        stops.map((s, i) => <Stop key={i} x={s.x} y={s.y} t={s.t} progress={pathLength} reduce={!!reduce} />)}
      <div className="col-start-2 grid" style={{ gridTemplateRows: `repeat(${count}, 1fr)` }}>
        {children}
      </div>
    </div>
  );
}

function Stop({ x, y, t, progress, reduce }: { x: number; y: number; t: number; progress: ReturnType<typeof useSpring>; reduce: boolean }) {
  const scale = useTransform(progress, [Math.max(0, t - 0.06), t], [0, 1]);
  return (
    <motion.span
      aria-hidden
      className="absolute z-10 h-3.5 w-3.5 rounded-full border-2 border-blush bg-coral shadow-[0_0_0_1px_#dd6a4f]"
      style={{ left: x, top: y, x: "-50%", y: "-50%", scale: reduce ? 1 : scale }}
    />
  );
}
