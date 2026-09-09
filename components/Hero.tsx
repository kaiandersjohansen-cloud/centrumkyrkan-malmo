const SpotifyIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.36-1.32 9.76-.66 13.5 1.62.361.181.54.78.241 1.201zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38C8.76 5.939 15.72 6.24 19.681 8.58c.539.3.719 1.02.419 1.56-.3.421-1.02.599-1.559.3z" />
  </svg>
);

const ApplePodcastsIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor">
    <path d="M224 24C110.4 24 18.2 116 15.9 229.1c-1.9 90.7 53.4 169.3 132.6 202.1c9.5 3.9 19.8-3.4 19.8-13.7v-19.6c0-6.1-3.7-11.6-9.3-14c-54.4-23.5-92.5-78.9-90.6-142.6C70.4 165.4 141.6 96 228.5 96C314.4 96 384 165.6 384 251.5c0 63.6-38.1 118.4-92.6 141.8c-5.6 2.4-9.3 7.9-9.3 14v19.6c0 10.3 10.3 17.6 19.8 13.7C381.1 407.9 436.6 328.5 432 235.5C427.4 122.5 331.5 24 224 24zm-2.8 78c-72.9 0-131.9 59.9-129.1 133.4c1.6 42.6 24.2 79.7 57.8 101.6c9.4 6.1 21.9-.6 21.9-11.8v-24.4c0-4.9-2.3-9.4-6.1-12.5c-15.4-12.2-25.5-30.6-26-51.4c-1-40.2 31.5-74.4 71.7-74.9c41-.5 74.4 32.6 74.4 73.5c0 21.1-9.6 39.9-24.7 52.5c-3.8 3.2-6.1 7.7-6.1 12.6v24.4c0 11.2 12.5 17.9 21.9 11.8c33.1-21.6 55.4-58.2 57.6-100.1C338.4 165.8 279.6 102 221.2 102zM224 224c-17.7 0-32 14.3-32 32c0 8.4 3.2 16 8.5 21.6c1.6 1.7 2.6 3.9 3 6.2l14.5 90.9c.6 3.9 4 6.7 7.9 6.7h.1c4 0 7.3-2.9 7.9-6.7l14.4-90.9c.4-2.3 1.5-4.5 3-6.2c5.3-5.7 8.5-13.3 8.5-21.6c.1-17.7-14.2-32-31.8-32z" />
  </svg>
);

const SPOTIFY_URL = "https://open.spotify.com/show/0eoXIm6SvC0ESOcMxQ4x7y?si=955d03a244e54df6";
const APPLE_PODCASTS_URL = "https://podcasts.apple.com/us/podcast/centrumkyrkan-malm%C3%B6/id1620946879";

interface HeroProps {
  showPrayerCta: boolean;
}

