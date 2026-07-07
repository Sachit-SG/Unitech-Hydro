import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, FileDigit, Hash, Landmark, MapPin } from "lucide-react";
import { AboutExecutiveSummary } from "@/components/about/about-executive-summary";
import { CapitalStructureInfographic } from "@/components/about/capital-structure-infographic";
import { CompanyTimelineShowcase } from "@/components/about/company-timeline-showcase";
import { LeadershipGrid } from "@/components/about/leadership-profile-card";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { SITE_IMAGES } from "@/lib/site-config";
import { boardMembers, managementTeamMembers } from "@/lib/team-members";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Welcome to Unitech Hydropower Company Limited — corporate profile, Chairman’s message, board, capital structure, and mission.",
};

const INTRO_IMAGE = SITE_IMAGES.aboutGlance;

const companyBackground = [
  "Unitech Hydropower Company Limited is a Nepal-based energy development company established with the motto of producing clean and renewable hydroelectricity by efficiently utilising the country’s water resources — committed to sustainable energy development through environmentally responsible hydropower projects that contribute to Nepal’s long-term energy security.",
  "With a strong focus on environmental protection and modern technology, the company generates reliable, efficient power while minimising ecological impact, aligning with global standards of sustainable infrastructure and responsible resource utilisation.",
  "Beyond energy production, Unitech also drives socio-economic development — creating employment and supporting local communities in project-affected areas, improving livelihoods and fostering regional development.",
  "The Company was established on 2071/06/20 under the Companies Act of Nepal, initially as a Private Limited company and converted to Public Limited on 2079/10/19 to facilitate growth and attract public investment. The head office is located at Lalitpur-01, Kupondole, Lalitpur Metropolitan City.",
] as const;

const chairmanMessageParagraphs = [
  "It gives me great pleasure to welcome you to Unitech Hydropower Company Limited.",
  "Since our establishment, we have remained committed to contributing to Nepal’s growing energy needs through the sustainable development of hydropower resources. Our transition from a Private Limited Company to a Public Limited Company reflects our dedication to growth, transparency, and broader stakeholder participation.",
  "Nepal’s hydropower sector holds immense potential, and we believe that its responsible development is key to long-term national progress. At Unitech Hydropower, we are focused on delivering efficient, environmentally responsible, and economically viable energy projects that create sustainable value for all stakeholders.",
  "During the project development phase, the Company faced several significant challenges that impacted construction progress and project cost. The COVID-19 pandemic resulted in major disruptions, including nearly one year of inactivity during the first lockdown. As the lockdown was lifted during the rainy season, immediate remobilization of works was not feasible, leading to further delays. The second lockdown also hindered critical activities such as headworks construction and pipeline excavation.",
  "Operational and logistical constraints further affected progress, including the provision of support to local administrative offices during the pandemic and detention of electro-mechanical equipment at the border, resulting in additional charges. The project also experienced financial pressure due to delays in mobilization of committed equity, along with a sharp increase in fuel prices, which significantly impacted construction and transportation costs.",
  "In addition, approval for army mobilization was delayed due to requirements for on-site barracks and bunkers, leading to additional costs beyond initial project estimates. After several rounds of coordination, approval was obtained to utilize the Taplejung Barrack for deployment, enabling further progress of the project. Overall, these combined factors resulted in a time lapse of approximately 20 months from the initial mobilization of the civil contractor, leading to both schedule delays and increased project costs.",
  "Despite these challenges, our commitment to delivering reliable and sustainable hydropower solutions remains unwavering. We continue to strengthen our project management practices and coordination efforts to overcome obstacles and ensure successful project completion.",
  "We are guided by strong principles of integrity, accountability, and innovation. With the continued support of our investors, partners, and dedicated team, we are confident in achieving our goals and contributing meaningfully to Nepal’s energy sector.",
  "I would like to express my sincere gratitude to all our stakeholders for their trust and support. We look forward to achieving new milestones together.",
  "Thank you.",
] as const;

