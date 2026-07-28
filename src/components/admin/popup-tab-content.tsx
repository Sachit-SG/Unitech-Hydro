"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
      setStatus(`${list.length} uploaded.`);
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
    <div className="overflow-hidden rounded-[4px] border border-cloud bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cloud bg-glacier-mist/60 px-5 py-4">
        <p className="font-heading text-base font-bold text-ink">Notice images</p>
        <div className="flex items-center gap-3">
          {status ? <p className="text-sm text-steel">{status}</p> : null}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            disabled={uploading}
            className="sr-only"
            onChange={(e) => void handleFiles(e.target.files)}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-[4px] bg-brand-cyan px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-cyan/90 disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Add images"}
          </button>
        </div>
      </div>

      <div className="px-5 py-5">
        {error ?
          <p className="mb-4 rounded-[4px] border border-status-fault/30 bg-status-fault/10 px-4 py-3 text-sm text-status-fault">
            {error}
          </p>
        : null}

        {loading ?
          <p className="py-8 text-sm text-steel">Loading…</p>
        : images.length === 0 ?
          <p className="py-10 text-center text-sm text-steel">No popup images yet.</p>
        : <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-[4px] border border-cloud bg-glacier"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" className="h-28 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => void removeImage(img.id)}
                  className="absolute right-1.5 top-1.5 rounded-[4px] bg-white/95 px-2 py-1 text-xs font-medium text-status-fault opacity-0 shadow-sm group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
