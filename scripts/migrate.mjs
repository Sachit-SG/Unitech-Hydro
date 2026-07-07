// One-shot schema migration. Usage: npm run db:migrate
// Reads DATABASE_URL from the environment (.env.local for `next dev`).
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "\n✗ DATABASE_URL is not set.\n  Add it to .env.local:\n    DATABASE_URL=\"postgresql://...your Neon string...\"\n",
  );
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const schema = readFileSync(join(here, "..", "db", "schema.sql"), "utf8");

const sql = neon(url);

try {
  // Strip line comments, then split (neon() runs one statement per call).
  const cleaned = schema.replace(/--[^\n]*/g, "").trim();
  const statements = cleaned
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const stmt of statements) {
    await sql.query(stmt);
  }
  console.log(`✓ Migration complete — ${statements.length} statements applied.`);
} catch (err) {
  console.error("✗ Migration failed:", err.message);
  process.exit(1);
}
