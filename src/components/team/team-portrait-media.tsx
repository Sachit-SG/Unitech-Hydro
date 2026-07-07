import Image from "next/image";
import { cn } from "@/lib/cn";

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export type TeamPortraitMediaProps = {
  name: string;
  title: string;
  photoSrc?: string;
  /** @deprecated All missing photos use initials — no stock placeholders. */
  noStockPlaceholder?: boolean;
  className?: string;
  sizes?: string;
};

export function TeamPortraitMedia({
  name,
  title,
  photoSrc,
  className,
  sizes = "(min-width: 1024px) 20vw, 50vw",
}: TeamPortraitMediaProps) {
  if (photoSrc) {
    return (
      <Image
        src={photoSrc}
        alt={`${name}, ${title}`}
        fill
        className={cn(
          "object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-[1.03]",
          className,
        )}
        sizes={sizes}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200/90",
        className,
      )}
      aria-hidden
    >
      <span className="font-heading text-2xl font-bold tracking-widest text-brand-blue/25 md:text-3xl">
        {initialsFromName(name)}
      </span>
    </div>
  );
}
