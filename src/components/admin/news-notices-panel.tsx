"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
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

export type NewsItem = {
  id: string;
  date: Date;
  headline: string;
  status: NewsStatus;
  content: string;
};

const BLOG_CATEGORIES: PostCategory[] = ["Corporate", "Projects", "Reports"];

type NewsFormState = {
  title: string;
  publishDate: Date | undefined;
  content: string;
  coverUrl: string;
  category: PostCategory;
};

const emptyForm = (): NewsFormState => ({
  title: "",
  publishDate: undefined,
  content: "",
  coverUrl: BLOG_COVER_PRESETS[0]?.src ?? "/gallery/overview-1.jpeg",
  category: "Corporate",
});

function toNewsItem(post: Post): NewsItem {
  const date =
    post.published_at ? new Date(post.published_at)
    : post.created_at ? new Date(post.created_at)
    : new Date();
  return {
    id: post.id,
    date,
    headline: post.title,
    status: post.status === "published" ? "Published" : "Draft",
    content: post.body ?? post.excerpt ?? "",
  };
}

function toApiStatus(status: NewsStatus): PostStatus {
  return status === "Published" ? "published" : "draft";
}

type NewsNoticesPanelProps = {
  title?: string;
  createLabel?: string;
};

export function NewsNoticesPanel({
  title = "Manage Blog",
  createLabel = "Create Post",
}: NewsNoticesPanelProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewsFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      const data = (await res.json()) as { posts?: Post[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to load posts");
      setPosts(data.posts ?? []);
      setNewsItems((data.posts ?? []).map(toNewsItem));
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
    setForm(emptyForm());
    setDialogOpen(true);
  }

  function openEditDialog(item: NewsItem) {
    const post = posts.find((p) => p.id === item.id);
    setEditingId(item.id);
    setForm({
      title: item.headline,
      publishDate: item.date,
      content: item.content,
      coverUrl: post?.cover_url ?? BLOG_COVER_PRESETS[0]?.src ?? "",
      category: post?.category ?? "Corporate",
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
    if (!window.confirm("Delete this notice?")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Delete failed");
      }
      setNewsItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function upsertItem(status: NewsStatus) {
    if (!form.title.trim() || !form.publishDate) return;

    setSaving(true);
    setError(null);
    const payload = {
      title: form.title.trim(),
      body: form.content,
      excerpt: form.content.slice(0, 280) || null,
      cover_url: form.coverUrl || null,
      category: form.category,
      status: toApiStatus(status),
      published_at: form.publishDate.toISOString(),
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
        setNewsItems((prev) =>
          prev.map((item) => (item.id === editingId ? toNewsItem(data.post!) : item)),
        );
      } else {
        const res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as { post?: Post; error?: string };
        if (!res.ok || !data.post) throw new Error(data.error ?? "Create failed");
        setPosts((prev) => [data.post!, ...prev]);
        setNewsItems((prev) => [toNewsItem(data.post!), ...prev]);
      }
      setDialogOpen(false);
      setForm(emptyForm());
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
                Dynamic Content
              </Badge>
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-blue">{title}</h2>
                <p className="mt-1 text-sm text-brand-slate/70">
                  Publish corporate updates, AGM notices, and project milestones.
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
            <p className="text-sm text-brand-slate/70">Loading notices…</p>
          : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Headline</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsItems.length === 0 ?
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-brand-slate/60">
                      No notices yet. Create one or run the database seed.
                    </TableCell>
                  </TableRow>
                : newsItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap text-brand-slate/80">
                        {format(item.date, "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="max-w-md font-medium">{item.headline}</TableCell>
                      <TableCell className="text-brand-slate/70">
                        {posts.find((p) => p.id === item.id)?.category ?? "Corporate"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status === "Published" ? "default" : "secondary"}
                          className={cn(
                            item.status === "Published" &&
                              "border-transparent bg-[#0A3A63] text-white",
                          )}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(item)}
                          >
                            <Pencil className="size-3.5" aria-hidden />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => void handleDelete(item.id)}
                          >
                            <Trash2 className="size-3.5" aria-hidden />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          }
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit notice" : "Create notice"}</DialogTitle>
            <DialogDescription>
              {editingId ?
                "Update this entry. Published notices appear on the public News page."
              : "Add a new corporate notice. Save as draft or publish immediately."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="news-title">Title</Label>
              <Input
                id="news-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Notice headline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="news-publish-date">Publish date</Label>
              <DatePicker
                id="news-publish-date"
                date={form.publishDate}
                onDateChange={(date) => setForm((f) => ({ ...f, publishDate: date }))}
                placeholder="Select publish date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="news-category">Category</Label>
              <select
                id="news-category"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value as PostCategory }))
                }
                className="flex h-10 w-full rounded-[4px] border border-slate-200 bg-white px-3 text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50"
              >
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Cover image</Label>
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
              <p className="text-xs text-brand-slate/60">
                Choose a Nepal / project preset or upload a custom thumbnail.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="news-content">Content</Label>
              <Textarea
                id="news-content"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Full notice body…"
                className="min-h-64"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => void upsertItem("Draft")}
              disabled={!form.title.trim() || !form.publishDate || saving}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={() => void upsertItem("Published")}
              disabled={!form.title.trim() || !form.publishDate || saving}
            >
              {saving ? "Saving…" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
