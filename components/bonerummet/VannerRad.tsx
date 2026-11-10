"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { MAX_VANNER_PER_PERSON } from "@/lib/bonerummet";
import { C, SANS } from "@/components/bonerummet/stil";

const ENHET_KEY = "centrumkyrkan-bonerummet-enhet";
const ANTAL_KEY = "centrumkyrkan-bonerummet-vanner";

const knapp: CSSProperties = {
  background: "white",
  border: `1.5px solid ${C.linje}`,
  borderRadius: 100,
  padding: "6px 14px",
  fontSize: 13.5,
  fontWeight: 600,
  fontFamily: SANS,
  color: C.dampad,
  cursor: "pointer",
};

const rund: CSSProperties = { ...knapp, width: 34, height: 34, padding: 0, fontSize: 18, lineHeight: 1, color: C.gron };

function hamtaEnhet(): string {
  let id = localStorage.getItem(ENHET_KEY) ?? "";
  if (!/^[a-z0-9]{16,40}$/.test(id)) {
    id = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(36).padStart(2, "0")).join("");
    localStorage.setItem(ENHET_KEY, id);
  }
  return id;
}

// "Vi ber för att __ vänner ska börja tro på Jesus" med en liten ruta för att
// lägga till, ändra eller ta bort sitt eget antal.
export default function VannerRad({ totalt, aktiv, onAndrad }: { totalt: number; aktiv: boolean; onAndrad: (totalt: number) => void }) {
  const [mitt, setMitt] = useState(0);
  const [utfalld, setUtfalld] = useState(false);
  const [val, setVal] = useState(1);
  const [sparar, setSparar] = useState(false);
  const [fel, setFel] = useState("");

  // localStorage finns bara i webbläsaren, så det läses efter mount.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- se kommentaren ovan
      setMitt(Number(localStorage.getItem(ANTAL_KEY)) || 0);
    } catch {}
  }, []);

  async function spara(antal: number) {
    setSparar(true);
    setFel("");
    try {
      const res = await fetch("/api/bonerummet/vanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enhet: hamtaEnhet(), antal }),
      });
      if (!res.ok) throw new Error();
      const data: { vanner: number } = await res.json();
      onAndrad(data.vanner);
      setMitt(antal);
      try {
        localStorage.setItem(ANTAL_KEY, String(antal));
      } catch {}
      setUtfalld(false);
    } catch {
      setFel("Det gick inte att spara. Försök igen.");
    } finally {
      setSparar(false);
    }
  }

  const ord = totalt === 1 ? "vän" : "vänner";

  const knappRosa: CSSProperties = { ...knapp, background: C.rosa, borderColor: C.rosa, color: "oklch(98.5% 0.006 90)" };

  return (
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontFamily: SANS }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          background: C.rosaLjus,
          borderRadius: 20,
          padding: "8px 14px",
          maxWidth: 720,
        }}
      >
        <p style={{ margin: 0, fontSize: 15, color: C.text, textAlign: "center" }}>
          {totalt > 0 ? (
            <>
              Vi ber för att <strong style={{ color: C.rosa, fontWeight: 700, fontSize: 18 }}>{totalt}</strong> {ord} ska börja tro på Jesus
            </>
          ) : (
            "Hur många vänner ber du för som ännu inte tror på Jesus?"
          )}
        </p>

        {aktiv && !utfalld && (
          <button
            type="button"
            onClick={() => {
              setVal(mitt || 1);
              setUtfalld(true);
            }}
            style={{ ...knapp, padding: "5px 14px", fontSize: 13, color: C.rosa, borderColor: C.rosaLinje }}
          >
            {mitt ? `Du ber för ${mitt} – ändra` : "Lägg till dina"}
          </button>
        )}

        {utfalld && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 14, color: C.dampad }}>Antal vänner</span>
            <button type="button" aria-label="Färre" onClick={() => setVal((v) => Math.max(1, v - 1))} style={{ ...rund, color: C.rosa }}>
              −
            </button>
            <span aria-live="polite" style={{ minWidth: 24, textAlign: "center", fontSize: 17, fontWeight: 700 }}>
              {val}
            </span>
            <button type="button" aria-label="Fler" onClick={() => setVal((v) => Math.min(MAX_VANNER_PER_PERSON, v + 1))} style={{ ...rund, color: C.rosa }}>
              +
            </button>
            <button type="button" onClick={() => spara(val)} disabled={sparar} style={knappRosa}>
              Spara
            </button>
            {mitt > 0 && (
              <button type="button" onClick={() => spara(0)} disabled={sparar} style={{ ...knapp, color: C.rod }}>
                Ta bort mina
              </button>
            )}
            <button type="button" onClick={() => setUtfalld(false)} style={knapp}>
              Avbryt
            </button>
          </div>
        )}
      </div>
      {fel && (
        <p role="alert" style={{ margin: 0, fontSize: 13, color: C.rod }}>
          {fel}
        </p>
      )}
    </div>
  );
}
