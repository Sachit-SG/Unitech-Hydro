"use client";

import { useEffect, useState } from "react";
import { GalleryProjectView } from "@/components/gallery/gallery-project-view";
import type { GalleryDetailImage } from "@/lib/gallery-data";

type GalleryProjectPageClientProps = {
  projectId: string;
  title: string;
  defaultImages: GalleryDetailImage[];
};

export function GalleryProjectPageClient({
  projectId,
  title,
  defaultImages,
}: GalleryProjectPageClientProps) {
  const [images, setImages] = useState(defaultImages);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/gallery/${projectId}`, { cache: "no-store" });
        const data = (await res.json()) as { images?: GalleryDetailImage[] };
        if (!cancelled && Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images);
        }
      } catch {
        // keep SSR defaults
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return <GalleryProjectView projectId={projectId} title={title} images={images} />;
}
