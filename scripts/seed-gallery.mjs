// Upsert gallery images from gallery-data.ts (keeps existing admin uploads).
// Usage: npm run db:seed-gallery
import { neon } from "@neondatabase/serverless";
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("\n✗ DATABASE_URL is not set (.env.local).\n");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const { galleryDetailImages } = await import(
  pathToFileURL(join(here, "..", "src", "lib", "gallery-data.ts")).href
);

const sql = neon(url);

try {
  const existing = await sql`select project_id, src from gallery_images`;
  const known = new Set(existing.map((r) => `${r.project_id}::${r.src}`));
  let added = 0;

  for (const [projectId, images] of Object.entries(galleryDetailImages)) {
    let order = 0;
    for (const img of images) {
      const key = `${projectId}::${img.src}`;
      if (known.has(key)) {
        order++;
        continue;
      }
      await sql`
        insert into gallery_images (project_id, src, alt, category, w, h, sort_order)
        values (
          ${projectId},
          ${img.src},
          ${img.alt},
          ${img.category},
          ${img.w ?? null},
          ${img.h ?? null},
          ${order}
        )
      `;
      known.add(key);
      added++;
      order++;
    }
  }

  const total = await sql`select count(*)::int as n from gallery_images`;
  console.log(`✓ Gallery seed complete — ${added} new rows added (${total[0].n} total).`);
} catch (err) {
  console.error("✗ Gallery seed failed:", err.message);
  process.exit(1);
}
