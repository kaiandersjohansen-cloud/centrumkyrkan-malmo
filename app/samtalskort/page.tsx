import type { Metadata } from "next";
import { sidMetadata } from "@/lib/metadata";
import Samtalskort from "@/components/samtalskort/Samtalskort";

export const metadata: Metadata = sidMetadata({
  title: "Samtalskort för barnfamiljer – Centrumkyrkan Malmö",
  description: "Tio samtalskort med bibelord, en praktik och en samtalsfråga – för matbordet med barnen.",
  path: "/samtalskort",
  image: "/images/samtalskort-card.png",
});

export default function SamtalskortPage() {
  return <Samtalskort />;
}
