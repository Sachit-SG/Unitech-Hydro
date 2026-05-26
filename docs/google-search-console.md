# Google Search Console — verify & request recrawl

Use this after deploying the SEO updates (sitemap, structured data, renamed images).

## 1. Add the property

1. Open [Google Search Console](https://search.google.com/search-console).
2. **Add property** → choose **URL prefix**: `https://unitechhydropower.com`
3. Verify ownership using one of:
   - **HTML tag** — copy the `content="..."` value from Google and set in your deploy environment:
     Add to Cloudflare Worker / local `.env` (not committed):
     ```bash
     GOOGLE_SITE_VERIFICATION=your_verification_code_here
     NEXT_PUBLIC_SITE_URL=https://unitechhydropower.com
     ```
     Redeploy with `npm run deploy`. Google reads the verification tag from page metadata.
   - **DNS TXT** — add the record at your domain registrar (good if you prefer not to redeploy).

## 2. Submit the sitemap

1. In Search Console → **Sitemaps**.
2. Enter: `sitemap.xml`
3. Click **Submit**.

Full URL: `https://unitechhydropower.com/sitemap.xml`

## 3. Request indexing (recrawl)

For the homepage and key pages:

1. **URL Inspection** (top search bar).
2. Paste each URL and press Enter:
   - `https://unitechhydropower.com/`
   - `https://unitechhydropower.com/about`
   - `https://unitechhydropower.com/projects`
   - `https://unitechhydropower.com/contact`
3. Click **Test live URL** — confirm Google sees title: **Unitech Hydropower Company Limited**.
4. Click **Request indexing**.

Repeat for any URL that still shows an old title in search results.

## 4. Link Google Business Profile

In your [Business Profile](https://business.google.com):

1. Edit profile → **Contact** / **Business information**.
2. Set **Website** to `https://unitechhydropower.com` (not only a workers.dev URL).
3. Save.

This aligns the knowledge panel with your canonical site.

## 5. What to expect

- **Recrawl:** often 2–14 days; indexing request can speed critical URLs.
- **Title in results:** Google may still rewrite titles; renamed image URLs and JSON-LD reduce “Hydropower dam” style rewrites.
- **Check progress:** Search Console → **Pages** → **Indexed** and **Performance**.

## 6. Optional: Bing

Submit the same sitemap at [Bing Webmaster Tools](https://www.bing.com/webmasters).
