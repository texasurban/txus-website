# TXUS Full Shopping Integration Blueprint

**Project:** Texas Urban Sawmill Website — Phase II  
**Blueprint date:** November 10, 2026  
**Status:** Planning artifact — approved to prepare; implementation not yet authorized by this document  
**Primary source:** `/home/ubuntu/txus-website-phase-2`  
**Shopping prototype reference:** `/home/ubuntu/txusshop`  
**Inventory reference:** `TXUS Manus AI/E-Commerce/Master Inv Workbook/Master Inv Workbook 11102026v1.xlsx`  
**Marketing baseline:** GitHub `texasurban/txus-website`, `main`, commit `f0088902b06128dea9cb60f7c4aff7128c94eec6`  
**Current Manus preview checkpoint:** `d0988ed5` — includes the shell-integrated shop preview, not a complete cart/catalog launch

---

## 1. Purpose and outcome

This blueprint defines how to turn the existing TXUS Phase II marketing website and the shopping prototype into one integrated public website. The final result must feel like one Texas Urban Sawmill site, not a marketing website with a separate ecommerce microsite attached.

The integrated site will preserve the approved marketing experience while adding a category-first shop, product collections, product detail pages, galleries, cart behavior, inquiry handling, and the approved fulfillment rules. Existing marketing routes, navigation, footer, typography, colors, section backgrounds, dividers, responsive behavior, SEO conventions, and service-card alignment rules remain authoritative.

The blueprint is intentionally implementation-gated. It separates confirmed requirements from open decisions so no payment, freight, inventory reservation, public merchandising status, or catalog exposure is assumed without approval.

---

## 2. Current state

### Confirmed marketing baseline

The clean marketing-only rollback baseline is GitHub commit `f0088902`. It contains the approved marketing source, committed documentation, website assets, and the Hillco two-column revision. A dated backup named `TXUS Marketing Website - 111026V1` has been uploaded to the canonical Drive location:

```text
TXUS Manus AI/TXUS Marketing Website/Back-Ups/
```

### Existing shop preview

The current Phase II implementation contains a first shell-integrated preview slice:

- `/shop` — category-first shop landing page.
- `/shop/lumber-slabs/slabs` — representative four-product Texas Walnut slab collection.
- Existing TXUS `Navigation` and `Footer` are used.
- Approved section background utilities and dividers are used.
- Preview slab cards use equal-height flex-column layouts and bottom-aligned actions.
- The preview uses managed-storage image paths and current 400px card renditions.
- The preview is explicitly non-payment, non-reservation, and local-pickup oriented.

The preview is not yet the full shopping system. It does not yet include the full catalog, product detail routes, complete filters, associated-image galleries, cart behavior, inventory synchronization, checkout/inquiry completion, or production merchandising approval.

### Prototype reference

The restored prototype provides behavior and data references, including:

- 638 catalog rows.
- 545 rows with numeric prices.
- 523 products with linked image galleries.
- 1,346 associated gallery images.
- 3,927 optimized WebP renditions in 400px, 800px, and 1200px tiers.
- 65 records currently classified as `DIRECT_CART`.
- 573 records currently classified as `INQUIRY`.
- Local-storage cart behavior.
- Product detail galleries with thumbnail selection and click-to-enlarge lightbox.
- Per-item surfacing/planing options for slabs and cookies/rounds.
- Local pickup language with no freight or shipping charge.

These prototype facts are references, not automatic production approvals.

---

## 3. Non-negotiable integration rules

### 3.1 One TXUS site shell

Every shop route must use the existing Phase II marketing shell:

1. Existing TXUS `Navigation`.
2. Shop or product content.
3. Existing TXUS `Footer`.

This applies to:

- Shop landing.
- Category and collection pages.
- Product detail pages.
- Cart.
- Inquiry or checkout handoff.
- Future furniture and home-decor collections.
- Any future public inventory-facing page.

Do not import the prototype’s standalone header, sticky green cart header, Georgia/Inter typography, standalone footer, or global style reset.

### 3.2 Locked design system

Shop pages must use the existing TXUS visual system:

- Civic Industrial Stewardship design language.
- Existing TXUS typography and font declarations.
- Approved page-level backgrounds: `#f0f0f0` and `#f5f1e8`.
- Standard section divider: `border-t-2 border-b-2 border-stone-400`.
- Existing section spacing rhythm and `.container` alignment.
- Existing black product/image outlines where applicable.
- Existing green CTA treatment.
- Existing visible keyboard focus treatment.
- Existing responsive breakpoints and mobile navigation.

