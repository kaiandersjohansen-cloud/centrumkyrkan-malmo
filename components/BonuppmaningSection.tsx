import PrayerSignupWidget from "./PrayerSignupWidget";
import PrayerSubjectsModal from "./PrayerSubjectsModal";

const PRAYER_TAGS: { label: string; variant: "orange" | "green" }[] = [
  { label: "Alpha-kursen", variant: "orange" },
  { label: "Djupare relationer & måltider", variant: "green" },
  { label: "Mission och Diakoni", variant: "orange" },
  { label: "Valet i Sverige", variant: "green" },
  { label: "Barn & ungdomar", variant: "orange" },
  { label: "Tacksamhet för församlingen", variant: "green" },
  { label: "Vänner som inte tror", variant: "orange" },
];

export default function BonuppmaningSection() {
  return (
    <section id="bonuppmaning" style={{ padding: "48px 28px 96px", background: "oklch(98.5% 0.006 90)", scrollMarginTop: 88 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto 48px", textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(58% 0.14 45)", margin: "0 0 18px" }}>
            Centrumkyrkan ber
          </p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 32, fontWeight: 500, margin: "0 0 18px" }}>
            Centrumkyrkan ber!
          </h2>
          <p style={{ fontSize: 17, color: "oklch(42% 0.015 50)", margin: 0 }}>Inför en ny termin vill vi ta extra tid i bön.</p>
        </div>

        <PrayerSignupWidget />

        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 20, fontWeight: 500, margin: "0 0 20px" }}>Böneämnen att be för</h3>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
            {PRAYER_TAGS.map((tag) => (
              <span
                key={tag.label}
                style={{
                  background: tag.variant === "orange" ? "oklch(90% 0.05 45)" : "oklch(90% 0.04 145)",
                  color: tag.variant === "orange" ? "oklch(38% 0.1 45)" : "oklch(30% 0.07 145)",
                  padding: "9px 18px",
                  borderRadius: 100,
                  fontSize: 14.5,
                }}
              >
                {tag.label}
              </span>
            ))}
            <PrayerSubjectsModal />
          </div>
        </div>

        <p style={{ textAlign: "center", fontStyle: "italic", color: "oklch(42% 0.015 50)", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
          Hittills har ni inte bett om något i mitt namn.
          <br />
          Be, och ni ska få, så att er glädje blir fullkomlig. Joh. 16:24
        </p>
      </div>
    </section>
  );
}
