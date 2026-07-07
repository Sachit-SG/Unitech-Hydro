import { NextResponse } from "next/server";
import { dbReady, listPopupImages } from "@/lib/repos";

export const dynamic = "force-dynamic";

/** Public: active popup images for the landing-page notice. */
export async function GET() {
  if (!dbReady()) return NextResponse.json({ images: [] });
  try {
    const rows = await listPopupImages({ activeOnly: true });
    return NextResponse.json({ images: rows.map((r) => r.src) });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
