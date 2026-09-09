const SECTION_KEYS: Record<string, string> = {
  gudstjanst: "gudstjänst söndag predikan lovsång nattvard tider",
  kalender: "kalender händelser program datum vad händer",
  bonuppmaning: "bön bönestafett böneämnen fasta morgonbön lunchbön böneskola",
  vagen: "nästa steg dop medlem medlemskap alpha smågrupp växa engagera",
  barn: "barn ungdom biblia söndagsskola cungarna tonår familj",
  "om-oss": "om oss stab pastor personal ledning historia tro vision styrelse",
  media: "media podcast predikan lyssna spotify apple poddar",
  kontakt: "kontakt hitta hit adress mejl telefon ge gåva swish besök",
};

const EXCLUDED_IDS = new Set(["hero", "hero-mobile"]);

export interface SearchIndexEntry {
  title: string;
  sub: string;
  href: string;
  text: string;
  keys: string;
}

export interface SearchHit {
  entry: SearchIndexEntry;
  snippet: string;
}

function norm(s: string): string {
  return (s || "").toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o");
}

// Scans the already-rendered page for section[id] elements to build a search index,
// mirroring the legacy site's client-side index (minus the 3 external tool pages,
// which are out of scope for this port).
export function buildSearchIndex(): SearchIndexEntry[] {
  const index: SearchIndexEntry[] = [];
  document.querySelectorAll<HTMLElement>("section[id]").forEach((sec) => {
    const id = sec.id;
    if (EXCLUDED_IDS.has(id)) return;
    if (sec.offsetParent === null && getComputedStyle(sec).display === "none") return;

    const heading = sec.querySelector("h2, h1");
    const label = sec.querySelector("p");
    const rawTitle = heading?.textContent?.trim() || label?.textContent?.trim() || id;

    index.push({
      title: rawTitle.length > 70 ? `${rawTitle.slice(0, 70)}…` : rawTitle,
      sub: "På hemsidan",
      href: `#${id}`,
      text: (sec.textContent || "").replace(/\s+/g, " ").trim(),
      keys: SECTION_KEYS[id] || "",
    });
  });
  return index;
}

export function runSearch(query: string, index: SearchIndexEntry[]): SearchHit[] {
  const q = norm(query.trim());
  if (q.length < 2) return [];
  const words = q.split(/\s+/);

  const hits = index
    .map((entry) => {
      const t = norm(entry.title);
      const k = norm(entry.keys);
      const b = norm(entry.text);
      let score = 0;
      let snippet = "";
      words.forEach((w) => {
        if (t.includes(w)) score += 12;
        if (k.includes(w)) score += 7;
        const at = b.indexOf(w);
        if (at !== -1) {
          score += 3;
          if (!snippet) snippet = entry.text.slice(Math.max(0, at - 60), at + 110).trim();
        }
      });
      return { entry, score, snippet };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score);

  return hits.slice(0, 8).map((h) => ({ entry: h.entry, snippet: h.snippet }));
}
