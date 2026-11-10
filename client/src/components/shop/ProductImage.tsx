import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  thumb: string;
  detail: string;
  full: string;
  width?: number;
  height?: number;
}

/** Preserve the supplied storage URL; never prepend storage paths or infer filenames. */
export function validImageUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    (/^https?:\/\/[^\s]+$/i.test(value) ||
      /^\/manus-storage\/[^\s]+$/.test(value))
  );
}

/** galleryJson contains verified associations. Source imageCount is not a gallery. */
export function parseGallery(galleryJson?: string | null): GalleryImage[] {
  if (!galleryJson) return [];
  try {
    const data: unknown = JSON.parse(galleryJson);
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    return data.flatMap((entry): GalleryImage[] => {
      if (!entry || typeof entry !== "object") return [];
      const image = entry as Record<string, unknown>;
      if (
        !validImageUrl(image.thumb) ||
        !validImageUrl(image.detail) ||
        !validImageUrl(image.full) ||
        seen.has(image.full)
      )
        return [];
      seen.add(image.full);
      return [
        {
          thumb: image.thumb,
          detail: image.detail,
          full: image.full,
          width:
            typeof image.width === "number" && image.width > 0
              ? image.width
              : undefined,
          height:
            typeof image.height === "number" && image.height > 0
              ? image.height
              : undefined,
        },
      ];
    });
  } catch {
    return [];
  }
}

export function absoluteImageUrl(src?: string | null): string | undefined {
  if (!validImageUrl(src)) return undefined;
  return src.startsWith("/") ? `https://txurbansawmill.com${src}` : src;
}

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  aspect?: "card" | "detail" | "thumbnail" | "lightbox";
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
}

export function ProductImage({
  src,
  alt,
  className,
  aspect = "card",
  loading = "lazy",
  width,
  height,
}: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const usable = validImageUrl(src) && failedSrc !== src;
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden border-2 border-black bg-[#f0f0f0]",
        aspect === "thumbnail"
          ? "aspect-square"
          : aspect === "lightbox"
            ? "h-[65vh]"
            : "aspect-[4/3]",
        className
      )}
    >
      {usable ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={loading === "eager" ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-contain"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <p role="status" className="p-4 text-center text-sm text-stone-600">
          Photo unavailable. Please ask about this item.
        </p>
      )}
    </div>
  );
}

export default ProductImage;
