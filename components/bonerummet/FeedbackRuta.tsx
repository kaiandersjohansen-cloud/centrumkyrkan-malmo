"use client";

import { useState, type CSSProperties } from "react";
import { MAX_FEEDBACK, MAX_NAMN } from "@/lib/bonerummet";
import { C, SANS, SERIF } from "@/components/bonerummet/stil";

const falt: CSSProperties = {
  width: "100%",
  border: `1.5px solid ${C.linje}`,
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 15,
  fontFamily: SANS,
  color: C.text,
  background: "white",
  boxSizing: "border-box",
};

// En ruta där testarna kan skriva vad de tycker. Feedbacken sparas och läses
// under "Hantera väggen".
export default function FeedbackRuta({ onStang }: { onStang: () => void }) {
  const [text, setText] = useState("");
  const [namn, setNamn] = useState("");
  const [skickar, setSkickar] = useState(false);
  const [klar, setKlar] = useState(false);
  const [fel, setFel] = useState("");

  async function skicka() {
    if (!text.trim()) {
      setFel("Skriv något först.");
      return;
    }
    setSkickar(true);
    setFel("");
    try {
      const res = await fetch("/api/bonerummet/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, namn }),
      });
      if (res.ok) setKlar(true);
      else if (res.status === 429) setFel("Du har skickat mycket på kort tid. Vänta en stund och försök igen.");
      else setFel("Något gick fel. Försök igen.");
    } catch {
      setFel("Något gick fel. Kontrollera uppkopplingen och försök igen.");
    } finally {
      setSkickar(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-labelledby="feedback-rubrik"
      style={{ width: "100%", maxWidth: 520, background: C.kort, border: `1px solid ${C.linje}`, borderRadius: 14, padding: "20px 20px 18px", textAlign: "left", boxShadow: "0 8px 28px oklch(30% 0.02 50 / 0.12)", fontFamily: SANS, color: C.text }}
    >
      <h2 id="feedback-rubrik" style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        {klar ? "Tack för din feedback!" : "Ge feedback"}
      </h2>
      {klar ? (
        <>
          <p style={{ margin: "0 0 16px", fontSize: 14.5, color: C.dampad }}>Den hjälper oss att göra bönerummet bättre.</p>
          <button type="button" onClick={onStang} style={{ border: `1.5px solid ${C.linje}`, background: "white", borderRadius: 100, padding: "9px 18px", fontSize: 14, fontWeight: 600, fontFamily: SANS, cursor: "pointer", color: C.text }}>
            Stäng
          </button>
        </>
      ) : (
        <>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: C.dampad, lineHeight: 1.5 }}>
            Vad var lätt? Vad var krångligt eller fungerade inte? Saknar du något?
          </p>
          <label htmlFor="feedback-text" style={{ position: "absolute", left: -9999 }}>
            Din feedback
          </label>
          <textarea id="feedback-text" value={text} onChange={(e) => setText(e.target.value)} maxLength={MAX_FEEDBACK} rows={5} autoFocus style={{ ...falt, resize: "vertical", lineHeight: 1.5, marginBottom: 8 }} />
          <label htmlFor="feedback-namn" style={{ position: "absolute", left: -9999 }}>
            Namn (frivilligt)
          </label>
          <input id="feedback-namn" type="text" value={namn} onChange={(e) => setNamn(e.target.value)} maxLength={MAX_NAMN} placeholder="Ditt namn (frivilligt)" style={{ ...falt, marginBottom: 14 }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={skicka}
              disabled={skickar}
              className="btn-solid-green"
              style={{ background: C.gron, color: "oklch(98.5% 0.006 90)", border: "none", borderRadius: 100, padding: "10px 22px", fontSize: 14.5, fontWeight: 600, fontFamily: SANS, cursor: "pointer", opacity: skickar ? 0.6 : 1 }}
            >
              {skickar ? "Skickar …" : "Skicka"}
            </button>
            <button type="button" onClick={onStang} style={{ border: `1.5px solid ${C.linje}`, background: "white", borderRadius: 100, padding: "9px 18px", fontSize: 14, fontWeight: 600, fontFamily: SANS, cursor: "pointer", color: C.dampad }}>
              Avbryt
            </button>
          </div>
          {fel && (
            <p role="alert" style={{ margin: "12px 0 0", fontSize: 13.5, color: C.rod, fontWeight: 500 }}>
              {fel}
            </p>
          )}
        </>
      )}
    </div>
  );
}
