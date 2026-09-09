const NAV_LINKS = [
  { href: "#gudstjanst", label: "Gudstjänst" },
  { href: "#kalender", label: "Kalender" },
  { href: "#vagen", label: "Ditt nästa steg" },
  { href: "#barn", label: "Barn & unga" },
  { href: "#om-oss", label: "Om oss" },
  { href: "#media", label: "Media" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer style={{ background: "oklch(20% 0.015 50)", color: "oklch(75% 0.01 70)", padding: "48px 28px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <a
          href="#main-content"
          style={{
            fontFamily: "var(--font-lora), serif",
            fontWeight: 500,
            fontSize: 16,
            margin: 0,
            color: "oklch(90% 0.006 90)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-sm.png"
            alt="Centrumkyrkan Malmö"
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            style={{ height: 32, width: 32, objectFit: "contain", flexShrink: 0 }}
          />
          <span style={{ whiteSpace: "nowrap" }}>Centrumkyrkan Malmö</span>
        </a>
        <nav style={{ display: "flex", gap: 24, fontSize: 14.5, flexWrap: "wrap" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p style={{ margin: 0, fontSize: 14, color: "oklch(65% 0.008 70)" }}>© 2026 Centrumkyrkan Malmö · Org. nr: 802527-6661</p>
      </div>
    </footer>
  );
}
