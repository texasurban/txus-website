# TXUS Master Board-Foot Table & Live Species-Rate Pricing System

**Delivery Report — 2026-11-09**
**Texas Urban Sawmill · Shopping Prototype Phase 2**

---

## 1. Executive Summary

All four deliverables requested for the TXUS shopping prototype pricing integration have been built, wired end-to-end, and verified in the real running application:

| Deliverable | Status | Location |
|---|---|---|
| Centralized database pricing table for species rates | **Done** | MariaDB `txus_dev`, tables: `speciesPricing`, `speciesPricingHistory`, `productPricingOverrides`, `pricingMeta` |
| Shared pricing calculation service for board-foot products | **Done** | `shared/pricing.ts` (pure engine) + `server/pricing.ts` (cached snapshot, versioning, catalog, revalidation, inquiry payloads) |
| Admin pricing manager with change history & product overrides | **Done** | `client/src/pages/AdminPricing.tsx` at route `/admin/pricing` |
| Cart & catalog revalidation for near-real-time price updates | **Done** | `client/src/lib/cart.tsx`, 25-second catalog polling, tab-return revalidation, price-change notice banners |

69 automated tests pass (16 pricing-specific), plus 6/6 end-to-end API scenario tests, and 18 visual screenshot checks of the real application.

---

## 2. Architecture

### 2.1 Pricing Hierarchy (per approved Pricing Rules sheet)

Every price on the site is computed by a single function — `computePrice(product, snapshot)` in `shared/pricing.ts` — following this strict priority:

1. **Approved product-level override** (highest priority) — `board_foot` rate override, `fixed` price, or `inquire`.
2. **Cookies & rounds fixed-sale-price rule** — pieces in Cookies & Rounds (or priced `EXISTING_SALE_PRICE_NO_DIMENSIONS`) retain their existing sale price whenever dimensions are missing, **with precedence even over an approved species rate**.
3. **Current species rate** — `board_foot` (BF × $/BF), `fixed`, or `inquire`, looked up by canonical species with fallback to generic species.
4. **Default pricing rule** — `$12.00/BF` for board-foot categories (slabs, mantels, beams, dimensional lumber), retaining Dev's working rate from the master inventory Pricing Rules sheet.
5. **Inquire** — fallback for anything unpriceable.

### 2.2 Board-Foot Formula

$$\text{BF} = \frac{\text{Length (in)} \times \text{Average Width (in)} \times \text{Thickness (in)}}{144}$$

$$\text{Price} = \text{BF} \times \text{Rate (\$/BF)}$$

Board feet is treated as an optional reference figure (customer-facing length filters use the floored whole-inch value per TXUS catalog rules).

### 2.3 Additional Built-in Rules

- **Floored lengths:** `floorLength(inches) = Math.floor(inches)` for customer-facing filters (36.99″ → 36″).
- **Species normalisation:** provenance-qualified duplicates collapse to generic species (e.g., *Texas Pecan* → *Pecan*) for the customer species filter.
- **Surfacing/planing add-on:** $50 ≤72″, $75 ≤120″, $100 &gt;120″ per piece; surfaced products only (slabs, cookies).
- **Local pickup:** fixed $0 freight; freight/delivery quoted on request.

---

## 3. Database Schema

Tables created in the MariaDB database `txus_dev` (Drizzle-managed, migration `drizzle/0003_stiff_mentallo.sql`):

| Table | Purpose |
|---|---|
| `products` | 647 inventory records imported from `txus-inventory-master.xlsx` |
| `speciesPricing` | 20 canonical species with `boardFootRate`, `pricingMethod`, `status`, `effectiveDate`, `notes` |
| `speciesPricingHistory` | Append-only audit trail: `oldRate`, `newRate`, `oldMethod`, `newMethod`, `changedBy`, `changeReason`, `changedAt` |
| `productPricingOverrides` | Product-level overrides outranking species rates |
| `pricingMeta` | Key/value store for `defaultBoardFootRate` ($12.00) and `pricingVersion` |
| `cartInquiries` | Customer inquiries with pricing version snapshot, totals, and payload JSON |
| `cartInquiryItems` | Inquiry line items with calculated prices and rates used |

