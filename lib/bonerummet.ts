// Delade typer och innehåll för Bönerummet (/bonerummet och /bonerummet/vaggen).

export type Kategori = "bon" | "tack";

export interface Inlagg {
  id: string;
  kategori: Kategori;
  text: string;
  namn: string;
  ts: number;
  ber: number;
}

export interface Bibelord {
  text: string;
  referens: string;
  copyright: string;
}

export interface FastAmne {
  id: string;
  text: string;
  ber: number;
}

export interface VaggData {
  aktiv: boolean;
  inlagg: Inlagg[];
  fasta: FastAmne[];
  // Räknarna för de fasta böneämnena nollställs när perioden byts (varannan dag).
  period: number;
  bibelord: Bibelord | null;
}

// Inläggen raderas automatiskt efter så här lång tid.
export const LIVSLANGD_DAGAR = 14;
export const MAX_TEXT = 240;
export const MAX_NAMN = 40;

// Församlingens fasta böneämnen, som alltid visas överst på väggen. Kommande
// händelser i kalendern läggs till automatiskt (se app/api/bonerummet/route.ts).
export const FASTA_BONEAMNEN = [
  "Be för Malmö och människorna som bor här",
  "Be för våra evangelister Nipen och Jibon i Bangladesh",
  "Be för barn och unga i församlingen",
  "Be för alla som söker Gud och vill veta mer om Jesus",
];
export const KALENDER_DAGAR = 14;
export const KALENDER_MAX = 4;
export const PERIOD_DAGAR = 2;

// Hur kalenderhändelser heter i böneämnena. Nyckeln är namnet i kalendern.
// Saknas namnet används kalenderns namn som det är.
export const KALENDER_NAMN: Record<string, string> = {
  alpha: "Alphakursen",
  "alpha-kurs": "Alphakursen",
  alphakurs: "Alphakursen",
  adventsgudstjänst: "adventsgudstjänsten",
  julbön: "julbönen",
  "julafton": "julaftonens gudstjänst",
  församlingsmöte: "församlingsmötet",
  församlingshelg: "församlingshelgen",
};

// Den vanliga gudstjänsten är inget eget böneämne eftersom den kommer varje vecka.
export function arVanligGudstjanst(titel: string, aterkommande: boolean): boolean {
  return /^gudstjänst\b/i.test(titel) || (aterkommande && /gudstjänst/i.test(titel));
}

const VECKODAGAR = ["söndagar", "måndagar", "tisdagar", "onsdagar", "torsdagar", "fredagar", "lördagar"];

// "Be för Alphakursen på torsdagar" eller "Be för adventsgudstjänsten".
export function kalenderAmne(titel: string, start: Date, aterkommande: boolean): string {
  const namn = KALENDER_NAMN[titel.toLowerCase()] ?? titel;
  if (!aterkommande) return `Be för ${namn}`;
  const dag = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Stockholm", weekday: "short" }).format(start);
  const index = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(dag);
  return `Be för ${namn} på ${VECKODAGAR[index] ?? "veckorna"}`;
}

// Dagnummer räknat på svenskt datum (byts vid midnatt i Sverige).
export function svenskDag(nu = new Date()): number {
  const datum = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm" }).format(nu);
  return Math.floor(Date.parse(`${datum}T00:00:00Z`) / 86_400_000);
}

export function aktuellPeriod(nu = new Date()): number {
  return Math.floor(svenskDag(nu) / PERIOD_DAGAR);
}

// Stabilt id för ett fast böneämne, byggt av texten.
export function amneId(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return `f${h.toString(36)}`;
}

// Bibelord om bön som visas på väggen, ett nytt varje dag (nuBibeln).
export const BIBELORD = [
  "PHP.4.6-7",
  "MAT.7.7-8",
  "JAS.5.16",
  "1TH.5.16-18",
  "JER.33.3",
  "1JN.5.14-15",
  "ROM.8.26",
  "MAT.18.19-20",
  "PSA.145.18",
  "ISA.40.31",
  "MAT.11.28",
  "HEB.4.16",
  "EPH.6.18",
  "COL.4.2",
  "LUK.18.1",
  "JHN.14.13-14",
  "2CH.7.14",
  "ROM.12.12",
  "1PE.5.7",
  "LAM.3.22-23",
  "ISA.41.10",
  "JHN.16.24",
  "MRK.11.24",
];
