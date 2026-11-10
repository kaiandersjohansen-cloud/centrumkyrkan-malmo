import type { Metadata } from "next";

// Metadata för en undersida. Varje sida måste ha sin egen og:url, annars
// skickar t.ex. Messenger och Facebook vidare länken till startsidan.
export function sidMetadata({
  title,
  description,
  path,
  image = "/images/hero-v2.jpg",
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
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
