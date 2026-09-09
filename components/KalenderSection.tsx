import { getUpcomingCalendarEvents } from "@/lib/calendar";

const FALLBACK_EVENTS = [
  { dateLabel: "Sön 19 jul", title: "Uppehåll under sommaren. Ingen gudstjänst", meta: "15:30–18:00 · Föreningsgatan 32, Malmö" },
  { dateLabel: "Tor 24 sep", title: "Ny Alpha-kurs startar", meta: "18:30 · Köpenhamnsvägen 3 (Immanuelskyrkan)" },
  { dateLabel: "Lör 22 aug\nSön 23 aug", title: "Församlingshelg (Anmälan)", meta: "10:00 · Missionsgården Strandhem, Smålandsvägen 48, 286 35 Örkelljunga, Sverige" },
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
                {ev.dateLabel}
              </p>
              <div>
                <h3 className="calendar-title">{ev.title}</h3>
                {ev.meta && <p className="calendar-meta">{ev.meta}</p>}
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
