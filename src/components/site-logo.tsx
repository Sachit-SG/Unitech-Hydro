import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SITE_IMAGES, SITE_NAME } from "@/lib/site-config";

type SiteLogoProps = {
  className?: string;
  onClick?: () => void;
};

export function SiteLogo({ className, onClick }: SiteLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={SITE_NAME}
    >
      <Image
        src={SITE_IMAGES.logo}
        alt=""
        width={200}
        height={200}
        priority
        className="h-9 w-auto object-contain md:h-10"
      />
    </Link>
  );
}
