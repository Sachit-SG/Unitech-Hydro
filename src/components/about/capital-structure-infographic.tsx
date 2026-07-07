"use client";

import { motion } from "framer-motion";
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

const cardVariants = {
  rest: { backgroundColor: "#0A3A63" },
  hover: { backgroundColor: "rgba(34,211,238, 0.12)" },
} as const;

const descVariants = {
  rest: { height: 0, opacity: 0, marginTop: 0 },
  hover: { height: "auto", opacity: 1, marginTop: 12 },
} as const;

export function CapitalStructureInfographic() {
  return (
    <div className="mx-auto mt-8 grid max-w-[1440px] grid-cols-1 gap-4 px-0 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
      {capitalCards.map((item) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className={cn(
              "group relative flex cursor-pointer flex-col justify-center overflow-hidden rounded-2xl border bg-[#0A3A63] p-5 shadow-md shadow-[#0A3A63]/15 transition-colors duration-300 md:px-6 md:py-5",
              item.isCyan
                ? "border-[#22D3EE]/50 shadow-[0_0_15px_rgba(34,211,238,0.12)]"
                : "border-white/10"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="mb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 transition-colors group-hover:text-white md:text-xs">
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "text-2xl font-bold tabular-nums transition-colors md:text-3xl lg:text-4xl",
                    item.isCyan
                      ? "text-[#22D3EE] group-hover:text-white"
                      : "text-white"
                  )}
                >
                  <CountUp
                    value={item.value}
                    decimals={item.decimals}
                    suffix=" cr."
                  />
                </p>
              </div>

              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 group-hover:border-white/20 md:h-9 md:w-9",
                  item.iconBox
                )}
                aria-hidden
              >
                <Icon
                  className={cn("h-3.5 w-3.5 transition-colors duration-300 md:h-4 md:w-4", item.iconColor)}
                  strokeWidth={2}
                />
              </div>
            </div>

            <motion.div
              variants={descVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="border-t border-white/10 pt-3 text-xs leading-relaxed text-slate-300">
                {item.desc}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
