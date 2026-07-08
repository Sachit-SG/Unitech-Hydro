import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { assertSafeImageSrc } from "@/lib/safe-image-src";
import { createPopupImage, listPopupImages } from "@/lib/repos";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ images: await listPopupImages() });
  } catch (err) {
    return apiErrorResponse(err, "admin-popup-get");
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { src?: string };
    const src = assertSafeImageSrc(body?.src ?? "");
    if (!src) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }
    const image = await createPopupImage(src);
    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err, "admin-popup-create");
  }
}
