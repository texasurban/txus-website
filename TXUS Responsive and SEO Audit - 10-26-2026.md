# TXUS Responsive and SEO Audit

**Project:** Texas Urban Sawmill Website  
**Audit date:** October 26, 2026  
**Scope:** Existing website only. Read-only responsive visual review, route/navigation verification, static source audit, live DOM checks, crawl-file review, and image-loading checks.  
**Design/content boundary:** No website source files, visible copy, layout, styling, navigation, or assets were changed during this audit.

## Executive summary

The TXUS website is visually strong across the audited desktop, tablet, and phone screenshots. The core design system is consistent: navigation and footer styling are stable, approved alternating section surfaces and dividers are present, service cards preserve equal-height behavior with bottom-aligned green CTAs, and the Portfolio gallery pages render cleanly.

The most important confirmed issues are technical or navigation-related rather than visual redesign issues:

1. The shared **Shop** navigation item currently resolves to the 404 page because no `/shop` route is declared.
2. The eight portfolio gallery pages use canonical URLs without the hyphenated route format used by the actual routes and sitemap, and they do not emit `og:image` or `twitter:image` metadata.
3. The Blog index renders no `<h1>` in the live DOM. The article sample renders two `<h1>` elements: the hero title and the primary article heading.
4. Several image references still point to external Squarespace/CloudFront-style assets instead of project storage.
5. Most image tags do not declare explicit width/height or an aspect-ratio class. Existing fixed-height wrappers reduce some risk, but this should be addressed selectively for high-impact images.
6. Some blog cards still link to placeholder or unresolved routes. This is visible content and remains approval-gated.

The audit found **no confirmed horizontal overflow** at the live desktop viewport after rendered DOM checks, and the sampled live pages showed **zero broken images and zero missing alt attributes** after scrolling through the page.

## Responsive visual coverage

The routed public page set contains 30 pages. Full-page screenshots were captured at all three target viewport families:

- **Phone:** 390 × 844
- **Tablet:** 768 × 1024
- **Desktop:** 1440 × 900

Coverage included the homepage, core pages, all six service pages, the Blog index, all current blog articles, Portfolio, and all eight portfolio gallery routes.

### Visual result

- No obvious horizontal scrolling or clipped page content was observed in the screenshot review.
- Navigation remains usable at the audited widths.
- Service-card grids collapse appropriately on smaller widths, and the equal-height/bottom-CTA pattern remains intact on the Services page.
- Portfolio gallery layouts adapt from multi-column compositions to stacked mobile presentations without visible content loss.
- Footer contact panels remain readable and retain their consistent dark charcoal treatment.
- The approved section-divider and alternating-background system is visible on the audited homepage, Services page, Portfolio page, and content pages.
- Blog and article hero layouts remain readable on phone, tablet, and desktop.

### Screenshot-only caveat

A few full-page screenshot captures showed blank-looking regions for lazy-loaded imagery while the browser was capturing the page. This was not treated as a confirmed broken-image defect: after live browser scrolling, the sampled Home, Services, Blog, gallery, and Climate-Smart article pages reported zero broken images and all inspected images completed successfully. The remaining recommendation is to keep above-the-fold hero images eager or otherwise explicitly prioritized.

## Confirmed SEO and navigation findings

### P0 — navigation defect requiring a decision

#### Shared Shop link resolves to 404

The shared navigation includes `/shop`, but the route map does not declare a Shop page. Live navigation to `/shop` returns `Page Not Found`, and `/shop` is not present in the sitemap.

**Decision required:**

- Add the intended Shop page or external destination; or
- Remove/rename the Shop navigation item.

Do not silently redirect it to an unrelated page.

### P1 — canonical and social metadata fixes

#### Portfolio gallery canonical URLs do not match their actual routes

The actual routes use hyphenated slugs, for example `/stinson-gallery`, while the page metadata currently emits values such as `/stinsongallery`. The same pattern affects the other gallery pages:

- `/stinsongallery` vs `/stinson-gallery`
- `/omegagallery` vs `/omega-gallery`
- `/ibeamgallery` vs `/ibeam-gallery`
- `/pecanbunkergallery` vs `/pecan-bunker-gallery`
- `/familylegacygallery` vs `/family-legacy-gallery`
- `/goldwalnutgallery` vs `/gold-walnut-gallery`
- `/hillcogallery` vs `/hillco-gallery`
- `/pecantrestlegallery` vs `/pecan-trestle-gallery`

The live Stinson gallery check confirmed the canonical mismatch. These should be corrected to the actual public route and sitemap URL.

The same eight gallery pages currently have no `og:image` or `twitter:image` in the live head. Each should receive its existing composite/project image as invisible social metadata.

