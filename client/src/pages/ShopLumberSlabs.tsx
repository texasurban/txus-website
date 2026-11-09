import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Trees, Flame, CircleDot, Columns3, Ruler } from "lucide-react";

const subs = [
  {
    title: "Slabs",
    slug: "slabs",
    cat: "Slabs",
    desc: "Live-edge and natural-edge slabs for table tops, desks, conference tables, and island counters. Kiln-dried, moisture-metered, and priced from the master species board-foot table.",
    icon: Trees,
    tone: "#6b5d44",
  },
  {
    title: "Mantels",
    slug: "mantels",
    cat: "Mantels",
    desc: "Character mantel beams and floating fireplace shelves cut from real Texas hardwoods. Same board-foot pricing rule — Length × Average Width × Thickness ÷ 144 × $/BF.",
    icon: Flame,
    tone: "#6b3a24",
  },
  {
    title: "Cookies & Rounds",
    slug: "cookies-rounds",
    cat: "Cookies & Rounds",
    desc: "Cross-cut tree rounds and burl cookies — end-grain coffee tables, nightstands, and art pieces. Per the pricing rules sheet, these retain their existing fixed sale prices until dimensions are available.",
    icon: CircleDot,
    tone: "#7a5c37",
  },
  {
    title: "Beams & Timbers",
    slug: "beams",
    cat: "Beams",
    desc: "Structural and decorative beams milled from salvaged Texas trees. Priced from the default board-foot rule or an approved species rate.",
    icon: Columns3,
    tone: "#4a3c2e",
  },
  {
    title: "Dimensional Lumber",
    slug: "dimensional-lumber",
    cat: "Dimensional Lumber",
    desc: "Surfaced and rough-sawn lumber for carpenters, woodworkers, and builders. Board-foot pricing applies to every board we sell.",
    icon: Ruler,
    tone: "#5a5043",
  },
];

export function ShopLumberSlabs() {
  const { data: snapshot } = trpc.pricing.snapshot.useQuery();
  const def = (snapshot?.defaultRate ?? 12).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1b1612]">
      <SEOHead
        title="Lumber & Slabs — Live Texas Hardwood Inventory | Texas Urban Sawmill"
        description="Browse slabs, mantels, cookies & rounds, beams and dimensional lumber from Texas Urban Sawmill. All priced from our master species board-foot table."
        url="https://txurbansawmill.com/shop/lumber-slabs"
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1a4d2e] px-6 py-16 sm:py-20 lg:px-8 text-white border-t-2 border-b-2 border-stone-400">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c9bfae]">
            Shop &gt; Category
          </p>
          <h1 className="mt-2 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl">
            Lumber &amp; Slabs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm text-[#e5decf]">
            Every board-foot product is priced live from the master species table — slabs,
            mantels, beams and dimensional lumber share one pricing service. Current default:
            <strong> ${def}/BF</strong>.
          </p>
        </div>
      </section>

      {/* Section 1: subcategory cards (equal height, flex-column, green CTAs anchored at bottom) */}
      <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {subs.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.slug}
                  className="flex h-full flex-col overflow-hidden rounded bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-stone-300"
                >
                  <div
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${s.tone} 0%, #2b231a 100%)`,
                    }}
                    className="relative flex h-48 items-center justify-center text-white"
                  >
                    <Icon className="h-16 w-16 opacity-30" />
                    <span className="absolute bottom-3 right-4 font-mono text-xs uppercase tracking-widest text-[#f5f1e8] opacity-80">
                      Live inventory
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#217938]">
                      Lumber &amp; Slabs
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-bold">{s.title}</h3>
                    <p className="mt-3 flex-1 text-xs text-[#5a5247] leading-relaxed">
                      {s.desc}
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/shop/lumber-slabs/${s.slug}`}
                        className="inline-flex w-full items-center justify-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                      >
                        Shop {s.title} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Pricing rule explanation (#f5f1e8) */}
      <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#217938]">
            Master Pricing Rules Sheet
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold">How Every Piece Is Priced</h2>
          <div className="mt-8 rounded bg-white p-6 shadow-sm border border-stone-300 text-left space-y-3 font-mono text-xs">
            <p><strong>Formula:</strong> Length (in) × Average Width (in) × Thickness (in) ÷ 144</p>
            <p><strong>Average width:</strong> (Width Min + Width Max) ÷ 2</p>
            <p><strong>Dimensioned pieces:</strong> Board Feet × Current Species Rate ($/BF)</p>
            <p><strong>Cookies &amp; rounds:</strong> retain existing fixed sale price until dimensions are available</p>
            <p><strong>Working default:</strong> ${def}/BF (Dev’s rate, from the Pricing Rules sheet)</p>
            <p><strong>Surfacing/planing:</strong> $50 ≤72″ • $75 ≤120″ • $100 &gt;120″ per slab or cookie</p>
            <p><strong>Local pickup:</strong> $0 freight/shipping</p>
          </div>
          <p className="mt-6 text-xs text-[#7a7268]">
            Admin can change any species rate or add product-level overrides at any time; changes
            appear across the site within seconds.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default ShopLumberSlabs;
