# TXUS SEO Baseline Audit

**Project:** Texas Urban Sawmill Website  
**Audit date:** October 20, 2026  
**Scope:** Existing project code and crawl-control files only; no broad external research and no visible copy changes.

## Executive summary

The TXUS website has a solid SEO foundation: the shared `SEOHead` component is present, the project now uses the approved production-domain pattern in client metadata, blog articles have page-specific social images and article types, and `robots.txt` plus `sitemap.xml` are present.

The site is **not yet fully SEO-compliant** under the master TXUS rules. The highest-priority remaining work is invisible implementation work and can be completed without changing visible copy. A smaller group of findings—primarily placeholder blog links and copy-level geographic or trade language—requires Dev’s explicit content approval before changes are made.

This audit does not guarantee rankings. It establishes the technical and content-governance baseline needed to pursue strong first-page visibility in Texas, with Central Texas as the primary market and selective national reach for furniture and finished products.

---

## What is already in place

### Metadata architecture

- `client/src/components/SEOHead.tsx` exists and supports title, description, URL, canonical URL, image, Open Graph/Twitter metadata, and JSON-LD schema.
- Explicit canonical URL handling is implemented.
- Blog article pages use `type="article"` and page-specific hero images where available.
- Client-side preview-domain references were removed from the audited metadata set.
- The SEOHead test suite includes canonical handling coverage.

### Crawl controls

- `client/public/robots.txt` exists and points to the production sitemap.
- `client/public/sitemap.xml` exists and includes the principal service, blog, portfolio, gallery, About Us, and Contact routes.
- Redirect routes remain in place for `/learn-more` → `/about-us` and `/services/furniture` → `/portfolio`; redirect-only routes should not be added to the sitemap.

### Quality gates

- Vitest: **52 tests passed**.
- Production build: **successful**.
- TypeScript and language-service health: no reported errors at the latest project check.
- The equal-height service-card and bottom-aligned CTA rule remains preserved.

---

## Findings by priority

### High priority — fix before production SEO review

#### 1. Expand social-image coverage beyond the current subset

Only some pages currently pass an `image` to `SEOHead`. The homepage and blog articles have coverage, but the main Services page, individual service pages, About Us, Portfolio, Contact, and several gallery pages should receive appropriate page-specific Open Graph/Twitter images.

**Recommended action:** Add the existing relevant hero or project image to each page’s invisible metadata. Do not create new visible copy.

#### 2. Add appropriate structured data

Only one article currently passes a schema object to `SEOHead`. The master strategy calls for structured data where approved factual values are available.

Required fields for future implementation:

- `LocalBusiness`: `name`, `logo`, `url`, `telephone`, `geo`, `areaServed`, and `address`.
- `Service`: `serviceType`, `provider`, `description`, and `areaServed`.
- Article pages: accurate headline, description, image, author, publication date, and modification date.

**Approval/data dependency:** Do not invent or infer the public address, telephone number, or coordinates. Dev must approve those values before LocalBusiness schema is added.

#### 3. Add image loading and layout-stability attributes systematically

The audit found many below-fold images without an explicit `loading` attribute. This is most visible in older gallery pages, project articles, and some service pages.

**Recommended action:**

- Add `loading="lazy"` to below-fold gallery and article images.
- Keep the primary above-the-fold hero image non-lazy when it is the main visual.
- Add stable width/height or aspect-ratio wrappers where layout shift is possible.
- Preserve the existing crop and visual presentation.

This is an invisible performance change and does not alter visible copy.

#### 4. Remove remaining external image dependencies where possible

At least one service page and portions of the Inks Lake article still reference external CloudFront/session image URLs rather than project storage paths.

**Recommended action:** Migrate approved assets to the project storage workflow, update references, and verify that alt text and image URLs remain correct. Do not replace or remove an image without confirming that the replacement is the same intended asset.

#### 5. Add explicit no-index handling for non-content routes

`ComponentShowcase.tsx` and `NotFound.tsx` do not use `SEOHead`. They should not become accidental indexable content routes.

**Recommended action:** Add a supported `noindex` option to `SEOHead` or use an equivalent route-level mechanism for internal showcase and not-found pages. Keep public content pages indexable.