Shop controls may be compact and functional, but they must remain visually subordinate to and compatible with the established TXUS system.

### 3.3 Comparable card rule

Comparable product and category cards must use:

- Equal-height cards within the same grid row.
- `flex-column` content structure.
- Descriptions that are allowed to grow naturally.
- Product facts grouped consistently.
- Green CTA or action controls anchored at the same bottom spacing.
- Stable image frames that do not distort or crop products improperly.

This rule applies to product cards, collection cards, and future shop service-like cards.

---

## 4. Approved product hierarchy

Use the current TXUS catalog taxonomy unless Dev explicitly changes it:

```text
Shop Inventory
├── Lumber & Slabs
│   ├── Slabs
│   ├── Mantels
│   ├── Cookies & Rounds
│   ├── Beams
│   └── Dimensional Lumber
├── Furniture
│   ├── Dining Tables
│   ├── Conference Tables
│   ├── Benches
│   ├── Desks
│   └── Shelving
└── Home Decor
    ├── Cutting Boards
    ├── Charcuterie
    ├── River Rocks
    ├── Planters & Vases
    ├── Tea Light Holders
    ├── Wall Hangings
    └── Holiday Decor
```

Do not add another product-line layer unless TXUS explicitly requests it. Use filters and product attributes for further refinement.

The initial launch should avoid presenting empty or unapproved categories as if they are fully stocked. A category may be visible as “coming soon” only when that wording is intentionally approved for the live site.

---

## 5. Proposed route architecture

The following route map is the implementation target. Routes marked **proposed** require implementation and testing; the existing marketing routes must remain unchanged.

### 5.1 Shop entry and category routes

```text
/shop
/shop/lumber-slabs
/shop/lumber-slabs/slabs
/shop/lumber-slabs/mantels
/shop/lumber-slabs/cookies-rounds
/shop/lumber-slabs/beams
/shop/lumber-slabs/dimensional-lumber
/shop/furniture
/shop/furniture/dining-tables
/shop/furniture/conference-tables
/shop/furniture/benches
/shop/furniture/desks
/shop/furniture/shelving
/shop/home-decor
/shop/home-decor/cutting-boards
/shop/home-decor/charcuterie
/shop/home-decor/river-rocks
/shop/home-decor/planters-vases
/shop/home-decor/tea-light-holders
/shop/home-decor/wall-hangings
/shop/home-decor/holiday-decor
```

Only categories with approved public inventory should be promoted as active collection pages. Empty or unfinished categories may remain unlinked or use an intentionally no-indexed preparation route.

### 5.2 Product and cart routes

```text
/shop/product/:productId
/shop/cart
/shop/inquiry
```

A product ID must remain stable across inventory synchronization. A product URL must not depend on a changing display title, species spelling, or image filename.

A query-string inquiry route may be used when it is technically simpler, but product inquiries must preserve the product ID, product name, selected options, and customer context in a controlled way.

### 5.3 Marketing routes that must remain intact

The following existing route families must not regress:

```text
/
/about-us
/contact
/services
/services/*
/portfolio
/*-gallery
/blog
/blog/*
```

The `/shop` route should become a real integrated route, but it must not alter the established header navigation or footer structure unless a separate navigation change is approved.

---

## 6. Data architecture

### 6.1 Source of truth

The approved inventory workbook is the authoritative source for catalog records. A generated website-facing catalog projection may be produced from it, but the projection must not be edited manually as the source of truth.

Required provenance chain:

```text
Master Inv Workbook
        ↓
Approved synchronization / validation script
        ↓
Website catalog projection and image associations
        ↓
React shop pages and product detail views
```

### 6.2 Product record contract

The production product model should distinguish source fields, customer-facing fields, merchandising state, pricing, dimensions, and image associations. At minimum, the implementation should support:

