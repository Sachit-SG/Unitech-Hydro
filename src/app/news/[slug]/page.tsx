import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RelatedNewsSidebar } from "@/components/news/related-news-sidebar";
import { PostCoverImage } from "@/components/news/post-cover-image";
import { formatArticleDateLong, splitArticleBody } from "@/lib/blog-public";
import { safePublicHttpUrl } from "@/lib/safe-url";
import { dbReady, getPublishedPostBySlug, listPosts } from "@/lib/repos";

export const dynamic = "force-dynamic";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!dbReady()) return { title: "News" };

  try {
    const post = await getPublishedPostBySlug(slug);
    if (!post) return { title: "Article not found" };
    return {
      title: post.title,
      description: post.excerpt ?? post.title,
    };
  } catch {
    return { title: "News" };
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;

  if (!dbReady()) notFound();

  let post;
  try {
    post = await getPublishedPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  if (post.category === "Blog") {
    redirect(`/blog/${slug}`);
  }

  const external = safePublicHttpUrl(post.external_url);
  if (external) {
    redirect(external);
  }

  let allPosts: Awaited<ReturnType<typeof listPosts>> = [];
  try {
    allPosts = await listPosts({ publishedOnly: true, category: "News" });
  } catch {
    notFound();
  }

  const paragraphs = splitArticleBody(post.body ?? post.excerpt);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-[1440px] px-8 md:px-20">
        <Link
          href="/blog?view=news"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-slate/70 transition-colors hover:text-brand-blue"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to News
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              {post.category}
            </p>

            <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <PostCoverImage
                src={post.cover_url ?? "/gallery/overview-1.jpeg"}
                className="object-cover object-center"
                sizes="(min-width: 1024px) 65vw, 100vw"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-cyan/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                {post.category}
              </span>
            </div>

            <h1 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-blue md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              {post.title}
            </h1>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate/55">
              By Unitech Hydropower Company Limited ·{" "}
              <time dateTime={post.published_at ?? undefined}>
                {formatArticleDateLong(post.published_at)}
              </time>
            </p>

            <div className="mt-8 space-y-5 border-t border-slate-200 pt-8 text-base leading-[1.85] text-brand-slate/90 md:text-[1.05rem]">
              {paragraphs.length > 0 ?
                paragraphs.map((paragraph, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <p key={index}>{paragraph}</p>
                ))
              : <p className="text-brand-slate/70">Full article text is not available yet.</p>}
            </div>
          </article>

          <RelatedNewsSidebar
            posts={allPosts}
            currentSlug={slug}
            listingHref="/blog?view=news"
            heading="Related News"
          />
        </div>
      </div>
    </div>
  );
}
