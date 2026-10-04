const EVANGELISTS = [
  {
    image: "/images/mission-nipen-das.jpg",
    alt: "Nipen Das står med sin cykel i en by i Bangladesh",
    name: "Nipen Das",
    place: "Panchagarh",
    text: "Nipen växte upp i en hinduisk familj och sökte länge efter frid. Ett vanligt samtal på marknaden med en pastor förändrade allt. I dag berättar han för andra om den frid han själv har hittat hos Jesus, en frid som han säger ”ges fritt till alla som söker honom”.",
    objectPosition: "center 35%",
  },
  {
    image: "/images/mission-jibon-biswas.jpg",
    alt: "Jibon Biswas",
    name: "Jibon Biswas",
    place: "Chachra, Khulna",
    text: "Jibon arbetar i södra Bangladesh. ”Att tjäna Herren är en välsignelse och en kallelse”, säger han. ”Det är hans kärlek till människor som driver mig.”",
    objectPosition: "center 30%",
  },
];

const WAYS = [
  { title: "Be", text: "Be för Nipen och Jibon och för människorna de möter." },
  { title: "Ge", text: "Ge till missionen, antingen genom församlingens vanliga givande eller vid våra missionskollekter." },
  { title: "Följ arbetet", text: "Vi delar nyheter från Bangladesh i gudstjänster och i församlingens kanaler." },
];

const eyebrow = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "oklch(50% 0.06 145)",
  margin: "0 0 18px",
};

const bodyText = { margin: 0, color: "oklch(42% 0.015 50)", fontSize: 15.5 };

export default function MissionSection() {
  return (
    <section id="mission" style={{ padding: "96px 28px", background: "oklch(96.5% 0.01 95)", scrollMarginTop: 88 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 680, margin: "0 auto 64px", textAlign: "center" }}>
          <p style={eyebrow}>Mission</p>
          <h2 className="h2-lora" style={{ fontFamily: "var(--font-lora), serif", fontSize: 32, fontWeight: 500, margin: "0 0 22px" }}>
            Evangeliet har fötter.
          </h2>
          <p style={{ fontSize: 16, color: "oklch(42% 0.015 50)", margin: "0 0 18px" }}>
            Vi tror att Guds kärlek är till för alla människor, både här i Malmö och långt härifrån. Därför är vi som församling med och stöder lokala evangelister i Bangladesh, genom missionsorganisationen Ingen Utelatt.
          </p>
          <p style={{ fontSize: 16, color: "oklch(42% 0.015 50)", margin: 0 }}>
            Evangelisterna är bangladeshier som når sina egna grannar. De kan språket och kulturen och tar sig ut i byarna, ofta på cykel, för att berätta om Jesus. Vårt stöd går till deras lön, så att de kan lägga sin tid på det här.
          </p>
        </div>

        <p style={{ ...eyebrow, textAlign: "center", margin: "0 0 28px" }}>Våra evangelister</p>
        <div className="stack-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 72 }}>
          {EVANGELISTS.map((person) => (
            <article key={person.name}>
              <div style={{ aspectRatio: "4/3", borderRadius: 6, overflow: "hidden", marginBottom: 22 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.image}
                  alt={person.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: person.objectPosition, display: "block" }}
                />
              </div>
              <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>{person.name}</h3>
              <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "oklch(50% 0.06 145)" }}>{person.place}</p>
              <p style={bodyText}>{person.text}</p>
            </article>
          ))}
        </div>

        <p style={{ ...eyebrow, textAlign: "center", margin: "0 0 28px" }}>Var med!</p>
        <div className="stack-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
          {WAYS.map((way) => (
            <div key={way.title} style={{ paddingTop: 24, borderTop: "1px solid oklch(89% 0.008 80)" }}>
              <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 19, fontWeight: 500, margin: "0 0 12px" }}>{way.title}</h3>
              <p style={bodyText}>{way.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
