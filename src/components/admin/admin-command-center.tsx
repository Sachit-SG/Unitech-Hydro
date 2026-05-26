"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, ImageIcon, Newspaper } from "lucide-react";
import { AboutUsTabContent } from "@/components/admin/about-us-tab-content";
import { GalleryTabContent } from "@/components/admin/gallery-tab-content";
import { NewsNoticesPanel } from "@/components/admin/news-notices-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryBentoItems, galleryDetailImages } from "@/lib/gallery-data";

const VALID_TABS = ["dashboard", "about", "gallery", "news"] as const;
type AdminTab = (typeof VALID_TABS)[number];

const TAB_TRIGGER_CLASS =
  "rounded-[4px] px-4 py-2 text-sm font-medium text-brand-slate transition-colors data-[state=active]:bg-[#00EAFF] data-[state=active]:text-[#0B2043] data-[state=active]:shadow-sm";

function parseTab(value: string | null): AdminTab {
  if (value && VALID_TABS.includes(value as AdminTab)) {
    return value as AdminTab;
  }
  return "dashboard";
}

const GALLERY_IMAGE_COUNT =
  galleryBentoItems.length +
  Object.values(galleryDetailImages).reduce((sum, arr) => sum + arr.length, 0);

const PUBLISHED_NOTICES_COUNT = 2;
const TOTAL_PROJECTS = 2;

export function AdminCommandCenter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AdminTab>(() =>
    parseTab(searchParams.get("tab"))
  );
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(parseTab(searchParams.get("tab")));
  }, [searchParams]);

  const handleTabChange = useCallback(
    (value: string) => {
      const tab = parseTab(value);
      setActiveTab(tab);
      router.replace(`/admin?tab=${tab}`, { scroll: false });
    },
    [router]
  );

  const handleSectionSave = useCallback((section: string) => {
    setSavedNotice(`${section} saved locally (Supabase pending).`);
    window.setTimeout(() => setSavedNotice(null), 4000);
  }, []);

  return (
    <div className="min-h-full w-full bg-slate-50 p-8">
      <header className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00EAFF]">
          Unitech CMS
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#0B2043]">
          Unitech Command Center
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-slate/70">
          Manage your corporate content, gallery, and news.
        </p>
      </header>

      {savedNotice ? (
        <p
          className="mt-6 rounded-[4px] border border-[#00EAFF]/40 bg-[#00EAFF]/10 px-4 py-3 text-sm text-[#0B2043]"
          role="status"
        >
          {savedNotice}
        </p>
      ) : null}

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="mt-6 w-full"
      >
        <TabsList className="flex h-auto w-full max-w-3xl flex-wrap justify-start gap-1 border border-slate-200/80 bg-white p-1">
          <TabsTrigger value="dashboard" className={TAB_TRIGGER_CLASS}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="about" className={TAB_TRIGGER_CLASS}>
            About Us
          </TabsTrigger>
          <TabsTrigger value="gallery" className={TAB_TRIGGER_CLASS}>
            Gallery
          </TabsTrigger>
          <TabsTrigger value="news" className={TAB_TRIGGER_CLASS}>
            News &amp; Notices
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6 outline-none">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-brand-slate/70">
                  Total Projects
                </CardTitle>
                <Building2 className="size-4 text-[#00EAFF]" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl font-bold text-[#0B2043]">
                  {TOTAL_PROJECTS}
                </p>
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
                <p className="font-heading text-3xl font-bold text-[#0B2043]">
                  {GALLERY_IMAGE_COUNT}
                </p>
                <p className="mt-1 text-xs text-brand-slate/60">
                  Bento + project album assets
                </p>
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
                <p className="mt-1 text-xs text-brand-slate/60">
                  Live on public News page
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6 outline-none">
          <AboutUsTabContent onSave={handleSectionSave} />
        </TabsContent>

        <TabsContent value="gallery" className="mt-6 outline-none">
          <GalleryTabContent />
        </TabsContent>

        <TabsContent value="news" className="mt-6 outline-none">
          <NewsNoticesPanel
            title="Manage Press & Notices"
            createLabel="Create Notice"
          />
        </TabsContent>
      </Tabs>

      <p className="mt-10 text-xs text-brand-slate/50">
        Single switchboard — tab state syncs to URL (?tab=). Supabase integration pending.
      </p>
    </div>
  );
}
