import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { deletePopupImage } from "@/lib/repos";
import { rejectIfAdminWriteRateLimited } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const limited = await rejectIfAdminWriteRateLimited(request);
    if (limited) return limited;

    const { id } = await params;
    await deletePopupImage(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiErrorResponse(err, "admin-popup-delete");
  }
}
