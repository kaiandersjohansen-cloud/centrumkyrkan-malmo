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

export interface VaggData {
  aktiv: boolean;
  inlagg: Inlagg[];
  bibelord: Bibelord | null;
}

// Inläggen raderas automatiskt efter så här lång tid.
export const LIVSLANGD_DAGAR = 14;
export const MAX_TEXT = 240;
export const MAX_NAMN = 40;

// Församlingens fasta böneämnen, som alltid visas överst på väggen.
export const FASTA_BONEAMNEN = [
  "Malmö och människorna som bor här",
  "Våra evangelister Nipen och Jibon i Bangladesh",
  "Barn och unga i församlingen",
  "Alla som söker Gud och vill veta mer om Jesus",
];

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