/** Chronological (BS) — source: company-context.md */
const companyTimelineEvents = [
  {
    date: "2071/06/10",
    title: "Initial company registration (Private Limited)",
  },
  {
    date: "2074/11/11",
    title: "PPA (Power Purchase Agreement)",
    description:
      "Secured agreement for the sale of 33.05 GWh of annual energy, ensuring long-term revenue stability.",
  },
  {
    date: "2075/01/05",
    title: "Initial industry registration",
    registrationNo: "5120",
  },
  {
    date: "2075/05/19",
    title: "Generation licence",
  },
  {
    date: "2079/10/06",
    title: "Converted to Public Limited",
    description:
      "Transitioned corporate structure to facilitate business growth, transparency, and attract broader public investment.",
    milestone: true,
  },
  {
    date: "2081/01/08",
    title: "Commercial Operation Date (COD)",
    description:
      "Successfully commenced commercial power generation of 5.8 MW, overcoming significant global and logistical challenges.",
    milestone: true,
  },
  {
    date: "2082/03/29",
    title: "Industry registration (Public Limited)",
    registrationNo: "5120",
  },
] as const;

const unitechFeatures = [
  {
    id: 1,
    title: "Our Vision",
    description:
      "To become a leading hydropower company in Nepal by developing sustainable, reliable, and environmentally responsible energy solutions that contribute to national prosperity and a greener future.",
    image: SITE_IMAGES.aboutVision,
  },
  {
    id: 2,
    title: "Our Mission",
    description:
      "To harness Nepal’s water resources efficiently to generate clean and renewable energy using modern technology, while ensuring environmental protection.",
    image: SITE_IMAGES.aboutMission,
  },
  {
    id: 3,
    title: "Community Impact",
    description:
      "Creating positive socio-economic impact through employment opportunities and supporting local communities in project-affected areas, fostering regional development.",
    image: SITE_IMAGES.aboutCommunity,
  },
] as const;

