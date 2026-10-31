# TXUS CAD Laser Services Pilot Blueprint

**Status:** Draft for review — no website source files changed

**Pilot purpose:** Validate the approved TXUS service-page design before building the five blog/article pages and five project/content pages.

**Primary visual reference:** Current approved Tree Care service page:
`/services/tree-care`

**Proposed route:** `/services/cad-laser-services`

**Working page title:** CAD & Laser Services

## 1. Scope and page role

This is a service page, not a blog article. It should follow the existing TXUS service-page system rather than the blog/article template.

The page will present laser cutting, engraving, signage, prototyping, architectural models, art/decor work, CAD/CAM services, and precision CNC as a coordinated capability offering for individuals and businesses.

The page should support:

- Central Texas service inquiries.
- Texas-wide inquiries for appropriate fabricated products and project coordination.
- Residential/custom-product intent.
- Trade/B2B intent from architects, designers, builders, makers, and commercial project teams.

No unsupported service radius, lead time, material claim, project statistic, or equipment specification should be added.

## 2. Proposed service-page structure

### Shared shell

- Existing TXUS Navigation, unchanged.
- Existing TXUS Footer, unchanged.
- Existing page typography, motion behavior, button treatment, and container widths.
- No Shop/cart implementation in this pilot; that work remains in the separate Shopping Cart task.

### Section 1 — Hero

**Purpose:** Establish the service clearly above the fold.

**Suggested H1:** CAD & Laser Services

**Treatment:** Match the Tree Care hero:

- Full-width photographic hero.
- Existing TXUS green/photographic hero treatment.
- White framed title panel.
- Existing display font and responsive sizing.
- `decoding="async"`.
- Hero image loaded eagerly; do not lazy-load the primary hero.
- Approved hero divider treatment where it meets the first content section.

**Hero asset:** Pending confirmed TXUS project-storage image. Do not substitute an approximate image without approval.

**Proposed hero alt text:** `CAD and CO2 laser services at Texas Urban Sawmill`

### Section 2 — Intro / capability overview

**Background:** Background #1 — `#f0f0f0`

**Divider:** `border-t-2 border-b-2 border-stone-400`

**Layout:** Match Tree Care’s two-column introduction:

- Image or equipment/project image on the left.
- Text panel on the right.
- Black image outline and black caption bar with white text if a caption is used.
- Text panel with the established white card, black outline, rounded corners, and shadow treatment.

**Working heading:** CNC Laser Cutting & Gifts

**Working body copy from Dev’s supplied legacy content:**

> Our precision technology services are available for individuals and businesses seeking unique and personalized items. We use a large-format CO2 dual-headed laser with both 70W and 180W power configurations to provide custom engraving, laser cutting, signage, prototyping, architectural models, and art and decor. Our team of designers will help bring your vision to life with high-quality and accurate results.

**CTA:** Contact Us for a Project Estimate → `/contact`

**Additional capability line:**

> We also offer CAD/CAM services and precision CNC.

**Content note:** The latest supplied legacy copy says 70W and 180W. Existing TXUS project content has previously referenced 70W and 130W. The wattage must be confirmed before implementation so the page does not publish conflicting equipment information.

### Section 3 — Laser and CAD/CAM capability cards

**Background:** Background #2 — `#f5f1e8`

**Divider:** `border-t-2 border-b-2 border-stone-400`

**Layout:** Responsive two-column card grid on desktop; one column on mobile. Cards should follow the standing service-card rule:

- Equal-height cards within each grid row.
- `flex flex-col` content structure.
- Descriptions allowed to grow naturally.
- Green CTAs anchored with `mt-auto`.
- Consistent bottom spacing for all CTAs.
- Black image outlines.
- Black caption bars with white text where captions exist.

**Proposed cards:**

1. **Custom Laser Engraving**
   - Personalized products, signage, gifts, and decorative applications.
   - CTA: Contact Us for a Project Estimate → `/contact`

2. **Laser Cutting & Signage**
   - Precision cutting for custom components, signs, and project elements.
   - CTA: Contact Us for a Project Estimate → `/contact`

3. **Prototyping & Architectural Models**
   - Laser and CAD/CAM-supported prototypes and architectural model work.
   - CTA: Discuss Your Project → `/contact`

4. **Precision CNC & CAD/CAM**
   - CAD/CAM services and precision CNC support for custom fabrication.
   - CTA: Discuss Your Project → `/contact`

**Content approval note:** These card titles are working labels derived from the supplied service description. Final visible wording should be approved before implementation.

### Section 4 — Project image gallery or capability examples

**Background:** Background #1 — `#f0f0f0`

**Divider:** `border-t-2 border-b-2 border-stone-400`

**Layout:** Use the existing service-page image-card pattern from Tree Care and Millworks. Use only confirmed TXUS images showing laser engraving, laser cutting, CAD/CAM, CNC routing, signage, prototypes, models, gifts, or art/decor.

**Potential examples, pending confirmed assets and captions:**

