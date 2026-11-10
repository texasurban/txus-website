import React, { useState } from "react";
import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";
import {
  type PricingResult,
  type ProductPriceInput,
  floorLength,
  effectiveWidth,
} from "@shared/pricing";
import { useCart } from "@/lib/cart";
import { ProductImage, parseGallery } from "./ProductImage";

export interface ProductCardProduct extends ProductPriceInput {
  notes?: string | null;
  primaryImage?: string | null;
  galleryJson?: string | null;
  imageCount?: number | null;
  location?: string | null;
  status?: string | null;
  publicListing?: string | null;
  exclusionReason?: string | null;
  quantity?: number | null;
}
export interface ShopProductView {
  product: ProductCardProduct;
  pricing: PricingResult;
}
export const shopFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217938] focus-visible:ring-offset-2";
export const shopCta = `inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[#217938] bg-[#217938] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#195f2a] disabled:cursor-not-allowed disabled:opacity-60 ${shopFocus}`;
export const shopContactHref = "/contact?subject=Private%20%2F%20Residential";

export function numericValue(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed =
    typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}
export function productWidth(product: ProductCardProduct): number | null {
  return effectiveWidth(product);
}
export function productDimensions(product: ProductCardProduct): string {
  const length = floorLength(product.lengthIn);
  const width = productWidth(product);
  const thickness = numericValue(product.thicknessIn);
  return [
    length !== null ? `${length}″ L` : null,
    width !== null ? `${width}″ avg W` : null,
    thickness !== null ? `${thickness}″ T` : null,
  ]
    .filter(Boolean)
    .join(" × ");
}
export function productTitle(product: ProductCardProduct): string {
  return `${product.species} ${product.category} — ${product.id}`;
}
export function stockQuantity(product: ProductCardProduct): number {
  const stock = numericValue(product.quantity);
  return stock === null ? 1 : Math.max(0, Math.floor(stock));
}
export function remainingQuantity(
  product: ProductCardProduct,
  items: Array<{ productId: string; quantity: number }>
): number {
  return Math.max(
    0,
    stockQuantity(product) -
      items
        .filter(item => item.productId === product.id)
        .reduce((total, item) => total + item.quantity, 0)
  );
}
export function usd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ProductCard({
  product,
  pricing,
  eager = false,
}: {
  product: ProductCardProduct;
  pricing: PricingResult;
  eager?: boolean;
}) {
  const { addItem, items } = useCart();
  const [notice, setNotice] = useState("");
  const dimensions = productDimensions(product);
  const title = productTitle(product);
  const href = `/shop/product/${encodeURIComponent(product.id)}`;
  const image = parseGallery(product.galleryJson)[0];
  const remaining = remainingQuantity(product, items);
  const priced = pricing.price !== null && Number.isFinite(pricing.price);
  const add = () => {
    if (!priced || remaining < 1) return;
    addItem(
      {
        productId: product.id,
        category: product.category,
        species: product.species,
        dimensions: dimensions || "—",
        boardFeet: pricing.boardFeet,
        selectedPrice: pricing.price,
        pricingResult: pricing,
        surfacing: false,
        image: image?.thumb ?? product.primaryImage,
        maxQuantity: stockQuantity(product),
      },
      1
    );
    setNotice("Added to your cart. This does not reserve inventory.");
  };
  return (
    <article className="flex h-full min-w-0 flex-col border-2 border-black bg-white shadow-sm">
      <Link
        href={href}
        aria-label={`View ${title}`}
        className={`block ${shopFocus}`}
      >
        <ProductImage
          src={image?.thumb ?? product.primaryImage}
          alt={title}
          loading={eager ? "eager" : "lazy"}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
          {product.category}
        </p>
        <h3 className="mt-2 text-xl leading-snug">
          <Link href={href} className={`hover:underline ${shopFocus}`}>
            {product.species}
          </Link>
        </h3>
        <p className="mt-1 break-words text-xs text-stone-600">
          ID: {product.id}
        </p>
        {dimensions && (
          <p className="mt-3 text-sm text-stone-600">{dimensions}</p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-700">
          {product.notes ||
            "View the product photos, measurements, and current pricing for this piece."}
        </p>
        {notice && (
          <p role="status" className="mt-3 text-xs text-stone-600">
            {notice}
          </p>
        )}
        <div className="mt-5 border-t border-stone-300 pt-4">
          <p className="text-2xl font-bold text-[#217938]">
            {priced ? usd(pricing.price!) : "Price unavailable"}
          </p>
          {pricing.method === "board_foot" &&
            pricing.boardFeet !== null &&
            pricing.boardFootRateUsed !== null && (
              <p className="mt-1 text-xs text-stone-600">
                {pricing.boardFeet.toFixed(2)} BF ×{" "}
                {usd(pricing.boardFootRateUsed)}/BF
              </p>
            )}
        </div>
        <div className="mt-5 grid gap-2">
          {priced ? (
            <button
              type="button"
              className={shopCta}
              onClick={add}
              disabled={remaining < 1}
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              {remaining < 1 ? "In your cart" : "Add to cart"}
            </button>
          ) : (
            <a href={shopContactHref} className={shopCta}>
              Ask about this item
            </a>
          )}
          <Link
            href={href}
            className={`inline-flex min-h-11 items-center justify-center border-2 border-black px-4 py-2 text-sm font-semibold hover:bg-stone-100 ${shopFocus}`}
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
