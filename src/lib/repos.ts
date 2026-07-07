import "server-only";
import { getSql, isDbConfigured } from "@/lib/db";
import type { GalleryImageCategory } from "@/lib/gallery-data";

/** Data access for the admin-managed content. All server-only. */

export type PostCategory = "Corporate" | "Projects" | "Reports";
export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_url: string | null;
  category: PostCategory;
  external_url: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type GalleryRow = {
  id: string;
  project_id: string;
  src: string;
  alt: string;
  category: GalleryImageCategory;
  w: number | null;
  h: number | null;
  sort_order: number;
};

export type PopupRow = {
  id: string;
  src: string;
  active: boolean;
  sort_order: number;
  created_at: string;
};

export function dbReady(): boolean {
  return isDbConfigured();
}

function slugify(input: string): string {
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

/* ─────────────── Posts (news / blog) ─────────────── */

export async function listPosts(opts?: { publishedOnly?: boolean }): Promise<Post[]> {
  const sql = getSql();
  if (opts?.publishedOnly) {
    return (await sql`
      select * from posts
      where status = 'published'
      order by coalesce(published_at, created_at) desc
    `) as Post[];
  }
  return (await sql`select * from posts order by created_at desc`) as Post[];
}

export type PostInput = {
  title: string;
  excerpt?: string | null;
  body?: string | null;
  cover_url?: string | null;
  category?: PostCategory;
  external_url?: string | null;
  status?: PostStatus;
  published_at?: string | null;
};

export async function createPost(input: PostInput): Promise<Post> {
  const sql = getSql();
  const category = input.category ?? "Corporate";
  const status = input.status ?? "draft";
  const publishedAt =
    status === "published" ?
      (input.published_at ?? new Date().toISOString())
    : null;
  const slug = `${slugify(input.title)}-${Math.random().toString(36).slice(2, 7)}`;
  const rows = (await sql`
    insert into posts (slug, title, excerpt, body, cover_url, category, external_url, status, published_at)
    values (${slug}, ${input.title}, ${input.excerpt ?? null}, ${input.body ?? null},
            ${input.cover_url ?? null}, ${category}, ${input.external_url ?? null},
            ${status}, ${publishedAt})
    returning *
  `) as Post[];
  return rows[0];
}

export async function updatePost(id: string, input: PostInput): Promise<Post | null> {
  const sql = getSql();
  const status = input.status ?? "draft";
  const publishedAtInput = input.published_at ?? null;
  const rows = (await sql`
    update posts set
      title = ${input.title},
      excerpt = ${input.excerpt ?? null},
      body = ${input.body ?? null},
      cover_url = ${input.cover_url ?? null},
      category = ${input.category ?? "Corporate"},
      external_url = ${input.external_url ?? null},
      status = ${status},
      published_at = case
        when ${status} = 'published' then coalesce(${publishedAtInput}, published_at, now())
        else null
      end,
      updated_at = now()
    where id = ${id}
    returning *
  `) as Post[];
  return rows[0] ?? null;
}

export async function deletePost(id: string): Promise<void> {
  const sql = getSql();
  await sql`delete from posts where id = ${id}`;
}

/* ─────────────── Gallery images ─────────────── */

export async function listGallery(projectId?: string): Promise<GalleryRow[]> {
  const sql = getSql();
  if (projectId) {
    return (await sql`
      select * from gallery_images where project_id = ${projectId}
      order by sort_order asc, created_at asc
    `) as GalleryRow[];
  }
  return (await sql`
    select * from gallery_images order by project_id, sort_order asc
  `) as GalleryRow[];
}

export async function listGalleryCounts(): Promise<Record<string, number>> {
  const sql = getSql();
  const rows = (await sql`
    select project_id, count(*)::int as count
    from gallery_images
    group by project_id
  `) as { project_id: string; count: number }[];
  return Object.fromEntries(rows.map((r) => [r.project_id, r.count]));
}

export type GalleryInput = {
  project_id: string;
  src: string;
  alt?: string;
  category?: GalleryImageCategory;
  w?: number | null;
  h?: number | null;
  sort_order?: number;
};

export async function createGalleryImage(input: GalleryInput): Promise<GalleryRow> {
  const sql = getSql();
  const rows = (await sql`
    insert into gallery_images (project_id, src, alt, category, w, h, sort_order)
    values (${input.project_id}, ${input.src}, ${input.alt ?? ""},
            ${input.category ?? "Other"}, ${input.w ?? null}, ${input.h ?? null},
            ${input.sort_order ?? 0})
    returning *
  `) as GalleryRow[];
  return rows[0];
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const sql = getSql();
  await sql`delete from gallery_images where id = ${id}`;
}

export type GalleryUpdateInput = {
  alt?: string;
  category?: GalleryImageCategory;
  sort_order?: number;
};

export async function updateGalleryImage(
  id: string,
  input: GalleryUpdateInput,
): Promise<GalleryRow | null> {
  const sql = getSql();
  const rows = (await sql`
    update gallery_images set
      alt = coalesce(${input.alt ?? null}, alt),
      category = coalesce(${input.category ?? null}, category),
      sort_order = coalesce(${input.sort_order ?? null}, sort_order)
    where id = ${id}
    returning *
  `) as GalleryRow[];
  return rows[0] ?? null;
}

/* ─────────────── Popup images ─────────────── */

export async function listPopupImages(opts?: { activeOnly?: boolean }): Promise<PopupRow[]> {
  const sql = getSql();
  if (opts?.activeOnly) {
    return (await sql`
      select * from popup_images where active = true and length(src) > 2000
      order by created_at desc, sort_order desc
    `) as PopupRow[];
  }
  return (await sql`
    select * from popup_images where length(src) > 2000
    order by created_at desc, sort_order desc
  `) as PopupRow[];
}

export async function createPopupImage(src: string): Promise<PopupRow> {
  const sql = getSql();
  const rows = (await sql`
    insert into popup_images (src) values (${src}) returning *
  `) as PopupRow[];
  return rows[0];
}

export async function deletePopupImage(id: string): Promise<void> {
  const sql = getSql();
  await sql`delete from popup_images where id = ${id}`;
}
