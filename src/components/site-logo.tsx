import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SITE_IMAGES, SITE_NAME } from "@/lib/site-config";

type SiteLogoProps = {
  className?: string;
  onClick?: () => void;
  /** Show UNITECH / HYDROPOWER wordmark beside the mark. */
  showWordmark?: boolean;
  /** `dark` for navy footer backgrounds. */
  variant?: "light" | "dark";
  /** Override mark image (e.g. circular Unitech seal in footer). */
  markSrc?: string;
  /** Primary wordmark line (defaults to UNITECH). */
  wordmarkPrimary?: string;
  /** Secondary wordmark line (defaults to HYDROPOWER). */
  wordmarkSecondary?: string;
  /** Footer: logo above wordmark. Header keeps default inline layout. */
  layout?: "inline" | "stacked";
};

function WordmarkStack({
  primary,
  secondary,
  variant,
  stacked = false,
}: {
  primary: string;
  secondary: string;
  variant: "light" | "dark";
  stacked?: boolean;
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "grid grid-cols-1 justify-items-start gap-[2px] text-left leading-none",
        stacked ? "text-lg sm:text-xl md:text-2xl" : "text-base sm:text-lg md:text-xl",
      )}
    >
      <span
        className={cn(
          "font-heading text-[1em] font-bold uppercase tracking-[0.06em]",
          isDark ? "text-white" : "text-brand-blue",
        )}
      >
        {primary}
      </span>
      <span
        className={cn(
          "font-heading justify-self-stretch text-left font-semibold uppercase",
          "text-[0.46em] tracking-[0.34em] sm:tracking-[0.36em]",
          isDark ? "text-white/75" : "text-brand-slate/55",
        )}
      >
        {secondary}
      </span>
    </div>
  );
}

function LogoMark({
  variant,
  markSrc,
  stacked = false,
  className,
}: {
  variant: "light" | "dark";
  markSrc?: string;
  stacked?: boolean;
  className?: string;
}) {
  const src = markSrc ?? SITE_IMAGES.logo;

  const sizeClass = stacked
    ? "aspect-square w-full"
    : variant === "dark"
      ? "h-[3.75rem] w-[3.75rem] md:h-16 md:w-16"
      : "h-11 w-11 sm:h-12 sm:w-12";

  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden", sizeClass, className)}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        fill
        priority={!stacked}
        className="object-contain object-left"
        sizes={
          stacked ?
            "(min-width: 768px) 180px, 140px"
          : "(min-width: 768px) 64px, 48px"
        }
      />
    </span>
  );
}

export function SiteLogo({
  className,
  onClick,
  showWordmark = true,
  variant = "light",
  markSrc,
  wordmarkPrimary = "UNITECH",
  wordmarkSecondary = "HYDROPOWER",
  layout = "inline",
}: SiteLogoProps) {
  const isStacked = layout === "stacked";

  if (isStacked && showWordmark) {
    return (
      <Link
        href="/"
        onClick={onClick}
        // w-max: column width = wordmark. Seal is w-full so left edges match.
        className={cn("grid w-max max-w-full grid-cols-1 gap-2.5", className)}
        aria-label={SITE_NAME}
      >
        <LogoMark variant={variant} markSrc={markSrc} stacked />
        <WordmarkStack
          primary={wordmarkPrimary}
          secondary={wordmarkSecondary}
          variant={variant}
          stacked
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center gap-3", className)}
      aria-label={SITE_NAME}
    >
      <LogoMark variant={variant} markSrc={markSrc} />
      {showWordmark ?
        <WordmarkStack
          primary={wordmarkPrimary}
          secondary={wordmarkSecondary}
          variant={variant}
        />
      : null}
    </Link>
  );
}
