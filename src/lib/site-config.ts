/** Canonical production URL — override with NEXT_PUBLIC_SITE_URL in env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://unitechhydropower.com");

export const SITE_NAME = "Unitech Hydropower Company Limited";

export const SITE_DESCRIPTION =
  "Energy for a Developing Nation. Unitech Hydropower Company Limited — clean, renewable run-of-river hydropower supporting national development in Nepal.";

/** Public image paths (SEO-friendly filenames — avoid generic “dam” in URLs). */
export const SITE_IMAGES = {
  /** Header logo mark (cropped tight to content, no padding). */
  logo: "/unitech-navbar-mark.png",
  /** Circular seal — footer (white ink, cropped tight to content). */
  unitechLogo: "/unitech-footer-seal.png",
  upperPhawaHeadworks: "/images/upper-phawa-headworks.jpg",
  upperPhawaCivilWorks: "/images/upper-phawa-civil-works.jpg",
  heroBackground: "/hero-bg.jpg",
  nepalGlacierRiver: "/images/nepal-glacier-river.jpg",
  iwaKholaOperational: "/gallery/iwa-1.jpeg",
  /** Homepage scroll-expand hero. */
  heroHome: "/new2.jpeg",
  /** Internal page title banners — gallery landscape stills. */
  pageHero: "/gallery/overview-7.jpeg",
  /** Homepage About preview — penstock / tunnel works. */
  aboutPreview: "/gallery/civil-6.jpeg",
  /** About page — Company at a glance section. */
  aboutGlance: "/new3.jpeg",
  /** About page — Our Mission interactive panel. */
  aboutMission: "/new4.jpeg",
  /** About page — Our Vision interactive panel. */
  aboutVision: "/new5.jpeg",
  /** About page — Community Impact interactive panel. */
  aboutCommunity: "/new6.jpeg",
  /** Chairman Anoj Khadka — official portrait. */
  chairmanPortrait: "/images/anoj-khadka-chairman.jpeg",
  /** Upper Phawa Khola — site photography. */
  siteIntakeGates: "/Hydro2.jpg",
  siteForebayCanal: "/new1.jpeg",
  sitePenstockTunnel: "/slide1.jpg",
  siteAditTunnel: "/new7.jpeg",
} as const;

const LEGACY_IMAGE_MAP: Record<string, string> = {
  "/dam2.jpg": SITE_IMAGES.upperPhawaHeadworks,
  "/dam.jpg": SITE_IMAGES.upperPhawaCivilWorks,
};

/** Remap old asset paths from localStorage or bookmarks after rename. */
export function normalizeLegacyImageSrc(src: string): string {
  return LEGACY_IMAGE_MAP[src] ?? src;
}
