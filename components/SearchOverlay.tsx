"use client";

import { useEffect, useRef, useState } from "react";
import { runSearch, type SearchIndexEntry } from "@/lib/search";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  index: SearchIndexEntry[] | null;
}

function norm(s: string): string {
  return (s || "").toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o");
}

export default function SearchOverlay({ isOpen, onClose, index }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const hits = index ? runSearch(query, index) : [];
  const hasQuery = norm(query.trim()).length >= 2;

  return (
    <div
      id="search-overlay"
      className={`overlay${isOpen ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "oklch(98.5% 0.006 90)",
          borderRadius: 10,
          maxWidth: 620,
          width: "100%",
          maxHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "18px 22px",
            borderBottom: "1px solid oklch(89% 0.008 80)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="oklch(50% 0.06 145)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-4-4"></path>
          </svg>
          <input
            id="search-input"
            ref={inputRef}
            type="text"
            placeholder="Sök – t.ex. gudstjänst, bordsbön, stab, medlem"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "none",
              fontSize: 17,
              fontFamily: "var(--font-public-sans), sans-serif",
              color: "oklch(20% 0.015 50)",
              outline: "none",
            }}
          />
          <button
            type="button"
            id="search-close"
            aria-label="Stäng"
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              fontSize: 19,
              cursor: "pointer",
              color: "oklch(45% 0.015 50)",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
        <div id="search-results" style={{ overflowY: "auto", padding: 8 }}>
          {!hasQuery && (
            <p style={{ margin: 0, padding: "26px 16px", color: "oklch(52% 0.015 50)", fontSize: 15 }}>
              Skriv minst två bokstäver för att söka.
            </p>
          )}
          {hasQuery && hits.length === 0 && (
            <p style={{ margin: 0, padding: "26px 16px", color: "oklch(52% 0.015 50)", fontSize: 15 }}>
              Inga träffar. Prova ett annat ord.
            </p>
          )}
          {hits.map((hit) => (
            <a
              key={hit.entry.href}
              href={hit.entry.href}
              onClick={onClose}
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: 8,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "oklch(50% 0.06 145)",
                }}
              >
                {hit.entry.sub}
              </p>
              <p
                style={{
                  margin: "3px 0 0",
                  fontFamily: "var(--font-lora), serif",
                  fontSize: 17,
                  color: "oklch(20% 0.015 50)",
                }}
              >
                {hit.entry.title}
              </p>
              {hit.snippet && (
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: 14,
                    color: "oklch(48% 0.015 50)",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  …{hit.snippet}…
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
