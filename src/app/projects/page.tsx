import type { Metadata } from "next";
import {
  IwaTechnicalDetails,
  UpperPhawaTechnicalDetails,
} from "@/components/projects/project-technical-details";
import type { GallerySlide } from "@/components/ui/project-card-asymmetric";
import { PageShell } from "@/components/page-shell";
import { ProjectCardAsymmetric } from "@/components/ui/project-card-asymmetric";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Upper Phawa Khola (5.8 MW) operational asset and Iwa Khola (15 MW) feasibility-stage development — Unitech Hydropower Company Limited.",
};

const HERO_POWERHOUSE =
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=80";

const upperPhawaGallery: GallerySlide[] = [
  {
    src: "/dam2.jpg",
    alt: "Upper Phawa Khola — headworks and reservoir reach",
  },
  {
    src: "/images/iwa-khola-operational.jpg",
    alt: "Upper Phawa Khola — operational site context",
  },
  {
    src: "/dam.jpg",
    alt: "Upper Phawa Khola — civil works and river corridor",
  },
  {
    src: "/images/nepal-glacier-river.jpg",
    alt: "Upper Phawa Khola — high-altitude hydrology context",
  },
];

const iwaGallery: GallerySlide[] = [
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=80",
    alt: "Iwa Khola — feasibility-stage landscape",
  },
  {
    src: "/dam2.jpg",
    alt: "Iwa Khola — reference hydropower civil layout",
  },
  {
    src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=80",
    alt: "Iwa Khola — engineering and infrastructure context",
  },
];

const upperPhawaNarrative = (
  <div className="w-full space-y-5 text-left text-base leading-relaxed text-brand-slate/90 md:text-[17px] md:leading-8">
    <p>
      The <strong className="text-brand-blue">Upper Phawa Khola Hydroelectric Project (5.8 MW)</strong> is a
      run-of-river scheme on <strong className="text-brand-blue">Phawa Khola</strong> in{" "}
      <strong className="text-brand-blue">Pathivara Yangbarak, Dumrise Shrijangha, and Sikaicha</strong>, Taplejung.
      The asset is <strong className="text-brand-blue">operational</strong> with{" "}
      <strong className="text-brand-blue">commercial operation (COD) on BS 2081/01/08</strong>, following a{" "}
      <strong className="text-brand-blue">PPA dated BS 2074/11/11</strong>. Design discharge is{" "}
      <strong className="text-brand-blue">2.6 m³/s</strong> with a{" "}
      <strong className="text-brand-blue">gross head of 270 m</strong> (net{" "}
      <strong className="text-brand-blue">260.1 m</strong>), and the scheme delivers{" "}
      <strong className="text-brand-blue">33.05 GWh</strong> annual energy under the PPA split (
      <strong className="text-brand-blue">10.00 GWh</strong> dry season and{" "}
      <strong className="text-brand-blue">23.05 GWh</strong> wet season, per company materials).
    </p>
    <p>
      The project area lies near <strong className="text-brand-blue">Phungling Bazaar</strong> (Taplejung
      headquarters), with access by roughly <strong className="text-brand-blue">20 km</strong> of earthen road
      east from Phungling. Civil works span <strong className="text-brand-blue">Sikaicha and Dumrise</strong>{" "}
      (legacy VDC naming), with headworks at <strong className="text-brand-blue">Ose Dobhan</strong> and a
      surface powerhouse near Dumrise. Intake sits at about <strong className="text-brand-blue">1,185 masl</strong>{" "}
      and the powerhouse at about <strong className="text-brand-blue">915 masl</strong>, with roughly{" "}
      <strong className="text-brand-blue">4.5 km</strong> of water conveyance and the headrace alignment on
      the <strong className="text-brand-blue">left bank</strong> of Phawa Khola.
    </p>
    <p>
      The layout includes a weir, twin intakes, desanding and headpond,{" "}
      <strong className="text-brand-blue">4,357 m</strong> of headrace pipe, surge tank, penstock, and a{" "}
      <strong className="text-brand-blue">surface powerhouse</strong> with{" "}
      <strong className="text-brand-blue">2 × Pelton</strong> units. Total alignment is about{" "}
      <strong className="text-brand-blue">5 km</strong>, with export via{" "}
      <strong className="text-brand-blue">Amarpur substation</strong> on an{" "}
      <strong className="text-brand-blue">8 km, 33 kV</strong> link. Planning materials cite about{" "}
      <strong className="text-brand-blue">NPR 19.46 crore per year</strong> revenue with{" "}
      <strong className="text-brand-blue">3% escalation for eight years</strong>—verify against the current
      PPA tariff schedule for any public or investment use.
    </p>
  </div>
);

