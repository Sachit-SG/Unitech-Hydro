import type { Metadata } from "next";
import { HomeLanding } from "@/components/home/home-landing";
import { TechnicalStatusBar } from "@/components/home/technical-status-bar";
import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Energy for a Developing Nation. Unitech Hydropower Company Limited — Upper Phawa Khola (5.8 MW) and Middle Iwa Khola (15 MW) run-of-river hydropower.",
};

export default function Home() {
  return (
    <>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/dam2.jpg"
        bgImageSrc="/dam2.jpg"
        title="Energy for a Developing Nation"
        scrollToExpand="SCROLL TO EXPAND"
        textBlend={true}
        mediaAlt="Hydropower dam — hero focal image"
        bgAlt="Hydropower dam — wide background"
      />
      <TechnicalStatusBar postHero />
      <HomeLanding />
    </>
  );
}
