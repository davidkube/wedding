import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { SaveTheDate } from "@/components/sections/SaveTheDate";
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
        <Hero />
        <SaveTheDate />
        <DayPlan />
        <Rsvp />
        <Travel />
        <MarqueeBand />
        <Story />
        <StillsWall />
        <Registry />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
