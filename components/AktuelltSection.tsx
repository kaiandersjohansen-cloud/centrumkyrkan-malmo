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

const CARDS: Card[] = [
  {
    key: "quiz-vafflor",
    image: "/images/quiz-vafflor-glass.jpg",
    alt: "Quiz, våfflor & glass hemma hos Kai & Stina, 9 augusti",
    title: "Quiz, våfflor & glass – söndag 9 augusti kl 18:00",
    description: "Hemma hos Kai & Stina, Bävergatan 11, Malmö. För alla åldrar – även större barn som gillar glass och quiz! Varmt välkommen!",
    cta: { badge: "Ingen anmälan" },
    expires: new Date(2026, 7, 10),
  },
  {
    key: "lovsangsgudstjanst",
    image: "/images/lovsangsgudstjanst.jpg",
    alt: "Lovsångsgudstjänst söndag 16 augusti kl 19:00",
    title: "Lovsångsgudstjänst – söndag 16 augusti kl 19:00",
    description: "Ett fantastiskt sätt att återkoppla efter sommaren och ladda batterierna med Guds närvaro inför en ny termin.",
    cta: { badge: "Varmt välkommen" },
    expires: new Date(2026, 7, 17),
  },
  {
    key: "forsamlingshelg",
    image: "/images/forsamlingshelg.jpg",
    alt: "Församlingshelg 22–23 augusti 2026",
    imageFit: "contain",
    title: "Församlingshelg 22–23 augusti 2026",
    description: "Strandhem Missionsgård i Örkelljunga. Gemenskap, andakter, bön och aktiviteter för alla åldrar (ungdomarna börjar 21 augusti).",
    cta: { badge: "Anmälan stängd", muted: true },
    expires: new Date(2026, 7, 24),
  },
  {
    key: "alska-malmo",
    image: "/images/alska-malmo-jesus.jpg",
    alt: "Älska Malmö 2026 – Jesus!? med Joel MacInnes och Marie-Louise Nilsson",
    title: "Älska Malmö 2026 – Jesus!?",
    description: "Två kvällar i Europaporten med fokus på att berätta dem goda nyheterna om Jesus. Bjud gärna med en vän.",
    cta: { label: "Kolla hela programmet", href: "https://www.alskamalmo.se" },
    expires: new Date(2026, 8, 21),
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
    key: "tacksagelse",
    image: "/images/tacksagelse-card.jpg",
    alt: "Thankful – Tacksägelsebruncher i hemmen 11 oktober",
    title: "Tacksägelsebruncher – söndag 11 oktober",
    description: "Söndag 11 oktober är det tacksägelsedagen! Ett perfekt tillfälle att ge extra tid åt gemenskapen och visa hur tacksamma vi är för Gud och varandra. Välkommen till tacksägelsebrunch med knytkalas i hemmen kl 10:30–ca 13:30, innan gudstjänsten.",
    cta: { label: "Info och anmälan", href: "https://forms.gle/TRmLiygLgiyhtMKM6" },
    expires: new Date(2026, 9, 12),
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
    key: "bordsbon",
    image: "/images/bordsbon-card.png",
    alt: "Rör vid varje sak medan ni ber – Tack för livet som vi fått",
    title: "Vår nya bordsbön",
    description: "En helt ny bordsbön att lära sig utantill och be hemma kring matbordet – om liv, försörjning, tjänst och gemenskap.",
    cta: { label: "Läs bönen här", href: "/bordsbon" },
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
