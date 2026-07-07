import Link from "next/link";
import { FooterLeadColumn } from "@/components/footer-lead-column";
import { SiteLogo } from "@/components/site-logo";

const PHONE_DISPLAY = "01-4106123";
const PHONE_HREF = "tel:+97714106123";
const EMAIL = "unitechhydropower@gmail.com";

/** Replace with official profile URLs when published. */
const SOCIAL_LINKEDIN = "https://www.linkedin.com/";
const SOCIAL_INSTAGRAM = "https://www.instagram.com/";

const sitemapLinks = [
  { href: "/about", label: "About Us" },
  { href: "/about#chairman-message", label: "Chairman’s message" },
  { href: "/about#board", label: "Board of Directors" },
  { href: "/projects", label: "Projects" },
  { href: "/about#investment-profile", label: "Capital structure" },
  { href: "/news", label: "News & Notice" },
  { href: "/gallery", label: "Gallery" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0A3A63] text-white">
      <div
        className="tex-contour-dark pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-8 py-20 md:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1 — Identity */}
          <div className="max-w-sm">
            <SiteLogo />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-white">
              Energy for a Developing Nation
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Driving Nepal&apos;s industrial future through sustainable,
              run-of-river hydropower engineering.
            </p>
          </div>

          {/* Column 2 — Sitemap */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Sitemap
            </h2>
            <ul className="mt-5 space-y-3">
              {sitemapLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-300 transition-colors hover:text-[#22D3EE]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Geography only */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Locations
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300">
              <div>
                <p className="font-semibold text-white">Nepal headquarters</p>
                <p className="mt-1 text-slate-300">
                  Lalitpur-01, Kupondole
                  <br />
                  Lalitpur Metropolitan City, Lalitpur, Nepal
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Project sites</p>
                <p className="mt-1">Taplejung &amp; Panchthar</p>
              </div>
            </div>
          </div>

          {/* Column 4 — Lead gen & contact */}
          <div className="min-w-0">
            <FooterLeadColumn
              phoneDisplay={PHONE_DISPLAY}
              phoneHref={PHONE_HREF}
              email={EMAIL}
              socialLinkedIn={SOCIAL_LINKEDIN}
              socialInstagram={SOCIAL_INSTAGRAM}
            />
          </div>
        </div>

        <div
          className="mt-16 mb-8 border-t border-white/10"
          aria-hidden
        />

        <div className="flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>© 2026 Unitech Hydropower Company Ltd.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#22D3EE]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#22D3EE]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
