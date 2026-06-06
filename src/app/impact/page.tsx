import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Sustainability, environment, and local development — Unitech Hydropower Company Limited.",
};

export default function ImpactPage() {
  return (
    <PageShell title="Sustainability & local impact">
      <section className="space-y-20 py-20 first:pt-8">
        <div className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            Unitech Hydropower Company Limited describes its mission as producing{" "}
            <strong>clean, renewable hydroelectricity</strong> by using
            Nepal&apos;s water resources efficiently, with{" "}
            <strong>modern technology</strong> and{" "}
            <strong>environmental responsibility</strong> aligned to sustainable
            infrastructure practice.
          </p>
        </div>
        <div className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            Beyond electrons, the company&apos;s stated approach includes{" "}
            <strong>socio-economic development</strong>: creating employment,
            supporting <strong>local communities</strong> in project-affected
            areas, and contributing to regional development and livelihoods.
          </p>
        </div>
        <div className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            Operationally, the <strong>Upper Phawa Khola</strong> asset is a
            run-of-river configuration with documented civil and hydraulic design
            elements (weir, desanding, headrace, surge, penstock, tailrace)
            intended to manage sediment and hydraulic transients responsibly —
            expand technical copy only with engineer-reviewed material.
          </p>
        </div>
        <div className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
          <p>
            The <strong>Iwa Khola (15.0 MW)</strong> project remains in
            feasibility and licensing stages; avoid implying delivered community
            outcomes until backed by published ESIA or community development
            agreements.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
