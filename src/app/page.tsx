import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { DayPlan } from "@/components/sections/DayPlan";
import { Rsvp } from "@/components/sections/Rsvp";
import { Travel } from "@/components/sections/Travel";
import { Story } from "@/components/sections/Story";
import { StillsWall } from "@/components/sections/StillsWall";
import { Registry } from "@/components/sections/Registry";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* 01 Hero · src/content/hero.ts */}
        <Hero />
        {/* 02 Stills · src/content/gallery.ts */}
        <StillsWall />
        {/* 03 The day · src/content/day.ts */}
        <DayPlan />
        {/* 04 RSVP · src/content/rsvp.ts */}
        <Rsvp />
        {/* 05 Travel · src/content/travel.ts */}
        <Travel />
        {/* 06 Marquee · src/content/saveTheDate.ts */}
        <MarqueeBand />
        {/* 07 Story · src/content/story.ts */}
        <Story />
        {/* 08 Registry · src/content/registry.ts */}
        <Registry />
        {/* 09 FAQ + dress code · src/content/faq.ts · dressCode.ts */}
        <Faq />
      </main>
      {/* 10 Footer · src/content/footer.ts */}
      <Footer />
    </>
  );
}
