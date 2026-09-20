"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { contact, rsvp, rsvpEndpoint } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Type";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Ghost } from "@/components/motion/Ghost";

type Status = "idle" | "sending" | "sent" | "error";
type Guest = { name: string; meal: string; dietary: string };

const blank: Guest = { name: "", meal: "", dietary: "" };

const collapse = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
} as const;

export function Rsvp() {
  const f = rsvp.form;
  const [attending, setAttending] = useState<string>("");
  const [party, setParty] = useState<Guest[]>([blank]);
  const [status, setStatus] = useState<Status>("idle");

  const coming = attending === "yes";
  const named = party.filter((g) => g.name.trim());
  const mealLabel = (value: string) => f.meal.options.find((o) => o.value === value)?.label ?? "";
  // Every row needs a name (remove the row otherwise) and, once they're coming, a meal —
  // so nobody who was added gets dropped silently.
  const ready = party.every((g) => g.name.trim()) && !!attending && (!coming || party.every((g) => g.meal));

  function updateGuest(i: number, patch: Partial<Guest>) {
    setParty((gs) => gs.map((g, gi) => (gi === i ? { ...g, ...patch } : g)));
  }
  function addGuest() {
    setParty((gs) => [...gs, blank]);
  }
  function removeGuest(i: number) {
    setParty((gs) => gs.filter((_, gi) => gi !== i));
  }

  // One reply per guest, so each lands as its own row in the sheet.
  const replies = () =>
    named.map((g) => ({
      guests: g.name.trim(),
      attending: f.attending.options.find((o) => o.value === attending)?.label ?? "",
      meal: coming ? mealLabel(g.meal) : "",
      dietary: coming ? g.dietary.trim() : "",
    }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ready) return;
    const rows = replies();

    if (!rsvpEndpoint) {
      const body = rows
        .map((r) =>
          Object.entries(r)
            .filter(([, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        )
        .join("\n\n");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(f.mailSubject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      // Apps Script web apps only accept cross-origin POSTs as "simple" requests
      // (text/plain, no preflight); form services like Formspree want JSON headers.
      const isAppsScript = /script\.google\.com/.test(rsvpEndpoint);
      const headers: Record<string, string> = isAppsScript
        ? { "Content-Type": "text/plain;charset=utf-8" }
        : { "Content-Type": "application/json", Accept: "application/json" };
      // In parallel: Apps Script takes a few seconds per call, and row order in the sheet doesn't matter.
      const results = await Promise.all(rows.map((row) => fetch(rsvpEndpoint, { method: "POST", headers, body: JSON.stringify(row) })));
      setStatus(results.every((res) => res.ok) ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="rsvp" ground="olive" className="relative overflow-hidden">
      <Ghost letter="&" className="-right-[0.05em] bottom-[-0.1em]" distance={70} />
      <div className="relative">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(24px,4vw,64px)]">
        <Reveal className="flex flex-col">
          <Eyebrow sectionId="rsvp">{rsvp.eyebrow}</Eyebrow>
          <h2 className="display mt-3 text-blush text-[clamp(40px,5.6vw,76px)]">
            {rsvp.titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-[18px] max-w-[44ch]">{rsvp.intro}</p>
          <p className="mt-3.5 max-w-[44ch] font-serif text-[15px] italic text-oat-dim">{rsvp.giftNote}</p>
          {/* Pushed to the column's foot so it lines up with the bottom of the reply card. */}
          <div className="mt-auto w-full max-w-[480px] pt-6">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Photo image={rsvp.image} sizes="(max-width: 768px) 100vw, 480px" />
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={1}
          className="@container relative flex flex-col border border-ink/25 bg-oat bg-cover bg-center p-[clamp(20px,2.4vw,32px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_2px_0_rgba(38,43,33,0.18),0_28px_48px_-24px_rgba(0,0,0,0.65)]"
          style={{ backgroundImage: "url(/images/paper-texture.jpg)" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-6 text-center"
              >
                <div className="font-serif text-[clamp(28px,3vw,40px)] text-olive">{f.success.title}</div>
                <p className="mt-3 max-w-[36ch] mx-auto">{f.success.body}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} className="flex flex-1 flex-col gap-4" exit={{ opacity: 0 }}>
                <fieldset>
                  <Label as="legend">{f.attending.label}</Label>
                  <div className="flex flex-wrap gap-2">
                    {f.attending.options.map((o) => (
                      <Chip key={o.value} selected={attending === o.value} onClick={() => setAttending(o.value)}>
                        {o.label}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-3">
                  {party.map((guest, i) => {
                    const first = guest.name.trim().split(/\s+/)[0];
                    return (
                      <div key={i} className="grid gap-2.5">
                        <div>
                          <Label htmlFor={`rsvp-guest-${i}`}>{i === 0 ? f.guest.label : f.guest.labelMore}</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`rsvp-guest-${i}`}
                              name={`guest-${i}`}
                              value={guest.name}
                              onChange={(e) => updateGuest(i, { name: e.target.value })}
                              placeholder={f.guest.placeholder}
                              required
                            />
                            {party.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeGuest(i)}
                                aria-label={f.guest.remove}
                                className="shrink-0 border border-ink/30 px-3 font-mono text-[13px] text-ink shadow-[inset_0_2px_3px_rgba(38,43,33,0.16)] hover:bg-blush"
                              >
                                −
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Meal and note per guest, side by side, only once they've said yes. */}
                        <AnimatePresence initial={false}>
                          {coming && (
                            <motion.div key="details" {...collapse} className="-m-0.5 overflow-hidden p-0.5">
                              {/* Side by side only when the card itself is wide enough (container query, not viewport). */}
                              <div className="grid gap-3 @sm:grid-cols-2">
                                <fieldset className="min-w-0">
                                  <Label as="legend">{first ? `${f.meal.label} · ${first}` : f.meal.label}</Label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {f.meal.options.map((o) => (
                                      <Chip key={o.value} compact selected={guest.meal === o.value} onClick={() => updateGuest(i, { meal: o.value })} className="justify-center">
                                        {o.label}
                                      </Chip>
                                    ))}
                                  </div>
                                </fieldset>
                                <div className="min-w-0">
                                  <Label htmlFor={`rsvp-dietary-${i}`}>{f.dietary.label}</Label>
                                  <Textarea
                                    id={`rsvp-dietary-${i}`}
                                    name={`dietary-${i}`}
                                    value={guest.dietary}
                                    onChange={(e) => updateGuest(i, { dietary: e.target.value })}
                                    placeholder={f.dietary.placeholder}
                                    className="min-h-[88px]"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  <button type="button" onClick={addGuest} className="justify-self-start font-mono text-[12px] text-ink underline-offset-4 hover:underline">
                    {f.guest.add}
                  </button>
                </div>

                <div className="mt-auto flex justify-end pt-2">
                  <Button
                    type="submit"
                    className="shadow-[0_3px_0_rgba(38,43,33,0.35),0_10px_18px_-10px_rgba(38,43,33,0.6)] transition-[transform,box-shadow,background-color] active:translate-y-[2px] active:bg-coral active:shadow-[0_1px_0_rgba(38,43,33,0.35),inset_0_2px_4px_rgba(0,0,0,0.25)] disabled:shadow-none"
                    disabled={status === "sending" || !ready}
                  >
                    {status === "sending" ? f.sending : f.submit}
                  </Button>
                </div>

                {status === "error" && (
                  <p role="alert" className="font-mono text-[12px] text-coral">
                    {f.error.title} {f.error.body}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
      </div>
    </Section>
  );
}
