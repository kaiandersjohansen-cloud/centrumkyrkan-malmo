"use client";

import { useEffect, useState, type CSSProperties } from "react";
import ToolPageHeader from "@/components/tool-pages/ToolPageHeader";
import {
  BIBELVERS_KEY,
  BOOKS,
  TRANSLATIONS,
  bibleComUrl,
  formatRef,
  leadWords,
  shuffle,
  type SavedVerse,
} from "@/lib/bibelvers";

const GREEN = "oklch(50% 0.06 145)";
const INK = "oklch(20% 0.015 50)";
const MUTED = "oklch(42% 0.015 50)";
const LINE = "oklch(89% 0.008 80)";
const CREAM = "oklch(98.5% 0.006 90)";

const CSS = `
.vers-card { perspective: 1400px; cursor: pointer; }
.vers-card-inner {
  display: grid;
  transition: transform 0.6s cubic-bezier(.2,.7,.2,1);
  transform-style: preserve-3d;
}
.vers-card.flipped .vers-card-inner { transform: rotateY(180deg); }
.vers-face {
  grid-area: 1 / 1;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.vers-back { transform: rotateY(180deg); }
.vers-card:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 4px; border-radius: 10px; }
@media (prefers-reduced-motion: reduce) { .vers-card-inner { transition: none; } }
.vers-print { display: none; }
@media (max-width: 640px) {
  .vers-pick { grid-template-columns: 1fr 1fr 1fr !important; }
  .vers-pick .vers-book { grid-column: 1 / -1; }
  .vers-face { padding: 32px 24px !important; }
  .vers-hide-sm { display: none; }
}
@media print {
  @page { margin: 14mm; }
  .vers-screen { display: none !important; }
  .vers-print { display: block !important; }
  body { background: white !important; }
}
`;

const pillBtn: CSSProperties = {
  padding: "12px 24px",
  borderRadius: 100,
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "var(--font-public-sans), sans-serif",
};

const outlineBtn: CSSProperties = {
  ...pillBtn,
  background: "none",
  border: "1px solid oklch(85% 0.008 80)",
  color: "oklch(30% 0.015 50)",
};

const solidBtn: CSSProperties = {
  ...pillBtn,
  background: GREEN,
  border: `1px solid ${GREEN}`,
  color: CREAM,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: `1px solid ${LINE}`,
  borderRadius: 8,
  fontSize: 15.5,
  fontFamily: "var(--font-public-sans), sans-serif",
  background: "white",
  color: INK,
  boxSizing: "border-box",
};

const labelStyle: CSSProperties = { display: "block", fontSize: 13.5, fontWeight: 600, color: MUTED, margin: "0 0 6px" };

const eyebrow: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: GREEN,
  margin: "0 0 14px",
};

