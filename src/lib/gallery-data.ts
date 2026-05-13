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
    imageSrc:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=85",
    imageAlt: "Upper Phawa Khola — headworks and river corridor",
    projectName: "Upper Phawa Khola",
    location: "Taplejung, Nepal",
  },
  {
    id: "middle-iwa-khola",
    placement: "tall",
    gridClass:
      "md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1 min-h-[260px] md:min-h-0",
    imageSrc:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Middle Iwa Khola — mountain hydrology context",
    projectName: "Middle Iwa Khola",
    location: "Taplejung & Panchthar",
  },
  {
    id: "powerhouse-mechanical",
    placement: "small",
    gridClass:
      "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 min-h-[200px] md:min-h-0",
    imageSrc:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Powerhouse — electromechanical assembly",
    projectName: "Powerhouse",
    location: "Upper Phawa site",
  },
  {
    id: "transmission-corridor",
    placement: "small",
    gridClass:
      "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2 min-h-[200px] md:min-h-0",
    imageSrc:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Transmission — corridor and infrastructure",
    projectName: "Transmission",
    location: "Grid interface",
  },
  {
    id: "intake-headworks",
    placement: "large",
    gridClass:
      "md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-2 min-h-[220px] md:min-h-0",
    imageSrc: "/dam2.jpg",
    imageAlt: "Hydropower dam — project photography",
    projectName: "Intake & headworks",
    location: "Civil structures",
  },
];

export type GalleryImageCategory =
  | "Construction"
  | "Landscape"
  | "Technical"
  | "Aerial";

export const galleryFilterLabels = [
  "All",
  "Construction",
  "Landscape",
  "Technical",
  "Aerial",
] as const;

export type GalleryFilterLabel = (typeof galleryFilterLabels)[number];

export type GalleryDetailImage = {
  src: string;
  alt: string;
  category: GalleryImageCategory;
};

export const galleryDetailImages: Record<string, GalleryDetailImage[]> = {
  "upper-phawa-khola": [
    {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=85",
      alt: "Upper Phawa Khola — wide operational context",
      category: "Landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=2400&q=85",
      alt: "Upper Phawa Khola — conveyance and civil works",
      category: "Construction",
    },
    {
      src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2400&q=85",
      alt: "Upper Phawa Khola — powerhouse detail",
      category: "Technical",
    },
    {
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85",
      alt: "Upper Phawa Khola — aerial overview",
      category: "Aerial",
    },
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=85",
      alt: "Upper Phawa Khola — construction progress",
      category: "Construction",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=85",
      alt: "Upper Phawa Khola — engineering schematic review",
      category: "Technical",
    },
  ],
  "middle-iwa-khola": [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=85",
      alt: "Middle Iwa Khola — feasibility-stage landscape",
      category: "Landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=85",
      alt: "Middle Iwa Khola — engineering planning context",
      category: "Technical",
    },
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=85",
      alt: "Middle Iwa Khola — construction reference",
      category: "Construction",
    },
    {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=85",
      alt: "Middle Iwa Khola — valley aerial",
      category: "Aerial",
    },
  ],
  "powerhouse-mechanical": [
    {
      src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2400&q=85",
      alt: "Pelton runners and powerhouse flooring",
      category: "Technical",
    },
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=85",
      alt: "Mechanical assembly — turbine hall",
      category: "Construction",
    },
    {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=85",
      alt: "Powerhouse exterior context",
      category: "Landscape",
    },
  ],
  "transmission-corridor": [
    {
      src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=2400&q=85",
      alt: "Transmission structures along the corridor",
      category: "Construction",
    },
    {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=85",
      alt: "Line route — elevation and clearance",
      category: "Landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85",
      alt: "Corridor — aerial span",
      category: "Aerial",
    },
    {
      src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2400&q=85",
      alt: "Substation equipment detail",
      category: "Technical",
    },
  ],
  "intake-headworks": [
    {
      src: "/dam2.jpg",
      alt: "Hydropower dam — project photography",
      category: "Landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1545558014-89940b105a4d?auto=format&fit=crop&w=2400&q=85",
      alt: "River diversion and civil works",
      category: "Landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85",
      alt: "Headworks — aerial context",
      category: "Aerial",
    },
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=85",
      alt: "Gate and intake structure detail",
      category: "Technical",
    },
  ],
};

export function getGalleryProjectTitle(id: string): string {
  const hit = galleryBentoItems.find((b) => b.id === id);
  return hit?.projectName ?? id;
}
