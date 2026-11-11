"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { LIVSLANGD_DAGAR, MAX_NAMN, MAX_TEXT, type Kategori } from "@/lib/bonerummet";
import FeedbackRuta from "@/components/bonerummet/FeedbackRuta";
import { C, SANS, SERIF } from "@/components/bonerummet/stil";

const falt: CSSProperties = {
  width: "100%",
  border: `1.5px solid ${C.linje}`,
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 16,
  fontFamily: SANS,
  color: C.text,
  background: "white",
  boxSizing: "border-box",
};

const knapp: CSSProperties = {
  width: "100%",
  padding: 14,
  borderRadius: 100,
  border: "none",
  fontSize: 15.5,
  fontWeight: 600,
  fontFamily: SANS,
  cursor: "pointer",
};

export default function Skicka() {
  const [kategori, setKategori] = useState<Kategori>("bon");
  const [text, setText] = useState("");
  const [namn, setNamn] = useState("");
  const [skickar, setSkickar] = useState(false);
  const [klar, setKlar] = useState(false);
  const [fel, setFel] = useState("");
  const [visaFeedback, setVisaFeedback] = useState(false);

  async function skicka() {
    if (!text.trim()) {
      setFel(kategori === "bon" ? "Skriv vad du vill att vi ber för." : "Skriv vad du är tacksam för.");
      return;
    }
    setSkickar(true);
    setFel("");
    try {
      const res = await fetch("/api/bonerummet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kategori, text, namn }),
      });
      if (res.ok) {
        setKlar(true);
        setText("");
      } else if (res.status === 429) {
        setFel("Du har skickat många inlägg på kort tid. Vänta en stund och försök igen.");
      } else if (res.status === 503) {
        setFel("Bönerummet är inte i gång just nu. Försök igen senare.");
      } else {
        setFel("Något gick fel. Försök igen.");
      }
    } catch {
      setFel("Något gick fel. Kontrollera uppkopplingen och försök igen.");
    } finally {
      setSkickar(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: SANS, color: C.text, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 18px" }}>
      <div style={{ width: "100%", maxWidth: 440, background: C.kort, border: `1px solid ${C.linje}`, borderRadius: 18, padding: "32px 24px 26px", textAlign: "center", boxShadow: "0 4px 18px oklch(30% 0.02 50 / 0.06)" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: C.gron, margin: "0 0 8px" }}>Centrumkyrkan Malmö</p>
        <h1 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 500, margin: "0 0 10px" }}>{klar ? "Tack." : "Bönerummet"}</h1>

        {klar ? (
          <>
            <p style={{ fontSize: 15.5, color: C.dampad, margin: "0 0 24px", lineHeight: 1.55 }}>Ditt inlägg finns nu på väggen. Vi bär det tillsammans.</p>
            <button type="button" onClick={() => setKlar(false)} style={{ ...knapp, background: "white", color: C.text, border: `1.5px solid ${C.linje}` }}>
              Lägg till ett till
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 15, color: C.dampad, margin: "0 0 22px", lineHeight: 1.55 }}>
              Dela ett böneämne eller en tacksägelse. Det dyker upp på väggen, så att vi kan bära det tillsammans.
            </p>

            <div role="group" aria-label="Typ av inlägg" style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {(
                [
                  { v: "bon", label: "Böneämne", farg: C.bla, ljus: C.blaLjus },
                  { v: "tack", label: "Tacksägelse", farg: C.guldText, ljus: C.guldLjus },
                ] as const
              ).map((o) => {
                const vald = kategori === o.v;
                return (
                  <button
                    key={o.v}
                    type="button"
                    aria-pressed={vald}
                    onClick={() => setKategori(o.v)}
                    style={{
                      flex: 1,
                      padding: "12px 8px",
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: SANS,
                      cursor: "pointer",
                      background: vald ? o.ljus : "white",
                      border: `1.5px solid ${vald ? o.farg : C.linje}`,
                      color: vald ? o.farg : C.dampad,
                    }}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>

            <label htmlFor="bon-text" style={{ position: "absolute", left: -9999 }}>
              {kategori === "bon" ? "Vad vill du att vi ber för?" : "Vad är du tacksam för?"}
            </label>
            <textarea
              id="bon-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX_TEXT}
              rows={4}
              placeholder={kategori === "bon" ? "Vad vill du att vi ber för?" : "Vad är du tacksam för?"}
              style={{ ...falt, resize: "none", lineHeight: 1.5, marginBottom: 4 }}
            />
            <p style={{ textAlign: "right", fontSize: 12, color: C.dampad, margin: "0 0 10px" }}>
              {text.length}/{MAX_TEXT}
            </p>
            <label htmlFor="bon-namn" style={{ position: "absolute", left: -9999 }}>
              Namn (frivilligt)
            </label>
            <input id="bon-namn" type="text" value={namn} onChange={(e) => setNamn(e.target.value)} maxLength={MAX_NAMN} placeholder="Ditt förnamn (frivilligt)" style={{ ...falt, marginBottom: 14 }} />

            <p style={{ fontSize: 13, color: C.dampad, margin: "0 0 18px", lineHeight: 1.5, textAlign: "left" }}>
              Inlägget syns för alla som ser väggen. Skriv inte andras fullständiga namn eller känsliga uppgifter. Inlägg raderas automatiskt efter {LIVSLANGD_DAGAR} dagar.
            </p>

            <button type="button" onClick={skicka} disabled={skickar} className="btn-solid-green" style={{ ...knapp, background: C.gron, color: "oklch(98.5% 0.006 90)", opacity: skickar ? 0.6 : 1 }}>
              {skickar ? "Skickar …" : "Lägg till i bönerummet"}
            </button>
            {fel && (
              <p role="alert" style={{ margin: "14px 0 0", fontSize: 14, color: C.rod, fontWeight: 500 }}>
                {fel}
              </p>
            )}
          </>
        )}

        <p style={{ margin: "20px 0 0", fontSize: 14 }}>
          <Link href="/bonerummet/vaggen" style={{ color: C.gron, fontWeight: 600 }}>
            Se väggen och be med →
          </Link>
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 13 }}>
          <button type="button" onClick={() => setVisaFeedback(true)} style={{ background: "none", border: "none", padding: 0, fontSize: 13, fontFamily: SANS, color: C.dampad, borderBottom: `1px solid ${C.linje}`, cursor: "pointer" }}>
            Ge feedback på bönerummet
          </button>
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 13 }}>
          <Link href="/" style={{ color: C.dampad, borderBottom: `1px solid ${C.linje}` }}>
            ← Till hemsidan
          </Link>
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 13 }}>
          <Link href="/#verktyg" style={{ color: C.dampad, borderBottom: `1px solid ${C.linje}` }}>
            Andra digitala verktyg
          </Link>
        </p>
        {visaFeedback && (
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
            <FeedbackRuta onStang={() => setVisaFeedback(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
