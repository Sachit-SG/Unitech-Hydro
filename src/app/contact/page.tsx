import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Office address in Kupondole, Lalitpur, and official contact channels for Unitech Hydropower Company Limited.",
};

const HERO_KUPONDOLE =
  "https://images.unsplash.com/photo-1602216059366-3a880b44e008?auto=format&fit=crop&w=2400&q=80";

function ContactCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[4px] border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/50">
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      heroImageSrc={HERO_KUPONDOLE}
      heroOverlayClassName="bg-black/45"
      heroPriority
    >
      <section className="py-20 first:pt-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <div className="flex min-h-[420px] flex-col overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm">
            <div className="flex flex-1 flex-col items-center justify-center bg-slate-100 p-8 text-center">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">
                Google Maps
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-slate/65">
                Embed placeholder — replace with an iframe or Maps JavaScript API
                pointing to{" "}
                <strong className="text-brand-slate">
                  Lalitpur-1, Kupondole
                </strong>{" "}
                (Plus code <span className="font-mono">M8P8+CH</span>).
              </p>
            </div>
            <div className="border-t border-slate-200/80 bg-white px-4 py-3 text-center text-xs text-brand-slate/55">
              Map view: Kathmandu Valley / Lalitpur context (stock hero — not a
              live map).
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[4px] border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-heading text-lg font-bold text-brand-blue md:text-xl">
                Office
              </h2>
              <address className="mt-4 not-italic text-sm leading-relaxed text-brand-slate/90 md:text-base">
                <strong>Unitech Hydropower Company Limited</strong>
                <br />
                Lalitpur-1, Kupondole
                <br />
                Lalitpur Metropolitan City
                <br />
                Lalitpur, Nepal
              </address>
              <p className="mt-4 text-xs leading-relaxed text-brand-slate/55">
                Standardize postal formatting (sources also list Lalitpur-01,
                Kupondole; AGM footer style &quot;Kupondole, Lalitpur -31,
                Nepal&quot;).
              </p>
            </div>

            <ContactCard label="Phone">
              <a
                className="font-heading text-2xl font-bold text-brand-blue hover:text-brand-cyan md:text-3xl"
                href="tel:+97714106123"
              >
                01-4106123
              </a>
            </ContactCard>

            <ContactCard label="Email">
              <a
                className="break-all font-heading text-xl font-bold text-brand-blue hover:text-brand-cyan md:text-2xl"
                href="mailto:unitechhydropower@gmail.com"
              >
                unitechhydropower@gmail.com
              </a>
            </ContactCard>

            <ContactCard label="Plus Code">
              <span className="font-mono font-heading text-2xl font-bold tracking-wide text-brand-slate md:text-3xl">
                M8P8+CH
              </span>
            </ContactCard>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
