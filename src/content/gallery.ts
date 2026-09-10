export type Still = {
  caption: string;
  /** Filename-style label under the print, scrapbook style. */
  file: string;
  image?: { src: string; alt: string; objectPosition?: string };
  placeholder?: string;
};

/** The stills wall on olive-black. Numbering is automatic. */
export const gallery = {
  label: "Stills · 2019–2026 · admit all",
  stills: [
    { caption: "the bar on Bree, 2019", file: "bree_st_2019.jpg", image: { src: "/images/laugh.jpg", alt: "Laughing at the bar on Bree Street" } },
    {
      caption: "menu, not read",
      file: "menu_unread.jpg",
      image: { src: "/images/window.jpg", alt: "Reading a menu, not really", objectPosition: "50% 55%" },
    },
    { caption: "amber glass", file: "amber_glass.jpg", image: { src: "/images/kiss.jpg", alt: "A kiss in front of amber glass" } },
    { caption: "Observatory, 2023", file: "obs_street_2023.jpg", placeholder: "still · street" },
    { caption: "the dog", file: "biscuit.mp4", placeholder: "still · biscuit" },
    { caption: "December 2025", file: "stoep_dec_2025.jpg", placeholder: "still · the stoep" },
  ] satisfies Still[],
} as const;
