import { SITE_IMAGES } from "@/lib/site-config";

/** Slugs must match `src/app/gallery/[id]/page.tsx` static params. */

export type GalleryBentoPlacement = "large" | "tall" | "small";

export type GalleryBentoItem = {
  id: string;
  placement: GalleryBentoPlacement;
  /** Tailwind grid placement at `md` (4×2 bento). */
  gridClass: string;
  imageSrc: string;
  imageAlt: string;
  projectName: string;
  location: string;
};

export const galleryBentoItems: GalleryBentoItem[] = [
  {
    id: "upper-phawa-khola",
    placement: "large",
    gridClass:
      "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-1 min-h-[220px] md:min-h-0",
    imageSrc: SITE_IMAGES.siteIntakeGates,
    imageAlt: "Upper Phawa Khola — intake gates and forebay",
    projectName: "Upper Phawa Khola",
    location: "Taplejung, Nepal",
  },
  {
    id: "middle-iwa-khola",
    placement: "tall",
    gridClass:
      "md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1 min-h-[260px] md:min-h-0",
    imageSrc: SITE_IMAGES.nepalGlacierRiver,
    imageAlt: "Iwa Khola (15.0 MW) — eastern Nepal hydrology context",
    projectName: "Iwa Khola (15.0 MW)",
    location: "Taplejung & Panchthar",
  },
  {
    id: "powerhouse-mechanical",
    placement: "small",
    gridClass:
      "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 min-h-[200px] md:min-h-0",
    imageSrc: SITE_IMAGES.sitePenstockTunnel,
    imageAlt: "Upper Phawa Khola — penstock at tunnel portal",
    projectName: "Powerhouse",
    location: "Upper Phawa site",
  },
  {
    id: "transmission-corridor",
    placement: "small",
    gridClass:
      "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2 min-h-[200px] md:min-h-0",
    imageSrc: SITE_IMAGES.siteAditTunnel,
    imageAlt: "Upper Phawa Khola — adit tunnel portal",
    projectName: "Transmission",
    location: "Grid interface",
  },
  {
    id: "intake-headworks",
    placement: "large",
    gridClass:
      "md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-2 min-h-[220px] md:min-h-0",
    imageSrc: SITE_IMAGES.siteForebayCanal,
    imageAlt: "Upper Phawa Khola — forebay canal and site mobilization",
    projectName: "Intake & headworks",
    location: "Civil structures",
  },
];

/** Assignable tags for album photos (excludes the “All” filter). */
export const galleryImageCategories = [
  "Construction",
  "Landscape",
  "Technical",
  "Aerial",
  "Other",
] as const;

export type GalleryImageCategory = (typeof galleryImageCategories)[number];

export const galleryFilterLabels = ["All", ...galleryImageCategories] as const;

export type GalleryFilterLabel = (typeof galleryFilterLabels)[number];

export type GalleryDetailImage = {
  src: string;
  alt: string;
  category: GalleryImageCategory;
};

