"use client";

import { useEffect, useState } from "react";
import { GalleryProjectView } from "@/components/gallery/gallery-project-view";
import type { GalleryDetailImage } from "@/lib/gallery-data";
import { getPublicAlbumImages } from "@/lib/gallery-admin-storage";

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
    setImages(getPublicAlbumImages(projectId));
  }, [projectId, defaultImages]);

  return <GalleryProjectView title={title} images={images} />;
}
