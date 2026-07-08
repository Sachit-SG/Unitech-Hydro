import { NextResponse } from "next/server";
import { getMergedGalleryForProject } from "@/lib/gallery-public";
import { getPublicAlbumImages } from "@/lib/gallery-admin-storage";
import { dbReady } from "@/lib/repos";

export const dynamic = "force-dynamic";

/** Public: merged album images for a project (static + database). */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await params;

  if (dbReady()) {
    try {
      const images = await getMergedGalleryForProject(projectId);
      if (images.length > 0) {
        return NextResponse.json({ images });
      }
    } catch {
      // fall through
    }
  }

  return NextResponse.json({ images: getPublicAlbumImages(projectId) });
}
