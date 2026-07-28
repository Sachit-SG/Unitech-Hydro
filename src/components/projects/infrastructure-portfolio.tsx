"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  CircleDollarSign,
  type LucideIcon,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import type { GalleryDetailImage } from "@/lib/gallery-data";
import {
  getProjectGalleryHref,
  getProjectGalleryImages,
  getProjectGalleryStills,
} from "@/lib/gallery-data";
import type { SpecRow } from "@/lib/project-technical-data";
import { iwaSalientRows } from "@/lib/project-technical-data";
import { SITE_IMAGES } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

const UPPER_GALLERY = getProjectGalleryStills("upper-phawa-khola", 3);

const IWA_GALLERY = getProjectGalleryStills("middle-iwa-khola", 3);

const upperPhawaCivilRows: SpecRow[] = [
  { particular: "Weir", feature: "15 m length, free-flow weir" },
  { particular: "Intake", feature: "2 orifice intakes" },
  {
    particular: "Approach canal",
    feature: "RCC rectangular 40 m (approx. 2.6 × 1.33 m)",
  },
  {
    particular: "Desanding basin and headpond",
    feature: "2 bays (42 m × 4.3 m × 3.42 m)",
  },
  {
    particular: "Headrace pipe",
    feature: "4,357 m; diameter 1.4 m to 1.2 m",
  },
  { particular: "Surge tank", feature: "37.7 m height; 3 m diameter" },
  {
    particular: "Penstock",
    feature: "461 m; 1.1 m diameter; 8–16 mm thickness",
  },
  { particular: "Powerhouse", feature: "Surface powerhouse at Dumrise" },
  { particular: "Tailrace canal", feature: "60 m" },
  { particular: "Total alignment", feature: "~5 km" },
];

const upperPhawaElectroRows: SpecRow[] = [
  { particular: "Design discharge", feature: "2.6 m³/s" },
  { particular: "Turbine units", feature: "2 × Pelton" },
  { particular: "Powerhouse type", feature: "Surface" },
  {
    particular: "Grid interconnection",
    feature: "Amarpur substation — 8 km, 33 kV (33/132 kV)",
  },
  { particular: "Connection point", feature: "Amarpur substation (132/33 kV)" },
];

const upperPhawaFinancialRows: SpecRow[] = [
  { particular: "PPA date (BS)", feature: "2074/11/11" },
  { particular: "Commercial operation (COD)", feature: "2081/01/08" },
  { particular: "PPA annual energy", feature: "33.05 GWh" },
  {
    particular: "Dry season energy",
    feature: "10.00 GWh (~30.27% of annual PPA energy)",
  },
  {
    particular: "Wet season energy",
    feature: "23.05 GWh (~69.73% of annual PPA energy)",
  },
  {
    particular: "Revenue (planning / model)",
    feature: "NPR 19.46 crore/year; 3% escalation for 8 years",
  },
];

const iwaEngineeringRows: SpecRow[] = iwaSalientRows.filter((row) =>
  [
    "Capacity",
    "Districts",
    "Gross head",
    "Design discharge",
    "Conveyance",
    "Turbine technology",
    "Transmission",
    "Energy mix (feasibility)",
    "Status",
  ].includes(row.particular)
);

const iwaInvestmentRows: SpecRow[] = iwaSalientRows.filter((row) =>
  [
    "Ownership / execution",
    "First-year revenue (estimate)",
    "Feasibility-level project cost",
    "Construction period (plan)",
    "Indicative returns (feasibility)",
  ].includes(row.particular)
);

type BentoStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const upperPhawaStats: BentoStat[] = [
  { label: "Capacity", value: "5.8 MW", icon: Zap },
  { label: "Gross Head", value: "270 m", icon: ArrowDown },
  { label: "Annual Energy", value: "33.05 GWh", icon: Activity },
  { label: "Revenue", value: "NPR 19.46 Cr/yr", icon: CircleDollarSign },
];

const iwaStats: BentoStat[] = [
  { label: "Capacity", value: "15.0 MW", icon: Zap },
  { label: "Gross Head", value: "400.10 m", icon: ArrowDown },
  { label: "Est. Revenue", value: "51.15 Cr", icon: CircleDollarSign },
  { label: "IRR", value: "13.22%", icon: Activity },
];

