"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { FASTA_BONEAMNEN, LIVSLANGD_DAGAR, type Inlagg, type VaggData } from "@/lib/bonerummet";
import { C, SANS, SERIF } from "@/components/bonerummet/stil";

const BER_KEY = "centrumkyrkan-bonerummet-ber";
const KOD_KEY = "centrumkyrkan-bonerummet-kod";
const UPPDATERA_MS = 5000;

const CSS = `
.vagg { min-height: 100vh; display: flex; flex-direction: column; }
.vagg-kolumner { flex: 1; display: grid; grid-template-columns: 1.15fr 1fr 0.85fr; gap: 28px; min-height: 0; }
.vagg-kol { display: flex; flex-direction: column; min-height: 0; }
.vagg-lista { display: flex; flex-direction: column; gap: 10px; }
@media (min-width: 1100px) {
  .vagg { height: 100vh; }
  .vagg-lista { flex: 1; overflow-y: auto; padding-right: 4px; }
}
@media (max-width: 1099px) {
  .vagg-kolumner { grid-template-columns: 1fr 1fr; }
  .vagg-bibel { grid-column: 1 / -1; order: -1; }
}
@media (max-width: 720px) {
  .vagg-kolumner { grid-template-columns: 1fr; }
  .vagg-header h1 { font-size: 30px !important; }
  .vagg-yta { padding: 24px 16px 0 !important; }
  .vagg-qr { display: none; }
}
@keyframes vaggIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes vaggGlod { 0% { box-shadow: 0 0 0 6px var(--glod); } 100% { box-shadow: 0 0 0 0 transparent; } }
.vagg-ny { animation: vaggIn .55s ease-out, vaggGlod 2.6s ease-out .05s; }
@media (prefers-reduced-motion: reduce) { .vagg-ny { animation: none; } }
.vagg-ber:hover:not(:disabled) { border-color: currentColor !important; }
`;

function lasLista(key: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function datum(ts: number): string {
  const d = new Date(ts);
  const idag = new Date();
  const igar = new Date(Date.now() - 86_400_000);
  const samma = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const tid = d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
  if (samma(d, idag)) return `i dag ${tid}`;
  if (samma(d, igar)) return `i går ${tid}`;
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "short" });
}

const kolRubrik: CSSProperties = {
  fontFamily: SERIF,
  fontSize: 20,
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "0 0 14px",
  paddingBottom: 10,
  borderBottom: `1.5px solid ${C.linje}`,
};

const smaKnapp: CSSProperties = {
  background: "white",
  border: `1.5px solid ${C.linje}`,
  borderRadius: 100,
  padding: "8px 16px",
  fontSize: 13.5,
  fontWeight: 600,
  fontFamily: SANS,
  color: C.dampad,
  cursor: "pointer",
};

