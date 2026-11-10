import type { Metadata } from "next";
import { sidMetadata } from "@/lib/metadata";
import Bordssamtal from "@/components/bordssamtal/Bordssamtal";

export const metadata: Metadata = sidMetadata({
  title: "Bordssamtal – Centrumkyrkan Malmö",
  description: "Ett digitalt samtalsverktyg med frågor för att lära känna varandra bättre, utvecklat av Practicing The Way.",
  path: "/bordssamtal",
  image: "/images/bordssamtal-hero.png",
});

export default function BordssamtalPage() {
  return <Bordssamtal />;
}
