import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryProjectPageClient } from "@/components/gallery/gallery-project-page-client";
import {
  galleryBentoItems,
  galleryDetailImages,
  getGalleryProjectTitle,
  getProjectGalleryImages,
} from "@/lib/gallery-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return galleryBentoItems.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const images = getProjectGalleryImages(id) ?? galleryDetailImages[id];
  if (!images) return { title: "Gallery" };
  return {
    title: `${getGalleryProjectTitle(id)} · Gallery`,
    description: `Project photography — ${getGalleryProjectTitle(id)}.`,
  };
}

export default async function GalleryProjectPage({ params }: PageProps) {
  const { id } = await params;
  const images = getProjectGalleryImages(id) ?? galleryDetailImages[id];
  if (!images) notFound();

  const title = getGalleryProjectTitle(id);

  return (
    <GalleryProjectPageClient
      projectId={id}
      title={title}
      defaultImages={images}
    />
  );
}
