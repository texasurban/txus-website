import { useState } from "react";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductImage } from "@/components/shop/ProductImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/lib/cart";
import { floorLength } from "@shared/pricing";
import { ShoppingBag, ArrowLeft, ArrowRight, Check, Droplets, MapPin, Tag } from "lucide-react";

export function ProductDetail() {
  const [, params] = useRoute("/shop/product/:id");
  const id = params?.id ? decodeURIComponent(params.id) : "";

  const { data, refetch, isFetching } = trpc.pricing.product.useQuery(
    { id },
    { refetchInterval: 25_000, enabled: !!id },
  );
  const { data: snapshot } = trpc.pricing.snapshot.useQuery();
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [surf, setSurf] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const product = data?.product;
  const pricing = data?.pricing;

  const images = (product?.primaryImage ? product.primaryImage.split("|") : [])
    .map((s) => s.trim())
    .filter(Boolean);

  const dim = [
    product?.lengthIn ? `${product.lengthIn}″ L` : null,
    product?.averageWidthIn ? `${product.averageWidthIn}″ avg W` : null,
    product?.thicknessIn ? `${product.thicknessIn}″ T` : null,
  ]
    .filter(Boolean)
    .join(" × ");

  const floored = floorLength(product?.lengthIn);
  const surfacingFee = pricing?.surfacingFee ?? null;
  const unitPrice = pricing?.price;
  const itemTotal = unitPrice !== null && unitPrice !== undefined
    ? (unitPrice + (surf && surfacingFee ? surfacingFee : 0)) * qty
    : null;

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1b1612]">
      <SEOHead
        title={product ? `${product.id} — ${product.species} ${product.category} | Texas Urban Sawmill` : "Product | Texas Urban Sawmill"}
        description={
          product
            ? `${product.species} ${product.category.toLowerCase()}, ${dim}. Milled and kiln-dried from salvaged Texas trees. Priced live from our master species table.`
            : "Kiln-dried Texas hardwood inventory at Texas Urban Sawmill."
        }
        url={`https://txurbansawmill.com/shop/product/${encodeURIComponent(id)}`}
      />
      <Navigation />

      {/* Breadcrumb strip */}
      <div className="bg-[#f5f1e8] px-6 py-3 text-xs text-[#5a5247] border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-[#217938] font-semibold hover:underline"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Shop
          </Link>
          <span className="font-mono text-[11px]">Pricing version: {pricing?.pricingVersion ?? "—"}</span>
        </div>
      </div>

      <main className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {!product ? (
            <div className="py-20 text-center text-sm text-[#7a7268]">
              {isFetching ? "Loading product…" : "Product not found."}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Media column */}
              <div>
                <ProductImage
                  src={images[selectedImg] ? `/manus-storage/${images[selectedImg]}` : null}
                  alt={product.id}
                  species={product.species}
                  dimensions={dim || undefined}
                  aspect="detail"
                  onClick={() => setLightboxOpen(true)}
                  className="rounded shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-stone-300"
                />
                {images.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {images.map((im, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImg(idx)}
                        className={`overflow-hidden rounded border-2 ${
                          selectedImg === idx ? "border-[#217938]" : "border-stone-300"
                        }`}
                      >
                        <ProductImage
                          src={`/manus-storage/${im}`}
                          alt={`${product.id} image ${idx + 1}`}
                          aspect="card"
                          className="h-20"
                        />
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-[11px] text-[#7a7268]">
                  Click the main photo for full size. Images shown only when verified against the master record.
                </p>
              </div>

              {/* Info column */}
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#217938] text-white">{product.category}</Badge>
                  <span className="font-mono text-xs text-[#7a7268]">ID: {product.id}</span>
                </div>
                <h1 className="mt-2 font-serif text-3xl font-extrabold sm:text-4xl">
                  {product.species}
                </h1>
                {dim && <p className="mt-1 font-mono text-sm text-[#7a7268]">{dim}</p>}

                {/* Live price block */}
                <div className="mt-6 rounded bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-stone-300">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-[#7a7268]">Live Price</p>
                      <p className="text-4xl font-extrabold text-[#217938]">
                        {unitPrice !== null && unitPrice !== undefined
                          ? `$${unitPrice.toFixed(2)}`
                          : pricing?.method === "inquire"
                          ? "Inquire"
                          : "Price pending"}
                      </p>
                    </div>
                    {pricing?.boardFootRateUsed && (
                      <div className="text-right text-xs text-[#7a7268]">
                        <p className="font-mono font-bold">${pricing.boardFootRateUsed.toFixed(2)}/BF</p>
                        <p className="capitalize">source: {pricing?.rateSource}</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-xs text-[#5a5247] font-mono">{pricing?.formula}</p>
                </div>

                {/* Surfacing add-on */}
                {pricing?.surfacingAvailable && surfacingFee && (
                  <label className="mt-4 flex items-center justify-between rounded bg-[#f5f1e8] p-4 text-xs border border-stone-300 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Checkbox checked={surf} onCheckedChange={(v) => setSurf(!!v)} />
                      <span>
                        <strong>Add surfacing/planing</strong> (flatten + thickness)
                      </span>
                    </span>
                    <span className="font-mono font-bold">+${surfacingFee}</span>
                  </label>
                )}

                {/* Quantity + Add to Cart */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded border border-stone-400 bg-white">
                    <button
                      className="px-3 py-2 text-sm font-bold text-[#5a5247] hover:bg-stone-100"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="px-4 font-mono text-sm">{qty}</span>
                    <button
                      className="px-3 py-2 text-sm font-bold text-[#5a5247] hover:bg-stone-100"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                  {unitPrice !== null && unitPrice !== undefined ? (
                    <Button
                      className="flex-1 bg-[#217938] hover:bg-[#1a5a2a] text-white uppercase text-xs tracking-[0.18em] px-8 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                      onClick={() => {
                        addItem(
                          {
                            productId: product.id,
                            category: product.category,
                            species: product.species,
                            dimensions: dim || "—",
                            boardFeet: pricing?.boardFeet,
                            selectedPrice: unitPrice,
                            pricingResult: pricing,
                            surfacing: surf,
                          },
                          qty,
                        );
                      }}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart — ${itemTotal?.toFixed(2)}
                    </Button>
                  ) : (
                    <a
                      href={`/contact?subject=Price+inquiry:+${encodeURIComponent(product.id)}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#217938] hover:bg-[#1a5a2a] text-white uppercase text-xs tracking-[0.18em] px-8 py-3 font-semibold"
                    >
                      Inquire About This Piece <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href="/cart"
                    className="flex-1 text-center border border-stone-400 bg-white py-2 text-xs uppercase tracking-wider hover:bg-stone-100"
                  >
                    View Cart
                  </Link>
                  <a
                    href="/contact"
                    className="flex-1 text-center border border-stone-400 bg-white py-2 text-xs uppercase tracking-wider hover:bg-stone-100"
                  >
                    Ask a Question
                  </a>
                </div>

                {/* Dimensions table */}
                <div className="mt-8 rounded bg-white p-6 shadow-sm border border-stone-300">
                  <h2 className="font-serif text-lg font-bold">Dimensions &amp; Measurements</h2>
                  <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-3">
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Length</dt>
                      <dd className="font-bold">{product.lengthIn ? `${product.lengthIn}″` : "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Min Width</dt>
                      <dd className="font-bold">{product.widthMinIn ? `${product.widthMinIn}″` : "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Max Width</dt>
                      <dd className="font-bold">{product.widthMaxIn ? `${product.widthMaxIn}″` : "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Average Width</dt>
                      <dd className="font-bold">{product.averageWidthIn ? `${product.averageWidthIn}″` : "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Thickness</dt>
                      <dd className="font-bold">{product.thicknessIn ? `${product.thicknessIn}″` : "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Board Feet</dt>
                      <dd className="font-bold">{pricing?.boardFeet ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Customer Length (floored)</dt>
                      <dd className="font-bold">{floored !== null ? `${floored}″` : "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Location</dt>
                      <dd className="font-bold">{product.location || "Dripping Springs yard"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#7a7268] uppercase">Status</dt>
                      <dd className="font-bold">{product.status}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-[11px] text-[#7a7268]">
                    Board feet is an optional reference figure. Customer-facing length filters use the floored whole-inch value per TXUS catalog rules.
                  </p>
                </div>

                {product.notes && (
                  <div className="mt-4 rounded bg-white p-4 text-xs text-[#5a5247] shadow-sm border border-stone-300">
                    <strong>Notes:</strong> {product.notes}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox — opens only when clicked */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <ProductImage
              src={images[selectedImg] ? `/manus-storage/${images[selectedImg]}` : null}
              alt={product?.id || ""}
              aspect="detail"
              className="h-[75vh] w-auto max-w-full rounded object-contain"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 rounded bg-black/70 px-3 py-1 text-sm font-bold text-white hover:bg-black"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
export default ProductDetail;
