"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Landmark, MapPin } from "lucide-react";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=80";

export function AboutPreview() {
  return (
    <section className="border-b border-brand-slate/10 bg-slate-50 py-24 md:py-24">
      <div className="mx-auto max-w-[1440px] px-8 md:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:gap-20">
          <div>
            <div className="flex items-stretch gap-4">
              <span className="w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                  About us
                </p>
                <h2 className="mt-3 max-w-none font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
                  A Decade of Engineering Excellence.
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-6 font-sans text-base leading-relaxed text-brand-slate/85 md:text-lg md:leading-8">
              <p>
                Unitech Hydropower Company Limited develops run-of-river
                hydropower with modern technology, environmental responsibility,
                and transparent delivery.
              </p>
              <p>
                The company transitioned from private to public limited status
                to support growth, transparency, and broader stakeholder
                participation.
              </p>
              <p>
                <Link
                  href="/about"
                  className="font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  Learn more
                </Link>
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-brand-cyan" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Est.
                  </p>
                </div>
                <p className="mt-2 font-heading text-sm font-bold text-brand-blue">
                  2014
                </p>
              </div>
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-brand-cyan" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Public Ltd
                  </p>
                </div>
                <p className="mt-2 font-heading text-sm font-bold text-brand-blue">
                  2023
                </p>
              </div>
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-4 py-4 shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate/55">
                    Location
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-cyan" aria-hidden />
                  <p className="font-heading text-sm font-bold text-brand-blue">
                    Taplejung &amp; Panchthar
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-[4px] border border-slate-200/60 bg-white shadow-2xl shadow-brand-blue/5">
            <div className="relative h-full min-h-[420px] w-full lg:min-h-[620px]">
              <Image
                src={ABOUT_IMAGE}
                alt="Hydropower site placeholder — project environment"
                fill
                className="object-cover object-center"
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