function readSaved(): SavedVerse[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(BIBELVERS_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSaved(verses: SavedVerse[]) {
  try {
    localStorage.setItem(BIBELVERS_KEY, JSON.stringify(verses));
  } catch {}
}

function refWithTranslation(v: SavedVerse): string {
  return v.translation ? `${v.ref} (${v.translation})` : v.ref;
}

export default function Bibelvers() {
  const [verses, setVerses] = useState<SavedVerse[]>([]);
  const [random, setRandom] = useState(false);
  const [order, setOrder] = useState<string[]>([]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [bookIdx, setBookIdx] = useState(-1);
  const [chapter, setChapter] = useState(1);
  const [verseFrom, setVerseFrom] = useState("");
  const [verseTo, setVerseTo] = useState("");
  const [translationIdx, setTranslationIdx] = useState(0);
  const [ref, setRef] = useState("");
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  // localStorage only exists client-side; state must hydrate after mount
  // (an effect, not a lazy useState initializer) to avoid an SSR/hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    setVerses(readSaved());
  }, []);

  const ids = verses.map((v) => v.id);
  const sequence = random ? order.filter((id) => ids.includes(id)).concat(ids.filter((id) => !order.includes(id))) : ids;
  const current = sequence.length ? Math.min(pos, sequence.length - 1) : 0;
  const verse = verses.find((v) => v.id === sequence[current]);
  const book = bookIdx >= 0 ? BOOKS[bookIdx] : undefined;
  const translation = TRANSLATIONS[translationIdx];
  const from = parseInt(verseFrom, 10) || undefined;
  const to = parseInt(verseTo, 10) || undefined;

  function updateSelection(nextBookIdx: number, nextChapter: number, nextFrom: string, nextTo: string) {
    setBookIdx(nextBookIdx);
    setChapter(nextChapter);
    setVerseFrom(nextFrom);
    setVerseTo(nextTo);
    const b = BOOKS[nextBookIdx];
    const f = parseInt(nextFrom, 10);
    if (b && f > 0) setRef(formatRef(b, nextChapter, f, parseInt(nextTo, 10) || undefined));
  }

  function go(step: number) {
    if (!sequence.length) return;
    setFlipped(false);
    setPos((current + step + sequence.length) % sequence.length);
  }

  function setMode(nextRandom: boolean) {
    setRandom(nextRandom);
    if (nextRandom) setOrder(shuffle(ids));
    setPos(0);
    setFlipped(false);
  }

  function reshuffle() {
    setOrder(shuffle(ids));
    setPos(0);
    setFlipped(false);
  }

  function save() {
    if (!text.trim()) {
      setMsg("Klistra in eller skriv versens text först.");
      return;
    }
    if (!ref.trim()) {
      setMsg("Skriv vilken vers det är, t.ex. Joh 3:16.");
      return;
    }
    const newVerse: SavedVerse = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ref: ref.trim(),
      text: text.trim().replace(/\s+/g, " "),
      translation: book && from ? translation.abbr : undefined,
      addedAt: Date.now(),
    };
    const next = verses.concat([newVerse]);
    writeSaved(next);
    setVerses(next);
    setText("");
    setRef("");
    setVerseFrom("");
    setVerseTo("");
    setMsg(`${newVerse.ref} är sparad.`);
    setRandom(false);
    setPos(next.length - 1);
    setFlipped(false);
  }

  function remove(id: string) {
    const v = verses.find((x) => x.id === id);
    if (!v || !confirm(`Ta bort ${v.ref}?`)) return;
    const next = verses.filter((x) => x.id !== id);
    writeSaved(next);
    setVerses(next);
    setFlipped(false);
  }

  function show(id: string) {
    setRandom(false);
    setPos(ids.indexOf(id));
    setFlipped(false);
    document.getElementById("vers-kort")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const { lead, hasMore } = verse ? leadWords(verse.text) : { lead: "", hasMore: false };

  return (
    <div style={{ fontFamily: "var(--font-public-sans), sans-serif", background: CREAM, color: INK, lineHeight: 1.6, minHeight: "100vh" }}>
      <style>{CSS}</style>

      <div className="vers-screen">
        <ToolPageHeader />

        <main style={{ maxWidth: 680, margin: "0 auto", padding: "56px 28px 96px" }}>
          <p style={{ ...eyebrow, fontSize: 14, margin: "0 0 16px", textAlign: "center" }}>Bibelord att bära med sig</p>
          <h1 style={{ fontFamily: "var(--font-lora), serif", fontSize: 34, fontWeight: 500, textAlign: "center", margin: "0 0 16px" }}>
            Memorera bibelord
          </h1>
          <p style={{ fontSize: 16.5, color: MUTED, textAlign: "center", margin: "0 auto 44px", maxWidth: 520 }}>
            Spara de verser du vill lära dig utantill. Framsidan visar bara början, så får du försöka minnas resten innan du vänder kortet.
          </p>

          {verse ? (
            <>
              <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 20 }}>
                <div role="group" aria-label="Ordning" style={{ display: "inline-flex", border: `1px solid ${LINE}`, borderRadius: 100, padding: 3, background: "white" }}>
                  {[
                    { label: "Sparad ordning", value: false },
                    { label: "Slumpvis", value: true },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      aria-pressed={random === opt.value}
                      onClick={() => setMode(opt.value)}
                      style={{
                        ...pillBtn,
                        padding: "8px 16px",
                        fontSize: 14,
                        border: "none",
                        background: random === opt.value ? GREEN : "transparent",
                        color: random === opt.value ? CREAM : MUTED,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {random && (
                    <button type="button" onClick={reshuffle} className="underline-link" style={{ background: "none", border: "none", fontSize: 14, fontWeight: 500, color: GREEN, cursor: "pointer", padding: 0 }}>
                      Blanda igen
                    </button>
                  )}
                  <span style={{ fontSize: 14, color: MUTED }}>
                    {current + 1} av {sequence.length}
                  </span>
                </div>
              </div>

              <div
                id="vers-kort"
                className={`vers-card${flipped ? " flipped" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={flipped ? "Visa framsidan" : "Vänd kortet och visa hela versen"}
                onClick={() => setFlipped((f) => !f)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setFlipped((f) => !f);
                  } else if (e.key === "ArrowRight") go(1);
                  else if (e.key === "ArrowLeft") go(-1);
                }}
              >
                <div className="vers-card-inner">
                  <div
                    className="vers-face vers-front"
                    aria-hidden={flipped}
                    style={{ background: "white", border: `1px solid ${LINE}`, borderTop: `5px solid ${GREEN}`, borderRadius: 8, padding: "44px 40px", minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}
                  >
                    <p style={{ ...eyebrow, margin: "0 0 22px" }}>Framsida</p>
                    <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 36, fontWeight: 500, margin: "0 0 18px", lineHeight: 1.2 }}>{verse.ref}</h2>
                    <p style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic", fontSize: 21, color: MUTED, margin: 0 }}>
                      {lead}
                      {hasMore && " …"}
                    </p>
                    <p style={{ fontSize: 13.5, color: "oklch(60% 0.01 80)", margin: "32px 0 0" }}>Tryck på kortet för att vända det</p>
                  </div>
                  <div
                    className="vers-face vers-back"
                    aria-hidden={!flipped}
                    style={{ background: "oklch(96.5% 0.01 95)", border: `1px solid ${LINE}`, borderTop: `5px solid ${GREEN}`, borderRadius: 8, padding: "44px 40px", minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}
                  >
                    <p style={{ ...eyebrow, margin: "0 0 22px" }}>Baksida</p>
                    <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 21, lineHeight: 1.55, margin: "0 0 22px", textWrap: "pretty" }}>{verse.text}</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: GREEN, margin: 0 }}>{refWithTranslation(verse)}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                <button type="button" onClick={() => go(-1)} style={outlineBtn} aria-label="Föregående vers">
                  ←<span className="vers-hide-sm"> Föregående</span>
                </button>
                <button type="button" onClick={() => setFlipped((f) => !f)} style={solidBtn}>
                  Vänd kortet
                </button>
                <button type="button" onClick={() => go(1)} style={outlineBtn} aria-label="Nästa vers">
                  <span className="vers-hide-sm">Nästa </span>→
                </button>
              </div>
            </>
          ) : (
            <div style={{ border: `1px dashed oklch(80% 0.01 80)`, borderRadius: 8, padding: "44px 32px", textAlign: "center", background: "white" }}>
              <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>Inga verser än</h2>
              <p style={{ margin: 0, color: MUTED, fontSize: 15.5 }}>Lägg till din första vers nedan, så dyker den upp här som ett kort.</p>
            </div>
          )}

          <section style={{ marginTop: 56, background: "white", border: `1px solid ${LINE}`, borderRadius: 8, padding: 32 }}>
            <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 24, fontWeight: 500, margin: "0 0 8px" }}>Lägg till en vers</h2>
            <p style={{ fontSize: 15.5, color: MUTED, margin: "0 0 24px" }}>
              Välj vers och öppna den på bible.com. Kopiera texten där och klistra in den här. Du kan också skriva in en vers helt själv.
            </p>

            <div className="vers-pick" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div className="vers-book">
                <label style={labelStyle} htmlFor="vers-bok">Bok</label>
                <select id="vers-bok" value={bookIdx} onChange={(e) => updateSelection(Number(e.target.value), 1, verseFrom, verseTo)} style={inputStyle}>
                  <option value={-1}>Välj bok</option>
                  {BOOKS.map((b, idx) => (
                    <option key={b.usfm} value={idx}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle} htmlFor="vers-kapitel">Kapitel</label>
                <select id="vers-kapitel" value={chapter} disabled={!book} onChange={(e) => updateSelection(bookIdx, Number(e.target.value), verseFrom, verseTo)} style={inputStyle}>
                  {Array.from({ length: book?.chapters ?? 1 }, (_, n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle} htmlFor="vers-fran">Vers</label>
                <input id="vers-fran" type="number" inputMode="numeric" min={1} placeholder="nr" value={verseFrom} disabled={!book} onChange={(e) => updateSelection(bookIdx, chapter, e.target.value, verseTo)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="vers-till">Till vers</label>
                <input id="vers-till" type="number" inputMode="numeric" min={1} placeholder="nr" value={verseTo} disabled={!book} onChange={(e) => updateSelection(bookIdx, chapter, verseFrom, e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 24 }}>
              <div style={{ flex: "1 1 220px" }}>
                <label style={labelStyle} htmlFor="vers-oversattning">Översättning</label>
                <select id="vers-oversattning" value={translationIdx} onChange={(e) => setTranslationIdx(Number(e.target.value))} style={inputStyle}>
                  {TRANSLATIONS.map((t, idx) => (
                    <option key={t.abbr} value={idx}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <a
                href={book ? bibleComUrl(book, chapter, translation, from, to) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!book}
                onClick={(e) => {
                  if (!book) e.preventDefault();
                }}
                style={{ ...outlineBtn, display: "inline-block", opacity: book ? 1 : 0.45, cursor: book ? "pointer" : "not-allowed", borderColor: GREEN, color: GREEN }}
              >
                Öppna på bible.com ↗
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={labelStyle} htmlFor="vers-ref">Vilken vers?</label>
                <input id="vers-ref" type="text" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="t.ex. Joh 3:16" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="vers-text">Versens text</label>
                <textarea id="vers-text" value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Klistra in eller skriv versen här" style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <button type="button" onClick={save} style={{ ...solidBtn, alignSelf: "flex-start", marginTop: 4 }}>
                Spara versen
              </button>
            </div>
            {msg && <p style={{ margin: "16px 0 0", fontSize: 14.5, fontWeight: 500, color: GREEN }}>{msg}</p>}
          </section>

          {verses.length > 0 && (
            <section style={{ marginTop: 56 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 24, fontWeight: 500, margin: 0 }}>Mina verser ({verses.length})</h2>
                <button type="button" onClick={() => window.print()} style={{ ...outlineBtn, padding: "10px 20px", fontSize: 14.5 }}>
                  Skriv ut / spara som PDF
                </button>
              </div>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: `1px solid ${LINE}` }}>
                {verses.map((v, idx) => (
                  <li key={v.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: `1px solid ${LINE}` }}>
                    <span style={{ fontSize: 13, color: "oklch(60% 0.01 80)", width: 22, flex: "none" }}>{idx + 1}.</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 15.5 }}>{refWithTranslation(v)}</p>
                      <p style={{ margin: 0, fontSize: 14.5, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.text}</p>
                    </div>
                    <button type="button" onClick={() => show(v.id)} className="underline-link" style={{ background: "none", border: "none", fontSize: 14, fontWeight: 500, color: GREEN, cursor: "pointer", padding: 0 }}>
                      Visa
                    </button>
                    <button type="button" onClick={() => remove(v.id)} aria-label={`Ta bort ${v.ref}`} style={{ background: "none", border: "none", fontSize: 14, fontWeight: 500, color: "oklch(50% 0.13 30)", cursor: "pointer", padding: 0 }}>
                      Ta bort
                    </button>
                  </li>
                ))}
              </ol>
              <p style={{ fontSize: 13.5, color: MUTED, margin: "16px 0 0" }}>
                Verserna sparas bara i den här webbläsaren. Vill du ha dem på en annan enhet kan du spara dem som PDF.
              </p>
            </section>
          )}
        </main>
      </div>

      <div className="vers-print" style={{ fontFamily: "Arial, sans-serif", color: "black" }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>Mina bibelverser</h1>
        <p style={{ fontSize: 11, margin: "0 0 16px", color: "#555" }}>Centrumkyrkan Malmö · centrumkyrkanmalmo.se/bibelvers</p>
        {verses.map((v) => (
          <div key={v.id} style={{ border: "1px solid #ccc", borderRadius: 6, padding: "12px 14px", marginBottom: 10, breakInside: "avoid", lineHeight: 1.15 }}>
            <p style={{ fontSize: 12.5, fontWeight: 600, margin: "0 0 6px" }}>{refWithTranslation(v)}</p>
            <p style={{ fontSize: 12, margin: 0 }}>{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
