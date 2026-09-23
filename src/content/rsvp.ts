import { contact } from "./site";

export const rsvp = {
  eyebrow: "Kindly reply",
  titleLines: ["Will you", "join us?"],
  intro:
    "We would love to have you with us in Paarl. Please reply for everyone on your invitation, and tell us anything the kitchen should know. Kindly reply by 01/11/26",
  gift: {
    /** Sentence around the tappable link: lead + link + tail. */
    lead: "Your being there is the only gift we need. If you would like to give something, ",
    link: "a contribution towards our honeymoon",
    tail: " would mean the world.",
    /** Heading over the revealed bank details. */
    title: "Honeymoon fund",
    /** TODO: replace with the real account before this goes live. */
    details: [
      { label: "Bank", value: "Bank name" },
      { label: "Account name", value: "Account holder" },
      { label: "Account number", value: "0000000000" },
      { label: "Branch code", value: "000000" },
      { label: "Account type", value: "Cheque" },
    ],
    reference: { label: "Reference", value: "PD Honeymoon (Your Name)" },
    referenceNote: "Please put your own name in the reference so we know who to thank.",
    copy: "Copy",
    copied: "Copied",
    close: "Hide details",
  },
  image: { src: "/images/menu-smile.jpg", alt: "Peeking over a smiling leather-bound menu" },
  form: {
    guest: {
      label: "Your name",
      /** Label for the second and later fields. */
      labelMore: "Guest name",
      placeholder: "Your Name",
      add: "+ Reply for another person on your invitation",
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
        { value: "chicken", label: "Chicken" },
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
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
