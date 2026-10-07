export interface BibleBook {
  usfm: string;
  name: string;
  short: string;
  chapters: number;
}

// Svenska boknamn och förkortningar (Bibel 2000-stil). Kapitelantalet följer den
// längsta av B2000 och Folkbibeln där de skiljer sig (Joel och Malaki).
export const BOOKS: BibleBook[] = [
  { usfm: "GEN", name: "Första Moseboken", short: "1 Mos", chapters: 50 },
  { usfm: "EXO", name: "Andra Moseboken", short: "2 Mos", chapters: 40 },
  { usfm: "LEV", name: "Tredje Moseboken", short: "3 Mos", chapters: 27 },
  { usfm: "NUM", name: "Fjärde Moseboken", short: "4 Mos", chapters: 36 },
  { usfm: "DEU", name: "Femte Moseboken", short: "5 Mos", chapters: 34 },
  { usfm: "JOS", name: "Josua", short: "Jos", chapters: 24 },
  { usfm: "JDG", name: "Domarboken", short: "Dom", chapters: 21 },
  { usfm: "RUT", name: "Rut", short: "Rut", chapters: 4 },
  { usfm: "1SA", name: "Första Samuelsboken", short: "1 Sam", chapters: 31 },
  { usfm: "2SA", name: "Andra Samuelsboken", short: "2 Sam", chapters: 24 },
  { usfm: "1KI", name: "Första Kungaboken", short: "1 Kung", chapters: 22 },
  { usfm: "2KI", name: "Andra Kungaboken", short: "2 Kung", chapters: 25 },
  { usfm: "1CH", name: "Första Krönikeboken", short: "1 Krön", chapters: 29 },
  { usfm: "2CH", name: "Andra Krönikeboken", short: "2 Krön", chapters: 36 },
  { usfm: "EZR", name: "Esra", short: "Esra", chapters: 10 },
  { usfm: "NEH", name: "Nehemja", short: "Neh", chapters: 13 },
  { usfm: "EST", name: "Ester", short: "Est", chapters: 10 },
  { usfm: "JOB", name: "Job", short: "Job", chapters: 42 },
  { usfm: "PSA", name: "Psaltaren", short: "Ps", chapters: 150 },
  { usfm: "PRO", name: "Ordspråksboken", short: "Ords", chapters: 31 },
  { usfm: "ECC", name: "Predikaren", short: "Pred", chapters: 12 },
  { usfm: "SNG", name: "Höga visan", short: "Höga v", chapters: 8 },
  { usfm: "ISA", name: "Jesaja", short: "Jes", chapters: 66 },
  { usfm: "JER", name: "Jeremia", short: "Jer", chapters: 52 },
  { usfm: "LAM", name: "Klagovisorna", short: "Klag", chapters: 5 },
  { usfm: "EZK", name: "Hesekiel", short: "Hes", chapters: 48 },
  { usfm: "DAN", name: "Daniel", short: "Dan", chapters: 12 },
  { usfm: "HOS", name: "Hosea", short: "Hos", chapters: 14 },
  { usfm: "JOL", name: "Joel", short: "Joel", chapters: 4 },
  { usfm: "AMO", name: "Amos", short: "Am", chapters: 9 },
  { usfm: "OBA", name: "Obadja", short: "Ob", chapters: 1 },
  { usfm: "JON", name: "Jona", short: "Jona", chapters: 4 },
  { usfm: "MIC", name: "Mika", short: "Mika", chapters: 7 },
  { usfm: "NAM", name: "Nahum", short: "Nah", chapters: 3 },
  { usfm: "HAB", name: "Habackuk", short: "Hab", chapters: 3 },
  { usfm: "ZEP", name: "Sefanja", short: "Sef", chapters: 3 },
  { usfm: "HAG", name: "Haggai", short: "Hagg", chapters: 2 },
  { usfm: "ZEC", name: "Sakarja", short: "Sak", chapters: 14 },
  { usfm: "MAL", name: "Malaki", short: "Mal", chapters: 4 },
  { usfm: "MAT", name: "Matteusevangeliet", short: "Matt", chapters: 28 },
  { usfm: "MRK", name: "Markusevangeliet", short: "Mark", chapters: 16 },
  { usfm: "LUK", name: "Lukasevangeliet", short: "Luk", chapters: 24 },
  { usfm: "JHN", name: "Johannesevangeliet", short: "Joh", chapters: 21 },
  { usfm: "ACT", name: "Apostlagärningarna", short: "Apg", chapters: 28 },
  { usfm: "ROM", name: "Romarbrevet", short: "Rom", chapters: 16 },
  { usfm: "1CO", name: "Första Korinthierbrevet", short: "1 Kor", chapters: 16 },
  { usfm: "2CO", name: "Andra Korinthierbrevet", short: "2 Kor", chapters: 13 },
  { usfm: "GAL", name: "Galaterbrevet", short: "Gal", chapters: 6 },
  { usfm: "EPH", name: "Efesierbrevet", short: "Ef", chapters: 6 },
  { usfm: "PHP", name: "Filipperbrevet", short: "Fil", chapters: 4 },
  { usfm: "COL", name: "Kolosserbrevet", short: "Kol", chapters: 4 },
  { usfm: "1TH", name: "Första Thessalonikerbrevet", short: "1 Tess", chapters: 5 },
  { usfm: "2TH", name: "Andra Thessalonikerbrevet", short: "2 Tess", chapters: 3 },
  { usfm: "1TI", name: "Första Timotheosbrevet", short: "1 Tim", chapters: 6 },
  { usfm: "2TI", name: "Andra Timotheosbrevet", short: "2 Tim", chapters: 4 },
  { usfm: "TIT", name: "Titusbrevet", short: "Tit", chapters: 3 },
  { usfm: "PHM", name: "Filemonbrevet", short: "Filem", chapters: 1 },
  { usfm: "HEB", name: "Hebreerbrevet", short: "Hebr", chapters: 13 },
  { usfm: "JAS", name: "Jakobsbrevet", short: "Jak", chapters: 5 },
  { usfm: "1PE", name: "Första Petrusbrevet", short: "1 Pet", chapters: 5 },
  { usfm: "2PE", name: "Andra Petrusbrevet", short: "2 Pet", chapters: 3 },
  { usfm: "1JN", name: "Första Johannesbrevet", short: "1 Joh", chapters: 5 },
  { usfm: "2JN", name: "Andra Johannesbrevet", short: "2 Joh", chapters: 1 },
  { usfm: "3JN", name: "Tredje Johannesbrevet", short: "3 Joh", chapters: 1 },
  { usfm: "JUD", name: "Judasbrevet", short: "Jud", chapters: 1 },
  { usfm: "REV", name: "Uppenbarelseboken", short: "Upp", chapters: 22 },
];

