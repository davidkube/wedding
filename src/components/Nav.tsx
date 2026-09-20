"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks } from "@/content";
import { cn } from "@/lib/cn";
import { Monogram } from "./Monogram";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Slim sticky nav: spaced caps and the monogram. Slides away on scroll down,
 * back on scroll up, with a coral progress hairline. On small screens the
 * links live in a full-screen wine menu.
 */
export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-[clamp(16px,4vw,64px)] py-3 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled && !open ? "border-b border-ink/15 bg-blush/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top" onClick={() => setOpen(false)}>
          <Monogram className={cn("transition-colors duration-500", (open || !scrolled) && "text-oat")} />
        </a>

        <nav className="hidden items-center gap-x-[clamp(12px,2vw,28px)] font-body text-[11px] font-medium uppercase tracking-[0.16em] md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "relative py-1 transition-colors hover:text-coral after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                "accent" in l && l.accent ? "text-coral" : scrolled ? "text-ink" : "text-oat",
              )}
            >
              <span className="mr-1.5 font-mono text-[10px] tracking-[0.12em] text-coral">{l.number}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cn("relative flex h-10 w-10 items-center justify-center", open || !scrolled ? "text-oat" : "text-ink")}
          >
            <motion.span className="absolute h-px w-5 bg-current" animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }} transition={{ duration: 0.3 }} />
            <motion.span className="absolute h-px w-5 bg-current" animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }} transition={{ duration: 0.3 }} />
          </button>
        </div>

        <motion.div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-coral" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            data-lenis-prevent
            className="wine-depth fixed inset-0 z-40 flex flex-col justify-end px-[clamp(16px,4vw,64px)] pb-10 pt-24 text-oat md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="grid gap-1">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn("display flex items-baseline justify-between border-b border-dotted border-oat/40 py-3 text-[clamp(36px,11vw,56px)]", "accent" in l && l.accent ? "text-coral-light" : "text-oat")}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  {l.label}
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-blush/70">{l.number}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
