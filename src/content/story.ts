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
        { text: "Running", strike: true },
        { text: " Walking in Tokai Forest, a kiss on Muizenberg beach" },
      ] satisfies ChapterPart[],
    },
    { when: "2021–22", what: "Joburg, and Light the black cat" },
    { when: "2025", what: "A boat ride, and a yes" },
    { when: "2027", what: "Zonnevanger, Paarl, with our loved ones" },
  ],
  photos: [
    {
      src: "/images/youth.jpg",
      alt: "Smiling together with photo booth props, rabbit ears and a stick-on mustache",
      caption: "Youth, 2014",
    },
    {
      src: "/images/proposal.JPG",
      alt: "On the boat, showing off the engagement ring with Table Mountain behind",
      caption: "The proposal, 2025",
    },
    { src: "/images/mowbray-2019.png", alt: "A forehead-to-forehead hug and laugh on the street", caption: "Mowbray, 2019" },
    {
      src: "/images/kloof_2026_uncropped.jpg",
      alt: "Foreheads together, laughing, in a denim jacket",
      caption: "Kloof St, 2026",
      objectPosition: "68% 50%",
    },
    {
      src: "/images/lighty.JPG",
      alt: "Lighty the black cat lying on their back in the sun on the lawn",
      caption: "Lighty, 2022",
    },
  ] as ReadonlyArray<
    | { src: string; alt: string; objectPosition?: string; caption: string; placeholder?: never }
    | { placeholder: string; caption: string; src?: never }
  >,
  /** Label on the winding-road timeline. */
  roadLabel: "Our winding road",
} as const;
