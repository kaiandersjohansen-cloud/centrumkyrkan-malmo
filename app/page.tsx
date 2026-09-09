import Header from "@/components/Header";
import InfoBanner from "@/components/InfoBanner";
import Hero from "@/components/Hero";
import BonuppmaningSection from "@/components/BonuppmaningSection";
import GudstjanstSection from "@/components/GudstjanstSection";
import AktuelltSection from "@/components/AktuelltSection";
import ReflektionSection from "@/components/ReflektionSection";
import VagenSection from "@/components/VagenSection";
import LivsrytmSection from "@/components/LivsrytmSection";
import KalenderSection from "@/components/KalenderSection";
import BarnSection from "@/components/BarnSection";
import OmOssSection from "@/components/OmOssSection";
import KontaktSection from "@/components/KontaktSection";
import MediaSection from "@/components/MediaSection";
import Footer from "@/components/Footer";
import { PRAYER_RELAY_EXPIRES, isExpired } from "@/lib/dates";

export default function Home() {
  const showPrayerCampaign = !isExpired(PRAYER_RELAY_EXPIRES);

  return (
    <>
      <Header />
      <InfoBanner />
      <main id="main-content" style={{ scrollMarginTop: 88 }}>
        <Hero showPrayerCta={showPrayerCampaign} />
        {showPrayerCampaign && <BonuppmaningSection />}
        <GudstjanstSection />
        <AktuelltSection />
        <ReflektionSection />
        <VagenSection />
        <LivsrytmSection />
        <KalenderSection />
        <BarnSection />
        <OmOssSection />
        <KontaktSection />
        <MediaSection />
      </main>
      <Footer />
    </>
  );
}
