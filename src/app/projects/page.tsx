import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectCardAsymmetric } from "@/components/ui/project-card-asymmetric";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Upper Phawa Khola (5.8 MW) operational asset and Middle Iwa Khola (15 MW) development — Unitech Hydropower Company Limited.",
};

const HERO_POWERHOUSE =
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=80";

/** Cinematic wide shot */
const UPPER_MAIN = "/dam2.jpg";
/** Supporting image beside main hero */
const UPPER_SIDE = "/images/iwa-khola-operational.jpg";

/** Main wide shot; side stack uses a distinct engineering / site image. */
const MIDDLE_MAIN =
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=80";
const MIDDLE_SIDE =
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80";

export default function ProjectsPage() {
  return (
    <PageShell
      title="Our Projects"
      heroImageSrc={HERO_POWERHOUSE}
      heroOverlayClassName="bg-black/55"
      heroPriority
    >
      <ProjectCardAsymmetric
        title="Upper Phawa Khola (5.8 MW)"
        mainImageSrc={UPPER_MAIN}
        mainImageAlt="Upper Phawa Khola — project site and headworks"
        sideImageSrc={UPPER_SIDE}
        sideImageAlt="Upper Phawa Khola — operational detail"
        location="Taplejung District, Nepal — Pathivara Yangbarak, Dumrise Shrijangha, and Sikaicha (per company disclosures)."
        factSheetItems={[
          { label: "CAPACITY", value: "5.8 MW" },
          { label: "COD", value: "BS 2081/01/08" },
          { label: "TURBINE", value: "2 × Pelton" },
        ]}
        achievements={[
          {
            label: "Transmission line",
            value: "8 km, 33 kV",
          },
          {
            label: "Connectivity",
            value: "Amarpur Substation",
          },
          {
            label: "National contribution",
            value: "5.8 MW",
          },
        ]}
        className="-mx-2 px-2 md:-mx-0 md:px-0"
      />

      <ProjectCardAsymmetric
        statusLabel="In pipeline"
        title="Middle Iwa Khola (15 MW)"
        mainImageSrc={MIDDLE_MAIN}
        mainImageAlt="Middle Iwa Khola — project landscape and infrastructure"
        sideImageSrc={MIDDLE_SIDE}
        sideImageAlt="Middle Iwa Khola — feasibility-stage engineering context"
        location="Taplejung and Panchthar (per company disclosures)."
        factSheetItems={[
          { label: "CAPACITY", value: "15 MW" },
          { label: "OWNERSHIP", value: "51%" },
          { label: "TRANSMISSION", value: "~22 km, 132 kV" },
        ]}
        achievements={[
          { label: "Gross head", value: "400.10 m" },
          { label: "Design discharge", value: "4.36 m³/s" },
          {
            label: "First-year revenue (est.)",
            value: "NPR 51.15 Cr",
          },
        ]}
        className="-mx-2 border-t border-slate-200/60 px-2 pt-6 md:-mx-0 md:px-0 md:pt-10"
      />
    </PageShell>
  );
}
