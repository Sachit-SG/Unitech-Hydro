"use client";

import { Target, Users, Zap, type LucideIcon } from "lucide-react";
import {
  InteractiveFeatures,
  type FeatureIconAccent,
  type InteractiveFeature,
} from "@/components/ui/interactive-features";

export type UnitechFeatureItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const iconById: Record<number, LucideIcon> = {
  1: Target,
  2: Zap,
  3: Users,
};

/** Distinct accent colors per pillar — visible in both active and inactive states */
const iconAccentById: Record<number, FeatureIconAccent> = {
  1: {
    inactive: {
      box: "border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-teal-100",
      icon: "text-emerald-600",
    },
    active: {
      box: "border-emerald-300/50 bg-gradient-to-br from-emerald-400/35 to-teal-400/25",
      icon: "text-emerald-300",
    },
  },
  2: {
    inactive: {
      box: "border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-100",
      icon: "text-amber-600",
    },
    active: {
      box: "border-amber-300/50 bg-gradient-to-br from-amber-400/35 to-orange-400/25",
      icon: "text-amber-300",
    },
  },
  3: {
    inactive: {
      box: "border-violet-200/80 bg-gradient-to-br from-violet-50 to-indigo-100",
      icon: "text-violet-600",
    },
    active: {
      box: "border-violet-300/50 bg-gradient-to-br from-violet-400/35 to-indigo-400/25",
      icon: "text-violet-300",
    },
  },
};

const defaultIconAccent: FeatureIconAccent = iconAccentById[1]!;

function withIcons(items: readonly UnitechFeatureItem[]): InteractiveFeature[] {
  return items.map((item) => ({
    ...item,
    icon: iconById[item.id] ?? Target,
    iconAccent: iconAccentById[item.id] ?? defaultIconAccent,
  }));
}

type AboutExecutiveSummaryProps = {
  features: readonly UnitechFeatureItem[];
};

export function AboutExecutiveSummary({ features }: AboutExecutiveSummaryProps) {
  return (
    <section
      id="executive-summary"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-y border-slate-200/60 bg-slate-50 py-24"
      aria-label="Executive summary"
    >
      {/* Deep-link anchors for the Vision / Mission dropdown items */}
      <span id="vision" className="absolute -top-20" aria-hidden />
      <span id="mission" className="absolute -top-20" aria-hidden />
      <div className="mx-auto max-w-[1440px] px-8 md:px-20">
        <InteractiveFeatures
          features={withIcons(features)}
          progressGradientLight="bg-[#22D3EE]"
        />
      </div>
    </section>
  );
}
