import type { Metadata } from "next";
import { OG_BILDER, sidMetadata } from "@/lib/metadata";
import Vagg from "@/components/bonerummet/Vagg";

export const metadata: Metadata = sidMetadata({
  title: "Bönerummet – väggen – Centrumkyrkan Malmö",
  description: "Böneämnen och tacksägelser som vi bär tillsammans.",
  path: "/bonerummet/vaggen",
  image: OG_BILDER.bonerummetVaggen,
  index: false,
});

export default function VaggenPage() {
  return <Vagg />;
}
