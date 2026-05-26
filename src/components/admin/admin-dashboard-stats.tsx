"use client";

import { useEffect, useState } from "react";
import { Building2, ImageIcon, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countGalleryImagesMerged, countGalleryImagesFromDefaults } from "@/lib/gallery-admin-storage";

const POPUP_IMAGES_KEY = "unitech_popup_images_v1";
const TOTAL_PROJECTS = 2;
const PUBLISHED_NOTICES_COUNT = 2;

function countPopupImages(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(POPUP_IMAGES_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export function AdminDashboardStats() {
  const [galleryCount, setGalleryCount] = useState(countGalleryImagesFromDefaults());
  const [popupCount, setPopupCount] = useState(0);

  useEffect(() => {
    setGalleryCount(countGalleryImagesMerged());
    setPopupCount(countPopupImages());
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-brand-slate/70">
            Total Projects
          </CardTitle>
          <Building2 className="size-4 text-[#00EAFF]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0B2043]">{TOTAL_PROJECTS}</p>
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
          <ImageIcon className="size-4 text-[#00EAFF]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0B2043]">{galleryCount}</p>
          <p className="mt-1 text-xs text-brand-slate/60">Bento tiles + album photos</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-brand-slate/70">
            Published Notices
          </CardTitle>
          <Newspaper className="size-4 text-[#00EAFF]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0B2043]">
            {PUBLISHED_NOTICES_COUNT}
          </p>
          <p className="mt-1 text-xs text-brand-slate/60">Live on public News page</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-brand-slate/70">
            Homepage Popup
          </CardTitle>
          <ImageIcon className="size-4 text-[#00EAFF]" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold text-[#0B2043]">{popupCount}</p>
          <p className="mt-1 text-xs text-brand-slate/60">
            {popupCount > 0 ? "Saved in browser" : "No popup images yet"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
