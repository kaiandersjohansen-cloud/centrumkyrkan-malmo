"use client";

import { useEffect, useState, type CSSProperties } from "react";
import ToolPageHeader from "@/components/tool-pages/ToolPageHeader";
import { BASE_CARDS, PALETTE, SAMTALSKORT_DONE_KEY, SAMTALSKORT_OWN_KEY, type SamtalskortBase } from "@/lib/samtalskort";

function pad(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

const pillBtn: CSSProperties = {
  padding: "13px 26px",
  border: "none",
  borderRadius: 100,
  fontWeight: 500,
  fontSize: 15,
  cursor: "pointer",
  fontFamily: "var(--font-public-sans), sans-serif",
};

export default function Samtalskort() {
  const [i, setI] = useState(0);
  const [showHow, setShowHow] = useState(false);
  const [own, setOwn] = useState<SamtalskortBase[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [ownTitle, setOwnTitle] = useState("");
  const [ownRef, setOwnRef] = useState("");
  const [ownPractice, setOwnPractice] = useState("");
  const [ownTalk, setOwnTalk] = useState("");
  const [ownMsg, setOwnMsg] = useState("");

  // localStorage only exists client-side; state must hydrate after mount
  // (an effect, not a lazy useState initializer) to avoid an SSR/hydration mismatch.
  useEffect(() => {
    let nextOwn: SamtalskortBase[] = [];
    let nextDone: number[] = [];
    try {
      nextOwn = JSON.parse(localStorage.getItem(SAMTALSKORT_OWN_KEY) ?? "[]") || [];
    } catch {}
    try {
      nextDone = JSON.parse(localStorage.getItem(SAMTALSKORT_DONE_KEY) ?? "[]") || [];
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    setOwn(nextOwn);
    setDone(nextDone);
  }, []);

  const cards = BASE_CARDS.concat(own);
  const index = Math.min(i, cards.length - 1);
  const card = cards[index] ?? BASE_CARDS[0];
  const isDone = done.includes(index);
  const pal = PALETTE[index % PALETTE.length];
  const canDelete = index >= BASE_CARDS.length;

  function drawRandom() {
    if (cards.length <= 1) return;
    let n = index;
    while (n === index) n = Math.floor(Math.random() * cards.length);
    setI(n);
  }

  function toggleDone() {
    const next = isDone ? done.filter((d) => d !== index) : done.concat([index]);
    localStorage.setItem(SAMTALSKORT_DONE_KEY, JSON.stringify(next));
    setDone(next);
  }

  function deleteOwn() {
    const ownIdx = index - BASE_CARDS.length;
    if (ownIdx < 0) return;
    if (!confirm(`Radera kortet "${card.title}"?`)) return;
    const nextOwn = own.slice();
    nextOwn.splice(ownIdx, 1);
    const nextDone = done.filter((d) => d !== index).map((d) => (d > index ? d - 1 : d));
    localStorage.setItem(SAMTALSKORT_OWN_KEY, JSON.stringify(nextOwn));
    localStorage.setItem(SAMTALSKORT_DONE_KEY, JSON.stringify(nextDone));
    setOwn(nextOwn);
    setDone(nextDone);
    setI(Math.max(0, index - 1));
    setOwnMsg("Kortet är raderat.");
  }

  function saveOwn() {
    if (!ownTitle.trim()) {
      setOwnMsg("Ge kortet en rubrik först.");
      return;
    }
    const newCard: SamtalskortBase = {
      title: ownTitle.trim(),
      ref: ownRef.trim() || "Eget kort",
      verse: "",
      practiceName: "Eget",
      practice: ownPractice.trim(),
      talk: ownTalk.trim(),
    };
    const nextOwn = own.concat([newCard]);
    localStorage.setItem(SAMTALSKORT_OWN_KEY, JSON.stringify(nextOwn));
    setOwn(nextOwn);
    setOwnTitle("");
    setOwnRef("");
    setOwnPractice("");
    setOwnTalk("");
    setOwnMsg(`Kortet är tillagt som nr ${pad(BASE_CARDS.length + nextOwn.length)}.`);
    setI(BASE_CARDS.length + nextOwn.length - 1);
  }

  return (
    <div style={{ fontFamily: "var(--font-public-sans), sans-serif", background: "oklch(98.5% 0.006 90)", color: "oklch(20% 0.015 50)", lineHeight: 1.6, minHeight: "100vh" }}>
      <ToolPageHeader />

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "56px 28px 96px" }}>
        <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "oklch(50% 0.06 145)", margin: "0 0 16px", textAlign: "center" }}>
          Samtalskort för matbordet
        </p>
        <h1 style={{ fontFamily: "var(--font-lora), serif", fontSize: 34, fontWeight: 500, textAlign: "center", margin: "0 0 16px" }}>
          Samtalskort för barnfamiljer
        </h1>
        <p style={{ fontSize: 16.5, color: "oklch(42% 0.015 50)", textAlign: "center", margin: "0 0 44px" }}>
          Tio kort med bibelord, en praktik och en samtalsfråga.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <button type="button" onClick={drawRandom} className="btn-solid-green" style={{ ...pillBtn, background: "oklch(50% 0.06 145)", color: "oklch(98.5% 0.006 90)" }}>
            Dra ett kort
          </button>
          <button
            type="button"
            onClick={() => setShowHow((v) => !v)}
            style={{ ...pillBtn, background: "oklch(94% 0.045 90)", color: "oklch(45% 0.1 85)", border: "1px solid oklch(87% 0.06 88)" }}
          >
            Så använder ni korten
          </button>
          <a
            href="/samtalskort.pdf"
            download="Samtalskort-for-barnfamiljer.pdf"
            style={{ ...pillBtn, display: "inline-block", background: "oklch(94% 0.04 45)", color: "oklch(50% 0.13 45)", border: "1px solid oklch(87% 0.06 45)" }}
          >
            Ladda ner som PDF
          </a>
        </div>

        {showHow && (
          <div style={{ background: "oklch(94% 0.045 90)", border: "1px solid oklch(87% 0.06 88)", borderRadius: 8, padding: 32, marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 22, fontWeight: 500, margin: "0 0 16px", color: "oklch(45% 0.1 85)" }}>
              Så använder ni korten
            </h2>
            <p style={{ margin: "0 0 14px", fontSize: 16, color: "oklch(30% 0.015 50)" }}>
              Ta ett kort vid matbordet — ett i veckan räcker gott. Läs bibelordet högt, gör praktiken tillsammans och avsluta med samtalsfrågan.
            </p>
            <p style={{ margin: "0 0 20px", fontSize: 16, color: "oklch(30% 0.015 50)" }}>
              Låt barnen svara fritt, utan rätt eller fel. Är någon för liten för att delta – låt dem lyssna medan de andra samtalar.
            </p>
            <div style={{ paddingTop: 18, borderTop: "1px solid oklch(87% 0.06 88)" }}>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "oklch(45% 0.1 85)", margin: "0 0 8px" }}>
                Tips
              </p>
              <p style={{ margin: 0, fontStyle: "italic", fontSize: 16, color: "oklch(30% 0.015 50)" }}>
                Skriv ut korten och lägg dem i en burk mitt på bordet – låt någon dra ett.
              </p>
            </div>
          </div>
        )}

        <div
          style={{
            background: "oklch(99.5% 0.003 90)",
            border: `1px solid ${pal.line}`,
            borderTop: `5px solid ${pal.ink}`,
            borderRadius: 8,
            padding: 40,
            minHeight: 420,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 28 }}>
            <p
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: ".06em",
                margin: 0,
                background: pal.soft,
                color: pal.ink,
                padding: "4px 14px",
                borderRadius: 100,
              }}
            >
              {pad(index + 1)}
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "oklch(68% 0.01 80)", margin: 0 }}>
              Samtalskort
            </p>
          </div>

          <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 32, fontWeight: 400, margin: "0 0 28px", lineHeight: 1.2, textWrap: "pretty", color: pal.ink }}>
            {card.title}
          </h2>

          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 10px", color: pal.ink }}>
            Bibelord · {card.ref}
          </p>
          <p style={{ fontStyle: "italic", fontSize: 17, color: "oklch(30% 0.015 50)", margin: "0 0 28px", textWrap: "pretty" }}>{card.verse}</p>

          <div style={{ paddingTop: 24, borderTop: `1px solid ${pal.line}` }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 10px", color: pal.ink }}>
              Praktik · {card.practiceName}
            </p>
            <p style={{ fontSize: 17, color: "oklch(30% 0.015 50)", margin: "0 0 28px", textWrap: "pretty" }}>{card.practice}</p>
          </div>

          <div style={{ marginTop: "auto", padding: "22px 24px", borderRadius: 8, background: pal.soft }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 10px", color: pal.ink }}>
              Samtal
            </p>
            <p style={{ fontStyle: "italic", fontSize: 17, color: "oklch(28% 0.015 50)", margin: 0, textWrap: "pretty" }}>{card.talk}</p>
          </div>
        </div>

        <div className="kort-nav" style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
          <button
            type="button"
            onClick={() => setI((index - 1 + cards.length) % cards.length)}
            className="underline-link"
            style={{
              padding: "12px 24px",
              background: "none",
              border: "1px solid oklch(85% 0.008 80)",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              color: "oklch(30% 0.015 50)",
              fontFamily: "var(--font-public-sans), sans-serif",
            }}
          >
            ← Föregående
          </button>
          <button
            type="button"
            onClick={toggleDone}
            style={{
              padding: "12px 24px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-public-sans), sans-serif",
              background: isDone ? pal.ink : pal.soft,
              border: `1px solid ${isDone ? pal.ink : pal.line}`,
              color: isDone ? "oklch(98.5% 0.006 90)" : pal.ink,
            }}
          >
            {isDone ? "✓ Gjort" : "Markera som gjort"}
          </button>
          <button
            type="button"
            onClick={() => setI((index + 1) % cards.length)}
            style={{
              padding: "12px 24px",
              background: "none",
              border: "1px solid oklch(85% 0.008 80)",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              color: "oklch(30% 0.015 50)",
              fontFamily: "var(--font-public-sans), sans-serif",
            }}
          >
            Nästa →
          </button>
        </div>

        {canDelete && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <button
              type="button"
              onClick={deleteOwn}
              style={{
                padding: "10px 22px",
                background: "none",
                border: "1px solid oklch(80% 0.05 30)",
                borderRadius: 100,
                fontSize: 14.5,
                fontWeight: 500,
                cursor: "pointer",
                color: "oklch(50% 0.13 30)",
                fontFamily: "var(--font-public-sans), sans-serif",
              }}
            >
              Radera det här kortet
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
          {cards.map((_, idx) => {
            const active = idx === index;
            const isDoneDot = done.includes(idx);
            const p = PALETTE[idx % PALETTE.length];
            let bg: string = p.soft;
            let border = `1px solid ${p.line}`;
            let color: string = p.ink;
            if (isDoneDot) {
              bg = p.soft;
              border = `1px solid ${p.ink}`;
              color = p.ink;
            }
            if (active) {
              bg = p.ink;
              border = `1px solid ${p.ink}`;
              color = "oklch(98.5% 0.006 90)";
            }
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Kort ${pad(idx + 1)}`}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "var(--font-public-sans), sans-serif",
                  background: bg,
                  border,
                  color,
                }}
              >
                {pad(idx + 1)}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 64, background: "oklch(94% 0.03 230)", border: "1px solid oklch(87% 0.045 230)", borderRadius: 8, padding: 36 }}>
          <h2 style={{ fontFamily: "var(--font-lora), serif", fontSize: 24, fontWeight: 500, margin: "0 0 8px", color: "oklch(44% 0.09 230)" }}>
            Skriv ert eget kort
          </h2>
          <p style={{ fontSize: 15.5, color: "oklch(42% 0.015 50)", margin: "0 0 24px" }}>
            Har ni ett bibelord eller en vana som betyder något i just er familj? Gör ett eget kort — det sparas i den här webbläsaren.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="text"
              value={ownTitle}
              onChange={(e) => setOwnTitle(e.target.value)}
              placeholder="Rubrik, t.ex. Tacksamhet"
              style={inputStyle}
            />
            <input
              type="text"
              value={ownRef}
              onChange={(e) => setOwnRef(e.target.value)}
              placeholder="Bibelord, t.ex. Ps 100:4"
              style={inputStyle}
            />
            <textarea
              value={ownPractice}
              onChange={(e) => setOwnPractice(e.target.value)}
              rows={2}
              placeholder="Praktik – vad gör ni tillsammans?"
              style={{ ...inputStyle, resize: "vertical" }}
            />
            <textarea
              value={ownTalk}
              onChange={(e) => setOwnTalk(e.target.value)}
              rows={2}
              placeholder="Samtalsfråga"
              style={{ ...inputStyle, resize: "vertical" }}
            />
            <button
              type="button"
              onClick={saveOwn}
              style={{
                alignSelf: "flex-start",
                padding: "12px 26px",
                background: "oklch(44% 0.09 230)",
                color: "oklch(98.5% 0.006 90)",
                border: "none",
                borderRadius: 100,
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "var(--font-public-sans), sans-serif",
              }}
            >
              Lägg till kortet
            </button>
          </div>
          {ownMsg && (
            <p style={{ margin: "16px 0 0", fontSize: 14.5, fontWeight: 500, color: "oklch(40% 0.09 230)" }}>{ownMsg}</p>
          )}
        </div>
      </main>
    </div>
  );
}

const inputStyle: CSSProperties = {
  padding: "12px 16px",
  border: "1px solid oklch(89% 0.008 80)",
  borderRadius: 8,
  fontSize: 15.5,
  fontFamily: "var(--font-public-sans), sans-serif",
  background: "white",
  color: "oklch(20% 0.015 50)",
  boxSizing: "border-box",
};
