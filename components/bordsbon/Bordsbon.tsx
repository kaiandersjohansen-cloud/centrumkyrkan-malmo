import ToolPageHeader from "@/components/tool-pages/ToolPageHeader";

interface Verse {
  number: string;
  title: string;
  text: string;
  color: string;
  icon: "life" | "provision" | "service" | "community";
}

const VERSES: Verse[] = [
  { number: "01", title: "LIV", text: "Tack för livet som du har skapat och ger oss varje dag.", color: "oklch(44% 0.09 145)", icon: "life" },
  { number: "02", title: "FÖRSÖRJNING", text: "Tack för maten och allt det du ger oss för att vi ska må bra och leva.", color: "oklch(50% 0.13 45)", icon: "provision" },
  { number: "03", title: "TJÄNST", text: "Använd oss för dig och andra. Hjälp oss att göra gott med våra händer.", color: "oklch(48% 0.1 85)", icon: "service" },
  { number: "04", title: "GEMENSKAP", text: "Tack att vi får ha varandra. Hjälp oss att älska, bry oss om och göra plats för fler.", color: "oklch(46% 0.08 230)", icon: "community" },
];

const QUOTES = [
  { text: "Tack för livet som vi fått", color: "oklch(44% 0.09 145)", first: true },
  { text: "och tack att vi får äta gott.", color: "oklch(50% 0.13 45)", first: false },
  { text: "Hjälp oss tjäna dig och andra.", color: "oklch(48% 0.1 85)", first: false },
  { text: "Tack att vi får ha varandra.", color: "oklch(46% 0.08 230)", first: false },
];

function VerseIcon({ icon }: { icon: Verse["icon"] }) {
  const shared = { viewBox: "0 0 80 100", fill: "none", stroke: "oklch(45% 0.015 50)", strokeWidth: 1.6, style: { width: "100%", height: "auto" } };
  if (icon === "life") {
    return (
      <svg {...shared}>
        <path d="M20 14h40l-5 72H25z" />
        <path d="M23 52h34" />
      </svg>
    );
  }
  if (icon === "provision") {
    return (
      <svg {...shared}>
        <ellipse cx="40" cy="50" rx="36" ry="20" />
        <ellipse cx="40" cy="50" rx="22" ry="11" />
      </svg>
    );
  }
  if (icon === "service") {
    return (
      <svg {...shared}>
        <path d="M22 12v18M28 12v18M34 12v18M22 30h12l-3 8v50h-6V38z" />
        <path d="M52 12c8 8 8 24 4 30h-4z" />
        <path d="M49 42h6v46h-6z" />
      </svg>
    );
  }
  return (
    <svg {...shared}>
      <path d="M6 40h68l-8 12H14z" />
      <path d="M6 40l10-10h52l6 10" />
      <path d="M20 52v34M62 52v34M30 52v22M52 52v22" />
    </svg>
  );
}

export default function Bordsbon() {
  return (
    <div style={{ fontFamily: "var(--font-public-sans), sans-serif", background: "oklch(98.5% 0.006 90)", color: "oklch(20% 0.015 50)", lineHeight: 1.6, minHeight: "100vh" }}>
      <ToolPageHeader maxWidth={960} />

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "56px 28px 88px" }}>
        <div className="bb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <p style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: "oklch(42% 0.015 50)", margin: "0 0 14px" }}>
              Bordsbön
            </p>
            <div style={{ height: 1, background: "oklch(85% 0.008 80)", marginBottom: 44 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {VERSES.map((v, idx) => (
                <div
                  key={v.number}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "96px 1fr",
                    gap: 24,
                    alignItems: "start",
                    padding: idx === 0 ? "0 0 34px" : "34px 0",
                    borderTop: idx === 0 ? undefined : "1px solid oklch(89% 0.008 80)",
                  }}
                >
                  <VerseIcon icon={v.icon} />
                  <div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".2em", color: "oklch(55% 0.015 50)", margin: "0 0 6px" }}>{v.number}</p>
                    <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 26, fontWeight: 400, letterSpacing: ".05em", margin: "0 0 10px", color: v.color }}>
                      {v.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: 15.5, color: "oklch(38% 0.015 50)", textWrap: "pretty" }}>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap", marginTop: 40, paddingTop: 22, borderTop: "1px solid oklch(89% 0.008 80)", flexWrap: "wrap" }}>
              {VERSES.map((v, idx) => (
                <span key={v.title} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {idx > 0 && <span style={{ color: "oklch(85% 0.008 80)", fontSize: 10.5 }}>|</span>}
                  <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".14em", color: v.color }}>{v.title}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bb-right" style={{ borderLeft: "1px solid oklch(89% 0.008 80)", paddingLeft: 56 }}>
            <p
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "oklch(42% 0.015 50)",
                margin: "0 0 14px",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Rör vid varje sak
              <br />
              medan ni ber
            </p>
            <div style={{ height: 1, background: "oklch(85% 0.008 80)", marginBottom: 44 }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {QUOTES.map((q) => (
                <p
                  key={q.text}
                  style={{
                    fontFamily: "var(--font-lora), serif",
                    fontSize: 38,
                    fontWeight: 400,
                    lineHeight: 1.22,
                    margin: "0 0 40px",
                    paddingTop: q.first ? undefined : 40,
                    borderTop: q.first ? undefined : "1px solid oklch(89% 0.008 80)",
                    textWrap: "pretty",
                    color: q.color,
                  }}
                >
                  {q.text}
                </p>
              ))}
              <div style={{ textAlign: "center", paddingTop: 16 }}>
                <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 22, color: "oklch(60% 0.015 50)", margin: "0 0 18px" }}>†</p>
                <div style={{ height: 1, background: "oklch(85% 0.008 80)", marginBottom: 22 }} />
                <p style={{ fontFamily: "var(--font-public-sans), sans-serif", fontSize: 30, fontWeight: 400, letterSpacing: ".18em", margin: 0, color: "oklch(30% 0.015 50)" }}>
                  AMEN.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64, paddingTop: 28, borderTop: "1px solid oklch(89% 0.008 80)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <p style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "oklch(58% 0.015 50)", margin: 0 }}>
            En enkel liturgi för vardagens måltider
          </p>
          <a
            href="/samtalskort"
            style={{
              padding: "11px 22px",
              background: "oklch(94% 0.035 145)",
              color: "oklch(44% 0.09 145)",
              border: "1px solid oklch(86% 0.05 145)",
              borderRadius: 100,
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            Samtalskort för barnfamiljer →
          </a>
        </div>
      </main>
    </div>
  );
}
