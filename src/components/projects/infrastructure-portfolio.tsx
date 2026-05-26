"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  CircleDollarSign,
  type LucideIcon,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import type { SpecRow } from "@/lib/project-technical-data";
import { iwaSalientRows } from "@/lib/project-technical-data";

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_IMAGE = "/hero-bg.jpg";

const UPPER_GALLERY = [
  { src: "/dam2.jpg", alt: "Upper Phawa Khola — headworks and dam works" },
  { src: "/images/iwa-khola-operational.jpg", alt: "Upper Phawa Khola — operational corridor" },
  { src: "/dam.jpg", alt: "Upper Phawa Khola — civil works on Phawa Khola" },
] as const;

const IWA_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=85",
    alt: "Iwa Khola — feasibility-stage river corridor",
  },
  { src: "/dam2.jpg", alt: "Iwa Khola — reference civil layout" },
  {
    src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=85",
    alt: "Iwa Khola — infrastructure and transmission context",
  },
] as const;

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

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BentoGrid({ stats }: { stats: BentoStat[] }) {
  return (
    <div className="mt-8 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Reveal key={stat.label} delay={index * 0.06} className="h-full w-full">
            <div className="relative h-full overflow-hidden rounded-xl border border-[#00EAFF]/20 bg-white p-6 shadow-md shadow-[#0B2043]/8 ring-1 ring-[#0B2043]/5 transition-shadow hover:border-[#00EAFF]/35 hover:shadow-lg">
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00EAFF] via-[#00D2FF] to-[#00EAFF]/40"
                aria-hidden
              />
              <Icon className="mb-4 h-5 w-5 text-[#00EAFF]" strokeWidth={1.75} aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-2 text-xl font-bold text-[#0B2043]">{stat.value}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function AsymmetricGallery({
  images,
}: {
  images: readonly { src: string; alt: string }[];
}) {
  const [main, ...stacked] = images;

  return (
    <Reveal className="mt-12">
      <div className="grid h-auto grid-cols-1 gap-4 md:h-[400px] md:grid-cols-3">
        <div className="relative min-h-[240px] overflow-hidden rounded-2xl md:col-span-2 md:min-h-0 md:h-full">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 66vw, 100vw"
          />
        </div>
        <div className="flex h-auto flex-col gap-4 md:h-full">
          {stacked.map((img) => (
            <div
              key={img.src}
              className="relative min-h-[180px] flex-1 overflow-hidden rounded-2xl md:min-h-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function SpecRows({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#0B2043]/10 bg-white shadow-sm ring-1 ring-[#00EAFF]/10">
      {rows.map((row) => (
        <div
          key={row.particular}
          className="flex flex-col gap-1 border-b border-slate-100 px-4 py-4 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
        >
          <dt className="text-sm font-medium text-[#0B2043] sm:max-w-[34%]">{row.particular}</dt>
          <dd className="text-sm leading-relaxed text-slate-600 sm:flex-1">{row.feature}</dd>
        </div>
      ))}
    </div>
  );
}

function ProjectTabs({
  defaultValue,
  tabs,
}: {
  defaultValue: string;
  tabs: { value: string; label: string; rows: SpecRow[] }[];
}) {
  return (
    <Reveal className="mt-8">
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 border-[#0B2043]/10 bg-[#0B2043]/5 p-1">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex-1 sm:flex-none">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <SpecRows rows={tab.rows} />
          </TabsContent>
        ))}
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
}: {
  title: string;
  badge: React.ReactNode;
  badgeClassName?: string;
  stats: BentoStat[];
  gallery: readonly { src: string; alt: string }[];
  narrative: string;
  tabs: { value: string; label: string; rows: SpecRow[] }[];
  tabsDefault: string;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
      <div className="rounded-3xl border border-[#0B2043]/10 bg-gradient-to-br from-white via-[#f4f9fc] to-[#e8f4fa] p-8 shadow-xl shadow-[#0B2043]/10 md:p-12">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold text-[#0B2043]">{title}</h2>
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

        <BentoGrid stats={stats} />
        <AsymmetricGallery images={gallery} />

        <Reveal className="mt-12 w-full">
          <p className="mb-8 w-full text-lg leading-relaxed text-slate-700">{narrative}</p>
        </Reveal>

        <ProjectTabs defaultValue={tabsDefault} tabs={tabs} />
      </div>
    </section>
  );
}

export function InfrastructurePortfolio() {
  return (
    <div className="bg-gradient-to-b from-[#e8eef5] via-[#f4f8fb] to-[#eef4f8]">
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <Image
          src={HERO_IMAGE}
          alt=""
          role="presentation"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B2043]/88 via-[#0B2043]/72 to-[#0B2043]/92"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0B2043/50_100%)]"
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

      <ProjectBlock
        title="Upper Phawa Khola (5.8 MW)"
        badge="Operational Asset (COD: 2081/01/08)"
        badgeClassName="border-[#00EAFF]/20 bg-[#00EAFF]/10 text-[#0099AA]"
        stats={upperPhawaStats}
        gallery={UPPER_GALLERY}
        narrative="The Upper Phawa Khola Hydroelectric Project is a run-of-river scheme on Phawa Khola in Pathivara Yangbarak, Dumrise Shrijangha, and Sikaicha, Taplejung. The asset reached commercial operation on BS 2081/01/08 following a PPA dated BS 2074/11/11. Design discharge is 2.6 m³/s with a gross head of 270 m (net 260.1 m), delivering 33.05 GWh annual energy under the contracted dry and wet season split. Civil works span the left bank of Phawa Khola from intake near Ose Dobhan to a surface powerhouse at Dumrise, with export to Amarpur substation on an 8 km, 33 kV link."
        tabsDefault="civil"
        tabs={[
          { value: "civil", label: "Civil Structures", rows: upperPhawaCivilRows },
          { value: "electro", label: "Electro-Mechanical", rows: upperPhawaElectroRows },
          { value: "financials", label: "Financials", rows: upperPhawaFinancialRows },
        ]}
      />

      <div
        className="mx-auto my-10 h-px w-full max-w-[1440px] bg-gradient-to-r from-transparent via-[#00EAFF]/40 to-transparent px-6 md:my-14 md:px-12"
        aria-hidden
      />

      <ProjectBlock
        title="Iwa Khola (15.0 MW)"
        badge="Under Detailed Study"
        badgeClassName="border-amber-500/20 bg-amber-500/10 text-amber-700"
        stats={iwaStats}
        gallery={IWA_GALLERY}
        narrative="The Iwa Khola Hydropower Project is a feasibility-stage run-of-river development in Taplejung and Panchthar districts, planned for execution through Unitech Iwa Hydro Energy Pvt. Ltd., with Unitech Hydropower Company Limited holding a 51% ownership stake. The scheme is designed with a gross head of 400.10 m and design discharge of 4.36 m³/s, combining a 4,382 m headrace tunnel, headrace pipe, adit tunnel, and penstock with a vertical Pelton turbine and a 132 kV transmission line spanning 22 km. Feasibility materials indicate NPR 336.7 crore total project cost, NPR 51.15 crore first-year revenue, IRR 13.22%, and a benefit–cost ratio of 1.56."
        tabsDefault="engineering"
        tabs={[
          { value: "engineering", label: "Engineering", rows: iwaEngineeringRows },
          { value: "investment", label: "Investment Metrics", rows: iwaInvestmentRows },
        ]}
      />
    </div>
  );
}
