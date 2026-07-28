"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  if (loading) {
    return <p className="text-sm text-steel">Loading…</p>;
  }

  return (
    <div className="space-y-5">
      {error ?
        <p className="rounded-[4px] border border-status-fault/30 bg-status-fault/10 px-4 py-3 text-sm text-status-fault">
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
                "rounded-[4px] border px-3 py-2 text-sm font-medium transition-colors",
                active ?
                  "border-brand-blue bg-brand-blue text-white"
                : "border-cloud bg-white text-brand-slate hover:border-brand-cyan/50 hover:text-brand-blue",
              )}
            >
              {item.projectName}
              <span className={cn("ml-1.5 tabular-nums", active ? "text-white/60" : "text-steel")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-[4px] border border-cloud bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cloud bg-glacier-mist/60 px-5 py-4">
          <div>
            <p className="font-heading text-base font-bold text-ink">
              {activeProject?.projectName}
            </p>
            {activeProject?.location ?
              <p className="mt-0.5 text-xs text-steel">{activeProject.location}</p>
            : null}
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={uploading || projectLoading}
              className="sr-only"
              onChange={(e) => void handleFiles(e.target.files)}
            />
            <button
              type="button"
              disabled={uploading || projectLoading}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-[4px] bg-brand-cyan px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-cyan/90 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Add photos"}
            </button>
            <button
              type="button"
              onClick={() => void refreshAll()}
              className="rounded-[4px] border border-cloud bg-white px-3 py-2 text-sm font-medium text-brand-slate hover:border-brand-blue/30"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          {projectLoading ?
            <p className="py-8 text-sm text-steel">Loading album…</p>
          : activeAlbum.length === 0 ?
            <p className="py-10 text-center text-sm text-steel">No photos in this album.</p>
          : <ul className="divide-y divide-cloud">
              {activeAlbum.map((img) => (
                <li
                  key={img.id}
                  className="grid grid-cols-1 items-end gap-x-4 gap-y-3 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_10rem_auto]"
                >
                  <div className="relative h-20 w-full self-center overflow-hidden rounded-[4px] bg-glacier-mist sm:h-20 sm:w-32">
                    {img.src.startsWith("data:") ?
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.src} alt="" className="h-full w-full object-cover" />
                    : <Image src={img.src} alt="" fill className="object-cover" sizes="128px" />}
                  </div>

                  <div className="min-w-0">
                    <label htmlFor={`alt-${img.id}`} className="mb-1 block text-xs font-medium text-steel">
                      Alt text
                    </label>
                    <input
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
                      className="h-10 w-full rounded-[4px] border border-cloud bg-white px-3 text-sm text-brand-slate outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40"
                    />
                  </div>

                  <div>
                    <label htmlFor={`cat-${img.id}`} className="mb-1 block text-xs font-medium text-steel">
                      Category
                    </label>
                    <select
                      id={`cat-${img.id}`}
                      value={img.category}
                      onChange={(e) =>
                        void updateImageField(img.id, {
                          category: e.target.value as GalleryImageCategory,
                        })
                      }
                      className="h-10 w-full rounded-[4px] border border-cloud bg-white px-3 text-sm text-brand-slate outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40"
                    >
                      {galleryImageCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => void removeImage(img.id)}
                    className="h-10 text-sm font-medium text-status-fault hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}
