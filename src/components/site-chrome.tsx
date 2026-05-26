"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNoticePopup } from "@/components/site-notice-popup";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const reduceMotion = useReducedMotion();

  if (isAdmin) {
    return <>{children}</>;
  }

  // Prevent "bottom -> top" jump by taking control of scroll restoration
  // and scrolling to top immediately on navigation.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      <SiteNoticePopup />
      <div className="flex flex-1 flex-col pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <SiteFooter />
    </>
  );
}
