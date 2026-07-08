import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { deletePopupImage } from "@/lib/repos";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deletePopupImage(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiErrorResponse(err, "admin-popup-delete");
  }
}
