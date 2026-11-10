import React, { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { ShoppingBag, ArrowLeft, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/lib/cart";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { absoluteImageUrl, parseGallery } from "@/components/shop/ProductImage";
import {
  numericValue,
  productDimensions,
  productTitle,
  productWidth,
  remainingQuantity,
  stockQuantity,
  usd,
  shopCta,
  shopFocus,
  shopContactHref,
  type ShopProductView,
} from "@/components/shop/ProductCard";
import { floorLength } from "@shared/pricing";
import { ShopToolbar } from "./ShopListing";

export function productSchema(
  view: ShopProductView,
  canonical: string,
  description: string
): Record<string, unknown> {
  const images = parseGallery(view.product.galleryJson)
    .map(image => absoluteImageUrl(image.detail))
    .filter(Boolean);
  const primary = absoluteImageUrl(view.product.primaryImage);
  const price = view.pricing.price;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productTitle(view.product),
    description,
    sku: view.product.id,
    category: view.product.category,
    url: canonical,
    image: images.length ? images : primary ? [primary] : undefined,
    brand: { "@type": "Brand", name: "Texas Urban Sawmill" },
    ...(price !== null &&
    Number.isFinite(price) &&
    stockQuantity(view.product) > 0
      ? {
          offers: {
            "@type": "Offer",
            price: price.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: canonical,
          },
        }
      : {}),
  };
}

function decodedId(value?: string): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function ProductDetail() {
  const [, params] = useRoute("/shop/product/:id");
  const id = decodedId(params?.id);
  const { data, refetch, isFetching, isLoading, isError } =
    trpc.pricing.product.useQuery(
      { id },
      {
        refetchInterval: 25_000,
        refetchOnWindowFocus: true,
        enabled: Boolean(id),
      }
    );
  const { addItem, items } = useCart();
  const [qty, setQty] = useState(1);
  const [surfacing, setSurfacing] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    setQty(1);
    setSurfacing(false);
    setNotice("");
  }, [id]);

  const view: ShopProductView | null = data ?? null;
  const product = view?.product;
  const pricing = view?.pricing;
  const title = product
    ? productTitle(product)
    : isLoading
      ? "Loading product"
      : "Product unavailable";
  const dimensions = product ? productDimensions(product) : "";
  const canonical = `https://txurbansawmill.com/shop/product/${encodeURIComponent(id)}`;
  const description = product
    ? `${product.species} ${product.category.toLowerCase()}, inventory ID ${product.id}${dimensions ? `; ${dimensions}` : ""}. View verified product photos and current pricing at Texas Urban Sawmill. Ask about local pickup.`
    : "This product is not currently available in the public Texas Urban Sawmill catalog.";
  const gallery = parseGallery(product?.galleryJson);
  const image = absoluteImageUrl(gallery[0]?.detail ?? product?.primaryImage);
  const remaining = product ? remainingQuantity(product, items) : 0;
  const selectedQty = Math.min(
    Math.max(1, Number.isFinite(qty) ? Math.floor(qty) : 1),
    Math.max(1, remaining)
  );
  const price = pricing?.price;
  const canSurface = Boolean(
    pricing?.surfacingAvailable && pricing.surfacingFee !== null
  );
  const surfaceSelected = surfacing && canSurface;
  const unitTotal =
    price !== null && price !== undefined
      ? price + (surfaceSelected ? (pricing?.surfacingFee ?? 0) : 0)
      : null;
  const canAdd =
    product &&
    pricing &&
    price !== null &&
    price !== undefined &&
    Number.isFinite(price) &&
    remaining > 0 &&
    !isError;
  const add = () => {
    if (!canAdd || !product || !pricing) return;
    const quantity = Math.min(selectedQty, remaining);
    if (quantity < 1) return;
    addItem(
      {
        productId: product.id,
        category: product.category,
        species: product.species,
        dimensions: dimensions || "—",
        boardFeet: pricing.boardFeet,
        selectedPrice: price!,
        pricingResult: pricing,
        surfacing: surfaceSelected,
        image: gallery[0]?.thumb ?? product.primaryImage,
        maxQuantity: stockQuantity(product),
      },
      quantity
    );
    setNotice(
      `${quantity} ${quantity === 1 ? "item added" : "items added"} to your cart. Inventory is not reserved.`
    );
  };

  const inchText = (value: unknown): string => {
    const number = numericValue(value);
    return number !== null ? `${number}″` : "—";
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${title} | Texas Urban Sawmill`}
        description={description}
        url={canonical}
        canonical={canonical}
        image={image}
        noindex={!product || !pricing}
        schema={view ? productSchema(view, canonical, description) : undefined}
      />
      <Navigation />
      <main>
        <ShopToolbar />
        <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-12 lg:px-8 lg:py-16">
          <div className="container">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/shop/lumber-slabs"
                className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#217938] ${shopFocus}`}
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to
                collections
              </Link>
              <button
                type="button"
                className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#217938] disabled:opacity-60 ${shopFocus}`}
                disabled={isFetching || !id}
                onClick={() => void refetch()}
              >
                <RefreshCw
                  aria-hidden="true"
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />{" "}
                Refresh pricing
              </button>
            </div>
            {!product || !pricing ? (
              <div className="py-16 text-center">
                <h1 className="text-3xl">
                  {isLoading
                    ? "Loading product…"
                    : isError
                      ? "Product could not load"
                      : "Product unavailable"}
                </h1>
                <p role={isError ? "alert" : "status"} className="mt-4">
                  {isLoading
                    ? "Checking available inventory and current pricing."
                    : isError
                      ? "Please try refreshing the product."
                      : "This item is not currently available in the public catalog. It may no longer be available or may not be publicly listed."}
                </p>
                <Link href="/shop" className={`${shopCta} mt-6`}>
                  Browse shop inventory
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
                <ProductGallery
                  key={product.id}
                  galleryJson={product.galleryJson}
                  primaryImage={product.primaryImage}
                  title={title}
                />
                <div className="min-w-0">
                  <p className="eyebrow">{product.category}</p>
                  <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">
                    {product.species} {product.category}
                  </h1>
                  <p className="mt-3 break-words text-sm text-stone-600">
                    Inventory ID: {product.id}
                  </p>
                  {dimensions && <p className="mt-3 text-base">{dimensions}</p>}
                  {isError && (
                    <p
                      role="alert"
                      className="mt-5 border-l-4 border-red-800 bg-white p-4 text-sm"
                    >
                      Current pricing could not refresh. Please refresh before
                      adding this item to your cart.
                    </p>
                  )}
                  <div className="mt-6 border-2 border-black bg-white p-5 sm:p-6">
                    <h2 className="text-xl">Current price</h2>
                    <p className="mt-2 text-4xl font-bold text-[#217938]">
                      {price !== null && price !== undefined
                        ? usd(price)
                        : "Price unavailable"}
                    </p>
                    {pricing.method === "board_foot" &&
                      pricing.boardFeet !== null &&
                      pricing.boardFootRateUsed !== null && (
                        <p className="mt-3 text-sm">
                          {pricing.boardFeet.toFixed(2)} board feet ×{" "}
                          {usd(pricing.boardFootRateUsed)} per board foot
                        </p>
                      )}
                    <p className="mt-3 break-words text-sm text-stone-600">
                      {pricing.formula}
                    </p>
                    <p className="mt-3 text-xs text-stone-600">
                      Pricing version: {pricing.pricingVersion}. Refreshes every
                      25 seconds.
                    </p>
                  </div>
                  {canSurface && (
                    <label
                      htmlFor="product-surfacing"
                      className="mt-5 flex cursor-pointer items-start gap-3 border-2 border-stone-400 bg-[#f5f1e8] p-4"
                    >
                      <input
                        id="product-surfacing"
                        type="checkbox"
                        checked={surfaceSelected}
                        onChange={event => setSurfacing(event.target.checked)}
                        className={`mt-1 h-5 w-5 accent-[#217938] ${shopFocus}`}
                      />
                      <span className="flex-1 text-sm">
                        <strong>Add surfacing / planing</strong>
                        <span className="mt-1 block">
                          {usd(pricing.surfacingFee!)} per item
                        </span>
                      </span>
                    </label>
                  )}
                  <div className="mt-6">
                    <p className="text-sm">
                      Available stock: {stockQuantity(product)}{" "}
                      {stockQuantity(product) === 1 ? "piece" : "pieces"}.
                      {remaining < stockQuantity(product)
                        ? ` ${stockQuantity(product) - remaining} already in your cart.`
                        : ""}
                    </p>
                    {stockQuantity(product) > 1 && (
                      <div className="mt-4">
                        <label
                          htmlFor="product-quantity"
                          className="text-sm font-semibold"
                        >
                          Quantity
                        </label>
                        <input
                          id="product-quantity"
                          type="number"
                          min={1}
                          max={Math.max(1, remaining)}
                          step={1}
                          value={selectedQty}
                          disabled={remaining === 0}
                          onChange={event => setQty(Number(event.target.value))}
                          className={`ml-3 min-h-11 w-24 border-2 border-stone-400 bg-white px-3 ${shopFocus}`}
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      className={`${shopCta} mt-5 w-full`}
                      disabled={!canAdd}
                      onClick={add}
                    >
                      <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                      {remaining === 0
                        ? "In your cart"
                        : `Add to cart${unitTotal !== null ? ` — ${usd(unitTotal * selectedQty)}` : ""}`}
                    </button>
                    {notice && (
                      <p role="status" className="mt-3 text-sm text-[#217938]">
                        {notice}
                      </p>
                    )}
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Link
                        href="/shop/cart"
                        className={`inline-flex min-h-11 items-center justify-center border-2 border-black bg-white px-4 py-3 text-sm font-semibold ${shopFocus}`}
                      >
                        View cart
                      </Link>
                      <a
                        href={shopContactHref}
                        className={`inline-flex min-h-11 items-center justify-center border-2 border-black bg-white px-4 py-3 text-sm font-semibold ${shopFocus}`}
                      >
                        Ask a question
                      </a>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-stone-600">
                      Local pickup. Adding to the cart does not reserve
                      inventory, complete a purchase, or arrange shipping.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {product && pricing && (
          <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 px-6 py-12 lg:px-8 lg:py-16">
            <div className="container">
              <h2 className="text-3xl">Measurements &amp; product details</h2>
              <dl className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                {[
                  [
                    "Length",
                    floorLength(product.lengthIn) !== null
                      ? `${floorLength(product.lengthIn)}″`
                      : "—",
                  ],
                  ["Minimum width", inchText(product.widthMinIn)],
                  ["Maximum width", inchText(product.widthMaxIn)],
                  ["Average width", inchText(productWidth(product))],
                  ["Thickness", inchText(product.thicknessIn)],
                  [
                    "Board feet",
                    pricing.boardFeet !== null
                      ? pricing.boardFeet.toFixed(2)
                      : "—",
                  ],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm text-stone-600">{label}</dt>
                    <dd className="mt-2 text-lg font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-stone-600">
                Customer-facing length is floored to whole inches. Width and
                thickness retain the recorded measurements.
              </p>
              {product.notes && (
                <div className="mt-8 max-w-3xl">
                  <h3 className="text-xl">Product notes</h3>
                  <p className="mt-3 whitespace-pre-line leading-relaxed">
                    {product.notes}
                  </p>
                </div>
              )}
              <a href={shopContactHref} className={`${shopCta} mt-8`}>
                Ask a question
              </a>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
export default ProductDetail;
