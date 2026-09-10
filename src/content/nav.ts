/** Sticky nav links. `href` must match a section `id` on the page. */
export const navLinks = [
  { label: "Story", href: "#story" },
  { label: "The day", href: "#day" },
  { label: "Travel", href: "#travel" },
  { label: "Registry", href: "#registry" },
  { label: "FAQ", href: "#faq" },
  { label: "RSVP", href: "#rsvp", accent: true },
] as const;
