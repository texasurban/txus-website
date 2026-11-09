import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { genericSpecies, floorLength, type CatalogProductView } from "@shared/pricing";
import { RefreshCw, Filter } from "lucide-react";

interface ShopListingProps {
  category: string;
  pageTitle: string;
  pageDesc: string;
  slug: string;
}

export function ShopListing({ category, pageTitle, pageDesc, slug }: ShopListingProps) {
  const [speciesFilter, setSpeciesFilter] = useState("__all__");
  const [thickFilter, setThickFilter] = useState("__all__");
  const [lenMax, setLenMax] = useState<number>(144);
  const [priceMax, setPriceMax] = useState<number>(3000);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price-asc");

  const { data, refetch, isFetching } = trpc.pricing.catalog.useQuery(
    { category },
    { refetchInterval: 25_000 },
  );

  const products: CatalogProductView[] = data?.products ?? [];
  const version = data?.version;

  // Derive species list using genericSpecies to collapse duplicates
  const speciesOptions = useMemo(() => {
    const s = new Set<string>();
    for (const p of products) {
      const g = genericSpecies(p.product.species);
      if (g) s.add(g);
    }
    return Array.from(s).sort();
  }, [products]);

  const thickOptions = useMemo(() => {
    const s = new Set<string>();
    for (const p of products) {
      if (p.product.thicknessIn) s.add(String(p.product.thicknessIn));
    }
    return Array.from(s).sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [products]);

  const filtered = useMemo(() => {
    return products
      .filter((pv) => {
        const p = pv.product;
        const g = genericSpecies(p.species);
        if (speciesFilter !== "__all__" && g !== speciesFilter) return false;
        if (thickFilter !== "__all__" && p.thicknessIn !== thickFilter) return false;
        const fl = floorLength(p.lengthIn);
        if (fl !== null && fl > lenMax) return false;
        if (pv.pricing.price !== null && pv.pricing.price > priceMax) return false;
        if (search) {
          const q = search.toLowerCase();
          const hit =
            p.id.toLowerCase().includes(q) ||
            p.species.toLowerCase().includes(q) ||
            (p.notes || "").toLowerCase().includes(q);
          if (!hit) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const pa = a.pricing.price ?? Infinity;
        const pb = b.pricing.price ?? Infinity;
        if (sort === "price-asc") return pa - pb;
        if (sort === "price-desc") return pb - pa;
        if (sort === "id") return a.product.id.localeCompare(b.product.id);
        return 0;
      });
  }, [products, speciesFilter, thickFilter, lenMax, priceMax, search, sort]);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1b1612]">
      <SEOHead
        title={`${pageTitle} | Texas Urban Sawmill`}
        description={pageDesc}
        url={`https://txurbansawmill.com/shop/lumber-slabs/${slug}`}
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1a4d2e] px-6 py-14 lg:px-8 lg:py-16 text-white border-t-2 border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c9bfae]">
            Shop &gt; Lumber &amp; Slabs
          </p>
          <h1 className="mt-2 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl">
            {pageTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#e5decf]">{pageDesc}</p>
        </div>
      </section>

      {/* Live pricing strip */}
      <div className="bg-[#f5f1e8] px-6 py-3 text-xs text-[#5a5247] border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong>Prices are live</strong> — computed from the master species board-foot table (version{" "}
            {version ?? "..."}).
          </span>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1 font-semibold text-[#217938] hover:underline"
          >
            <RefreshCw className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      <main className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Filters */}
          <div className="rounded bg-white p-5 shadow-sm border border-stone-300">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a7268]">
              <Filter className="h-4 w-4" /> Filters
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7268]">
                  Species
                </label>
                <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">All species</SelectItem>
                    {speciesOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7268]">
                  Thickness
                </label>
                <Select value={thickFilter} onValueChange={setThickFilter}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Any thickness</SelectItem>
                    {thickOptions.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}″
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7268]">
                  Length ≤ {lenMax}″
                </label>
                <Slider
                  min={36}
                  max={144}
                  step={6}
                  value={[lenMax]}
                  onValueChange={(v) => setLenMax(v[0])}
                  className="mt-3"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7268]">
                  Price ≤ ${priceMax}
                </label>
                <Slider
                  min={200}
                  max={5000}
                  step={100}
                  value={[priceMax]}
                  onValueChange={(v) => setPriceMax(v[0])}
                  className="mt-3"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7268]">
                  Search
                </label>
                <Input
                  placeholder="ID, species, note…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7268]">
                  Sort
                </label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: low → high</SelectItem>
                    <SelectItem value="price-desc">Price: high → low</SelectItem>
                    <SelectItem value="id">Product ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between border-t border-stone-200 pt-3 text-xs text-[#7a7268]">
              <span>
                Showing <strong>{filtered.length}</strong> of {products.length} products
              </span>
              <Button
                variant="link"
                size="sm"
                className="text-xs text-[#217938]"
                onClick={() => {
                  setSpeciesFilter("__all__");
                  setThickFilter("__all__");
                  setLenMax(144);
                  setPriceMax(3000);
                  setSearch("");
                }}
              >
                Reset filters
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((pv) => (
              <ProductCard
                key={pv.product.id}
                product={pv.product}
                pricing={pv.pricing}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-sm text-[#7a7268]">
              No products match these filters. Try loosening the length, price or species filter.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
export default ShopListing;
