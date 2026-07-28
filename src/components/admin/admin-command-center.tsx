"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GalleryTabContent } from "@/components/admin/gallery-tab-content";
import { NewsNoticesPanel } from "@/components/admin/news-notices-panel";
import { PopupTabContent } from "@/components/admin/popup-tab-content";

const VALID_TABS = ["gallery", "blog", "news", "popup"] as const;
type AdminTab = (typeof VALID_TABS)[number];

const LEGACY_TAB_MAP: Record<string, AdminTab> = {
  dashboard: "gallery",
  about: "gallery",
};

const TITLES: Record<AdminTab, string> = {
  gallery: "Gallery",
  blog: "Blog",
  news: "News",
  popup: "Popup",
};

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

  const handleSectionSave = useCallback((section: string) => {
    setSavedNotice(`${section} saved.`);
    window.setTimeout(() => setSavedNotice(null), 2500);
  }, []);

  return (
    <div className="px-6 py-8 md:px-10">
      <header className="mb-6 flex items-center justify-between gap-4 border-b border-cloud pb-5">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-ink">
          {TITLES[activeTab]}
        </h1>
        {savedNotice ?
          <p
            className="rounded-[4px] border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1.5 text-sm text-brand-blue"
            role="status"
          >
            {savedNotice}
          </p>
        : null}
      </header>

      {activeTab === "gallery" ?
        <GalleryTabContent onSave={handleSectionSave} />
      : null}
      {activeTab === "blog" ? <NewsNoticesPanel mode="blog" /> : null}
      {activeTab === "news" ? <NewsNoticesPanel mode="news" /> : null}
      {activeTab === "popup" ?
        <PopupTabContent onSave={handleSectionSave} />
      : null}
    </div>
  );
}
