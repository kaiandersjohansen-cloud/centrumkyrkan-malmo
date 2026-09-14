import { getUpcomingCalendarEvents } from "@/lib/calendar";

const FALLBACK_EVENTS = [
  { dateLabel: "Sön 19 jul", time: "15:30–18:00", location: "Föreningsgatan 32, Malmö", title: "Uppehåll under sommaren. Ingen gudstjänst" },
  { dateLabel: "Tor 24 sep", time: "18:30", location: "Köpenhamnsvägen 3 (Immanuelskyrkan)", title: "Ny Alpha-kurs startar" },
  { dateLabel: "Lör 22 aug\nSön 23 aug", time: "10:00", location: "Missionsgården Strandhem, Smålandsvägen 48, Örkelljunga", title: "Församlingshelg (Anmälan)" },
];

export default async function KalenderSection() {
  const liveEvents = await getUpcomingCalendarEvents();
  const events = liveEvents && liveEvents.length > 0 ? liveEvents : null;

  return (
    <section id="kalender" style={{ padding: "96px 28px", scrollMarginTop: 88 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto 36px", textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Kalender
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 32, fontWeight: 500, margin: 0 }}>
            Vad händer framöver
          </h2>
        </div>

        {liveEvents !== null && liveEvents.length === 0 && (
          <p className="calendar-status" style={{ maxWidth: 760, margin: "0 auto", borderTop: "1px solid oklch(89% 0.008 80)" }}>
            Inga kommande händelser just nu.
          </p>
        )}

        <div className="calendar-events" style={{ maxWidth: 760, margin: "0 auto" }}>
          {(events || FALLBACK_EVENTS).map((ev, i) => (
            <div key={`${ev.title}-${i}`} className="calendar-event">
              <p className="calendar-date" style={{ margin: 0, whiteSpace: "pre-line" }}>
                {ev.dateLabel}{ev.time && ` ${ev.time}`}
              </p>
              <div>
                <h3 className="calendar-title">{ev.title}</h3>
                {ev.location && <p className="calendar-meta">{ev.location}</p>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a
            href="https://calendar.google.com/calendar/embed?src=centrumkyrkanmalmo%40gmail.com&ctz=Europe%2FStockholm&mode=AGENDA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-green"
            style={{ display: "inline-block", border: "1px solid oklch(50% 0.06 145)", color: "oklch(50% 0.06 145)", padding: "12px 26px", borderRadius: 100, fontSize: 16, fontWeight: 500 }}
          >
            Se hela kalendern →
          </a>
        </div>
      </div>
    </section>
  );
}
