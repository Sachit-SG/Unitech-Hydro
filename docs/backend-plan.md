# Hydro backend — making the admin real (Neon + R2)

## Why
Today the admin is a **facade**: news lives in in-memory React state (resets on refresh),
gallery/popup live in `localStorage` (per-browser, editor-only — visitors never see edits).
To actually add/remove blog, news, and gallery photos and have visitors see them, we need
a real database + file storage.

## Decision: Neon (data) + Cloudflare R2 (images)
- **Neon** — serverless Postgres, free tier (0.5 GB). Works on Cloudflare Workers via the
  `@neondatabase/serverless` HTTP driver. Sachit chose Neon; it's a good fit and free.
- **Images:** Neon is Postgres — it stores *data*, not *files*. A photo gallery needs blob
  storage. Since we're already on Cloudflare, **R2** (free 10 GB, no egress) is the natural
  pair. (Alternative for a bare-minimum version: store small images as base64 in Postgres —
  fine for a couple of popup/news thumbnails, bad for a real gallery. Not recommended.)

## What I need from Sachit to wire it live (I can't create these)
1. **Neon project** → the connection string. Create free at neon.tech → copy the
   `postgresql://...` URL. Goes in `.dev.vars` locally and a Cloudflare secret `DATABASE_URL`.
2. **R2 bucket** → I can guide the `wrangler` setup; needs his Cloudflare account. Binding + a
   public bucket URL (or Cloudflare Images).
3. **Admin auth choice:** Cloudflare Access (email-gated, zero code — recommended) **or** a
   password + signed session cookie. `/admin` MUST be gated before any write path ships.

## Schema (Postgres)
```sql
create table posts (            -- news / blog
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  body        text,                       -- markdown/html (blog); optional for news
  cover_url   text,                       -- R2 URL
  category    text not null,              -- Corporate | Projects | Reports
  external_url text,                      -- for link-out items (e.g. the MCL press release)
  status      text not null default 'draft', -- draft | published
  published_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index posts_pub_idx on posts (status, published_at desc);

create table gallery_images (
  id         uuid primary key default gen_random_uuid(),
  project_id text not null,               -- album slug (upper-phawa-khola, ...)
  src        text not null,               -- R2 URL
  alt        text not null,
  category   text not null,               -- Construction|Landscape|Technical|Aerial|Other
  w          int, h int,                  -- for true-aspect masonry
  sort_order int not null default 0
);
create index gallery_project_idx on gallery_images (project_id, sort_order);

create table popup_images (               -- landing-page scroll popup
  id         uuid primary key default gen_random_uuid(),
  src        text not null,               -- R2 URL (news-article screenshot)
  active     boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
```

## Build order once unblocked
1. `src/lib/db.ts` — Neon client via `getCloudflareContext().env.DATABASE_URL`.
2. Migrations (the SQL above) — run against Neon.
3. Route handlers / server actions (behind auth) for CRUD on each table + R2 upload
   (presigned or Worker-proxied), validated with `zod`.
4. Swap the reads: `getPublicAlbumImages`, `/news` articles, and the popup component read
   from the DB instead of `localStorage`/hardcoded arrays. (The popup already reads a list —
   just change the source.)
5. Wire the existing admin tabs (About/Gallery/News/Popup — the shells exist) to the API.
6. Keep the current localStorage/static data as the fallback until the DB is populated.

## Note
The popup **frontend is already done** (scroll-triggered, animated, closeable). It reads an
image list; today from `localStorage` (set in the admin Popup tab), later from `popup_images`.
So the popup works now; the DB just makes the admin edits persist to real visitors.
