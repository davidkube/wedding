import { day } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Title } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { DrawLineFrame } from "@/components/motion/DrawLine";
import { Parallax } from "@/components/motion/Parallax";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function DayPlan() {
  return (
    <Section id="day" ground="oat">
      <Reveal>
        <Eyebrow>{day.eyebrow}</Eyebrow>
        <Title>{day.title}</Title>
        <p className="mt-[18px] max-w-[56ch]">{day.intro}</p>
      </Reveal>

      <DrawLineFrame
        className="mt-[clamp(36px,5vw,64px)] grid grid-cols-[1fr_32px_1fr] gap-y-[clamp(24px,3vw,40px)]"
        lineClassName="left-1/2 -translate-x-1/2"
      >
        {day.items.map((item, i) => {
          const left = i % 2 === 0;
          const hasMedia = item.image || item.placeholder;
          return (
            <div key={item.time} className="contents">
              <Reveal
                className={cn(left ? "col-start-1 text-right pr-[clamp(8px,1.5vw,20px)]" : "col-start-3 pl-[clamp(8px,1.5vw,20px)]")}
                style={{ gridRow: i + 1 }}
              >
                <div className="font-mono text-[12px] text-coral">{item.time}</div>
                <div className="mt-1 font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.05] text-ink">{item.title}</div>
                <div className="mt-1.5 font-mono text-[12px] text-ink-soft">{item.place}</div>
              </Reveal>
              {hasMedia && (
                <Reveal
                  delay={1}
                  className={cn(left ? "col-start-3 pl-[clamp(8px,1.5vw,20px)]" : "col-start-1 pr-[clamp(8px,1.5vw,20px)] flex justify-end")}
                  style={{ gridRow: i + 1 }}
                >
                  <Parallax className="aspect-[4/3] w-full max-w-[320px]" strength={0.12} scale={1.15}>
                    <Photo image={item.image} placeholder={item.placeholder} tone="rose" sizes="320px" />
                  </Parallax>
                </Reveal>
              )}
            </div>
          );
        })}
      </DrawLineFrame>

      <Reveal className="mt-[clamp(28px,4vw,48px)] text-center">
        <LinkButton variant="text" href={day.mapCta.href} target="_blank" rel="noreferrer">
          {day.mapCta.label} ↗
        </LinkButton>
      </Reveal>
    </Section>
  );
}
