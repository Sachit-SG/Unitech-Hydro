import {
  galleryDetailImages,
  type GalleryDetailImage,
  type GalleryImageCategory,
} from "@/lib/gallery-data";
import { normalizeLegacyImageSrc } from "@/lib/site-config";

export type AdminGalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryImageCategory;
  w?: number;
  h?: number;
};

export function defaultAlbumImages(projectId: string): AdminGalleryImage[] {
  return (galleryDetailImages[projectId] ?? []).map((img, index) => ({
    id: `default-${projectId}-${index}`,
    src: img.src,
    alt: img.alt,
    category: img.category,
    w: img.w,
    h: img.h,
  }));
}

/** Static album fallback when the database has no rows for a project. */
export function getPublicAlbumImages(projectId: string): GalleryDetailImage[] {
  return defaultAlbumImages(projectId).map(({ src, alt, category, w, h }) => ({
    src: normalizeLegacyImageSrc(src),
    alt,
    category,
    w,
    h,
  }));
}
