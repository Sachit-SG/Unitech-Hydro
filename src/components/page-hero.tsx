import Image from "next/image";
import { cn } from "@/lib/cn";

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80";

export type PageHeroProps = {
  title: string;
  /** Optional banner image (remote URL must be allowed in `next.config.ts`). */
  imageSrc?: string;
  /** Overlay tint (default `bg-black/40`). Use e.g. `bg-black/55` for a heavier cinematic look. */
  overlayClassName?: string;
  /** When true, loads the hero image with higher priority (internal landing pages). */
  priority?: boolean;
};

/**
 * Shared internal-page hero: 40vh banner, dark overlay, glacier-white Syne title.
 */
export function PageHero({
  title,
  imageSrc = DEFAULT_BANNER,
  overlayClassName,
  priority = false,
}: PageHeroProps) {
  return (
    <div className="relative h-[40vh] min-h-[40vh] w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt=""
        role="presentation"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={priority}
      />
      <div
        className={cn("absolute inset-0", overlayClassName ?? "bg-black/40")}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="max-w-4xl text-center font-heading text-5xl font-bold leading-tight tracking-tight text-glacier">
          {title}
        </h1>
      </div>
    </div>
  );
}
