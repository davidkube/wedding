"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { contact, rsvp, rsvpEndpoint } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Type";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { Reveal } from "@/components/motion/Reveal";
import { Ghost } from "@/components/motion/Ghost";

type Status = "idle" | "sending" | "sent" | "error";

export function Rsvp() {
  const f = rsvp.form;
  const [guests, setGuests] = useState<string[]>([""]);
  const [attending, setAttending] = useState<string>("");
  const [meal, setMeal] = useState<string>("");
  const [dietary, setDietary] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function updateGuest(i: number, value: string) {
    setGuests((gs) => gs.map((g, gi) => (gi === i ? value : g)));
  }
  function addGuest() {
    setGuests((gs) => [...gs, ""]);
  }
  function removeGuest(i: number) {
    setGuests((gs) => gs.filter((_, gi) => gi !== i));
  }

  const payload = () => ({
    guests: guests.filter(Boolean).join(", "),
    attending: f.attending.options.find((o) => o.value === attending)?.label ?? "",
    meal: f.meal.options.find((o) => o.value === meal)?.label ?? "",
    dietary,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!guests[0] || !attending) return;
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
    <Section id="rsvp" ground="olive" className="relative overflow-hidden">
      <Ghost letter="&" className="-right-[0.05em] bottom-[-0.1em]" distance={70} />
      <div className="relative">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(24px,4vw,64px)]">
        <Reveal>
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
                <div className="grid gap-2.5">
                  {guests.map((guest, i) => (
                    <div key={i}>
                      <Label htmlFor={`rsvp-guest-${i}`}>{i === 0 ? f.guest.label : f.guest.labelMore}</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`rsvp-guest-${i}`}
                          name={`guest-${i}`}
                          value={guest}
                          onChange={(e) => updateGuest(i, e.target.value)}
                          placeholder={f.guest.placeholder}
                          required={i === 0}
                        />
                        {guests.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGuest(i)}
                            aria-label={f.guest.remove}
                            className="shrink-0 border border-ink/30 px-3 font-mono text-[13px] text-ink hover:bg-blush"
                          >
                            −
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addGuest} className="justify-self-start font-mono text-[12px] text-ink underline-offset-4 hover:underline">
                    {f.guest.add}
                  </button>
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

                <div className="flex justify-end">
                  <Button type="submit" disabled={status === "sending" || !guests[0] || !attending}>
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
