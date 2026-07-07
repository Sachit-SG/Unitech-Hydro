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

export const BLOG_POSTS: BlogSeed[] = [
  {
    title: "Upper Phawa Khola reaches commercial operation",
    excerpt:
      "5.8 MW run-of-river project in Taplejung — commercial operation date recorded BS 2081/01/08.",
    body:
      "Unitech Hydropower Company Limited announced commercial operation of the Upper Phawa Khola Hydroelectric Project (5.8 MW, ROR) in Taplejung. The plant draws design discharge from Phawa Khola with a gross head of 270 m, connecting at Amarpur substation. COD is recorded as BS 2081/01/08 per company disclosure.",
    category: "Projects",
    cover_url: "/gallery/civil-5.jpeg",
    published_at: "2026-05-11T00:00:00.000Z",
  },
  {
    title: "Iwa Khola — feasibility and development pipeline",
    excerpt:
      "Approximately 15 MW run-of-river project advancing through feasibility, permits, and transmission planning in eastern Nepal.",
    body:
      "Iwa Khola remains a flagship development-stage project in Unitech's portfolio. The company continues feasibility work, environmental review, and grid interconnection planning for the ~15 MW scheme — part of a broader commitment to renewable capacity in Nepal's alpine river corridors.",
    category: "Projects",
    cover_url: "/gallery/iwa-1.jpeg",
    published_at: "2026-04-15T00:00:00.000Z",
  },
  {
    title: "Energy for a developing nation — our mandate",
    excerpt:
      "Clean run-of-river hydropower, modern technology, and lasting benefit for communities along Nepal's river valleys.",
    body:
      "Unitech Hydropower develops renewable electricity with environmental responsibility and local socio-economic benefit at the centre of every project. From Taplejung's high-gradient rivers to disciplined corporate governance, we align engineering rigour with Nepal's national energy goals.",
    category: "Corporate",
    cover_url: "/gallery/overview-7.jpeg",
    published_at: "2026-03-20T00:00:00.000Z",
  },
  {
    title: "4th AGM — FY 81/82 stakeholder materials",
    excerpt:
      "Annual general meeting presentation and public notices published for investor and regulatory review.",
    body:
      "Materials from the 4th Annual General Meeting (FY 81/82), dated BS 2082-10-29, are available for stakeholders. Reports include operational summaries, governance updates, and project pipeline disclosures cleared for public release.",
    category: "Reports",
    cover_url: "/gallery/em-4.jpeg",
    published_at: "2026-02-10T00:00:00.000Z",
  },
  {
    title: "Community impact along the Phawa corridor",
    excerpt:
      "Local employment, skills transfer, and infrastructure co-benefits from hydropower development in eastern Nepal.",
    body:
      "Project delivery prioritises employment for local communities, responsible construction practices, and long-term relationships with VDC and municipal partners in the Phawa Khola corridor. Community programmes are integrated with operational milestones as projects reach COD.",
    category: "Corporate",
    cover_url: "/gallery/civil-4.jpeg",
    published_at: "2026-01-18T00:00:00.000Z",
  },
  {
    title: "Machhapuchhre Capital — underwriting press release",
    excerpt:
      "Public notice regarding underwriting related to Unitech Hydropower — full release on Machhapuchhre Capital.",
    body:
      "Machhapuchhre Capital Limited issued a public press notice regarding underwriting related to Unitech Hydropower Company Limited. Read the full release on the Machhapuchhre Capital news portal.",
    category: "Corporate",
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
