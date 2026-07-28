"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return (
      <div className="min-h-screen bg-brand-blue-deep">{children}</div>
    );
  }

  return (
    <div className="min-h-screen bg-glacier text-brand-slate">
      <Suspense
        fallback={
          <aside className="fixed inset-y-0 left-0 hidden w-56 bg-brand-blue md:block" />
        }
      >
        <AdminSidebar />
      </Suspense>
      <div className="min-h-screen md:pl-56">{children}</div>
    </div>
  );
}

export function AdminSidebarShell({ children }: { children: React.ReactNode }) {
  return <AdminChrome>{children}</AdminChrome>;
}
