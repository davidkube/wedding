import { travel } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Title } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Drift, Parallax } from "@/components/motion/Parallax";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Ghost } from "@/components/motion/Ghost";
import { StayCard } from "./StayCard";

export function Travel() {
  return (
    <Section id="travel" ground="wine" className="relative overflow-hidden">
      <Ghost letter="D" className="-right-[0.12em] top-[4%]" distance={120} />
      <div className="relative">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(20px,3vw,48px)]">
          <Reveal>
            <Eyebrow sectionId="travel">{travel.eyebrow}</Eyebrow>
            <Title className="text-blush">{travel.title}</Title>
            <LinkButton variant="text" href={travel.mapCta.href} target="_blank" rel="noreferrer" className="mt-4">
              {travel.mapCta.label} ↗
            </LinkButton>
          </Reveal>
          <ImageReveal from="right" delay={0.15}>
            <Parallax className="aspect-[3/2]" strength={0.14}>
              <Photo image={travel.image} sizes="(max-width: 768px) 100vw, 560px" />
            </Parallax>
          </ImageReveal>
        </div>

        <div id="stays" className="mt-[clamp(32px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-[clamp(16px,2.4vw,32px)] scroll-mt-20">
          {travel.stays.map((s, i) => (
            <Drift key={s.name} distance={[0, 44, 22][i % 3]} className={["", "md:pt-[clamp(0px,5vw,72px)]", "md:pt-[clamp(0px,2.5vw,36px)]"][i % 3]}>
              <Reveal delay={i}>
                <StayCard stay={s} index={i} />
              </Reveal>
            </Drift>
          ))}
        </div>
      </div>
    </Section>
  );
}
