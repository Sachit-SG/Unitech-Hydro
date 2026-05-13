import type { Metadata } from "next";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { GalleryBentoTile } from "@/components/gallery/gallery-bento-tile";
import { PageShell } from "@/components/page-shell";
import { galleryBentoItems } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Board of Directors and operations team — Unitech Hydropower Company Limited.",
};

const HERO_GALLERY =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80";

const PORTRAIT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80";

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
}: {
  name: string;
  title: string;
}) {
  return (
    <div className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={PORTRAIT_PLACEHOLDER}
          alt=""
          role="presentation"
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
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

function TeamCard({ name, title }: { name: string; title: string }) {
  return (
    <div className="group rounded-[4px] border border-slate-200/80 bg-white p-6 shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.35)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-slate-200 bg-white text-brand-slate/60 transition-colors group-hover:border-brand-cyan/50 group-hover:text-brand-blue">
          <UserRound className="h-6 w-6" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading text-base font-bold text-brand-blue">
            {name}
          </p>
          <p className="mt-0.5 truncate font-sans text-sm text-brand-slate/70">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <PageShell
      title="Gallery"
      heroImageSrc={HERO_GALLERY}
      heroOverlayClassName="bg-black/45"
    >
      <section className="py-20 first:pt-10 md:py-24">
        <SectionHeader kicker="Leadership" title="Board of Directors" />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {board.map((p) => (
            <ProfileCard key={p.name} name={p.name} title={p.title} />
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200/60 pt-10 md:mt-14 md:pt-12">
          <SubsectionHeading
            title="Management & team"
            description="Operations leadership and core office roles."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {operationsTeam.map((p) => (
              <TeamCard key={p.name} name={p.name} title={p.title} />
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