export interface Translation {
  id: number;
  abbr: string;
  name: string;
}

// Översättningarnas id-nummer på bible.com. Den första är förvald.
export const TRANSLATIONS: Translation[] = [
  { id: 1223, abbr: "SFB15", name: "Svenska Folkbibeln 2015" },
  { id: 154, abbr: "B2000", name: "Bibel 2000" },
];

export interface PresetVerse {
  usfm: string;
  chapter: number;
  from: number;
  to?: number;
  theme: string;
}

// 50 välkända bibelord. Bara referenser: texten hämtas av användaren från bible.com,
// eftersom de moderna svenska översättningarna är upphovsrättsskyddade.
export const PRESETS: PresetVerse[] = [
  { usfm: "JHN", chapter: 3, from: 16, theme: "Så älskade Gud världen" },
  { usfm: "PSA", chapter: 23, from: 1, theme: "Herren är min herde" },
  { usfm: "JER", chapter: 29, from: 11, theme: "Framtid och hopp" },
  { usfm: "PRO", chapter: 3, from: 5, to: 6, theme: "Förtrösta på Herren" },
  { usfm: "ISA", chapter: 41, from: 10, theme: "Var inte rädd" },
  { usfm: "MAT", chapter: 11, from: 28, theme: "Kom till mig" },
  { usfm: "ROM", chapter: 8, from: 28, theme: "Allt samverkar till det bästa" },
  { usfm: "PHP", chapter: 4, from: 13, theme: "Kraft i Kristus" },
  { usfm: "PHP", chapter: 4, from: 6, to: 7, theme: "Bekymra er inte" },
  { usfm: "JOS", chapter: 1, from: 9, theme: "Var stark och modig" },
  { usfm: "JHN", chapter: 14, from: 6, theme: "Vägen, sanningen och livet" },
  { usfm: "MAT", chapter: 28, from: 19, to: 20, theme: "Missionsbefallningen" },
  { usfm: "MAT", chapter: 6, from: 33, theme: "Sök först Guds rike" },
  { usfm: "MAT", chapter: 6, from: 9, to: 13, theme: "Herrens bön" },
  { usfm: "MAT", chapter: 22, from: 37, to: 39, theme: "Det största budet" },
  { usfm: "MAT", chapter: 5, from: 14, to: 16, theme: "Världens ljus" },
  { usfm: "JHN", chapter: 1, from: 1, theme: "I begynnelsen var Ordet" },
  { usfm: "JHN", chapter: 8, from: 32, theme: "Sanningen gör er fria" },
  { usfm: "JHN", chapter: 10, from: 10, theme: "Liv i överflöd" },
  { usfm: "JHN", chapter: 11, from: 25, theme: "Uppståndelsen och livet" },
  { usfm: "JHN", chapter: 13, from: 34, to: 35, theme: "Ett nytt bud" },
  { usfm: "ROM", chapter: 3, from: 23, theme: "Alla har syndat" },
  { usfm: "ROM", chapter: 5, from: 8, theme: "Kristus dog för oss" },
  { usfm: "ROM", chapter: 6, from: 23, theme: "Guds gåva är evigt liv" },
  { usfm: "ROM", chapter: 8, from: 38, to: 39, theme: "Ingenting kan skilja oss" },
  { usfm: "ROM", chapter: 10, from: 9, theme: "Bekänn och tro" },
  { usfm: "ROM", chapter: 12, from: 2, theme: "Ett förnyat sinne" },
  { usfm: "ROM", chapter: 15, from: 13, theme: "Hoppets Gud" },
  { usfm: "1CO", chapter: 13, from: 4, to: 7, theme: "Kärleken är tålmodig" },
  { usfm: "2CO", chapter: 5, from: 17, theme: "En ny skapelse" },
  { usfm: "GAL", chapter: 2, from: 20, theme: "Kristus lever i mig" },
  { usfm: "GAL", chapter: 5, from: 22, to: 23, theme: "Andens frukt" },
  { usfm: "EPH", chapter: 2, from: 8, to: 9, theme: "Frälsta av nåd" },
  { usfm: "HEB", chapter: 11, from: 1, theme: "Vad tro är" },
  { usfm: "HEB", chapter: 13, from: 8, theme: "Densamme i går, i dag och i evighet" },
  { usfm: "HEB", chapter: 4, from: 12, theme: "Guds ord är levande" },
  { usfm: "2TI", chapter: 3, from: 16, theme: "Hela Skriften är utandad av Gud" },
  { usfm: "JAS", chapter: 1, from: 5, theme: "Be om vishet" },
  { usfm: "1PE", chapter: 5, from: 7, theme: "Kasta era bekymmer på honom" },
  { usfm: "1JN", chapter: 1, from: 9, theme: "Han förlåter" },
  { usfm: "GEN", chapter: 1, from: 1, theme: "I begynnelsen skapade Gud" },
  { usfm: "NUM", chapter: 6, from: 24, to: 26, theme: "Herren välsigne dig" },
  { usfm: "PSA", chapter: 27, from: 1, theme: "Herren är mitt ljus" },
  { usfm: "PSA", chapter: 37, from: 4, theme: "Ha din glädje i Herren" },
  { usfm: "PSA", chapter: 119, from: 105, theme: "En lykta för min fot" },
  { usfm: "PSA", chapter: 121, from: 1, to: 2, theme: "Min hjälp kommer från Herren" },
  { usfm: "PSA", chapter: 139, from: 14, theme: "Underbart skapad" },
  { usfm: "ISA", chapter: 40, from: 31, theme: "Nya krafter" },
  { usfm: "LAM", chapter: 3, from: 22, to: 23, theme: "Ny varje morgon" },
  { usfm: "MIC", chapter: 6, from: 8, theme: "Vad Herren begär av dig" },
];

