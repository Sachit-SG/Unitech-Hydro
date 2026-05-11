import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  CalendarDays,
  Landmark,
  MapPin,
  UserRound,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Unitech Hydropower Company Limited — registration, mandate, and corporate profile.",
};

const HERO_LANDSCAPE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80";

const IMG_STORY =
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80";

const IMG_VISION =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80";

const board = [
  { name: "Anoj Khadka", title: "Chairman" },
  { name: "Dinesh Lal Shrestha", title: "Director" },
  { name: "Anand Kumar Basnet", title: "Director" },
  { name: "Shobha Basnet", title: "Director" },
  { name: "Vishwa Prakash Amatya", title: "Director" },
  { name: "Pramod Kumar Shah", title: "Independent Director" },
] as const;

const operationsTeam = [
  { name: "Bhaskar Kafle", title: "Chief Executive Officer" },
  { name: "Rabindra Mahaseth", title: "Project Co-ordinator" },
  { name: "Shrina Ghimire", title: "Account / Admin Officer" },
] as const;

export default function AboutPage() {
  return (
    <PageShell
      title="About Us"
      subtitle="A single corporate master page — story, leadership, investment profile, governance, and reference — aligned to company-context.md."
      heroImageSrc={HERO_LANDSCAPE}
      heroOverlayClassName="bg-black/45"
      heroPriority
    >
      {/* Section 1: Our story (white) */}
      <section className="bg-slate-50 py-28 first:pt-10">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:gap-20">
          <div className="relative min-h-[420px] overflow-hidden rounded-[4px] border border-slate-200/60 bg-white shadow-2xl shadow-brand-blue/5 lg:min-h-[640px]">
            <Image
              src={IMG_STORY}
              alt="Hydropower site placeholder — engineering and construction"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              aria-hidden
            />
          </div>

          <div>
            <div className="flex items-stretch gap-4">
              <span className="w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                  Our story
                </p>
                <h2 className="mt-3 max-w-none font-heading text-3xl font-bold leading-[1.2] tracking-tight text-brand-blue md:text-4xl lg:text-[46px]">
                  A Decade of Engineering Excellence.
                </h2>
              </div>
            </div>

            <div className="mt-8 max-w-2xl space-y-6 font-sans text-base leading-relaxed text-brand-slate/90 md:text-[17px] md:leading-8">
              <p>
                <strong>Unitech Hydropower Company Limited</strong> was first
                registered as a <strong>Private Limited</strong> company under
                the Companies Act of Nepal and later converted to a{" "}
                <strong>Public Limited</strong> company to support growth,
                transparency, and broader stakeholder participation.
              </p>
              <p>
                The conversion registration is recorded as{" "}
                <strong>BS 2079/10/06</strong> (no.{" "}
                <strong>306353/079/080</strong>). The original private
                registration is <strong>BS 2071/06/10</strong> (no.{" "}
                <strong>127161/071/072</strong>).
              </p>
              <p>
                We develop run-of-river hydropower with modern technology,
                environmental responsibility, and transparent delivery.
              </p>
              <p>
                <Link
                  href="/projects"
                  className="font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  View projects
                </Link>
                <span className="text-brand-slate/50"> · </span>
                <Link
                  href="/contact"
                  className="font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  Contact
                </Link>
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <div className="w-fit rounded-[4px] border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-brand-cyan" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Est.
                  </p>
                </div>
                <p className="mt-2 font-heading text-sm font-bold text-brand-blue">
                  2014
                </p>
              </div>
              <div className="w-fit rounded-[4px] border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-brand-cyan" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Public Ltd
                  </p>
                </div>
                <p className="mt-2 font-heading text-sm font-bold text-brand-blue">
                  2023
                </p>
              </div>
              <div className="w-fit rounded-[4px] border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Project location
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-cyan" aria-hidden />
                  <p className="font-heading text-sm font-bold text-brand-blue">
                    Taplejung &amp; Panchthar, Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The vision (glacier mist) */}
      <section className="border-t border-slate-200/60 bg-slate-50 py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="lg:col-span-7">
            <div className="flex items-start gap-4">
              <span className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                  The vision
                </p>
                <h2 className="mt-3 max-w-[22ch] text-balance font-heading text-4xl font-bold leading-[1.2] tracking-tight text-brand-blue lg:text-5xl">
                  Leadership for Nepal’s energy future.
                </h2>
              </div>
            </div>

            <p className="mt-8 font-heading text-2xl font-bold leading-snug tracking-tight text-brand-blue md:text-3xl">
              &ldquo;It gives me great pleasure to welcome you to Unitech Hydropower
              Company Limited.&rdquo;
            </p>
            <div className="mt-8 max-w-2xl space-y-6 font-sans text-base leading-relaxed text-brand-slate/90 md:text-[17px] md:leading-8">
              <p>
                Since our establishment, we have remained committed to
                contributing to Nepal&apos;s growing energy needs through the
                sustainable development of hydropower resources.
              </p>
              <p>
                Our transition from private to public limited status reflects a
                commitment to <strong>growth, transparency</strong>, and broader
                stakeholder participation — guided by <strong>integrity</strong>,
                <strong> accountability</strong>, and <strong>innovation</strong>.
              </p>
              <p className="text-xs leading-relaxed text-brand-slate/60">
                Condensed from themes recorded in{" "}
                <span className="font-medium text-brand-slate">company-context.md</span>.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[4px] border border-slate-200/60 bg-white shadow-2xl shadow-brand-blue/5 lg:col-span-5 lg:min-h-[560px]">
            <Image
              src={IMG_VISION}
              alt="Professional portrait placeholder — Anoj Khadka"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-heading text-sm font-bold uppercase tracking-widest text-white/95">
                Anoj Khadka
              </p>
              <p className="mt-0.5 font-sans text-xs text-white/75">Chairman</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Capital structure (white) */}
      <section id="investment-profile" className="border-t border-slate-200/60 py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
            Capital structure
          </p>
          <h2 className="mx-auto mt-3 max-w-[18ch] text-balance font-heading text-4xl font-bold leading-[1.2] tracking-tight text-brand-blue lg:text-5xl">
            Investment Profile.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-10">
          {(
            [
              { label: "Authorized capital", value: "120 Cr" },
              { label: "Issued capital", value: "98.5 Cr" },
              { label: "Paid-up capital", value: "78.8 Cr" },
            ] as const
          ).map((stat) => (
            <div
              key={stat.label}
              className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.18)]"
            >
              <div className="flex items-center justify-between gap-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                  {stat.label}
                </p>
                <Activity className="h-4 w-4 text-brand-cyan" aria-hidden />
              </div>
              <p className="mt-5 font-heading text-4xl font-bold tabular-nums tracking-tight text-brand-blue md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 font-sans text-sm text-brand-slate/70">
                Stat sheet (NPR crores) — values aligned to company materials.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Governance (glacier mist) */}
      <section className="border-t border-slate-200/60 bg-slate-50 py-28">
        <div className="flex items-start gap-4">
          <span className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
              Governance
            </p>
            <h2 className="mt-3 max-w-[22ch] text-balance font-heading text-4xl font-bold leading-[1.2] tracking-tight text-brand-blue lg:text-5xl">
              Board and office operations.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/55">
              Board of directors
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {board.map((m) => (
                <div
                  key={m.name}
                  className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.22)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={IMG_VISION}
                      alt=""
                      role="presentation"
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 22vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
                  </div>
                  <div className="p-6">
                    <p className="font-heading text-lg font-bold text-brand-blue">
                      {m.name}
                    </p>
                    <p className="mt-1 font-sans text-sm text-brand-slate/70">
                      {m.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/55">
              Office operation team
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {operationsTeam.map((m) => (
                <div
                  key={m.name}
                  className="group flex items-center gap-4 rounded-[4px] border border-slate-200/80 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.22)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[4px] border border-slate-200 bg-slate-50 text-brand-slate/60">
                    <UserRound className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-heading text-base font-bold text-brand-blue">
                      {m.name}
                    </p>
                    <p className="mt-0.5 truncate font-sans text-sm text-brand-slate/70">
                      {m.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Corporate reference (white) */}
      <section className="border-t border-slate-200/60 py-28">
        <div className="flex items-start gap-4">
          <span className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
              Corporate reference
            </p>
            <h2 className="mt-3 max-w-[22ch] text-balance font-heading text-4xl font-bold leading-[1.2] tracking-tight text-brand-blue lg:text-5xl">
              Technical facts, clean and precise.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          <div className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/50">
              Registration history
            </p>
            <dl className="mt-6 space-y-5 font-sans text-sm text-brand-slate/80">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                  Private (BS 2071)
                </dt>
                <dd className="mt-2 font-semibold text-brand-slate">
                  BS 2071/06/10 · 127161/071/072
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                  Public (BS 2079)
                </dt>
                <dd className="mt-2 font-semibold text-brand-slate">
                  BS 2079/10/06 · 306353/079/080
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/50">
              Project location
            </p>
            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand-cyan" aria-hidden />
              <p className="font-sans text-sm leading-relaxed text-brand-slate/85">
                Taplejung &amp; Panchthar, Nepal (operating and pipeline
                footprint as disclosed).
              </p>
            </div>
          </div>

          <div className="rounded-[4px] border border-slate-200/80 bg-white p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-slate/50">
              Operational capacity
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Zap className="h-5 w-5 text-brand-cyan" aria-hidden />
              <p className="font-heading text-lg font-bold text-brand-blue">
                5.8 MW
              </p>
            </div>
            <p className="mt-2 font-sans text-sm text-brand-slate/75">
              Upper Phawa Khola — commercial operation disclosed with COD BS
              2081/01/08.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
