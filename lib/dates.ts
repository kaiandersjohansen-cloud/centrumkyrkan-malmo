// Hardcoded event/campaign cutoffs ported verbatim from the original site.
// Update these dates (and the copy that references them) for future events.
export const INFO_BANNER_EXPIRES = new Date(2026, 7, 23, 18, 0, 0); // 23 aug 2026 18:00
export const PRAYER_RELAY_EXPIRES = new Date(2026, 8, 6, 23, 59, 0); // 6 sep 2026 23:59

export function isExpired(cutoff: Date, now: Date = new Date()): boolean {
  return now >= cutoff;
}

const DAYS = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];
const MONTHS = [
  "jan", "feb", "mar", "apr", "maj", "jun",
  "jul", "aug", "sep", "okt", "nov", "dec",
];

export function formatSwedishDate(d: Date): string {
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function formatSwedishTime(d: Date): string {
  return d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}
