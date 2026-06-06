"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Landmark, MapPin } from "lucide-react";

import { SITE_IMAGES } from "@/lib/site-config";

const ABOUT_IMAGE = SITE_IMAGES.aboutPreview;

const shortDescription =
  "The Company was established on 2071/06/20 under the Companies Act of Nepal. Initially, the company was registered as a Private Limited and then converted public limited on 2079/10/19 to facilitate business growth and attract public investment. The office is located at Lalitpur-01, Kupondole, Lalitpur Metropolitan City, Lalitpur district.";

export function AboutPreview() {
  return (
    <section className="border-b border-brand-slate/10 bg-slate-50 py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-8 md:px-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <div className="flex items-stretch gap-4">
              <span className="w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                  About us
                </p>
                <h2 className="mt-3 max-w-none font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
                  Welcome to Unitech Hydropower Company Limited
                </h2>
              </div>
            </div>

            <div className="mt-7 space-y-5 font-sans text-base leading-relaxed text-brand-slate/85 md:text-lg md:leading-8">
              <p>{shortDescription}</p>
              <p>
                <Link
                  href="/about"
                  className="font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  Read company background, Chairman’s message, and governance
                </Link>
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Established (BS)
                  </p>
                </div>
                <p className="mt-1.5 font-heading text-sm font-bold text-brand-blue">2071/06/20</p>
              </div>
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Public Ltd (BS)
                  </p>
                </div>
                <p className="mt-1.5 font-heading text-sm font-bold text-brand-blue">2079/10/19</p>
              </div>
              <div className="col-span-2 rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                      Registered office
                    </p>
                    <address className="mt-1.5 not-italic">
                      <p className="font-heading text-sm font-bold leading-snug text-brand-blue">
                        Lalitpur-01, Kupondole
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-brand-slate/80 md:text-sm">
                        Lalitpur Metropolitan City, Lalitpur, Nepal
                      </p>
                      <p className="mt-1.5 text-[11px] leading-snug text-brand-slate/60 md:text-xs">
                        Project area:{" "}
                        <span className="font-medium text-brand-slate/75">
                          Taplejung &amp; Panchthar
                        </span>
                      </p>
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-[4px] border border-slate-200/60 bg-white shadow-2xl shadow-brand-blue/5">
            <div className="relative h-full min-h-[400px] w-full lg:min-h-[580px]">
              <Image
                src={ABOUT_IMAGE}
                alt="Upper Phawa Khola — intake forebay and headworks, Unitech Hydropower"
                fill
                className="object-cover object-bottom"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority={false}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
