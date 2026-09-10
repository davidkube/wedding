"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { contact, rsvp, rsvpEndpoint } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Type";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

const toneClass = { coral: "text-coral", olive: "text-olive", muted: "text-stone" } as const;

export function Rsvp() {
  const f = rsvp.form;
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<string>("");
  const [meal, setMeal] = useState<string>("");
  const [dietary, setDietary] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const payload = () => ({
    name,
    attending: f.attending.options.find((o) => o.value === attending)?.label ?? "",
    meal: f.meal.options.find((o) => o.value === meal)?.label ?? "",
    dietary,
    plusOne: plusOne ? plusOneName : "",
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !attending) return;
    const data = payload();

    if (!rsvpEndpoint) {
      const body = Object.entries(data)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(f.mailSubject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(rsvpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="rsvp" ground="blush">
      <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5">
        {rsvp.summary.map((s) => (
          <StaggerItem key={s.label} className="border border-ink/15 bg-oat px-3.5 py-3">
            <div className={cn("eyebrow text-[10px] tracking-[0.18em]", toneClass[s.tone])}>{s.label}</div>
            <div className="mt-1 font-serif text-[20px] text-ink">{s.value}</div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-[clamp(24px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(24px,4vw,64px)]">
        <Reveal>
          <Eyebrow>{rsvp.eyebrow}</Eyebrow>
          <h2 className="display mt-3 text-olive text-[clamp(40px,5.6vw,76px)]">
            {rsvp.titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-[18px] max-w-[44ch]">{rsvp.intro}</p>
          <p className="mt-3.5 font-mono text-[12px] text-ink-soft">{rsvp.questionsLine}</p>
        </Reveal>

        <Reveal delay={1} className="relative border border-ink/20 bg-oat p-[clamp(20px,2.4vw,32px)]">
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
              <motion.form key="form" onSubmit={onSubmit} className="grid gap-4" exit={{ opacity: 0 }}>
                <div>
                  <Label htmlFor="rsvp-name">{f.name.label}</Label>
                  <Input id="rsvp-name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={f.name.placeholder} required />
                </div>

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

                <AnimatePresence initial={false}>
                  {attending !== "no" && (
                    <motion.fieldset
                      key="meal"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <Label as="legend">{f.meal.label}</Label>
                      <div className="flex flex-wrap gap-2">
                        {f.meal.options.map((o) => (
                          <Chip key={o.value} selected={meal === o.value} onClick={() => setMeal(o.value)}>
                            {o.label}
                          </Chip>
                        ))}
                      </div>
                    </motion.fieldset>
                  )}
                </AnimatePresence>

                <div>
                  <Label htmlFor="rsvp-dietary">{f.dietary.label}</Label>
                  <Textarea id="rsvp-dietary" name="dietary" value={dietary} onChange={(e) => setDietary(e.target.value)} placeholder={f.dietary.placeholder} />
                </div>

                <AnimatePresence initial={false}>
                  {plusOne && (
                    <motion.div
                      key="plus"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <Label htmlFor="rsvp-plus">{f.plusOne.nameLabel}</Label>
                      <Input id="rsvp-plus" name="plusOne" value={plusOneName} onChange={(e) => setPlusOneName(e.target.value)} placeholder={f.plusOne.namePlaceholder} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setPlusOne((v) => !v)}
                    className="font-mono text-[12px] text-ink underline-offset-4 hover:underline"
                  >
                    {plusOne ? f.plusOne.removeLabel : f.plusOne.addLabel}
                  </button>
                  <Button type="submit" disabled={status === "sending" || !name || !attending}>
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
    </Section>
  );
}
