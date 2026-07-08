// Refresh blog posts from src/lib/blog-content.ts seeds.
// Usage: npm run db:seed-blogs
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

const { BLOG_POSTS } = await import(
  pathToFileURL(join(here, "..", "src", "lib", "blog-content.ts")).href
);

function slugify(input) {
  return (
    input
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 70) || `post-${Date.now()}`
  );
}

const sql = neon(url);

try {
  await sql`delete from posts`;
  for (const post of BLOG_POSTS) {
    const slug = `${slugify(post.title)}-${Math.random().toString(36).slice(2, 7)}`;
    await sql`
      insert into posts (slug, title, excerpt, body, cover_url, category, external_url, status, published_at)
      values (
        ${slug},
        ${post.title},
        ${post.excerpt},
        ${post.body},
        ${post.cover_url},
        ${post.category},
        ${post.external_url ?? null},
        'published',
        ${post.published_at}
      )
    `;
  }
  console.log(`✓ Seeded ${BLOG_POSTS.length} blog posts.`);
} catch (err) {
  console.error("✗ Seed failed:", err.message);
  process.exit(1);
}
