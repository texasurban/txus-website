# TXUS Pending Action Items Document

**Project:** Texas Urban Sawmill Website  
**Created:** October 20, 2026  
**Purpose:** Track launch preparation and post-launch work without changing the locked website design or visible content automatically.

## Operating rules

- The current website design and visible content remain locked.
- No website modification is made unless Dev explicitly says **“proceed.”**
- Findings, recommendations, invisible technical changes, and approval-required changes must remain clearly separated.
- External image migration is intentionally deferred until the actual production domain and final asset paths are confirmed.
- Preserve the existing Navigation, Footer, service-card alignment, compact page rhythm, and approved content.

## Before launch

### Production-domain verification

- [ ] Confirm the approved production domain is active.
- [ ] Confirm all canonical URLs use the final production domain.
- [ ] Confirm `robots.txt`, `sitemap.xml`, Open Graph, Twitter, and JSON-LD URLs use the final domain.
- [ ] Confirm preview or temporary Manus domains do not appear in production metadata.
- [ ] Verify redirects for `/learn-more` → `/about-us` and `/services/furniture` → `/portfolio`.

### SEO and technical QA

- [ ] Run the final public-route metadata check for titles, descriptions, canonicals, social images, and article types.
- [ ] Verify `robots.txt` and sitemap contents against the final public route list.
- [ ] Verify `ComponentShowcase` and `NotFound` remain no-indexed and are not in the sitemap.
- [ ] Validate JSON-LD after approved business facts are available.
- [ ] Confirm the official TXUS address, telephone number, coordinates, logo URL, and service areas before adding or finalizing LocalBusiness schema.
- [ ] Run the complete test suite and production build.
- [ ] Perform a final keyboard-focus and alt-text QA pass.
- [ ] Test contact-form behavior and social links.
- [ ] Confirm no broken internal links or image references on public routes.

### Image and performance QA

- [ ] Complete byte-level inspection of project-storage images where access is available.
- [ ] Compare internal images against TXUS defaults: approximately 1200 × 1200 px at 72 DPI unless the layout requires another ratio.
- [ ] Verify blog images use WebP, maximum 1000 px width, approximately quality 85, and 50–150 KB medium / 150–300 KB large targets.
- [ ] Verify meaningful images have accurate alt text and blog alt text follows `[Description] - Texas Urban Sawmill`.
- [ ] Confirm below-fold images use appropriate lazy loading and primary hero images are not blindly lazy-loaded.
- [ ] Confirm stable dimensions or aspect-ratio containers reduce layout shift.
- [ ] Preserve important wood grain, species detail, faces, engraving, and craftsmanship during any approved optimization.

### Content decisions requiring approval

- [ ] Decide how to handle placeholder or “Coming Soon” blog cards and any placeholder links.
- [ ] Approve any new city-specific, Texas-wide, or national furniture wording.
- [ ] Approve any new B2B/trade terminology or capability claims.
- [ ] Approve confirmed wood-species names where the source material supports them.

## After production launch

### External image cleanup

- [ ] Re-audit the six external image URLs identified in the October 20, 2026 inventory.
- [ ] Confirm final production asset paths and ownership.
- [ ] Migrate approved external assets into TXUS project storage where appropriate.
- [ ] Re-test image loading, alt text, dimensions, and visual appearance after migration.
- [ ] Do not remove or replace any external image until the intended asset is confirmed.

### Search and analytics setup

- [ ] Connect and verify the approved Search Console property for the production domain.
- [ ] Submit the final sitemap.
- [ ] Verify indexing and canonical selection on representative pages.
- [ ] Configure or verify approved analytics and qualified-contact conversion tracking.
- [ ] Establish baseline impressions, clicks, landing pages, locations, qualified inquiries, and furniture conversions.

### Launch monitoring

- [ ] Check crawl errors, indexing exclusions, redirect errors, and sitemap status.
- [ ] Check social previews for the homepage, services, representative service pages, blog articles, portfolio, About Us, and Contact.
- [ ] Check image failures, slow-loading assets, and layout shifts on mobile and desktop.
- [ ] Review contact submissions for tracking and deliverability.
- [ ] Record any production-only issues without changing visible content automatically.

## Quarterly SEO review

- [ ] Review the Central Texas → Texas → national-furniture priority.
- [ ] Review queries, landing pages, locations, impressions, clicks, qualified leads, and conversions.
- [ ] Review metadata, canonicals, Open Graph/Twitter, schema, robots, sitemap, redirects, and domain consistency.
- [ ] Review image filenames, alt text, species specificity, dimensions, compression, loading behavior, and layout stability.
- [ ] Review internal links, orphan pages, duplicate intent, and placeholder content.
- [ ] Record recommendations and obtain approval before visible copy, design, layout, or asset changes.

## Completed in the current approved pass

- [x] Add page-specific social images to core, service, portfolio, About Us, Contact, and Blog metadata.
- [x] Add shared `og:site_name` metadata for Texas Urban Sawmill.
- [x] Add no-index handling to the internal Component Showcase and 404 routes.
- [x] Add async image decoding and appropriate lazy loading while preserving the current layout.
- [x] Prevent the Portfolio primary hero from being lazy-loaded.
- [x] Apply the approved blog alt-text suffix to remaining meaningful article images.
- [x] Standardize the About Us and Services canonical URLs to the approved non-`www` production domain.
- [x] Run the complete test suite and production build: 53 tests passed and the build succeeded.

## Open findings from the bounded verification pass

- [ ] Decide whether the existing `/shop` links should remain placeholders or receive a real route; no link destination was changed automatically.
- [ ] Decide whether the internal `/components` showcase route should remain available; it is no-indexed but is not part of the public route set.
- [x] Restore the shared Footer to `InksLakeSP.tsx` so the public article matches the site-wide Footer pattern.
- [ ] Review external social URLs before launch; the shared navigation currently includes an `http` Facebook URL and profile URLs should be confirmed against the official accounts.
- [ ] Review external partner-logo image URLs after the production domain is live; retain or migrate them only after asset ownership and visual intent are confirmed.
- [ ] Complete an actual browser walkthrough of public pages, navigation, back behavior, contact submission, social links, responsive states, and image rendering before launch.
- [ ] Complete accessibility review with keyboard navigation and screen-reader checks before launch.
- [x] Verify the three newer blog articles render with confirmed internal TXUS hero assets.
- [ ] Optionally replace the temporary blog hero assets with dedicated production artwork after visual approval.

## Current status

- **Inventory audit:** Complete; report available as `TXUS Image Asset Audit - 10-20-2026.md`.
- **Website design/content lock:** Active.
- **Invisible SEO/image-loading pass:** Completed for the approved internal scope.
- **External image migration:** Deferred until production domain launch.
- **Pending launch checklist:** Active and to be updated as items are verified.
