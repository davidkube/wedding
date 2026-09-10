import { couple, event, venue } from "@/content";

function icsDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildIcs() {
  const title = `${couple.names} · wedding`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding//EN",
    "BEGIN:VEVENT",
    `UID:${icsDate(event.start)}@wedding`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(event.start)}`,
    `DTEND:${icsDate(event.end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `LOCATION:${escapeIcs(venue.address)}`,
    `DESCRIPTION:${escapeIcs(`Ceremony on the lawn at three. ${venue.mapUrl}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${couple.first.toLowerCase()}-${couple.second.toLowerCase()}-wedding.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function googleCalendarUrl() {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${couple.names} · wedding`,
    dates: `${icsDate(event.start)}/${icsDate(event.end)}`,
    location: venue.address,
    details: venue.mapUrl,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
