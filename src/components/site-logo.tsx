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
        compact
          ? "text-base sm:text-lg md:text-xl"
          : "text-base sm:text-lg md:text-xl",
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
  const isSealLogo = markSrc != null;

  if (isSealLogo) {
    return (
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden",
          stacked
            ? "h-36 w-full sm:h-40 md:h-44"
            : "inline-flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32 md:h-36 md:w-36",
          className,
        )}
        aria-hidden
      >
        <Image
          src={src}
          alt=""
          fill
          className={cn(
            stacked
              ? "origin-top-left scale-[1.22] object-contain object-left-top"
              : "object-contain object-center",
          )}
          sizes={
            stacked ?
              "(min-width: 768px) 176px, 144px"
            : "(min-width: 768px) 144px, 112px"
          }
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
        variant === "dark"
          ? "h-[3.75rem] w-[3.75rem] md:h-16 md:w-16"
          : "h-11 w-11 sm:h-12 sm:w-12",
      )}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        width={200}
        height={200}
        priority
        className={cn(
          "absolute left-1/2 top-1/2 max-h-none max-w-none -translate-x-1/2 -translate-y-1/2 object-contain",
          variant === "dark" ? "h-[170%] w-[170%]" : "h-[158%] w-[158%]",
        )}
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
  const showSecondary = wordmarkSecondary !== "";
  const isStacked = layout === "stacked";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        isStacked ? "grid w-max max-w-full grid-cols-1 justify-items-start gap-2" : (
          "inline-flex shrink-0 items-center"
        ),
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
