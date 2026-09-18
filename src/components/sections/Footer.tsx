import { footer } from "@/content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Monogram } from "@/components/Monogram";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="bg-oat px-[clamp(16px,4vw,64px)] pb-6 pt-[clamp(48px,6vw,88px)] text-ink">
      <div className="mx-auto max-w-[1120px]">
        <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 font-mono text-[12px] leading-[2.2] text-ink-soft">
          {footer.columns.map((col) => (
            <StaggerItem key={col.title} className="border-t border-dotted border-stone pt-3">
              <div className="text-coral">{col.title}</div>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block break-words transition-colors hover:text-ink [overflow-wrap:anywhere]"
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {l.label}
                </a>
              ))}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-[clamp(40px,6vw,88px)] font-serif text-[clamp(20px,2.2vw,30px)] italic text-olive" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}>
          {footer.signOff}
        </Reveal>

        <Wordmark text={footer.wordmark} />

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-stone">
          <span className="flex items-center gap-3">
            <Monogram size={28} className="text-olive" />
            {footer.bottomLeft}
          </span>
          <span>{footer.bottomRight}</span>
        </div>
      </div>
    </footer>
  );
}