function SectionHeading({
  kicker,
  title,
  id,
}: {
  kicker: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="flex items-start gap-4" id={id}>
      <span className="mt-1 h-8 w-[2px] shrink-0 bg-brand-cyan" aria-hidden />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
          {kicker}
        </p>
        <h2 className="mt-3 max-w-[28ch] text-balance font-heading text-3xl font-bold leading-[1.15] tracking-tight text-brand-blue md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell title="About Us" heroPriority>
      {/* Welcome + short description */}
      <section id="introduction" className="-mx-8 scroll-mt-20 bg-slate-50 px-8 pt-32 pb-24 md:-mx-20 md:px-20 md:pb-28">
        <p className="mb-14 text-center font-heading text-2xl font-bold text-brand-blue md:mb-20 md:text-3xl">
          Welcome to Unitech Hydropower Company Limited
        </p>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-16">
          <div className="relative aspect-[4/3] min-h-[260px] w-full overflow-hidden rounded-[4px] border border-slate-200/60 bg-white shadow-xl shadow-brand-blue/5 lg:aspect-auto lg:h-full lg:min-h-0">
            <Image
              src={INTRO_IMAGE}
              alt="Unitech Hydropower — corporate and project context"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"
              aria-hidden
            />
          </div>
          <div>
            <SectionHeading kicker="About us" title="Company at a glance" />
            <div className="mt-8 space-y-4 text-base leading-relaxed text-brand-slate/90 md:text-[17px] md:leading-8">
              {companyBackground.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-brand-slate/70">
              <Link
                href="/projects"
                className="font-semibold text-brand-blue underline-offset-4 hover:underline"
              >
                Projects
              </Link>
              <span className="text-brand-slate/40"> · </span>
              <Link
                href="/contact"
                className="font-semibold text-brand-blue underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/55">
                    Established (BS)
                  </p>
                </div>
                <p className="mt-1.5 font-heading text-sm font-bold text-brand-blue">2071/06/20</p>
              </div>
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/55">
                    Public Ltd (BS)
                  </p>
                </div>
                <p className="mt-1.5 font-heading text-sm font-bold text-brand-blue">2079/10/19</p>
              </div>
              <div className="col-span-2 rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/55">
                    Office
                  </p>
                </div>
                <div className="mt-2 pl-6">
                  <p className="font-heading text-sm font-bold leading-snug text-brand-blue">
                    Lalitpur-01, Kupondole
                  </p>
                  <p className="mt-0.5 text-xs text-brand-slate/75">
                    Lalitpur Metropolitan City, Lalitpur
                  </p>
                </div>
              </div>
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/55">
                    Reg. No.
                  </p>
                </div>
                <p className="mt-1.5 font-heading text-sm font-bold text-brand-blue">127161/071/072</p>
              </div>
              <div className="rounded-[4px] border border-slate-200/80 bg-white px-3 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <FileDigit className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/55">
                    PAN
                  </p>
                </div>
                <p className="mt-1.5 font-heading text-sm font-bold text-brand-blue">602422574</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CompanyTimelineShowcase events={companyTimelineEvents} />

      <AboutExecutiveSummary features={unitechFeatures} />

      {/* Chairman's message */}
      <section
        id="chairman-message"
        className="-mx-8 border-t border-slate-200/60 bg-slate-50 px-8 pt-16 pb-24 md:-mx-20 md:px-20 md:pt-20 md:pb-28"
      >
        <SectionHeading kicker="Leadership" title="Chairman’s message" />
        <p className="mt-4 text-sm font-medium text-brand-slate/80 md:text-base">
          A message from <strong className="text-brand-blue">Anoj Khadka</strong>, Chairman
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-start lg:gap-14">
          <aside className="mx-auto w-full max-w-[440px] lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[4px] border border-slate-200/80 bg-white text-center shadow-sm">
              {/* Portrait frame — slightly wider than 3:4 so height is a bit shorter; use `Image` fill + object-cover */}
              <div className="relative aspect-[4/5] w-full bg-slate-100">
                <Image
                  src={SITE_IMAGES.chairmanPortrait}
                  alt="Anoj Khadka, Chairman"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(min-width: 1024px) 440px, 100vw"
                  priority
                />
              </div>
              <div className="px-5 py-5">
                <p className="font-heading text-lg font-bold text-brand-blue">Anoj Khadka</p>
                <p className="mt-1 text-sm text-brand-slate/70">Chairman</p>
              </div>
            </div>
          </aside>
          <div className="min-w-0 space-y-6 text-base leading-relaxed text-brand-slate/90 md:text-[17px] md:leading-8">
            {chairmanMessageParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Capital structure */}
      <section
        id="investment-profile"
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-t border-slate-200/60 bg-[#0A3A63] py-10 text-white md:py-12"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#112a57_0%,_#0A3A63_65%)]"
          aria-hidden
        />
        <div className="tex-contour-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-[1440px] px-8 md:px-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#22D3EE]">
              Capital structure
            </p>
            <h2 className="mx-auto mt-3 max-w-[20ch] text-balance font-heading text-3xl font-bold leading-[1.2] tracking-tight text-white md:text-4xl">
              Investment profile
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
              Amounts in NPR crore unless stated.
            </p>
          </div>

          <Reveal>
            <CapitalStructureInfographic />
          </Reveal>
        </div>
      </section>

      {/* Board of directors */}
      <section
        id="board"
        className="-mx-8 border-t border-slate-200/60 bg-white px-8 py-24 md:-mx-20 md:px-20 md:py-28"
      >
        <SectionHeading kicker="Governance" title="Board of Directors (BOD)" />
        <Reveal className="mt-10">
          <LeadershipGrid members={boardMembers} />
        </Reveal>
      </section>

      {/* Management team */}
      <section
        id="management-team"
        className="-mx-8 border-t border-slate-200/60 bg-white px-8 py-24 md:-mx-20 md:px-20 md:py-28"
      >
        <SectionHeading kicker="Operations" title="Management team" />
        <Reveal className="mt-10">
          <LeadershipGrid members={managementTeamMembers} />
        </Reveal>
      </section>

    </PageShell>
  );
}
