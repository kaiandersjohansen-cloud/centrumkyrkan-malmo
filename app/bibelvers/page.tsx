import type { Metadata } from "next";
import Bibelvers from "@/components/bibelvers/Bibelvers";

export const metadata: Metadata = {
  title: "Memorera bibelord – Centrumkyrkan Malmö",
  description: "Spara bibelverser som vändbara kort och lär dig dem utantill – i ordning eller slumpvis.",
};

export default function BibelversPage() {
  return <Bibelvers />;
}
