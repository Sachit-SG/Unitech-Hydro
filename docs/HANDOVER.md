# Unitech Hydropower — Project Handover Plan

**Purpose:** Transfer full ownership of the website to Unitech Hydropower Company Ltd. so the original developer can step away with nothing left running only on their personal accounts.

**Live site:** https://unitechhydropower.com  
**Alternate domain:** https://unitechhydropower.com.np (redirects to `.com`)  
**GitHub:** https://github.com/Sachit-SG/Unitech-Hydro  
**Stack:** Next.js 16 · Cloudflare Workers · Neon Postgres · Resend (email)

---

## Part A — What you are handing over

| Item | Status |
|------|--------|
| Public marketing site (Home, About, Projects, Gallery, Blog & News, Contact, Impact) | Live |
| Admin CMS (`/admin`) — gallery, blog, news links, homepage popup | Live |
| Contact form → email inbox | Live (Resend) |
| Footer subscribe → notification email | Live (Resend) |
| Security (JWT admin sessions, rate limits, CSP headers) | Implemented |
| Dual domain (`.com` + `.com.np` redirect) | Live |

---

## Part B — Accounts that MUST be transferred (or recreated under Unitech)

Do **not** leave production depending on your personal logins.

### 1. Cloudflare (hosting)
- **Owns:** `unitechhydropower.com`, Worker deploy, SSL, CDN
- **Transfer:** Add Unitech staff as **Super Admin** or transfer account ownership
- **Worker name:** `unitechhydropower`
- **Deploy command:** `npm run deploy` (from repo root, with Wrangler logged in)

### 2. Neon (database)
- **Owns:** Blog, news, gallery images (DB), admin content
- **Transfer:** Invite Unitech email to Neon project **or** export connection string and create new project under their account, then migrate
- **Dashboard:** https://console.neon.tech

### 3. Resend (transactional email)
- **Owns:** Contact form + subscribe emails
- **Transfer:** Invite to Resend team **or** create new API key under `unitechhydropower@gmail.com` account
- **Important:** Verify `unitechhydropower.com` domain in Resend for production sender (`noreply@unitechhydropower.com`). Until then, test mode limits who can receive mail.

### 4. GitHub (source code)
- **Repo:** `Sachit-SG/Unitech-Hydro`
- **Transfer options:**
  - **Recommended:** Transfer repo to Unitech org/user, **or**
  - Add their GitHub user as **Admin**, then remove yourself after handover

### 5. Domain registrar
- **Owns:** `unitechhydropower.com` and `unitechhydropower.com.np`
- **Transfer:** Registrar login + 2FA to Unitech IT, or update admin contact email to company

### 6. Google (optional but recommended)
- **Google Search Console** — property for `https://unitechhydropower.com`
- **Google Business Profile** — website URL should be `https://unitechhydropower.com`

---

## Part C — Secrets inventory (never commit these to Git)

Production secrets live in **Cloudflare Worker secrets**, not in the repo.

| Secret | Purpose | Set via |
|--------|---------|---------|
| `DATABASE_URL` | Neon Postgres connection | `npx wrangler secret put DATABASE_URL` |
| `ADMIN_SECRET` | Admin login password | `npx wrangler secret put ADMIN_SECRET` |
| `SESSION_SIGNING_SECRET` | Signs admin JWT cookies (32+ char random) | `npx wrangler secret put SESSION_SIGNING_SECRET` |
| `RESEND_API_KEY` | Contact + subscribe email | `npx wrangler secret put RESEND_API_KEY` |
| `CONTACT_TO_EMAIL` | Inbox for form submissions (optional) | `npx wrangler secret put CONTACT_TO_EMAIL` |
| `CONTACT_FROM_EMAIL` | Sender address (after domain verify) | `npx wrangler secret put CONTACT_FROM_EMAIL` |
| `GOOGLE_SITE_VERIFICATION` | Search Console HTML tag (optional) | `npx wrangler secret put GOOGLE_SITE_VERIFICATION` |

**Local dev only:** copy `.env.example` → `.env.local` and fill values (file is gitignored).

Generate a new session secret:
```bash
openssl rand -hex 32
```

**Handover rule:** Rotate `ADMIN_SECRET`, `RESEND_API_KEY`, and `SESSION_SIGNING_SECRET` when ownership changes. Do not share old passwords in email/chat.

---

## Part D — 90-minute handover meeting agenda (do this live with client)

1. **Tour public site** (15 min) — pages, blog/news toggle, contact form test
2. **Admin demo** (20 min) — login, gallery upload, blog article, external news link, popup
3. **Deploy demo** (10 min) — show `npm run deploy` only if they will self-host updates; otherwise skip
4. **Accounts** (20 min) — log into Cloudflare, Neon, Resend together; confirm they have access
5. **Domains** (10 min) — confirm both `.com` and `.com.np` on same Worker
6. **Q&A + written doc** (15 min) — leave them this file

---

## Part E — Client “how to” (daily operations)

### Admin login
- URL: https://unitechhydropower.com/admin/login
- Password: value of `ADMIN_SECRET` (set by IT; not stored in code)
- Sessions expire after **8 hours** — use **Sign out** in admin sidebar when done

### Publish a blog article (on-site)
1. Admin → **Blog** → **New article**
2. Title, date, cover image, full content
3. **Publish**

### Add external news (link only)
1. Admin → **News** → **Add news link**
2. Title, date, **external URL** (required to publish), optional cover
3. **Publish** — appears under Blog & News → **News** tab

