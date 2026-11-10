"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { LIVSLANGD_DAGAR, type FastAmne, type Feedback, type Inlagg, type VaggData } from "@/lib/bonerummet";
import Link from "next/link";
import FeedbackRuta from "@/components/bonerummet/FeedbackRuta";
import VannerRad from "@/components/bonerummet/VannerRad";
import { C, SANS, SERIF } from "@/components/bonerummet/stil";

// Lägger innehåll ovanpå sidan med mörk bakgrund. Klick utanför stänger.
function Overlagg({ onStang, children }: { onStang: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onStang();
      }}
      style={{ position: "fixed", inset: 0, zIndex: 50, background: "oklch(20% 0.015 50 / 0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      {children}
    </div>
  );
}

const BER_KEY = "centrumkyrkan-bonerummet-ber";
const KOD_KEY = "centrumkyrkan-bonerummet-kod";
const UPPDATERA_MS = 5000;

const CSS = `
.vagg { min-height: 100vh; display: flex; flex-direction: column; }
.vagg-fasta { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
.vagg-kolumner { flex: 1; display: grid; grid-template-columns: 1.15fr 1fr 0.85fr; gap: 28px; min-height: 0; }
.vagg-kol { display: flex; flex-direction: column; min-height: 0; }
.vagg-lista { display: flex; flex-direction: column; gap: 10px; }
@media (max-width: 1099px) {
  .vagg-kolumner { grid-template-columns: 1fr 1fr; }
  .vagg-bibel { grid-column: 1 / -1; order: -1; }
}
@media (max-width: 720px) {
  .vagg-kolumner { grid-template-columns: 1fr; }
  .vagg-header h1 { font-size: 38px !important; }
  .vagg-yta { padding: 24px 16px 0 !important; }
  .vagg-qr, .vagg-skanna { display: none; }
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
  const [visaFeedback, setVisaFeedback] = useState(false);
  const [feedbackLista, setFeedbackLista] = useState<Feedback[] | null>(null);
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

  // Fasta böneämnen sparas per period, så att man kan be för dem igen när räknaren nollställs.
  const berNyckel = (id: string) => (id.startsWith("f") ? `${data?.period ?? 0}:${id}` : id);

  async function ber(id: string) {
    const nyckel = berNyckel(id);
    if (bett.includes(nyckel)) return;
    const nasta = bett.concat(nyckel);
    setBett(nasta);
    try {
      localStorage.setItem(BER_KEY, JSON.stringify(nasta.slice(-300)));
    } catch {}
    setData((d) =>
      d
        ? {
            ...d,
            inlagg: d.inlagg.map((i) => (i.id === id ? { ...i, ber: i.ber + 1 } : i)),
            fasta: d.fasta.map((f) => (f.id === id ? { ...f, ber: f.ber + 1 } : f)),
          }
        : d,
    );
    try {
      await fetch("/api/bonerummet/ber", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    } catch {}
  }

  async function hantera(atgard: "kolla" | "ta_bort" | "rensa" | "dolj" | "visa" | "ta_bort_feedback", id?: string, kodAttAnvanda = kod): Promise<boolean> {
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

  async function doljAmne(id: string, dolj: boolean) {
    setData((d) => (d ? { ...d, fasta: d.fasta.map((f) => (f.id === id ? { ...f, dold: dolj } : f)) } : d));
    await hantera(dolj ? "dolj" : "visa", id);
    hamta();
  }

  async function lasFeedback() {
    const res = await fetch("/api/bonerummet/hantera", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kod, atgard: "feedback" }),
    }).catch(() => null);
    if (res?.ok) setFeedbackLista(((await res.json()) as { feedback: Feedback[] }).feedback);
  }

  async function taBortFeedback(id: string) {
    setFeedbackLista((l) => (l ? l.filter((f) => f.id !== id) : l));
    await hantera("ta_bort_feedback", id);
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

  function berKnapp(id: string, antal: number) {
    const harBett = bett.includes(berNyckel(id));
    return (
      <button
        type="button"
        className="vagg-ber"
        onClick={() => ber(id)}
        disabled={harBett || !data?.aktiv}
        aria-label={harBett ? `Du ber för detta. ${antal} ber.` : "Jag ber för detta"}
        style={{
          ...smaKnapp,
          padding: "5px 12px",
          fontSize: 12.5,
          flexShrink: 0,
          cursor: harBett ? "default" : "pointer",
          background: harBett ? C.blaLjus : "white",
          borderColor: harBett ? C.bla : C.linje,
          color: C.bla,
        }}
      >
        {harBett ? "Du ber" : "Jag ber för detta"}
        {antal > 0 && <span style={{ fontWeight: 500 }}> · {antal}</span>}
      </button>
    );
  }

  // Tacksägelser får ett hjärta i stället för "Jag ber för detta" (samma räknare).
  function hjartaKnapp(id: string, antal: number) {
    const harGillat = bett.includes(id);
    return (
      <button
        type="button"
        className="vagg-ber"
        onClick={() => ber(id)}
        disabled={harGillat || !data?.aktiv}
        aria-label={harGillat ? `Du har gett ett hjärta. ${antal} hjärtan.` : "Ge ett hjärta"}
        aria-pressed={harGillat}
        style={{
          ...smaKnapp,
          padding: "4px 12px",
          fontSize: 14,
          flexShrink: 0,
          cursor: harGillat ? "default" : "pointer",
          background: harGillat ? C.guldLjus : "white",
          borderColor: harGillat ? C.guld : C.linje,
          color: C.guldText,
        }}
      >
        <span aria-hidden="true">{harGillat ? "♥" : "♡"}</span>
        {antal > 0 && <span style={{ fontWeight: 500, fontSize: 12.5 }}> {antal}</span>}
      </button>
    );
  }

  function kort(i: Inlagg) {
    const ar = i.kategori === "bon";
    const farg = ar ? C.bla : C.guld;
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
          {ar && berKnapp(i.id, i.ber)}
          {!ar && hjartaKnapp(i.id, i.ber)}
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
          <h1 style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0 }}>Bönerummet</h1>
          <Link
            href="/bonerummet"
            className="btn-outline-green"
            style={{ display: "inline-block", marginTop: 20, border: `1.5px solid ${C.gron}`, color: C.gron, padding: "9px 20px", borderRadius: 100, fontWeight: 600, fontSize: 14.5, transition: "background .15s, color .15s" }}
          >
            + Lägg till böneämne eller tacksägelse
          </Link>
          <VannerRad totalt={data?.vanner ?? 0} aktiv={Boolean(data?.aktiv)} onAndrad={(vanner) => setData((d) => (d ? { ...d, vanner } : d))} />
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
            <div className="vagg-lista">
            {data?.bibelord ? (
              <figure style={{ margin: 0, background: C.kort, border: `1px solid ${C.linje}`, borderRadius: 12, padding: "20px 20px 16px" }}>
                <blockquote style={{ margin: 0, fontFamily: SERIF, fontSize: 16, lineHeight: 1.55 }}>{data.bibelord.text}</blockquote>
                <figcaption style={{ marginTop: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.gron }}>{data.bibelord.referens}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: C.dampad, marginTop: 4 }}>{data.bibelord.copyright}</span>
                </figcaption>
              </figure>
            ) : (
              tom(data ? "Dagens bibelord kunde inte hämtas." : "Laddar …")
            )}
            </div>
          </section>
        </div>

        {/* Församlingens böneämnen ligger längst ner så att spalterna ovanför börjar på samma höjd. */}
        <section aria-labelledby="rubrik-fasta" style={{ marginTop: 22 }}>
          <h2 id="rubrik-fasta" style={{ ...kolRubrik, fontSize: 18, flexWrap: "wrap", rowGap: 2 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.gron }} />
            Församlingens böneämnen
            <span style={{ flexBasis: "100%", paddingLeft: 21, fontFamily: SANS, fontSize: 12.5, fontWeight: 400, color: C.dampad }}>Räknarna nollställs varannan dag</span>
          </h2>
          <ul className="vagg-fasta" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {(data?.fasta ?? [])
              .filter((f: FastAmne) => kod || !f.dold)
              .map((f: FastAmne) => (
                <li
                  key={f.id}
                  style={{ display: "flex", flexDirection: "column", gap: 10, background: C.gronLjus, border: "1px solid oklch(86% 0.05 145)", borderRadius: 12, padding: "12px 14px", fontSize: 15, lineHeight: 1.45, opacity: f.dold ? 0.5 : 1 }}
                >
                  <span style={{ textDecoration: f.dold ? "line-through" : undefined }}>{f.text}</span>
                  <span style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                    {!f.dold && berKnapp(f.id, f.ber)}
                    {kod && (
                      <button
                        type="button"
                        onClick={() => doljAmne(f.id, !f.dold)}
                        style={{ ...smaKnapp, padding: "5px 12px", fontSize: 12.5, flexShrink: 0, ...(f.dold ? {} : { color: C.rod, borderColor: "oklch(85% 0.05 30)" }) }}
                      >
                        {f.dold ? "Visa igen" : "Ta bort"}
                      </button>
                    )}
                  </span>
                </li>
              ))}
          </ul>
        </section>

        <p style={{ fontFamily: SERIF, fontSize: 19, fontStyle: "italic", color: C.dampad, textAlign: "center", margin: "34px 0 0" }}>
          Vi bär varandras böneämnen och delar tacksägelser tillsammans!
        </p>
      </div>

      <footer style={{ marginTop: 24, padding: "18px 40px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", borderTop: `1px solid ${C.linje}`, background: "oklch(94% 0.02 145 / 0.5)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {qr && <img className="vagg-qr" src={qr} alt="QR-kod till bönerummet" width={92} height={92} style={{ borderRadius: 10, background: "white", padding: 4, flexShrink: 0 }} />}
        <div style={{ fontSize: 13.5, color: C.dampad, minWidth: 0 }}>
          <p className="vagg-skanna" style={{ margin: "0 0 2px" }}>Skanna för att lägga till ett böneämne eller en tacksägelse</p>
          <p className="vagg-skanna" style={{ margin: 0 }}>
            <Link href="/bonerummet" style={{ fontWeight: 600, color: C.text, borderBottom: `1px solid ${C.linje}` }}>
              {lank.replace(/^https?:\/\//, "")}
            </Link>
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 12 }}>Inlägg raderas automatiskt efter {LIVSLANGD_DAGAR} dagar.</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setVisaFeedback(true)} style={{ ...smaKnapp, color: C.gron, borderColor: "oklch(80% 0.05 145)" }}>
            Ge feedback
          </button>
          {kod ? (
            <>
              <button type="button" onClick={lasFeedback} style={smaKnapp}>
                Läs feedback
              </button>
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

      {visaFeedback && (
        <Overlagg onStang={() => setVisaFeedback(false)}>
          <FeedbackRuta onStang={() => setVisaFeedback(false)} />
        </Overlagg>
      )}

      {feedbackLista && (
        <Overlagg onStang={() => setFeedbackLista(null)}>
          <div role="dialog" aria-labelledby="fb-lista-rubrik" style={{ width: "100%", maxWidth: 640, maxHeight: "85vh", overflowY: "auto", background: C.kort, borderRadius: 14, padding: "20px 20px 16px", boxShadow: "0 8px 28px oklch(30% 0.02 50 / 0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <h2 id="fb-lista-rubrik" style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 500, margin: 0, flex: 1 }}>
                Feedback ({feedbackLista.length})
              </h2>
              <button type="button" onClick={() => setFeedbackLista(null)} style={smaKnapp}>
                Stäng
              </button>
            </div>
            {feedbackLista.length === 0 && tom("Ingen feedback än.")}
            {feedbackLista.map((f) => (
              <article key={f.id} style={{ borderTop: `1px solid ${C.linje}`, padding: "12px 0" }}>
                <p style={{ margin: "0 0 8px", fontSize: 15, lineHeight: 1.5, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{f.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <p style={{ margin: 0, fontSize: 12.5, color: C.dampad, flex: 1 }}>
                    {f.namn && <span style={{ fontStyle: "italic" }}>{f.namn} · </span>}
                    {datum(f.ts)}
                  </p>
                  <button type="button" onClick={() => taBortFeedback(f.id)} style={{ ...smaKnapp, padding: "5px 12px", fontSize: 12.5, color: C.rod, borderColor: "oklch(85% 0.05 30)" }}>
                    Ta bort
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Overlagg>
      )}
    </div>
  );
}
