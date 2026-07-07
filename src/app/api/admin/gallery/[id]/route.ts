import { NextResponse } from "next/server";
import { deleteGalleryImage, updateGalleryImage, type GalleryUpdateInput } from "@/lib/repos";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as GalleryUpdateInput;
    const image = await updateGalleryImage(id, body);
    if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ image });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
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
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
  }
}
