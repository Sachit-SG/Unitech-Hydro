"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Bell, ImageIcon, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { tab: "gallery", label: "Gallery", icon: ImageIcon },
  { tab: "blog", label: "Blog", icon: Newspaper },
  { tab: "popup", label: "Popup", icon: Bell },
] as const;

function resolveTab(raw: string | null): string {
  if (raw === "news") return "blog";
  if (raw === "dashboard" || raw === "about") return "gallery";
  if (raw && navItems.some((item) => item.tab === raw)) return raw;
  return "gallery";
}

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = resolveTab(searchParams.get("tab"));
  const onAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0A3A63] text-slate-300">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#22D3EE]">
          Unitech CMS
        </p>
        <p className="mt-2 font-heading text-lg font-bold leading-tight text-white">
          Hydropower
        </p>
        <p className="mt-1 text-xs text-slate-400">Content Manager</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Admin navigation">
        {navItems.map((item) => {
          const isActive = onAdmin && activeTab === item.tab;
          const Icon = item.icon;

          return (
            <Link
              key={item.tab}
              href={`/admin?tab=${item.tab}`}
              className={cn(
                "flex items-center gap-3 rounded-[4px] px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ?
                  "bg-white/10 text-[#22D3EE]"
                : "text-slate-300 hover:bg-white/5 hover:text-[#22D3EE]",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-white/10" />

      <div className="px-6 py-4 text-xs text-slate-500">
        <p>Gallery, blog, and popup — synced to the live site.</p>
      </div>
    </aside>
  );
}
