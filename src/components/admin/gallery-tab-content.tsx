"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ImagePlus, RotateCcw, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import {
  galleryBentoItems,
  galleryImageCategories,
  type GalleryImageCategory,
} from "@/lib/gallery-data";
import { compressImageFile } from "@/lib/compress-image";
import type { GalleryRow } from "@/lib/repos";

type GalleryTabContentProps = {
  onSave?: (section: string) => void;
};

type AlbumImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryImageCategory;
};

function toAlbumImage(row: GalleryRow): AlbumImage {
  return {
    id: row.id,
    src: row.src,
    alt: row.alt,
    category: row.category,
  };
}

export function GalleryTabContent({ onSave }: GalleryTabContentProps) {
  const [activeProjectId, setActiveProjectId] = useState(galleryBentoItems[0]?.id ?? "");
  const [albums, setAlbums] = useState<Record<string, AlbumImage[]>>({});
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const loadCounts = useCallback(async () => {
    const res = await fetch("/api/admin/gallery?countsOnly=true", { cache: "no-store" });
    const data = (await res.json()) as { counts?: Record<string, number>; error?: string };
    if (!res.ok) throw new Error(data.error ?? "Failed to load gallery counts");
    setCounts(data.counts ?? {});
  }, []);

  const loadProject = useCallback(async (projectId: string) => {
    if (!projectId) return;
    setProjectLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery?projectId=${encodeURIComponent(projectId)}`, {
        cache: "no-store",
      });
      const data = (await res.json()) as { images?: GalleryRow[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to load album");
      const images = (data.images ?? []).map(toAlbumImage);
      setAlbums((prev) => ({ ...prev, [projectId]: images }));
      setCounts((prev) => ({ ...prev, [projectId]: images.length }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load album");
    } finally {
      setProjectLoading(false);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadCounts();
      await loadProject(activeProjectId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, [activeProjectId, loadCounts, loadProject]);

  useEffect(() => {
    void refreshAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- initial load only

  useEffect(() => {
    if (!activeProjectId || albums[activeProjectId]) return;
    void loadProject(activeProjectId);
  }, [activeProjectId, albums, loadProject]);

  const activeAlbum = albums[activeProjectId] ?? [];
  const activeProject = galleryBentoItems.find((b) => b.id === activeProjectId);

  const patchImage = async (id: string, patch: { alt?: string; category?: GalleryImageCategory }) => {
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = (await res.json()) as { image?: GalleryRow; error?: string };
    if (!res.ok || !data.image) throw new Error(data.error ?? "Update failed");
    return toAlbumImage(data.image);
  };

  const updateActiveAlbum = useCallback(
    (updater: (prev: AlbumImage[]) => AlbumImage[]) => {
      setAlbums((prev) => ({
        ...prev,
        [activeProjectId]: updater(prev[activeProjectId] ?? []),
      }));
    },
    [activeProjectId],
  );

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length || !activeProjectId) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const src = await compressImageFile(file);
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project_id: activeProjectId,
            src,
            alt: `${activeProject?.projectName ?? "Project"} photo`,
            category: "Other",
          }),
        });
        const data = (await res.json()) as { image?: GalleryRow; error?: string };
        if (!res.ok || !data.image) throw new Error(data.error ?? "Upload failed");
        updateActiveAlbum((prev) => [...prev, toAlbumImage(data.image!)]);
        setCounts((prev) => ({
          ...prev,
          [activeProjectId]: (prev[activeProjectId] ?? 0) + 1,
        }));
      }
      onSave?.("Gallery");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Delete failed");
      }
      updateActiveAlbum((prev) => prev.filter((row) => row.id !== id));
      setCounts((prev) => ({
        ...prev,
        [activeProjectId]: Math.max(0, (prev[activeProjectId] ?? 1) - 1),
      }));
      onSave?.("Gallery");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const updateImageField = async (
    id: string,
    patch: { alt?: string; category?: GalleryImageCategory },
  ) => {
    updateActiveAlbum((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
    try {
      const updated = await patchImage(id, patch);
      updateActiveAlbum((prev) => prev.map((row) => (row.id === id ? updated : row)));
      onSave?.("Gallery");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      void loadProject(activeProjectId);
    }
  };

  const totalPhotos = useMemo(
    () => Object.values(counts).reduce((sum, n) => sum + n, 0),
    [counts],
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-sm text-brand-slate/70">Loading gallery…</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
          <div className="space-y-3">
            <Badge className="bg-[#22D3EE] text-[#0A3A63] hover:bg-[#22D3EE]">
              Project albums
            </Badge>
            <div>
              <CardTitle>Manage Gallery</CardTitle>
              <CardDescription>
                Matches public <code className="text-xs">/gallery/[id]</code> albums. Filter tags:{" "}
                {galleryImageCategories.join(", ")}. Changes save to the database immediately.
              </CardDescription>
            </div>
          </div>
          <p className="text-sm text-brand-slate/60">
            <span className="font-semibold text-[#0A3A63]">{totalPhotos}</span> album photos across{" "}
            {galleryBentoItems.length} projects
          </p>
        </CardHeader>
      </Card>

      {error ?
        <p className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      : null}

      <div className="flex flex-wrap gap-2">
        {galleryBentoItems.map((item) => {
          const active = item.id === activeProjectId;
          const count = counts[item.id] ?? 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveProjectId(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-left text-sm font-medium transition-colors",
                active ?
                  "border-[#22D3EE] bg-[#22D3EE]/15 text-[#0A3A63]"
                : "border-slate-200 bg-white text-brand-slate hover:border-[#22D3EE]/40",
              )}
            >
              {item.projectName}
              <span className="ml-2 text-xs text-brand-slate/55">({count})</span>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-lg">{activeProject?.projectName}</CardTitle>
          <CardDescription>
            Slug: <span className="font-mono text-xs">{activeProjectId}</span> · Bento cover:{" "}
            {activeProject?.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gallery-upload">Add photos to this album</Label>
            <Input
              id="gallery-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={uploading || projectLoading}
              onChange={(e) => void handleFiles(e.target.files)}
            />
          </div>

          {projectLoading ?
            <p className="text-sm text-brand-slate/70">Loading album photos…</p>
          : activeAlbum.length === 0 ?
            <p className="rounded-[4px] border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-sm text-brand-slate/70">
              No photos in this album yet. Upload images or run the database seed.
            </p>
          : <ul className="space-y-4">
              {activeAlbum.map((img) => (
                <li
                  key={img.id}
                  className="flex flex-col gap-4 rounded-[4px] border border-slate-200 bg-white p-4 sm:flex-row sm:items-start"
                >
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-[4px] bg-slate-100 sm:h-28 sm:w-36">
                    {img.src.startsWith("data:") ?
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.src} alt="" className="h-full w-full object-cover" />
                    : <Image src={img.src} alt="" fill className="object-cover" sizes="144px" />}
                  </div>
                  <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1 sm:col-span-2">
                      <Label htmlFor={`alt-${img.id}`}>Alt text</Label>
                      <Input
                        id={`alt-${img.id}`}
                        value={img.alt}
                        onChange={(e) =>
                          updateActiveAlbum((prev) =>
                            prev.map((row) =>
                              row.id === img.id ? { ...row, alt: e.target.value } : row,
                            ),
                          )
                        }
                        onBlur={(e) => void updateImageField(img.id, { alt: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`cat-${img.id}`}>Category</Label>
                      <select
                        id={`cat-${img.id}`}
                        value={img.category}
                        onChange={(e) =>
                          void updateImageField(img.id, {
                            category: e.target.value as GalleryImageCategory,
                          })
                        }
                        className="flex h-10 w-full rounded-[4px] border border-slate-200 bg-white px-3 text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50"
                      >
                        {galleryImageCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => void removeImage(img.id)}
                      >
                        <Trash2 className="size-4" aria-hidden />
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          }
        </CardContent>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button type="button" variant="secondary" onClick={() => void refreshAll()}>
            <RotateCcw className="size-4" aria-hidden />
            Refresh from database
          </Button>
          <Button
            type="button"
            className="bg-[#22D3EE] text-[#0A3A63] hover:bg-[#22D3EE]/90"
            disabled={uploading}
            onClick={() => onSave?.("Gallery")}
          >
            <ImagePlus className="size-4" aria-hidden />
            {uploading ? "Uploading…" : "Gallery synced"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
