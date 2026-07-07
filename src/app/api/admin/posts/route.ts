import { NextResponse } from "next/server";
import { createPost, listPosts, type PostInput } from "@/lib/repos";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ posts: await listPosts() });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PostInput;
    if (!body?.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const post = await createPost({ ...body, title: body.title.trim() });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
  }
}
