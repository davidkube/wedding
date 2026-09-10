import { contact, event, venue } from "./site";

export const rsvp = {
  summary: [
    { label: "Date", value: event.dateLong, tone: "coral" },
    { label: "Place", value: venue.place, tone: "olive" },
    { label: "Reply by", value: event.rsvpBy, tone: "muted" },
  ] as const,
  eyebrow: "Kindly reply",
  titleLines: ["Will you", "join us?"],
  intro:
    "We would love to have you with us in Paarl. Please reply for everyone on your invitation, and tell us anything the kitchen should know.",
  questionsLine: `Questions · ${contact.email}`,
  form: {
    name: { label: "Your name", placeholder: "Peighton's cousin Anna" },
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
    plusOne: {
      addLabel: "+ Add a plus-one",
      removeLabel: "− Remove plus-one",
      nameLabel: "Their name",
      namePlaceholder: "Plus-one's name",
    },
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