### Upload gallery photos
1. Admin → **Gallery** → pick project album
2. Upload image (auto-compressed in browser)
3. Images appear on `/gallery` and project pages

### Homepage popup
1. Admin → **Popup** → upload screenshot/image → activate

---

## Part F — Technical runbook (for IT maintainer)

### First-time machine setup
```bash
git clone https://github.com/Sachit-SG/Unitech-Hydro.git
cd Unitech-Hydro
npm install
cp .env.example .env.local
# Edit .env.local with DATABASE_URL and secrets for local dev
npm run dev
# → http://localhost:3000
```

### Database
```bash
npm run db:migrate          # apply schema (safe to re-run)
npm run db:seed-blogs       # optional: reset to 4 default blog posts
npm run db:seed-gallery     # optional: add catalog images to DB
```

### Production deploy
```bash
npm run deploy
```
Requires: Node 20+, Wrangler authenticated (`npx wrangler login`), all secrets set on Cloudflare.

### Cloudflare SSL (one-time, in dashboard)
- **Always Use HTTPS:** ON
- **HSTS:** ON (6 months to start)
- **Minimum TLS:** 1.2

### Custom domains on Worker
Cloudflare → Workers → `unitechhydropower` → Settings → Domains:
- `unitechhydropower.com`
- `www.unitechhydropower.com`
- `unitechhydropower.com.np`
- `www.unitechhydropower.com.np`

---

## Part G — Your exit checklist (developer disconnect)

Complete every item before you consider the project “off your plate.”

### Access removal
- [ ] Remove your personal email from Cloudflare (after Unitech admin added)
- [ ] Remove yourself from Neon project
- [ ] Revoke your Resend API key; client creates new one
- [ ] Transfer GitHub repo or remove your write access
- [ ] Hand domain registrar credentials to client (or confirm transfer initiated)
- [ ] Rotate `ADMIN_SECRET` and `SESSION_SIGNING_SECRET` (client sets new values in Wrangler)

### Credentials you must NOT keep using
- [ ] Delete or archive local `.env.local` after documenting what was transferred
- [ ] Remove `ADMIN_SECRET=unitech-admin-2026` from any shared docs (weak default — must be changed in prod)

### Documentation
- [ ] Send client this `docs/HANDOVER.md`
- [ ] Send client `docs/google-search-console.md` for SEO setup
- [ ] Confirm they have `company-context.md` for accurate MW/capacity copy

### Final verification (client browser, not yours)
- [ ] Contact form sends email to `unitechhydropower@gmail.com`
- [ ] Footer subscribe sends notification email
- [ ] Admin login works with **new** password
- [ ] `unitechhydropower.com.np` redirects to `.com`
- [ ] Gallery shows their uploaded photos

### Billing
- [ ] Confirm Cloudflare, Neon, Resend bills go to **company card/email**, not yours
- [ ] Document approximate monthly cost (Cloudflare free tier, Neon free/low, Resend free tier)

### Support boundary (write this in your handover email)
> “Handover complete on [DATE]. Warranty/support ended [DATE + X days if any]. Future changes via [Unitech IT / new vendor]. Repository and accounts are owned by Unitech Hydropower Company Ltd.”

---

## Part H — Known gaps (not blocking launch; client should plan)

| Item | Notes |
|------|--------|
| Privacy & Terms pages | Placeholder text — needs company lawyer review |
| Footer social links | Point to generic linkedin.com / instagram.com — replace with real profiles |
| Google Search Console | May not be verified yet — follow `docs/google-search-console.md` |
| Resend domain verify | Needed for reliable email from `@unitechhydropower.com` sender |
| Some gallery images | Only seeded paths unless client re-uploaded via admin |
| `npm run db:seed` wipe in dev | `?refresh=blogs` blocked in production (by design) |

---

## Part I — Emergency contacts & recovery

| Problem | Action |
|---------|--------|
| Site down | Cloudflare dashboard → Workers → check errors / rollback deployment |
| Admin locked out | Reset `ADMIN_SECRET` + `SESSION_SIGNING_SECRET` via Wrangler; redeploy |
| Database empty | Restore Neon backup (enable PITR in Neon if not already) |
| Email not sending | Resend dashboard → Logs; check API key and domain verification |
| Bad deploy | Redeploy previous git commit: `git checkout <tag>` → `npm run deploy` |

---

## Part J — Suggested handover email template

```
Subject: Unitech Hydropower website — handover complete

Dear [Name],

The company website is live at https://unitechhydropower.com

Admin CMS: https://unitechhydropower.com/admin/login
(Password shared separately / set by your IT team)

Attached: handover document with accounts, runbooks, and your exit checklist.

Accounts transferred:
- Cloudflare: [yes/pending]
- Neon database: [yes/pending]
- Resend email: [yes/pending]
- GitHub repository: [yes/pending]
- Domains: [yes/pending]

Please rotate all admin passwords and API keys within 7 days of this email.

After [DATE], ongoing maintenance is owned by Unitech Hydropower Company Ltd.

Regards,
[Your name]
```

---

## Part K — One-page “mind off” summary

When all of Part G is checked:

1. **They** own Cloudflare, Neon, Resend, GitHub, domains, and secrets.  
2. **They** know how to log into admin and publish content.  
3. **You** have no production secrets, no sole-admin access, and no unpaid support obligation.  
4. **You** sent handover doc + optional 30–60 min call recording.

**You are done.**
