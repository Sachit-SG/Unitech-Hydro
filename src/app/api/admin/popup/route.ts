import { NextResponse } from "next/server";
import { createPopupImage, listPopupImages } from "@/lib/repos";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ images: await listPopupImages() });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { src?: string };
    if (!body?.src) {
      return NextResponse.json({ error: "src is required" }, { status: 400 });
    }
    const image = await createPopupImage(body.src);
    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
  }
}
