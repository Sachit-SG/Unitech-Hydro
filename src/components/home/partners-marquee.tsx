"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const partners = [
  { name: "Machhapuchhre Bank", label: "MACHHAPUCHHRE BANK" },
  { name: "Laxmi Sunrise Bank", label: "LAXMI SUNRISE BANK" },
  { name: "Machhapuchhre Capital", label: "MACHHAPUCHHRE CAPITAL" },
  { name: "Laxmi Sunrise Capital", label: "LAXMI SUNRISE CAPITAL" },
  { name: "ICFC Finance", label: "ICFC" },
  { name: "ICRA Nepal", label: "ICRA NEPAL" },
] as const;

const TRACK = [...partners, ...partners];

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
          !reduceMotion && "partners-marquee-animate"
        )}
      >
        {TRACK.map((p, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${p.label}-${idx}`}
            className="flex h-20 w-40 shrink-0 select-none items-center justify-center rounded-[4px] border border-slate-200 bg-slate-100 px-6 text-center font-bold text-slate-400 shadow-sm grayscale transition-[border-color,box-shadow,filter] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.22)] hover:grayscale-0"
            title={p.name}
          >
            <span className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