### P1 — heading hierarchy

- The live Blog index has no `<h1>` element. Its hero title is rendered visually but not as an H1.
- The sample Climate-Smart article renders two H1 elements: the hero title and the article’s primary title. Use one H1 for the page’s primary topic and demote the other visual title to an appropriate heading level without changing the visible wording or overall design.

### P1 — above-the-fold hero loading

The Wood Innovations article’s hero image is marked `loading="lazy"` even though it is the primary hero image. The hero should be prioritized/eager or otherwise loaded without competing with below-fold content. This is an invisible loading change and should preserve the current image and crop.

### P1 — external image dependencies

Static inspection found direct external image sources in:

- `client/src/pages/ServiceTreeReuse.tsx`
- `client/src/pages/BlogArticles/HillcoPartners.tsx`
- `client/src/pages/BlogArticles/InksLakeSP.tsx`
- `client/src/pages/BlogArticles/WoodInnovationsGrant.tsx`

These references should be migrated only after confirming the exact intended asset. Preserve the visible image, crop, and alt text; do not substitute an approximate image.

### P2 — image layout stability

The source contains 113 image tags; 112 do not declare explicit width/height attributes or an obvious aspect-ratio utility in the tag itself. Existing fixed-height hero containers and card wrappers reduce the practical risk on many pages, but the highest-impact content images should receive stable dimensions or aspect-ratio wrappers to reduce cumulative layout shift.

Recommended focus order:

1. Blog/article hero and lead images.
2. Portfolio gallery composites.
3. Service-card images.
4. Homepage partner/customer logos and below-fold galleries.

### P2 — structured data coverage

The shared `SEOHead` component supports JSON-LD, but the current route source explicitly supplies schema on only the Wood Innovations article. This leaves the other article pages, service pages, and business-level pages without structured-data coverage.

Any future schema pass must use Dev-approved business facts. Do not invent address, telephone, coordinates, service radius, awards, reviews, or claims.

Required future schema fields remain:

- `LocalBusiness`: name, logo, URL, telephone, geo, areaServed, and address.
- `Service`: serviceType, provider, description, and areaServed.
- `Article`/`BlogPosting`: headline, description, image, author, publication date, and modification date.

## Approval-gated visible-content findings

### Blog placeholder and unresolved links

The Blog index visibly contains “Coming Soon” cards and links including:

- `/blog/sawmill-1`
- `/blog/exterior-1`
- `/blog/facility-1`
- `/blog/kiln-1`
- `/blog/texas-parks-wildlife-award`

These should not be removed, rewritten, or replaced without explicit content approval. Options include completing the articles, removing the cards, or temporarily disabling/removing the unresolved links.

### Geographic, B2B, and species copy

The master TXUS SEO strategy supports Central Texas first, Texas statewide second, and national reach for finished furniture and products. Any additional city targeting, trade terminology, or species claims should remain natural and approval-gated. Do not create doorway pages or infer wood species from appearance.

## What passed

- 30 public routes received metadata source coverage checks.
- Public route source modules contain `SEOHead` with title, description, and canonical/url inputs.
- No temporary Manus preview-domain references were found in audited public page source.
- Literal production canonical strings audited were on `https://txurbansawmill.com`.
- `robots.txt` points to `https://txurbansawmill.com/sitemap.xml`.
- Sitemap contains the 30 intended public URLs audited; redirect-only routes are excluded.
- Live Home, Services, Blog, Climate-Smart article, and Stinson gallery checks found no missing image alt attributes.
- Live Home, Services, Blog, Climate-Smart article, and Stinson gallery checks found zero broken images after page scrolling.
- Live Home, Services, and Stinson gallery checks found no horizontal overflow at the browser’s 1280px viewport.
- Service CTA buttons retain the `mt-auto` bottom-anchor pattern and visible focus-ring utility classes.

## Recommended implementation order

1. Decide the `/shop` destination.
2. Correct gallery canonical URLs and add gallery social images.
3. Normalize Blog/article H1 hierarchy.
4. Make the Wood Innovations hero non-lazy.
5. Migrate confirmed external images into project storage.
6. Add targeted image dimensions/aspect-ratio wrappers.
7. Expand structured data only after business facts are approved.
8. Resolve Blog placeholder links after content decisions.
9. Re-run tests, build, representative live DOM checks, and the three-viewport screenshot pass.

## Audit conclusion

The responsive visual presentation is in good shape and does not need a design rewrite. The next work should be a focused technical compliance pass, starting with the broken Shop navigation destination and gallery metadata corrections. The visible design and approved content can remain locked while these invisible or routing-level issues are resolved.