export default function Hero({ showPrayerCta }: HeroProps) {
  return (
    <>
      {/* HERO (desktop/tablet) */}
      <section
        id="hero"
        className="desktop-hero"
        style={{ maxWidth: 760, margin: "0 auto", padding: "120px 28px 64px", textAlign: "center", scrollMarginTop: 88 }}
      >
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "oklch(50% 0.06 145)",
            margin: "0 0 24px",
          }}
        >
          Församlingen Centrumkyrkan Malmö
        </p>
        <h1
          className="hero-h1"
          style={{
            fontFamily: "var(--font-lora), serif",
            fontSize: 48,
            lineHeight: 1.22,
            fontWeight: 500,
            margin: "0 0 26px",
            letterSpacing: "-0.01em",
          }}
        >
          Vi följer Jesus tillsammans
        </h1>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="#kalender"
            id="next-sunday-cta-desktop"
            className="btn-solid-green"
            style={{
              background: "oklch(50% 0.06 145)",
              color: "oklch(98.5% 0.006 90)",
              padding: "15px 30px",
              borderRadius: 100,
              fontWeight: 500,
              fontSize: 15.5,
            }}
          >
            Vad händer framöver?
          </a>
          {showPrayerCta && (
            <a
              href="#bonuppmaning"
              id="hero-cta-desktop"
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                border: "1px solid oklch(58% 0.14 45)",
                color: "oklch(58% 0.14 45)",
                padding: "12px 26px",
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Centrumkyrkan ber
            </a>
          )}
        </div>
        <div
          style={{
            marginTop: 32,
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            border: "1px solid oklch(50% 0.06 145)",
            borderRadius: 100,
            padding: "10px 20px 10px 24px",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "oklch(50% 0.06 145)",
            }}
          >
            Senaste predikan
          </span>
          <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" aria-label="Lyssna på Spotify" style={{ display: "flex", color: "oklch(50% 0.06 145)" }}>
            <SpotifyIcon />
          </a>
          <a href={APPLE_PODCASTS_URL} target="_blank" rel="noopener noreferrer" aria-label="Lyssna på Apple Podcasts" style={{ display: "flex", color: "oklch(50% 0.06 145)" }}>
            <ApplePodcastsIcon />
          </a>
        </div>
      </section>

      <div className="desktop-hero" style={{ maxWidth: 1080, margin: "0 auto 48px", padding: "0 28px" }}>
        <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 6, overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-v2.jpg"
            alt="Gudstjänst i Centrumkyrkan Malmö"
            width={1600}
            height={900}
            fetchPriority="high"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 42%", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(oklch(98.5% 0.006 90 / 1), oklch(98.5% 0.006 90 / 0.6) 14%, transparent 40%, transparent 78%, oklch(98.5% 0.006 90 / 0.22))",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 60px oklch(96.5% 0.01 95 / 0.35)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              margin: 0,
              fontFamily: "var(--font-lora), serif",
              fontSize: 28,
              fontWeight: 500,
              color: "oklch(99% 0.005 90)",
              textShadow: "0 2px 16px oklch(20% 0.02 50 / 0.5)",
              whiteSpace: "nowrap",
              animation: "heroTextBreathe 6s ease-in-out infinite",
            }}
          >
            Du är varmt välkommen!
          </p>
        </div>
      </div>

      {/* HERO (mobile) */}
      <section
        id="hero-mobile"
        className="mobile-hero"
        style={{ display: "none", position: "relative", minHeight: "88svh", flexDirection: "column", justifyContent: "space-between", scrollMarginTop: 88 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-v2.jpg"
          alt="Gudstjänst i Centrumkyrkan Malmö"
          width={1200}
          height={1500}
          fetchPriority="high"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(oklch(15% 0.02 50 / 0.25), oklch(15% 0.02 50 / 0.15) 40%, oklch(15% 0.02 50 / 0.35) 58%, oklch(15% 0.02 50 / 0.85))",
          }}
        />
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", padding: "0 24px", textAlign: "center", color: "oklch(99% 0.005 90)", marginTop: "16svh" }}>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(88% 0.06 145)",
                margin: "0 0 14px",
                textShadow: "0 2px 4px oklch(10% 0.02 50 / 0.9),0 2px 14px oklch(10% 0.02 50 / 0.9)",
              }}
            >
              Församlingen Centrumkyrkan Malmö
            </p>
            <h1
              className="mhero-h1"
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: 26,
                lineHeight: 1.2,
                fontWeight: 500,
                margin: 0,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                textShadow: "0 2px 16px oklch(15% 0.02 50 / 0.7)",
              }}
            >
              Vi följer Jesus tillsammans
            </h1>
          </div>
        </div>
        <div style={{ position: "relative", padding: "0 24px 44px", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href="#kalender"
              id="next-sunday-cta"
              style={{
                background: "oklch(98.5% 0.006 90)",
                color: "oklch(50% 0.06 145)",
                padding: "15px 30px",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 15.5,
              }}
            >
              Vad händer framöver?
            </a>
            {showPrayerCta && (
              <a
                href="#bonuppmaning"
                id="hero-cta-mobile"
                style={{
                  display: "inline-block",
                  background: "oklch(58% 0.14 45)",
                  border: "1px solid oklch(58% 0.14 45)",
                  color: "oklch(98.5% 0.006 90)",
                  padding: "12px 26px",
                  borderRadius: 100,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Centrumkyrkan ber
              </a>
            )}
            <div
              style={{
                background: "transparent",
                border: "1px solid oklch(98.5% 0.006 90)",
                borderRadius: 100,
                padding: "12px 22px 12px 26px",
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "oklch(98.5% 0.006 90)",
                }}
              >
                Senaste predikan
              </span>
              <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" aria-label="Lyssna på Spotify" style={{ display: "flex", color: "oklch(98.5% 0.006 90)" }}>
                <SpotifyIcon size={20} />
              </a>
              <a href={APPLE_PODCASTS_URL} target="_blank" rel="noopener noreferrer" aria-label="Lyssna på Apple Podcasts" style={{ display: "flex", color: "oklch(98.5% 0.006 90)" }}>
                <ApplePodcastsIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
