const COLUMNS = [
  { label: "Tid", value: "Varje söndag kl 15:30\n(om inget annat meddelas)" },
  { label: "Plats", value: "Betaniakyrkan, Föreningsgatan 32" },
  { label: "Barnen", value: "Söndagsskola under gudstjänsten" },
];

export default function GudstjanstSection() {
  return (
    <section id="gudstjanst" style={{ padding: "48px 28px 96px", background: "oklch(96.5% 0.01 95)", scrollMarginTop: 88 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto 64px", textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Gudstjänst
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 32, fontWeight: 500, margin: "0 0 18px" }}>
            Söndagar kl 15:30 - mitt i Malmö.
          </h2>
          <p style={{ fontSize: 17, color: "oklch(42% 0.015 50)", margin: 0 }}>
            Vi firar gudstjänst i Betaniakyrkans lokaler med lovsång, predikan, nattvard och söndagsskola för barnen. Kom som du är – vi bjuder på fika efteråt.
          </p>
        </div>
        <div className="stack-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {COLUMNS.map((col, i) => (
            <div
              key={col.label}
              style={{
                padding: "0 32px",
                borderLeft: "1px solid oklch(89% 0.008 80)",
                borderRight: i === COLUMNS.length - 1 ? "1px solid oklch(89% 0.008 80)" : undefined,
              }}
            >
              <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 15, color: "oklch(50% 0.06 145)", margin: "0 0 10px" }}>{col.label}</p>
              <p style={{ margin: 0, color: "oklch(42% 0.015 50)", fontSize: 16, whiteSpace: "pre-line" }}>{col.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
