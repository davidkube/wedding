export type Still = {
  caption: string;
  image?: { src: string; alt: string; objectPosition?: string };
  placeholder?: string;
};

/** The stills wall on olive-black. Numbering is automatic. */
export const gallery = {
  label: "Stills · 2019–2026 · admit all",
  stills: [
    { caption: "the bar on Bree, 2019", image: { src: "/images/laugh.jpg", alt: "Laughing at the bar on Bree Street" } },
    {
      caption: "menu, not read",
      image: { src: "/images/window.jpg", alt: "Reading a menu, not really", objectPosition: "50% 55%" },
    },
    { caption: "amber glass", image: { src: "/images/kiss.jpg", alt: "A kiss in front of amber glass" } },
    { caption: "Observatory, 2023", placeholder: "still · street" },
    { caption: "the dog", placeholder: "still · biscuit" },
    { caption: "December 2025", placeholder: "still · the stoep" },
  ] satisfies Still[],
} as const;
