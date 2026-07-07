"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { compressImageFile } from "@/lib/compress-image";
import type { PopupRow } from "@/lib/repos";

export function PopupTabContent({
  onSave,
}: {
  onSave?: (section: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PopupRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/popup", { cache: "no-store" });
      const data = (await res.json()) as { images?: PopupRow[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to load popup images");
      setImages(data.images ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load popup images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadImages();
  }, [loadImages]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    setStatus(null);

    try {
      const list = Array.from(files);
      for (let i = 0; i < list.length; i++) {
        const file = list[i];
        setStatus(`Compressing ${file.name} (${i + 1}/${list.length})…`);
        const src = await compressImageFile(file);
        setStatus(`Uploading ${file.name}…`);
        const res = await fetch("/api/admin/popup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ src }),
        });
        const text = await res.text();
        let data: { image?: PopupRow; error?: string };
        try {
          data = JSON.parse(text) as { image?: PopupRow; error?: string };
        } catch {
          throw new Error(
            res.status === 413 ?
              "Image too large for the server. Try a smaller file."
            : `Upload failed (${res.status}). ${text.slice(0, 120)}`,
          );
        }
        if (!res.ok || !data.image) {
          throw new Error(data.error ?? `Upload failed (${res.status})`);
        }
        setImages((prev) => [...prev, data.image!]);
      }
      setStatus(`${list.length} image${list.length === 1 ? "" : "s"} uploaded.`);
      onSave?.("Popup");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setStatus(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/popup/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Delete failed");
      }
      setImages((prev) => prev.filter((i) => i.id !== id));
      onSave?.("Popup");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle>Homepage Popup</CardTitle>
              <CardDescription>
                Upload notice images (screenshots or graphics). They appear on the homepage
                after visitors scroll past the hero.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 rounded-[4px] border border-slate-200/70 bg-white px-3 py-2">
              <ImagePlus className="size-4 text-[#22D3EE]" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#22D3EE]">
                POPUP
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="popup-upload" className="text-sm font-medium text-brand-slate">
              Add images
            </label>
            <Input
              ref={fileInputRef}
              id="popup-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              disabled={uploading}
              onChange={(e) => void handleFiles(e.target.files)}
            />
            <p className="text-xs text-brand-slate/60">
              JPEG/PNG/WebP up to ~10MB — auto-compressed before upload. Saved to the database.
            </p>
          </div>

          {uploading ?
            <p className="flex items-center gap-2 text-sm text-[#0A3A63]">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {status ?? "Uploading…"}
            </p>
          : null}

          {status && !uploading ?
            <p className="rounded-[4px] border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-4 py-3 text-sm text-[#0A3A63]">
              {status}
            </p>
          : null}

          {error ?
            <p className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          : null}

          <Separator />

          {loading ?
            <p className="text-sm text-brand-slate/70">Loading popup images…</p>
          : images.length === 0 ?
            <div className="rounded-[4px] border border-slate-200 bg-white/50 p-6 text-sm text-brand-slate/70">
              No popup images yet. Choose a file above — you should see a thumbnail here after
              upload succeeds.
            </div>
          : <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-[4px] border border-slate-200 bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt="" className="h-28 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => void removeImage(img.id)}
                    className={cn(
                      "absolute right-2 top-2 rounded-full bg-white/90 p-2 text-[#0A3A63] opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover:opacity-100",
                    )}
                    aria-label="Remove image"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          }
        </CardContent>
      </Card>
    </div>
  );
}
