import { useState } from "react";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  species?: string;
  dimensions?: string;
  className?: string;
  onClick?: () => void;
  aspect?: "card" | "detail";
}

const speciesHues: Record<string, string> = {
  pecan: "#7a5c37",
  walnut: "#4a3c2e",
  mesquite: "#6b3a24",
  oak: "#6b5d44",
  elm: "#5a5540",
  ash: "#8c7d60",
  sycamore: "#8a7550",
  cedar: "#7c3f3f",
  cherry: "#6f2f2f",
  maple: "#9a8b66",
};

function toneFor(species?: string): string {
  if (!species) return "#5a5043";
  const s = species.toLowerCase();
  for (const [k, c] of Object.entries(speciesHues)) {
    if (s.includes(k)) return c;
  }
  return "#5a5043";
}

export function ProductImage({
  src,
  alt,
  species,
  dimensions,
  className = "",
  onClick,
  aspect = "card",
}: ProductImageProps) {
  const [error, setError] = useState(false);
  const tone = toneFor(species);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onClick={onClick}
        loading="lazy"
        className={`w-full object-cover select-none cursor-pointer ${
          aspect === "card" ? "h-56" : "h-96"
        } ${className}`}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: `radial-gradient(circle at 20% 30%, ${tone} 0%, #2b231a 100%)`,
      }}
      className={`relative w-full overflow-hidden select-none cursor-pointer flex flex-col justify-between p-4 text-[#f5f1e8] ${
        aspect === "card" ? "h-56" : "h-96"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 16px)",
        }}
      />
      <div className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase opacity-75">
        <span>TXUS Shop</span>
        <span>{species || "Texas Hardwood"}</span>
      </div>
      <div className="relative z-10 text-center">
        <p className="font-serif text-lg sm:text-xl font-bold tracking-tight line-clamp-1">
          {alt}
        </p>
        {dimensions && (
          <p className="mt-1 text-xs opacity-80 font-mono">{dimensions}</p>
        )}
      </div>
      <div className="relative z-10 flex items-center justify-between text-[11px] opacity-75">
        <span>Verified inventory record</span>
        <span>Image on request</span>
      </div>
    </div>
  );
}
export default ProductImage;
