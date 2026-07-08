import type { PostCategory } from "@/lib/repos";

/** Canonical blog posts — covers use /gallery project photography only. */
export type BlogSeed = {
  title: string;
  excerpt: string;
  body: string;
  category: PostCategory;
  cover_url: string;
  external_url?: string | null;
  published_at: string;
};

function paragraphs(...parts: string[]): string {
  return parts.join("\n\n");
}

/** Four items only: three in-site articles + one external press link. */
export const BLOG_POSTS: BlogSeed[] = [
  {
    title: "Upper Phawa Khola reaches commercial operation",
    excerpt:
      "5.8 MW run-of-river project in Taplejung — commercial operation date recorded BS 2081/01/08.",
    body: paragraphs(
      "Unitech Hydropower Company Limited has announced commercial operation of the Upper Phawa Khola Hydroelectric Project — a 5.8 MW run-of-river scheme in Taplejung district. The plant draws design discharge of 2.6 m³/s from Phawa Khola with a gross head of 270 m and net head of 260.1 m, delivering power to the national grid through the Amarpur substation. Commercial operation date is recorded as BS 2081/01/08 per company disclosure.",
      "The project corridor spans Pathivara Yangbarak and Dumrise Shrijangha rural municipalities, with headworks at Ose Dobhan and a surface powerhouse near Dumrise. Conveyance includes a 4,357 m headrace pipe, surge tank, 461 m penstock, and twin Pelton units — reflecting the high-gradient alpine hydrology typical of eastern Nepal's river systems.",
      "Annual PPA energy is modelled at 33.05 GWh, with a dry-season and wet-season profile aligned to Nepal's hydrological calendar. Interconnection is via an 8 km, 33 kV line to Amarpur (132/33 kV), supporting reliable evacuation from the operational asset into the regional transmission network.",
      "For Unitech Hydropower, Upper Phawa Khola represents the company's first operational run-of-river asset — proof of delivery from licence and PPA through civil works, electromechanical commissioning, and grid connection. The project underpins the corporate mandate to convert Nepal's river resources into disciplined, long-term renewable capacity.",
    ),
    category: "Blog",
    cover_url: "/gallery/civil-5.jpeg",
    published_at: "2026-05-11T00:00:00.000Z",
  },
  {
    title: "Energy for a developing nation — our mandate",
    excerpt:
      "Clean run-of-river hydropower, modern technology, and lasting benefit for communities along Nepal's river valleys.",
    body: paragraphs(
      "Unitech Hydropower Company Limited was established to produce clean and renewable hydroelectricity by efficiently utilising Nepal's water resources. The company's motto — energy for a developing nation — reflects a commitment to projects that are environmentally responsible, technically sound, and economically viable over multi-decade operating lives.",
      "From private limited registration in BS 2071 through conversion to a public limited company in BS 2079, Unitech has structured its governance and capital base to support larger hydropower developments and broader investor participation. Disciplined corporate practice, transparent reporting, and alignment with national energy policy remain central to how the board and management steer the portfolio.",
      "Operational and development assets are concentrated in eastern Nepal's alpine river corridors, where run-of-river schemes can capture steep hydraulic head without large storage reservoirs. Engineering choices — Pelton turbines, buried penstocks, and grid-standard interconnection — are selected to match site hydrology and evacuation requirements rather than generic templates.",
      "Beyond megawatts and revenue, Unitech prioritises local employment during construction and operation, skills transfer, and constructive engagement with communities along project corridors. Hydropower here is not only generation capacity; it is infrastructure that supports industrialisation, energy security, and durable socio-economic benefit for Nepal.",
    ),
    category: "Blog",
    cover_url: "/gallery/overview-7.jpeg",
    published_at: "2026-03-20T00:00:00.000Z",
  },
  {
    title: "Iwa Khola — feasibility and development pipeline",
    excerpt:
      "Approximately 15 MW run-of-river project advancing through feasibility, permits, and transmission planning in eastern Nepal.",
    body: paragraphs(
      "The Iwa Khola Hydropower Project is a feasibility-stage run-of-river development of approximately 15.0 MW, planned for execution through Unitech Iwa Hydro Energy Pvt. Ltd., with Unitech Hydropower Company Limited holding a 51% ownership stake. The scheme spans Taplejung and Panchthar districts — extending the company's eastern Nepal pipeline beyond the operational Upper Phawa Khola asset.",
      "Feasibility materials describe a gross head of 400.10 m and design discharge of 4.36 m³/s, combining a 4,382 m headrace tunnel, 503 m headrace pipe, 210 m adit tunnel, and 750 m penstock with a vertical Pelton turbine arrangement. A 132 kV transmission line approximately 22 km in length is planned for grid interconnection as the project advances through licensing and PPA processes.",
      "Energy yield estimates indicate 26.26 GWh dry-season and 60.67 GWh wet-season contribution, with first-year revenue modelled at NPR 51.15 crore at feasibility level. Total project cost is estimated at NPR 336.7 crore (approximately NPR 22.44 crore per MW), with a three-year construction horizon, IRR of 13.22%, and benefit–cost ratio of 1.56 in base-case feasibility analysis.",
      "The company continues environmental review, interconnection studies, and stakeholder consultation as the project moves through survey licence, IEE terms of reference, and connection-agreement milestones. Iwa Khola is positioned as Unitech's flagship growth project — converting feasibility engineering into a bankable, constructible run-of-river scheme for Nepal's developing grid.",
    ),
    category: "Blog",
    cover_url: "/gallery/iwa-1.jpeg",
    published_at: "2026-04-15T00:00:00.000Z",
  },
  {
    title: "Machhapuchhre Capital — underwriting press release",
    excerpt:
      "Public notice regarding underwriting related to Unitech Hydropower — read the full release on Machhapuchhre Capital.",
    body: paragraphs(
      "Machhapuchhre Capital Limited issued a public press notice regarding underwriting related to Unitech Hydropower Company Limited. The notice was published on the Machhapuchhre Capital news portal for investors and stakeholders following regulatory disclosure requirements.",
      "Unitech Hydropower directs shareholders and interested parties to the original release for complete terms, timelines, and contact information. External regulatory and capital-markets communications remain authoritative when they differ from summary notices on this website.",
      "This entry is maintained as a pointer to the official third-party publication rather than a full reproduction of the press release. Select the headline on the News page to open the Machhapuchhre Capital article in a new tab.",
      "For corporate enquiries about Unitech Hydropower capital structure or investor relations, contact the company headquarters in Kupondole, Lalitpur, or email unitechhydropower@gmail.com.",
    ),
    category: "News",
    cover_url: "/gallery/grid-1.jpeg",
    external_url:
      "https://mcl.com.np/news-notices/%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%B8-%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%AA%E0%A5%8D%E0%A4%A4%E0%A5%80-2026",
    published_at: "2026-01-05T00:00:00.000Z",
  },
];

/** Preset cover images for the blog admin picker — gallery album only. */
export const BLOG_COVER_PRESETS: { label: string; src: string }[] = [
  { label: "Phawa valley", src: "/gallery/overview-1.jpeg" },
  { label: "River gorge & bridge", src: "/gallery/overview-7.jpeg" },
  { label: "Intake & headworks", src: "/gallery/civil-5.jpeg" },
  { label: "Forebay basin", src: "/gallery/civil-4.jpeg" },
  { label: "Iwa Khola valley", src: "/gallery/iwa-1.jpeg" },
  { label: "Iwa catchment aerial", src: "/gallery/iwa-2.jpeg" },
  { label: "Pelton units", src: "/gallery/em-2.jpeg" },
  { label: "Control room", src: "/gallery/em-4.jpeg" },
  { label: "33 kV switchyard", src: "/gallery/grid-1.jpeg" },
  { label: "Penstock on hillside", src: "/gallery/grid-2.jpeg" },
];
