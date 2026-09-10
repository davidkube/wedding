import { event, venue } from "./site";

export type DayItem = {
  time: string;
  title: string;
  place: string;
  /** Optional photo for the opposite side of the timeline. */
  image?: { src: string; alt: string; objectPosition?: string };
  /** Shown as a striped block until a photo exists. */
  placeholder?: string;
};

export const day = {
  eyebrow: "The day",
  title: event.dateSpelled,
  intro:
    "One venue for everything. Ceremony on the lawn at three, then drinks, dinner and dancing under the oaks. Dress for a warm evening and a cool night.",
  items: [
    { time: "15:00", title: "Ceremony", place: `The lawn · ${venue.name}`, placeholder: "venue · the lawn" },
    { time: "16:00", title: "Drinks", place: "The courtyard", placeholder: "venue · courtyard" },
    {
      time: "18:30",
      title: "Dinner",
      place: "The barn · long tables",
      image: { src: "/images/window.jpg", alt: "The two of them at a window table", objectPosition: "50% 45%" },
    },
    { time: "21:00", title: "Dancing", place: "Until late" },
  ] satisfies DayItem[],
  mapCta: { label: "Open the map", href: venue.mapUrl },
} as const;
