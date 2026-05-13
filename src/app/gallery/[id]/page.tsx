import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryProjectView } from "@/components/gallery/gallery-project-view";
import {
  galleryBentoItems,
  galleryDetailImages,
  getGalleryProjectTitle,
} from "@/lib/gallery-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return galleryBentoItems.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const images = galleryDetailImages[id];
  if (!images) return { title: "Gallery" };
  return {
    title: `${getGalleryProjectTitle(id)} · Gallery`,
    description: `Project photography — ${getGalleryProjectTitle(id)}.`,
  };
}

export default async function GalleryProjectPage({ params }: PageProps) {
  const { id } = await params;
  const images = galleryDetailImages[id];
  if (!images) notFound();

  const title = getGalleryProjectTitle(id);

  return <GalleryProjectView title={title} images={images} />;
}
