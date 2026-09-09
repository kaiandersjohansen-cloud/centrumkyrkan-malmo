import type { CSSProperties } from "react";

const linkStyle: CSSProperties = {
  display: "block",
  width: "fit-content",
  color: "oklch(50% 0.06 145)",
  fontWeight: 600,
  fontSize: 16,
  borderBottom: "1px solid oklch(50% 0.06 145)",
  paddingBottom: 2,
};

export default function VagenSection() {
  return (
    <section id="vagen" style={{ padding: "96px 28px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto 64px", textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Ditt nästa steg
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 32, fontWeight: 500, margin: 0 }}>
            Var du än är i din tro finns mer att upptäcka.
          </h2>
        </div>
        <div className="stack-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
          <div style={{ padding: "32px 32px 0", borderTop: "1px solid oklch(20% 0.015 50)" }}>
            <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 16, color: "oklch(50% 0.06 145)", margin: "0 0 14px" }}>01</p>
            <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 20, fontWeight: 500, margin: "0 0 12px" }}>
              <a href="https://testaalpha.se" className="underline-link" style={{ borderBottom: "1px solid oklch(60% 0.02 50)" }}>
                Alpha-kurs
              </a>
            </h3>
            <p style={{ margin: "0 0 14px", color: "oklch(42% 0.015 50)", fontSize: 16 }}>
              Utforska den kristna tron tillsammans, i en avslappnad miljö – öppet för alla frågor. Nästa kurs: 24 september 2026.
            </p>
            <a href="mailto:stina.b.johansen@gmail.com" className="underline-link-green" style={linkStyle}>
              Intresseanmälan →
            </a>
            <a
              href="https://testaalpha.se"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-link-green"
              style={{ ...linkStyle, marginTop: 10 }}
            >
              Läs mer om Alpha →
            </a>
          </div>
          <div style={{ padding: "32px 32px 0", borderTop: "1px solid oklch(20% 0.015 50)" }}>
            <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 16, color: "oklch(50% 0.06 145)", margin: "0 0 14px" }}>02</p>
            <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 20, fontWeight: 500, margin: "0 0 12px" }}>
              <a href="https://practicingtheway.org" className="underline-link" style={{ borderBottom: "1px solid oklch(60% 0.02 50)" }}>
                Praktisera Vägen
              </a>
            </h3>
            <p style={{ margin: "0 0 14px", color: "oklch(42% 0.015 50)", fontSize: 16 }}>
              En kurs som fördjupar dig i kristen praktik och efterföljelse i vardagen. Nästa kurs: Våren 2027.
            </p>
            <a
              href="mailto:kai@centrumkyrkanmalmo.se?subject=Jag%20%C3%A4r%20intresserad%20av%20kursen%20Praktisera%20V%C3%A4gen"
              className="underline-link-green"
              style={{ ...linkStyle, display: "inline-block" }}
            >
              Intresseanmälan →
            </a>
            <a
              href="https://www.practicingtheway.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-link-green"
              style={{ ...linkStyle, display: "inline-block", marginTop: 10 }}
            >
              Läs mer om Praktisera Vägen →
            </a>
          </div>
          <div style={{ padding: "32px 32px 0", borderTop: "1px solid oklch(20% 0.015 50)" }}>
            <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 16, color: "oklch(50% 0.06 145)", margin: "0 0 14px" }}>03</p>
            <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 20, fontWeight: 500, margin: "0 0 12px" }}>Hemgrupp &amp; Gudstjänst</h3>
            <p style={{ margin: "0 0 14px", color: "oklch(42% 0.015 50)", fontSize: 16 }}>
              Landa i gemenskapen genom att dela livet med andra i hemgrupp och på söndagar. Är du nyfiken på hemgrupp?
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="mailto:kai@centrumkyrkanmalmo.se?subject=Jag%20%C3%A4r%20intresserad%20av%20hemgrupp"
                className="underline-link-green"
                style={{ ...linkStyle, display: "inline-block" }}
              >
                Hör av dig →
              </a>
              <a
                href="https://docs.google.com/document/d/1GDmtuoY-sA_PsGTUcHGAL7sKHLX6inL-P1z7IlEvHK8/edit?usp=share_link"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-link-green"
                style={{ ...linkStyle, display: "inline-block" }}
              >
                Upptäckande Bibelsamtal →
              </a>
              <a href="/Bordssamtal.dc.html" className="underline-link-green" style={{ ...linkStyle, display: "inline-block" }}>
                Bordssamtal – digitalt verktyg →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
