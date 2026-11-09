import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductImage } from "@/components/shop/ProductImage";
import { ShoppingBag, RefreshCw, Trash2, ArrowRight, ArrowLeft, Truck, AlertTriangle } from "lucide-react";

export function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    toggleSurfacing,
    clearCart,
    subtotal,
    surfacingTotal,
    total,
    count,
    notices,
    dismissNotice,
    revalidate,
    revalidating,
    lastRevalidated,
    pricingVersion,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1b1612]">
      <SEOHead
        title="Your Cart | Texas Urban Sawmill"
        description="Review your TXUS inventory selections with live prices from our master species board-foot table."
        url="https://txurbansawmill.com/cart"
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1a4d2e] px-6 py-12 lg:px-8 lg:py-16 text-white border-t-2 border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#c9bfae]">TXUS Shop</p>
            <h1 className="mt-1 font-serif text-3xl font-extrabold sm:text-4xl">Your Cart</h1>
            <p className="mt-1 text-xs text-[#e5decf]">
              Prices revalidate against the live master species table on every visit.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 text-white border-white/40 hover:bg-white/20"
            onClick={() => revalidate()}
            disabled={revalidating || items.length === 0}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${revalidating ? "animate-spin" : ""}`} />
            {revalidating ? "Checking prices…" : "Revalidate Prices"}
          </Button>
        </div>
      </section>

      {/* Version strip */}
      <div className="bg-[#f5f1e8] px-6 py-2 text-xs text-[#5a5247] border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
          <span>Pricing version: {pricingVersion ?? "—"}</span>
          <span>
            {lastRevalidated
              ? `Last checked ${lastRevalidated.toLocaleTimeString()}`
              : "Prices verified at checkout"}
          </span>
        </div>
      </div>

      <main className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Price-change notices */}
          {notices.map((n, idx) => (
            <div
              key={idx}
              className="mb-4 flex items-start justify-between gap-3 rounded bg-amber-50 p-4 text-xs text-amber-900 border border-amber-300"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                <span>{n}</span>
              </div>
              <button
                onClick={() => dismissNotice(idx)}
                className="text-xs font-bold text-amber-800 hover:underline"
              >
                Dismiss
              </button>
            </div>
          ))}

          {items.length === 0 ? (
            <div className="rounded bg-white p-12 text-center shadow-sm border border-stone-300">
              <ShoppingBag className="mx-auto h-12 w-12 text-[#217938]" />
              <h2 className="mt-3 font-serif text-xl font-bold">Your cart is empty</h2>
              <p className="mt-1 text-xs text-[#7a7268]">
                Browse the live inventory — every board-foot product is priced from the master
                species table.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 bg-[#217938] px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1a5a2a]"
              >
                Start Shopping <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Item list */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((it) => {
                  const unit = it.selectedPrice ?? 0;
                  const sfee = it.surfacing && it.pricingResult?.surfacingFee
                    ? it.pricingResult.surfacingFee
                    : 0;
                  const lineTotal = (unit + sfee) * (it.quantity ?? 1);
                  return (
                    <article
                      key={it.productId}
                      className="flex flex-col sm:flex-row gap-4 overflow-hidden rounded bg-white p-4 shadow-sm border border-stone-300"
                    >
                      <div className="w-full sm:w-44 shrink-0">
                        <ProductImage
                          alt={it.productId}
                          species={it.species}
                          dimensions={it.dimensions}
                          aspect="card"
                          className="h-32 rounded"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <Badge variant="outline" className="text-[10px]">
                              {it.category}
                            </Badge>
                            <span className="font-mono text-xs text-[#7a7268]">{it.productId}</span>
                          </div>
                          <h3 className="mt-1 font-serif text-lg font-bold">
                            <Link href={`/shop/product/${it.productId}`} className="hover:underline">
                              {it.species}
                            </Link>
                          </h3>
                          <p className="font-mono text-xs text-[#7a7268]">{it.dimensions}</p>
                          {it.boardFeet && (
                            <p className="text-[11px] text-[#7a7268]">
                              {it.boardFeet.toFixed(2)} BF • {it.pricingResult?.formula}
                            </p>
                          )}

                          {it.pricingResult?.surfacingAvailable && it.pricingResult.surfacingFee && (
                            <label className="mt-2 inline-flex items-center gap-2 text-xs text-[#5a5247] cursor-pointer">
                              <Checkbox
                                checked={it.surfacing}
                                onCheckedChange={() => toggleSurfacing(it.productId)}
                              />
                              <span>
                                Surfacing add-on (+${it.pricingResult.surfacingFee} per piece)
                              </span>
                            </label>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-3">
                          <div className="flex items-center rounded border border-stone-300 bg-white">
                            <button
                              className="px-2.5 py-1 text-xs font-bold hover:bg-stone-100"
                              onClick={() => updateQuantity(it.productId, (it.quantity ?? 1) - 1)}
                            >
                              −
                            </button>
                            <span className="px-3 font-mono text-xs">{it.quantity ?? 1}</span>
                            <button
                              className="px-2.5 py-1 text-xs font-bold hover:bg-stone-100"
                              onClick={() => updateQuantity(it.productId, (it.quantity ?? 1) + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-extrabold text-[#217938]">
                              ${lineTotal.toFixed(2)}
                            </p>
                            <p className="text-[11px] text-[#7a7268]">
                              ${unit.toFixed(2)} ea
                              {sfee > 0 ? ` + $${sfee} surfacing` : ""}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(it.productId)}
                            className="text-xs text-red-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" /> remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
                <div className="flex justify-between text-xs">
                  <Link href="/shop" className="text-[#217938] font-semibold hover:underline inline-flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Continue shopping
                  </Link>
                  <button onClick={clearCart} className="text-[#7a7268] hover:underline">
                    Clear cart
                  </button>
                </div>
              </div>

              {/* Summary */}
              <aside className="rounded bg-white p-6 shadow-sm border border-stone-300 space-y-4">
                <h2 className="font-serif text-lg font-bold">Order Summary</h2>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#7a7268]">Items ({count})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7a7268]">Surfacing add-on</span>
                    <span>${surfacingTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7a7268]">Local pickup</span>
                    <span className="text-[#217938] font-bold">$0</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-300 pt-2 text-sm font-bold font-sans">
                    <span>Total</span>
                    <span className="text-2xl font-extrabold text-[#217938] font-mono">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="rounded bg-[#f5f1e8] p-3 text-[11px] text-[#5a5247] flex items-start gap-2">
                  <Truck className="h-4 w-4 shrink-0 text-[#217938] mt-0.5" />
                  <span>
                    Pick up in the Dripping Springs area for $0. Delivery or freight available on
                    request.
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                >
                  Proceed to Inquiry <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="text-[11px] text-center text-[#7a7268]">
                  Submitting an inquiry reserves nothing until confirmed — a TXUS team member will
                  reach out to finalize the hold, schedule pickup, or quote freight.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
export default Cart;