---

### Medium priority — improve during the first compliance pass

#### 6. Complete image-specific alt-text and species review

Alt text is generally present, but a second pass should confirm that known species are named when visually and factually appropriate. Relevant TXUS examples include Texas Pecan, Bald Cypress, Spalted Hackberry, Mesquite, Texas live oak, and post oak.

Do not guess species from appearance. When the species is known, align the filename, alt text, caption, and nearby approved copy where appropriate.

#### 7. Add dimensions and responsive image behavior

Many images use responsive CSS classes but do not expose explicit dimensions. Add stable dimensions or aspect-ratio containers to high-impact hero, card, and gallery images to reduce Cumulative Layout Shift.

Use the existing visual layout; do not resize or recrop images as part of the SEO pass without approval.

#### 8. Verify every indexable route has unique metadata

The current audit found that several pages use the `canonical` prop rather than `url`; this is valid because the shared component now honors explicit canonical URLs. Continue checking that every public route has a unique title, description, canonical, and—where practical—social image.

#### 9. Verify production-domain consistency after deployment

The code is now aligned to `https://txurbansawmill.com`, but the deployed project currently reports a Manus-hosted domain as available. Before production release, confirm that the approved custom domain is active and that canonical, sitemap, Open Graph, Twitter, and schema URLs all resolve to the same final domain.

---

### Approval required before visible-content changes

#### 10. Placeholder and broken blog links

`Blog.tsx` still contains “Coming Soon” cards and placeholder links such as `/blog/sawmill-1`, `/blog/exterior-1`, and `/blog/facility-1`. These are visible content and should not be changed without Dev’s approval.

Potential approved options are:

- Replace placeholders with completed articles.
- Remove placeholder cards.
- Keep them temporarily but prevent them from being included in the sitemap and avoid broken navigation.

No option should be implemented silently.

#### 11. Geographic and trade copy expansion

The master strategy recommends natural city references and explicit B2B terminology. Any new visible references to Austin, Dripping Springs, Blanco, Wimberley, Fredericksburg, statewide delivery, structural timber, commercial millwork, or similar language require Dev’s copy approval.

The approved hierarchy is:

1. Central Texas.
2. Texas statewide.
3. National furniture and finished products.

Avoid repeated city lists and thin doorway pages.

#### 12. Claims, reviews, and business facts

Do not add LocalBusiness schema, review markup, local citations, or new service-area claims until the business address, telephone, coordinates, approved service radius, and any public profile information are confirmed.

---

## Recommended implementation sequence

### Pass 1 — invisible technical SEO

1. Add page-specific Open Graph/Twitter images to public pages.
2. Add `loading="lazy"` to appropriate below-fold images.
3. Add stable dimensions/aspect-ratio wrappers where needed.
4. Migrate remaining approved external image URLs into project storage.
5. Add `noindex` support for Component Showcase and Not Found routes.
6. Verify canonical, sitemap, robots, redirect, and production-domain behavior.

### Pass 2 — structured data

1. Obtain Dev-approved public business facts.
2. Add LocalBusiness schema with all required fields.
3. Add Service schema to the six service pages with accurate area coverage.
4. Add or normalize Article/BlogPosting schema for blog articles.
5. Validate that schema matches visible, approved content.

### Pass 3 — approval-gated content improvements

1. Decide how to handle placeholder blog cards.
2. Approve any city-specific or statewide service language.
3. Approve trade/B2B terminology and any new capability descriptions.
4. Approve species names where the source material is confirmed.

### Pass 4 — verification

1. Run all tests and the production build.
2. Walk the public routes and verify navigation, redirects, images, and forms.
3. Inspect page source/head metadata on representative home, service, blog, portfolio, About Us, and Contact pages.
4. Check keyboard focus and image alt text.
5. Record unresolved items for the quarterly SEO review.

---

## Audit conclusion

TXUS is ready for a structured SEO compliance pass. The foundation is good, and the highest-value remaining work is mostly invisible technical implementation rather than rewriting the website. The next step should be **Pass 1**, beginning with social-image coverage, image loading/layout stability, external-image migration, and no-index handling.

Visible copy, city targeting, trade terminology, and business facts will remain approval-gated.
