import type { Metadata } from "next";
import { AdminSidebarShell } from "@/components/admin/admin-sidebar-shell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebarShell />
      <div className="min-h-screen pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
