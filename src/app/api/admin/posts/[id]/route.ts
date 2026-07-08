import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { deletePost, updatePost, type PostInput } from "@/lib/repos";
import { sanitizePostInput } from "@/lib/validate-post-input";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as PostInput;
    const sanitized = sanitizePostInput(body);
    const post = await updatePost(id, sanitized);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    return apiErrorResponse(err, "admin-posts-update");
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deletePost(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiErrorResponse(err, "admin-posts-delete");
  }
}
