export type ChapterPart = { text: string; strike?: boolean };

export const story = {
  eyebrow: "Our story",
  startYear: "2010",
  endYear: "2027",
  chapters: [
    { when: "2010–2014", what: "Sunday school, youth and camps at church" },
    {
      when: "2018",
      what: [
        { text: "running", strike: true },
        { text: " walking in Tokai Forest, a kiss on the beach in Muizenberg" },
      ] satisfies ChapterPart[],
    },
    { when: "2021–22", what: "Joburg, and Lighty the black cat" },
    { when: "2025", what: "a boat ride, down on one knee, and a yes" },
    { when: "2027", what: "Zonnevanger, Paarl, with our loved ones" },
  ],
  photos: [
    { src: "/images/mowbray-2019.png", alt: "A forehead-to-forehead hug and laugh on the street", caption: "Mowbray, 2019" },
    { src: "/images/kloof-st-2026.jpg", alt: "Foreheads together, laughing, in a denim jacket", caption: "Kloof St, 2026" },
  ] as ReadonlyArray<
    | { src: string; alt: string; objectPosition?: string; caption: string; placeholder?: never }
    | { placeholder: string; caption: string; src?: never }
  >,
  /** Label on the winding-road timeline. */
  roadLabel: "Our winding road",
} as const;
