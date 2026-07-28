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
  return <AdminSidebarShell>{children}</AdminSidebarShell>;
}
