"use client";

import { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminSidebarShell() {
  return (
    <Suspense fallback={<aside className="fixed inset-y-0 left-0 z-40 w-64 bg-[#0B2043]" />}>
      <AdminSidebar />
    </Suspense>
  );
}
