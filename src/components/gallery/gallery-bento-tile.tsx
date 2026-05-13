import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { GalleryBentoItem } from "@/lib/gallery-data";

export function GalleryBentoTile({ item }: { item: GalleryBentoItem }) {
  return (
    <Link
      href={`/gallery/${item.id}`}
      className={cn(
        "group relative block h-full w-full overflow-hidden rounded-xl shadow-sm shadow-brand-blue/10 ring-1 ring-slate-200/60 transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-blue/15 hover:ring-brand-cyan/30",
        item.gridClass,
      )}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="(min-width: 768px) 40vw, 100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/50"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5">
        <div className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-[#00EAFF]">
            {item.projectName}
          </p>
          <p className="mt-1.5 font-mono text-[10px] font-medium uppercase tracking-widest text-[#00EAFF]/90">
            {item.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
