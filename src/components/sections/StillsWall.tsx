import { gallery } from "@/content";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Drift } from "@/components/motion/Parallax";

export function StillsWall() {
  return (
    <Section id="stills" ground="dark">
      <Reveal className="inline-block border border-dashed border-olive-light px-[18px] py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-olive-light">
        {gallery.label}
      </Reveal>
      <Stagger className="mt-[clamp(20px,3vw,40px)] grid grid-cols-2 gap-[clamp(12px,1.6vw,20px)] md:grid-cols-3">
        {gallery.stills.map((s, i) => (
          <Drift key={s.caption} distance={[18, 40, 28][i % 3]}>
            <StaggerItem>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Photo image={s.image} placeholder={s.placeholder} tone="dark" sizes="(max-width: 768px) 50vw, 360px" />
              </div>
              <div className="mt-2 flex gap-2.5 font-mono text-[11px] text-oat-dim">
                <span className="text-coral-light">{String(i + 1).padStart(2, "0")}</span>
                <span>{s.caption}</span>
              </div>
            </StaggerItem>
          </Drift>
        ))}
      </Stagger>
    </Section>
  );
}
