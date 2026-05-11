import type { Metadata } from "next";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { PageShell } from "@/components/page-shell";

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

const sitePhotos = [
  {
    src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80",
    label: "Headworks",
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80",
    label: "Powerhouse works",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    label: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80",
    label: "Transmission corridor",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80",
    label: "Engineering schematic",
  },
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
      subtitle="Leadership profiles and the operations team — extracted from company-context.md."
      heroImageSrc={HERO_GALLERY}
      heroOverlayClassName="bg-black/45"
    >
      <section className="py-28 first:pt-10">
        <SectionHeader kicker="Section 01" title="Board of Directors" />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {board.map((p) => (
            <ProfileCard key={p.name} name={p.name} title={p.title} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200/60 py-28">
        <SectionHeader kicker="Section 02" title="Management & team" />
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-brand-slate/85 md:text-lg md:leading-8">
          A compact view of the operations team named in the web production
          extract. Expand this section only with approved org details.
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {operationsTeam.map((p) => (
            <TeamCard key={p.name} name={p.name} title={p.title} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200/60 py-28">
        <SectionHeader kicker="Section 03" title="Project gallery" />
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-brand-slate/85 md:text-lg md:leading-8">
          Placeholder imagery for Headworks, Powerhouse, and site landscapes.
          Replace with approved project photography and captions.
        </p>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {sitePhotos.map((p) => (
            <figure
              key={p.label}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.35)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={p.src}
                  alt={`${p.label} photo placeholder`}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 28vw, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                  aria-hidden
                />
              </div>
              <figcaption className="px-5 py-4">
                <p className="font-heading text-sm font-bold text-brand-blue">
                  {p.label}
                </p>
                <p className="mt-0.5 font-sans text-xs text-brand-slate/65">
                  Site photo placeholder
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

