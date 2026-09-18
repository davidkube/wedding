import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { DayPlan } from "@/components/sections/DayPlan";
import { Rsvp } from "@/components/sections/Rsvp";
import { Travel } from "@/components/sections/Travel";
import { Story } from "@/components/sections/Story";
import { StillsWall } from "@/components/sections/StillsWall";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* 01 Hero · src/content/hero.ts */}
        <Hero />
        {/* 02 The day · src/content/day.ts */}
        <DayPlan />
        {/* 03 RSVP · src/content/rsvp.ts */}
        <Rsvp />
        {/* 04 Travel · src/content/travel.ts */}
        <Travel />
        {/* 05 Story · src/content/story.ts */}
        <Story />
        {/* 06 Stills · src/content/gallery.ts */}
        <StillsWall />
        {/* 07 FAQ + dress code · src/content/faq.ts · dressCode.ts */}
        <Faq />
      </main>
      {/* 08 Footer · src/content/footer.ts */}
      <Footer />
    </>
  );
}