const iwaPipelineNarrative = (
  <div className="w-full space-y-5 text-left text-base leading-relaxed text-brand-slate/90 md:text-[17px] md:leading-8">
    <p>
      The Iwa Khola Hydropower Project (15.0 MW) is a feasibility-stage run-of-river hydropower
      project being developed under Unitech Hydropower Company Limited, with planned execution
      through Unitech Iwa Hydro Energy Pvt. Ltd., in which the company holds a{" "}
      <strong className="text-brand-blue">51%</strong> ownership. The project is currently
      progressing through feasibility study and IEE Terms of Reference (ToR) preparation, while the
      PPA (Connection Agreement) process is underway.
    </p>
    <p>
      The project is located in <strong className="text-brand-blue">Taplejung and Panchthar</strong>{" "}
      districts and is designed with a gross head of <strong className="text-brand-blue">400.10</strong>{" "}
      meters and a design discharge of <strong className="text-brand-blue">4.36 m³/s</strong>. The
      major structural components include a <strong className="text-brand-blue">4,382-meter</strong>{" "}
      headrace tunnel, <strong className="text-brand-blue">503-meter</strong> headrace pipe,{" "}
      <strong className="text-brand-blue">210-meter</strong> adit tunnel, and a{" "}
      <strong className="text-brand-blue">750-meter</strong> penstock, with a Vertical Pelton turbine
      system and a <strong className="text-brand-blue">132 kV</strong> transmission line spanning{" "}
      <strong className="text-brand-blue">22 km</strong>.
    </p>
    <p>
      The project is expected to generate <strong className="text-brand-blue">26.26 GWh</strong> of dry
      energy (31.8%) and <strong className="text-brand-blue">60.67 GWh</strong> of wet energy (68.2%),
      with an estimated first-year revenue of <strong className="text-brand-blue">NPR 51.15 crores</strong>.
      The total feasibility-level project cost is estimated at{" "}
      <strong className="text-brand-blue">NPR 336.7 crores</strong>, with a cost per MW of{" "}
      <strong className="text-brand-blue">NPR 22.44 crores</strong>. The project has a planned construction
      period of <strong className="text-brand-blue">3 years</strong> and is financially evaluated with an
      IRR of <strong className="text-brand-blue">13.22%</strong> and a Benefit-Cost (BC) ratio of{" "}
      <strong className="text-brand-blue">1.56</strong>, indicating strong development potential.
    </p>
  </div>
);

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
        gallerySlides={upperPhawaGallery}
        location="Pathivara Yangbarak & Shrijangha, Taplejung"
        factSheetItems={[
          { label: "Project type", value: "5.8 MW ROR" },
          { label: "PPA date (BS)", value: "2074/11/11" },
          { label: "COD (BS)", value: "2081/01/08" },
          { label: "Gross head", value: "270 m (net 260.1 m)" },
          { label: "Total alignment", value: "5.0 km" },
          { label: "Annual energy", value: "33.05 GWh" },
          { label: "Annual revenue", value: "NPR 19.46 Cr/year" },
          { label: "Connectivity", value: "Amarpur Substation (8 km / 33 kV)" },
        ]}
        achievements={[
          { label: "Design discharge", value: "2.6 m³/s" },
          { label: "Turbine", value: "2 × Pelton" },
          { label: "Interconnection", value: "8 km, 33 kV" },
        ]}
        afterAchievements={upperPhawaNarrative}
        className="-mx-2 px-2 md:-mx-0 md:px-0"
      />

      <section
        aria-labelledby="upper-phawa-technical"
        className="mt-14 border-t border-slate-200/70 pt-14 md:mt-16 md:pt-16"
      >
        <UpperPhawaTechnicalDetails />
      </section>

      <ProjectCardAsymmetric
        statusLabel="Project under detailed study"
        statusBelowTitle
        title="Iwa Khola (15.0 MW)"
        gallerySlides={iwaGallery}
        location="Taplejung and Panchthar districts"
        factSheetItems={[
          { label: "Capacity", value: "15.0 MW" },
          { label: "Ownership", value: "51% (Unitech Hydropower)" },
          { label: "SPV (planned)", value: "Unitech Iwa Hydro Energy Pvt. Ltd." },
          { label: "Gross head", value: "400.10 m" },
          { label: "Design discharge", value: "4.36 m³/s" },
          { label: "Transmission", value: "132 kV, 22 km" },
          { label: "First-year revenue (est.)", value: "NPR 51.15 Cr" },
          { label: "Construction period (plan)", value: "3 years" },
        ]}
        achievements={[
          { label: "Headrace tunnel", value: "4,382 m" },
          { label: "Headrace pipe + penstock", value: "503 m + 750 m" },
          { label: "Feasibility indicators", value: "IRR 13.22% · B/C 1.56" },
        ]}
        afterAchievements={iwaPipelineNarrative}
        className="-mx-2 border-t border-slate-200/60 px-2 pt-6 md:-mx-0 md:px-0 md:pt-10"
      />

      <section
        aria-labelledby="iwa-technical"
        className="mt-14 border-t border-slate-200/70 pt-14 md:mt-16 md:pt-16"
      >
        <IwaTechnicalDetails />
      </section>
    </PageShell>
  );
}
