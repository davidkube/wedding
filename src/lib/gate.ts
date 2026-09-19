/**
 * The site-wide password. Server-only: imported by the proxy and the unlock
 * action, never by anything that ships to the browser. Override with a
 * SITE_PASSWORD environment variable if you'd rather not keep it in the repo.
 */
const PASSWORD = process.env.SITE_PASSWORD ?? "pd0103";

export const GATE_COOKIE = "pd-gate";
export const GATE_MAX_AGE = 60 * 60 * 24 * 180;

export function passwordMatches(attempt: string) {
  return attempt.trim().toLowerCase() === PASSWORD.toLowerCase();
}

/** Stable token derived from the password, so the cookie never carries the password itself. */
export async function gateToken() {
  const bytes = new TextEncoder().encode(`pd-gate:${PASSWORD}`);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}
