import { contact } from "./site";

export const faq = {
  eyebrow: "Questions",
  title: "Good to know",
  sticker: "need help?",
  emailCta: { label: "Email us", href: `mailto:${contact.email}` },
  items: [
    {
      q: "Can I bring the kids?",
      a: "We love them, and we are keeping the evening grown-ups only. Little ones are welcome at the ceremony; the shuttle back to town leaves at five for anyone who needs it.",
    },
    {
      q: "What should I wear?",
      a: "Garden formal. Linen, colour, comfortable shoes for grass. It is hot at three and cool by ten.",
    },
    {
      q: "Is there parking at the farm?",
      a: "Yes, plenty, on the field by the gate. Follow the signs from the R301. Cars can stay overnight if you take the shuttle.",
    },
    {
      q: "When is the last shuttle?",
      a: "Midnight, and again at one, from the courtyard back to Paarl town and the city.",
    },
    {
      q: "Can we take photos?",
      a: "Phones away for the ceremony, please. After that, snap away and send us the good ones.",
    },
  ],
} as const;
