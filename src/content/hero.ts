import { couple, event, venue } from "./site";

export const hero = {
  /** Each entry is one line of the oversized serif; lines alternate left and right. */
  nameLines: [couple.first, `& ${couple.second}`],
  /**
   * The ticket-style invitation card that sits over the hero photo.
   */
  ticket: {
    eyebrow: "You are invited",
    date: `${event.dateSpelled}, ${new Date(event.start).getFullYear()}`,
    time: event.timeSpelled,
    place: venue.place,
    admit: "admit all · dancing till late",
  },
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
