import type { Metadata } from "next";
import { OG_BILDER, sidMetadata } from "@/lib/metadata";
import Bibelvers from "@/components/bibelvers/Bibelvers";

export const metadata: Metadata = sidMetadata({
  title: "Memorera bibelord – Centrumkyrkan Malmö",
  description: "Spara bibelverser som vändbara kort och lär dig dem utantill – i ordning eller slumpvis.",
  path: "/bibelvers",
  image: OG_BILDER.bibelvers,
});

export default function BibelversPage() {
  return <Bibelvers />;
}
