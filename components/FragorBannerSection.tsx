import { isExpired } from "@/lib/dates";

const SLIDO_URL = "https://app.sli.do/event/m8BdE767AkEa3LcnrjwdXS";

// Döljs automatiskt efter eventet. Svensk sommartid (+02:00).
const FRAGOR_BANNER_EXPIRES = new Date("2026-10-11T23:59:00+02:00"); // 11 okt 2026 23:59

const CSS = `
.fragor-banner-btn { transition: background 0.2s ease; }
.fragor-banner-btn:hover { background: rgb(125 45 18) !important; }
@media (max-width: 1000px) {
  .fragor-banner-btn { padding: 11px 20px !important; font-size: 14px !important; }
}
@media (max-width: 780px) {
  .fragor-section { padding: 0 16px !important; margin-bottom: 8px !important; }
  .fragor-banner-btn {
    position: static !important;
    transform: none !important;
    display: block;
    margin: 0 16px 16px;
    padding: 14px 24px !important;
    font-size: 15.5px !important;
  }
}
`;

// Banner för "Ställ dina frågor om Bibeln" med Joel MacInnes, söndag 11 oktober.
export default function FragorBannerSection({ id = "fragor-om-bibeln" }: { id?: string }) {
  if (isExpired(FRAGOR_BANNER_EXPIRES)) return null;

  return (
    <section
      id={id}
      aria-label="Ställ dina frågor om Bibeln – söndag 11 oktober 15.30"
      className="fragor-section"
      style={{ maxWidth: 1080, margin: "0 auto 48px", padding: "0 28px", scrollMarginTop: 88 }}
    >
      <style>{CSS}</style>
      <div
        style={{
          position: "relative",
          background: "rgb(252 249 244)",
          border: "1px solid oklch(89% 0.008 80)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/fragor-om-bibeln.jpg"
          alt="Ställ dina frågor om Bibeln. Söndag 11 oktober kl. 15.30 med Joel MacInnes, teologie doktor och lärare i Nya testamentet vid ALT."
          width={1920}
          height={600}
          decoding="async"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <a
          href={SLIDO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fragor-banner-btn"
          style={{
            position: "absolute",
            right: "4%",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgb(156 59 27)",
            color: "oklch(98.5% 0.006 90)",
            padding: "15px 30px",
            borderRadius: 100,
            fontWeight: 600,
            fontSize: 15.5,
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          Skicka din fråga
        </a>
      </div>
    </section>
  );
}
