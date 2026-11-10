import type { Metadata } from "next";
import { sidMetadata } from "@/lib/metadata";
import Bordsbon from "@/components/bordsbon/Bordsbon";

export const metadata: Metadata = sidMetadata({
  title: "Vår nya bordsbön – Centrumkyrkan Malmö",
  description: "En bordsbön att lära sig utantill och be hemma kring matbordet – om liv, försörjning, tjänst och gemenskap.",
  path: "/bordsbon",
  image: "/images/bordsbon-card.png",
});

export default function BordsbonPage() {
  return <Bordsbon />;
}
