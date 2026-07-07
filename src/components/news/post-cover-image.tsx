import Image from "next/image";

type PostCoverImageProps = {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
};

/** Renders post covers — supports gallery paths and admin data-URL uploads. */
export function PostCoverImage({
  src,
  alt = "",
  className,
  sizes = "100vw",
  fill = true,
}: PostCoverImageProps) {
  if (src.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      role={alt ? undefined : "presentation"}
    />
  );
}
