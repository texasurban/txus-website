import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "./ProductImage";
import { type PricingResult } from "@shared/pricing";
import { useCart } from "@/lib/cart";
import { ShoppingBag, ArrowRight } from "lucide-react";

export interface ProductCardProduct {
  id: string;
  category: string;
  species: string;
  lengthIn?: string | number | null;
  widthMinIn?: string | number | null;
  widthMaxIn?: string | number | null;
  averageWidthIn?: string | number | null;
  thicknessIn?: string | number | null;
  boardFeet?: string | number | null;
  pricingMethodDefault?: string | null;
  sourcePrice?: string | number | null;
  notes?: string | null;
  primaryImage?: string | null;
  imageCount?: number | null;
  location?: string | null;
}

export function ProductCard({
  product,
  pricing,
}: {
  product: ProductCardProduct;
  pricing: PricingResult;
}) {
  const { addItem } = useCart();
  const dim = [
    product.lengthIn ? `${product.lengthIn}″ L` : null,
    product.averageWidthIn ? `${product.averageWidthIn}″ avg W` : null,
    product.thicknessIn ? `${product.thicknessIn}″ T` : null,
  ]
    .filter(Boolean)
    .join(" × ");

  const hasDims = pricing.boardFeet === undefined || (pricing.boardFeet ?? 0) > 0;
  const priceText =
    pricing.price !== null && hasDims
      ? `$${pricing.price.toFixed(2)}`
      : pricing.method === "inquire"
      ? "Inquire"
      : hasDims
      ? "Price pending"
      : "Dimensions pending";

  const rateHint =
    pricing.method === "board_foot" && pricing.boardFootRateUsed
      ? `$${pricing.boardFootRateUsed.toFixed(2)}/BF (${pricing.rateSource})`
      : pricing.method === "fixed"
      ? "fixed price"
      : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-stone-300 transition-shadow hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
      <Link href={`/shop/product/${product.id}`} className="block">
        <ProductImage
          src={product.primaryImage ? `/manus-storage/${product.primaryImage.split("|")[0].trim()}` : null}
          alt={product.id}
          species={product.species}
          dimensions={dim || undefined}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <span className="font-mono text-xs text-[#7a7268]">{product.id}</span>
        </div>
        <h3 className="mt-2 font-serif text-lg font-bold tracking-tight">
          <Link href={`/shop/product/${product.id}`} className="hover:underline">
            {product.species}
          </Link>
        </h3>
        {dim && <p className="mt-1 font-mono text-xs text-[#7a7268]">{dim}</p>}
        {pricing.boardFeet && (
          <p className="text-xs text-[#7a7268]">{pricing.boardFeet.toFixed(2)} BF</p>
        )}
        <p className="mt-3 flex-1 text-xs text-[#5a5247] line-clamp-2">
          {product.notes || "Kiln-dried solid Texas hardwood, surfaced or ready to finish."}
        </p>

        {/* Pricing block */}
        <div className="mt-4 pt-3 border-t border-stone-200">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#217938]">{priceText}</span>
            {rateHint && <span className="text-[11px] text-[#7a7268]">{rateHint}</span>}
          </div>
          <p className="mt-1 text-[11px] text-[#7a7268] truncate" title={pricing.formula}>
            {pricing.formula}
          </p>
        </div>

        {/* Green CTA anchored at bottom across the row */}
        <div className="mt-4 flex gap-2">
          {pricing.price !== null && hasDims ? (
            <Button
              className="flex-1 bg-[#217938] hover:bg-[#1a5a2a] text-white uppercase text-xs tracking-[0.18em] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              onClick={() =>
                addItem({
                  productId: product.id,
                  category: product.category,
                  species: product.species,
                  dimensions: dim || "—",
                  boardFeet: pricing.boardFeet,
                  selectedPrice: pricing.price,
                  pricingResult: pricing,
                  surfacing: false,
                })
              }
            >
              <ShoppingBag className="mr-1 h-3.5 w-3.5" /> Add to Cart
            </Button>
          ) : (
            <a
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-1 bg-[#217938] hover:bg-[#1a5a2a] text-white uppercase text-xs tracking-[0.18em] px-4 py-2 font-semibold shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
            >
              Inquire <ArrowRight className="h-3 w-3" />
            </a>
          )}
          <Link
            href={`/shop/product/${product.id}`}
            className="inline-flex items-center justify-center border border-stone-400 px-3 py-2 text-xs uppercase tracking-wider text-[#1b1612] hover:bg-stone-100"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
