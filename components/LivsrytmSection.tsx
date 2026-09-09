const PRACTICES: { text: string; linkLabel: string; href: string }[] = [
  {
    text: "Att bli en gemenskap som tar sig tid att vila i en kultur av stress och upptagenhet genom att praktisera",
    linkLabel: "sabbaten",
    href: "https://open.spotify.com/episode/1rBmJyYmhWcbQcb0TyH4Lp?si=xzJNBEE8QUuiHausCiQqBg",
  },
  {
    text: "Att bli en gemenskap av förnöjsamhet i en kultur av materialism genom att praktisera",
    linkLabel: "generositet",
    href: "https://open.spotify.com/episode/1R8D3WEpqtgh6EcX4nfgdY?si=vlNRlj-qSX6sWg4AVxydXg",
  },
  {
    text: "Att bli en församling av kärlek i en kultur av individualism och ytlighet genom att praktisera",
    linkLabel: "gemenskap",
    href: "https://open.spotify.com/episode/7ebYV73MD2TjgRwSQnJf25?si=y9RhiOEpRfGd8LZcLGzkXA",
  },
  {
    text: "Att bli en gemenskap som lever i relation till Gud i en kultur av distraktion och verklighetsflykt genom att praktisera",
    linkLabel: "bön",
    href: "https://open.spotify.com/episode/2LLyN49K64798wcDfXDLLm?si=Ryg05V87QIi3jziuOWzARQ",
  },
  {
    text: "Att bli en gemenskap av helighet i en kultur av utsvävningar och omoral genom att praktisera",
    linkLabel: "fasta",
    href: "https://open.spotify.com/episode/4xw8zDnB5UcKA2HeVuE2fZ?si=fT2PNTvCS8-jlRoXQ-x9tg",
  },
  {
    text: "En gemenskap av rättvisa och barmhärtighet i en kultur av orättvisa och behov genom att praktisera",
    linkLabel: "tjänande",
    href: "https://open.spotify.com/episode/6T1tKD98LBwOrGBSckmGvC?si=9Db77RqpTtyhgShyDJ5qfQ",
  },
];

const UPCOMING = ["Skriften (hösten 2026)", "Vittna (fastan 2027)", "Avskildhet och tystnad (våren 2027)"];

const pillLink = {
  display: "inline-block" as const,
  border: "1px solid oklch(50% 0.06 145)",
  color: "oklch(50% 0.06 145)",
  padding: "4px 14px",
  borderRadius: 100,
  fontWeight: 500,
  fontSize: 15,
};

export default function LivsrytmSection() {
  return (
    <section style={{ padding: "96px 28px", background: "oklch(96.5% 0.01 95)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto 56px", textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 18px" }}>
          Vår livsrytm
        </p>
        <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 30, fontWeight: 500, margin: "0 0 20px" }}>
          Vår gemensamma livsrytm.
        </h2>
        <p style={{ fontSize: 16.5, color: "oklch(42% 0.015 50)", margin: 0, textAlign: "left" }}>
          Centrumkyrkan Malmö är på en resa där vi återupptäcker vad det betyder att{" "}
          <a
            href="https://open.spotify.com/episode/1ACJd4oe7qRIkGfKpgeWcj?si=48121ad871bc47bd"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(20% 0.015 50)", fontWeight: 500, borderBottom: "1px solid oklch(60% 0.02 50)" }}
          >
            följa Jesus
          </a>
          . Det gör vi bland annat genom att undervisa i kristna praktiker som leder oss fram till en gemensam livsrytm att följa tillsammans. Klicka på varje praktik för att lyssna till undervisning.
        </p>
      </div>
      <div className="stack-2" style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.8fr", gap: 56, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {PRACTICES.map((p, i) => (
              <div
                key={p.linkLabel}
                style={{
                  padding: "16px 0",
                  borderTop: "1px solid oklch(89% 0.008 80)",
                  borderBottom: i === PRACTICES.length - 1 ? "1px solid oklch(89% 0.008 80)" : undefined,
                }}
              >
                <p style={{ margin: 0, fontSize: 16, color: "oklch(42% 0.015 50)" }}>
                  {p.text} <a href={p.href} target="_blank" rel="noopener noreferrer" style={pillLink}>{p.linkLabel}</a>
                </p>
              </div>
            ))}
          </div>
          <p style={{ margin: "20px 0 0", fontSize: 15, fontWeight: 600, color: "oklch(42% 0.015 50)" }}>Kommande praktiker</p>
          <ul style={{ margin: "6px 0 0", padding: 0, listStyle: "none", fontSize: 15, color: "oklch(50% 0.015 60)" }}>
            {UPCOMING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ width: "100%", borderRadius: 6, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/livsrytm-illustration-sm.jpg"
            alt="Vår gemensamma livsrytm"
            width={700}
            height={1244}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