export const galleryDetailImages: Record<string, GalleryDetailImage[]> = {
  "upper-phawa-khola": [
    {
      src: SITE_IMAGES.siteIntakeGates,
      alt: "Upper Phawa Khola — intake gates and forebay",
      category: "Landscape",
    },
    {
      src: SITE_IMAGES.siteForebayCanal,
      alt: "Upper Phawa Khola — forebay canal and civil works",
      category: "Construction",
    },
    {
      src: SITE_IMAGES.sitePenstockTunnel,
      alt: "Upper Phawa Khola — penstock at tunnel portal",
      category: "Technical",
    },
    {
      src: SITE_IMAGES.upperPhawaHeadworks,
      alt: "Upper Phawa Khola — headworks photography",
      category: "Aerial",
    },
    {
      src: SITE_IMAGES.upperPhawaCivilWorks,
      alt: "Upper Phawa Khola — civil works on Phawa Khola",
      category: "Construction",
    },
    {
      src: SITE_IMAGES.iwaKholaOperational,
      alt: "Upper Phawa Khola — operational corridor",
      category: "Technical",
    },
  ],
  "middle-iwa-khola": [
    {
      src: SITE_IMAGES.nepalGlacierRiver,
      alt: "Iwa Khola — eastern Nepal river corridor",
      category: "Landscape",
    },
    {
      src: SITE_IMAGES.iwaKholaOperational,
      alt: "Iwa Khola — operational reference corridor",
      category: "Technical",
    },
    {
      src: SITE_IMAGES.upperPhawaHeadworks,
      alt: "Iwa Khola — civil layout reference",
      category: "Construction",
    },
    {
      src: SITE_IMAGES.siteAditTunnel,
      alt: "Iwa Khola — tunnel portal reference",
      category: "Technical",
    },
  ],
  "powerhouse-mechanical": [
    {
      src: SITE_IMAGES.sitePenstockTunnel,
      alt: "Upper Phawa Khola — penstock at tunnel portal",
      category: "Technical",
    },
    {
      src: SITE_IMAGES.siteIntakeGates,
      alt: "Upper Phawa Khola — intake and powerhouse context",
      category: "Construction",
    },
    {
      src: SITE_IMAGES.upperPhawaCivilWorks,
      alt: "Upper Phawa Khola — civil works corridor",
      category: "Landscape",
    },
  ],
  "transmission-corridor": [
    {
      src: SITE_IMAGES.siteAditTunnel,
      alt: "Upper Phawa Khola — adit tunnel portal",
      category: "Construction",
    },
    {
      src: SITE_IMAGES.siteForebayCanal,
      alt: "Upper Phawa Khola — forebay and access corridor",
      category: "Landscape",
    },
    {
      src: SITE_IMAGES.iwaKholaOperational,
      alt: "Upper Phawa Khola — line route reference",
      category: "Aerial",
    },
    {
      src: SITE_IMAGES.siteIntakeGates,
      alt: "Upper Phawa Khola — substation interface context",
      category: "Technical",
    },
  ],
  "intake-headworks": [
    {
      src: SITE_IMAGES.siteForebayCanal,
      alt: "Upper Phawa Khola — forebay canal and site mobilization",
      category: "Landscape",
    },
    {
      src: SITE_IMAGES.upperPhawaHeadworks,
      alt: "Upper Phawa Khola — intake and headworks",
      category: "Landscape",
    },
    {
      src: SITE_IMAGES.upperPhawaCivilWorks,
      alt: "Upper Phawa Khola — river diversion and civil works",
      category: "Construction",
    },
    {
      src: SITE_IMAGES.siteIntakeGates,
      alt: "Upper Phawa Khola — gate and intake structure",
      category: "Technical",
    },
  ],
};

/** Merges related albums when opening a project gallery from /projects. */
const PROJECT_GALLERY_ALBUMS: Record<string, readonly string[]> = {
  "upper-phawa-khola": [
    "upper-phawa-khola",
    "intake-headworks",
    "powerhouse-mechanical",
    "transmission-corridor",
  ],
  "middle-iwa-khola": ["middle-iwa-khola"],
};

export function getProjectGalleryImages(primaryId: string): GalleryDetailImage[] | undefined {
  const albumIds = PROJECT_GALLERY_ALBUMS[primaryId];
  const ids = albumIds ?? (galleryDetailImages[primaryId] ? [primaryId] : undefined);
  if (!ids) return undefined;

  const seen = new Set<string>();
  const merged: GalleryDetailImage[] = [];
  for (const id of ids) {
    for (const img of galleryDetailImages[id] ?? []) {
      if (seen.has(img.src)) continue;
      seen.add(img.src);
      merged.push(img);
    }
  }
  return merged.length ? merged : undefined;
}

export function getProjectGalleryHref(primaryId: string): string {
  return `/gallery/${primaryId}`;
}

export function getGalleryProjectTitle(id: string): string {
  const hit = galleryBentoItems.find((b) => b.id === id);
  return hit?.projectName ?? id;
}
