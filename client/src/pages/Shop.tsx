import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";

const lumberCategoryImage = "/manus-storage/category-lumber-2026-11-03_819f299a.webp";

const categories = [
  {
    title: "Lumber & Slabs",
    description: "Browse rescued Texas slabs, mantels, cookies, rounds, beams, and dimensional lumber.",
    image: lumberCategoryImage,
    href: "/shop/lumber-slabs/slabs",
    status: "Preview collection available",
  },
  {
    title: "Furniture",
    description: "Finished tables, benches, desks, shelving, and heirloom wood pieces are being prepared for the shop.",
    status: "Coming next",
  },
  {
    title: "Home Decor",
    description: "Small-batch cutting boards, planters, vases, wall hangings, and seasonal decor will be added in a later catalog pass.",
    status: "Coming next",
  },
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Shop Texas Urban Sawmill | Rescued Texas Wood Inventory"
        description="Browse the Texas Urban Sawmill shop preview for rescued Texas slabs and future furniture and home decor collections, with local pickup in Dripping Springs, Texas."
        url="https://txurbansawmill.com/shop"
        canonical="https://txurbansawmill.com/shop"
        image={lumberCategoryImage}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Texas Urban Sawmill Shop",
          url: "https://txurbansawmill.com/shop",
          description: "TXUS rescued Texas wood inventory and finished-product shop.",
          isPartOf: { "@type": "WebSite", name: "Texas Urban Sawmill", url: "https://txurbansawmill.com" },
        }}
      />

      <Navigation />
      <main>
        <section className="txus-section-bg-1 txus-section-divider section-shell">
          <div className="container max-w-6xl">
            <p className="eyebrow">TXUS Shop Preview</p>
            <h1 className="section-title max-w-4xl">Rescued Texas wood, ready for its next life.</h1>
            <p className="section-copy mt-6 max-w-3xl">
              Browse the first integrated inventory preview from Texas Urban Sawmill. The shop will expand from this category-first foundation as product details, image associations, and fulfillment decisions are reviewed.
            </p>
            <div className="mt-6 border-l-4 border-primary bg-white/60 px-5 py-4 text-base leading-relaxed text-foreground sm:text-lg">
              <strong>Preview milestone:</strong> this first pass is for catalog review. It does not process payment, reserve inventory, or imply freight shipping. Local pickup remains the current fulfillment direction.
            </div>
          </div>
        </section>

        <section className="txus-section-bg-2 txus-section-divider section-shell">
          <div className="container max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow">Shop Inventory</p>
              <h2 className="section-title">Choose a collection</h2>
              <p className="section-copy mt-5">
                Start with the live slab preview, then return as furniture and home decor collections are approved for public display.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {categories.map((category) => {
                const content = (
                  <div className="flex h-full flex-col border-2 border-black bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                    {category.image ? (
                      <div className="aspect-[4/3] overflow-hidden border-b-2 border-black bg-stone-100">
                        <img
                          src={category.image}
                          alt={`${category.title} at Texas Urban Sawmill`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center border-b-2 border-black bg-stone-200 px-6 text-center font-display text-3xl uppercase tracking-[0.05em] text-stone-500">
                        Coming soon
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{category.status}</p>
                      <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.04em] text-foreground">{category.title}</h3>
                      <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">{category.description}</p>
                      <span className={`mt-6 inline-flex min-h-11 items-center justify-center border-2 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] ${category.href ? "border-primary bg-primary text-primary-foreground" : "border-stone-400 bg-stone-100 text-stone-500"}`}>
                        {category.href ? "Explore collection" : "Preparing inventory"}
                      </span>
                    </div>
                  </div>
                );

                return category.href ? (
                  <a key={category.title} href={category.href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                    {content}
                  </a>
                ) : (
                  <div key={category.title} className="h-full" aria-label={`${category.title}: coming next`}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