function StatRail({ stats }: { stats: BentoStat[] }) {
  return (
    <Reveal className="mt-8 w-full">
      <div className="grid w-full grid-cols-2 divide-x divide-y divide-[#0A3A63]/8 overflow-hidden rounded-[4px] border border-[#0A3A63]/10 bg-white sm:grid-cols-4 sm:divide-y-0">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-3 px-5 py-5">
              <Icon className="h-4 w-4 shrink-0 text-[#22D3EE]" strokeWidth={1.75} aria-hidden />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-lg font-bold tabular-nums text-[#0A3A63] sm:text-xl">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

function AsymmetricGallery({
  images,
  galleryHref,
}: {
  images: readonly { src: string; alt: string }[];
  galleryHref: string;
}) {
  const [main, ...stacked] = images;

  const linkClassName =
    "group relative block overflow-hidden rounded-xl ring-1 ring-[#0A3A63]/10 transition-[box-shadow,ring-color] hover:ring-[#22D3EE]/40 hover:shadow-lg hover:shadow-[#0A3A63]/10";

  return (
    <Reveal className="mt-12">
      <div className="grid h-auto grid-cols-1 gap-4 md:h-[400px] md:grid-cols-3">
        <Link
          href={galleryHref}
          className={cn(linkClassName, "min-h-[240px] md:col-span-2 md:min-h-0 md:h-full")}
          aria-label="Open project photo gallery"
        >
          <Image
            src={main.src}
            alt={main.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 768px) 66vw, 100vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25"
            aria-hidden
          />
          <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#0A3A63] opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
            View gallery
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </Link>
        <div className="flex h-auto flex-col gap-4 md:h-full">
          {stacked.map((img) => (
            <Link
              key={img.src}
              href={galleryHref}
              className={cn(linkClassName, "min-h-[180px] flex-1 md:min-h-0")}
              aria-label="Open project photo gallery"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectGalleryPanel({
  images,
  galleryHref,
}: {
  images: GalleryDetailImage[];
  galleryHref: string;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <Link
            key={img.src}
            href={galleryHref}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-[#0A3A63]/10 transition-[box-shadow,ring-color] hover:ring-[#22D3EE]/40 hover:shadow-md"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 20vw, 33vw"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#22D3EE]">
                {img.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={galleryHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A3A63] underline-offset-4 hover:text-[#0E9FB8] hover:underline"
      >
        Open full project gallery
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[4px] border border-[#0A3A63]/10 bg-white">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.particular}
              className={cn(
                "border-b border-slate-100 last:border-0",
                index % 2 === 1 && "bg-[#0A3A63]/[0.02]"
              )}
            >
              <th
                scope="row"
                className="w-[34%] px-5 py-3.5 text-left align-top text-sm font-medium text-[#0A3A63]"
              >
                {row.particular}
              </th>
              <td className="px-5 py-3.5 align-top text-sm leading-relaxed tabular-nums text-slate-600">
                {row.feature}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectTabs({
  defaultValue,
  tabs,
  galleryId,
}: {
  defaultValue: string;
  tabs: { value: string; label: string; rows: SpecRow[] }[];
  galleryId?: string;
}) {
  const galleryImages = galleryId ? getProjectGalleryImages(galleryId) : undefined;
  const galleryHref = galleryId ? getProjectGalleryHref(galleryId) : "";

  const triggerClassName =
    "flex-1 rounded-none border-b-2 border-transparent bg-transparent px-1 py-3 text-slate-500 shadow-none hover:text-[#0A3A63] data-[state=active]:border-[#22D3EE] data-[state=active]:bg-transparent data-[state=active]:text-[#0A3A63] data-[state=active]:shadow-none sm:flex-none";

  return (
    <Reveal className="mt-8">
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-6 rounded-none border-0 border-b border-[#0A3A63]/12 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className={triggerClassName}>
              {tab.label}
            </TabsTrigger>
          ))}
          {galleryImages ? (
            <TabsTrigger value="gallery" className={triggerClassName}>
              Gallery
            </TabsTrigger>
          ) : null}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <SpecTable rows={tab.rows} />
          </TabsContent>
        ))}
        {galleryImages ? (
          <TabsContent value="gallery">
            <ProjectGalleryPanel images={galleryImages} galleryHref={galleryHref} />
          </TabsContent>
        ) : null}
      </Tabs>
    </Reveal>
  );
}

function ProjectBlock({
  title,
  badge,
  badgeClassName,
  stats,
  gallery,
  narrative,
  tabs,
  tabsDefault,
  galleryId,
  embedded = false,
}: {
  title: string;
  badge: React.ReactNode;
  badgeClassName?: string;
  stats: BentoStat[];
  gallery: readonly { src: string; alt: string }[];
  narrative: string;
  tabs: { value: string; label: string; rows: SpecRow[] }[];
  tabsDefault: string;
  galleryId: string;
  embedded?: boolean;
}) {
  return (
    <section
      className={cn(
        "mx-auto max-w-[1440px] px-6 md:px-12",
        embedded ? "py-10 md:py-12" : "py-16 md:py-20"
      )}
    >
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-[#0A3A63] lg:text-5xl">{title}</h2>
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
              badgeClassName
            )}
          >
            {badge}
          </span>
        </div>
      </Reveal>

      <StatRail stats={stats} />
      <AsymmetricGallery
        images={gallery}
        galleryHref={getProjectGalleryHref(galleryId)}
      />

      <Reveal className="mt-12 w-full">
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-slate-700">{narrative}</p>
      </Reveal>

      <ProjectTabs defaultValue={tabsDefault} tabs={tabs} galleryId={galleryId} />
    </section>
  );
}

const STICKY_TOP = "top-20 md:top-24";

function StickyFirstProject({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 pt-10 md:pt-16">
      <div className={cn("sticky z-10", STICKY_TOP)}>{children}</div>
    </div>
  );
}

function SlideUpSecondProject({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.32"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.82, 0.94, 1]);

  return (
    <section ref={containerRef} className="relative -mt-2 md:-mt-6">
      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className={cn("sticky z-20 pb-16 md:pb-20", STICKY_TOP)}
      >
        <div
          className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-[#eef4f8] to-[#e2ecf4]"
          aria-hidden
        />
        {children}
      </motion.div>
    </section>
  );
}

export function InfrastructurePortfolio() {
  return (
    <div className="bg-gradient-to-b from-[#e8eef5] via-[#f4f8fb] to-[#eef4f8]">
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <Image
          src={SITE_IMAGES.pageHero}
          alt=""
          role="presentation"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black/40"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 font-heading text-5xl font-bold tracking-tight text-white md:text-6xl"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mx-auto max-w-3xl text-lg text-slate-200 md:text-xl"
          >
            20.8 MW of sustainable energy infrastructure across eastern Nepal.
          </motion.p>
        </div>
      </section>

      <StickyFirstProject>
        <ProjectBlock
          embedded
          title="Upper Phawa Khola (5.8 MW)"
          badge="Operational Asset (COD: 2081/01/08)"
          badgeClassName="border-[#22D3EE]/20 bg-[#22D3EE]/10 text-[#0E9FB8]"
          stats={upperPhawaStats}
          gallery={UPPER_GALLERY}
          galleryId="upper-phawa-khola"
          narrative="The Upper Phawa Khola Hydroelectric Project is a run-of-river scheme on Phawa Khola in Pathivara Yangbarak, Dumrise Shrijangha, and Sikaicha, Taplejung. The asset reached commercial operation on BS 2081/01/08 following a PPA dated BS 2074/11/11. Design discharge is 2.6 m³/s with a gross head of 270 m (net 260.1 m), delivering 33.05 GWh annual energy under the contracted dry and wet season split. Civil works span the left bank of Phawa Khola from intake near Ose Dobhan to a surface powerhouse at Dumrise, with export to Amarpur substation on an 8 km, 33 kV link."
          tabsDefault="civil"
          tabs={[
            { value: "civil", label: "Civil Structures", rows: upperPhawaCivilRows },
            { value: "electro", label: "Electro-Mechanical", rows: upperPhawaElectroRows },
            { value: "financials", label: "Financials", rows: upperPhawaFinancialRows },
          ]}
        />
      </StickyFirstProject>

      <SlideUpSecondProject>
        <ProjectBlock
          embedded
          title="Iwa Khola (15.0 MW)"
          badge="Under Detailed Study"
          badgeClassName="border-amber-500/20 bg-amber-500/10 text-amber-700"
          stats={iwaStats}
          gallery={IWA_GALLERY}
          galleryId="middle-iwa-khola"
          narrative="The Iwa Khola Hydropower Project is a feasibility-stage run-of-river development in Taplejung and Panchthar districts, planned for execution through Unitech Iwa Hydro Energy Pvt. Ltd., with Unitech Hydropower Company Limited holding a 51% ownership stake. The scheme is designed with a gross head of 400.10 m and design discharge of 4.36 m³/s, combining a 4,382 m headrace tunnel, headrace pipe, adit tunnel, and penstock with a vertical Pelton turbine and a 132 kV transmission line spanning 22 km. Feasibility materials indicate NPR 336.7 crore total project cost, NPR 51.15 crore first-year revenue, IRR 13.22%, and a benefit–cost ratio of 1.56."
          tabsDefault="engineering"
          tabs={[
            { value: "engineering", label: "Engineering", rows: iwaEngineeringRows },
            { value: "investment", label: "Investment Metrics", rows: iwaInvestmentRows },
          ]}
        />
      </SlideUpSecondProject>
    </div>
  );
}
