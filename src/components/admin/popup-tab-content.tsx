"use client";

import { useEffect, useMemo, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";

const POPUP_IMAGES_KEY = "unitech_popup_images_v1";

type PopupImage = {
  id: string;
  dataUrl: string;
};

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export function PopupTabContent({
  onSave,
}: {
  onSave?: (section: string) => void;
}) {
  const [images, setImages] = useState<PopupImage[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(POPUP_IMAGES_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;
      setImages(
        parsed
          .filter((v) => typeof v === "string" && v.length > 0)
          .map((dataUrl: string, idx: number) => ({ id: `${idx}`, dataUrl }))
      );
    } catch {
      // ignore malformed storage
    }
  }, []);

  const canSave = images.length > 0;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    const newDataUrls = await Promise.all(list.map(fileToDataUrl));
    setImages((prev) => [
      ...prev,
      ...newDataUrls.map((dataUrl) => ({
        id: crypto.randomUUID(),
        dataUrl,
      })),
    ]);
  };

  const save = () => {
    const payload = images.map((i) => i.dataUrl);
    window.localStorage.setItem(POPUP_IMAGES_KEY, JSON.stringify(payload));
    onSave?.("Popup");
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
  };

  const emptyState = useMemo(() => {
    return (
      <div className="rounded-[4px] border border-slate-200 bg-white/50 p-6 text-sm text-brand-slate/70">
        Add one or more notice images. Visitors will see the popup on the homepage.
      </div>
    );
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle>Homepage Popup</CardTitle>
              <CardDescription>
                Upload images for a dismissal-based notice popup on the public homepage.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 rounded-[4px] border border-slate-200/70 bg-white px-3 py-2">
              <ImagePlus className="size-4 text-[#00EAFF]" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00EAFF]">
                POPUP
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-slate">
              Add images
            </label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />
            <p className="text-xs text-brand-slate/60">
              Stored in your browser (Supabase wiring comes tomorrow).
            </p>
          </div>

          <Separator />

          {images.length === 0 ? (
            emptyState
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-[4px] border border-slate-200 bg-white"
                >
                  <img
                    src={img.dataUrl}
                    alt=""
                    className="h-28 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className={cn(
                      "absolute right-2 top-2 rounded-full bg-white/90 p-2 text-[#0B2043] opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover:opacity-100"
                    )}
                    aria-label="Remove image"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
          <Button
            type="button"
            variant="secondary"
            disabled={images.length === 0}
            onClick={() => setImages([])}
          >
            Clear
          </Button>
          <Button type="button" disabled={!canSave} onClick={save}>
            Save popup images
          </Button>
        </div>
      </Card>
    </div>
  );
}

