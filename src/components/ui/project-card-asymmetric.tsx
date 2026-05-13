import Image from "next/image";
import { cn } from "@/lib/cn";

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
  /** Kicker above the title, e.g. "Operational project" or "In pipeline". */
  statusLabel?: string;
  mainImageSrc: string;
  mainImageAlt: string;
  sideImageSrc: string;
  sideImageAlt: string;
  /** Shown in the fact sheet card. */
  location: string;
  factSheetTitle?: string;
  factSheetItems: ProjectFactSheetItem[];
  achievements: ProjectAchievement[];
  className?: string;
};

export function ProjectCardAsymmetric({
  title,
  statusLabel = "Operational project",
  mainImageSrc,
  mainImageAlt,
  sideImageSrc,
  sideImageAlt,
  location,
  factSheetTitle = "FACT SHEET",
  factSheetItems,
  achievements,
  className,
}: ProjectCardAsymmetricProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[1440px] py-10 md:py-14",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
        <header className="mb-10 text-left lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
            {statusLabel}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-brand-blue md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </header>

        {/* Main image + right stack: one supporting image + fact sheet (row height = main aspect) */}
        <div className="contents">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-brand-blue/10 lg:col-span-2">
            <Image
              src={mainImageSrc}
              alt={mainImageAlt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 64vw, 100vw"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent"
              aria-hidden
            />
          </div>

          <div className="flex min-h-[280px] flex-col gap-4 lg:col-span-1 lg:h-full lg:min-h-0">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/60 shadow-md shadow-brand-blue/5">
              <Image
                src={sideImageSrc}
                alt={sideImageAlt}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 32vw, 100vw"
              />
            </div>

            <div className="shrink-0 rounded-xl border border-white/10 bg-[#0B2043] p-6 text-white shadow-xl">
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
      </div>
    </section>
  );
}
