import type { Metadata } from "next";
import { HomeLanding } from "@/components/home/home-landing";
import { TechnicalStatusBar } from "@/components/home/technical-status-bar";
import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";

export const metadata: Metadata = {
  title: {
    absolute: "Unitech Hydropower Company Limited",
  },
  description:
    "Energy for a Developing Nation. Unitech Hydropower Company Limited — Upper Phawa Khola (5.8 MW) and Iwa Khola (15.0 MW) run-of-river hydropower.",
  openGraph: {
    title: "Unitech Hydropower Company Limited",
    description:
      "Energy for a Developing Nation. Clean, renewable run-of-river hydropower in Nepal.",
  },
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
        mediaAlt="Upper Phawa Khola — Unitech Hydropower Company Limited"
        bgAlt="Run-of-river hydropower — Unitech Hydropower Company Limited"
      />
      <TechnicalStatusBar postHero />
      <HomeLanding />
    </>
  );
}
