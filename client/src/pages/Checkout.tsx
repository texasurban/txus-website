import React, { useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart, cartFingerprint, cartTotals, roundMoney, type CartItem, type ValidatedCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export interface InquiryPayload {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  items: { productId: string; quantity: number; selectedPrice: number | null; surfacing: boolean }[];
  pricingVersion: string;
  idempotencyKey: string;
}
export interface InquiryReceipt {
  inquiryCode: string;
  pricingVersion: string;
  totalAmount: string | number | null;
  notificationSent: boolean;
}

export function newInquiryKey(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Kept separate for tests: no client total is ever accepted as payment or pricing authority. */
export async function submitValidatedInquiry(options: {
  customer: Omit<InquiryPayload, "items" | "pricingVersion" | "idempotencyKey">;
  revalidate: () => Promise<ValidatedCart | null>;
  getItems: () => CartItem[];
  keyFor: (fingerprint: string) => string;
  mutate: (payload: InquiryPayload) => Promise<InquiryReceipt>;
}): Promise<{ kind: "review" } | { kind: "success"; receipt: InquiryReceipt; items: CartItem[] }> {
  const validation = await options.revalidate();
  if (!validation) throw new Error("Current prices could not be verified. Check prices successfully before submitting your inquiry.");
  const accepted = validation.validatedItems ?? options.getItems();
  if (!accepted.length) throw new Error("No available items remain in your cart. Please return to the shop.");
  if (validation.changed || (validation.removedProductIds?.length ?? 0) > 0) return { kind: "review" };
  if (cartFingerprint(accepted) !== cartFingerprint(options.getItems())) throw new Error("Your cart changed during the price check. Please review it and try again.");
  const payload = {
    ...options.customer,
    items: accepted.map(i => ({ productId: i.productId, quantity: i.quantity, selectedPrice: i.selectedPrice, surfacing: i.surfacing })),
    pricingVersion: validation.pricingVersion,
    idempotencyKey: options.keyFor(JSON.stringify([options.customer, cartFingerprint(accepted), validation.pricingVersion])),
  };
  const receipt = await options.mutate(payload);
  if (!receipt || typeof receipt.inquiryCode !== "string" || !receipt.inquiryCode.trim() || typeof receipt.pricingVersion !== "string" || !receipt.pricingVersion) {
    throw new Error("An inquiry reference was not returned. Your cart is preserved; please contact TXUS before retrying.");
  }
  return { kind: "success", receipt, items: accepted.map(i => ({ ...i })) };
}

export function Checkout() {
  const cart = useCart();
  const { items, subtotal, surfacingTotal, total, count, revalidate, clearCart, pricingVersion, canCheckout, revalidating, validationError, notices, getItems } = cart;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ receipt: InquiryReceipt; items: CartItem[] } | null>(null);
  const running = useRef(false);
  const attempt = useRef<{ signature: string; key: string } | null>(null);
  const inquiry = trpc.pricing.inquiry.useMutation();

  const keyFor = (signature: string) => {
    if (!attempt.current || attempt.current.signature !== signature) attempt.current = { signature, key: newInquiryKey() };
    return attempt.current.key;
  };
  const checkAgain = async () => {
    if (running.current) return;
    setError("");
    const checked = await revalidate();
    if (checked?.changed) setReview("Your selections or pricing have changed. Review the updated summary before submitting.");
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (running.current || inquiry.isPending || revalidating || !items.length || !canCheckout || error || validationError) return;
    if (!name.trim() || !email.trim()) { setError("Please provide your name and email."); return; }
    running.current = true;
    setPending(true);
    setError("");
    setReview("");
    try {
      const outcome = await submitValidatedInquiry({
        customer: { customerName: name.trim(), customerEmail: email.trim(), customerPhone: phone.trim() || undefined, notes: notes.trim() || undefined },
        revalidate, getItems, keyFor,
        mutate: payload => inquiry.mutateAsync(payload) as Promise<InquiryReceipt>,
      });
      if (outcome.kind === "review") {
        setReview("Prices, add-ons, or availability just changed. Review the updated summary, then submit again to confirm your inquiry.");
        return;
      }
      setResult({ receipt: outcome.receipt, items: outcome.items });
      // Only a persisted server inquiry with its real reference can clear the cart.
      clearCart();
    } catch (failure) {
      const code = (failure as { data?: { code?: string } })?.data?.code;
      if (code === "CONFLICT") {
        await revalidate();
        setReview("Pricing or availability changed before the inquiry was recorded. Review your updated cart and submit again. No payment or reservation has been made.");
      } else setError(failure instanceof Error ? failure.message : "The inquiry could not be recorded. Your cart is preserved. Check prices, then try again.");
    } finally { running.current = false; setPending(false); }
  };
  const busy = pending || inquiry.isPending || revalidating;
  const confirmedTotal = result?.receipt.totalAmount == null ? null : Number(result.receipt.totalAmount);

  return <div className="min-h-screen bg-[#f0f0f0] text-foreground">
    <SEOHead title="Inventory Inquiry | Texas Urban Sawmill" description="Send an inventory inquiry to Texas Urban Sawmill. Local pickup in Dripping Springs; no payment or reservation is made." url="https://txurbansawmill.com/checkout" noindex />
    <Navigation />
    <main>
      <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 section-shell"><div className="container max-w-6xl">
        <nav aria-label="Shop navigation" className="mb-6 flex flex-wrap gap-5 text-sm font-semibold text-[#217938]"><Link href="/shop">Shop inventory</Link><Link href="/cart">Cart ({count})</Link><Link href="/checkout" aria-current="page">Inquiry</Link></nav>
        <p className="eyebrow">TXUS Shop</p><h1 className="section-title">{result ? "Inquiry received" : "Send an inventory inquiry"}</h1>
        <p className="section-copy mt-5 max-w-3xl">No payment is taken here. Availability and any reservation must be confirmed by Texas Urban Sawmill.</p>
      </div></section>
      <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 section-shell"><div className="container max-w-6xl">
        {result ? <div className="mx-auto max-w-3xl border border-stone-400 bg-white p-8 sm:p-10">
          <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-[#217938]" />
          <h2 className="mt-4 text-3xl font-bold">Inquiry received</h2>
          <p className="mt-5">Your inquiry reference is <strong className="text-[#217938]">{result.receipt.inquiryCode}</strong>.</p>
          <p className="mt-4">We will review availability and contact you. No payment or reservation has been made.</p>
          <p className="mt-3 text-sm text-muted-foreground">Pricing version: {result.receipt.pricingVersion}</p>
          <h3 className="mt-7 text-xl font-bold">Submitted selections</h3>
          <ul className="mt-3 divide-y divide-stone-200">{result.items.map(item => <li key={item.productId} className="py-3">{item.species} · {item.productId} × {item.quantity}{item.surfacing ? " · surfacing requested" : ""}</li>)}</ul>
          {confirmedTotal !== null && Number.isFinite(confirmedTotal) && <p className="mt-4 font-semibold">Recorded estimate: ${confirmedTotal.toFixed(2)}</p>}
          {result.items.some(i => i.selectedPrice === null) && <p className="mt-2 text-sm">Some prices still require TXUS review and are not included in the recorded estimate.</p>}
          <p className="mt-4 text-sm">Local pickup in Dripping Springs, Texas: $0.00.</p>
          <Link href="/shop" className="mt-7 inline-block bg-[#217938] px-8 py-3 font-semibold text-white">Continue shopping</Link>
        </div> : !items.length ? <div className="border border-stone-400 bg-white p-10 text-center"><h2 className="text-2xl font-bold">Your cart is empty</h2><Link href="/shop" className="mt-5 inline-block font-semibold text-[#217938] underline">Browse the shop</Link></div> : <>
          <div aria-live="polite" aria-atomic="true" className="mb-6 space-y-3">
            {notices.map((notice, index) => <p key={`${index}-${notice}`} className="border border-amber-300 bg-amber-50 p-4 text-amber-950">{notice}</p>)}
            {review && <p role="status" className="border border-amber-400 bg-amber-50 p-4 font-semibold text-amber-950">{review}</p>}
            {(error || validationError) && <p role="alert" className="border border-red-300 bg-red-50 p-4 text-red-900">{error || validationError}</p>}
            {(!canCheckout || error || validationError) && <div className="flex flex-wrap items-center gap-4"><p className="text-sm">A successful current price check is required before submission.</p><Button type="button" variant="outline" onClick={() => void checkAgain()} disabled={busy}>Check prices / retry</Button></div>}
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <form onSubmit={handleSubmit} className="space-y-5 border border-stone-400 bg-white p-6 lg:col-span-2">
              <h2 className="text-2xl font-bold">Your information</h2>
              <fieldset disabled={pending || inquiry.isPending} className="space-y-5">
                <div><label htmlFor="inquiry-name" className="text-sm font-semibold">Name *</label><Input id="inquiry-name" autoComplete="name" maxLength={200} value={name} onChange={event => setName(event.target.value)} required className="mt-2" /></div>
                <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="inquiry-email" className="text-sm font-semibold">Email *</label><Input id="inquiry-email" type="email" autoComplete="email" maxLength={320} value={email} onChange={event => setEmail(event.target.value)} required className="mt-2" /></div>
                  <div><label htmlFor="inquiry-phone" className="text-sm font-semibold">Phone</label><Input id="inquiry-phone" type="tel" autoComplete="tel" maxLength={32} value={phone} onChange={event => setPhone(event.target.value)} className="mt-2" /></div></div>
                <div><label htmlFor="inquiry-notes" className="text-sm font-semibold">Project notes / questions</label><Textarea id="inquiry-notes" maxLength={5000} placeholder="Tell us about your project and timeline." value={notes} onChange={event => setNotes(event.target.value)} className="mt-2" /></div>
              </fieldset>
              <p className="bg-[#f5f1e8] p-4 text-sm"><strong>Fulfillment:</strong> Local pickup in Dripping Springs, Texas — $0.00. No freight or delivery checkout is offered here.</p>
              <p className="text-sm">This is an inquiry, not an order or a reservation. No payment is taken and no inventory is held unless TXUS confirms it.</p>
              <Button type="submit" disabled={busy || !canCheckout || !!error || !!validationError || !items.length} className="w-full bg-[#217938] py-6 font-semibold text-white hover:bg-[#1a5a2a]">{pending || inquiry.isPending ? "Recording inquiry…" : revalidating ? "Checking current prices…" : `${review ? "Submit reviewed inquiry" : "Submit inquiry"} — $${total.toFixed(2)} estimate`}</Button>
              <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-[#217938]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back to cart</Link>
            </form>
            <aside className="self-start space-y-4 border border-stone-400 bg-white p-6">
              <h2 className="text-2xl font-bold">Inquiry summary</h2>
              <ul className="divide-y divide-stone-200">{items.map(item => <li key={item.productId} className="flex justify-between gap-4 py-3 text-sm"><div><p className="font-semibold">{item.species} · {item.productId}</p><p>{item.dimensions}</p><p>Quantity {item.quantity}{item.surfacing ? " + surfacing" : ""}</p></div><p className="shrink-0 font-semibold text-[#217938]">{item.selectedPrice === null ? "Upon review" : `$${roundMoney((item.selectedPrice + (item.surfacing ? item.pricingResult?.surfacingFee ?? 0 : 0)) * item.quantity).toFixed(2)}`}</p></li>)}</ul>
              <dl className="space-y-3 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div><div className="flex justify-between"><dt>Surfacing</dt><dd>${surfacingTotal.toFixed(2)}</dd></div><div className="flex justify-between"><dt>Local pickup</dt><dd>$0.00</dd></div><div className="flex justify-between border-t border-stone-300 pt-4 text-lg font-bold"><dt>Estimated total</dt><dd className="text-[#217938]">${total.toFixed(2)}</dd></div></dl>
              {items.some(i => i.selectedPrice === null) && <p className="text-sm">Prices upon review are not included in this estimate.</p>}
              <p className="text-xs text-muted-foreground">Pricing version: {pricingVersion ?? "Not yet checked"}. The server records the current pricing snapshot.</p>
            </aside>
          </div>
        </>}
      </div></section>
    </main>
    <Footer />
  </div>;
}
export default Checkout;
