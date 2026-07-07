import { NextResponse } from "next/server";
import { mapPostsToArticles } from "@/lib/blog-public";
import { dbReady, listPosts } from "@/lib/repos";

export const dynamic = "force-dynamic";

/** Public: published posts for homepage and widgets. */
export async function GET(request: Request) {
  const limit = Math.min(
    12,
    Math.max(1, Number(new URL(request.url).searchParams.get("limit") ?? "6") || 6),
  );

  if (!dbReady()) return NextResponse.json({ posts: [] });

  try {
    const posts = await listPosts({ publishedOnly: true });
    return NextResponse.json({ posts: mapPostsToArticles(posts).slice(0, limit) });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}
