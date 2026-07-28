import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { assertSafeImageSrc } from "@/lib/safe-image-src";
import { ValidationError } from "@/lib/validation-error";
import { rejectIfAdminWriteRateLimited } from "@/lib/rate-limit";
import {
  createGalleryImage,
  listGallery,
  listGalleryCounts,
  type GalleryInput,
} from "@/lib/repos";

export const dynamic = "force-dynamic";

const PROJECT_ID_RE = /^[a-z0-9-]+$/;

function sanitizeGalleryInput(body: GalleryInput): GalleryInput {
  const project_id = body.project_id?.trim() ?? "";
  if (!project_id || !PROJECT_ID_RE.test(project_id) || project_id.length > 80) {
    throw new ValidationError("Invalid project album.");
  }

  const src = assertSafeImageSrc(body.src);
  if (!src) {
    throw new ValidationError("Image source is required.");
  }

  const alt = (body.alt ?? "").trim().slice(0, 500);

  return {
    ...body,
    project_id,
    src,
    alt,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("countsOnly") === "true") {
      return NextResponse.json({ counts: await listGalleryCounts() });
    }
    const projectId = searchParams.get("projectId") ?? undefined;
    if (projectId && (!PROJECT_ID_RE.test(projectId) || projectId.length > 80)) {
      return NextResponse.json({ error: "Invalid project id." }, { status: 400 });
    }
    return NextResponse.json({ images: await listGallery(projectId) });
  } catch (err) {
    return apiErrorResponse(err, "admin-gallery-get");
  }
}

export async function POST(request: Request) {
  try {
    const limited = await rejectIfAdminWriteRateLimited(request);
    if (limited) return limited;

    const body = (await request.json()) as GalleryInput;
    const image = await createGalleryImage(sanitizeGalleryInput(body));
    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err, "admin-gallery-create");
  }
}
