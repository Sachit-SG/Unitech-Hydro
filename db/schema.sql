-- Hydro admin schema — Neon Postgres. Run via: npm run db:migrate
-- Images are stored as data URLs in the *_url / src text columns (v1, no blob service).

create table if not exists posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  body         text,
  cover_url    text,
  category     text not null default 'Blog',   -- Blog | News
  external_url text,
  status       text not null default 'draft',        -- draft | published
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists posts_pub_idx on posts (status, published_at desc);

create table if not exists rate_limit_buckets (
  bucket_key text primary key,
  hits       int not null default 0,
  reset_at   timestamptz not null default now()
);
create index if not exists rate_limit_reset_idx on rate_limit_buckets (reset_at);

-- Migrate legacy post categories (safe to re-run)
update posts set category = 'News' where external_url is not null and btrim(external_url) <> '';
update posts set category = 'Blog' where category not in ('Blog', 'News');

create table if not exists gallery_images (
  id         uuid primary key default gen_random_uuid(),
  project_id text not null,                           -- album slug
  src        text not null,                           -- /gallery/... path or data URL
  alt        text not null default '',
  category   text not null default 'Other',           -- Construction|Landscape|Technical|Aerial|Other
  w          int,
  h          int,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists gallery_project_idx on gallery_images (project_id, sort_order);

create table if not exists popup_images (
  id         uuid primary key default gen_random_uuid(),
  src        text not null,                           -- data URL of the news-article screenshot
  active     boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