export default function Vagg() {
  const [data, setData] = useState<VaggData | null>(null);
  const [laddFel, setLaddFel] = useState(false);
  const [bett, setBett] = useState<string[]>([]);
  const [kod, setKod] = useState("");
  const [kodFalt, setKodFalt] = useState("");
  const [visaKod, setVisaKod] = useState(false);
  const [kodFel, setKodFel] = useState("");
  const [rensaRedo, setRensaRedo] = useState(false);
  const [lank, setLank] = useState("");
  const [nya, setNya] = useState<string[]>([]);
  // Inlägg som fanns vid första laddningen ska inte blinka till som nya.
  const sedda = useRef<Set<string> | null>(null);

  // localStorage och sessionStorage finns bara i webbläsaren, så de läses efter mount.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- se kommentaren ovan */
    setBett(lasLista(BER_KEY));
    try {
      setKod(sessionStorage.getItem(KOD_KEY) ?? "");
    } catch {}
    setLank(`${location.origin}/bonerummet`);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const hamta = useCallback(async () => {
    try {
      const res = await fetch("/api/bonerummet", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const ny: VaggData = await res.json();
      const ids = ny.inlagg.map((i) => i.id);
      if (!sedda.current) {
        sedda.current = new Set(ids);
        setNya([]);
      } else {
        const set = sedda.current;
        const nyaIds = ids.filter((id) => !set.has(id));
        nyaIds.forEach((id) => set.add(id));
        setNya(nyaIds);
      }
      setData(ny);
      setLaddFel(false);
    } catch {
      setLaddFel(true);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- första hämtningen
    hamta();
    const t = setInterval(() => {
      if (document.visibilityState === "visible") hamta();
    }, UPPDATERA_MS);
    return () => clearInterval(t);
  }, [hamta]);

  const inlagg = data?.inlagg ?? [];

  async function ber(id: string) {
    if (bett.includes(id)) return;
    const nasta = bett.concat(id);
    setBett(nasta);
    try {
      localStorage.setItem(BER_KEY, JSON.stringify(nasta.slice(-300)));
    } catch {}
    setData((d) => (d ? { ...d, inlagg: d.inlagg.map((i) => (i.id === id ? { ...i, ber: i.ber + 1 } : i)) } : d));
    try {
      await fetch("/api/bonerummet/ber", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    } catch {}
  }

  async function hantera(atgard: "kolla" | "ta_bort" | "rensa", id?: string, kodAttAnvanda = kod): Promise<boolean> {
    const res = await fetch("/api/bonerummet/hantera", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kod: kodAttAnvanda, atgard, id }),
    }).catch(() => null);
    if (res?.status === 401) {
      setKod("");
      try {
        sessionStorage.removeItem(KOD_KEY);
      } catch {}
    }
    return Boolean(res?.ok);
  }

  async function loggaIn() {
    setKodFel("");
    const ok = await hantera("kolla", undefined, kodFalt);
    if (ok) {
      setKod(kodFalt);
      try {
        sessionStorage.setItem(KOD_KEY, kodFalt);
      } catch {}
      setKodFalt("");
      setVisaKod(false);
    } else {
      setKodFel("Fel kod, eller så är hanteringen inte i gång.");
    }
  }

  async function taBort(id: string) {
    setData((d) => (d ? { ...d, inlagg: d.inlagg.filter((i) => i.id !== id) } : d));
    await hantera("ta_bort", id);
    hamta();
  }

  async function rensa() {
    if (!rensaRedo) {
      setRensaRedo(true);
      setTimeout(() => setRensaRedo(false), 4000);
      return;
    }
    setRensaRedo(false);
    await hantera("rensa");
    hamta();
  }

  const bon = inlagg.filter((i) => i.kategori === "bon");
  const tack = inlagg.filter((i) => i.kategori === "tack");

  function kort(i: Inlagg) {
    const ar = i.kategori === "bon";
    const farg = ar ? C.bla : C.guld;
    const harBett = bett.includes(i.id);
    return (
      <article
        key={i.id}
        className={nya.includes(i.id) ? "vagg-ny" : undefined}
        style={{ ["--glod" as string]: ar ? C.blaLjus : C.guldLjus, background: C.kort, border: `1px solid ${C.linje}`, borderLeft: `4px solid ${farg}`, borderRadius: 12, padding: "14px 16px" } as CSSProperties}
      >
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{i.text}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontSize: 12.5, color: C.dampad, flex: 1, minWidth: 0 }}>
            {i.namn && <span style={{ fontStyle: "italic" }}>{i.namn} · </span>}
            {datum(i.ts)}
          </p>
          {ar && (
            <button
              type="button"
              className="vagg-ber"
              onClick={() => ber(i.id)}
              disabled={harBett}
              aria-label={harBett ? `Du ber för detta. ${i.ber} ber.` : "Jag ber för detta"}
              style={{
                ...smaKnapp,
                padding: "5px 12px",
                fontSize: 12.5,
                cursor: harBett ? "default" : "pointer",
                background: harBett ? C.blaLjus : "white",
                borderColor: harBett ? C.bla : C.linje,
                color: C.bla,
              }}
            >
              {harBett ? "Du ber" : "Jag ber för detta"}
              {i.ber > 0 && <span style={{ fontWeight: 500 }}> · {i.ber}</span>}
            </button>
          )}
          {!ar && i.ber > 0 && <span style={{ fontSize: 12.5, color: C.dampad }}>{i.ber} ber</span>}
          {kod && (
            <button type="button" onClick={() => taBort(i.id)} aria-label="Ta bort inlägget" style={{ ...smaKnapp, padding: "5px 12px", fontSize: 12.5, color: C.rod, borderColor: "oklch(85% 0.05 30)" }}>
              Ta bort
            </button>
          )}
        </div>
      </article>
    );
  }

  const tom = (t: string) => <p style={{ color: C.dampad, fontSize: 14, fontStyle: "italic", margin: "4px 0" }}>{t}</p>;
  const qr = lank ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=2F4438&bgcolor=FFFFFF&data=${encodeURIComponent(lank)}` : "";

  return (
    <div className="vagg" style={{ background: C.bg, fontFamily: SANS, color: C.text }}>
      <style>{CSS}</style>
      <div className="vagg-yta" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, padding: "32px 40px 0" }}>
        <header className="vagg-header" style={{ textAlign: "center", marginBottom: 26 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: C.gron, margin: "0 0 6px" }}>Centrumkyrkan Malmö</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 500, margin: "0 0 6px" }}>Bönerummet</h1>
          <p style={{ fontSize: 15.5, color: C.dampad, margin: 0 }}>Vi bär varandras böneämnen och tacksägelser tillsammans</p>
        </header>

        {data && !data.aktiv && (
          <p style={{ textAlign: "center", background: "white", border: `1px solid ${C.linje}`, borderRadius: 10, padding: "12px 16px", margin: "0 auto 20px", maxWidth: 560, fontSize: 14.5, color: C.dampad }}>
            Bönerummet är inte i gång än, så inga inlägg kan sparas just nu.
          </p>
        )}
        {laddFel && (
          <p role="status" style={{ textAlign: "center", fontSize: 13.5, color: C.rod, margin: "0 0 14px" }}>
            Kunde inte uppdatera väggen. Försöker igen …
          </p>
        )}

        <div className="vagg-kolumner">
          <section className="vagg-kol" aria-labelledby="rubrik-bon">
            <h2 id="rubrik-bon" style={kolRubrik}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.bla }} />
              Böneämnen
            </h2>
            <div className="vagg-lista">
              <div style={{ background: C.gronLjus, border: `1px solid oklch(86% 0.05 145)`, borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.gron }}>Församlingen ber för</p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.6 }}>
                  {FASTA_BONEAMNEN.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              {data ? (bon.length ? bon.map(kort) : tom("Inga böneämnen än. Skanna QR-koden för att lägga till ett.")) : tom("Laddar …")}
            </div>
          </section>

          <section className="vagg-kol" aria-labelledby="rubrik-tack">
            <h2 id="rubrik-tack" style={kolRubrik}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.guld }} />
              Tacksägelser
            </h2>
            <div className="vagg-lista">{data ? (tack.length ? tack.map(kort) : tom("Inga tacksägelser än.")) : tom("Laddar …")}</div>
          </section>

          <section className="vagg-kol vagg-bibel" aria-labelledby="rubrik-bibel">
            <h2 id="rubrik-bibel" style={kolRubrik}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.gron }} />
              Dagens bibelord
            </h2>
            {data?.bibelord ? (
              <figure style={{ margin: 0, background: C.kort, border: `1px solid ${C.linje}`, borderRadius: 12, padding: "20px 20px 16px" }}>
                <blockquote style={{ margin: 0, fontFamily: SERIF, fontSize: 19, lineHeight: 1.55 }}>{data.bibelord.text}</blockquote>
                <figcaption style={{ marginTop: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.gron }}>{data.bibelord.referens}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: C.dampad, marginTop: 4 }}>{data.bibelord.copyright}</span>
                </figcaption>
              </figure>
            ) : (
              tom(data ? "Dagens bibelord kunde inte hämtas." : "Laddar …")
            )}
          </section>
        </div>
      </div>

      <footer style={{ marginTop: 24, padding: "18px 40px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", borderTop: `1px solid ${C.linje}`, background: "oklch(94% 0.02 145 / 0.5)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {qr && <img className="vagg-qr" src={qr} alt="QR-kod till bönerummet" width={92} height={92} style={{ borderRadius: 10, background: "white", padding: 4, flexShrink: 0 }} />}
        <div style={{ fontSize: 13.5, color: C.dampad, minWidth: 0 }}>
          <p style={{ margin: "0 0 2px" }}>Skanna för att lägga till ett böneämne eller en tacksägelse</p>
          <p style={{ margin: 0, fontWeight: 600, color: C.text }}>{lank.replace(/^https?:\/\//, "")}</p>
          <p style={{ margin: "4px 0 0", fontSize: 12 }}>Inlägg raderas automatiskt efter {LIVSLANGD_DAGAR} dagar.</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {kod ? (
            <>
              <button type="button" onClick={rensa} style={{ ...smaKnapp, ...(rensaRedo ? { color: C.rod, borderColor: C.rod, background: "oklch(96% 0.02 30)" } : {}) }}>
                {rensaRedo ? "Bekräfta: rensa allt?" : "Rensa tavlan"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setKod("");
                  try {
                    sessionStorage.removeItem(KOD_KEY);
                  } catch {}
                }}
                style={smaKnapp}
              >
                Sluta hantera
              </button>
            </>
          ) : visaKod ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loggaIn();
              }}
              style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}
            >
              <label htmlFor="vagg-kod" style={{ position: "absolute", left: -9999 }}>
                Kod för att hantera väggen
              </label>
              <input id="vagg-kod" type="password" value={kodFalt} onChange={(e) => setKodFalt(e.target.value)} placeholder="Kod" autoFocus style={{ border: `1.5px solid ${C.linje}`, borderRadius: 100, padding: "8px 14px", fontSize: 14, fontFamily: SANS, width: 120 }} />
              <button type="submit" style={smaKnapp}>
                Hantera
              </button>
              {kodFel && <span style={{ fontSize: 12.5, color: C.rod, width: "100%", textAlign: "right" }}>{kodFel}</span>}
            </form>
          ) : (
            <button type="button" onClick={() => setVisaKod(true)} style={smaKnapp}>
              Hantera väggen
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
