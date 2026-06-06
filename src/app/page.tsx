import type { Metadata } from "next";
import { HomeLanding } from "@/components/home/home-landing";
import { TechnicalStatusBar } from "@/components/home/technical-status-bar";
import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";
import { SITE_IMAGES, SITE_NAME } from "@/lib/site-config";

const homeDescription =
  "Energy for a Developing Nation. Unitech Hydropower Company Limited — Upper Phawa Khola (5.8 MW) and Iwa Khola (15.0 MW) run-of-river hydropower in Nepal.";

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
  },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description: homeDescription,
    images: [{ url: SITE_IMAGES.heroHome, alt: "Unitech Hydropower — hydropower infrastructure" }],
  },
};

export default function Home() {
  return (
    <>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={SITE_IMAGES.heroHome}
        bgImageSrc={SITE_IMAGES.heroHome}
        title="Energy for a Developing Nation"
        scrollToExpand="SCROLL TO EXPAND"
        textBlend={true}
        mediaAlt="Unitech Hydropower — hydropower infrastructure"
        bgAlt="Unitech Hydropower Company Limited — run-of-river energy"
      />
      <TechnicalStatusBar postHero />
      <HomeLanding />
    </>
  );
}
