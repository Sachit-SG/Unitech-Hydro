import { NextResponse } from "next/server";
import {
  createGalleryImage,
  listGallery,
  listGalleryCounts,
  type GalleryInput,
} from "@/lib/repos";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("countsOnly") === "true") {
      return NextResponse.json({ counts: await listGalleryCounts() });
    }
    const projectId = searchParams.get("projectId") ?? undefined;
    return NextResponse.json({ images: await listGallery(projectId) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GalleryInput;
    if (!body?.project_id || !body?.src) {
      return NextResponse.json(
        { error: "project_id and src are required" },
        { status: 400 },
      );
    }
    const image = await createGalleryImage(body);
    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 },
    );
  }
}
