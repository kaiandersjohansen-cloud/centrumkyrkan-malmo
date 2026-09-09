export default function KontaktSection() {
  return (
    <section id="kontakt" style={{ padding: "96px 28px", background: "oklch(96.5% 0.01 95)", scrollMarginTop: 88 }}>
      <div className="stack-2" style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Kontakt &amp; förbön
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 30, fontWeight: 500, margin: "0 0 26px" }}>
            Hör gärna av dig.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 16, marginBottom: 30 }}>
            <p style={{ margin: 0 }}>
              Föreningsgatan 32, 211 52 Malmö <span style={{ color: "oklch(50% 0.015 60)" }}>(Betaniakyrkan)</span>
            </p>
            <p style={{ margin: 0 }}>
              <a href="mailto:hej@centrumkyrkanmalmo.se" className="underline-link" style={{ fontWeight: 500, borderBottom: "1px solid oklch(60% 0.02 50)" }}>
                hej@centrumkyrkanmalmo.se
              </a>
            </p>
          </div>
          <p style={{ fontSize: 16, color: "oklch(42% 0.015 50)", margin: "0 0 22px", maxWidth: "48ch" }}>
            Har du ett bönämne? Vi vill gärna be för dig – hör av dig så tar vi det vidare.
          </p>
          <a
            href="mailto:hej@centrumkyrkanmalmo.se"
            className="btn-solid-green"
            style={{ display: "inline-block", background: "oklch(50% 0.06 145)", color: "oklch(98.5% 0.006 90)", padding: "15px 30px", borderRadius: 100, fontWeight: 500, fontSize: 15.5 }}
          >
            Skicka ett meddelande
          </a>
          <p style={{ fontSize: 16, color: "oklch(42% 0.015 50)", margin: "26px 0 22px", maxWidth: "48ch" }}>
            Har du behov av samtal eller själavård kan du kontakta pastor Kai Johansen som har tystnadsplikt.
          </p>
          <a
            href="mailto:kai@centrumkyrkanmalmo.se?subject=Samtal%20med%20pastor%20Kai%20Johansen"
            className="btn-outline-cream"
            style={{
              display: "inline-block",
              background: "oklch(98.5% 0.006 90)",
              color: "oklch(50% 0.06 145)",
              border: "1px solid oklch(50% 0.06 145)",
              padding: "15px 30px",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 15.5,
            }}
          >
            Samtal eller själavård
          </a>
        </div>
        <div>
          <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 6, overflow: "hidden", border: "1px solid oklch(89% 0.008 80)" }}>
            <iframe
              src="https://www.google.com/maps?q=F%C3%B6reningsgatan+32,+Malm%C3%B6&output=embed"
              title="Karta till Föreningsgatan 32, Malmö"
              style={{ border: 0, width: "100%", height: "100%", display: "block", filter: "grayscale(0.85) contrast(0.92) brightness(1.04) sepia(0.08)" }}
              loading="lazy"
            />
          </div>
          <a
            href="https://www.google.com/maps?q=F%C3%B6reningsgatan+32,+Malm%C3%B6"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link"
            style={{ display: "inline-block", marginTop: 12, fontSize: 15, fontWeight: 500, borderBottom: "1px solid oklch(60% 0.02 50)" }}
          >
            Öppna i Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}
