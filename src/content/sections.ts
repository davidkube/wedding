/**
 * Canonical home-page scroll order. Section numbers appear in eyebrows and nav
 * so copy, components, and content files stay aligned.
 */
export const pageSections = [
  { number: 1, id: "top", title: "Hero", content: "hero.ts" },
  { number: 2, id: "stills", title: "Stills", content: "gallery.ts" },
  { number: 3, id: "day", title: "The day", content: "day.ts" },
  { number: 4, id: "rsvp", title: "RSVP", content: "rsvp.ts" },
  { number: 5, id: "travel", title: "Travel & stay", content: "travel.ts" },
  { number: 6, id: "marquee", title: "Marquee", content: "saveTheDate.ts · marquee" },
  { number: 7, id: "story", title: "Story", content: "story.ts" },
  { number: 8, id: "registry", title: "Registry", content: "registry.ts" },
  { number: 9, id: "faq", title: "FAQ", content: "faq.ts · dressCode.ts" },
  { number: 10, id: "footer", title: "Footer", content: "footer.ts" },
] as const;

export type PageSectionId = (typeof pageSections)[number]["id"];

export function sectionMeta(id: PageSectionId) {
  const row = pageSections.find((s) => s.id === id);
  if (!row) throw new Error(`Unknown section id: ${id}`);
  return row;
}

export function sectionNum(id: PageSectionId): string {
  return String(sectionMeta(id).number).padStart(2, "0");
}

/** Prefix a section label with its scroll-order number (e.g. `03 · The day`). */
export function numberedEyebrow(id: PageSectionId, label: string): string {
  return `${sectionNum(id)} · ${label}`;
}
