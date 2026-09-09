import { INFO_BANNER_EXPIRES, isExpired } from "@/lib/dates";

export default function InfoBanner() {
  if (isExpired(INFO_BANNER_EXPIRES)) return null;

  return (
    <div
      id="info-banner"
      style={{
        background: "oklch(50% 0.06 145)",
        color: "oklch(98.5% 0.006 90)",
        padding: "11px 28px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: "0 auto",
          maxWidth: 1080,
          fontSize: 15,
          fontWeight: 500,
          lineHeight: 1.45,
          textWrap: "pretty",
        }}
      >
        Ingen gudstjänst söndag 23 augusti (församlingshelg) —{" "}
        <a
          href="#kalender"
          className="banner-link"
          style={{
            color: "oklch(98.5% 0.006 90)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            whiteSpace: "nowrap",
          }}
        >
          se kalendern
        </a>
      </p>
    </div>
  );
}
