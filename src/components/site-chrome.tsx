"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNoticePopup } from "@/components/site-notice-popup";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <SiteNoticePopup />
      <div className="flex flex-1 flex-col pt-16">{children}</div>
      <SiteFooter />
    </>
  );
}
