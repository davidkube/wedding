import { venue } from "./site";

export type StayCard = {
  name: string;
  href: string;
  /** Mono line under the name: distance and price. */
  meta: string;
  image?: { src: string; alt: string; objectPosition?: string };
  placeholder?: string;
  /** Striped placeholder colour when there is no image. */
  tone?: "rose" | "olive";
};

export const travel = {
  eyebrow: "Travel & stay",
  title: "Getting to Paarl",
  image: { src: "/images/stills/cafe_table.jpg", alt: "Sitting close at an outdoor café table among olive branches" },
  mapCta: { label: "Open in Google Maps", href: venue.mapUrl },
  /** Drive from the city, as drawn on the illustrated route map. */
  route: { from: "Cape Town", duration: "37 min", distance: "56 km" },
  stays: [
    {
      name: "Olyfhoek Farm",
      href: "https://www.olyfhoek.co.za/",
      meta: "1-2 min · from R950 / night",
      image: {
        src: "/images/olyhoek-farm.webp",
        alt: "Aerial view of Olyhoek Farm's homestead, pool, and vineyards",
        objectPosition: "57% 50%",
      },
    },
    {
      name: "Aan de Paarlberg Guest House",
      href: "https://www.lekkeslaap.co.za/accommodation/aan-de-paarlberg",
      meta: "10 min · from R800 / night",
      image: { src: "/images/aan-de-paarlberg.webp", alt: "The guest house's pool and garden with palm trees" },
    },
    {
      name: "Olive Tree Boutique Hotel",
      href: "https://www.olivetreeboutiquehotel.co.za/",
      meta: "8 min · from R750 / night",
      image: { src: "/images/olive-tree-boutique.webp", alt: "Poolside breakfast tray with towels in a courtyard room" },
    },
  ] satisfies StayCard[],
} as const;