```ts
type Product = {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  species?: string;
  originOrStory?: string;
  lengthIn?: number;
  widthIn?: number;
  widthMinIn?: number;
  widthMaxIn?: number;
  thicknessIn?: number;
  boardFeet?: number;
  boardFootRate?: number;
  sourcePrice?: number;
  salesPrice?: number;
  currency: "USD";
  imageCount?: number;
  linkedImageCount?: number;
  images: ProductImage[];
  merchandisingStatus: "PUBLIC" | "INQUIRY" | "HIDDEN" | "IMAGE_REVIEW" | "MISSING_DATA";
  fulfillment: "LOCAL_PICKUP" | "INQUIRY_ONLY";
  directCartEligible: boolean;
  surfacingOptions?: SurfacingOption[];
  updatedAt?: string;
};
```

The exact schema may be simplified during implementation, but the distinctions must not be lost:

- Source price is not automatically the customer sales price.
- Inventory image count is not the same as verified linked image count.
- Numeric price does not automatically mean a product is approved for direct cart.
- Missing data must not be filled by guessing.
- A product with unresolved image associations must be flagged rather than shown with invented or duplicated images.

### 6.3 Categories and filters

Shared high-level filters approved for consideration:

- Species / wood type.
- Length.
- Width.
- Thickness.
- Price.

Collection-specific filters may be added only when supported by inventory data and approved for that collection. A product detail field is not automatically a public collection filter.

Customer-facing measurements are in inches. Length filters use the approved floor-to-whole-inch rule:

- 36.99 inches displays and filters as 36 inches.
- 37.001 inches displays and filters as 37 inches.
- 24.99 inches displays and filters as 24 inches.
- 25.00 inches remains 25 inches.

Do not display decimal lengths in the public filter unless explicitly approved.

### 6.4 Pricing and board feet

The prototype currently uses a $12/BF board-foot rate for dimensioned slabs and mantels. This remains an open customer-facing approval until Dev confirms the rate is final.

Where applicable:

```text
Board feet × approved board-foot rate = calculated sales price
```

The product page should show the calculation inputs clearly when board-foot pricing is used. Cookies and rounds retain their existing sale prices until usable dimensions are available.

### 6.5 Lumber thickness accuracy

Where lumber thickness is shown, preserve the approved fractional conversions:

- 4/4 = 1 inch.
- 6/4 = 1.5 inches.
- 8/4 = 2 inches.
- 10/4 = 2.5 inches.

Do not round these values incorrectly or display a generic thickness conversion.

---

## 7. Image and gallery architecture

### 7.1 Storage

Large product and gallery assets must use the approved managed-storage workflow. Do not bulk-copy the prototype’s entire media tree into `client/public` or `client/src/assets`.

The production catalog must retain stable image associations and stable product IDs. Image filenames may be optimized, but product-to-image relationships must be preserved through a manifest or generated catalog field.

### 7.2 Rendition tiers

Use the approved rendition strategy:

| Use | Target tier | Behavior |
|---|---:|---|
| Product card | 400px maximum | `object-contain`; lazy-load below fold |
| Product detail | 800px maximum | Primary product image and selected thumbnail |
| Lightbox | 1200px maximum | Explicit click-to-enlarge only |

The original high-resolution source remains archived separately and must not be loaded into the collection grid by default.

### 7.3 Product gallery behavior

Product detail pages should:

- Show one primary image.
- Show verified associated images as thumbnails when available.
- Change the primary image when a thumbnail is selected.
- Open the selected image in a lightbox only after an explicit click.
- Never open a lightbox automatically on route load.
- Preserve the complete image rectangle with proportional scaling.
- Use `object-contain` for slabs, cookies, finished pieces, and technical products where cropping would remove meaningful information.
- Provide descriptive species/product alt text when the species is known.
- Flag missing or uncertain associations instead of inventing galleries.

### 7.4 Accessibility and performance

Every meaningful image must have descriptive alt text. When a distinct species is known, include it in the filename, alt text, caption, and nearby copy where truthful.

Use:

- Eager loading only for the primary above-the-fold image.
- Lazy loading for below-fold collection and gallery images.
- `decoding="async"` where appropriate.
- Stable aspect-ratio or explicit dimensions to reduce layout shift.
- Keyboard-reachable gallery controls and visible focus states.

---

## 8. Product page blueprint

Each product detail page should follow this structure:

1. Existing TXUS Navigation.
2. Breadcrumb or clear back link if approved for the shop experience.
3. Product image gallery.
4. Product title and species.
5. Product ID or stable inventory reference where customer-useful.
6. Dimensions and thickness.
7. Board feet and pricing basis when applicable.
8. Sales price or inquiry-only label.
9. Fulfillment statement: local pickup and no freight/shipping implied at launch.
10. Surfacing/planing selector when applicable.
11. Primary action: Add to cart, Ask about this item, or equivalent approved action.
12. Related products or return-to-collection path.
13. Existing TXUS Footer.

