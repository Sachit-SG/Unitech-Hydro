import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  ProjectGalleryCarousel,
  type GallerySlide,
} from "@/components/ui/project-gallery-carousel";

export type ProjectFactSheetItem = {
  label: string;
  value: string;
};

export type ProjectAchievement = {
  label: string;
  value: string;
};

export type ProjectCardAsymmetricProps = {
  title: string;
  /** Shown above the title, or below when `statusBelowTitle` is true. */
  statusLabel?: string;
  /** When true, `statusLabel` renders under the title (e.g. feasibility kicker). */
  statusBelowTitle?: boolean;
  /** Project photos; one slide is static, multiple slides enable carousel (5s + hover arrows). */
  gallerySlides: GallerySlide[];
  location: string;
  factSheetTitle?: string;
  factSheetItems: ProjectFactSheetItem[];
  achievements: ProjectAchievement[];
  /** Optional narrative below the highlight cards (e.g. feasibility-stage project summary). */
  afterAchievements?: ReactNode;
  className?: string;
};

export function ProjectCardAsymmetric({
  title,
  statusLabel = "Operational project",
  statusBelowTitle = false,
  gallerySlides,
  location,
  factSheetTitle = "FACT SHEET",
  factSheetItems,
  achievements,
  afterAchievements,
  className,
}: ProjectCardAsymmetricProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[1440px] py-10 md:py-14",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-8">
        <header className="mb-2 text-left lg:col-span-3 lg:mb-0">
          {statusBelowTitle ? (
            <>
              <h2 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-brand-blue md:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                {statusLabel}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                {statusLabel}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-brand-blue md:text-4xl lg:text-5xl">
                {title}
              </h2>
            </>
          )}
        </header>

        <div className="contents">
          <div className="min-h-[280px] h-full lg:col-span-2 lg:min-h-0">
            <ProjectGalleryCarousel
              slides={gallerySlides}
              className="h-full min-h-[280px]"
            />
          </div>

          <div className="flex min-h-0 flex-col lg:col-span-1">
            <div className="shrink-0 rounded-xl border border-white/10 bg-[#0A3A63] p-6 text-white shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
                {factSheetTitle}
              </p>
              <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                {factSheetItems.map((row) => (
                  <li
                    key={row.label}
                    className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                      {row.label}
                    </span>
                    <span className="text-sm font-bold tabular-nums text-white">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                  Location
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white/90">
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-3">
          {achievements.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-6 shadow-sm backdrop-blur-sm md:px-8 md:py-8"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-slate/55">
                {item.label}
              </p>
              <p className="mt-3 font-heading text-xl font-bold leading-snug text-brand-blue md:text-2xl">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {afterAchievements ? (
          <div className="mt-10 w-full lg:col-span-3">{afterAchievements}</div>
        ) : null}
      </div>
    </section>
  );
}

export type { GallerySlide };
