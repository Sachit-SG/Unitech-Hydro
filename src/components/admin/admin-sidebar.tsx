"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

const navItems = [
  { tab: "gallery", label: "Gallery" },
  { tab: "blog", label: "Blog" },
  { tab: "news", label: "News" },
  { tab: "popup", label: "Popup" },
] as const;

function resolveTab(raw: string | null): string {
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
    <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col bg-brand-blue text-white">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-cyan">
          Unitech
        </p>
        <p className="mt-1 font-heading text-lg font-bold tracking-tight text-white">
          Admin
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4" aria-label="Admin navigation">
        {navItems.map((item) => {
          const isActive = onAdmin && activeTab === item.tab;
          return (
            <Link
              key={item.tab}
              href={`/admin?tab=${item.tab}`}
              className={cn(
                "block rounded-[4px] px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ?
                  "bg-white/10 text-brand-cyan"
                : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-3">
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
