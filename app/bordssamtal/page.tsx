import type { Metadata } from "next";
import { OG_BILDER, sidMetadata } from "@/lib/metadata";
import Bordssamtal from "@/components/bordssamtal/Bordssamtal";

export const metadata: Metadata = sidMetadata({
  title: "Bordssamtal – Centrumkyrkan Malmö",
  description: "Ett digitalt samtalsverktyg med frågor för att lära känna varandra bättre, utvecklat av Practicing The Way.",
  path: "/bordssamtal",
  image: OG_BILDER.bordssamtal,
});

export default function BordssamtalPage() {
  return <Bordssamtal />;
}
