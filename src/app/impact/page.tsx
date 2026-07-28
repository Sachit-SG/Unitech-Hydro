import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Sustainability, environment, and local development — Unitech Hydropower Company Limited.",
};

export default function ImpactPage() {
  return (
    <PageShell title="Sustainability & local impact">
      <section className="space-y-20 py-20 first:pt-8">
        <Reveal className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            Unitech Hydropower Company Limited&apos;s mission is producing{" "}
            <strong>clean, renewable hydroelectricity</strong> by using
            Nepal&apos;s water resources efficiently, with{" "}
            <strong>modern technology</strong> and{" "}
            <strong>environmental responsibility</strong> aligned to sustainable
            infrastructure practice.
          </p>
        </Reveal>
        <Reveal delay={0.05} className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            Beyond electrons, the company&apos;s approach includes{" "}
            <strong>socio-economic development</strong>: creating employment,
            supporting <strong>local communities</strong> in project-affected
            areas, and contributing to regional development and livelihoods.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            Operationally, the <strong>Upper Phawa Khola</strong> asset is a
            run-of-river configuration with documented civil and hydraulic design
            elements — weir, desanding basin, headrace pipe, surge tank,
            penstock, and tailrace canal — engineered to manage sediment and
            hydraulic transients responsibly. Full technical specifications are
            published on the{" "}
            <Link
              href="/projects"
              className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              project page
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.15} className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            The <strong>Iwa Khola (15.0 MW)</strong> project remains in
            feasibility and licensing stages, planned for execution through
            Unitech Iwa Hydro Energy Pvt. Ltd. with Unitech Hydropower Company
            Limited holding a 51% ownership stake. Community and environmental
            impact details for this project will be published as the
            feasibility study and licensing process progress.
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