**Seeded data:** 20 species rates all initially set to Dev's working rate of $12.00/BF; 1 sample override (`108-010`, clearance $10.00/BF); 26 audit-history entries.

---

## 4. Shared Pricing Service (`shared/pricing.ts` + `server/pricing.ts`)

| Function | What it does |
|---|---|
| `boardFeet(...)` | Computes board feet with average-width fallback |
| `computePrice(product, snapshot)` | Central pricing engine enforcing the full hierarchy |
| `revalidateCart(...)` | Compares cart-stored `selectedPrice` against live snapshot; returns `changed: boolean` and per-item `changeNotice` strings |
| `revalidateCartItem(...)` | Single-item revalidation used by both client and server |
| `buildInquiryPricing(...)` / `buildInquiryPriceFields(...)` | Builds `{board_foot_rate_used, calculated_price, pricing_version, rate_source, pricing_formula}` stamped into every inquiry |
| `floorLength(...)`, `surfacingFee(...)`, `genericSpecies(...)`, `canonicalSpecies(...)` | Catalog rule helpers |

**Near-real-time propagation:**

1. Every rate change writes to `speciesPricingHistory` and automatically bumps `pricingVersion` (ISO timestamp) in `pricingMeta`.
2. The server-side snapshot is cached in memory with a **15-second TTL**; the admin interface can also force a version bump/cache invalidation at any time.
3. The catalog endpoint polls every **25 seconds** (`refetchInterval: 25_000`), so price edits propagate to browsing customers within ~25–40 seconds.
4. The cart revalidates **on mount, on each version change, and on tab-return** (`visibilitychange`), and a manual "Revalidate Prices" button is always available.
5. Changed prices produce a dismissible amber banner explaining the update before the customer can proceed.

---

## 5. Admin Pricing Manager (`/admin/pricing`)

- **PIN gate:** `ADMIN_PIN` env var (default in prototype mode: `txus2026`). The gate screen tells prototype reviewers the PIN. Unlocks full editing capabilities with session-cookie authentication.
- **KPI strip:** species configured (20), default working rate ($12.00/BF), active product overrides, change-history count.
- **Tabs:**
  - **Species Rates** — editable table (rate, method, status, effective date, notes), search filter, "+ Add Species", edit dialog that writes change reasons to the audit log.
  - **Product Overrides** — table of active overrides with add/delete actions.
  - **Change History** — append-only audit trail filterable by species, showing old → new rates, author, reason, timestamp.
  - **Defaults** — editable global default board-foot rate.
- **"Bump Version"** button to force immediate cache invalidation.
- Discreet footer link ("Pricing Manager") so the interface is discoverable across the whole site.

---

## 6. Customer-Facing Shopping Experience

| Route | Page | Key features |
|---|---|---|
| `/shop` | Shop by Category | Equal-height cards with anchored green CTAs (project instruction compliant), live species-rate preview strip, trust FAQ |
| `/shop/lumber-slabs` | Lumber & Slabs hub | Subcategory cards for slabs, mantels, cookies, beams, dimensional lumber; pricing rule explanation |
| `/shop/lumber-slabs/slabs` | Slabs listing | Species dropdown (generic species, collapsed duplicates), thickness/length/price sliders, search, sort, equal-height product cards with bold live prices and anchored green "Add to Cart" CTAs |
| `/shop/lumber-slabs/mantels` | Mantels listing | Same shared listing engine |
| `/shop/lumber-slabs/cookies-rounds` | Cookies listing | Fixed-price rule visible: cookies retain existing sale prices |
| `/shop/lumber-slabs/beams`, `…/dimensional-lumber` | Beams & lumber | Board-foot pricing |
| `/shop/product/:id` | Product detail | Real photograph gallery with thumbnails, click-only lightbox, large live price + formula + rate source, surfacing add-on checkbox, quantity, Add to Cart, full dimensions & measurements table |
| `/cart` | Cart | Live prices per item, surfacing fee add-ons, quantity +/- , revalidation banners, local pickup $0, order summary |
| `/checkout` | Reserve / Checkout | Contact form, cart review, priced-at-submission snapshot, confirmation code (`TX-XXXXXX`) |

