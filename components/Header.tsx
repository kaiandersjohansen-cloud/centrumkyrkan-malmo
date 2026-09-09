"use client";

import { useRef, useState } from "react";
import SearchOverlay from "./SearchOverlay";
import { buildSearchIndex, type SearchIndexEntry } from "@/lib/search";

const NAV_LINKS = [
  { href: "#gudstjanst", label: "Gudstjänst" },
  { href: "#kalender", label: "Kalender" },
  { href: "#vagen", label: "Ditt nästa steg" },
  { href: "#barn", label: "Barn & unga" },
  { href: "#om-oss", label: "Om oss" },
  { href: "#media", label: "Media" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchIndexEntry[] | null>(null);
  const navToggleRef = useRef<HTMLInputElement>(null);

  function closeMobileNav() {
    if (navToggleRef.current) navToggleRef.current.checked = false;
  }

  function openSearch() {
    if (!searchIndex) setSearchIndex(buildSearchIndex());
    setSearchOpen(true);
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "oklch(98.5% 0.006 90 / 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid oklch(89% 0.008 80)",
      }}
    >
      <input
        ref={navToggleRef}
        type="checkbox"
        id="nav-toggle"
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
      />
      <a href="#main-content" className="skip-link">
        Hoppa till huvudinnehåll
      </a>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <a
          href="#main-content"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-lora), serif",
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: "0.02em",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-sm.png"
            alt="Centrumkyrkan Malmö"
            width={36}
            height={36}
            style={{ height: 36, width: 36, objectFit: "contain", flexShrink: 0 }}
          />
          <span style={{ whiteSpace: "nowrap" }}>Centrumkyrkan Malmö</span>
        </a>
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            gap: 20,
            fontSize: 14.5,
            fontWeight: 500,
            color: "oklch(38% 0.015 50)",
            whiteSpace: "nowrap",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          id="search-open"
          className="desktop-nav icon-btn"
          aria-label="Sök på sidan"
          onClick={openSearch}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            border: "1px solid oklch(85% 0.008 80)",
            background: "none",
            borderRadius: 100,
            cursor: "pointer",
            color: "oklch(38% 0.015 50)",
            flexShrink: 0,
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-4-4"></path>
          </svg>
        </button>
        <a
          href="#kontakt"
          className="desktop-nav btn-outline-green"
          style={{
            display: "flex",
            border: "1px solid oklch(50% 0.06 145)",
            color: "oklch(50% 0.06 145)",
            padding: "9px 20px",
            borderRadius: 100,
            fontSize: 15,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Hitta hit
        </a>
        <label
          htmlFor="nav-toggle"
          className="mobile-nav-toggle"
          aria-label="Öppna meny"
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            border: "1px solid oklch(20% 0.015 50)",
            borderRadius: 8,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ☰
        </label>
      </div>
      <nav
        className="mobile-nav-panel"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a,button")) closeMobileNav();
        }}
        style={{
          flexDirection: "column",
          padding: "4px 28px 24px",
          gap: 2,
          borderTop: "1px solid oklch(89% 0.008 80)",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{ padding: "12px 0", borderBottom: "1px solid oklch(89% 0.008 80)" }}
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          id="search-open-mobile"
          onClick={openSearch}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 0 4px",
            background: "none",
            border: "none",
            fontSize: 16,
            fontFamily: "var(--font-public-sans), sans-serif",
            color: "oklch(50% 0.06 145)",
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-4-4"></path>
          </svg>
          Sök på sidan
        </button>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} index={searchIndex} />
    </header>
  );
}
