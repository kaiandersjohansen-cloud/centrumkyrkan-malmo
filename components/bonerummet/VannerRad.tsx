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

  return (
    <div style={{ marginTop: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontFamily: SANS }}>
      <p style={{ margin: 0, fontSize: 16, color: C.text }}>
        {totalt > 0 ? (
          <>
            Vi ber för att <strong style={{ color: C.gron, fontWeight: 700, fontSize: 18 }}>{totalt}</strong> {ord} ska börja tro på Jesus
          </>
        ) : (
          "Hur många vänner ber du för som ännu inte tror på Jesus?"
        )}
        {aktiv && !utfalld && (
          <>
            {" · "}
            <button
              type="button"
              onClick={() => {
                setVal(mitt || 1);
                setUtfalld(true);
              }}
              style={{ background: "none", border: "none", padding: 0, font: "inherit", fontSize: 15, fontWeight: 600, color: C.gron, borderBottom: `1px solid ${C.gron}`, cursor: "pointer" }}
            >
              {mitt ? `Du ber för ${mitt} – ändra` : "Lägg till dina"}
            </button>
          </>
        )}
      </p>

      {utfalld && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center", background: C.kort, border: `1px solid ${C.linje}`, borderRadius: 100, padding: "6px 8px 6px 16px" }}>
          <span style={{ fontSize: 14, color: C.dampad }}>Antal vänner</span>
          <button type="button" aria-label="Färre" onClick={() => setVal((v) => Math.max(1, v - 1))} style={rund}>
            −
          </button>
          <span aria-live="polite" style={{ minWidth: 24, textAlign: "center", fontSize: 17, fontWeight: 700 }}>
            {val}
          </span>
          <button type="button" aria-label="Fler" onClick={() => setVal((v) => Math.min(MAX_VANNER_PER_PERSON, v + 1))} style={rund}>
            +
          </button>
          <button type="button" onClick={() => spara(val)} disabled={sparar} className="btn-solid-green" style={{ ...knapp, background: C.gron, borderColor: C.gron, color: "oklch(98.5% 0.006 90)" }}>
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
      {fel && (
        <p role="alert" style={{ margin: 0, fontSize: 13, color: C.rod }}>
          {fel}
        </p>
      )}
    </div>
  );
}
