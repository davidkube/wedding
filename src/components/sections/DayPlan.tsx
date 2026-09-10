import { day } from "@/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Title } from "@/components/ui/Type";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { DrawLineFrame } from "@/components/motion/DrawLine";
import { Parallax } from "@/components/motion/Parallax";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Rows = React.CSSProperties & { "--row-m": number; "--row-d": number };

/**
 * The day as a photo-and-time timeline down a drawn centre line (M31).
 * On phones the line moves to the left edge and everything stacks.
 */
export function DayPlan() {
  return (
    <Section id="day" ground="oat">
      <Reveal>
        <Eyebrow>{day.eyebrow}</Eyebrow>
        <Title>{day.title}</Title>
        <p className="mt-[18px] max-w-[56ch]">{day.intro}</p>
      </Reveal>

      <DrawLineFrame
        className="mt-[clamp(36px,5vw,64px)] grid grid-cols-[28px_1fr] gap-y-[clamp(18px,3vw,40px)] md:grid-cols-[1fr_40px_1fr]"
        lineClassName="left-[14px] md:left-1/2 md:-translate-x-1/2"
      >
        {day.items.map((item, i) => {
          const left = i % 2 === 0;
          const hasMedia = item.image || item.placeholder;
          const rows = { "--row-m": i * 2 + 1, "--row-d": i + 1 } as Rows;
          const mediaRows = { "--row-m": i * 2 + 2, "--row-d": i + 1 } as Rows;
          return (
            <div key={item.time} className="contents">
              <Reveal
                className="col-start-1 flex justify-center pt-1 [grid-row:var(--row-m)] md:col-start-2 md:[grid-row:var(--row-d)]"
                style={rows}
              >
                <span className="block h-3 w-3 rounded-full border-2 border-oat bg-coral shadow-[0_0_0_1px_#dd6a4f]" />
              </Reveal>
              <Reveal
                className={cn(
                  "col-start-2 pl-3 [grid-row:var(--row-m)] md:[grid-row:var(--row-d)]",
                  left ? "md:col-start-1 md:pl-0 md:pr-[clamp(8px,1.5vw,20px)] md:text-right" : "md:col-start-3 md:pl-[clamp(8px,1.5vw,20px)]",
                )}
                style={rows}
              >
                <div className="font-mono text-[12px] text-coral">{item.time}</div>
                <div className="mt-1 font-serif text-[clamp(24px,2.4vw,32px)] leading-[1.05] text-ink">{item.title}</div>
                <div className="mt-1.5 font-mono text-[12px] text-ink-soft">{item.place}</div>
              </Reveal>
              {hasMedia && (
                <Reveal
                  delay={1}
                  className={cn(
                    "col-start-2 pl-3 [grid-row:var(--row-m)] md:[grid-row:var(--row-d)]",
                    left ? "md:col-start-3 md:pl-[clamp(8px,1.5vw,20px)]" : "md:col-start-1 md:flex md:justify-end md:pl-0 md:pr-[clamp(8px,1.5vw,20px)]",
                  )}
                  style={mediaRows}
                >
                  <ImageReveal from={left ? "left" : "right"} className="w-full max-w-[320px]">
                    <Parallax className="aspect-[4/3] w-full" strength={0.12} scale={1.15}>
                      <Photo image={item.image} placeholder={item.placeholder} tone="rose" sizes="320px" />
                    </Parallax>
                  </ImageReveal>
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
