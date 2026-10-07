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

// Översättningarnas id-nummer på bible.com.
export const TRANSLATIONS: Translation[] = [
  { id: 154, abbr: "B2000", name: "Bibel 2000" },
  { id: 1223, abbr: "SFB15", name: "Svenska Folkbibeln 2015" },
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
