"use client";

import {
  CircleDollarSign,
  Landmark,
  Layers,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { CountUp } from "@/components/ui/count-up";

type CapitalCard = {
  id: number;
  title: string;
  value: number;
  decimals: number;
  desc: string;
  isCyan: boolean;
  icon: LucideIcon;
  iconBox: string;
  iconColor: string;
};

const capitalCards: CapitalCard[] = [
  {
    id: 1,
    title: "Authorized Capital",
    value: 120,
    decimals: 0,
    desc: "Total capital authorized for issuance.",
    isCyan: false,
    icon: Landmark,
    iconBox: "border-sky-400/25 bg-sky-400/10",
    iconColor: "text-sky-300",
  },
  {
    id: 2,
    title: "Issued Capital",
    value: 98.5,
    decimals: 2,
    desc: "Capital currently issued to shareholders.",
    isCyan: false,
    icon: Layers,
    iconBox: "border-violet-400/25 bg-violet-400/10",
    iconColor: "text-violet-300",
  },
  {
    id: 3,
    title: "Paid Up",
    value: 78.8,
    decimals: 2,
    desc: "66% of authorized capital deployed.",
    isCyan: true,
    icon: CircleDollarSign,
    iconBox: "border-[#22D3EE]/35 bg-[#22D3EE]/12",
    iconColor: "text-[#22D3EE]",
  },
  {
    id: 4,
    title: "IPO",
    value: 19.7,
    decimals: 1,
    desc: "Rating: ICRA Nepal | Manager: LS Capital",
    isCyan: true,
    icon: TrendingUp,
    iconBox: "border-amber-400/30 bg-amber-400/10",
    iconColor: "text-amber-300",
  },
];

export function CapitalStructureInfographic() {
  return (
    <div className="mx-auto mt-8 grid max-w-[1440px] grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#0A3A63] sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
      {capitalCards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={cn(
              "flex flex-col gap-3 p-5 md:p-6",
              item.isCyan && "bg-[#22D3EE]/[0.04]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 md:text-xs">
                {item.title}
              </h3>
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border md:h-9 md:w-9",
                  item.iconBox
                )}
                aria-hidden
              >
                <Icon
                  className={cn("h-3.5 w-3.5 md:h-4 md:w-4", item.iconColor)}
                  strokeWidth={2}
                />
              </div>
            </div>

            <p
              className={cn(
                "text-2xl font-bold tabular-nums md:text-3xl lg:text-4xl",
                item.isCyan ? "text-[#22D3EE]" : "text-white"
              )}
            >
              <CountUp value={item.value} decimals={item.decimals} suffix=" cr." />
            </p>

            <p className="border-t border-white/10 pt-3 text-xs leading-relaxed text-slate-300">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
