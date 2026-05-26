import type { MetadataRoute } from "next";
import { galleryBentoItems } from "@/lib/gallery-data";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/gallery",
    "/news",
    "/impact",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const galleryRoutes: MetadataRoute.Sitemap = galleryBentoItems.map((item) => ({
    url: `${SITE_URL}/gallery/${item.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...galleryRoutes];
}
