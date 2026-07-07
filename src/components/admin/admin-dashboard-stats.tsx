"use client";

import { useEffect, useState } from "react";
import { Building2, ImageIcon, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GalleryRow, PopupRow, Post } from "@/lib/repos";

const TOTAL_PROJECTS = 2;

export function AdminDashboardStats() {
  const [galleryCount, setGalleryCount] = useState(0);
  const [popupCount, setPopupCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [postsRes, galleryRes, popupRes] = await Promise.all([
          fetch("/api/admin/posts", { cache: "no-store" }),
          fetch("/api/admin/gallery", { cache: "no-store" }),
          fetch("/api/admin/popup", { cache: "no-store" }),
        ]);

        const postsData = (await postsRes.json()) as { posts?: Post[] };
        const galleryData = (await galleryRes.json()) as { images?: GalleryRow[] };
        const popupData = (await popupRes.json()) as { images?: PopupRow[] };

        if (cancelled) return;

        setPublishedCount(
          (postsData.posts ?? []).filter((p) => p.status === "published").length,
        );
        setGalleryCount((galleryData.images ?? []).length);
        setPopupCount((popupData.images ?? []).length);
      } catch {
        // keep zeros
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-brand-slate/70">
            Total Projects
          </CardTitle>
          <Building2 className="size-4 text-[#22D3EE]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0A3A63]">{TOTAL_PROJECTS}</p>
          <p className="mt-1 text-xs text-brand-slate/60">
            Upper Phawa (5.8 MW) · Iwa (15 MW)
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-brand-slate/70">
            Gallery Images
          </CardTitle>
          <ImageIcon className="size-4 text-[#22D3EE]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0A3A63]">
            {loading ? "…" : galleryCount}
          </p>
          <p className="mt-1 text-xs text-brand-slate/60">Album photos in database</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-brand-slate/70">
            Published Notices
          </CardTitle>
          <Newspaper className="size-4 text-[#22D3EE]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0A3A63]">
            {loading ? "…" : publishedCount}
          </p>
          <p className="mt-1 text-xs text-brand-slate/60">Live on public News page</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-brand-slate/70">
            Homepage Popup
          </CardTitle>
          <ImageIcon className="size-4 text-[#22D3EE]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0A3A63]">
            {loading ? "…" : popupCount}
          </p>
          <p className="mt-1 text-xs text-brand-slate/60">
            {popupCount > 0 ? "Active in database" : "No popup images yet"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
