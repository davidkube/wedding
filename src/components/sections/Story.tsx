import { story } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Drift, Parallax } from "@/components/motion/Parallax";

export function Story() {
  return (
    <Section id="story" ground="blush">
      <Reveal className="flex items-baseline justify-between gap-4 border-b border-ink pb-2.5">
        <span className="font-serif text-[clamp(32px,4vw,56px)] leading-none text-olive">{story.startYear}</span>
        <Eyebrow>{story.eyebrow}</Eyebrow>
        <span className="font-serif text-[clamp(32px,4vw,56px)] leading-none text-olive">{story.endYear}</span>
      </Reveal>

      <div className="mt-[clamp(24px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(20px,3vw,48px)]">
        <Stagger className="grid">
          {story.chapters.map((c, i) => (
            <StaggerItem
              key={c.when}
              className={`grid grid-cols-[auto_1fr] gap-4 py-3.5 ${i < story.chapters.length - 1 ? "dotted-rule" : ""}`}
            >
              <span className="min-w-[90px] font-mono text-[12px] text-coral">{c.when}</span>
              <span className="font-serif text-[20px] leading-[1.1]">{c.what}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="grid grid-cols-2 gap-3">
          {story.photos.map((p, i) => (
            <Drift key={i} distance={i === 0 ? 30 : -30} className={i === 1 ? "mt-8" : ""}>
              <Reveal delay={i}>
                <Parallax className="aspect-[4/5]" strength={0.1} scale={1.12}>
                  <Photo
                    image={"src" in p && p.src ? { src: p.src, alt: p.alt, objectPosition: p.objectPosition } : undefined}
                    placeholder={p.placeholder}
                    tone="rose"
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                </Parallax>
              </Reveal>
            </Drift>
          ))}
        </div>
      </div>
    </Section>
  );
}
