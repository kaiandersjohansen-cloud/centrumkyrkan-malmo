"use client";

import { useState } from "react";

const DATE_OPTIONS: { value: string; label: string }[] = [
  { value: "2026-08-24", label: "Mån 24 aug" },
  { value: "2026-08-25", label: "Tis 25 aug" },
  { value: "2026-08-26", label: "Ons 26 aug" },
  { value: "2026-08-27", label: "Tor 27 aug" },
  { value: "2026-08-28", label: "Fre 28 aug" },
  { value: "2026-08-29", label: "Lör 29 aug" },
  { value: "2026-08-30", label: "Sön 30 aug" },
  { value: "2026-08-31", label: "Mån 31 aug" },
  { value: "2026-09-01", label: "Tis 1 sep" },
  { value: "2026-09-02", label: "Ons 2 sep" },
  { value: "2026-09-03", label: "Tor 3 sep" },
  { value: "2026-09-04", label: "Fre 4 sep" },
  { value: "2026-09-05", label: "Lör 5 sep" },
  { value: "2026-09-06", label: "Sön 6 sep" },
];

const DATE_LABELS: Record<string, string> = Object.fromEntries(DATE_OPTIONS.map((o) => [o.value, o.label]));

const SIGNUP_URL = process.env.NEXT_PUBLIC_PRAYER_SIGNUP_URL || "";
const STORAGE_KEY = "ck_bonestafett_signups";

interface LocalSignup {
  date: string;
  name: string;
}

function readLocalSignups(): LocalSignup[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalSignup[]) : [];
  } catch {
    return [];
  }
}

export default function PrayerSignupWidget() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<{ text: string; kind: "error" | "success" } | null>(null);
  const [localSignups, setLocalSignups] = useState<LocalSignup[]>([]);

  function refreshCounts(retries = 2) {
    if (!SIGNUP_URL) return;
    fetch(SIGNUP_URL)
      .then((r) => r.json())
      .then((data: Record<string, number>) => setCounts(data))
      .catch(() => {
        if (retries > 0) setTimeout(() => refreshCounts(retries - 1), 600);
      });
  }

  function handleSelectInteraction() {
    refreshCounts();
  }

  function handleSignup() {
    if (!date) {
      setMessage({ text: "Välj ett datum först.", kind: "error" });
      return;
    }
    const trimmedName = name.trim();
    if (!trimmedName) {
      setMessage({ text: "Skriv ditt namn först.", kind: "error" });
      return;
    }

    const updated = [...readLocalSignups(), { date, name: trimmedName }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setLocalSignups(updated);

    if (SIGNUP_URL) {
      fetch(SIGNUP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ date, name: trimmedName }),
      }).catch(() => {});
    }

    setMessage({ text: `Tack! Du är uppskriven på ${DATE_LABELS[date]}.`, kind: "success" });
    setName("");
    setDate("");
  }

  const groupedByDate = localSignups.reduce<Record<string, string[]>>((acc, s) => {
    (acc[s.date] = acc[s.date] || []).push(s.name);
    return acc;
  }, {});

  return (
    <div style={{ background: "oklch(58% 0.14 45)", color: "oklch(98.5% 0.006 90)", borderRadius: 8, padding: 32, marginBottom: 32 }}>
      <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-lora), serif", fontSize: 20, fontWeight: 600 }}>
        Bönestafett 24 augusti – 6 september
      </h3>
      <p style={{ margin: "0 0 20px", fontSize: 15, opacity: 0.92 }}>
        Skriv upp dig mellan 24 augusti och 6 september att särskilt be för böneämnen nedan.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <select
          id="bone-date-select"
          value={date}
          onFocus={handleSelectInteraction}
          onMouseDown={handleSelectInteraction}
          onClick={handleSelectInteraction}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 6,
            border: "none",
            fontSize: 15,
            flex: 1,
            minWidth: 170,
            background: "oklch(98.5% 0.006 90)",
            color: "oklch(30% 0.015 50)",
          }}
        >
          <option value="">Välj datum</option>
          {DATE_OPTIONS.map((o) => {
            const c = counts[o.value] || 0;
            const suffix = c === 0 ? " (ledig)" : c === 1 ? " (1 ber)" : ` (${c} ber)`;
            return (
              <option key={o.value} value={o.value}>
                {o.label + suffix}
              </option>
            );
          })}
        </select>
        <input
          id="bone-name-input"
          type="text"
          placeholder="Ditt namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 6,
            border: "none",
            fontSize: 15,
            flex: 1,
            minWidth: 170,
            background: "oklch(98.5% 0.006 90)",
            color: "oklch(30% 0.015 50)",
          }}
        />
        <button
          id="bone-signup-btn"
          type="button"
          onClick={handleSignup}
          style={{
            background: "oklch(20% 0.015 50)",
            color: "oklch(98.5% 0.006 90)",
            padding: "12px 26px",
            borderRadius: 100,
            fontWeight: 500,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Skriv upp mig
        </button>
      </div>
      {message && (
        <p
          id="bone-signup-msg"
          style={{
            margin: "16px 0 0",
            fontSize: 14,
            fontWeight: 500,
            color: message.kind === "error" ? "oklch(95% 0.03 30)" : "oklch(98.5% 0.006 90)",
          }}
        >
          {message.text}
        </p>
      )}
      {Object.keys(groupedByDate).length > 0 && (
        <div id="bone-signup-list" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          {Object.keys(groupedByDate)
            .sort()
            .map((d) => (
              <div
                key={d}
                style={{
                  fontSize: 14.5,
                  color: "oklch(42% 0.015 50)",
                  padding: "8px 14px",
                  background: "oklch(98.5% 0.006 90)",
                  borderRadius: 6,
                }}
              >
                <strong>{DATE_LABELS[d] || d}:</strong> {groupedByDate[d].join(", ")}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
