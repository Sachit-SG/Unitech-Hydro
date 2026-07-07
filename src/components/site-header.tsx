"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/cn";

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: readonly NavChild[] };

const navItems: readonly NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    children: [
      { href: "/about#introduction", label: "Introduction" },
      { href: "/about#board", label: "Board of Directors" },
      { href: "/about#management-team", label: "Management Team" },
      { href: "/about#vision", label: "Vision" },
      { href: "/about#mission", label: "Mission" },
    ],
  },
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
    <header className="fixed inset-x-0 top-0 z-[200] isolate border-b border-slate-100 bg-white shadow-sm pointer-events-auto">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-8 md:px-20">
        <SiteLogo onClick={() => setOpen(false)} />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navItems.map(({ href, label, children }) => {
            const active = navActive(pathname, href);
            const isCta = href === "/contact";

            if (children) {
              return (
                <div key={href} className="group relative">
                  <Link
                    href={href}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-1 rounded-[4px] px-4 text-[15px] font-medium tracking-wide transition-colors",
                      active
                        ? "bg-brand-blue/10 text-brand-blue"
                        : "text-brand-slate hover:bg-slate-50 hover:text-[#22D3EE]",
                    )}
                  >
                    {label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden
                    />
                  </Link>
                  {/* Dropdown — opens on hover/focus */}
                  <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="min-w-[220px] overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-[0_12px_34px_-12px_rgba(10,58,99,0.28)]">
                      {children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-brand-slate transition-colors hover:bg-slate-50 hover:text-brand-blue"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-[4px] px-4 text-[15px] font-medium tracking-wide transition-colors",
                  isCta
                    ? "ml-2 bg-[#22D3EE] px-6 font-bold text-[#0A3A63] hover:bg-[#22D3EE]/90"
                    : active
                      ? "bg-brand-blue/10 text-brand-blue"
                      : "text-brand-slate hover:bg-slate-50 hover:text-[#22D3EE]",
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
              {navItems.map(({ href, label, children }) => {
                const active = navActive(pathname, href);
                const isCta = href === "/contact";
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-[4px] px-4 py-3 text-[15px] font-medium tracking-wide transition-colors",
                        isCta
                          ? "bg-[#22D3EE] font-bold text-[#0A3A63] hover:bg-[#22D3EE]/90"
                          : active
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "text-brand-slate hover:bg-slate-50 hover:text-[#22D3EE]",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                    {children ? (
                      <ul className="mb-1 ml-3 border-l border-slate-200 pl-3">
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-[4px] px-4 py-2.5 text-sm font-medium text-brand-slate/80 transition-colors hover:bg-slate-50 hover:text-brand-blue"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
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
