import type { Metadata } from "next";
import Samtalskort from "@/components/samtalskort/Samtalskort";

export const metadata: Metadata = {
  title: "Samtalskort för barnfamiljer – Centrumkyrkan Malmö",
  description: "Tio samtalskort med bibelord, en praktik och en samtalsfråga – för matbordet med barnen.",
};

export default function SamtalskortPage() {
  return <Samtalskort />;
}
