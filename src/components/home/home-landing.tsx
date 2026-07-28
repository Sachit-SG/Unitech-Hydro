"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AboutPreview } from "@/components/home/about-preview";
import { NewsSection } from "@/components/home/news-section";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { REVEAL_DISTANCE, REVEAL_DURATION, REVEAL_EASE } from "@/components/ui/reveal";
import { getProjectCardImage } from "@/lib/gallery-data";
import type { PublicBlogArticle } from "@/lib/blog-public";
import { SITE_IMAGES } from "@/lib/site-config";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const OPERATIONAL_IMAGE = getProjectCardImage("upper-phawa-khola");

const PIPELINE_IMAGE = getProjectCardImage("middle-iwa-khola");

export function HomeLanding({ blogArticles }: { blogArticles: PublicBlogArticle[] }) {
  return (
    <div className="bg-glacier text-brand-slate">
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
              <div className="w-max max-w-[min(100vw-6rem,36rem)] lg:w-[34rem] lg:max-w-none">
                <div className="h-px w-12 bg-brand-cyan/70" aria-hidden />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                  Leadership
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-brand-blue lg:text-4xl">
                  Chairman&apos;s message
                </h2>
              </div>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-slate/85 md:text-lg">
                From <strong className="font-semibold text-brand-blue">Anoj Khadka</strong>, Chairman
                — welcome, our path from private to public company, and how we are meeting
                Nepal&apos;s energy needs.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 grid items-stretch gap-8 md:grid-cols-[max-content_minmax(0,1fr)] md:gap-10 lg:gap-12"
            >
              <div className="flex h-full min-h-0 items-stretch">
                <figure className="flex h-full w-max max-w-[min(100vw-6rem,36rem)] flex-col overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm lg:w-[34rem] lg:max-w-none">
                  <div className="relative aspect-[5/6] w-full shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={SITE_IMAGES.chairmanPortrait}
                      alt="Anoj Khadka, Chairman"
                      fill
                      className="object-cover object-[50%_32%]"
                      sizes="(min-width: 1024px) 576px, (min-width: 768px) 480px, 100vw"
                    />
                  </div>
                  <figcaption className="px-6 py-4 text-center">
                    <span className="font-heading text-sm font-bold uppercase tracking-widest text-brand-blue">
                      Anoj Khadka
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-brand-slate/70">
                      Chairman
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="flex min-h-0 flex-col border-l-0 border-brand-cyan/70 py-2 md:border-l-4 md:pl-8 lg:pl-10">
                <blockquote className="flex-1 space-y-4 text-base leading-relaxed text-brand-slate/90 md:space-y-5 md:text-lg md:leading-8">
                  <p className="font-heading text-lg font-medium italic leading-relaxed text-brand-blue md:text-xl">
                    &ldquo;It gives me great pleasure to welcome you to Unitech
                    Hydropower Company Limited. Since our establishment, we have
                    remained committed to contributing to Nepal&apos;s growing
                    energy needs through the sustainable development of
                    hydropower resources.&rdquo;
                  </p>
                  <p>
                    Our transition from a Private Limited Company to a Public Limited
                    Company reflects our dedication to growth, transparency, and broader
                    stakeholder participation. Nepal&apos;s hydropower sector holds immense
                    potential, and we are focused on delivering efficient, environmentally
                    responsible projects that create sustainable value.
                  </p>
                  <p>
                    During project development we faced significant challenges, including
                    COVID-19 lockdowns and logistical constraints — contributing to roughly{" "}
                    <strong>twenty months</strong> of schedule impact. Operational delays,
                    border detention of electro-mechanical equipment, and equity mobilisation
                    pressures added further complexity to delivery.
                  </p>
                  <p>
                    Despite these setbacks, our commitment to reliable, sustainable
                    hydropower remains unwavering. We are guided by integrity,
                    accountability, and innovation — and grateful for the trust placed in us
                    by investors, partners, and communities across eastern Nepal.
                  </p>
                </blockquote>
                <Link
                  href="/about#chairman-message"
                  className="mt-auto shrink-0 pt-6 text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  Read the full Chairman&apos;s message
                </Link>
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
                    alt="Upper Phawa Khola — intake and headworks"
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
                    src={PIPELINE_IMAGE}
                    alt="Iwa Khola — river valley, Taplejung and Panchthar"
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
                    Iwa Khola (15.0 MW)
                  </h3>
                  <p className="mt-2 text-sm text-brand-slate/80">
                    Feasibility-stage ROR · 51% via Unitech Iwa Hydro Energy Pvt.
                    Ltd. · 4,382 m tunnel · NPR 51.15 Cr first-year revenue (est.)
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
      <section className="border-t border-slate-200/60 bg-slate-50 py-16">
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

            <motion.div variants={fadeUp}>
              <PartnersMarquee />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <NewsSection articles={blogArticles} />
    </div>
  );
}
