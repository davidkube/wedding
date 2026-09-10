export const story = {
  eyebrow: "Our story",
  startYear: "2019",
  endYear: "2027",
  chapters: [
    { when: "2019 · Mar", what: "A borrowed lighter on Long Street" },
    { when: "2020–21", what: "Two flats, one lockdown, a very small kitchen" },
    { when: "2023", what: "Observatory, and a dog called Biscuit" },
    { when: "2025 · Dec", what: "A yes, on the stoep, in the rain" },
    { when: "2027 · Jan", what: "Paarl" },
  ],
  photos: [
    { src: "/images/kiss.jpg", alt: "A kiss by an amber window", objectPosition: "55% 50%", caption: "Bree St, 2019" },
    { placeholder: "city street shot · graffiti wall", caption: "Obs, 2023" },
  ] as ReadonlyArray<
    | { src: string; alt: string; objectPosition?: string; caption: string; placeholder?: never }
    | { placeholder: string; caption: string; src?: never }
  >,
  /** Label on the winding-road timeline. */
  roadLabel: "Our winding road",
} as const;
