import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { formatCurrency, slabPreviewProducts } from "@/data/shopPreview";
import { Link } from "wouter";
import { useMemo, useState } from "react";

export default function ShopSlabs() {
  const [query, setQuery] = useState("");

  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return slabPreviewProducts;
    return slabPreviewProducts.filter((product) =>
      `${product.id} ${product.species}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Texas Walnut Slabs | TXUS Shop Preview"
        description="Browse a preview of priced Texas Walnut live edge slabs from Texas Urban Sawmill, with dimensions, board-foot details, local pickup, and inquiry-based next steps."
        url="https://txurbansawmill.com/shop/lumber-slabs/slabs"
        canonical="https://txurbansawmill.com/shop/lumber-slabs/slabs"
        image={slabPreviewProducts[0].image}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Texas Walnut Slabs",
          url: "https://txurbansawmill.com/shop/lumber-slabs/slabs",
          description: "Preview collection of priced Texas Walnut live edge slabs.",
          isPartOf: { "@type": "WebSite", name: "Texas Urban Sawmill", url: "https://txurbansawmill.com" },
        }}
      />

      <Navigation />
      <main>
        <section className="txus-section-bg-1 txus-section-divider section-shell">
          <div className="container max-w-6xl">
            <Link href="/shop" className="inline-flex text-sm font-bold uppercase tracking-[0.14em] text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              ← Back to shop categories
            </Link>
            <p className="eyebrow mt-8">Lumber &amp; Slabs · Preview Collection</p>
            <h1 className="section-title max-w-4xl">Texas Walnut slabs</h1>
            <p className="section-copy mt-6 max-w-3xl">
              A small first look at priced Texas Walnut slabs from the restored inventory projection. Product detail pages, full filtering, galleries, and cart actions will be added after this collection structure is reviewed.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="border-2 border-black bg-white/70 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">Fulfillment</p>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">Local pickup only for this preview. No freight or shipping charge is implied.</p>
              </div>
              <div className="border-2 border-black bg-white/70 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">Pricing note</p>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">Displayed prices follow the current prototype board-foot projection and remain subject to TXUS review before purchase enablement.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="txus-section-bg-2 txus-section-divider section-shell">
          <div className="container max-w-6xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Preview inventory</p>
                <h2 className="section-title">{products.length} slabs shown</h2>
              </div>
              <label className="block w-full md:max-w-xs">
                <span className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">Search product or species</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. 101-101 or walnut"
                  className="mt-2 min-h-11 w-full border-2 border-black bg-white px-3 py-2 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
              </label>
            </div>

            {products.length ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <article key={product.id} className="flex h-full flex-col border-2 border-black bg-white shadow-sm">
                    <div className="aspect-square border-b-2 border-black bg-stone-100">
                      <img src={product.image} alt={product.alt} className="h-full w-full object-contain" loading="lazy" decoding="async" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Slab · {product.id}</p>
                      <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.04em] text-foreground">{product.species}</h3>
                      <dl className="mt-4 space-y-1 text-sm leading-relaxed text-muted-foreground">
                        <div className="flex justify-between gap-3"><dt>Dimensions</dt><dd className="text-right font-semibold text-foreground">{product.length}&quot; L × {product.widthMin}–{product.widthMax}&quot; W</dd></div>
                        <div className="flex justify-between gap-3"><dt>Thickness</dt><dd className="font-semibold text-foreground">{product.thickness}&quot;</dd></div>
                        <div className="flex justify-between gap-3"><dt>Board feet</dt><dd className="font-semibold text-foreground">{product.boardFeet.toFixed(2)} BF</dd></div>
                      </dl>
                      <div className="mt-5 flex-1">
                        <p className="text-xl font-bold text-primary">{formatCurrency(product.price)}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Preview price · local pickup</p>
                      </div>
                      <a href="/contact?subject=Private%20%2F%20Residential" className="mt-5 inline-flex min-h-11 items-center justify-center border-2 border-primary bg-primary px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#143b23] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                        Ask about this slab
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 border-2 border-black bg-white p-8 text-center">
                <p className="font-display text-3xl uppercase">No preview pieces match that search.</p>
                <button type="button" onClick={() => setQuery("")} className="mt-5 border-2 border-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
