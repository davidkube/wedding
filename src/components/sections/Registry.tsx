"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { registry } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Type";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { Placeholder } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { TableIllustration } from "@/components/Illustrations";

function formatAmount(n: number) {
  return `${registry.currency}${n.toLocaleString("en-ZA").replace(/,/g, " ")}`;
}

export function Registry() {
  const [amount, setAmount] = useState<number | "other" | null>(registry.amounts[1] ?? null);
  const [other, setOther] = useState("");
  const [message, setMessage] = useState("");
  const [showBank, setShowBank] = useState(!registry.paymentUrl);
  const [copied, setCopied] = useState(false);

  const chosen = amount === "other" ? Number(other) || 0 : amount ?? 0;

  function give() {
    if (registry.paymentUrl) {
      const url = new URL(registry.paymentUrl);
      if (chosen) url.searchParams.set("amount", String(chosen));
      if (message) url.searchParams.set("message", message);
      window.open(url.toString(), "_blank", "noopener");
    } else {
      setShowBank(true);
    }
  }

  async function copy() {
    const acc = registry.bank.lines.find(([k]) => /account number/i.test(k))?.[1];
    if (!acc) return;
    try {
      await navigator.clipboard.writeText(acc);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Section id="registry" ground="olive" width="narrow">
      <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border border-ink/20 bg-oat">
        <div className="relative min-h-[220px] overflow-hidden">
          {registry.illustration.placeholder ? (
            <div className="absolute inset-0 stripes-pale" aria-hidden />
          ) : null}
          <TableIllustration className="absolute inset-0 h-full w-full p-8" />
          {registry.illustration.placeholder && (
            <Placeholder label={registry.illustration.placeholder} tone="pale" className="sr-only" />
          )}
        </div>
        <div className="grid content-start gap-3.5 p-[clamp(20px,2.6vw,32px)]">
          <Eyebrow sectionId="registry">{registry.eyebrow}</Eyebrow>
          <div className="font-serif text-[clamp(28px,3vw,40px)] leading-none text-olive">{registry.title}</div>
          <p className="text-[14px]">{registry.body}</p>
          <div className="flex flex-wrap gap-2">
            {registry.amounts.map((a) => (
              <Chip key={a} selected={amount === a} onClick={() => setAmount(a)}>
                {formatAmount(a)}
              </Chip>
            ))}
            <Chip selected={amount === "other"} onClick={() => setAmount("other")}>
              {registry.otherLabel}
            </Chip>
          </div>
          <AnimatePresence initial={false}>
            {amount === "other" && (
              <motion.div key="other" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <Label htmlFor="gift-other">{registry.otherLabel}</Label>
                <Input id="gift-other" inputMode="numeric" value={other} onChange={(e) => setOther(e.target.value.replace(/\D/g, ""))} placeholder={registry.otherPlaceholder} />
              </motion.div>
            )}
          </AnimatePresence>
          <div>
            <Label htmlFor="gift-message" className="sr-only">
              {registry.messageLabel}
            </Label>
            <Textarea id="gift-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={registry.messageLabel} className="min-h-[64px]" />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={give}>{registry.give}</Button>
            {registry.paymentUrl && !showBank && (
              <button type="button" onClick={() => setShowBank(true)} className="font-mono text-[12px] text-ink underline-offset-4 hover:underline">
                {registry.bankToggle}
              </button>
            )}
          </div>
          <AnimatePresence initial={false}>
            {showBank && (
              <motion.dl
                key="bank"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-dotted border-stone pt-3 font-mono text-[12px]"
              >
                <div className="mb-1 text-coral">{registry.bank.title}</div>
                {registry.bank.lines.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-0.5">
                    <dt className="text-ink-soft">{k}</dt>
                    <dd className="text-ink">{v}</dd>
                  </div>
                ))}
                <button type="button" onClick={copy} className="mt-2 text-ink underline-offset-4 hover:underline">
                  {copied ? registry.bank.copiedLabel : registry.bank.copyLabel}
                </button>
              </motion.dl>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