- Laser-engraved personalized product.
- Laser-cut sign or architectural element.
- CAD/CAM or CNC project in production.
- Finished prototype, model, gift, or decorative piece.

Each image requires:

- Descriptive lowercase kebab-case storage filename where a new derivative is created.
- Alt text ending with ` - Texas Urban Sawmill` for meaningful blog-style content images, or concise service-page alt text consistent with current service pages.
- Known material/species named only when verified.
- WebP derivative where optimization is required.
- Stable dimensions or aspect-ratio wrapper.
- `loading="lazy"` below the fold.

### Section 5 — Featured services / project estimate CTA

**Background:** Background #2 — `#f5f1e8`

**Divider:** `border-t-2 border-b-2 border-stone-400`

**Layout:** Match Tree Care’s two-column featured-services section with equal-height flex-column cards.

**Proposed cards:**

- **For Individuals** — personalized gifts, engraving, signage, art, and decor.
- **For Businesses & Trade Partners** — prototypes, architectural models, signage, CAD/CAM, and precision CNC support.

Both cards should end with matching green buttons linking to `/contact`.

**B2B wording note:** Architects, general contractors, interior designers, commercial builders, makers, and project teams may be referenced only where the final copy accurately reflects the offering.

### Section 6 — Stewardship / craftsmanship close

**Background:** Background #1 — `#f0f0f0`

**Divider:** `border-t-2 border-b-2 border-stone-400`

**Purpose:** Close the page with TXUS craftsmanship and practical capability rather than adding unsupported environmental claims.

**Working heading:** Precision Technology, Practical Craftsmanship

**Working direction:** Explain that TXUS combines digital fabrication with hands-on woodworking and project coordination. Final copy should be based on approved TXUS facts and should not introduce new claims.

**CTA:** Contact Us for a Project Estimate → `/contact`

## 3. Design rules to validate in the pilot

- Use only `#f0f0f0` and `#f5f1e8` for ordinary adjacent page sections.
- Alternate backgrounds visibly between adjacent standard sections.
- Use `border-t-2 border-b-2 border-stone-400` on each major standard section.
- Preserve the Tree Care page’s hero proportions, title treatment, container rhythm, and responsive behavior.
- Use black image outlines and black caption bars with white text where captions are present.
- Keep cards equal height within each row.
- Use flex-column cards with growing descriptions and `mt-auto`-anchored green CTAs.
- Preserve the shared Navigation and Footer exactly.
- Keep section spacing compact and consistent; do not introduce oversized headings or unnecessary empty space.
- Check desktop, tablet, and phone layouts before checkpointing.

## 4. SEO blueprint

**Proposed title:** CAD & Laser Services | Texas Urban Sawmill

**Proposed description direction:** Describe TXUS CAD/CAM, CO2 laser engraving and cutting, signage, prototyping, architectural models, art/decor, and precision CNC services for individuals and businesses in Central Texas and Texas.

**Canonical:** `https://txurbansawmill.com/services/cad-laser-services` after the final production-domain decision.

**Open Graph/Twitter image:** The confirmed page hero or a separate 1200 × 630 social derivative.

**Structured data:** Use Service JSON-LD only with approved factual values:

- `serviceType`: CAD & Laser Services
- `provider`: Texas Urban Sawmill
- `description`: approved page description
- `areaServed`: Central Texas and Texas-wide only where accurate

Do not add geographic coordinates, address, review, product, or offer data unless approved and already supported by project facts.

## 5. Image optimization blueprint

- Use confirmed project-storage assets rather than external legacy URLs.
- Prefer WebP for photographs.
- Use approximately 1200–1600px for content images and 800–1200px for cards.
- Use 1920–2400px only when a wide hero composition requires it.
- Use stable image dimensions or aspect-ratio wrappers to reduce layout shift.
- Keep the primary hero eager and lazy-load below-fold gallery images.
- Name new derivatives descriptively, for example:
  - `co2-laser-engraved-personalized-product.webp`
  - `large-format-co2-laser-cutting-signage.webp`
  - `cad-cam-precision-cnc-fabrication.webp`
- Do not infer wood species or material from appearance.

## 6. Validation checklist before implementation approval

- [ ] Dev confirms the final page title: `CAD & Laser Services` or another approved title.
- [ ] Dev confirms whether the laser configuration is 70W and 180W or 70W and 130W.
- [ ] Dev approves the proposed route.
- [ ] Dev approves the working card titles and CTA labels.
- [ ] Confirmed hero and gallery assets are selected.
- [ ] Final visible copy is approved.
- [ ] Desktop, tablet, and mobile behavior is checked.
- [ ] Tests and production build pass.
- [ ] No legacy-domain website URLs remain in the new page’s links, metadata, schema, or assets.
- [ ] Only after these checks: save a project checkpoint.

## Approval request

Please review this pilot blueprint and confirm:

1. The Tree Care page is the correct structural reference.
2. The proposed CAD Laser Services route is acceptable.
3. The page should use the supplied 70W/180W wording, or provide the corrected wattage.
4. The working sections and card labels are acceptable.

Implementation should begin only after these points are approved.
