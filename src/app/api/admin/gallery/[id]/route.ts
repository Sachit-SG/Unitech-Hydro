import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { deleteGalleryImage, updateGalleryImage, type GalleryUpdateInput } from "@/lib/repos";
import { ValidationError } from "@/lib/validation-error";

export const dynamic = "force-dynamic";

function sanitizeGalleryUpdate(body: GalleryUpdateInput): GalleryUpdateInput {
  const alt = body.alt !== undefined ? body.alt.trim().slice(0, 500) : undefined;
  if (body.sort_order !== undefined && (!Number.isInteger(body.sort_order) || body.sort_order < 0)) {
    throw new ValidationError("Invalid sort order.");
  }
  return { ...body, alt };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as GalleryUpdateInput;
    const image = await updateGalleryImage(id, sanitizeGalleryUpdate(body));
    if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ image });
  } catch (err) {
    return apiErrorResponse(err, "admin-gallery-update");
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteGalleryImage(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiErrorResponse(err, "admin-gallery-delete");
  }
}