The primary action must reflect the record’s approved merchandising status. It must not imply a completed payment workflow if payment is not enabled.

Product copy should be concise and factual. Use species-specific language only when the source record or TXUS confirmation supports it.

---

## 9. Cart and fulfillment blueprint

### 9.1 Cart state

The prototype uses local storage. Before implementation, TXUS must confirm whether the launch cart should remain local-storage based or use a persisted server-side cart.

Recommended first production milestone:

- Local cart state for anonymous users.
- Stable product IDs in cart lines.
- Cart state resilient to route changes and page refresh.
- No false claim that inventory is reserved.
- Clear removal and quantity behavior.
- Selected surfacing/planing option stored with the cart line.
- Cart subtotal visible when prices are approved.
- No freight or shipping line unless a later fulfillment decision enables it.

### 9.2 Surfacing and planing options

For slabs and cookies/rounds, the prototype uses these fee bands:

- Up to 72 inches: $50.
- Over 72 through 120 inches: $75.
- Over 120 inches: $100.

These values require confirmation before becoming live customer-facing charges. The product page and cart must use the same calculation function and display the selected option clearly.

### 9.3 Fulfillment

Current direction:

- Local pickup.
- No freight or shipping charge implied.
- Pickup details and location instructions must be approved before launch.
- Furniture and finished products may eventually have a separate delivery/shipping pathway, but that must not be silently applied to local material inventory.

### 9.4 Inquiry and checkout boundary

Open decision gates:

- Inquiry-only launch.
- Payment-enabled checkout.
- Shopify, QuickBooks, or another approved commerce integration.
- Hybrid approach: direct cart for approved products and inquiry for others.

Until payment is explicitly enabled, the site must not use language such as “purchase complete,” “order confirmed,” “inventory reserved,” or “shipping calculated.”

The existing TXUS contact/modal workflow should remain the approved inquiry handoff unless a new form process is separately approved.

---

## 10. Marketing and shop navigation

The existing Navigation remains authoritative. The recommended addition is a single Shop entry that opens `/shop` and does not duplicate the existing Services or Blog menu structure.

Potential future navigation behavior:

- Shop → Shop landing.
- Shop landing → approved category pages.
- Category page → product details.
- Product detail → cart or inquiry.
- Cart → inquiry or approved checkout.

Do not add navigation entries for empty categories merely because they exist in the taxonomy. Do not replace the existing footer contact/social structure.

---

## 11. SEO blueprint

### 11.1 Page metadata

Every public shop page must use the existing `SEOHead` conventions with:

- Unique title.
- Unique meta description.
- One clear H1.
- Production canonical URL.
- Open Graph title, description, URL, type, and image.
- Twitter/X `summary_large_image` metadata where a suitable image exists.
- Page-specific image metadata.
- Appropriate structured data.

Recommended patterns:

```text
Shop | Texas Urban Sawmill
Texas Walnut Slabs | Texas Urban Sawmill
[Species] [Product Type] | Texas Urban Sawmill
```

Avoid exposing internal preview language in production metadata after the shop is approved for launch.

### 11.2 Product structured data

Product schema must not be added until the page visibly contains the required truthful fields. When appropriate, a product page may include:

- Product name.
- Description.
- Image URLs.
- SKU or stable product ID.
- Brand: Texas Urban Sawmill.
- Offers only when price, availability, currency, and purchase/inquiry behavior are accurate.

Do not publish fake availability, shipping, reviews, ratings, or payment offers.

### 11.3 Geographic positioning

Use the approved three-level model:

1. Central Texas for site-based services and local pickup.
2. Texas-wide for appropriate custom lumber, slabs, millwork, CNC, and laser work.
3. Selective national reach for furniture and finished products when delivery/shipping is operationally accurate.

Do not imply nationwide delivery for local tree, crane, transport, or pickup-only inventory.

### 11.4 Indexability

Index approved public shop and collection pages. Use no-index treatment for:

- Internal inventory review pages.
- Unfinished category routes.
- Test routes.
- Duplicate filter URLs when canonical consolidation is required.
- Preview-only routes that are not approved for public merchandising.

Update the sitemap only for approved public routes.

