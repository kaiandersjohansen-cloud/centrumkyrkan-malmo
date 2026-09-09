import Link from "next/link";

export default function ToolPageHeader({ maxWidth = 680 }: { maxWidth?: number }) {
  return (
    <header style={{ borderBottom: "1px solid oklch(89% 0.008 80)" }}>
      <div
        style={{
          maxWidth,
          margin: "0 auto",
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link href="/" className="nav-link" style={{ fontSize: 14.5, fontWeight: 500, color: "oklch(42% 0.015 50)" }}>
          ← Till hemsidan
        </Link>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-lora), serif",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-sm.png" alt="Centrumkyrkan Malmö" style={{ height: 28, width: "auto" }} />
          Centrumkyrkan Malmö
        </Link>
      </div>
    </header>
  );
}
