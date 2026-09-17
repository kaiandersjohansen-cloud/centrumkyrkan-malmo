// Hardcoded event/campaign cutoffs ported verbatim from the original site.
// Update these dates (and the copy that references them) for future events.
// NOTE: write the cutoff with an explicit Swedish UTC offset so the time means
// Swedish local time, not the server's timezone (Vercel runs in UTC).
// Use +02:00 for summer time (late March-late October) and +01:00 for winter.
export const INFO_BANNER_EXPIRES = new Date("2026-08-23T18:00:00+02:00"); // 23 aug 2026 18:00
export const PRAYER_RELAY_EXPIRES = new Date("2026-09-06T23:59:00+02:00"); // 6 sep 2026 23:59

export function isExpired(cutoff: Date, now: Date = new Date()): boolean {
  return now >= cutoff;
}

const DAYS = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];
const MONTHS = [
  "jan", "feb", "mar", "apr", "maj", "jun",
  "jul", "aug", "sep", "okt", "nov", "dec",
];

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

// Reads a Date's calendar parts as they appear in Sweden, regardless of the
// server's own timezone. Without this, Vercel (UTC) reports the previous day
// for anything scheduled between midnight and 02:00 Swedish time.
function swedishParts(d: Date): { weekday: number; day: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    weekday: "short",
    day: "numeric",
    month: "numeric",
  }).formatToParts(d);

  const lookup: Record<string, string> = {};
  for (const part of parts) lookup[part.type] = part.value;

  return {
    weekday: WEEKDAY_INDEX[lookup.weekday] ?? 0,
    day: Number(lookup.day),
    month: Number(lookup.month) - 1,
  };
}

export function formatSwedishDate(d: Date): string {
  const { weekday, day, month } = swedishParts(d);
  return `${DAYS[weekday]} ${day} ${MONTHS[month]}`;
}

export function formatSwedishTime(d: Date): string {
    return d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Stockholm" });
}
