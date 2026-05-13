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
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 pb-24 pt-12 md:px-20 md:pt-14">
        <div className="text-base leading-relaxed text-brand-slate/90 md:text-[17px] md:leading-8 [&_strong]:font-semibold [&_strong]:text-brand-blue">
          {children}
        </div>
      </main>
    </div>
  );
}
