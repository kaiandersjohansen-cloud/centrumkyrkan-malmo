import type { Metadata } from "next";
import { Lora, Public_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const description =
  "Vi följer Jesus tillsammans. Församlingen Centrumkyrkan Malmö – gudstjänst söndagar kl 15:30.";

export const metadata: Metadata = {
  title: "Centrumkyrkan Malmö",
  description,
  openGraph: {
    type: "website",
    title: "Centrumkyrkan Malmö",
    description,
    url: "https://www.centrumkyrkanmalmo.se/",
    images: ["https://www.centrumkyrkanmalmo.se/images/hero-v2.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centrumkyrkan Malmö",
    description: "Vi följer Jesus tillsammans. Församlingen Centrumkyrkan Malmö.",
    images: ["https://www.centrumkyrkanmalmo.se/images/hero-v2.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${lora.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
