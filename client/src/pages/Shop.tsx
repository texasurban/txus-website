import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trees, Sparkles, Sofa, Shield, Truck, Droplets } from "lucide-react";

const categories = [
  {
    title: "Lumber & Slabs",
    slug: "lumber-slabs",
    countHint: "Live-edge slabs, mantels, cookies & rounds, beams, dimensional lumber",
    desc: "Kiln-dried Texas hardwoods milled on our industrial saws. Browse the live inventory below — slabs, mantels, cookies and rounds all priced from the master species board-foot table.",
    cta: "Browse Lumber & Slabs",
    icon: Trees,
    bgTone: "#6b5d44",
  },
  {
    title: "Furniture",
    slug: "furniture",
    countHint: "Dining tables, conference tables, benches, desks, shelving",
    desc: "Heirloom furniture built from salvaged Texas trees. Each piece is designed, milled and finished in-house — no outsourced fabrication. Made-to-order commissions welcome.",
    cta: "Explore Furniture",
    icon: Sofa,
    bgTone: "#4a3c2e",
  },
  {
    title: "Home Decor",
    slug: "home-decor",
    countHint: "Cutting boards, charcuterie, planters, candle holders, wall art",
    desc: "Smaller everyday pieces crafted from workshop offcuts: end-grain cutting boards, charcuterie boards, planters, and tea-light holders. Perfect gifts from real Texas trees.",
    cta: "View Home Decor",
    icon: Sparkles,
    bgTone: "#7a5c37",
  },
];

export function Shop() {
  const { data: snapshot } = trpc.pricing.snapshot.useQuery();
  const { data: speciesList = [] } = trpc.pricing.speciesList.useQuery();

  const def = (snapshot?.defaultRate ?? 12).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1b1612]">
      <SEOHead
        title="Shop Texas Hardwood Lumber, Slabs & Furniture | Texas Urban Sawmill"
        description="Shop live inventory of kiln-dried slabs, mantels, cookies, and Texas hardwood lumber — all priced from our master species board-foot table. Furniture and home decor also available."
        url="https://txurbansawmill.com/shop"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1a4d2e] px-6 py-16 sm:py-24 lg:px-8 text-white border-t-2 border-b-2 border-stone-400">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c9bfae]">
            Shop TXUS Inventory
          </p>
          <h1 className="mt-2 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl">
            Live Texas Hardwood Inventory
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#e5decf]">
            Every slab, mantel and cookie in our shop is priced from a centralized master
            board-foot table — current working default <strong>${def}/BF</strong> — so
            the prices you see are always current.
          </p>
        </div>
      </section>

      {/* Section 1: Shop by Category (equal-height cards with anchored green CTAs) */}
      <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="mt-2 text-sm text-[#7a7268]">
              Choose a category to explore live inventory or made-to-order pieces.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.slug}
                  className="flex h-full flex-col overflow-hidden rounded bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-stone-300"
                >
                  <div
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${c.bgTone} 0%, #2b231a 100%)`,
                    }}
                    className="relative flex h-52 items-center justify-center text-white"
                  >
                    <Icon className="h-20 w-20 opacity-25" />
                    <span className="absolute bottom-3 right-4 font-mono text-xs uppercase tracking-widest text-[#f5f1e8] opacity-80">
                      TXUS Collection
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#217938]">
                      {c.countHint}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold">{c.title}</h3>
                    <p className="mt-3 flex-1 text-xs text-[#5a5247] leading-relaxed">
                      {c.desc}
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/shop/${c.slug}`}
                        className="inline-flex w-full items-center justify-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                      >
                        {c.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Live species rate preview (alternating #f5f1e8) */}
      <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#217938]">
                Master Board-Foot Table
              </p>
              <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
                Current Species Rates
              </h2>
              <p className="mt-2 text-sm text-[#7a7268] max-w-xl">
                Every board-foot product is priced as <em>Board Feet × $/BF</em>. Rates are
                maintained in our central database pricing table and update near-real-time.
              </p>
            </div>
            <div className="text-xs text-[#7a7268]">
              <span className="font-semibold">Version:</span> {snapshot?.version ?? "loading..."}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {speciesList.map((s) => (
              <div
                key={s.id}
                className="rounded bg-white p-4 shadow-sm border border-stone-300 flex flex-col justify-between"
              >
                <div>
                  <Badge variant="outline" className="text-[10px] mb-1">
                    {s.pricingMethod}
                  </Badge>
                  <p className="text-sm font-bold truncate">{s.species}</p>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-[#217938]">
                    ${parseFloat(s.boardFootRate).toFixed(2)}
                  </span>
                  <span className="text-xs text-[#7a7268]">/BF</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-[#7a7268]">
            Default fallback rate for any species without an explicit entry: <strong>${def}/BF</strong>.
            Cookies &amp; rounds retain existing fixed sale prices per the pricing rules sheet.
          </p>
        </div>
      </section>

      {/* Section 3: Trust & fulfillment (#f0f0f0) */}
      <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight">How Shopping TXUS Works</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="rounded bg-white p-6 shadow-sm border border-stone-300">
              <Shield className="h-8 w-8 text-[#217938]" />
              <h3 className="mt-3 font-serif font-bold">100% Salvaged Texas Trees</h3>
              <p className="mt-2 text-xs text-[#5a5247]">
                We never fell a healthy tree. Every piece comes from storm-felled, utility or
                development-cleared logs.
              </p>
            </div>
            <div className="rounded bg-white p-6 shadow-sm border border-stone-300">
              <Droplets className="h-8 w-8 text-[#217938]" />
              <h3 className="mt-3 font-serif font-bold">Kiln-Dried &amp; Moisture Tested</h3>
              <p className="mt-2 text-xs text-[#5a5247]">
                Nyle dehumidification and high-frequency vacuum kilns. Moisture readings kept with
                each inventory record.
              </p>
            </div>
            <div className="rounded bg-white p-6 shadow-sm border border-stone-300">
              <Truck className="h-8 w-8 text-[#217938]" />
              <h3 className="mt-3 font-serif font-bold">Local Pickup — $0</h3>
              <p className="mt-2 text-xs text-[#5a5247]">
                Pick up at the yard outside Dripping Springs. Freight and white-glove delivery
                quoted on request.
              </p>
            </div>
            <div className="rounded bg-white p-6 shadow-sm border border-stone-300">
              <ArrowRight className="h-8 w-8 text-[#217938]" />
              <h3 className="mt-3 font-serif font-bold">Surfacing Add-on</h3>
              <p className="mt-2 text-xs text-[#5a5247]">
                We flatten and thickness slabs: $50 ≤72″, $75 ≤120″, $100 &gt;120″. Add it at
                checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default Shop;
