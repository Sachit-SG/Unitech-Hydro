"use client";

import Image from "next/image";
import { Pencil, Trash2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { galleryBentoItems } from "@/lib/gallery-data";

const PLACEHOLDER_SLOTS = galleryBentoItems.slice(0, 8);

export function GalleryTabContent() {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
        <div className="space-y-3">
          <Badge className="bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]">
            Dynamic Content
          </Badge>
          <div>
            <CardTitle>Manage Project Gallery</CardTitle>
            <CardDescription>
              Masonry thumbnail grid — Supabase Storage upload coming soon.
            </CardDescription>
          </div>
        </div>
        <Button
          type="button"
          className="shrink-0 bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]/90"
        >
          <Upload className="size-4" aria-hidden />
          Upload Photos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PLACEHOLDER_SLOTS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-[4px] border border-slate-200 bg-slate-100"
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0B2043]/75 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                <p className="px-2 text-center text-xs font-medium text-white">
                  {item.projectName}
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="h-8 bg-white/95 text-[#0B2043]"
                  >
                    <Pencil className="size-3.5" aria-hidden />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 text-white hover:bg-red-500/90 hover:text-white"
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