**Real photos verified:** `WA 101-101.jpeg` (Texas Walnut slab) and others downloaded via the authenticated Google Workspace connector and served through the enhanced `/manus-storage` storage proxy. Products without verified images render a species-tuned wood-tone placeholder card — never a broken image icon.

---

## 7. How to Run

```bash
# 1. Start MariaDB (already configured with txus_dev database)
sudo service mariadb start

# 2. In repository root
cd /home/ubuntu/txus-website-repo

# 3. Environment (already set up in .env)
DATABASE_URL=mysql://txus:txuspass@localhost:3306/txus_dev
PORT=3000
ADMIN_PIN=txus2026

# 4. Dev server
pnpm run dev
# -> http://localhost:3000

# 5. Type-check & test suites
pnpm run check        # TypeScript check
pnpm run test         # 69 unit/integration tests
node scenario.mjs     # 6 end-to-end API scenario tests
```

**Admin access:** visit `/admin/pricing`, enter PIN `txus2026`.

**Seeding (if resetting database):**

```bash
python3 server/seed.py    # re-seeds 647 products + 20 species rates + 1 override
```

---

## 8. Verification Evidence

| Evidence | Result |
|---|---|
| Vitest suite (`pnpm run test`) | **69/69 passed** (16 pricing-specific tests) |
| TypeScript check (`pnpm run check`) | **0 errors** across entire codebase |
| E2E API scenarios (`scenario.mjs`) | **6/6 passed**: snapshot versioning, computed catalog prices, fixed-price cookies, mantel pricing, cart revalidation notices, inquiry version stamps |
| Screenshot: `/shop` | Landing renders with logo, live default-rate notice, equal-height cards |
| Screenshot: `/shop/lumber-slabs/slabs` | Filters working, product cards with bold live prices, anchored green CTAs |
| Screenshot: product detail | Real Texas Walnut photograph renders, live price $159.36, surfacing add-on, dimensions table |
| Screenshot: admin manager | PIN gate, 4 KPI cards, 20 species rows, overrides tab, change history tab |
| Screenshot: live rate change | Pecan edited to $14.00, version bumped, history entry #25 recorded, then reverted |
| Screenshot: cart revalidation | Stale $99 price detected → amber notice banner shown → unit price updated to $159.36 |
| Screenshot: checkout | Inquiry submitted, stored in MariaDB with pricing version |
| Screenshot: inquiry API | Returned code `TX-2T0LFJ` stored in `cartInquiries` with version `2026-11-09T17:50:42.612Z` |

Screenshots are saved in `/home/ubuntu/screenshots/`.

---

## 9. Next Steps (Recommended)

1. **Review & refine species rates** — currently all 20 species start at Dev's working rate of $12.00/BF. Dev can adjust each species (Pecan, Walnut, Mesquite, Live Oak, etc.) anytime at `/admin/pricing`.
2. **Backfill cookie prices & missing dimensions** — 29 duplicate cookie rows have no price; dimensions for rounds are still being collected. When entered, the pricing engine will automatically switch them to board-foot pricing.
3. **Mass-sync product images** — 18 demo images downloaded; a one-time authenticated batch download through the Google Workspace connector can populate the remaining ~1,300 product images.
4. **Deploy** — MariaDB data persists; for production hosting, point `DATABASE_URL` at a managed MySQL/TiDB database, set a real `ADMIN_PIN` (or tie to Manus OAuth), and run `pnpm run build && pnpm run start`.
5. **Shopify / QuickBooks sync** — the `buildInquiryPricing()` helper and the `pricing.snapshot` endpoint are ready to feed external systems so all channels compute prices identically.
