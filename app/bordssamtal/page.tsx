import type { Metadata } from "next";
import Bordssamtal from "@/components/bordssamtal/Bordssamtal";

export const metadata: Metadata = {
  title: "Bordssamtal – Centrumkyrkan Malmö",
  description: "Ett digitalt samtalsverktyg med frågor för att lära känna varandra bättre, utvecklat av Practicing The Way.",
};

export default function BordssamtalPage() {
  return <Bordssamtal />;
}
