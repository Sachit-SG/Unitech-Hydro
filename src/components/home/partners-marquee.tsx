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
          "partners-marquee-track flex w-max items-stretch gap-10 md:gap-12",
          !reduceMotion && "partners-marquee-animate",
        )}
      >
        {TRACK.map((partner, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${partner.id}-${idx}`}
            className="flex h-16 w-40 shrink-0 select-none items-center justify-center px-2"
            title={partner.name}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={48}
              className="h-11 w-auto max-w-[10rem] object-contain object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
