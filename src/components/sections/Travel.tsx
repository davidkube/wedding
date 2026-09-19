import { travel } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Title } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { RouteMap } from "@/components/RouteMap";
import { Reveal } from "@/components/motion/Reveal";
import { Drift, Parallax } from "@/components/motion/Parallax";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Ghost } from "@/components/motion/Ghost";
import { StayCard } from "./StayCard";

export function Travel() {
  return (
    <Section id="travel" ground="wine" className="relative z-0 overflow-hidden">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />
      <Ghost letter="D" className="-right-[0.12em] top-[4%]" distance={120} />
      <div className="relative">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(20px,3vw,48px)]">
          {/* The map column sets the row height; the photo grows to fill what the heading leaves. */}
          <Reveal className="flex flex-col">
            <Eyebrow sectionId="travel">{travel.eyebrow}</Eyebrow>
            <Title className="text-blush">{travel.title}</Title>
            <ImageReveal from="left" delay={0.15} className="mt-7 flex-1 md:min-h-[240px]">
              <Parallax className="aspect-[3/2] md:aspect-auto md:h-full" strength={0.14}>
                <Photo image={travel.image} sizes="(max-width: 768px) 100vw, 560px" />
              </Parallax>
            </ImageReveal>
          </Reveal>
          <Reveal delay={1}>
            <RouteMap className="w-full" />
          </Reveal>
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
