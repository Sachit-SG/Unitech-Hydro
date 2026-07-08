"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
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
  const title = isBlog ? "Manage Blog" : "Manage News";
  const createLabel = isBlog ? "New article" : "Add news link";
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
      <Card className="overflow-hidden">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge className="bg-[#22D3EE] text-[#0A3A63] hover:bg-[#22D3EE]">
                {isBlog ? "Blog" : "News"}
              </Badge>
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-blue">{title}</h2>
                <p className="mt-1 text-sm text-brand-slate/70">
                  {isBlog ?
                    "Write full articles that open on this website."
                  : "Add headlines that link to press releases or notices on other sites."}
                </p>
              </div>
            </div>
            <Button
              type="button"
              className="shrink-0 bg-[#22D3EE] text-[#0A3A63] hover:bg-[#22D3EE]/90"
              onClick={openCreateDialog}
            >
              <Plus className="size-4" aria-hidden />
              {createLabel}
            </Button>
          </div>

          {error ?
            <p className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          : null}

          {loading ?
            <p className="text-sm text-brand-slate/70">Loading…</p>
          : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  {isBlog ? null : <TableHead>Link</TableHead>}
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length === 0 ?
                  <TableRow>
                    <TableCell
                      colSpan={isBlog ? 4 : 5}
                      className="text-center text-brand-slate/60"
                    >
                      {isBlog ?
                        "No articles yet. Create one to publish on the Blog tab of the site."
                      : "No news links yet. Add a title and external URL."}
                    </TableCell>
                  </TableRow>
                : filteredPosts.map((post) => {
                    const date =
                      post.published_at ? new Date(post.published_at)
                      : post.created_at ? new Date(post.created_at)
                      : new Date();
                    return (
                      <TableRow key={post.id}>
                        <TableCell className="whitespace-nowrap text-brand-slate/80">
                          {format(date, "dd MMM yyyy")}
                        </TableCell>
                        <TableCell className="max-w-md font-medium">{post.title}</TableCell>
                        {isBlog ? null : (
                          <TableCell className="max-w-xs truncate text-brand-slate/70">
                            {post.external_url ?
                              <a
                                href={post.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:text-brand-blue"
                              >
                                <span className="truncate">{post.external_url}</span>
                                <ExternalLink className="size-3 shrink-0" aria-hidden />
                              </a>
                            : "—"}
                          </TableCell>
                        )}
                        <TableCell>
                          <Badge
                            variant={post.status === "published" ? "default" : "secondary"}
                            className={cn(
                              post.status === "published" &&
                                "border-transparent bg-[#0A3A63] text-white",
                            )}
                          >
                            {post.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(post)}
                            >
                              <Pencil className="size-3.5" aria-hidden />
                              Edit
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => void handleDelete(post.id)}
                            >
                              <Trash2 className="size-3.5" aria-hidden />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          }
        </CardContent>
      </Card>

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
            <DialogDescription>
              {isBlog ?
                "Published articles appear under the Blog tab on the Blog & News page."
              : "Published links appear under the News tab and open the external URL in a new tab."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder={isBlog ? "Article headline" : "News headline"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-publish-date">Publish date</Label>
              <DatePicker
                id="post-publish-date"
                date={form.publishDate}
                onDateChange={(date) => setForm((f) => ({ ...f, publishDate: date }))}
                placeholder="Select publish date"
              />
            </div>

            {!isBlog ?
              <div className="space-y-2">
                <Label htmlFor="post-external-url">External link</Label>
                <Input
                  id="post-external-url"
                  type="url"
                  value={form.externalUrl}
                  onChange={(e) => setForm((f) => ({ ...f, externalUrl: e.target.value }))}
                  placeholder="https://example.com/press-release"
                  required
                />
                <p className="text-xs text-brand-slate/60">
                  Required to publish. Visitors click the card and go straight to this URL.
                </p>
              </div>
            : null}

            <div className="space-y-2">
              <Label>Cover image {isBlog ? "" : "(optional)"}</Label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {BLOG_COVER_PRESETS.map((preset) => {
                  const selected = form.coverUrl === preset.src;
                  return (
                    <button
                      key={preset.src}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, coverUrl: preset.src }))}
                      className={cn(
                        "overflow-hidden rounded-[4px] border-2 text-left transition-colors",
                        selected ?
                          "border-[#22D3EE] ring-2 ring-[#22D3EE]/30"
                        : "border-slate-200 hover:border-[#22D3EE]/50",
                      )}
                    >
                      <Image
                        src={preset.src}
                        alt=""
                        width={120}
                        height={72}
                        className="h-16 w-full object-cover"
                      />
                      <span className="block truncate px-1 py-1 text-[10px] text-brand-slate/70">
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={coverUploading}
                onChange={(e) => void handleCoverFile(e.target.files?.[0] ?? null)}
              />
              {form.coverUrl ?
                <div className="relative h-32 overflow-hidden rounded-[4px] border border-slate-200">
                  {form.coverUrl.startsWith("data:") ?
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.coverUrl} alt="" className="h-full w-full object-cover" />
                  : <Image src={form.coverUrl} alt="" fill className="object-cover" />}
                </div>
              : null}
            </div>

            {isBlog ?
              <div className="space-y-2">
                <Label htmlFor="post-content">Article content</Label>
                <Textarea
                  id="post-content"
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Write your full article here…"
                  className="min-h-64"
                />
              </div>
            : null}
          </div>

          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => void upsertItem("Draft")}
              disabled={!canSave("Draft") || saving}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={() => void upsertItem("Published")}
              disabled={!canSave("Published") || saving}
            >
              {saving ? "Saving…" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
