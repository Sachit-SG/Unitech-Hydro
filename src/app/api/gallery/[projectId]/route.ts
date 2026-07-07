import { NextResponse } from "next/server";
import { dbReady, listGallery } from "@/lib/repos";
import { getPublicAlbumImages } from "@/lib/gallery-admin-storage";

export const dynamic = "force-dynamic";

/** Public: album images for a project. Falls back to static defaults if the DB is empty. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await params;

  if (dbReady()) {
    try {
      const rows = await listGallery(projectId);
      if (rows.length > 0) {
        return NextResponse.json({
          images: rows.map((r) => ({
            src: r.src,
            alt: r.alt,
            category: r.category,
            w: r.w ?? undefined,
            h: r.h ?? undefined,
          })),
        });
      }
    } catch {
      // fall through to static
    }
  }

  return NextResponse.json({ images: getPublicAlbumImages(projectId) });
}
