import type { Metadata } from "next";
import Skicka from "@/components/bonerummet/Skicka";

export const metadata: Metadata = {
  title: "Bönerummet – Centrumkyrkan Malmö",
  description: "Dela ett böneämne eller en tacksägelse, så ber vi tillsammans.",
  robots: { index: false, follow: false },
};

export default function BonerummetPage() {
  return <Skicka />;
}
