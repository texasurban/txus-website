# TXUS Shopping Cart Integration Plan

**Project:** TXUS Website – Phase II  
**Prototype source:** `/home/ubuntu/txusshop`  
**Planning date:** 2026-11-09  
**Status:** Milestone 1 in progress: preview-only shell-integrated shop landing and slab collection added; no live publishing or baseline save performed.

## Non-negotiable site-shell requirement

All shopping pages must use the existing TXUS marketing website shell. The shopping prototype’s standalone header and footer must not be carried into the Phase II site.

Every shop-related route must render the established Phase II `Navigation` component at the top and the established Phase II `Footer` component at the bottom. This includes:

- `/shop`
- category and collection pages such as `/shop/lumber-slabs/slabs`
- product detail pages such as `/shop/product/:id`
- cart and checkout/inquiry views
- any future furniture, home-decor, or inventory-management-facing public pages

The existing marketing navigation, logo, Services and Blog menus, social links, mobile menu behavior, typography, colors, spacing, and footer contact structure remain authoritative. The shopping experience is an additional section of the TXUS website, not a separate microsite.

## Integration approach

The prototype is a static Vite application with a hash-based router, a client-side `catalog.json`, local-storage cart state, product galleries, filters, and a prototype inquiry form. Phase II is a React 19, Wouter, tRPC, Drizzle, and Manus WebDev application. The integration should therefore be a controlled React migration rather than copying the prototype shell or mounting the prototype as a second application.

The preferred implementation sequence is:

1. Create a shared shop layout or page wrapper that renders the existing `Navigation`, shop content, and existing `Footer` in that order.
2. Add the shopping routes to the Phase II Wouter route map while preserving every existing marketing, service, portfolio, blog, and contact route.
3. Port the prototype’s catalog browsing behavior into React components: category landing, collection filters, product cards, product detail, gallery/lightbox, cart panel/page, and inquiry/checkout handoff.
4. Preserve the prototype’s inventory rules: only products with confirmed sales prices appear in the public direct-cart catalog; inquiry-only records may remain available through an explicitly defined inquiry path; no freight/shipping should be implied for local pickup.
5. Preserve the product image rendition strategy: 400px card images, 800px detail images, and 1200px lightbox images, using `object-fit: contain`, descriptive species/product alt text, lazy loading for below-fold images, and eager loading only for primary above-the-fold imagery.
6. Use the existing TXUS contact/modal behavior for inquiry actions where appropriate. Cart or product inquiries must not bypass the established TXUS form and confirmation workflow without an explicit decision.
7. Add shopping-specific metadata through the existing SEO conventions, including canonical URLs, page titles, descriptions, social images, product image metadata, and no-index treatment for any internal-only or unfinished routes.
8. Preserve the project’s standing comparable-card rule: equal-height card layouts, flex-column content, descriptions allowed to grow, and consistently anchored green CTAs.

## Prototype behavior to preserve or consciously revise

The restored prototype currently contains 638 catalog rows, 545 rows with numeric prices, 523 products with linked image galleries, and 1,346 associated gallery images. The public prototype filters to priced products for direct catalog display. It currently identifies 65 `DIRECT_CART` rows and 573 `INQUIRY` rows.

The prototype supports:

- Shop category landing pages.
- Lumber & Slabs subcategories for slabs, mantels, cookies & rounds, beams, and dimensional lumber.
- Species, thickness, length, width, and price filtering.
- Product cards with dimensions, board feet, pricing, image-review status, and actions.
- Product detail pages with associated-image thumbnails and click-to-enlarge viewing.
- Local-storage cart behavior.
- Per-item surfacing/planing options for slabs and cookies/rounds, with the prototype’s current $50/$75/$100 fee bands.
- Local pickup language with no freight or shipping charge.
- Inquiry-only handling for products that are not direct-cart eligible.

Before production use, the following must be confirmed rather than assumed:

- Whether the initial launch uses local-storage cart state or a persisted authenticated/server-side cart.
- Whether checkout is inquiry-only, payment-enabled, or connected to Shopify/QuickBooks through an approved integration.
- Whether all 638 catalog rows should be publicly browsable or whether a final merchandising/status field is required beyond numeric price.
- Whether the prototype’s 65 direct-cart products are approved for live purchase.
- Whether the $12/BF rate and surfacing fees are final customer-facing prices.
- Whether local pickup is the only fulfillment method at launch.

## Asset migration rules

The prototype’s catalog and optimized product assets are not to be copied into the Phase II `client/public` directory as a bulk local-media dump. The Phase II project guidance requires large media to use managed storage or an approved production asset workflow.

The integration should preserve the prototype’s asset history and manifests, then move or reference the approved optimized renditions through the production-safe storage path. The catalog should retain stable product IDs and image associations so future inventory synchronization does not break product URLs or gallery references.

The authoritative inventory workbook remains the source of truth. `public/catalog.json` is a generated projection and should not be edited independently of the approved synchronization workflow.

## Design adaptation rules

The shop should visually belong to TXUS while remaining recognizable as a catalog experience. Use the existing Phase II design tokens, page backgrounds, section dividers, typography, focus states, responsive breakpoints, and CTA treatment. Do not import the prototype’s separate Georgia/Inter shell, sticky header, green cart header, or prototype footer as global styles.

Shop-specific controls may have their own compact styling, but they must use the Phase II visual language and must not alter the established marketing navigation/footer. Product cards must follow the project’s equal-height/flex-column rule. Long product descriptions should grow within the card, and green actions should align consistently along the bottom of comparable cards.

## Verification gates before implementation is considered complete

- Existing marketing routes render the same Navigation and Footer as before.
- Every shop route renders the exact same Navigation and Footer components.
- Desktop, tablet, and phone layouts are checked for navigation, filters, product cards, cart, galleries, and footer behavior.
- Product image requests resolve through the approved storage path and use the intended 400/800/1200 rendition tiers.
- Cart and inquiry behavior are tested without implying live payment until payment is explicitly enabled.
- Product cards maintain equal heights and bottom-aligned CTAs.
- Existing test suite and production build pass.
- Public shop routes have page-specific metadata and canonical URLs.
- Internal or unfinished routes are excluded from indexing.
- A new Manus checkpoint and a dated downloadable reconstruction backup are created before any major shopping integration milestone.

## Current conclusion

The shopping prototype is a useful behavior and catalog reference, but it must be integrated into the Phase II React application as a new routed section under the existing TXUS marketing shell. The prototype header and footer are explicitly rejected for production integration. The first implementation milestone should be a shell-integrated shop landing page and one representative product collection, followed by review before expanding to the full catalog and cart workflow.