export interface SavedVerse {
  id: string;
  ref: string;
  text: string;
  translation?: string;
  addedAt: number;
}

export const BIBELVERS_KEY = "centrumkyrkan-bibelvers-v1";

export function formatRef(book: BibleBook, chapter: number, verseFrom: number, verseTo?: number): string {
  const verses = verseTo && verseTo > verseFrom ? `${verseFrom}–${verseTo}` : `${verseFrom}`;
  return `${book.short} ${chapter}:${verses}`;
}

// Byter ut en förkortning i början av referensen mot hela boknamnet, t.ex.
// "Joh 3:16" -> "Johannesevangeliet 3:16". Fungerar även för egeninskrivna referenser.
const SHORTS_LONGEST_FIRST = BOOKS.slice().sort((a, b) => b.short.length - a.short.length);

export function expandRef(ref: string): string {
  const trimmed = ref.trim();
  for (const book of SHORTS_LONGEST_FIRST) {
    const prefix = trimmed.slice(0, book.short.length);
    const rest = trimmed.slice(book.short.length);
    if (prefix.toLowerCase() === book.short.toLowerCase() && /^\.?\s*\d/.test(rest)) {
      return `${book.name} ${rest.replace(/^\.?\s*/, "")}`;
    }
  }
  return trimmed;
}

export function bibleComUrl(book: BibleBook, chapter: number, translation: Translation, verseFrom?: number, verseTo?: number): string {
  let passage = `${book.usfm}.${chapter}`;
  if (verseFrom) passage += `.${verseFrom}${verseTo && verseTo > verseFrom ? `-${verseTo}` : ""}`;
  return `https://www.bible.com/bible/${translation.id}/${passage}.${translation.abbr}`;
}

export const LEAD_WORDS = 3;

export function leadWords(text: string): { lead: string; hasMore: boolean } {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return { lead: words.slice(0, LEAD_WORDS).join(" "), hasMore: words.length > LEAD_WORDS };
}

export function shuffle<T>(items: T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
