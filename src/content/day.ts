export type DayItem = {
  time: string;
  title: string;
  place: string;
  /** Photo for the opposite side of the timeline. */
  image?: { src: string; alt: string; objectPosition?: string };
  /** Shown as a striped block until a photo exists. */
  placeholder?: string;
};

export const day = {
  eyebrow: "The day",
  items: [
    {
      time: "15:30 (arrive by 15:00)",
      title: "Ceremony",
      place: "The pond",
      image: { src: "/images/venue-pond.jpg", alt: "Zonnevanger's pond and gazebo from above" },
    },
    {
      time: "17:00",
      title: "Drinks",
      place: "The garden",
      image: { src: "/images/venue-garden.jpg", alt: "A garden lounge nook at Zonnevanger", objectPosition: "50% 30%" },
    },
    {
      time: "18:30",
      title: "Dinner",
      place: "The hedges",
      image: { src: "/images/venue-hedges.jpg", alt: "The hedge-lined lawn at Zonnevanger" },
    },
    {
      time: "21:00",
      title: "Dancing",
      place: "Until late",
      image: { src: "/images/dancing-lights.jpg", alt: "String lights glowing at dusk" },
    },
  ] as readonly DayItem[],
} as const;
