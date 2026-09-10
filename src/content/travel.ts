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
  image: { src: "/images/laugh.jpg", alt: "The two of them laughing at a bar" },
  columns: [
    {
      number: "01",
      title: "Getting there",
      body: "Fly into Cape Town (CPT). Paarl is 45 minutes up the N1. Hire a car, or book the shuttle we are running from the city at 13:30.",
    },
    {
      number: "02",
      title: "Where to stay",
      body: "Cottages on the farm for family; guesthouses in Paarl town for everyone else. Three we like are below.",
    },
    {
      number: "03",
      title: "Getting around",
      body: "Uber works in Paarl. A shuttle back to town leaves at midnight and again at one.",
      note: "Visiting from abroad? Most passports get 90 days visa-free.",
    },
  ],
  stays: [
    {
      name: "Zonnevanger Cottages",
      href: "https://example.com/zonnevanger-cottages",
      meta: "on the farm · from R1 800 / night",
      placeholder: "stay photo · cottages",
      tone: "rose",
    },
    {
      name: "Grande Roche",
      href: "https://example.com/grande-roche",
      meta: "8 min · from R3 200 / night",
      image: { src: "/images/window.jpg", alt: "A window table under pendant lamps" },
    },
    {
      name: "Paarl guesthouses",
      href: "https://example.com/paarl-guesthouses",
      meta: "10 min · from R950 / night",
      placeholder: "stay photo · town",
      tone: "olive",
    },
  ] satisfies StayCard[],
} as const;
