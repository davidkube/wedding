import { event, venue } from "./site";

/** The olive-black poster band under the hero: giant coral numerals and a countdown. */
export const saveTheDate = {
  eyebrow: "Save the date",
  numerals: event.dateNumerals,
  line: `${event.weekday} · ${event.timeSpelled} · ${venue.place}`,
  countdown: {
    days: "days",
    hours: "hrs",
    minutes: "min",
    toGo: "to go",
    passed: "married",
  },
  /** Ghost initials behind the numerals. */
  ghost: "P&D",
} as const;
