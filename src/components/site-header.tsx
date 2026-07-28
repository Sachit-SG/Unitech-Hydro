"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
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
  { href: "/blog", label: "Blog & News" },
  { href: "/contact", label: "Contact" },
] as const;

function navActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/") || pathname === "/news";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function AboutDropdown({
  href,
  label,
  items,
  active,
}: {
  href: string;
  label: string;
  items: readonly NavChild[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={cn(
          "inline-flex min-h-11 items-center gap-0.5 border-b-2 px-1 text-[15px] font-medium tracking-wide transition-colors",
          open || active
            ? "border-[#22D3EE] text-[#0A3A63]"
            : "border-transparent text-brand-slate hover:text-[#0A3A63]",
        )}
      >
        <Link
          href={href}
          className="py-2"
          onClick={() => setOpen(false)}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          aria-label={`${label} menu`}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-9 w-8 items-center justify-center rounded-[4px] hover:bg-slate-50"
        >
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 min-w-[15rem] pt-2"
          >
            <div className="overflow-hidden rounded-md border border-slate-200/80 bg-white shadow-[0_18px_40px_-24px_rgba(10,58,99,0.45)]">
              <ul className="p-1.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="block rounded-sm px-3 py-2.5 text-sm font-medium text-brand-slate transition-colors hover:bg-slate-50 hover:text-[#0A3A63]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setMobileAboutOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[200] isolate border-b border-slate-100/90 bg-white/95 shadow-[0_1px_0_rgba(10,58,99,0.04)] backdrop-blur-md pointer-events-auto">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-8 md:px-20">
        <SiteLogo onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navItems.map(({ href, label, children }) => {
            const active = navActive(pathname, href);
            const isCta = href === "/contact";

            if (children) {
              return (
                <AboutDropdown
                  key={href}
                  href={href}
                  label={label}
                  items={children}
                  active={active}
                />
              );
            }

            if (isCta) {
              return (
                <Link
                  key={href}
                  href={href}
                  className="ml-1 inline-flex min-h-10 items-center rounded-md bg-[#0A3A63] px-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0A3A63]/90"
                >
                  {label}
                </Link>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex min-h-11 items-center border-b-2 px-1 text-[15px] font-medium tracking-wide transition-colors",
                  active
                    ? "border-[#22D3EE] text-[#0A3A63]"
                    : "border-transparent text-brand-slate hover:text-[#0A3A63]",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-brand-slate transition-colors hover:border-slate-300 hover:text-[#0A3A63] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
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
            className="overflow-hidden border-b border-slate-100 bg-white md:hidden"
            aria-label="Primary mobile"
          >
            <ul className="mx-auto max-w-[1440px] space-y-1 px-8 py-4 md:px-20">
              {navItems.map(({ href, label, children }) => {
                const active = navActive(pathname, href);
                const isCta = href === "/contact";

                if (children) {
                  return (
                    <li key={href}>
                      <div
                        className={cn(
                          "flex items-center rounded-md transition-colors",
                          active || mobileAboutOpen
                            ? "bg-slate-50 text-[#0A3A63]"
                            : "text-brand-slate",
                        )}
                      >
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className="min-w-0 flex-1 px-3 py-3 text-left text-[15px] font-medium tracking-wide hover:text-[#0A3A63]"
                        >
                          {label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={mobileAboutOpen}
                          aria-label={`${label} sections`}
                          onClick={() => setMobileAboutOpen((value) => !value)}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-slate-100"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              mobileAboutOpen && "rotate-180",
                            )}
                            aria-hidden
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobileAboutOpen ? (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            {children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-md px-3 py-2.5 pl-5 text-sm font-medium text-brand-slate/80 transition-colors hover:bg-slate-50 hover:text-[#0A3A63]"
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-md px-3 py-3 text-[15px] font-medium tracking-wide transition-colors",
                        isCta
                          ? "bg-[#0A3A63] font-semibold text-white"
                          : active
                            ? "bg-slate-50 text-[#0A3A63]"
                            : "text-brand-slate hover:bg-slate-50 hover:text-[#0A3A63]",
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
