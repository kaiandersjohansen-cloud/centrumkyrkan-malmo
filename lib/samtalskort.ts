export interface SamtalskortBase {
  title: string;
  ref: string;
  verse: string;
  practiceName: string;
  practice: string;
  talk: string;
}

export const BASE_CARDS: SamtalskortBase[] = [
  {
    title: "Sabbat",
    ref: "2 Mos 20:8",
    verse: "”Tänk på sabbatsdagen så att du helgar den.”",
    practiceName: "Slowmotionsabbat",
    practice:
      "Gör allt extra långsamt en stund av måltiden – hälla upp vatten, tugga, prata. Skratta åt hur konstigt (och skönt) det känns att inte skynda sig.",
    talk: "Vad skulle hända om vi levde lite långsammare hela veckan?",
  },
  {
    title: "Bön",
    ref: "Fil 4:6",
    verse:
      "”Bekymra er inte för något, utan låt Gud få veta alla era önskningar genom bön och åkallan med tacksägelse.”",
    practiceName: "Popcornbön",
    practice:
      "Gå snabbt runt bordet, som popcorn som poppar, och säg en sak var – något ni tackar för eller ber om.",
    talk: "Om Jesus satt vid bordet nu, vad skulle du säga till honom?",
  },
  {
    title: "Generositet",
    ref: "Ords 11:25",
    verse: "”Den frikostige blir rik, och den som ger andra att dricka får själv dricka.”",
    practiceName: "Guds-jakten",
    practice: "Gå runt bordet – var har du sett Guds omsorg eller godhet denna vecka, stort eller litet?",
    talk: "Hur kan vi dela den godheten vidare till någon annan?",
  },
  {
    title: "Tjänande",
    ref: "Joh 13:14–15",
    verse:
      "”Om nu jag, er Herre och Mästare, har tvättat era fötter, så är också ni skyldiga att tvätta varandras fötter. Jag har gett er ett exempel för att ni ska göra som jag har gjort mot er.”",
    practiceName: "Mini-fottvätt",
    practice:
      "Om ni vågar – tvätta en persons händer (eller fötter) i en skål med vatten och säg: ”Som Jesus har älskat dig, [namn], får du älska dem omkring dig.”",
    talk: "Hur kändes det att bli tjänad? Hur kändes det att tjäna?",
  },
  {
    title: "Gemenskap",
    ref: "Pred 4:9–10",
    verse: "”Två är bättre än en, de får god lön för sin möda. Om de faller kan den ene hjälpa den andre upp igen.”",
    practiceName: "Välsignelsestolen",
    practice:
      "En person i taget sätter sig i ”välsignelsestolen”. De andra tackar Gud högt för något hos den personen – inte främst vad personen gör, utan vem personen är.",
    talk: "Hur kändes det att bli välsignad av de andra?",
  },
  {
    title: "Vara med Jesus",
    ref: "Ps 46:11",
    verse: "”Bli stilla och besinna att jag är Gud.”",
    practiceName: "60 sekunder tystnad",
    practice: "Sätt en timer och var helt tysta tillsammans. Skratta gärna efteråt om det var svårt!",
    talk: "Vad hör man när man är tyst? Kändes det skönt eller jobbigt?",
  },
  {
    title: "Bli lik Jesus",
    ref: "Ef 5:1–2",
    verse: "”Bli därför Guds efterföljare, som hans älskade barn. Och lev i kärlek, så som Kristus har älskat oss och utgett sig själv för oss.”",
    practiceName: "Viskleken",
    practice:
      "En person viskar något som Jesus sa till sin bordsgranne (fråga en vuxen om du inte kommer ihåg). Budskapet viskas vidare runt bordet. Den sista säger högt vad hen hörde – stämde det?",
    talk: "Hur kan vi hjälpa varandra att inte bara komma ihåg det Jesus sa, utan också leva som han lärde?",
  },
  {
    title: "Vara med Jesus",
    ref: "Matt 11:28",
    verse: "”Kom till mig, alla ni som arbetar och bär på tunga bördor, så ska jag ge er vila.”",
    practiceName: "Andningsbön",
    practice: "Andas in och tänk orden ”kom till mig”. Andas ut och tänk ”jag vilar i dig”. Upprepa tre gånger tillsammans.",
    talk: "Vad betyder det att ”vila” i Jesus mitt i en helt vanlig vardag?",
  },
  {
    title: "Bli lik Jesus",
    ref: "Gal 5:22–23",
    verse:
      "”Men Andens frukt är kärlek, glädje, frid, tålamod, vänlighet, godhet, trofasthet, mildhet och självbehärskning. Lagen är inte mot sådant.”",
    practiceName: "Fruktspaning",
    practice: "Gå igenom listan – berätta om en gång ni sett en av frukterna hos någon annan vid bordet den här veckan.",
    talk: "Vilken frukt vill du växa mest i just nu?",
  },
  {
    title: "Göra vad Jesus gjorde",
    ref: "Matt 25:35–36",
    verse:
      "”Jag var hungrig, och ni gav mig mat. Jag var törstig, och ni gav mig att dricka. Jag var en främling, och ni öppnade era hem för mig. Jag var sjuk, och ni tog hand om mig.”",
    practiceName: "Uppdraget",
    practice:
      "Fundera tillsammans – vem i vår stad, skola eller familj kan behöva något av detta just nu? Bestäm en konkret sak ni kan göra tillsammans denna vecka.",
    talk: "Hur tycker du det känns att hjälpa andra?",
  },
];

export interface SamtalskortPalette {
  ink: string;
  soft: string;
  line: string;
}

export const PALETTE: SamtalskortPalette[] = [
  { ink: "oklch(46% 0.09 145)", soft: "oklch(94% 0.035 145)", line: "oklch(86% 0.05 145)" },
  { ink: "oklch(52% 0.13 45)", soft: "oklch(94% 0.04 45)", line: "oklch(87% 0.06 45)" },
  { ink: "oklch(50% 0.10 85)", soft: "oklch(94% 0.045 90)", line: "oklch(87% 0.06 88)" },
  { ink: "oklch(48% 0.08 230)", soft: "oklch(94% 0.03 230)", line: "oklch(87% 0.045 230)" },
  { ink: "oklch(47% 0.09 350)", soft: "oklch(94% 0.032 350)", line: "oklch(87% 0.05 350)" },
  { ink: "oklch(46% 0.09 195)", soft: "oklch(94% 0.035 195)", line: "oklch(86% 0.05 195)" },
  { ink: "oklch(50% 0.11 25)", soft: "oklch(94% 0.04 25)", line: "oklch(87% 0.055 25)" },
  { ink: "oklch(45% 0.09 265)", soft: "oklch(94% 0.03 265)", line: "oklch(87% 0.045 265)" },
  { ink: "oklch(48% 0.10 120)", soft: "oklch(94% 0.04 120)", line: "oklch(86% 0.055 120)" },
  { ink: "oklch(50% 0.11 60)", soft: "oklch(94% 0.045 60)", line: "oklch(87% 0.06 60)" },
];

export const SAMTALSKORT_OWN_KEY = "ck_samtalskort_egna";
export const SAMTALSKORT_DONE_KEY = "ck_samtalskort_klara";
