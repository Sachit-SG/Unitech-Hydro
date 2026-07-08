"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GalleryTabContent } from "@/components/admin/gallery-tab-content";
import { NewsNoticesPanel } from "@/components/admin/news-notices-panel";
import { PopupTabContent } from "@/components/admin/popup-tab-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VALID_TABS = ["gallery", "blog", "news", "popup"] as const;
type AdminTab = (typeof VALID_TABS)[number];

const LEGACY_TAB_MAP: Record<string, AdminTab> = {
  dashboard: "gallery",
  about: "gallery",
};

const TAB_TRIGGER_CLASS =
  "rounded-[4px] px-4 py-2 text-sm font-medium text-brand-slate transition-colors data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0A3A63] data-[state=active]:shadow-sm";

function parseTab(value: string | null): AdminTab {
  if (value && VALID_TABS.includes(value as AdminTab)) {
    return value as AdminTab;
  }
  if (value && value in LEGACY_TAB_MAP) {
    return LEGACY_TAB_MAP[value];
  }
  return "gallery";
}

export function AdminCommandCenter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AdminTab>(() =>
    parseTab(searchParams.get("tab")),
  );
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    const tab = parseTab(searchParams.get("tab"));
    setActiveTab(tab);
    const raw = searchParams.get("tab");
    if (raw && raw !== tab) {
      router.replace(`/admin?tab=${tab}`, { scroll: false });
    }
  }, [searchParams, router]);

  const handleTabChange = useCallback(
    (value: string) => {
      const tab = parseTab(value);
      setActiveTab(tab);
      router.replace(`/admin?tab=${tab}`, { scroll: false });
    },
    [router],
  );

  const handleSectionSave = useCallback((section: string) => {
    setSavedNotice(`${section} saved to database.`);
    window.setTimeout(() => setSavedNotice(null), 4000);
  }, []);

  return (
    <div className="min-h-full w-full bg-slate-50 p-8">
      <header className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#22D3EE]">
          Unitech CMS
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#0A3A63]">
          Content Manager
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-slate/70">
          Manage gallery albums, blog articles, external news links, and the homepage popup.
        </p>
      </header>

      {savedNotice ?
        <p
          className="mt-6 rounded-[4px] border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-4 py-3 text-sm text-[#0A3A63]"
          role="status"
        >
          {savedNotice}
        </p>
      : null}

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6 w-full">
        <TabsList className="flex h-auto w-full max-w-xl flex-wrap justify-start gap-1 border border-slate-200/80 bg-white p-1">
          <TabsTrigger value="gallery" className={TAB_TRIGGER_CLASS}>
            Gallery
          </TabsTrigger>
          <TabsTrigger value="blog" className={TAB_TRIGGER_CLASS}>
            Blog
          </TabsTrigger>
          <TabsTrigger value="news" className={TAB_TRIGGER_CLASS}>
            News
          </TabsTrigger>
          <TabsTrigger value="popup" className={TAB_TRIGGER_CLASS}>
            Popup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="mt-6 outline-none">
          <GalleryTabContent onSave={handleSectionSave} />
        </TabsContent>

        <TabsContent value="blog" className="mt-6 outline-none">
          <NewsNoticesPanel mode="blog" />
        </TabsContent>

        <TabsContent value="news" className="mt-6 outline-none">
          <NewsNoticesPanel mode="news" />
        </TabsContent>

        <TabsContent value="popup" className="mt-6 outline-none">
          <PopupTabContent onSave={handleSectionSave} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
