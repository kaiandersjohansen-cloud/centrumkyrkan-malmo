// Hidden in the original source too (display:none) — kept dormant here for parity.
export default function ReflektionSection() {
  return (
    <section id="reflektion" style={{ display: "none", padding: "96px 28px", background: "oklch(96.5% 0.01 95)", scrollMarginTop: 88 }}>
      <div style={{ maxWidth: 640, margin: "0 auto 48px", textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
          Veckans reflektion
        </p>
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", background: "oklch(98.5% 0.006 90)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
        <div style={{ padding: "48px 40px 36px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 56, lineHeight: 1, color: "oklch(72% 0.045 130)", margin: "0 0 8px" }}>&ldquo;</p>
          <blockquote style={{ margin: "0 0 24px", fontFamily: "var(--font-lora), serif", fontSize: 24, lineHeight: 1.45, fontWeight: 500, color: "oklch(20% 0.015 50)" }}>
            När Jesus rullade ur sängen i gryningen och gick ensam till Oljeberget för att be, var det kärlek som drev honom dit, inte ett andligt betygssystem.
          </blockquote>
          <p style={{ margin: "0 0 14px", fontSize: 16.5, color: "oklch(42% 0.015 50)" }}>
            För Jesus var gemenskapen med Fadern hans djupaste längtan, källan till hans identitet och den enda vägen till sant liv.
          </p>
          <p style={{ margin: "0 0 20px", fontSize: 16.5, color: "oklch(42% 0.015 50)" }}>Gud för ingen närvarolista och delar inte ut betyg. Det här handlar om kärlek.</p>
          <div style={{ width: 32, height: 1, background: "oklch(50% 0.06 145)", margin: "0 0 16px" }} />
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(50% 0.06 145)" }}>Tyler Staton</p>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "55%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: "none",
            filter: "blur(28px)",
            WebkitMaskImage: "linear-gradient(to left, black 25%, transparent 100%)",
            maskImage: "linear-gradient(to left, black 25%, transparent 100%)",
          }}
        >
          <div style={{ position: "absolute", right: 40, bottom: -70, width: 260, height: 260, borderRadius: "50%", background: "oklch(50% 0.06 145 / 0.16)" }} />
          <div style={{ position: "absolute", right: -20, bottom: 30, width: 150, height: 150, borderRadius: "50%", background: "oklch(89% 0.008 80 / 0.9)" }} />
        </div>
      </div>
    </section>
  );
}
