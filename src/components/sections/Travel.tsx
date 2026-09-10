import { travel } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Title } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Drift, Parallax } from "@/components/motion/Parallax";
import { StayCard } from "./StayCard";

export function Travel() {
  return (
    <Section id="travel" ground="oat">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-end gap-[clamp(20px,3vw,48px)]">
        <Reveal>
          <Eyebrow>{travel.eyebrow}</Eyebrow>
          <Title>{travel.title}</Title>
        </Reveal>
        <Reveal delay={1}>
          <Parallax className="aspect-[3/2]" strength={0.14}>
            <Photo image={travel.image} sizes="(max-width: 768px) 100vw, 560px" />
          </Parallax>
        </Reveal>
      </div>

      <Stagger className="mt-[clamp(28px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(20px,3vw,40px)] border-t border-ink/20 pt-6">
        {travel.columns.map((c) => (
          <StaggerItem key={c.number}>
            <div className="font-mono text-[12px] text-coral">
              {c.number} · {c.title}
            </div>
            <p className="mt-2 text-[14px]">{c.body}</p>
            {"note" in c && c.note && <p className="mt-2.5 font-mono text-[12px] text-ink-soft">{c.note}</p>}
          </StaggerItem>
        ))}
      </Stagger>

      <div id="stays" className="mt-[clamp(32px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-[clamp(16px,2.4vw,32px)] scroll-mt-20">
        {travel.stays.map((s, i) => (
          <Drift key={s.name} distance={[0, 44, 22][i % 3]} className={["", "md:pt-[clamp(0px,5vw,72px)]", "md:pt-[clamp(0px,2.5vw,36px)]"][i % 3]}>
            <Reveal delay={i}>
              <StayCard stay={s} />
            </Reveal>
          </Drift>
        ))}
      </div>
    </Section>
  );
}
