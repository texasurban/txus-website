import React from "react";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart, roundMoney } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, RefreshCw, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

export function Cart() {
  const { items, removeItem, updateQuantity, toggleSurfacing, clearCart, subtotal, surfacingTotal, total, count,
    notices, dismissNotice, revalidate, revalidating, lastRevalidated, pricingVersion, validationError, canCheckout } = useCart();
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-foreground">
      <SEOHead title="Your Cart | Texas Urban Sawmill" description="Review your rescued Texas wood selections and current pricing before sending an inquiry. No payment or reservation is made." url="https://txurbansawmill.com/cart" noindex />
      <Navigation />
      <main>
        <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 section-shell">
          <div className="container max-w-6xl">
            <nav aria-label="Shop navigation" className="mb-6 flex flex-wrap gap-5 text-sm font-semibold text-[#217938]">
              <Link href="/shop">Shop inventory</Link><Link href="/cart" aria-current="page">Cart ({count})</Link>
            </nav>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div><p className="eyebrow">TXUS Shop</p><h1 className="section-title">Your Cart</h1>
                <p className="section-copy mt-5 max-w-2xl">Review your selections before submitting an inquiry. We check current prices and availability while this tab is open and again before submission.</p></div>
              <Button variant="outline" onClick={() => void revalidate()} disabled={revalidating || !items.length}>
                <RefreshCw aria-hidden="true" className={`mr-2 h-4 w-4 ${revalidating ? "animate-spin" : ""}`} />
                {revalidating ? "Checking prices…" : "Check current prices"}
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Pricing version: {pricingVersion ?? "Not yet checked"} · {lastRevalidated ? `Last checked ${lastRevalidated.toLocaleTimeString()}` : "A current price check is required."}</p>
          </div>
        </section>
        <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 section-shell">
          <div className="container max-w-6xl">
            <div aria-live="polite" aria-atomic="true" className="space-y-3 mb-6">
              {notices.map((notice, index) => <div key={`${index}-${notice}`} className="flex justify-between gap-4 border border-amber-400 bg-amber-50 p-4 text-sm text-amber-950">
                <p>{notice}</p><button type="button" onClick={() => dismissNotice(index)} aria-label={`Dismiss notice ${index + 1}`} className="shrink-0 font-semibold underline">Dismiss</button>
              </div>)}
              {validationError && <p role="alert" className="border border-red-300 bg-red-50 p-4 text-red-900">{validationError} Your selections are preserved; checkout is paused until a successful check.</p>}
              {!canCheckout && items.length > 0 && !validationError && <p className="text-sm">{revalidating ? "Checking current inventory and prices…" : "Check current prices before proceeding to inquiry."}</p>}
            </div>
            {!items.length ? <div className="border border-stone-400 bg-white p-10 text-center">
              <ShoppingBag aria-hidden="true" className="mx-auto h-12 w-12 text-[#217938]" /><h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
              <p className="mt-3">Explore the available rescued Texas wood inventory.</p>
              <Link href="/shop" className="mt-6 inline-flex items-center gap-2 bg-[#217938] px-8 py-3 font-semibold text-white">Browse the shop <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div> : <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-5 lg:col-span-2">
                {items.map(item => {
                  const fee = item.surfacing ? item.pricingResult?.surfacingFee ?? 0 : 0;
                  const lineTotal = roundMoney(((item.selectedPrice ?? 0) + fee) * item.quantity);
                  return <article key={item.productId} className="flex flex-col gap-5 border border-stone-400 bg-white p-5 sm:flex-row">
                    {item.image && <img src={item.image} alt={`${item.species} — ${item.productId}`} loading="lazy" className="h-40 w-full border-2 border-black object-contain sm:w-40" />}
                    <div className="flex flex-1 flex-col">
                      <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground"><span>{item.category}</span><span>{item.productId}</span></div>
                      <h2 className="mt-2 text-xl font-bold"><Link href={`/shop/product/${encodeURIComponent(item.productId)}`} className="hover:underline">{item.species}</Link></h2>
                      <p className="mt-1 text-sm">{item.dimensions}</p>
                      {item.boardFeet != null && <p className="mt-1 text-sm text-muted-foreground">{item.boardFeet.toFixed(2)} BF</p>}
                      {item.pricingResult?.formula && <p className="mt-1 text-sm text-muted-foreground">{item.pricingResult.formula}</p>}
                      {item.pricingResult?.surfacingAvailable && item.pricingResult.surfacingFee != null && <label className="mt-4 flex items-center gap-3 text-sm">
                        <input type="checkbox" checked={item.surfacing} onChange={() => toggleSurfacing(item.productId)} disabled={revalidating} className="h-4 w-4 accent-[#217938]" />
                        Surfacing (+${item.pricingResult.surfacingFee.toFixed(2)} per piece)
                      </label>}
                      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-stone-300 pt-4">
                        <div><label htmlFor={`quantity-${item.productId}`} className="block text-sm font-semibold">Quantity</label>
                          <input id={`quantity-${item.productId}`} type="number" min={1} max={item.maxQuantity ?? 1} step={1} value={item.quantity} disabled={revalidating || (item.maxQuantity ?? 1) <= 1}
                            onChange={event => updateQuantity(item.productId, event.currentTarget.valueAsNumber)} className="mt-1 w-20 border border-stone-400 bg-white p-2 disabled:bg-stone-100" />
                          {(item.maxQuantity ?? 1) === 1 && <span className="ml-2 text-xs text-muted-foreground">Unique piece</span>}
                        </div>
                        <div className="text-right"><p className="text-xl font-bold text-[#217938]">{item.selectedPrice === null ? "Price upon review" : `$${lineTotal.toFixed(2)}`}</p>
                          <p className="text-xs text-muted-foreground">{item.selectedPrice === null ? "Not included in estimated total" : `$${item.selectedPrice.toFixed(2)} per piece${fee ? ` + $${fee.toFixed(2)} surfacing` : ""}`}</p></div>
                        <button type="button" onClick={() => removeItem(item.productId)} aria-label={`Remove ${item.productId} from cart`} className="inline-flex items-center gap-1 text-sm font-semibold text-red-800 underline"><Trash2 aria-hidden="true" className="h-4 w-4" />Remove</button>
                      </div>
                    </div>
                  </article>;
                })}
                <div className="flex justify-between gap-4 text-sm"><Link href="/shop" className="inline-flex items-center gap-2 font-semibold text-[#217938]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Continue shopping</Link><button type="button" onClick={clearCart} className="underline">Clear cart</button></div>
              </div>
              <aside className="self-start border border-stone-400 bg-white p-6 space-y-5">
                <h2 className="text-2xl font-bold">Inquiry summary</h2>
                <dl className="space-y-3 text-sm"><div className="flex justify-between"><dt>Items ({count})</dt><dd>${subtotal.toFixed(2)}</dd></div>
                  <div className="flex justify-between"><dt>Surfacing</dt><dd>${surfacingTotal.toFixed(2)}</dd></div>
                  <div className="flex justify-between"><dt>Local pickup</dt><dd>$0.00</dd></div>
                  <div className="flex justify-between border-t border-stone-300 pt-4 text-lg font-bold"><dt>Estimated total</dt><dd className="text-[#217938]">${total.toFixed(2)}</dd></div></dl>
                {items.some(i => i.selectedPrice === null) && <p className="text-sm">Some prices require review and are not included in this estimate.</p>}
                <p className="bg-[#f5f1e8] p-4 text-sm">Local pickup in Dripping Springs, Texas is $0. No freight or delivery checkout is offered here.</p>
                {canCheckout ? <Link href="/checkout" className="inline-flex w-full items-center justify-center gap-2 bg-[#217938] px-5 py-3 font-semibold text-white hover:bg-[#1a5a2a]">Proceed to inquiry <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                  : <Button disabled className="w-full bg-[#217938] text-white">Proceed to inquiry</Button>}
                <p className="text-sm text-muted-foreground">No payment is taken. An inquiry does not reserve inventory; availability and any reservation must be confirmed by TXUS.</p>
              </aside>
            </div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default Cart;
