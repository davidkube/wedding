import { couple, event, venue } from "./site";

export const hero = {
  eyebrow: "Together with their families",
  /** Each entry is one line of the oversized serif. */
  nameLines: [couple.first, `& ${couple.second}`],
  dateLine: `${event.dateLong} · ${venue.place}`,
  primaryCta: { label: `RSVP by ${event.rsvpByShort}`, href: "#rsvp" },
  secondaryCta: { label: "Add to calendar" },
  /**
   * Photo (or, later, a muted home-movie loop) that sits on the dusty-rose
   * band under the names. Set `video` to a path under /public to play a
   * silent loop with the photo as its poster.
   */
  media: {
    src: "/images/kiss.jpg",
    alt: `${couple.first} and ${couple.second} in a bar, laughing`,
    objectPosition: "60% 40%",
    video: "" as string,
  },
} as const;
