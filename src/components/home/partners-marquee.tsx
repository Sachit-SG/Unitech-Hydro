"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { PARTNERS } from "@/lib/partners-data";

const TRACK = [...PARTNERS, ...PARTNERS];

export function PartnersMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mt-10 min-h-[120px] overflow-hidden py-8 partners-marquee-mask"
      aria-label="Consortium and partners"
    >
      <div
        className={cn(
          "partners-marquee-track flex w-max items-stretch gap-5",
          !reduceMotion && "partners-marquee-animate",
        )}
      >
        {TRACK.map((partner, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${partner.id}-${idx}`}
            className="flex h-20 w-44 shrink-0 select-none items-center justify-center rounded-[4px] border border-slate-200 bg-white px-5 shadow-sm grayscale transition-[border-color,box-shadow,filter] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.22)] hover:grayscale-0"
            title={partner.name}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={48}
              className="h-10 w-auto max-w-[9.5rem] object-contain object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
