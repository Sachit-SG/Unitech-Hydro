import type { Metadata } from "next";
import Image from "next/image";
import { GalleryBentoTile } from "@/components/gallery/gallery-bento-tile";
import { PageShell } from "@/components/page-shell";
import { galleryBentoItems } from "@/lib/gallery-data";
import { boardMembers, galleryOperationsTeam } from "@/lib/team-members";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Board of Directors and operations team — Unitech Hydropower Company Limited.",
};

const PORTRAIT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80";

function SectionHeader({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
          {kicker}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

function SubsectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h3 className="font-heading text-xl font-bold tracking-tight text-brand-blue md:text-2xl">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-slate/75 md:text-[15px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProfileCard({
  name,
  title,
  photoSrc,
}: {
  name: string;
  title: string;
  photoSrc?: string;
}) {
  return (
    <div className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <Image
          src={photoSrc ?? PORTRAIT_PLACEHOLDER}
          alt={photoSrc ? `${name}, ${title}` : ""}
          role={photoSrc ? undefined : "presentation"}
          fill
          className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 20vw, 50vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden
        />
      </div>
      <div className="p-6">
        <p className="font-heading text-lg font-bold text-brand-blue">{name}</p>
        <p className="mt-1 font-sans text-sm font-medium text-brand-slate/70">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <PageShell title="Gallery">
      <section className="py-20 first:pt-10 md:py-24">
        <SectionHeader kicker="Leadership" title="Board of Directors" />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {boardMembers.map((p) => (
            <ProfileCard key={p.name} name={p.name} title={p.title} photoSrc={p.photoSrc} />
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200/60 pt-10 md:mt-14 md:pt-12">
          <SubsectionHeading
            title="Management & team"
            description="Operations leadership and core office roles."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleryOperationsTeam.map((p) => (
              <ProfileCard key={p.name} name={p.name} title={p.title} photoSrc={p.photoSrc} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/60 py-20 md:py-24">
        <SectionHeader kicker="Project gallery" title="Sites & systems" />
        <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-brand-slate/75 md:text-base">
          Hover a tile for site and location, then open the full project strip.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:h-[800px] md:grid-cols-4 md:grid-rows-2 md:gap-4 md:overflow-hidden">
          {galleryBentoItems.map((item) => (
            <GalleryBentoTile key={item.id} item={item} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

