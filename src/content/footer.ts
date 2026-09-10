import { contact, couple, event, venue } from "./site";

export const footer = {
  columns: [
    {
      title: "The day",
      links: [
        { label: "Ceremony", href: "#day" },
        { label: "Drinks & dinner", href: "#day" },
        { label: "Map", href: venue.mapUrl },
      ],
    },
    {
      title: "Travel",
      links: [
        { label: "Getting there", href: "#travel" },
        { label: "Where to stay", href: "#stays" },
        { label: "Shuttles", href: "#travel" },
      ],
    },
    {
      title: "You",
      links: [
        { label: "RSVP", href: "#rsvp" },
        { label: "Registry", href: "#registry" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Write",
      links: [
        { label: contact.email, href: `mailto:${contact.email}` },
        { label: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}` },
      ],
    },
  ],
  signOff: event.weekdayLine,
  wordmark: couple.names,
  bottomLeft: `${venue.place} · ${event.dateShort}`,
  bottomRight: `© ${couple.initials} ${new Date(event.start).getFullYear() - 1}`,
} as const;
