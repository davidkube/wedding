import { palette } from "./theme";

export const dressCode = {
  eyebrow: "Dress code · garden formal",
  cards: [
    { title: "Ladies", placeholder: "painting or film still · ladies", tone: "rose" as const },
    { title: "Gentlemen", placeholder: "painting or film still · gentlemen", tone: "olive" as const },
  ] as ReadonlyArray<{
    title: string;
    image?: { src: string; alt: string };
    placeholder?: string;
    tone?: "rose" | "olive";
  }>,
  /** Named swatches under the cards. */
  swatches: [palette.rose, palette.olive, palette.mustard],
} as const;
