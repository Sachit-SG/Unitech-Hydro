"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Post, PostCategory, PostStatus } from "@/lib/repos";
import { BLOG_COVER_PRESETS } from "@/lib/blog-content";
import { compressImageFile } from "@/lib/compress-image";
import { cn } from "@/lib/utils";

export type NewsStatus = "Draft" | "Published";

type PanelMode = "blog" | "news";

type NewsFormState = {
  title: string;
  publishDate: Date | undefined;
  content: string;
  coverUrl: string;
  externalUrl: string;
};

const emptyForm = (mode: PanelMode): NewsFormState => ({
  title: "",
  publishDate: undefined,
  content: "",
  coverUrl: BLOG_COVER_PRESETS[0]?.src ?? "/gallery/overview-1.jpeg",
  externalUrl: "",
});

function toApiStatus(status: NewsStatus): PostStatus {
  return status === "Published" ? "published" : "draft";
}

function categoryForMode(mode: PanelMode): PostCategory {
  return mode === "blog" ? "Blog" : "News";
}

type NewsNoticesPanelProps = {
  mode: PanelMode;
};

export function NewsNoticesPanel({ mode }: NewsNoticesPanelProps) {
  const isBlog = mode === "blog";
  const createLabel = isBlog ? "New article" : "Add link";
  const category = categoryForMode(mode);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewsFormState>(() => emptyForm(mode));
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  const filteredPosts = useMemo(
    () => posts.filter((post) => post.category === category),
    [posts, category],
  );

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      const data = (await res.json()) as { posts?: Post[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to load posts");
      setPosts(data.posts ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  function openCreateDialog() {
    setEditingId(null);
    setForm(emptyForm(mode));
    setDialogOpen(true);
  }

  function openEditDialog(post: Post) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      publishDate:
        post.published_at ? new Date(post.published_at)
        : post.created_at ? new Date(post.created_at)
        : undefined,
      content: post.body ?? "",
      coverUrl: post.cover_url ?? BLOG_COVER_PRESETS[0]?.src ?? "",
      externalUrl: post.external_url ?? "",
    });
    setDialogOpen(true);
  }

  async function handleCoverFile(file: File | null) {
    if (!file) return;
    setCoverUploading(true);
    setError(null);
    try {
      const src = await compressImageFile(file);
      setForm((f) => ({ ...f, coverUrl: src }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cover upload failed");
    } finally {
      setCoverUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm(`Delete this ${isBlog ? "article" : "news link"}?`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Delete failed");
      }
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function canSave(status: NewsStatus): boolean {
    if (!form.title.trim() || !form.publishDate) return false;
    if (isBlog) return form.content.trim().length > 0;
    if (status === "Published") return form.externalUrl.trim().length > 0;
    return true;
  }

  async function upsertItem(status: NewsStatus) {
    if (!canSave(status)) return;

    setSaving(true);
    setError(null);
    const externalUrl = form.externalUrl.trim();
    const payload = isBlog ?
      {
        title: form.title.trim(),
        body: form.content.trim(),
        excerpt: form.content.trim().slice(0, 280),
        cover_url: form.coverUrl || null,
        category,
        external_url: null,
        status: toApiStatus(status),
        published_at: form.publishDate!.toISOString(),
      }
    : {
        title: form.title.trim(),
        body: null,
        excerpt: null,
        cover_url: form.coverUrl || null,
        category,
        external_url: externalUrl || null,
        status: toApiStatus(status),
        published_at: form.publishDate!.toISOString(),
      };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/posts/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as { post?: Post; error?: string };
        if (!res.ok || !data.post) throw new Error(data.error ?? "Update failed");
        setPosts((prev) => prev.map((p) => (p.id === editingId ? data.post! : p)));
      } else {
        const res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as { post?: Post; error?: string };
        if (!res.ok || !data.post) throw new Error(data.error ?? "Create failed");
        setPosts((prev) => [data.post!, ...prev]);
      }
      setDialogOpen(false);
      setForm(emptyForm(mode));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-[4px] border border-cloud bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cloud bg-glacier-mist/60 px-5 py-4">
          <p className="font-heading text-base font-bold text-ink">
            {isBlog ? "Articles" : "External links"}
          </p>
          <button
            type="button"
            onClick={openCreateDialog}
            className="rounded-[4px] bg-brand-cyan px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-cyan/90"
          >
            {createLabel}
          </button>
        </div>

        <div className="px-5 py-4">
          {error ?
            <p className="mb-4 rounded-[4px] border border-status-fault/30 bg-status-fault/10 px-4 py-3 text-sm text-status-fault">
              {error}
            </p>
          : null}

          {loading ?
            <p className="py-8 text-sm text-steel">Loading…</p>
          : <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-cloud text-xs uppercase tracking-wide text-steel">
                    <th className="pb-3 pr-4 font-semibold">Date</th>
                    <th className="pb-3 pr-4 font-semibold">Title</th>
                    {isBlog ? null : <th className="pb-3 pr-4 font-semibold">Link</th>}
                    <th className="pb-3 pr-4 font-semibold">Status</th>
                    <th className="pb-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.length === 0 ?
                    <tr>
                      <td
                        colSpan={isBlog ? 4 : 5}
                        className="py-10 text-center text-steel"
                      >
                        {isBlog ? "No articles yet." : "No news links yet."}
                      </td>
                    </tr>
                  : filteredPosts.map((post) => {
                      const date =
                        post.published_at ? new Date(post.published_at)
                        : post.created_at ? new Date(post.created_at)
                        : new Date();
                      return (
                        <tr key={post.id} className="border-b border-cloud/80 last:border-0">
                          <td className="whitespace-nowrap py-3.5 pr-4 text-steel">
                            {format(date, "dd MMM yyyy")}
                          </td>
                          <td className="max-w-md py-3.5 pr-4 font-medium text-ink">
                            {post.title}
                          </td>
                          {isBlog ? null : (
                            <td className="max-w-xs truncate py-3.5 pr-4 text-steel">
                              {post.external_url ?
                                <a
                                  href={post.external_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-current-blue hover:underline"
                                >
                                  {post.external_url}
                                </a>
                              : "—"}
                            </td>
                          )}
                          <td className="py-3.5 pr-4">
                            <span
                              className={
                                post.status === "published" ?
                                  "rounded-[4px] bg-brand-blue/10 px-2 py-0.5 text-xs font-medium text-brand-blue"
                                : "rounded-[4px] bg-glacier-mist px-2 py-0.5 text-xs font-medium text-steel"
                              }
                            >
                              {post.status === "published" ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => openEditDialog(post)}
                              className="mr-3 font-medium text-brand-blue hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDelete(post.id)}
                              className="font-medium text-status-fault hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ?
                isBlog ?
                  "Edit article"
                : "Edit news link"
              : isBlog ?
                "New article"
              : "Add news link"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label htmlFor="post-title" className="text-sm font-medium text-brand-slate">
                Title
              </label>
              <input
                id="post-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="h-10 w-full rounded-[4px] border border-cloud px-3 text-sm text-brand-slate outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="post-publish-date" className="text-sm font-medium text-brand-slate">
                Publish date
              </label>
              <DatePicker
                id="post-publish-date"
                date={form.publishDate}
                onDateChange={(date) => setForm((f) => ({ ...f, publishDate: date }))}
                placeholder="Select date"
              />
            </div>

            {!isBlog ?
              <div className="space-y-1.5">
                <label htmlFor="post-external-url" className="text-sm font-medium text-brand-slate">
                  External link
                </label>
                <input
                  id="post-external-url"
                  type="url"
                  value={form.externalUrl}
                  onChange={(e) => setForm((f) => ({ ...f, externalUrl: e.target.value }))}
                  placeholder="https://"
                  className="h-10 w-full rounded-[4px] border border-cloud px-3 text-sm text-brand-slate outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40"
                />
              </div>
            : null}

            <div className="space-y-1.5">
              <p className="text-sm font-medium text-brand-slate">
                Cover {isBlog ? "" : "(optional)"}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {BLOG_COVER_PRESETS.map((preset) => {
                  const selected = form.coverUrl === preset.src;
                  return (
                    <button
                      key={preset.src}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, coverUrl: preset.src }))}
                      className={cn(
                        "overflow-hidden rounded-[4px] border text-left",
                        selected ?
                          "border-brand-cyan ring-2 ring-brand-cyan/30"
                        : "border-cloud hover:border-brand-blue/40",
                      )}
                    >
                      <Image
                        src={preset.src}
                        alt=""
                        width={120}
                        height={72}
                        className="h-14 w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={coverUploading}
                className="block w-full text-sm text-steel"
                onChange={(e) => void handleCoverFile(e.target.files?.[0] ?? null)}
              />
              {form.coverUrl ?
                <div className="relative h-28 overflow-hidden rounded-[4px] border border-cloud">
                  {form.coverUrl.startsWith("data:") ?
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.coverUrl} alt="" className="h-full w-full object-cover" />
                  : <Image src={form.coverUrl} alt="" fill className="object-cover" />}
                </div>
              : null}
            </div>

            {isBlog ?
              <div className="space-y-1.5">
                <label htmlFor="post-content" className="text-sm font-medium text-brand-slate">
                  Content
                </label>
                <textarea
                  id="post-content"
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="min-h-56 w-full rounded-[4px] border border-cloud px-3 py-2 text-sm text-brand-slate outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40"
                />
              </div>
            : null}
          </div>

          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => void upsertItem("Draft")}
              disabled={!canSave("Draft") || saving}
              className="rounded-[4px] border border-cloud px-3 py-2 text-sm font-medium text-brand-slate hover:bg-glacier disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={() => void upsertItem("Published")}
              disabled={!canSave("Published") || saving}
              className="rounded-[4px] bg-brand-blue px-3 py-2 text-sm font-semibold text-white hover:bg-brand-blue-deep disabled:opacity-50"
            >
              {saving ? "Saving…" : "Publish"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
