/**
 * Global facts about the wedding. Everything else in `src/content` builds on
 * these, so change names, dates and addresses here first.
 */
export const couple = {
  /** Order matters: it is how the names read everywhere. */
  first: "Peighton",
  second: "David",
  /** Used in the monogram, the footer and the page title. */
  initials: "P&D",
  /** "Peighton & David" */
  get names() {
    return `${this.first} & ${this.second}`;
  },
} as const;

export const event = {
  /** ISO date with the venue's timezone offset (South Africa is UTC+2). */
  start: "2027-01-03T15:30:00+02:00",
  end: "2027-01-04T01:00:00+02:00",
  timezone: "Africa/Johannesburg",
  /** Human forms, written once so every section agrees. */
  dateLong: "3 January 2027",
  dateShort: "3.1.2027",
  dateSpelled: "Sunday, the third of January",
  weekdayLine: "until the third of January, with love",
  /** Poster numerals for the save-the-date band. */
  dateNumerals: "03.01.27",
  weekday: "Sunday",
  timeSpelled: "half past three",
  rsvpBy: "1 November 2026",
  rsvpByShort: "1 Nov",
} as const;

export const venue = {
  name: "Zonnevanger",
  town: "Paarl",
  region: "Western Cape, South Africa",
  /** "Zonnevanger, Paarl" */
  get place() {
    return `${this.name}, ${this.town}`;
  },
  address: "Zonnevanger, Paarl, Western Cape, South Africa",
  mapUrl: "https://maps.google.com/?q=Zonnevanger+Paarl",
} as const;

export const contact = {
  email: "hello@peightonanddavid.co.za",
  phone: "+27 21 000 0000",
} as const;

/**
 * Where the RSVP form sends replies. There is no database: the form POSTs
 * JSON to this endpoint (Formspree, Basin, Getform, a Google Apps Script web
 * app, or your own function). Leave it empty and the form falls back to
 * opening the guest's email client with the reply pre-filled.
 *
 * Formspree example: "https://formspree.io/f/abcdwxyz"
 */
export const rsvpEndpoint = "https://script.google.com/macros/s/AKfycby8Zx_L0vcf0zLHDUpLAqxgwoiQON1iivIkzxun2bJsfawG4qUMlNnptbHg_PlajzwL/exec";

export const siteMeta = {
  title: `${couple.names} · ${event.dateLong} · ${venue.place}`,
  description: `${couple.first} and ${couple.second} are getting married at ${venue.place} on ${event.dateLong}. Details, travel, and RSVP.`,
  /** Used for Open Graph and the canonical URL once the domain is live. */
  url: "https://peightonanddavid.co.za",
  ogImage: "/images/kiss.jpg",
  locale: "en_ZA",
} as const;
