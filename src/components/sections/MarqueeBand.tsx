import { marquee } from "@/content";
import { Marquee } from "@/components/motion/Marquee";

/** W01's giant italic place name, bleeding off both edges and moving with the scroll. */
export function MarqueeBand() {
  return (
    <div className="border-y border-oat/20 bg-wine py-[clamp(10px,2vw,24px)]">
      <Marquee
        text={marquee.text}
        className="display font-serif text-blush text-[clamp(52px,9vw,150px)] italic leading-[1.05]"
      />
    </div>
  );
}
