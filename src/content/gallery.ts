export type Still = {
  /** Filename-style label under the print, scrapbook style. */
  file: string;
  image?: { src: string; alt: string; objectPosition?: string };
  placeholder?: string;
};

/** The stills wall on olive-black. Numbering is automatic. */
export const gallery = {
  label: "Stills · 2019–2026 · admit all",
  stills: [
    { file: "kloof_st.jpg", image: { src: "/images/laugh.jpg", alt: "Laughing at the bar on Bree Street" } },
    { file: "amber_glass.jpg", image: { src: "/images/kiss.jpg", alt: "A kiss in front of amber glass" } },
    { file: "table_overhead.jpg", image: { src: "/images/stills/table_overhead.jpg", alt: "Overhead shot of the two of them laughing at a café table" } },
    { file: "kleinskys_wall.jpg", image: { src: "/images/stills/kleinskys_wall.jpg", alt: "Leaning against the painted Kleinsky's Delicatessen wall" } },
    { file: "window_nook.jpg", image: { src: "/images/stills/window_nook.jpg", alt: "Sitting together in a brick window nook" } },
    { file: "between_buildings.jpg", image: { src: "/images/stills/between_buildings.jpg", alt: "Talking on a staircase tucked between two buildings" } },
  ] as readonly Still[],
} as const;
