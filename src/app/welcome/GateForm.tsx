"use client";

import { motion } from "motion/react";
import { useActionState } from "react";
import { couple, event, gate, venue } from "@/content";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";
import { unlock, type GateState } from "./actions";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The invitation as a door: the card asks for the word, then lets you in. */
export function GateForm() {
  const [state, action, pending] = useActionState<GateState, FormData>(unlock, { attempts: 0 });
  const year = new Date(event.start).getFullYear();

  return (
    <motion.form
      action={action}
      className="relative w-[min(100%,420px)] border border-ink/25 bg-oat bg-cover bg-center text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_2px_0_rgba(38,43,33,0.2),0_28px_48px_-24px_rgba(0,0,0,0.65)]"
      style={{ backgroundImage: "url(/images/paper-texture.jpg)" }}
      initial={{ opacity: 0, y: 28, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
    >
      <div className="pinstripe h-3 border-b border-ink/15" aria-hidden />
      <div className="px-[clamp(20px,6vw,36px)] pb-7 pt-6 text-center">
        <span className="eyebrow text-[9.5px] text-[#a19939]">{gate.eyebrow}</span>
        <div className="mx-auto mt-3 flex items-center gap-2 font-mono text-[10px] text-stone">
          <span className="h-px flex-1 bg-stone/60" />
          <span>✦</span>
          <span className="h-px flex-1 bg-stone/60" />
        </div>
        <h1 className="display mt-4 text-[clamp(34px,7vw,44px)] text-wine">{couple.names}</h1>
        <p className="mt-2 font-serif text-[15px] italic text-ink-soft">
          {event.dateSpelled}, {year} · {venue.place}
        </p>

        {/* Remounts on every wrong answer so the shake plays again. */}
        <motion.div
          key={state.attempts}
          className="mt-6 text-left"
          animate={state.error ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Label htmlFor="gate-password">{gate.label}</Label>
          <Input
            id="gate-password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            placeholder={gate.placeholder}
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "gate-error" : undefined}
            className={state.error ? "border-coral" : undefined}
          />
        </motion.div>
        {state.error && (
          <p id="gate-error" role="alert" className="mt-3 font-mono text-[12px] text-coral">
            {state.error}
          </p>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="mt-5 w-full shadow-[0_3px_0_rgba(38,43,33,0.35),0_10px_18px_-10px_rgba(38,43,33,0.6)] transition-[transform,box-shadow,background-color] active:translate-y-[2px] active:shadow-[0_1px_0_rgba(38,43,33,0.35),inset_0_2px_4px_rgba(0,0,0,0.25)] disabled:shadow-none"
        >
          {pending ? gate.pending : gate.submit}
        </Button>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#a19939]">{gate.footer}</p>
      </div>
    </motion.form>
  );
}
