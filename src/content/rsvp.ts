import { contact } from "./site";

export const rsvp = {
  eyebrow: "Kindly reply",
  titleLines: ["Will you", "join us?"],
  intro:
    "We would love to have you with us in Paarl. Please reply for everyone on your invitation, and tell us anything the kitchen should know.",
  giftNote:
    "Your being there is the only gift we need. If you would still like to give something, a contribution towards our honeymoon would mean the world.",
  image: { src: "/images/menu-smile.jpg", alt: "Peeking over a smiling leather-bound menu" },
  form: {
    guest: {
      label: "Your name",
      /** Label for the second and later fields. */
      labelMore: "Guest name",
      placeholder: "Peighton's cousin Anna",
      add: "+ Add a guest",
      remove: "Remove",
    },
    attending: {
      label: "Coming?",
      options: [
        { value: "yes", label: "Joyfully yes" },
        { value: "no", label: "Sadly no" },
      ],
    },
    meal: {
      label: "Meal",
      options: [
        { value: "lamb", label: "Lamb" },
        { value: "linefish", label: "Linefish" },
        { value: "vegetarian", label: "Vegetarian" },
      ],
    },
    dietary: { label: "Dietary note", placeholder: "Allergies, anything we should know" },
    submit: "Send reply",
    sending: "Sending…",
    success: { title: "Thank you.", body: "Your reply is in. We will see you in Paarl." },
    error: {
      title: "That did not send.",
      body: `Please try again, or email us at ${contact.email}.`,
    },
    /** Subject line used when falling back to email. */
    mailSubject: "RSVP · Peighton & David",
  },
} as const;
