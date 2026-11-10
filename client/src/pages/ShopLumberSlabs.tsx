import React from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  ProductImage,
  parseGallery,
  absoluteImageUrl,
} from "@/components/shop/ProductImage";
import {
  shopCta,
  shopContactHref,
  type ShopProductView,
} from "@/components/shop/ProductCard";
import { ShopToolbar } from "./ShopListing";

export const lumberCollections = [
  {
    title: "Slabs",
    slug: "slabs",
    category: "Slabs",
    description:
      "Browse individual slabs and compare their wood species, dimensions, and product photos.",
  },
  {
    title: "Mantels",
    slug: "mantels",
    category: "Mantels",
    description:
      "Browse available mantels and review each piece’s measurements and current price.",
  },
  {
    title: "Cookies & Rounds",
    slug: "cookies-rounds",
    category: "Cookies & Rounds",
    description:
      "Browse available cross-cut cookies and rounds for your next project.",
  },
  {
    title: "Beams",
    slug: "beams",
    category: "Beams",
    description:
      "Review available beams with product-specific measurements and photos.",
  },
  {
    title: "Dimensional Lumber",
    slug: "dimensional-lumber",
    category: "Dimensional Lumber",
    description:
      "Browse available dimensional lumber and compare species and sizes.",
  },
] as const;
const categoryImage = "/manus-storage/category-lumber-2026-11-03_819f299a.webp";

export function ShopLumberSlabs() {
  const { data, isLoading, isError } = trpc.pricing.catalog.useQuery(
    {},
    { refetchInterval: 25_000, refetchOnWindowFocus: true }
  );
  const products: ShopProductView[] = data?.products ?? [];
  const canonical = "https://txurbansawmill.com/shop/lumber-slabs";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Lumber & Slabs | Texas Urban Sawmill"
        description="Browse available slabs, mantels, cookies and rounds, beams, and dimensional lumber at Texas Urban Sawmill. Compare verified photos, measurements, and current prices."
        url={canonical}
        canonical={canonical}
        image={absoluteImageUrl(categoryImage)}
      />
      <Navigation />
      <main>
        <ShopToolbar />
        <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 section-shell">
          <div className="container">
            <p className="eyebrow">Shop Inventory</p>
            <h1 className="section-title mt-3">Lumber &amp; Slabs</h1>
            <p className="section-copy mt-5 max-w-3xl">
              Start with a collection, then use species, length, width,
              thickness, and price filters to find the right piece. Measurements
              and prices come from the available inventory.
            </p>
            {isError && (
              <p role="alert" className="mt-4 text-sm text-red-800">
                Inventory counts could not refresh. Open a collection to try
                again.
              </p>
            )}
          </div>
        </section>
        <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 section-shell">
          <div className="container">
            <h2 className="section-title mb-10">Explore the collections</h2>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lumberCollections.map(collection => {
                const available = products.filter(
                  view =>
                    view.product.category.toLowerCase() ===
                    collection.category.toLowerCase()
                );
                const first = available[0]?.product;
                const image =
                  parseGallery(first?.galleryJson)[0]?.thumb ??
                  first?.primaryImage;
                return (
                  <article
                    key={collection.slug}
                    className="flex h-full flex-col border-2 border-black bg-white shadow-sm"
                  >
                    {image && (
                      <ProductImage
                        src={image}
                        alt={`${first?.species} ${collection.title} — ${first?.id}`}
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#217938]">
                        {isLoading
                          ? "Checking inventory…"
                          : isError && !data
                            ? "Check availability"
                            : `${available.length} available products`}
                      </p>
                      <h3 className="mt-3 text-3xl">{collection.title}</h3>
                      <p className="mt-3 flex-1 leading-relaxed text-stone-600">
                        {collection.description}
                        {!isLoading && !isError && available.length === 0
                          ? " No publicly listed inventory is available right now."
                          : ""}
                      </p>
                      <Link
                        href={`/shop/lumber-slabs/${collection.slug}`}
                        className={`${shopCta} mt-6`}
                      >
                        Explore {collection.title}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-12 lg:px-8 lg:py-16">
          <div className="container max-w-3xl">
            <h2 className="text-3xl">Measurements, pricing &amp; pickup</h2>
            <p className="mt-4 leading-relaxed">
              Each product page shows its current price and pricing basis. When
              board-foot pricing applies, the page shows board feet and the rate
              used. Surfacing options appear only when available for that item.
            </p>
            <p className="mt-4 leading-relaxed">
              Local pickup. Cart items are not reserved, and adding to the cart
              does not complete a purchase.
            </p>
            <a href={shopContactHref} className={`${shopCta} mt-6`}>
              Ask a question
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default ShopLumberSlabs;
