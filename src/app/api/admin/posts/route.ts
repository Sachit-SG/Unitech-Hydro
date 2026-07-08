import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { createPost, listPosts, type PostInput } from "@/lib/repos";
import { sanitizePostInput } from "@/lib/validate-post-input";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ posts: await listPosts() });
  } catch (err) {
    return apiErrorResponse(err, "admin-posts-get");
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PostInput;
    const sanitized = sanitizePostInput(body);
    const post = await createPost(sanitized);
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err, "admin-posts-create");
  }
}
