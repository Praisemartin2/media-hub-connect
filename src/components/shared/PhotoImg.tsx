import { useState } from "react";
import { photos, plateFallback, type PhotoKey } from "@/data/photos";

type PhotoImgProps = {
  id: PhotoKey;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
};

/**
 * Photoreal image from the generated media library, with an automatic
 * fallback to the local illustrated plate if the CDN is unreachable.
 */
export function PhotoImg({ id, className, width = 1200, height = 750, loading = "lazy" }: PhotoImgProps) {
  const [fallback, setFallback] = useState(false);
  const p = photos[id];
  return (
    <img
      src={fallback ? plateFallback(id) : p.min}
      alt={p.alt}
      width={width}
      height={height}
      loading={loading}
      onError={() => setFallback(true)}
      className={className}
    />
  );
}
