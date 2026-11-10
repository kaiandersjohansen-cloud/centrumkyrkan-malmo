import type { Metadata } from "next";
import { OG_BILDER, sidMetadata } from "@/lib/metadata";
import Skicka from "@/components/bonerummet/Skicka";

export const metadata: Metadata = sidMetadata({
  title: "Bönerummet – Centrumkyrkan Malmö",
  description: "Dela ett böneämne eller en tacksägelse, så ber vi tillsammans.",
  path: "/bonerummet",
  image: OG_BILDER.bonerummet,
  index: false,
});

export default function BonerummetPage() {
  return <Skicka />;
}
