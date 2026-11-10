import React from "react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { trpc } from "@/lib/trpc";
import {
  ProductImage,
  absoluteImageUrl,
  parseGallery,
} from "@/components/shop/ProductImage";
import {
  shopCta,
  shopContactHref,
  type ShopProductView,
} from "@/components/shop/ProductCard";
import { ShopToolbar } from "./ShopListing";
import { lumberCollections } from "./ShopLumberSlabs";
import { furnitureCategories } from "./ShopFurniture";
import { homeDecorCategories } from "./ShopHomeDecor";

// Exact managed-storage image retained from the approved Phase II preview.
const lumberCategoryImage =
  "/manus-storage/category-lumber-2026-11-03_819f299a.webp";
const categories = [
  {
    title: "Lumber & Slabs",
    description:
      "Browse slabs, mantels, cookies and rounds, beams, and dimensional lumber.",
    image: lumberCategoryImage,
    href: "/shop/lumber-slabs",
    names: lumberCollections.map(collection => collection.category),
  },
  {
    title: "Furniture",
    description:
      "Explore available finished furniture, or view existing work in our portfolio and ask about your project.",
    href: "/shop/furniture",
    names: furnitureCategories,
  },
  {
    title: "Home Decor",
    description:
      "Explore available home decor, or ask about a piece for your home or a custom project.",
    href: "/shop/home-decor",
    names: homeDecorCategories,
  },
];

export default function Shop() {
  const { data, isLoading, isError } = trpc.pricing.catalog.useQuery(
    {},
    { refetchInterval: 25_000, refetchOnWindowFocus: true }
  );
  const products: ShopProductView[] = data?.products ?? [];
  const canonical = "https://txurbansawmill.com/shop";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Shop Inventory | Texas Urban Sawmill"
        description="Browse available lumber, slabs, furniture, and home decor at Texas Urban Sawmill. View real product photos, measurements, and current pricing; ask about local pickup."
        url={canonical}
        canonical={canonical}
        image={absoluteImageUrl(lumberCategoryImage)}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Texas Urban Sawmill Shop",
          url: canonical,
          description: "Available TXUS wood inventory and finished products.",
          isPartOf: {
            "@type": "WebSite",
            name: "Texas Urban Sawmill",
            url: "https://txurbansawmill.com",
          },
        }}
      />
      <Navigation />
      <main>
        <ShopToolbar />
        <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 section-shell">
          <div className="container max-w-6xl">
            <p className="eyebrow">TXUS Shop Inventory</p>
            <h1 className="section-title max-w-4xl">
              Rescued Texas wood, ready for its next life.
            </h1>
            <p className="section-copy mt-6 max-w-3xl">
              Choose a collection to see available products, verified product
              photos, measurements, and current pricing.
            </p>
            <p className="mt-6 max-w-3xl border-l-4 border-[#217938] bg-white/60 px-5 py-4 leading-relaxed">
              Local pickup. Adding an item to your cart does not reserve
              inventory or complete a purchase. Please use the inquiry handoff
              to coordinate your next step.
            </p>
          </div>
        </section>
        <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 section-shell">
          <div className="container max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow">Shop Inventory</p>
              <h2 className="section-title">Choose a collection</h2>
              <p className="section-copy mt-5">
                Only available, publicly listed inventory appears in the shop.
                Furniture and home decor pages also connect you to existing
                portfolio work and project inquiries.
              </p>
              {isError && (
                <p role="alert" className="mt-4 text-sm text-red-800">
                  Inventory counts are temporarily unavailable. Open a
                  collection to refresh the catalog.
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(category => {
                const available = products.filter(view =>
                  category.names.some(
                    name =>
                      name.toLowerCase() === view.product.category.toLowerCase()
                  )
                );
                const first = available[0]?.product;
                const image =
                  parseGallery(first?.galleryJson)[0]?.thumb ??
                  first?.primaryImage ??
                  ("image" in category ? category.image : undefined);
                return (
                  <article
                    key={category.title}
                    className="flex h-full flex-col border-2 border-black bg-white shadow-sm"
                  >
                    {image && (
                      <ProductImage
                        src={image}
                        alt={`${category.title} at Texas Urban Sawmill`}
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#217938]">
                        {isLoading
                          ? "Checking inventory…"
                          : isError && !data
                            ? "Check collection availability"
                            : available.length
                              ? `${available.length} available products`
                              : "No publicly listed inventory currently"}
                      </p>
                      <h3 className="mt-3 text-3xl">{category.title}</h3>
                      <p className="mt-3 flex-1 text-base leading-relaxed text-stone-600">
                        {category.description}
                      </p>
                      <Link href={category.href} className={`${shopCta} mt-6`}>
                        Explore collection
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <a href={shopContactHref} className={shopCta}>
                Ask a question
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
