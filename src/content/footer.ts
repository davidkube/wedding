import { couple, event, venue } from "./site";

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
      ],
    },
    {
      title: "You",
      links: [
        { label: "RSVP", href: "#rsvp" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
  signOff: event.weekdayLine,
  wordmark: couple.names,
  bottomLeft: `${venue.place} · ${event.dateShort}`,
  bottomRight: `© ${couple.initials} ${new Date(event.start).getFullYear() - 1}`,
} as const;