---

## 12. Backend and persistence plan

The current Phase II stack is React 19, Tailwind 4, tRPC 11, Drizzle ORM, and Manus storage. The integration should use the existing stack rather than mounting the prototype as a second application.

### Recommended implementation layers

```text
Catalog source / approved workbook
        ↓
Sync and validation layer
        ↓
Generated product projection or database tables
        ↓
tRPC read procedures
        ↓
Shop collection/product components
        ↓
Cart state and inquiry/checkout boundary
```

### Data migration principles

- Do not overwrite existing marketing data or routes.
- Do not edit the approved workbook from the website without a separate administrative workflow.
- Do not expose incomplete inventory records by default.
- Preserve stable product IDs and image associations.
- Keep catalog synchronization reproducible.
- Record the source workbook filename, date/version, and sync timestamp.
- Make failed or incomplete records visible in an internal report rather than silently dropping them.

A first implementation may use a generated catalog projection for read-only browsing. A later milestone may move approved product data into Drizzle-backed tables if server-side cart, inventory state, or administration requires it.

---

## 13. Implementation phases and approval gates

### Phase 0 — Blueprint and decisions

Deliverables:

- This approved blueprint.
- Final category and merchandising decisions.
- Cart/checkout decision.
- Fulfillment decision.
- Pricing and surfacing-fee confirmation.
- Public product eligibility rule.

Gate: Dev approval required before full catalog implementation.

### Phase 1 — Shell-integrated shop foundation

Already partially implemented:

- `/shop`.
- Representative slab collection.
- Shared Navigation and Footer.
- Approved section backgrounds and dividers.
- Initial SEO metadata.
- Equal-height product cards.

Remaining validation:

- Confirm final shop navigation placement.
- Confirm whether preview wording remains or is replaced.
- Add focused tests for route, metadata, card alignment, and product data contract.

Gate: review preview against this blueprint.

### Phase 2 — Catalog projection and collection pages

Implement:

- Approved synchronization from the master workbook.
- Public eligibility and missing-data rules.
- Lumber & Slabs collection routes.
- Filters for approved fields.
- Stable empty/loading/error states.
- Product card image tiers and metadata.
- Product counts that distinguish available, inquiry, hidden, and image-review records.

Gate: validate a representative set of real products before exposing the full catalog.

### Phase 3 — Product detail and gallery system

Implement:

- Stable product detail routes.
- 400/800/1200 image rendition usage.
- Associated-image thumbnail gallery.
- Click-to-enlarge lightbox.
- Species and dimension display.
- Board-foot calculation display where applicable.
- Inquiry or cart action based on approved merchandising state.

Gate: visual, accessibility, image-resolution, and route-stability review.

### Phase 4 — Cart and inquiry workflow

Implement only the approved behavior:

- Local-storage or server-side cart.
- Product line items.
- Surfacing/planing options.
- Local pickup message.
- No freight/shipping implication.
- Inquiry handoff or approved checkout integration.
- Clear confirmation behavior without claiming payment completion unless payment exists.

Gate: form/cart tests and explicit checkout decision.

### Phase 5 — Furniture and home-decor expansion

Add only after the material catalog foundation is stable:

- Furniture collections.
- Finished products with national delivery/shipping positioning where approved.
- Home decor collections.
- Product-specific metadata and image treatment.

Gate: category-specific merchandising and fulfillment approval.

### Phase 6 — Production launch

Before publishing:

- Full test suite passes.
- Production build passes.
- Desktop, tablet, and phone review passes.
- All public images resolve.
- Metadata and canonical URLs are correct.
- Sitemap and robots rules are correct.
- Cart/inquiry behavior is confirmed.
- Backup and checksum are created.
- Manus checkpoint is saved.
- GitHub is synchronized.
- Live domain is verified after publishing.

---

## 14. Testing and QA requirements

### Automated tests

Add focused tests for:

- Catalog record parsing and required fields.
- Public eligibility rules.
- Board-foot calculations.
- Price calculations.
- Surfacing/planing fee bands.
- Product image tier selection.
- Stable product IDs and slugs.
- Filter behavior.
- Cart add/remove/update behavior.
- Cart persistence behavior if local storage is used.
- Inquiry payload construction.
- SEO metadata and canonical URLs.
- No-index behavior for unfinished/internal routes.
- Equal-height product-card CTA structure where practical.

Run:

