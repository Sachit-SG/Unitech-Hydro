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
    imageSrc: "/gallery/overview-7.jpeg",
    imageAlt: "Upper Phawa Khola — river gorge and suspension bridge on the approach",
    projectName: "Upper Phawa Khola",
    location: "Taplejung, Nepal",
  },
  {
    id: "middle-iwa-khola",
    placement: "tall",
    gridClass:
      "md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1 min-h-[260px] md:min-h-0",
    imageSrc: "/gallery/iwa-1.jpeg",
    imageAlt: "Iwa Khola (15.0 MW) — eastern Nepal river valley context",
    projectName: "Iwa Khola (15.0 MW)",
    location: "Taplejung & Panchthar",
  },
  {
    id: "powerhouse-mechanical",
    placement: "small",
    gridClass:
      "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 min-h-[200px] md:min-h-0",
    imageSrc: "/gallery/em-2.jpeg",
    imageAlt: "Powerhouse — twin Pelton turbine-generator units",
    projectName: "Powerhouse",
    location: "Upper Phawa site",
  },
  {
    id: "events",
    placement: "small",
    gridClass:
      "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2 min-h-[200px] md:min-h-0",
    imageSrc: "/gallery/event/1.jpeg",
    imageAlt: "Events — Annual General Meeting, Unitech Hydropower",
    projectName: "Events",
    location: "Company updates",
  },
  {
    id: "intake-headworks",
    placement: "large",
    gridClass:
      "md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-2 min-h-[220px] md:min-h-0",
    imageSrc: "/gallery/civil-5.jpeg",
    imageAlt: "Intake & headworks — concrete intake structure",
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
  "Event",
  "Other",
] as const;

export type GalleryImageCategory = (typeof galleryImageCategories)[number];

export const galleryFilterLabels = ["All", ...galleryImageCategories] as const;

export type GalleryFilterLabel = (typeof galleryFilterLabels)[number];

export type GalleryDetailImage = {
  src: string;
  alt: string;
  category: GalleryImageCategory;
  /** Intrinsic pixel dimensions — enables true-aspect masonry (optional). */
  w?: number;
  h?: number;
};

