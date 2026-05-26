import type { Metadata } from "next";
import { InfrastructurePortfolio } from "@/components/projects/infrastructure-portfolio";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Our projects — Upper Phawa Khola (5.8 MW) operational asset and Iwa Khola (15 MW) feasibility-stage development across Taplejung and Panchthar, eastern Nepal.",
};

export default function ProjectsPage() {
  return <InfrastructurePortfolio />;
}
