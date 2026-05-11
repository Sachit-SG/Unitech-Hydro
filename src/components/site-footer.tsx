export function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-brand-blue-deep text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-8 py-14 md:flex-row md:items-start md:justify-between md:px-20">
        <div className="max-w-md space-y-3">
          <p className="font-heading text-lg font-bold tracking-tight">
            Unitech Hydropower Company Limited
          </p>
          <p className="font-sans text-sm leading-relaxed text-white/80">
            Nepal-based energy development focused on clean, renewable
            hydroelectricity and responsible hydropower delivery.
          </p>
          <p className="font-sans text-xs text-white/55">
            Public figures on this site are aligned with internal company
            disclosures and regulatory filings.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
          <div>
            <h2 className="font-heading text-xs font-semibold uppercase tracking-widest text-brand-cyan">
              Capacity
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-white/85">
              <span className="font-semibold tabular-nums text-white">
                5.8 MW
              </span>{" "}
              Operational
              <span className="text-white/55"> · </span>
              <span className="font-semibold tabular-nums text-white">15 MW</span>{" "}
              Pipeline
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xs font-semibold uppercase tracking-widest text-brand-cyan">
              Project sites
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-white/85">
              Taplejung &amp; Panchthar, Nepal
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Unitech Hydropower Company Limited. All
        rights reserved.
      </div>
    </footer>
  );
}
