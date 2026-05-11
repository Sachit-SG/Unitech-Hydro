"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

function navActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-8 py-3.5 md:px-20">
        <Link
          href="/"
          className="group flex min-w-0 flex-col leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="font-heading text-xl font-bold tracking-tighter text-brand-blue md:text-2xl">
            UNITECH
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-brand-slate/60 md:text-[11px]">
            Hydropower
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navItems.map(({ href, label }) => {
            const active = navActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-[4px] px-3 py-2 text-[13px] font-medium transition-colors lg:text-sm",
                  active
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "text-brand-slate hover:bg-slate-50 hover:text-brand-blue",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-slate shadow-sm transition-colors hover:border-slate-300 hover:text-brand-blue md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-slate-100 bg-white md:hidden"
            aria-label="Primary mobile"
          >
            <ul className="mx-auto max-w-[1440px] space-y-0.5 px-8 py-3 md:px-20">
              {navItems.map(({ href, label }) => {
                const active = navActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-[4px] px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-brand-blue/10 text-brand-blue"
                          : "text-brand-slate hover:bg-slate-50 hover:text-brand-blue",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
