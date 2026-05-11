import type { Metadata } from "next";
import { HomeLanding } from "@/components/home/home-landing";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Unitech Hydropower Company Limited — precision-engineered hydropower for Nepal: Upper Phawa Khola (5.8 MW) and Middle Iwa Khola (15 MW) development.",
};

export default function Home() {
  return <HomeLanding />;
}
