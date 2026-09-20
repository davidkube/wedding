export const dressCode = {
  eyebrow: "Dress code · garden formal · olive, sage, tan, brown",
  avoid: "Please avoid wearing the following colours: reds, pinks, oranges and light neutrals such as cream",
  cards: [
    { title: "Ladies", image: { src: "/images/dress/ladies.webp", alt: "Garden-formal looks for the ladies: olive, lime and chocolate dresses and separates" } },
    { title: "Gentlemen", image: { src: "/images/dress/gents.webp", alt: "Garden-formal looks for the gentlemen: olive suits, linen shirts and tan trousers" } },
  ] as ReadonlyArray<{
    title: string;
    image?: { src: string; alt: string };
    placeholder?: string;
    tone?: "rose" | "olive";
  }>,
} as const;
