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
} from "@/lib/gallery-data";
import {
  type AdminGalleryImage,
  defaultAlbumImages,
  fileToDataUrl,
  loadStoredAlbums,
  saveStoredAlbums,
} from "@/lib/gallery-admin-storage";

type GalleryTabContentProps = {
  onSave?: (section: string) => void;
};

export function GalleryTabContent({ onSave }: GalleryTabContentProps) {
  const [activeProjectId, setActiveProjectId] = useState(galleryBentoItems[0]?.id ?? "");
  const [albums, setAlbums] = useState<Record<string, AdminGalleryImage[]>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStoredAlbums();
    const initial: Record<string, AdminGalleryImage[]> = {};
    for (const item of galleryBentoItems) {
      initial[item.id] =
        stored && Object.prototype.hasOwnProperty.call(stored, item.id) ?
          stored[item.id]
        : defaultAlbumImages(item.id);
    }
    setAlbums(initial);
    setHydrated(true);
  }, []);

  const activeAlbum = albums[activeProjectId] ?? [];
  const activeProject = galleryBentoItems.find((b) => b.id === activeProjectId);

  const updateActiveAlbum = useCallback(
    (updater: (prev: AdminGalleryImage[]) => AdminGalleryImage[]) => {
      setAlbums((prev) => ({
        ...prev,
        [activeProjectId]: updater(prev[activeProjectId] ?? []),
      }));
    },
    [activeProjectId]
  );

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const uploads = await Promise.all(Array.from(files).map(fileToDataUrl));
    updateActiveAlbum((prev) => [
      ...prev,
      ...uploads.map((src) => ({
        id: crypto.randomUUID(),
        src,
        alt: `${activeProject?.projectName ?? "Project"} photo`,
        category: "Other" as const,
      })),
    ]);
  };

  const saveAll = () => {
    saveStoredAlbums(albums);
    onSave?.("Gallery");
  };

  const resetProject = () => {
    updateActiveAlbum(() => defaultAlbumImages(activeProjectId));
  };

  const totalPhotos = useMemo(
    () => Object.values(albums).reduce((sum, arr) => sum + arr.length, 0),
    [albums]
  );

  if (!hydrated) {
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
            <Badge className="bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]">
              Project albums
            </Badge>
            <div>
              <CardTitle>Manage Gallery</CardTitle>
              <CardDescription>
                Matches public <code className="text-xs">/gallery/[id]</code> albums. Filter
                tags: {galleryImageCategories.join(", ")}. Saved in this browser until Supabase
                is connected.
              </CardDescription>
            </div>
          </div>
          <p className="text-sm text-brand-slate/60">
            <span className="font-semibold text-[#0B2043]">{totalPhotos}</span> album photos
            across {galleryBentoItems.length} projects
          </p>
        </CardHeader>
      </Card>

      <div className="flex flex-wrap gap-2">
        {galleryBentoItems.map((item) => {
          const active = item.id === activeProjectId;
          const count = albums[item.id]?.length ?? 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveProjectId(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-left text-sm font-medium transition-colors",
                active ?
                  "border-[#00EAFF] bg-[#00EAFF]/15 text-[#0B2043]"
                : "border-slate-200 bg-white text-brand-slate hover:border-[#00EAFF]/40"
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
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {activeAlbum.length === 0 ? (
            <p className="rounded-[4px] border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-sm text-brand-slate/70">
              No photos in this album. Upload images or reset to site defaults.
            </p>
          ) : (
            <ul className="space-y-4">
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
                              row.id === img.id ? { ...row, alt: e.target.value } : row
                            )
                          )
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`cat-${img.id}`}>Category</Label>
                      <select
                        id={`cat-${img.id}`}
                        value={img.category}
                        onChange={(e) =>
                          updateActiveAlbum((prev) =>
                            prev.map((row) =>
                              row.id === img.id ?
                                { ...row, category: e.target.value as AdminGalleryImage["category"] }
                              : row
                            )
                          )
                        }
                        className="flex h-10 w-full rounded-[4px] border border-slate-200 bg-white px-3 text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-[#00EAFF]/50"
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
                        onClick={() =>
                          updateActiveAlbum((prev) => prev.filter((row) => row.id !== img.id))
                        }
                      >
                        <Trash2 className="size-4" aria-hidden />
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
          <Button type="button" variant="secondary" onClick={resetProject}>
            <RotateCcw className="size-4" aria-hidden />
            Reset project to defaults
          </Button>
          <Button
            type="button"
            className="bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]/90"
            onClick={saveAll}
          >
            <ImagePlus className="size-4" aria-hidden />
            Save all gallery albums
          </Button>
        </div>
      </Card>
    </div>
  );
}
