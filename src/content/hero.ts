import { couple, event, venue } from "./site";

export const hero = {
  /** Each entry is one line of the oversized serif; lines alternate left and right. */
  nameLines: [couple.first, `& ${couple.second}`],
  /** One line under the names: when and where. */
  meta: `${event.weekday} ${event.dateLong} · ${venue.place}`,
  ctas: [
    { label: "RSVP", href: "#rsvp", primary: true },
    { label: "The day", href: "#day", primary: false },
  ],
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
  /** Silent looping clip in the side panel next to the hero, desktop only. */
  sideVideo: {
    src: "/videos/hero-loop.mp4",
    alt: `${couple.first} and ${couple.second}, a home movie`,
  },
} as const;