```bash
pnpm test
pnpm build
```

### Browser and responsive QA

Verify at phone, tablet, and desktop widths:

- Header and mobile menu.
- Shop landing cards.
- Filter controls and reset behavior.
- Product card alignment.
- Product detail gallery.
- Lightbox opening and closing.
- Cart layout.
- Inquiry or checkout handoff.
- Footer consistency.
- No horizontal overflow.
- Keyboard focus visibility.
- Image crop/contain behavior.
- Section background alternation and dividers.

### Data QA

Verify:

- Public counts match the approved generated projection.
- No missing price is displayed as a sale price.
- No missing image is represented by a duplicated image.
- Board-foot calculations match the approved rate.
- Product IDs remain stable through synchronization.
- Image count and linked image count remain distinct.
- Unapproved products do not appear in direct-cart flows.

---

## 15. Backup, versioning, and publishing workflow

All TXUS project documents, backups, workbooks, and archives must remain under the canonical Drive root:

```text
TXUS Manus AI/
├── E-Commerce/
│   ├── Master Inv Workbook/
│   └── Backups/
└── TXUS Marketing Website/
    └── Back-Ups/
```

Before each major integration milestone:

1. Confirm the current Manus checkpoint.
2. Confirm the current GitHub commit and branch status.
3. Preserve the prior approved marketing baseline.
4. Build a dated archive with source, documentation, assets, Git data, manifest, recovery guide, and SHA-256 checksum.
5. Use the next available same-day version (`V1`, `V2`, etc.).
6. Upload to the appropriate TXUS Manus AI Drive folder.
7. Verify Drive file IDs, parent folder, size, checksum, and links.
8. Save the new Manus checkpoint only after tests and visual QA.
9. Push the approved source to GitHub.
10. Publish only after Dev explicitly approves the live release.
11. Verify the live domain and label the result as checkpointed, pushed, or live—never interchangeably.

The current marketing-only backup remains the rollback point while shopping integration proceeds.

---

## 16. Open decisions requiring Dev confirmation

These items must not be assumed during implementation:

1. Should the first public launch expose all priced products, or only the current 65 `DIRECT_CART` records?
2. Are all current `$12/BF` calculations approved as customer-facing prices?
3. Are the $50/$75/$100 surfacing/planing fees final?
4. Is local pickup the only fulfillment method for the first launch?
5. Should the first launch be inquiry-only, cart-plus-inquiry, or payment-enabled?
6. Should cart state remain local-storage based or become server-persisted?
7. Which furniture and home-decor records are approved for public merchandising?
8. Should inquiry-only products be publicly browsable with an inquiry action, or hidden until priced/approved?
9. Is the current public category naming exactly approved for the navigation and page headings?
10. What pickup location, hours, lead-time language, and contact instructions are approved for publication?
11. Should customer-facing product IDs appear on public product pages?
12. Are national shipping/delivery claims approved for specific finished products?

Until these decisions are confirmed, implementation should use preview language, avoid payment claims, avoid inventory reservations, and keep uncertain products out of direct-cart flows.

---

## 17. Definition of done for the integrated website

The marketing-plus-shop website is ready for a new live baseline only when all of the following are true:

- The marketing website renders without regression.
- The shop uses the exact TXUS Navigation and Footer.
- The approved catalog is synchronized from the authoritative workbook.
- Product IDs, prices, dimensions, and image associations are validated.
- Public eligibility rules are approved and enforced.
- Product galleries use the 400/800/1200 rendition strategy.
- Product cards maintain equal heights and aligned green CTAs.
- Product detail pages work at all target viewports.
- Cart behavior matches the approved launch decision.
- Fulfillment language does not imply unsupported freight or payment.
- Inquiry confirmation behavior is tested.
- SEO metadata, canonical URLs, product schema, sitemap, and indexability are correct.
- Existing marketing navigation, footer, service pages, portfolio pages, blog pages, and contact workflow remain intact.
- Full tests and production build pass.
- Desktop, tablet, and phone visual QA pass.
- A dated backup, checksum, and recovery guide are stored under the TXUS Manus AI Drive root.
- GitHub is synchronized with the approved source.
- A new Manus checkpoint is saved.
- Dev explicitly approves publication.
- The live site is verified after publishing.

Until this definition of done is met, the site should be described as an integrated preview or working shop—not as a fully launched ecommerce catalog.
