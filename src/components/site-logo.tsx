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
  /** Secondary wordmark line (defaults to HYDROPOWER). Omit for a single-line lockup. */
  wordmarkSecondary?: string;
  /** Footer: logo above wordmark. Header keeps default inline layout. */
  layout?: "inline" | "stacked";
};

function WordmarkStack({
  primary,
  secondary,
  variant,
  compact,
  stacked = false,
}: {
  primary: string;
  secondary: string;
  variant: "light" | "dark";
  compact?: boolean;
  stacked?: boolean;
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        stacked ? "grid w-fit grid-cols-1 justify-items-start text-left" : "inline-grid grid-cols-1",
        "leading-none",
        compact ? "gap-[2px]" : "gap-[3px]",
        "text-base sm:text-lg md:text-xl",
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
          "font-heading justify-self-stretch font-semibold uppercase",
          stacked ? "text-left" : "text-center",
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

  // Footer seal sized to roughly match the UNITECH wordmark width.
  const sizeClass = stacked
    ? "h-[7.25rem] w-[7.25rem] sm:h-32 sm:w-32 md:h-36 md:w-36"
    : variant === "dark"
      ? "h-[3.75rem] w-[3.75rem] md:h-16 md:w-16"
      : "h-11 w-11 sm:h-12 sm:w-12";

  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden",
        stacked && "justify-self-start",
        sizeClass,
        className,
      )}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        fill
        priority={!stacked}
        className={cn(
          "object-contain",
          stacked ? "object-left-top" : "object-center",
        )}
        sizes={
          stacked ?
            "(min-width: 768px) 144px, 116px"
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

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        isStacked
          ? "flex w-fit max-w-full flex-col items-start gap-2"
          : "inline-flex shrink-0 items-center",
        !isStacked && (variant === "dark" ? "gap-4 sm:gap-5" : "gap-3"),
        className,
      )}
      aria-label={SITE_NAME}
    >
      <LogoMark variant={variant} markSrc={markSrc} stacked={isStacked} />
      {showWordmark ?
        <WordmarkStack
          primary={wordmarkPrimary}
          secondary={wordmarkSecondary}
          variant={variant}
          compact={markSrc != null}
          stacked={isStacked}
        />
      : null}
    </Link>
  );
}
