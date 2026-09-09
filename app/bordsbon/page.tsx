import type { Metadata } from "next";
import Bordsbon from "@/components/bordsbon/Bordsbon";

export const metadata: Metadata = {
  title: "Vår nya bordsbön – Centrumkyrkan Malmö",
  description: "En bordsbön att lära sig utantill och be hemma kring matbordet – om liv, försörjning, tjänst och gemenskap.",
};

export default function BordsbonPage() {
  return <Bordsbon />;
}
