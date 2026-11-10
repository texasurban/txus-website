import React, { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { RefreshCw, ShoppingBag } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/lib/cart";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  ProductCard,
  numericValue,
  productWidth,
  shopCta,
  shopFocus,
  shopContactHref,
  type ShopProductView,
} from "@/components/shop/ProductCard";
import { absoluteImageUrl, parseGallery } from "@/components/shop/ProductImage";
import { genericSpecies, floorLength } from "@shared/pricing";

export const SHOP_PAGE_SIZE = 24;
const EMPTY_PRODUCTS: ShopProductView[] = [];
const SHOP_LINKS = [
  { label: "All collections", href: "/shop" },
  { label: "Lumber & Slabs", href: "/shop/lumber-slabs" },
  { label: "Furniture", href: "/shop/furniture" },
  { label: "Home Decor", href: "/shop/home-decor" },
];

/** Shop-local navigation keeps the approved marketing Navigation unchanged. */
export function ShopToolbar() {
  const { count } = useCart();
  const [location] = useLocation();
  return (
    <div className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 px-6 py-4 lg:px-8">
      <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <nav
          aria-label="Shop categories"
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          {SHOP_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={location === link.href ? "page" : undefined}
              className={`min-h-11 content-center text-sm font-semibold text-[#217938] hover:underline ${shopFocus}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/shop/cart"
          aria-label={`View cart, ${count} ${count === 1 ? "item" : "items"}`}
          className={`inline-flex min-h-11 items-center gap-2 border-2 border-[#217938] px-4 py-2 text-sm font-semibold text-[#217938] ${shopFocus}`}
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" /> Cart ({count})
        </Link>
      </div>
    </div>
  );
}

type RangeKey = "length" | "width" | "thickness" | "price";
export interface NumericRange {
  min: string;
  max: string;
}
type Ranges = Record<RangeKey, NumericRange>;
export interface CatalogFilters {
  species: string;
  search: string;
  ranges: Ranges;
}
const freshRanges = (): Ranges => ({
  length: { min: "", max: "" },
  width: { min: "", max: "" },
  thickness: { min: "", max: "" },
  price: { min: "", max: "" },
});
const rangeDefinitions: Array<{
  key: RangeKey;
  label: string;
  unit: string;
  step: number;
}> = [
  { key: "length", label: "Length", unit: "in", step: 1 },
  { key: "width", label: "Width", unit: "in", step: 0.01 },
  { key: "thickness", label: "Thickness", unit: "in", step: 0.01 },
  { key: "price", label: "Price", unit: "USD", step: 0.01 },
];
export function filterValue(
  view: ShopProductView,
  key: RangeKey
): number | null {
  if (key === "length") return floorLength(view.product.lengthIn);
  if (key === "width") return productWidth(view.product);
  if (key === "thickness") return numericValue(view.product.thicknessIn);
  return view.pricing.price;
}
export function inventoryExtent(
  products: ShopProductView[],
  key: RangeKey
): [number, number] | null {
  const values = products
    .map(product => filterValue(product, key))
    .filter(
      (value): value is number => value !== null && Number.isFinite(value)
    );
  if (!values.length) return null;
  return [Math.min(...values), Math.max(...values)];
}
export function filterCatalog(
  products: ShopProductView[],
  filters: CatalogFilters
): ShopProductView[] {
  const query = filters.search.trim().toLowerCase();
  return products.filter(view => {
    const product = view.product;
    if (
      filters.species &&
      genericSpecies(product.species).toLowerCase() !==
        filters.species.toLowerCase()
    )
      return false;
    if (
      query &&
      !`${product.id} ${product.species} ${product.category} ${product.notes ?? ""}`
        .toLowerCase()
        .includes(query)
    )
      return false;
    return rangeDefinitions.every(({ key }) => {
      const bounds = filters.ranges[key];
      const min = numericValue(bounds.min);
      const max = numericValue(bounds.max);
      if (min === null && max === null) return true;
      const value = filterValue(view, key);
      return (
        value !== null &&
        (min === null || value >= min) &&
        (max === null || value <= max)
      );
    });
  });
}

function RangeFilter({
  definition,
  extent,
  value,
  onChange,
}: {
  definition: (typeof rangeDefinitions)[number];
  extent: [number, number] | null;
  value: NumericRange;
  onChange: (range: NumericRange) => void;
}) {
  const { key, label, unit, step } = definition;
  const effectiveMin = numericValue(value.min) ?? extent?.[0] ?? 0;
  const effectiveMax = numericValue(value.max) ?? extent?.[1] ?? 0;
  const invalid = effectiveMin > effectiveMax;
  const sliderValues = extent
    ? [
        Math.min(extent[1], Math.max(extent[0], effectiveMin)),
        Math.max(extent[0], Math.min(extent[1], effectiveMax)),
      ].sort((a, b) => a - b)
    : [0, 0];
  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-semibold">
        {label} ({unit})
      </legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div>
          <label htmlFor={`${key}-min`} className="text-xs text-stone-600">
            Minimum
          </label>
          <input
            id={`${key}-min`}
            type="number"
            step={step}
            value={value.min}
            placeholder={extent ? String(extent[0]) : "—"}
            disabled={!extent}
            aria-invalid={invalid || undefined}
            className={`mt-1 min-h-11 w-full min-w-0 border border-stone-400 bg-white px-2 text-sm ${shopFocus}`}
            onChange={event => onChange({ ...value, min: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${key}-max`} className="text-xs text-stone-600">
            Maximum
          </label>
          <input
            id={`${key}-max`}
            type="number"
            step={step}
            value={value.max}
            placeholder={extent ? String(extent[1]) : "—"}
            disabled={!extent}
            aria-invalid={invalid || undefined}
            className={`mt-1 min-h-11 w-full min-w-0 border border-stone-400 bg-white px-2 text-sm ${shopFocus}`}
            onChange={event => onChange({ ...value, max: event.target.value })}
          />
        </div>
      </div>
      {extent && extent[0] < extent[1] ? (
        <SliderPrimitive.Root
          aria-label={`${label} range`}
          min={extent[0]}
          max={extent[1]}
          step={step}
          value={sliderValues}
          className="relative mt-4 flex h-6 w-full touch-none select-none items-center"
          onValueChange={values =>
            onChange({ min: String(values[0]), max: String(values[1]) })
          }
        >
          <SliderPrimitive.Track className="relative h-1.5 grow bg-stone-300">
            <SliderPrimitive.Range className="absolute h-full bg-[#217938]" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            aria-label={`Minimum ${label.toLowerCase()}`}
            className={`block h-5 w-5 rounded-full border-2 border-[#217938] bg-white ${shopFocus}`}
          />
          <SliderPrimitive.Thumb
            aria-label={`Maximum ${label.toLowerCase()}`}
            className={`block h-5 w-5 rounded-full border-2 border-[#217938] bg-white ${shopFocus}`}
          />
        </SliderPrimitive.Root>
      ) : (
        <p className="mt-3 text-xs text-stone-600">
          {extent
            ? `Inventory: ${extent[0]} ${unit}`
            : "No measurements available"}
        </p>
      )}
      {invalid && (
        <p role="alert" className="mt-2 text-xs text-red-800">
          Minimum must not exceed maximum.
        </p>
      )}
    </fieldset>
  );
}

export interface ShopListingProps {
  category: string;
  pageTitle: string;
  pageDesc: string;
  slug?: string;
  routePath?: string;
  categoryGroup?: readonly string[];
  emptyMessage?: string;
  portfolioOnEmpty?: boolean;
}

export function ShopListing({
  category,
  pageTitle,
  pageDesc,
  slug,
  routePath,
  categoryGroup,
  emptyMessage,
  portfolioOnEmpty = false,
}: ShopListingProps) {
  const [species, setSpecies] = useState("");
  const [ranges, setRanges] = useState<Ranges>(freshRanges);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id");
  const [limit, setLimit] = useState(SHOP_PAGE_SIZE);
  const { data, refetch, isFetching, isLoading, isError } =
    trpc.pricing.catalog.useQuery(categoryGroup ? {} : { category }, {
      refetchInterval: 25_000,
      refetchOnWindowFocus: true,
    });
  const rawProducts: ShopProductView[] = data?.products ?? EMPTY_PRODUCTS;
  const products = useMemo(
    () =>
      categoryGroup
        ? rawProducts.filter(view =>
            categoryGroup.some(
              name => name.toLowerCase() === view.product.category.toLowerCase()
            )
          )
        : rawProducts,
    [rawProducts, categoryGroup]
  );
  const speciesOptions = useMemo(() => {
    const speciesMap = new Map<string, string>();
    products.forEach(view => {
      const name = genericSpecies(view.product.species);
      if (name) speciesMap.set(name.toLowerCase(), name);
    });
    return Array.from(speciesMap.values()).sort((a, b) => a.localeCompare(b));
  }, [products]);
  const filtered = useMemo(
    () =>
      filterCatalog(products, { species, search, ranges }).sort((a, b) => {
        if (sort === "price-asc")
          return (a.pricing.price ?? Infinity) - (b.pricing.price ?? Infinity);
        if (sort === "price-desc")
          return (
            (b.pricing.price ?? -Infinity) - (a.pricing.price ?? -Infinity)
          );
        if (sort === "length-asc")
          return (
            (floorLength(a.product.lengthIn) ?? Infinity) -
            (floorLength(b.product.lengthIn) ?? Infinity)
          );
        return a.product.id.localeCompare(b.product.id, undefined, {
          numeric: true,
        });
      }),
    [products, species, search, ranges, sort]
  );
  const canonical = `https://txurbansawmill.com${routePath ?? `/shop/lumber-slabs/${slug ?? category.toLowerCase().replace(/\s+/g, "-")}`}`;
  const heroImage = absoluteImageUrl(
    parseGallery(products[0]?.product.galleryJson)[0]?.detail ??
      products[0]?.product.primaryImage
  );
  const reset = () => {
    setSpecies("");
    setSearch("");
    setRanges(freshRanges());
    setSort("id");
    setLimit(SHOP_PAGE_SIZE);
  };
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-foreground">
      <SEOHead
        title={`${pageTitle} | Texas Urban Sawmill`}
        description={pageDesc}
        url={canonical}
        canonical={canonical}
        image={heroImage}
        noindex={isLoading || (isError && !data)}
      />
      <Navigation />
      <main>
        <ShopToolbar />
        <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-12 lg:px-8 lg:py-16">
          <div className="container">
            <p className="eyebrow">Shop Inventory</p>
            <h1 className="section-title mt-3">{pageTitle}</h1>
            <p className="section-copy mt-5 max-w-3xl">{pageDesc}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600">
              <span>
                Pricing refreshes every 25 seconds.
                {data?.version ? ` Version ${data.version}.` : ""}
              </span>
              <button
                type="button"
                disabled={isFetching}
                className={`inline-flex min-h-11 items-center gap-2 px-2 font-semibold text-[#217938] disabled:opacity-60 ${shopFocus}`}
                onClick={() => void refetch()}
              >
                <RefreshCw
                  aria-hidden="true"
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />{" "}
                Refresh inventory
              </button>
            </div>
            {isError && (
              <p
                role="alert"
                className="mt-4 border-l-4 border-red-700 bg-white p-4 text-sm"
              >
                {data
                  ? "Inventory could not refresh. Showing the last loaded catalog; please refresh before proceeding."
                  : "Inventory could not load. Please try refreshing."}
              </p>
            )}
          </div>
        </section>
        <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 px-6 py-12 lg:px-8 lg:py-16">
          <div className="container">
            {isLoading ? (
              <p role="status" className="py-12 text-center">
                Loading available inventory…
              </p>
            ) : !data && isError ? (
              <p className="py-12 text-center">
                The catalog is temporarily unavailable.
              </p>
            ) : products.length === 0 ? (
              <div className="mx-auto max-w-2xl py-12 text-center">
                <h2 className="text-3xl">
                  No available {pageTitle.toLowerCase()} inventory
                </h2>
                <p className="mt-4 leading-relaxed">
                  {emptyMessage ??
                    "There are no publicly listed products in this collection right now. Please ask about your project or browse another collection."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {portfolioOnEmpty && (
                    <Link href="/portfolio" className={shopCta}>
                      View existing portfolio
                    </Link>
                  )}
                  <a href={shopContactHref} className={shopCta}>
                    Ask a question
                  </a>
                  <Link
                    href="/shop/lumber-slabs"
                    className={`inline-flex min-h-11 items-center justify-center border-2 border-black px-5 py-3 text-sm font-semibold ${shopFocus}`}
                  >
                    Browse lumber & slabs
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="border-2 border-black bg-white p-5 sm:p-6">
                  <h2 className="text-2xl">Filter available inventory</h2>
                  <p className="mt-2 text-sm text-stone-600">
                    Ranges come from this collection. Leave numeric fields empty
                    for the full range. Length is floored to whole inches; width
                    uses average width.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
                    <div>
                      <label
                        htmlFor="species-filter"
                        className="text-sm font-semibold"
                      >
                        Species
                      </label>
                      <select
                        id="species-filter"
                        value={species}
                        className={`mt-2 min-h-11 w-full border border-stone-400 bg-white px-3 text-sm ${shopFocus}`}
                        onChange={event => {
                          setSpecies(event.target.value);
                          setLimit(SHOP_PAGE_SIZE);
                        }}
                      >
                        <option value="">All species</option>
                        {speciesOptions.map(name => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {rangeDefinitions.map(definition => (
                      <RangeFilter
                        key={definition.key}
                        definition={definition}
                        extent={inventoryExtent(products, definition.key)}
                        value={ranges[definition.key]}
                        onChange={value => {
                          setRanges(current => ({
                            ...current,
                            [definition.key]: value,
                          }));
                          setLimit(SHOP_PAGE_SIZE);
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="catalog-search"
                        className="text-sm font-semibold"
                      >
                        Search inventory
                      </label>
                      <input
                        id="catalog-search"
                        type="search"
                        value={search}
                        placeholder="Product ID, species, or notes"
                        className={`mt-2 min-h-11 w-full border border-stone-400 bg-white px-3 text-sm ${shopFocus}`}
                        onChange={event => {
                          setSearch(event.target.value);
                          setLimit(SHOP_PAGE_SIZE);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="catalog-sort"
                        className="text-sm font-semibold"
                      >
                        Sort by
                      </label>
                      <select
                        id="catalog-sort"
                        value={sort}
                        className={`mt-2 min-h-11 w-full border border-stone-400 bg-white px-3 text-sm ${shopFocus}`}
                        onChange={event => {
                          setSort(event.target.value);
                          setLimit(SHOP_PAGE_SIZE);
                        }}
                      >
                        <option value="id">Product ID</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                        <option value="length-asc">
                          Length: short to long
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-300 pt-4">
                    <p role="status" className="text-sm">
                      {filtered.length} of {products.length} products match.
                      Showing {Math.min(limit, filtered.length)}.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className={`min-h-11 px-2 text-sm font-semibold text-[#217938] underline ${shopFocus}`}
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
                {filtered.length > 0 ? (
                  <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.slice(0, limit).map((view, index) => (
                      <ProductCard
                        key={view.product.id}
                        product={view.product}
                        pricing={view.pricing}
                        eager={index === 0}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <h2 className="text-2xl">
                      No products match these filters
                    </h2>
                    <p className="mt-3">
                      Try another range or reset filters to see all available
                      products.
                    </p>
                  </div>
                )}
                {limit < filtered.length && (
                  <div className="mt-10 text-center">
                    <button
                      type="button"
                      className={shopCta}
                      onClick={() =>
                        setLimit(current => current + SHOP_PAGE_SIZE)
                      }
                    >
                      Load {Math.min(SHOP_PAGE_SIZE, filtered.length - limit)}{" "}
                      more products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default ShopListing;
