"use client";

import { useState } from "react";

const SUBJECTS: { title: string; body: string }[] = [
  {
    title: "Alpha-kursen (start 24 september)",
    body: "Be för alla som ska gå kursen i höst och att flera anmäler sig. Be att de som ännu inte tror ska möta Jesus på ett verkligt sätt och för samtalsledarna kring borden.",
  },
  {
    title: "Djupare relationer och fler måltider tillsammans",
    body: "Be att helgens tema får rota sig i vardagen – att vi som församling faktiskt öppnar våra hem och bord för varandra och för nya människor.",
  },
  {
    title: "Mission och diakoni",
    body: "Be för våra missionärer i Bangladesh och för hur vi som församling kan få tjäna utsatta grupper i Malmö.",
  },
  {
    title: "Valet i Sverige",
    body: "Be för visdom hos väljare och de som blir valda, för ett sunt samtalsklimat i valrörelsens sista veckor, och att kyrkan är ljus och salt oavsett utgång.",
  },
  {
    title: "Barn och ungdomar i församlingen",
    body: "Be för Biblia, Cungarna och de unga som går bibelskola i höst – att de växer i sin relation med Jesus, och för Erik och Tamanda som leder det arbetet.",
  },
  {
    title: "Tacksamhet för vad Gud gör i församlingen",
    body: "Tacka konkret för det du kommer på – stort som smått.",
  },
  {
    title: "Våra vänner som inte tror",
    body: "Be för de vänner, grannar och kollegor var och en bär på – att Gud öppnar dörrar till samtal och att de får möta hans kärlek.",
  },
];

export default function PrayerSubjectsModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        id="bone-trigger"
        type="button"
        onClick={() => setOpen(true)}
        style={{
          background: "none",
          border: "1px solid oklch(58% 0.14 45)",
          color: "oklch(58% 0.14 45)",
          padding: "12px 24px",
          borderRadius: 100,
          fontSize: 15,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Läs böneämnena i sin helhet →
      </button>

      <div
        id="bone-overlay"
        className={`overlay${open ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div
          style={{
            background: "oklch(98.5% 0.006 90)",
            borderRadius: 8,
            maxWidth: 640,
            width: "100%",
            maxHeight: "85vh",
            overflowY: "auto",
            padding: 36,
            position: "relative",
          }}
        >
          <button
            id="bone-close"
            type="button"
            aria-label="Stäng"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 12,
              right: 14,
              border: "none",
              background: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "oklch(38% 0.015 50)",
            }}
          >
            ✕
          </button>
          <h3 style={{ fontFamily: "var(--font-lora), serif", fontSize: 22, fontWeight: 500, margin: "0 0 28px" }}>
            Böneämnen hösten 2026
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {SUBJECTS.map((s, i) => (
              <div key={s.title} style={{ display: "flex", gap: 16 }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "oklch(58% 0.14 45)",
                    color: "oklch(98.5% 0.006 90)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h4 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600 }}>{s.title}</h4>
                  <p style={{ margin: 0, color: "oklch(42% 0.015 50)", fontSize: 15, lineHeight: 1.55 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "oklch(42% 0.015 50)",
              fontSize: 15,
              lineHeight: 1.6,
              margin: "28px 0 0",
              paddingTop: 24,
              borderTop: "1px solid oklch(89% 0.008 80)",
            }}
          >
            Hittills har ni inte bett om något i mitt namn.
            <br />
            Be, och ni ska få, så att er glädje blir fullkomlig. Joh. 16:24
          </p>
        </div>
      </div>
    </>
  );
}
