"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, UserRound } from "lucide-react";
import { TechnicalStatusBar } from "@/components/home/technical-status-bar";
import { AboutPreview } from "@/components/home/about-preview";
import { NewsSection } from "@/components/home/news-section";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const HERO_IMAGE = "/Hydro1.jpg";

const HEADLINE_WORDS =
  "Precision hydropower for Nepal".split(" ");

const OPERATIONAL_IMAGE =
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80";

const partners = [
  { name: "Nepal Electricity Authority", label: "NEA" },
  { name: "Electricity Regulatory Commission", label: "ERC" },
  { name: "Machhapuchhre Bank", label: "MACHHAPUCHHRE" },
  { name: "Laxmi Sunrise Bank", label: "LAXMI SUNRISE" },
  { name: "Guheshwori Merchant Banking", label: "GUHESHWORI" },
] as const;

export function HomeLanding() {
  return (
    <div className="bg-glacier text-brand-slate">
      {/* —— Cinematic hero (100vh) —— */}
      <section className="relative h-[100vh] min-h-[100vh] max-h-[100vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-center will-change-transform"
          animate={{ scale: [1, 1.05] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Mountain river valley — hydropower setting placeholder"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/60 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 h-[100vh]">
          <div className="mx-auto flex h-full max-w-[1440px] flex-col px-6 md:px-20">
            <div className="flex min-h-0 flex-1 flex-col items-start justify-center pb-44 pt-28 md:pb-40 md:pt-32">
              <div className="w-full max-w-3xl">
                <div className="flex items-stretch gap-5 md:gap-6">
                  <div
                    className="w-[2px] shrink-0 self-stretch rounded-full bg-brand-cyan"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <h1 className="text-left font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                      {HEADLINE_WORDS.map((word, i) => (
                        <motion.span
                          key={`${word}-${i}`}
                          className="inline-block pr-[0.2em] last:pr-0"
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.2 + i * 0.1,
                            duration: 0.65,
                            ease: easeOutExpo,
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h1>

                    <motion.p
                      className="mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-brand-cyan"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.75,
                        duration: 0.55,
                        ease: easeOutExpo,
                      }}
                    >
                      Alpine energy · Nepal
                    </motion.p>
                    <motion.p
                      className="mt-4 max-w-2xl text-left text-base leading-relaxed text-white/90 md:text-lg md:leading-8"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.88,
                        duration: 0.55,
                        ease: easeOutExpo,
                      }}
                    >
                      Unitech Hydropower Company Limited develops run-of-river
                      hydropower with modern technology, environmental
                      responsibility, and transparent delivery—supporting
                      Nepal&apos;s renewable energy future and local communities
                      in project areas.
                    </motion.p>
                    <motion.div
                      className="mt-10 flex flex-wrap gap-3"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1,
                        duration: 0.55,
                        ease: easeOutExpo,
                      }}
                    >
                      <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-[4px] border border-transparent bg-brand-blue px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan hover:shadow-[0_0_0_1px_rgba(0,210,255,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan md:text-sm"
                      >
                        View projects
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Link>
                      <Link
                        href="/about#investment-profile"
                        className="inline-flex items-center rounded-[4px] border border-white/35 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-[border-color,box-shadow,background-color] hover:border-brand-cyan/60 hover:bg-white/15 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.22)] md:text-sm"
                      >
                        Investment profile
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TechnicalStatusBar dockedToHero />
        </div>
      </section>

      {/* —— About —— */}
      <AboutPreview />

      {/* —— Chairman’s vision —— */}
      <section className="border-b border-brand-slate/10 bg-glacier-mist pt-24 pb-24 md:pt-24 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-12 md:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-start gap-4">
                <span
                  className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan"
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                    Leadership
                  </p>
                  <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
                    Chairman&apos;s vision
                  </h2>
                </div>
              </div>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-slate/85 md:text-lg">
                From company disclosures — integrity, accountability, and
                innovation as we scale from private to public company.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 grid gap-12 md:grid-cols-2 md:items-stretch md:gap-16"
            >
              <figure className="flex flex-col overflow-hidden rounded-[4px] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm">
                <div className="flex min-h-[280px] flex-1 flex-col items-center justify-center gap-4 bg-gradient-to-br from-brand-slate/10 to-brand-blue/[0.06] p-10">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-brand-slate/20 text-brand-slate/35">
                    <UserRound className="h-12 w-12" strokeWidth={1.2} />
                  </div>
                  <p className="text-center text-xs text-brand-slate/55">
                    Professional portrait placeholder — Anoj Khadka
                  </p>
                </div>
                <figcaption className="border-t border-brand-slate/10 bg-white/80 px-6 py-4 text-center">
                  <span className="font-heading text-sm font-bold uppercase tracking-widest text-brand-blue">
                    Anoj Khadka
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-brand-slate/70">
                    Chairman
                  </span>
                </figcaption>
              </figure>

              <div className="flex flex-col justify-center border-l-0 border-brand-cyan/70 py-2 md:border-l-4 md:pl-10">
                <blockquote className="space-y-5 text-base leading-relaxed text-brand-slate/90 md:text-lg md:leading-8">
                  <p className="font-heading text-lg font-medium italic leading-relaxed text-brand-blue md:text-xl">
                    &ldquo;It gives me great pleasure to welcome you to Unitech
                    Hydropower Company Limited. Since our establishment, we have
                    remained committed to contributing to Nepal&apos;s growing
                    energy needs through the sustainable development of
                    hydropower resources.&rdquo;
                  </p>
                  <p>
                    Our transition from a <strong>Private Limited</strong> to a{" "}
                    <strong>Public Limited</strong> company reflects our
                    dedication to <strong>growth, transparency</strong>, and{" "}
                    <strong>broader stakeholder participation</strong>. We are
                    guided by <strong>integrity, accountability, and innovation</strong>
                    — building reliable projects that create sustainable value.
                  </p>
                </blockquote>
                <p className="mt-6 text-sm text-brand-slate/70">
                  Paraphrased from the Chairman&apos;s message and themes recorded
                  in <span className="font-medium text-brand-slate">company-context.md</span>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* —— Project gallery —— */}
      <section className="border-t border-slate-200/60 bg-white/40 py-24 backdrop-blur-sm md:py-24">
        <div className="mx-auto max-w-[1440px] px-12 md:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="max-w-2xl">
              <div className="flex items-start gap-4">
                <span
                  className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan"
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                    Projects
                  </p>
                  <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
                    Portfolio at a glance
                  </h2>
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed text-brand-slate/85 md:text-lg">
                Operating asset and development pipeline — full technical sheets
                live on a single projects page.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              <motion.article
                variants={fadeUp}
                className="overflow-hidden rounded-[4px] border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm"
              >
                <div className="relative aspect-[16/10] border-b border-slate-100">
                  <Image
                    src={OPERATIONAL_IMAGE}
                    alt="Upper Phawa Khola placeholder"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-[4px] bg-emerald-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Operational
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-blue">
                    Upper Phawa Khola
                  </h3>
                  <p className="mt-2 text-sm text-brand-slate/80">
                    5.8 MW · 2 × Pelton · ~8 km 33 kV to Amarpur · COD BS
                    2081/01/08
                  </p>
                  <Link
                    href="/projects"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-cyan"
                  >
                    View details
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </motion.article>

              <motion.article
                variants={fadeUp}
                className="overflow-hidden rounded-[4px] border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm"
              >
                <div className="relative aspect-[16/10] border-b border-slate-100">
                  <Image
                    src={HERO_IMAGE}
                    alt="Middle Iwa Khola development placeholder"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-[4px] bg-amber-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Under development
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-blue">
                    Middle Iwa Khola
                  </h3>
                  <p className="mt-2 text-sm text-brand-slate/80">
                    15 MW · 51% · 400.10 m gross head · Vertical Pelton · ~22 km
                    132 kV (feasibility)
                  </p>
                  <Link
                    href="/projects"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-cyan"
                  >
                    View details
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </motion.article>
            </div>
          </motion.div>
        </div>
      </section>

      {/* —— Partners —— */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-[1440px] px-12 md:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="mx-auto max-w-2xl">
              <div className="mx-auto h-px w-12 bg-brand-cyan/70" aria-hidden />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                Consortium &amp; partners
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue lg:text-5xl">
                Trusted by
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative mt-10 min-h-[120px] overflow-hidden py-8"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <motion.div
                className="flex w-max items-stretch gap-5"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 32,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...partners, ...partners].map((p, idx) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${p.label}-${idx}`}
                    className="flex h-20 w-40 select-none items-center justify-center rounded-[4px] border border-slate-200 bg-slate-100 px-6 text-center font-bold text-slate-400 shadow-sm grayscale transition-[border-color,box-shadow,filter] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.22)] hover:grayscale-0"
                    title={p.name}
                  >
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      {p.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <NewsSection />
    </div>
  );
}
