import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/blog-content";
import { galleryDetailImages } from "@/lib/gallery-data";
import {
  createGalleryImage,
  createPost,
  deletePost,
  listGallery,
  listPosts,
} from "@/lib/repos";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const refresh = new URL(request.url).searchParams.get("refresh");

    if (refresh === "blogs") {
      const existing = await listPosts();
      for (const post of existing) {
        await deletePost(post.id);
      }
      for (const post of BLOG_POSTS) {
        await createPost({
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          category: post.category,
          cover_url: post.cover_url,
          external_url: post.external_url ?? null,
          status: "published",
          published_at: post.published_at,
        });
      }
      return NextResponse.json({ ok: true, refreshed: BLOG_POSTS.length });
    }

    const [existingPosts, existingGallery] = await Promise.all([
      listPosts(),
      listGallery(),
    ]);

    let postsAdded = 0;
    if (existingPosts.length === 0) {
      for (const post of BLOG_POSTS) {
        await createPost({
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          category: post.category,
          cover_url: post.cover_url,
          external_url: post.external_url ?? null,
          status: "published",
          published_at: post.published_at,
        });
        postsAdded++;
      }
    }

    let galleryAdded = 0;
    if (existingGallery.length === 0) {
      for (const [projectId, images] of Object.entries(galleryDetailImages)) {
        let order = 0;
        for (const img of images) {
          await createGalleryImage({
            project_id: projectId,
            src: img.src,
            alt: img.alt,
            category: img.category,
            w: img.w ?? null,
            h: img.h ?? null,
            sort_order: order++,
          });
          galleryAdded++;
        }
      }
    }

    return NextResponse.json({ ok: true, postsAdded, galleryAdded });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "seed failed" },
      { status: 500 },
    );
  }
}
