import type { ReactNode } from "react";
import { isExpired } from "@/lib/dates";

interface Card {
  key: string;
  image: string;
  alt: string;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  title: string;
  description: ReactNode;
  cta?: { label: string; href: string; external?: boolean } | { badge: string; muted?: boolean };
  expires?: Date;
}

const SKRIFTEN_DATES = [
  { date: "Sön 4 okt", title: "Läsa & meditera" },
  { date: "Sön 11 okt", title: "Varför är Bibeln Guds ord? Gäst: Joel MacInnes" },
  { date: "Sön 18 okt", title: "Studera & förstå" },
  { date: "Sön 25 okt", title: "Memorera & bevara" },
];

const CARDS: Card[] = [
  {
    key: "skriften",
    image: "/images/skriften-card.jpg",
    alt: "Ny predikoserie: Skriften – att lära sig att älska Bibeln",
    title: "Ny predikoserie: Skriften – att lära sig att älska Bibeln",
    description: (
      <>
        Under oktober tittar vi närmare på Bibeln: hur vi kan läsa den, förstå den och bära den med oss i vardagen.
        <span style={{ display: "block", marginTop: 12 }}>
          {SKRIFTEN_DATES.map((d) => (
            <span key={d.date} style={{ display: "block", marginTop: 4 }}>
              <strong style={{ fontWeight: 600, color: "oklch(30% 0.015 50)" }}>{d.date}</strong> – {d.title}
            </span>
          ))}
        </span>
      </>
    ),
    cta: { label: "Lyssna här", href: "https://open.spotify.com/episode/5zI5EIE02fFijNmDETpLJ7?si=4a70fb9a94884d64", external: true },
    expires: new Date(2026, 9, 26),
  },
  {
    key: "alpha-sep",
    image: "/images/alpha-24-sep.png",
    alt: "Alpha-kurs start 24/9 kl 18.30, Centrumkyrkan Malmö & Immanuelskyrkan",
    title: "Ny Alpha-kurs torsdag 24 sep 2026 kl 18:30",
    description: 'Med Immanuelskyrkan, Köpenhamnsvägen 3 – med en egen "Centrumkyrkan samtalsgrupp". Nyfiken på tron? Alpha är perfekt för dig.',
    cta: { label: "Anmäl dig till Alpha", href: "mailto:stina.b.johansen@gmail.com?subject=Jag%20%C3%A4r%20intresserad%20av%20Alpha-kursen" },
    expires: new Date(2026, 8, 25),
  },
  {
    key: "kyrkoavgift",
    image: "/images/kyrkoavgiften-card.png",
    alt: "Kyrkoavgiften till Centrumkyrkan Malmö – registrera dig innan 31 oktober",
    title: "Ge din kyrkoavgift till Centrumkyrkan",
    description: "Du kan välja att ge 1 procent av din kommunalskatt direkt till församlingen. Du registrerar dig en gång med BankID, sedan sköter Skatteverket resten. Sista dag är 31 oktober.",
    cta: { label: "Anslut dig här", href: "https://app.assently.com/t/va8x1u" },
    expires: new Date(2026, 10, 1),
  },
  {
    key: "bordssamtal",
    image: "/images/bordssamtal-hero.png",
    alt: "Fyra personer samtalar runt ett bord med Bibel och samtalsfrågor",
    title: "Testa Bordssamtal – nytt digitalt verktyg",
    description: "Ett enkelt verktyg för att komma i gång med bättre och djupare samtal tillsammans med vänner eller i hemgruppen.",
    cta: { label: "Testa här", href: "/bordssamtal" },
  },
  {
    key: "samtalskort",
    image: "/images/samtalskort-card.png",
    alt: "Samtalskort för barnfamiljer",
    imageFit: "contain",
    imageBg: "oklch(98.5% 0.006 90)",
    title: "Nya Samtalskort – för barnfamiljer",
    description: "Tio kort med bibelord, en praktik och en samtalsfråga – perfekt vid matbordet med barnen.",
    cta: { label: "Testa här", href: "/samtalskort" },
  },
];

export default function AktuelltSection() {
  const visibleCards = CARDS.filter((c) => !c.expires || !isExpired(c.expires));

  return (
    <section style={{ padding: "56px 28px 96px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "oklch(50% 0.06 145)",
            margin: "0 0 24px",
            textAlign: "center",
          }}
        >
          Aktuellt
        </p>
        <div className="stack-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {visibleCards.map((card) => (
            <div key={card.key} style={{ display: "flex", flexDirection: "column", background: "oklch(96.5% 0.01 95)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", background: card.imageBg }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.alt}
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: card.imageFit || "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 20, fontWeight: 500, margin: "0 0 10px" }}>
                  {card.title}
                </h2>
                <p style={{ fontSize: 15, color: "oklch(42% 0.015 50)", margin: card.cta ? "0 0 16px" : 0 }}>{card.description}</p>
                {card.cta && "badge" in card.cta && (
                  <span
                    style={{
                      display: "inline-block",
                      background: card.cta.muted ? "oklch(85% 0.01 80)" : "oklch(50% 0.06 145)",
                      color: card.cta.muted ? "oklch(42% 0.015 50)" : "oklch(98.5% 0.006 90)",
                      padding: "11px 22px",
                      borderRadius: 100,
                      fontWeight: 500,
                      fontSize: 15,
                    }}
                  >
                    {card.cta.badge}
                  </span>
                )}
                {card.cta && "href" in card.cta && (
                  <a
                    href={card.cta.href}
                    {...(card.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="btn-solid-green"
                    style={{
                      display: "inline-block",
                      background: "oklch(50% 0.06 145)",
                      color: "oklch(98.5% 0.006 90)",
                      padding: "11px 22px",
                      borderRadius: 100,
                      fontWeight: 500,
                      fontSize: 15,
                      alignSelf: "flex-start",
                    }}
                  >
                    {card.cta.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
