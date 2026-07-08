import "server-only";

import {
  getGalleryAlbumIds,
  mergeStaticGalleryImages,
  type GalleryDetailImage,
} from "@/lib/gallery-data";
import { listGallery } from "@/lib/repos";

/** Static defaults + database rows for a project gallery page (merged albums). */
export async function getMergedGalleryForProject(
  projectId: string,
): Promise<GalleryDetailImage[]> {
  const albumIds = getGalleryAlbumIds(projectId);
  if (!albumIds?.length) return [];

  const seen = new Set<string>();
  const merged: GalleryDetailImage[] = [];

  const prepend = (img: GalleryDetailImage) => {
    if (seen.has(img.src)) return;
    seen.add(img.src);
    merged.unshift(img);
  };

  const append = (img: GalleryDetailImage) => {
    if (seen.has(img.src)) return;
    seen.add(img.src);
    merged.push(img);
  };

  // Admin uploads and DB rows first (newest album order preserved).
  for (const albumId of albumIds) {
    try {
      const rows = await listGallery(albumId);
      for (const row of rows) {
        prepend({
          src: row.src,
          alt: row.alt,
          category: row.category,
          w: row.w ?? undefined,
          h: row.h ?? undefined,
        });
      }
    } catch {
      // continue with static fallbacks
    }
  }

  for (const img of mergeStaticGalleryImages(albumIds)) {
    append(img);
  }

  return merged;
}
