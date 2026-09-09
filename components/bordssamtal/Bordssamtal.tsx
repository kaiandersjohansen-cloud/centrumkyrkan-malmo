"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import ToolPageHeader from "@/components/tool-pages/ToolPageHeader";
import { getQuestionPool, shuffle, type QuestionCategory } from "@/lib/bordssamtal";

const OLIVE = "oklch(50% 0.06 145)";
const CREAM = "oklch(98.5% 0.006 90)";
const BORDER = "oklch(89% 0.008 80)";
const MUTED = "oklch(42% 0.015 50)";
const INK = "oklch(20% 0.015 50)";

interface Participant {
  id: number;
  name: string;
}

function pillStyle(active: boolean): CSSProperties {
  return active
    ? { cursor: "pointer", border: `1px solid ${OLIVE}`, background: OLIVE, color: CREAM, padding: "11px 22px", borderRadius: 100, fontSize: 15, fontWeight: 500, fontFamily: "var(--font-public-sans), sans-serif" }
    : { cursor: "pointer", border: `1px solid ${BORDER}`, background: "transparent", color: INK, padding: "11px 22px", borderRadius: 100, fontSize: 15, fontWeight: 500, fontFamily: "var(--font-public-sans), sans-serif" };
}

function drawQuestion(pool: string[], usedIdx: number[]): number | null {
  const available: number[] = [];
  for (let i = 0; i < pool.length; i++) if (!usedIdx.includes(i)) available.push(i);
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

export default function Bordssamtal() {
  const [screen, setScreen] = useState<"setup" | "play">("setup");
  const [category, setCategory] = useState<QuestionCategory>("mix");
  const [nameInput, setNameInput] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [nextId, setNextId] = useState(1);
  const [turnOrder, setTurnOrder] = useState<number[]>([]);
  const [turnPos, setTurnPos] = useState(0);
  const [usedIdx, setUsedIdx] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [currentPersonId, setCurrentPersonId] = useState<number | null>(null);
  const [poolExhausted, setPoolExhausted] = useState(false);

  const pool = getQuestionPool(category);
  const startDisabled = participants.length < 2;
  const remaining = pool.length - usedIdx.length;
  const currentPerson = participants.find((p) => p.id === currentPersonId);

  function addName() {
    const name = nameInput.trim();
    if (!name) return;
    setParticipants((p) => p.concat([{ id: nextId, name }]));
    setNextId((n) => n + 1);
    setNameInput("");
  }

  function onNameKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addName();
    }
  }

  function removeName(id: number) {
    setParticipants((p) => p.filter((x) => x.id !== id));
  }

  function start() {
    if (participants.length < 2) return;
    const order = shuffle(participants.map((p) => p.id));
    const idx = drawQuestion(pool, []);
    setScreen("play");
    setTurnOrder(order);
    setTurnPos(0);
    setUsedIdx(idx === null ? [] : [idx]);
    setCurrentIdx(idx);
    setCurrentPersonId(order[0]);
    setPoolExhausted(idx === null);
  }

  function nextTurn() {
    const idx = drawQuestion(pool, usedIdx);
    const nextPos = (turnPos + 1) % turnOrder.length;
    setTurnPos(nextPos);
    setUsedIdx((u) => (idx === null ? u : u.concat([idx])));
    setCurrentIdx(idx);
    setCurrentPersonId(turnOrder[nextPos]);
    setPoolExhausted(idx === null);
  }

  function end() {
    setScreen("setup");
    setTurnOrder([]);
    setTurnPos(0);
    setUsedIdx([]);
    setCurrentIdx(null);
    setCurrentPersonId(null);
    setPoolExhausted(false);
  }

  const hasQuestion = !poolExhausted && currentIdx !== null;
  const startBtnStyle: CSSProperties = startDisabled
    ? { width: "100%", padding: 15, background: BORDER, color: "oklch(60% 0.01 80)", border: "none", borderRadius: 100, fontWeight: 600, fontSize: 16, cursor: "not-allowed", fontFamily: "var(--font-public-sans), sans-serif" }
    : { width: "100%", padding: 15, background: OLIVE, color: CREAM, border: "none", borderRadius: 100, fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "var(--font-public-sans), sans-serif" };
  const nextBtnStyle: CSSProperties = poolExhausted
    ? { padding: "14px 28px", background: BORDER, color: "oklch(60% 0.01 80)", border: "none", borderRadius: 100, fontWeight: 600, fontSize: 15, cursor: "not-allowed", fontFamily: "var(--font-public-sans), sans-serif" }
    : { padding: "14px 28px", background: OLIVE, color: CREAM, border: "none", borderRadius: 100, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "var(--font-public-sans), sans-serif" };

  return (
    <div style={{ fontFamily: "var(--font-public-sans), sans-serif", background: CREAM, color: INK, lineHeight: 1.6, minHeight: "100vh" }}>
      <ToolPageHeader />

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "56px 28px 96px" }}>
        <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: OLIVE, margin: "0 0 16px", textAlign: "center" }}>
          Digitalt samtalsverktyg
        </p>
        <h1 style={{ fontFamily: "var(--font-lora), serif", fontSize: 34, fontWeight: 500, textAlign: "center", margin: "0 0 16px" }}>Bordssamtal</h1>
        <p style={{ fontSize: 16.5, color: MUTED, textAlign: "center", margin: "0 0 48px" }}>
          Frågor för att lära känna varandra bättre
          <br />
          <span style={{ fontSize: 13 }}>(utvecklad av Practicing The Way)</span>
        </p>

        {screen === "setup" && (
          <div style={{ background: "oklch(99.5% 0.003 90)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 40 }}>
            <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 18, fontWeight: 500, margin: "0 0 16px" }}>Välj frågetyp</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
              <button type="button" onClick={() => setCategory("start")} style={pillStyle(category === "start")}>
                Starta smått
              </button>
              <button type="button" onClick={() => setCategory("deep")} style={pillStyle(category === "deep")}>
                Gå djupare
              </button>
              <button type="button" onClick={() => setCategory("mix")} style={pillStyle(category === "mix")}>
                Blandat
              </button>
            </div>

            <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 18, fontWeight: 500, margin: "0 0 16px" }}>Deltagare</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={onNameKeyDown}
                placeholder="Skriv ett namn"
                style={{ flex: 1, minWidth: 0, padding: "12px 16px", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 15.5, fontFamily: "var(--font-public-sans), sans-serif", background: "white", color: INK, boxSizing: "border-box" }}
              />
              <button
                type="button"
                onClick={addName}
                style={{ padding: "12px 22px", background: OLIVE, color: CREAM, border: "none", borderRadius: 100, fontWeight: 500, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Lägg till
              </button>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
              {participants.map((p) => (
                <span
                  key={p.id}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "oklch(96.5% 0.01 95)", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "8px 8px 8px 16px", fontSize: 15 }}
                >
                  {p.name}
                  <button
                    type="button"
                    onClick={() => removeName(p.id)}
                    aria-label="Ta bort"
                    style={{ border: "none", background: "none", color: MUTED, cursor: "pointer", fontSize: 14, width: 22, height: 22, borderRadius: "50%", lineHeight: "22px" }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <button type="button" onClick={start} disabled={startDisabled} style={startBtnStyle}>
              Starta samtalet
            </button>
            {startDisabled && <p style={{ margin: "14px 0 0", fontSize: 14, color: "oklch(50% 0.015 50)" }}>Lägg till minst 2 deltagare för att starta.</p>}
          </div>
        )}

        {screen === "play" && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
              {participants.map((p) => (
                <span
                  key={p.id}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 100,
                    fontSize: 14,
                    fontWeight: 500,
                    background: p.id === currentPersonId ? OLIVE : "oklch(96.5% 0.01 95)",
                    color: p.id === currentPersonId ? CREAM : MUTED,
                    border: p.id === currentPersonId ? "none" : `1px solid ${BORDER}`,
                  }}
                >
                  {p.name}
                </span>
              ))}
            </div>

            {poolExhausted && (
              <div style={{ background: OLIVE, color: CREAM, borderRadius: 8, padding: "48px 36px", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 20, margin: 0 }}>Alla frågor i denna kategori har använts!</p>
              </div>
            )}
            {hasQuestion && (
              <div style={{ background: OLIVE, color: CREAM, borderRadius: 8, padding: "48px 36px", textAlign: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 18px", opacity: 0.85 }}>
                  {currentPerson ? `${currentPerson.name}s tur` : ""}
                </p>
                <p style={{ fontFamily: "var(--font-lora), serif", fontSize: 24, lineHeight: 1.4, fontWeight: 500, margin: 0 }}>
                  {currentIdx !== null ? pool[currentIdx] : ""}
                </p>
              </div>
            )}

            <p style={{ textAlign: "center", color: MUTED, fontSize: 14.5, margin: "20px 0 32px" }}>
              {poolExhausted ? "Byt kategori eller avsluta samtalet." : `${remaining} av ${pool.length} frågor kvar i vald kategori.`}
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button type="button" onClick={nextTurn} disabled={poolExhausted} style={nextBtnStyle}>
                Nästa fråga →
              </button>
              <button
                type="button"
                onClick={end}
                className="underline-link"
                style={{ padding: "14px 28px", background: "none", border: `1px solid ${BORDER}`, borderRadius: 100, fontWeight: 500, fontSize: 15, cursor: "pointer", color: MUTED }}
              >
                Avsluta samtalet
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
