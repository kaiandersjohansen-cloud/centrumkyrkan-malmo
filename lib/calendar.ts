import { formatSwedishDate, formatSwedishTime } from "./dates";

interface GoogleCalendarEventTime {
  date?: string;
  dateTime?: string;
}

interface GoogleCalendarEvent {
  summary: string;
  location?: string;
  start: GoogleCalendarEventTime;
  end?: GoogleCalendarEventTime;
}

export interface CalendarListItem {
  id: string;
  dateLabel: string;
  title: string;
  meta: string;
}

function formatDateLabel(start: Date, end: Date | null): string {
  if (!end || end.getTime() < start.getTime() + 1) return formatSwedishDate(start);
  return `${formatSwedishDate(start)} — ${formatSwedishDate(end)}`;
}

function toListItem(ev: GoogleCalendarEvent, index: number): CalendarListItem {
  const start = ev.start.dateTime ? new Date(ev.start.dateTime) : new Date(`${ev.start.date}T00:00:00`);
  let end: Date | null = null;

  if (ev.start.dateTime && ev.end?.dateTime) {
    const endDt = new Date(ev.end.dateTime);
    if (endDt.toDateString() !== start.toDateString()) end = endDt;
  } else if (!ev.start.dateTime && ev.end?.date) {
    end = new Date(`${ev.end.date}T00:00:00`);
    end.setDate(end.getDate() - 1);
  }

  const meta = ev.start.dateTime
    ? `${formatSwedishTime(start)}${ev.location ? ` · ${ev.location}` : ""}`
    : ev.location || "";

  return {
    id: `${ev.summary}-${index}`,
    dateLabel: formatDateLabel(start, end),
    title: ev.summary,
    meta,
  };
}

// Live-fetches the church's public Google Calendar. Requires GOOGLE_CALENDAR_API_KEY
// and GOOGLE_CALENDAR_ID (previously hardcoded client-side in the legacy site — moved
// server-side here so the key is no longer exposed in page source).
export async function getUpcomingCalendarEvents(maxResults = 6): Promise<CalendarListItem[] | null> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!apiKey || !calendarId) return null;

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events` +
    `?key=${apiKey}&timeMin=${new Date().toISOString()}&singleEvents=true&orderBy=startTime&maxResults=${maxResults}`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { items?: GoogleCalendarEvent[] };
    return (data.items || []).map(toListItem);
  } catch {
    return null;
  }
}
