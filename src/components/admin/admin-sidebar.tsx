"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Building2,
  Bell,
  ImageIcon,
  LayoutDashboard,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { tab: "dashboard", label: "Command Center", icon: LayoutDashboard },
  { tab: "about", label: "About Us", icon: Building2 },
  { tab: "gallery", label: "Gallery", icon: ImageIcon },
  { tab: "news", label: "News & Notices", icon: Newspaper },
  { tab: "popup", label: "Popup", icon: Bell },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "dashboard";
  const onAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0B2043] text-slate-300">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00EAFF]">
          Unitech CMS
        </p>
        <p className="mt-2 font-heading text-lg font-bold leading-tight text-white">
          Hydropower
        </p>
        <p className="mt-1 text-xs text-slate-400">Command Center</p>
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
                isActive
                  ? "bg-white/10 text-[#00EAFF]"
                  : "text-slate-300 hover:bg-white/5 hover:text-[#00EAFF]"
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
        <p>All modules live on one page — switch tabs instantly.</p>
      </div>
    </aside>
  );
}
