import type { PageSectionId } from "./sections";
import { sectionNum } from "./sections";

/** Sticky nav links in scroll order. `sectionId` must match `pageSections`. */
export const navLinks = [
  { sectionId: "day" as PageSectionId, label: "The day", href: "#day" },
  { sectionId: "rsvp" as PageSectionId, label: "RSVP", href: "#rsvp" },
  { sectionId: "travel" as PageSectionId, label: "Travel", href: "#travel" },
  { sectionId: "story" as PageSectionId, label: "Story", href: "#story" },
  { sectionId: "stills" as PageSectionId, label: "Stills", href: "#stills" },
  { sectionId: "faq" as PageSectionId, label: "FAQ", href: "#faq" },
].map((link) => ({ ...link, number: sectionNum(link.sectionId) }));
