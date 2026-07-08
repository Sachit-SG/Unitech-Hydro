import type { MetadataRoute } from "next";
import { galleryBentoItems } from "@/lib/gallery-data";
import { SITE_URL } from "@/lib/site-config";
import { dbReady, listPosts } from "@/lib/repos";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/gallery",
    "/blog",
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

  let articleRoutes: MetadataRoute.Sitemap = [];
  if (dbReady()) {
    try {
      const posts = await listPosts({ publishedOnly: true });
      articleRoutes = posts
        .filter((post) => !post.external_url)
        .map((post) => ({
          url: `${SITE_URL}${post.category === "Blog" ? `/blog/${post.slug}` : `/news/${post.slug}`}`,
          lastModified: post.updated_at ? new Date(post.updated_at) : now,
          changeFrequency: "monthly" as const,
          priority: 0.65,
        }));
    } catch {
      articleRoutes = [];
    }
  }

  return [...staticRoutes, ...galleryRoutes, ...articleRoutes];
}
