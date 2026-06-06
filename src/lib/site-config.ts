/** Canonical production URL — override with NEXT_PUBLIC_SITE_URL in env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://unitechhydropower.com";

export const SITE_NAME = "Unitech Hydropower Company Limited";

export const SITE_DESCRIPTION =
  "Energy for a Developing Nation. Unitech Hydropower Company Limited — clean, renewable run-of-river hydropower supporting national development in Nepal.";

/** Public image paths (SEO-friendly filenames — avoid generic “dam” in URLs). */
export const SITE_IMAGES = {
  upperPhawaHeadworks: "/images/upper-phawa-headworks.jpg",
  upperPhawaCivilWorks: "/images/upper-phawa-civil-works.jpg",
  heroBackground: "/hero-bg.jpg",
  nepalGlacierRiver: "/images/nepal-glacier-river.jpg",
  iwaKholaOperational: "/images/iwa-khola-operational.jpg",
  /** Homepage About preview — project forebay / intake (slide 2). */
  aboutPreview: "/slide2.jpg",
} as const;

const LEGACY_IMAGE_MAP: Record<string, string> = {
  "/dam2.jpg": SITE_IMAGES.upperPhawaHeadworks,
  "/dam.jpg": SITE_IMAGES.upperPhawaCivilWorks,
};

/** Remap old asset paths from localStorage or bookmarks after rename. */
export function normalizeLegacyImageSrc(src: string): string {
  return LEGACY_IMAGE_MAP[src] ?? src;
}
