import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Upper Phawa Khola (5.8 MW) operational asset and Middle Iwa Khola (15 MW) development — Unitech Hydropower Company Limited.",
};

const HERO_POWERHOUSE =
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=80";
const IMG_UPPER_TECH =
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80";
const IMG_UPPER_SITE =
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1800&q=80";
const IMG_MIDDLE_SCHEMATIC =
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1800&q=80";

export default function ProjectsPage() {
  return (
    <PageShell
      title="Our Projects"
      subtitle="Operating generation in Taplejung and a feasibility-stage pipeline spanning Taplejung and Panchthar — figures aligned to company-context.md."
      heroImageSrc={HERO_POWERHOUSE}
      heroOverlayClassName="bg-black/55"
      heroPriority
    >
      <section className="py-28 first:pt-10">
        <div className="flex items-start gap-4">
          <span className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
              Upper Phawa Khola
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
              Operational generation
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:items-center lg:gap-24">
          <div className="relative min-h-[420px] overflow-hidden rounded-[4px] border border-slate-200/60 bg-white shadow-sm lg:col-span-2">
            <Image
              src={IMG_UPPER_SITE}
              alt="Project site photo placeholder — Upper Phawa Khola headworks and powerhouse"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          </div>

          <div className="flex flex-col justify-center lg:col-span-3">
            <h3 className="font-heading text-2xl font-bold text-brand-blue md:text-3xl">
              Upper Phawa Khola (5.8 MW)
            </h3>
            <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-brand-slate/85 md:text-[17px] md:leading-8">
              Upper Phawa Khola is an operating run-of-river plant in Taplejung.
              Company disclosures record COD on <strong>BS 2081/01/08</strong>,
              with a Pelton configuration and an intertie to Amarpur substation.
            </p>

            <div className="mt-10 max-w-xl rounded-[4px] border border-slate-200/80 bg-white p-7 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/50">
                Fact sheet
              </p>
              <dl className="mt-5 grid gap-5 text-sm md:grid-cols-3 md:text-base">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Capacity
                  </dt>
                  <dd className="mt-2 font-heading text-lg font-bold tabular-nums text-brand-blue md:text-xl">
                    5.8 MW
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    COD
                  </dt>
                  <dd className="mt-2 font-semibold tabular-nums text-brand-slate">
                    BS 2081/01/08
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Turbine
                  </dt>
                  <dd className="mt-2 font-semibold text-brand-slate">
                    2 × Pelton
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-6 max-w-xl text-xs leading-relaxed text-brand-slate/60">
              Note: the ~22 km, 132 kV transmission line in disclosures applies
              to Middle Iwa (feasibility), not this operating intertie.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/60 bg-glacier-mist py-28">
        <div className="flex items-start gap-4">
          <span className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
              Middle Iwa Khola
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
              Development pipeline
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:items-center lg:gap-24">
          <div className="flex flex-col justify-center lg:order-1 lg:col-span-3">
            <h3 className="font-heading text-2xl font-bold text-brand-blue md:text-3xl">
              Middle Iwa Khola (15 MW)
            </h3>
            <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-brand-slate/85 md:text-[17px] md:leading-8">
              Middle Iwa Khola remains a feasibility-stage run-of-river project
              in Taplejung and Panchthar. Disclosures highlight the planned{" "}
              <strong>~22 km, 132 kV</strong> transmission line and an ownership
              structure with <strong>51%</strong> held by Unitech Hydropower,
              alongside a first-year revenue estimate of{" "}
              <strong>NPR 51.15 Cr</strong>.
            </p>

            <div className="mt-10 max-w-xl rounded-[4px] border border-slate-200/80 bg-white p-7 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/50">
                Fact sheet
              </p>
              <dl className="mt-5 grid gap-5 text-sm md:grid-cols-3 md:text-base">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Capacity
                  </dt>
                  <dd className="mt-2 font-heading text-lg font-bold tabular-nums text-brand-blue md:text-xl">
                    15 MW
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Ownership
                  </dt>
                  <dd className="mt-2 font-semibold tabular-nums text-brand-slate">
                    51%
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Transmission
                  </dt>
                  <dd className="mt-2 font-semibold text-brand-slate">
                    ~22 km, 132 kV
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[4px] border border-slate-200/60 bg-white shadow-sm lg:order-2 lg:col-span-2">
            <Image
              src={IMG_MIDDLE_SCHEMATIC}
              alt="Engineering schematic placeholder — Middle Iwa Khola"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
