export type ChapterPart = { text: string; strike?: boolean };

export const story = {
  eyebrow: "Our story",
  startYear: "2010",
  endYear: "2027",
  chapters: [
    { when: "2010", what: "Games and memory verses in Sunday school" },
    {
      when: "2018",
      what: [
        { text: "running", strike: true },
        { text: " walking in Tokai Forest, a kiss on the beach in Muizenberg" },
      ] satisfies ChapterPart[],
    },
    { when: "2021–22", what: "Joburg, and Light Blue the black cat" },
    { when: "2025", what: "a yes" },
    { when: "2027", what: "Zonnevanger, Paarl" },
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
