/**
 * Palette from the design plan (section 4, "Colour").
 * These values are mirrored in `src/app/globals.css` under `@theme` so
 * Tailwind utilities (bg-blush, text-olive, ...) exist. If you change a hex
 * here, change it there too.
 */
export const palette = {
  blush: { hex: "#F1DDD6", name: "Blush", use: "page ground" },
  rose: { hex: "#E3B9AE", name: "Dusty rose", use: "hero band, section bands" },
  oat: { hex: "#F3EEE4", name: "Oat", use: "second ground, cards, reply card" },
  kraft: { hex: "#CDB08A", name: "Kraft", use: "FAQ ground only" },
  olive: { hex: "#5D6B3B", name: "Olive", use: "display type, illustration, chips" },
  oliveLight: { hex: "#A9B37F", name: "Olive light", use: "illustration, chips, rules" },
  coral: { hex: "#DD6A4F", name: "Coral", use: "buttons, numerals, one block per page" },
  mustard: { hex: "#D9B24A", name: "Mustard", use: "inside illustration only" },
  oliveBlack: { hex: "#1F251B", name: "Olive black", use: "gallery wall and footer ground" },
  ink: { hex: "#262B21", name: "Ink", use: "body text on light grounds" },
} as const;

export type PaletteKey = keyof typeof palette;
