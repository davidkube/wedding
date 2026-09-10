"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { navLinks } from "@/content";
import { cn } from "@/lib/cn";
import { Monogram } from "./Monogram";

/** Slim sticky nav: spaced caps and the monogram. Slides away on scroll down, back on scroll up. */
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setScrolled(y > 24);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-[clamp(16px,4vw,64px)] py-3 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled ? "border-b border-ink/15 bg-blush/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
        <Monogram />
      </a>
      <nav className="flex flex-wrap items-center justify-end gap-x-[clamp(12px,2vw,28px)] gap-y-1 font-body text-[11px] font-medium uppercase tracking-[0.16em]">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={cn(
              "relative py-1 transition-colors hover:text-coral after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
              "accent" in l && l.accent ? "text-coral" : "text-ink",
            )}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
