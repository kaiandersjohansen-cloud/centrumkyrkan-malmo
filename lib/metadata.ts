import type { Metadata } from "next";

// Bilder för länkförhandsvisning. Bredd och höjd behövs för att Facebook och
// Messenger ska visa bilden direkt första gången en länk delas.
export const OG_BILDER = {
  hero: { url: "/images/hero-v2.jpg", width: 1600, height: 1200, alt: "Gudstjänst i Centrumkyrkan Malmö" },
  bonerummet: { url: "/images/og/bonerummet.jpg", width: 1200, height: 630, alt: "Bönerummet – Centrumkyrkan Malmö" },
  bonerummetVaggen: { url: "/images/og/bonerummet-vaggen.jpg", width: 1200, height: 630, alt: "Bönerummet – väggen" },
  bibelvers: { url: "/images/og/bibelvers.jpg", width: 1200, height: 630, alt: "Memorera bibelord" },
  bordsbon: { url: "/images/og/bordsbon.jpg", width: 1200, height: 630, alt: "Vår bordsbön" },
  bordssamtal: { url: "/images/og/bordssamtal.jpg", width: 1200, height: 630, alt: "Bordssamtal" },
  samtalskort: { url: "/images/og/samtalskort.jpg", width: 1200, height: 630, alt: "Samtalskort för barnfamiljer" },
};

type OgBild = (typeof OG_BILDER)[keyof typeof OG_BILDER];

// Metadata för en undersida. Varje sida måste ha sin egen og:url, annars
// skickar t.ex. Messenger och Facebook vidare länken till startsidan.
export function sidMetadata({
  title,
  description,
  path,
  image = OG_BILDER.hero,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: OgBild;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", title, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(index ? {} : { robots: { index: false, follow: false } }),
  };
}
