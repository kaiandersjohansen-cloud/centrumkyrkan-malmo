import type { Metadata } from "next";
import Vagg from "@/components/bonerummet/Vagg";

export const metadata: Metadata = {
  title: "Bönerummet – väggen – Centrumkyrkan Malmö",
  description: "Böneämnen och tacksägelser som vi bär tillsammans.",
  robots: { index: false, follow: false },
};

export default function VaggenPage() {
  return <Vagg />;
}
