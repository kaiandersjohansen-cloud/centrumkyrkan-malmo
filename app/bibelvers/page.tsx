import type { Metadata } from "next";
import { sidMetadata } from "@/lib/metadata";
import Bibelvers from "@/components/bibelvers/Bibelvers";

export const metadata: Metadata = sidMetadata({
  title: "Memorera bibelord – Centrumkyrkan Malmö",
  description: "Spara bibelverser som vändbara kort och lär dig dem utantill – i ordning eller slumpvis.",
  path: "/bibelvers",
  image: "/images/bibelvers-card.jpg",
});

export default function BibelversPage() {
  return <Bibelvers />;
}
