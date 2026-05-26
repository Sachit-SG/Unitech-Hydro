import {
  galleryBentoItems,
  galleryDetailImages,
  type GalleryDetailImage,
  type GalleryImageCategory,
} from "@/lib/gallery-data";

export const GALLERY_ALBUMS_STORAGE_KEY = "unitech_gallery_albums_v1";

export type AdminGalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryImageCategory;
};

export type AdminGalleryAlbums = Record<string, AdminGalleryImage[]>;

function isCategory(value: unknown): value is GalleryImageCategory {
  return (
    value === "Construction" ||
    value === "Landscape" ||
    value === "Technical" ||
    value === "Aerial" ||
    value === "Other"
  );
}

export function loadStoredAlbums(): AdminGalleryAlbums | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(GALLERY_ALBUMS_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const result: AdminGalleryAlbums = {};
    for (const [projectId, images] of Object.entries(parsed)) {
      if (!Array.isArray(images)) continue;
      const valid = images
        .filter(
          (row): row is AdminGalleryImage =>
            !!row &&
            typeof row === "object" &&
            typeof (row as AdminGalleryImage).id === "string" &&
            typeof (row as AdminGalleryImage).src === "string" &&
            typeof (row as AdminGalleryImage).alt === "string" &&
            isCategory((row as AdminGalleryImage).category)
        )
        .map((row) => ({
          id: row.id,
          src: row.src,
          alt: row.alt,
          category: row.category,
        }));
      result[projectId] = valid;
    }
    return result;
  } catch {
    return null;
  }
}

export function saveStoredAlbums(albums: AdminGalleryAlbums): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GALLERY_ALBUMS_STORAGE_KEY, JSON.stringify(albums));
}

export function defaultAlbumImages(projectId: string): AdminGalleryImage[] {
  return (galleryDetailImages[projectId] ?? []).map((img, index) => ({
    id: `default-${projectId}-${index}`,
    src: img.src,
    alt: img.alt,
    category: img.category,
  }));
}

export function getAdminAlbumImages(projectId: string): AdminGalleryImage[] {
  const stored = loadStoredAlbums();
  if (stored && Object.prototype.hasOwnProperty.call(stored, projectId)) {
    return stored[projectId];
  }
  return defaultAlbumImages(projectId);
}

export function getPublicAlbumImages(projectId: string): GalleryDetailImage[] {
  return getAdminAlbumImages(projectId).map(({ src, alt, category }) => ({
    src,
    alt,
    category,
  }));
}

export function countGalleryImagesFromDefaults(): number {
  return (
    galleryBentoItems.length +
    Object.values(galleryDetailImages).reduce((sum, arr) => sum + arr.length, 0)
  );
}

export function countGalleryImagesMerged(): number {
  if (typeof window === "undefined") return countGalleryImagesFromDefaults();
  const stored = loadStoredAlbums();
  let albumTotal = 0;
  for (const item of galleryBentoItems) {
    if (stored && Object.prototype.hasOwnProperty.call(stored, item.id)) {
      albumTotal += stored[item.id].length;
    } else {
      albumTotal += (galleryDetailImages[item.id] ?? []).length;
    }
  }
  return galleryBentoItems.length + albumTotal;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}
