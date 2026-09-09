const pillOutline = {
  display: "inline-block" as const,
  background: "oklch(98.5% 0.006 90)",
  color: "oklch(50% 0.06 145)",
  border: "1px solid oklch(50% 0.06 145)",
  padding: "11px 22px",
  borderRadius: 100,
  fontWeight: 500,
  fontSize: 15,
};

export default function BarnSection() {
  return (
    <section id="barn" style={{ padding: "96px 28px", background: "oklch(96.5% 0.01 95)", scrollMarginTop: 88 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto 64px", textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Barn &amp; ungdomar
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 32, fontWeight: 500, margin: 0 }}>
            Från söndagsskola till ungdomsgrupp.
          </h2>
        </div>
        <div className="stack-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
          <div style={{ paddingTop: 24, borderTop: "1px solid oklch(89% 0.008 80)" }}>
            <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 19, fontWeight: 500, margin: "0 0 12px" }}>Söndagsskolan Biblia</h3>
            <p style={{ margin: "0 0 14px", color: "oklch(42% 0.015 50)", fontSize: 15.5 }}>
              Varje söndag under gudstjänsten. Vi pysslar, sjunger och leker utifrån bibliska teman. Biblia Mini för barn från 2,5 år till åk 1 och Biblia Maxi för barn från åk 2 till åk 6.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="/Samtalskort.dc.html" className="btn-outline-green" style={pillOutline}>
                Samtalskort för barnfamiljer
              </a>
              <a href="/Bordsbon.dc.html" className="btn-outline-green" style={pillOutline}>
                Vår nya bordsbön
              </a>
            </div>
          </div>
          <div style={{ paddingTop: 24, borderTop: "1px solid oklch(89% 0.008 80)" }}>
            <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 19, fontWeight: 500, margin: "0 0 12px" }}>Ungdomsgruppen Cungarna</h3>
            <p style={{ margin: "0 0 14px", color: "oklch(42% 0.015 50)", fontSize: 15.5 }}>
              För dig från 7:an tills du fyller 18. Vi träffas fredagar och söndagar – varannan vecka. Tamanda Sandström är ansvarig för ungdomsarbetet och nås på{" "}
              <a href="tel:0767970055" className="underline-link" style={{ fontWeight: 500, borderBottom: "1px solid oklch(60% 0.02 50)" }}>
                0767-970055
              </a>
              .
            </p>
            <a href="https://www.instagram.com/centrumkyrkans_ungdomar/" target="_blank" rel="noopener noreferrer" className="btn-outline-green" style={pillOutline}>
              Följ Cungarna på Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
