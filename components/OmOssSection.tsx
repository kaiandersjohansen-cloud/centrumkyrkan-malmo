const STAFF = [
  { image: "/images/kai-johansen.jpeg", alt: "Kai Johansen", name: "Kai Johansen", role: "Pastor och föreståndare. Gift med Stina, fyra barn.", objectPosition: undefined },
  {
    image: "/images/erik-thordin2.jpeg",
    alt: "Erik Thordin",
    name: "Erik Thordin",
    role: "Pastor med ansvar för barnverksamhet. Gift med Lovisa, tre barn.",
    objectPosition: "center 20%",
  },
  {
    image: "/images/tamanda-svanstrom.jpeg",
    alt: "Tamanda Sandström",
    name: "Tamanda Sandström",
    role: "Ungdomsledare och församlingsmedarbetare. Gift med Elliot.",
    objectPosition: "center 25%",
  },
];

export default function OmOssSection() {
  return (
    <section id="om-oss" style={{ padding: "96px 28px", scrollMarginTop: 88 }}>
      <div className="stack-2" style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Om oss
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 30, fontWeight: 500, margin: "0 0 22px" }}>
            En ung församling med Jesus i centrum.
          </h2>
          <p style={{ fontSize: 16, color: "oklch(42% 0.015 50)", margin: "0 0 18px" }}>
            Centrumkyrkan Malmö startade som en församlingsplantering 2019 och är idag en pingstförsamling med omkring hundra vuxna och barn, ansluten till Pingst FFS.
          </p>
          <p style={{ fontSize: 16, color: "oklch(42% 0.015 50)", margin: "0 0 18px" }}>
            Jesus Kristus är centrum för allt vi är och gör. Vi bekänner oss till Bibeln och den klassiska kristna tron, och alla är välkomna att vara med, oavsett bakgrund.
          </p>
          <p style={{ fontSize: 16, color: "oklch(42% 0.015 50)", margin: "0 0 22px" }}>
            Är du intresserad att gå med som medlem kan du klicka länken nedan så blir du kontaktat av en av våra pastorer.
          </p>
          <a
            href="https://forms.gle/zawZodEq8Bt11TC77"
            target="_blank"
            rel="noopener"
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
            Ansök om medlemskap
          </a>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
            Pastorer och stab
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {STAFF.map((person) => (
              <div key={person.name} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ width: 88, height: 88, flex: "none", borderRadius: "50%", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.image}
                    alt={person.alt}
                    width={88}
                    height={88}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: person.objectPosition, display: "block" }}
                  />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 19, fontWeight: 500, margin: "0 0 6px" }}>{person.name}</h3>
                  <p style={{ margin: 0, color: "oklch(42% 0.015 50)", fontSize: 15.5 }}>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid oklch(89% 0.008 80)" }}>
            <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 12px" }}>
              Vill du ge en gåva till församlingen?
            </p>
            <p style={{ margin: 0, color: "oklch(42% 0.015 50)", fontSize: 16 }}>Swish: 123 360 55 24 · Bankgiro: 5437-4228</p>
          </div>
        </div>
      </div>
    </section>
  );
}
