import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";

type PageShellProps = {
  children: ReactNode;
  title: string;
  /** Optional hero banner (defaults inside `PageHero`). */
  heroImageSrc?: string;
  /** Passed through to `PageHero` overlay (e.g. `bg-black/55`). */
  heroOverlayClassName?: string;
  heroPriority?: boolean;
};

export function PageShell({
  children,
  title,
  heroImageSrc,
  heroOverlayClassName,
  heroPriority,
}: PageShellProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-glacier">
      <PageHero
        title={title}
        imageSrc={heroImageSrc}
        overlayClassName={heroOverlayClassName}
        priority={heroPriority}
      />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 pb-24 pt-0 md:px-20">
        {children}
      </main>
    </div>
  );
}
