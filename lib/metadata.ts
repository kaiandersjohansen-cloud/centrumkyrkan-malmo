import type { Metadata } from "next";

// Bilder för länkförhandsvisning. Bredd och höjd behövs för att Facebook och
// Messenger ska visa bilden direkt första gången en länk delas.
export const OG_BILDER = {
  hero: { url: "/images/hero-v2.jpg", width: 1600, height: 1200, alt: "Gudstjänst i Centrumkyrkan Malmö" },
  bibelvers: { url: "/images/bibelvers-card.jpg", width: 1600, height: 900, alt: "Memorera bibelord" },
  bordsbon: { url: "/images/bordsbon-card.png", width: 816, height: 410, alt: "Vår nya bordsbön" },
  bordssamtal: { url: "/images/bordssamtal-hero.png", width: 1672, height: 941, alt: "Bordssamtal" },
  samtalskort: { url: "/images/samtalskort-card.png", width: 1162, height: 486, alt: "Samtalskort för barnfamiljer" },
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
