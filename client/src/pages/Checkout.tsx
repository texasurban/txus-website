import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Truck, ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";

export function Checkout() {
  const { items, subtotal, surfacingTotal, total, count, revalidate, clearCart, pricingVersion } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ code: string; version: string } | null>(null);

  const inquiryMut = trpc.pricing.inquiry.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please provide your name and email.");
      return;
    }
    setError("");
    const reval = await revalidate();
    if (reval?.changed) {
      setError("One or more prices just updated against the live pricing table. Review the revised total below and submit again.");
      return;
    }
    try {
      const r = await inquiryMut.mutateAsync({
        customerName: name,
        customerEmail: email,
        customerPhone: phone || undefined,
        notes: notes || undefined,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity ?? 1,
          selectedPrice: i.selectedPrice,
          surfacing: i.surfacing,
        })),
        totalAmount: total.toFixed(2),
      });
      setResult({ code: r.inquiryCode, version: r.pricingVersion });
      clearCart();
    } catch (err: any) {
      setError(err?.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1b1612]">
      <SEOHead
        title="Checkout / Reserve | Texas Urban Sawmill"
        description="Submit your TXUS inventory inquiry with live prices recorded from our master species table."
        url="https://txurbansawmill.com/checkout"
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1a4d2e] px-6 py-12 lg:px-8 lg:py-16 text-white border-t-2 border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c9bfae]">Final Step</p>
          <h1 className="mt-1 font-serif text-3xl font-extrabold sm:text-4xl">
            Reserve Your Pieces
          </h1>
          <p className="mt-1 text-xs text-[#e5decf]">
            Prices are recorded at submission with a pricing-version snapshot for full auditability.
          </p>
        </div>
      </section>

      <main className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          {result ? (
            <div className="rounded bg-white p-10 text-center shadow-sm border border-stone-300">
              <CheckCircle2 className="mx-auto h-16 w-16 text-[#217938]" />
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#7a7268]">
                Inquiry received
              </p>
              <h2 className="mt-1 font-serif text-3xl font-extrabold">Thank You</h2>
              <p className="mt-3 text-sm text-[#5a5247]">
                Your inquiry reference is{" "}
                <strong className="font-mono text-base text-[#217938]">{result.code}</strong>.
                Pricing snapshot version:{" "}
                <span className="font-mono text-xs">{result.version}</span>.
              </p>
              <p className="mx-auto mt-4 max-w-lg text-xs text-[#7a7268]">
                A TXUS team member will confirm piece availability, hold reservations, schedule
                pickup at our Dripping Springs yard (local pickup is free), or quote freight and
                white-glove delivery if requested.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Link
                  href="/shop"
                  className="bg-[#217938] px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1a5a2a]"
                >
                  Keep Shopping
                </Link>
                <Link
                  href="/"
                  className="border border-stone-400 px-8 py-3 text-xs uppercase tracking-wider hover:bg-stone-100"
                >
                  Home
                </Link>
              </div>
            </div>
          ) : count === 0 ? (
            <div className="rounded bg-white p-12 text-center shadow-sm border border-stone-300">
              <p className="text-sm text-[#7a7268]">Your cart is empty.</p>
              <Link href="/shop" className="mt-4 inline-block text-xs text-[#217938] font-bold underline">
                Browse the shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4 rounded bg-white p-6 shadow-sm border border-stone-300">
                <h2 className="font-serif text-lg font-bold">Your Information</h2>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Name *</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Email *</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Phone</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Project notes / questions</label>
                  <Textarea
                    placeholder="Tell us about your project, timeline, or request delivery…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="rounded bg-[#f5f1e8] p-3 text-xs text-[#5a5247] flex items-center gap-2">
                  <Truck className="h-4 w-4 shrink-0 text-[#217938]" />
                  <span>
                    <strong>Fulfillment:</strong> Local pickup — Dripping Springs yard • $0. Freight
                    quoted on request.
                  </span>
                </div>

                <div className="rounded bg-[#f5f1e8] p-3 text-[11px] text-[#5a5247] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#217938]" />
                  <span>
                    No payment taken here. We review inventory, confirm your hold, and arrange
                    payment at pickup or via invoice.
                  </span>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded bg-amber-50 p-3 text-xs text-amber-900 border border-amber-300">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={inquiryMut.isPending}
                  className="w-full bg-[#217938] hover:bg-[#1a5a2a] text-white uppercase text-xs tracking-[0.18em] px-8 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                >
                  {inquiryMut.isPending ? "Recording inquiry…" : `Submit Inquiry — $${total.toFixed(2)}`}
                </Button>
                <div className="text-center">
                  <Link href="/cart" className="text-xs text-[#217938] hover:underline inline-flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Back to cart
                  </Link>
                </div>
              </form>

              {/* Summary */}
              <aside className="rounded bg-white p-6 shadow-sm border border-stone-300 space-y-3 font-mono text-xs">
                <h2 className="font-serif text-lg font-bold font-sans">Summary</h2>
                <div className="divide-y divide-stone-200">
                  {items.map((it) => (
                    <div key={it.productId} className="py-2 flex justify-between">
                      <div>
                        <p className="font-bold">{it.productId}</p>
                        <p className="text-[11px] text-[#7a7268]">
                          {it.species} × {it.quantity ?? 1}
                          {it.surfacing ? " + surfacing" : ""}
                        </p>
                      </div>
                      <p className="font-bold text-[#217938]">
                        $
                        {(
                          ((it.selectedPrice ?? 0) +
                            (it.surfacing && it.pricingResult?.surfacingFee
                              ? it.pricingResult.surfacingFee
                              : 0)) *
                          (it.quantity ?? 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-300 pt-3 space-y-1">
                  <div className="flex justify-between text-[#7a7268]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#7a7268]">
                    <span>Surfacing add-on</span>
                    <span>${surfacingTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#7a7268]">
                    <span>Local pickup</span>
                    <span className="text-[#217938] font-bold">$0</span>
                  </div>
                  <div className="flex justify-between text-base font-bold font-sans border-t border-stone-300 pt-2">
                    <span>Total</span>
                    <span className="text-2xl font-extrabold text-[#217938] font-mono">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-[#7a7268] pt-2">
                  Pricing version: {pricingVersion ?? "—"}
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
export default Checkout;