export const galleryDetailImages: Record<string, GalleryDetailImage[]> = {
  "upper-phawa-khola": [
    { src: "/gallery/overview-1.jpeg", alt: "Project corridor — forested valley of the Phawa Khola, eastern Nepal", category: "Landscape", w: 1600, h: 1200 },
    { src: "/gallery/overview-3.jpeg", alt: "Suspension footbridge over the river near the project site", category: "Landscape", w: 1600, h: 1200 },
    { src: "/gallery/overview-7.jpeg", alt: "Suspension bridge and river gorge on the approach", category: "Landscape", w: 1600, h: 1200 },
    { src: "/gallery/overview-5.jpeg", alt: "Green hillside terrain above the Phawa Khola", category: "Landscape", w: 1200, h: 1600 },
    { src: "/gallery/overview-6.jpeg", alt: "Steep forested slopes of the catchment", category: "Landscape", w: 1600, h: 1200 },
    { src: "/gallery/overview-4.jpeg", alt: "Access track cut into the hillside to the works", category: "Other", w: 1600, h: 1200 },
    { src: "/gallery/overview-2.jpeg", alt: "Field survey and site assessment along the project corridor", category: "Other", w: 1200, h: 1600 },
    { src: "/images/upper-phawa-headworks.jpg", alt: "Upper Phawa Khola — headworks and intake structures", category: "Construction", w: 1600, h: 1200 },
    { src: "/images/upper-phawa-civil-works.jpg", alt: "Upper Phawa Khola — civil works along the conveyance", category: "Construction", w: 1600, h: 1200 },
    { src: "/new2.jpeg", alt: "Phawa Khola valley — project corridor aerial context", category: "Landscape", w: 1600, h: 1200 },
  ],
  "middle-iwa-khola": [
    { src: "/gallery/iwa-2.jpeg", alt: "River valley panorama across the Iwa catchment", category: "Aerial", w: 1600, h: 1200 },
    { src: "/gallery/iwa-1.jpeg", alt: "Terraced fields and river valley — Iwa Khola context", category: "Aerial", w: 1200, h: 1600 },
  ],
  "powerhouse-mechanical": [
    { src: "/gallery/em-2.jpeg", alt: "Twin Pelton turbine-generator units in the powerhouse", category: "Technical", w: 1800, h: 1350 },
    { src: "/gallery/em-3.jpeg", alt: "Pelton units and blue generator housings", category: "Technical", w: 1280, h: 960 },
    { src: "/gallery/em-4.jpeg", alt: "Control room — protection and control panels", category: "Technical", w: 1800, h: 1350 },
    { src: "/gallery/em-1.jpeg", alt: "Powerhouse building exterior with switchgear", category: "Technical", w: 1152, h: 864 },
    { src: "/gallery/em-5.jpeg", alt: "Turbine-generator installation in progress", category: "Technical", w: 960, h: 1280 },
    { src: "/gallery/em-6.jpeg", alt: "Engineer at the powerhouse control panels", category: "Technical", w: 960, h: 1280 },
  ],
  "transmission-corridor": [
    { src: "/gallery/grid-1.jpeg", alt: "33 kV switchyard — transformers and transmission gantries", category: "Technical", w: 1200, h: 1600 },
    { src: "/gallery/grid-6.jpeg", alt: "Steel penstock pipe sections staged on the riverbank", category: "Construction", w: 1600, h: 720 },
    { src: "/gallery/grid-2.jpeg", alt: "Penstock alignment climbing the forested hillside", category: "Construction", w: 1600, h: 1200 },
    { src: "/gallery/grid-3.jpeg", alt: "Power transformer installation and terminations", category: "Technical", w: 1200, h: 1600 },
    { src: "/gallery/grid-5.jpeg", alt: "Penstock inside the headrace tunnel", category: "Technical", w: 960, h: 1280 },
    { src: "/gallery/grid-8.jpeg", alt: "Adit / tunnel portal with stone masonry", category: "Technical", w: 1200, h: 1600 },
    { src: "/gallery/grid-4.jpeg", alt: "Penstock on saddle supports with excavator", category: "Construction", w: 956, h: 1280 },
    { src: "/gallery/grid-9.jpeg", alt: "Excavator laying penstock along the supports", category: "Construction", w: 780, h: 1040 },
    { src: "/gallery/grid-7.jpeg", alt: "Exposed penstock section at dusk", category: "Technical", w: 1040, h: 780 },
    { src: "/slide1.jpg", alt: "Penstock tunnel and hillside alignment", category: "Construction", w: 1600, h: 1200 },
    { src: "/new7.jpeg", alt: "Adit tunnel portal and access works", category: "Technical", w: 1600, h: 1200 },
  ],
  "intake-headworks": [
    { src: "/gallery/civil-5.jpeg", alt: "Intake and headworks concrete structure", category: "Construction", w: 1600, h: 1200 },
    { src: "/gallery/civil-7.jpeg", alt: "Completed intake and headworks structure", category: "Construction", w: 1600, h: 1200 },
    { src: "/gallery/civil-1.jpeg", alt: "Headworks — river-diversion weir under construction", category: "Construction", w: 1280, h: 720 },
    { src: "/gallery/civil-3.jpeg", alt: "Intake structure on the hillside above the river", category: "Construction", w: 1600, h: 1200 },
    { src: "/gallery/civil-2.jpeg", alt: "Forebay canal and civil structures at the intake", category: "Construction", w: 1280, h: 960 },
    { src: "/gallery/civil-4.jpeg", alt: "Forebay basin with worker for scale", category: "Construction", w: 1600, h: 1200 },
    { src: "/gallery/civil-6.jpeg", alt: "Diversion weir and settling basin during construction", category: "Construction", w: 1040, h: 780 },
    { src: "/Hydro2.jpg", alt: "Intake gates and headworks — Upper Phawa Khola", category: "Construction", w: 1600, h: 1200 },
    { src: "/new1.jpeg", alt: "Forebay canal and lined channel at the intake", category: "Construction", w: 1600, h: 1200 },
  ],
  events: [
    { src: "/gallery/event/1.jpeg", alt: "Unitech Hydropower — Annual General Meeting", category: "Event", w: 1600, h: 1200 },
    { src: "/gallery/event/2.jpeg", alt: "Annual General Meeting — audience and proceedings", category: "Event", w: 1600, h: 1200 },
    { src: "/gallery/event/3.jpeg", alt: "Annual General Meeting — company session", category: "Event", w: 1600, h: 1200 },
    { src: "/gallery/event/5.jpeg", alt: "Annual General Meeting — meeting highlights", category: "Event", w: 1600, h: 1200 },
    { src: "/gallery/event/6.jpeg", alt: "Annual General Meeting — participants and discussion", category: "Event", w: 1600, h: 1200 },
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

/** Album slugs that make up a public project gallery page. */
export function getGalleryAlbumIds(primaryId: string): string[] | undefined {
  const albumIds = PROJECT_GALLERY_ALBUMS[primaryId];
  if (albumIds) return [...albumIds];
  if (galleryDetailImages[primaryId]) return [primaryId];
  return undefined;
}

export function mergeStaticGalleryImages(albumIds: readonly string[]): GalleryDetailImage[] {
  const seen = new Set<string>();
  const merged: GalleryDetailImage[] = [];
  for (const id of albumIds) {
    for (const img of galleryDetailImages[id] ?? []) {
      if (seen.has(img.src)) continue;
      seen.add(img.src);
      merged.push(img);
    }
  }
  return merged;
}

export function getProjectGalleryImages(primaryId: string): GalleryDetailImage[] | undefined {
  const ids = getGalleryAlbumIds(primaryId);
  if (!ids) return undefined;
  const merged = mergeStaticGalleryImages(ids);
  return merged.length ? merged : undefined;
}

export function getProjectGalleryHref(primaryId: string): string {
  return `/gallery/${primaryId}`;
}

export function getGalleryProjectTitle(id: string): string {
  const hit = galleryBentoItems.find((b) => b.id === id);
  return hit?.projectName ?? id;
}

/** Card / hero still for a project — sourced from gallery bento covers. */
export function getProjectCardImage(projectId: string): string {
  const hit = galleryBentoItems.find((b) => b.id === projectId);
  if (hit) return hit.imageSrc;
  const first = galleryDetailImages[projectId]?.[0]?.src;
  return first ?? "/gallery/overview-1.jpeg";
}

/**
 * Hand-picked preview stills per project, in display order — deliberately sequenced
 * to read as a story (e.g. intake → powerhouse → grid) rather than "whatever's first
 * in the folder." Falls back to the first N album images for any project without a
 * curated list.
 */
const PROJECT_GALLERY_HIGHLIGHTS: Record<string, readonly string[]> = {
  "upper-phawa-khola": [
    "/images/upper-phawa-headworks.jpg",
    "/gallery/em-2.jpeg",
    "/gallery/grid-1.jpeg",
  ],
};

/** Curated (or first-N fallback) gallery stills for project carousels on /projects. */
export function getProjectGalleryStills(
  projectId: string,
  limit = 3,
): { src: string; alt: string }[] {
  const images = getProjectGalleryImages(projectId) ?? galleryDetailImages[projectId] ?? [];

  const curatedSrcs = PROJECT_GALLERY_HIGHLIGHTS[projectId];
  if (curatedSrcs) {
    const bySrc = new Map(images.map((img) => [img.src, img]));
    const curated = curatedSrcs
      .map((src) => bySrc.get(src))
      .filter((img): img is GalleryDetailImage => Boolean(img));
    if (curated.length) return curated.slice(0, limit).map((img) => ({ src: img.src, alt: img.alt }));
  }

  return images.slice(0, limit).map((img) => ({ src: img.src, alt: img.alt }));
}
