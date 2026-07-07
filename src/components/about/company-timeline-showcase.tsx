import Image from "next/image";
import {
  CompanyGrowthTimeline,
  type CompanyTimelineEvent,
} from "@/components/about/company-growth-timeline";
import { getProjectCardImage } from "@/lib/gallery-data";

const TIMELINE_BG = getProjectCardImage("upper-phawa-khola");

type CompanyTimelineShowcaseProps = {
  events: readonly CompanyTimelineEvent[];
};

export function CompanyTimelineShowcase({ events }: CompanyTimelineShowcaseProps) {
  return (
    <section
      id="major-dates"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-t border-white/10 py-12 md:py-14"
      aria-labelledby="major-dates-heading"
    >
      {/* Layer 0 — background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={TIMELINE_BG}
          alt=""
          role="presentation"
          fill
          priority={false}
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-40 grayscale"
          sizes="100vw"
        />
      </div>

      {/* Layer 10 — brand-graded navy overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A63] via-[#0A3A63]/85 to-[#0A3A63] mix-blend-multiply"
        aria-hidden
      />

      {/* Layer 20 — timeline content, beam, dots */}
      <div className="relative z-20 mx-auto max-w-[1440px] px-8 md:px-20">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#22D3EE] drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
            Corporate history
          </p>
          <h3
            id="major-dates-heading"
            className="mt-2 font-heading text-2xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] md:text-3xl"
          >
            Major dates of the company
          </h3>
          <p className="mt-2 text-sm leading-snug text-slate-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
            Key registrations and operational milestones in Bikram Sambat (BS)—the journey
            from incorporation to commercial power generation.
          </p>
        </header>

        <CompanyGrowthTimeline events={events} theme="dark" className="mt-6 md:mt-8" />
      </div>
    </section>
  );
}
