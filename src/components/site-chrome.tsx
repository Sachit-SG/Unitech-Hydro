"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNoticePopup } from "@/components/site-notice-popup";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Keep scroll restoration under our control so navigations don't land mid-page.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <SiteHeader />
      <SiteNoticePopup />
      <div className="flex flex-1 flex-col pt-16">{children}</div>
      <SiteFooter />
    </>
  );
}
