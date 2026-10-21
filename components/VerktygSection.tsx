const TOOLS = [
  {
    href: "/bibelvers",
    title: "Memorera bibelord",
    text: "Spara bibelord som vändbara kort och lär dig dem utantill.",
    ink: "oklch(46% 0.09 145)",
    soft: "oklch(94% 0.035 145)",
    line: "oklch(86% 0.05 145)",
  },
  {
    href: "/bordssamtal",
    title: "Bordssamtal",
    text: "Frågor för bättre och djupare samtal med vänner eller i hemgruppen.",
    ink: "oklch(52% 0.13 45)",
    soft: "oklch(94% 0.04 45)",
    line: "oklch(87% 0.06 45)",
  },
  {
    href: "/samtalskort",
    title: "Samtalskort för barnfamiljer",
    text: "Bibelord, en praktik och en samtalsfråga för matbordet med barnen.",
    ink: "oklch(50% 0.10 85)",
    soft: "oklch(94% 0.045 90)",
    line: "oklch(87% 0.06 88)",
  },
  {
    href: "/bordsbon",
    title: "Bordsbön",
    text: "En bordsbön att lära sig utantill och be tillsammans hemma.",
    ink: "oklch(48% 0.08 230)",
    soft: "oklch(94% 0.03 230)",
    line: "oklch(87% 0.045 230)",
  },
];

const CSS = `
.verktyg-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.verktyg-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.verktyg-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px oklch(30% 0.02 50 / 0.08); }
@media (max-width: 980px) { .verktyg-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) {
  .verktyg-grid { gap: 12px; }
  .verktyg-card { padding: 18px 16px !important; }
  .verktyg-card h3 { font-size: 17px !important; }
  .verktyg-card p { font-size: 14px !important; }
}
`;

export default function VerktygSection() {
  return (
    <section id="verktyg" style={{ padding: "24px 28px 96px", scrollMarginTop: 88 }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto 40px", textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Digitala verktyg
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 30, fontWeight: 500, margin: 0 }}>
            Hjälp att leva med Jesus i vardagen.
          </h2>
        </div>
        <div className="verktyg-grid">
          {TOOLS.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="verktyg-card"
              style={{
                display: "flex",
                flexDirection: "column",
                background: tool.soft,
                border: `1px solid ${tool.line}`,
                borderRadius: 10,
                padding: "24px 22px",
                color: "oklch(30% 0.015 50)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 19, fontWeight: 500, margin: "0 0 10px", color: tool.ink }}>{tool.title}</h3>
              <p style={{ margin: "0 0 18px", fontSize: 15, color: "oklch(38% 0.015 50)" }}>{tool.text}</p>
              <span style={{ marginTop: "auto", fontSize: 14.5, fontWeight: 600, color: tool.ink }}>Öppna →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
