# TXUS SEO & Image Optimization Guide

**Project:** Texas Urban Sawmill (TXUS) Website  
**Document timestamp:** October 20, 2026 at 7:40 PM Central Time  
**Prepared for:** Dev / Texas Urban Sawmill  
**Status:** Working guide for content production, page implementation, and final pre-publish QA

> This guide consolidates the TXUS standards for page SEO, image preparation, accessibility, performance, structured data, and publishing QA. It is intentionally specific to the current TXUS React/Tailwind project and should be updated as the production domain, content model, or asset workflow changes.

---

## 1. TXUS SEO priorities

TXUS SEO should communicate three things clearly:

1. **What TXUS does:** urban wood utilization, sawmilling, lumber and slab production, tree reuse, log transport, tree care, and millwork/CNC/laser services.
2. **Where TXUS works:** Central Texas, with location language used naturally and accurately.
3. **Why TXUS is different:** family-driven craftsmanship, responsible tree reuse, material stewardship, precision manufacturing, and community-scale service.

SEO should support the Civic Industrial Stewardship design philosophy rather than replace it with generic keyword-heavy copy. Write for people first, then make the page structure easy for search engines to understand.

### Core content principles

- Use one clear primary topic per page.
- Put the primary topic in the page title, H1, introductory copy, and—when appropriate—the URL slug.
- Use related terms naturally in H2 headings, card titles, body copy, image alt text, and internal links.
- Avoid repeating the same phrase unnaturally across every page.
- Prefer specific, truthful descriptions over broad claims such as “best,” “#1,” or “guaranteed.”
- Keep service descriptions grounded in the capabilities TXUS actually provides.
- Preserve exact technical dimensions when discussing lumber: **4/4 = 1 inch, 6/4 = 1.5 inches, 8/4 = 2 inches, and 10/4 = 2.5 inches.**

### Geographic focus: Central Texas first, selective national reach

TXUS should not present every offering as if it serves the same geographic market. Approximately 90% of the business is centered in Central Texas and Texas generally, while furniture and finished products can reach customers outside Texas.

Use a three-level geographic model:

1. **Primary service area — Central Texas:** Lead with Central Texas for sawmilling, tree reuse, log transport, tree care, and closely related site-based services. Natural city and regional references may include Austin, Dripping Springs, Blanco, Wimberley, Fredericksburg, and nearby communities when TXUS genuinely serves those areas.
2. **Secondary service area — Texas-wide:** Use statewide language for services that can reasonably support customers elsewhere in Texas, including custom lumber, slabs, millwork, CNC, laser work, and selected delivery or transport arrangements. Do not imply that every on-site service is available statewide without confirming logistics.
3. **National product reach — furniture and finished goods:** Position custom furniture, finished millwork, specialty products, and selected smaller finished pieces as made in Texas and available for delivery or shipping beyond Texas when that is operationally accurate.

Recommended positioning language:

> Texas Urban Sawmill serves Central Texas and customers across Texas with urban wood recovery, custom lumber, slabs, millwork, and specialty fabrication. Select furniture and finished products are available for delivery beyond Texas.

Do not create thin city pages that simply swap a city name into the same paragraph. A regional landing page should exist only when it has genuinely useful, location-specific information such as local project examples, material sourcing context, delivery or access considerations, service limitations, or a meaningful local customer story. Otherwise, keep the geography in the main service page copy, headings, FAQs, internal links, and contact guidance.

### Micro-local and regional search framework

For local-intent copy:

- Mention Central Texas as the primary service area where relevant.
- Use city and regional modifiers naturally, not in lists repeated across every page.
- Tie geographic language to a real service condition: tree recovery, delivery radius, site access, crane logistics, local material sourcing, or project location.
- Use specific regional material references only when they are accurate, such as a Blanco River bald cypress project or a Central Texas urban oak recovery.
- Add a dedicated regional page only when TXUS can provide original content and a clear next step for that market.
- Keep `areaServed` in structured data aligned with actual operating coverage; do not mark the entire United States for local tree services because furniture can ship nationally.

### Trade and B2B search intent

Service pages should explicitly address the needs of architects, general contractors, interior designers, commercial builders, timber framers, and other trade buyers. Use accurate terminology such as structural timber supply, architectural millwork, commercial live-edge mantels, bulk kiln-drying capacity, beam profiling, custom fabrication, repeatable CNC production, lead times, access requirements, and project coordination when those capabilities apply.

Trade terminology should appear in useful subheadings, service descriptions, project examples, and calls to action—not as a disconnected keyword list. A page can serve homeowners and trade professionals at the same time by explaining both the finished result and the production or delivery capability behind it.

### Wood-species specificity

When a slab, beam, board, or finished piece visibly features a distinct species, name the primary wood species in the filename, alt text, caption, and nearby copy when known. Examples include Texas Pecan, Bald Cypress, Spalted Hackberry, Mesquite, and Texas live oak.

Example:

```text
Filename: texas-bald-cypress-live-edge-slab.webp
Alt text: Flattened Texas bald cypress live-edge slab with prominent natural grain
```

Do not guess a species from appearance alone. If the species is unknown, describe the visible material accurately without inventing a species name.

---

## 2. Page-level SEO standard

Every indexable page should have the following:

- A unique `<title>`.
- A unique meta description.
- One visible H1.
- A canonical URL using the approved production domain.
- Open Graph title, description, URL, type, and image.
- Twitter/X card metadata using `summary_large_image` when a suitable image exists.
- Relevant structured data where the page type supports it.
- Descriptive internal links to related TXUS pages.
- A useful browser title that makes sense when bookmarked or shared.

### Recommended title format

Use the most important topic first, followed by the TXUS brand:

```text
[Primary Topic] | Texas Urban Sawmill
```

Examples:

```text
Urban Wood Sawmilling Services | Texas Urban Sawmill
Lumber, Beams, Mantels & Slabs | Texas Urban Sawmill
Tree Reuse Construction in Central Texas | Texas Urban Sawmill
Millworks, CNC & Laser Services | Texas Urban Sawmill
About Texas Urban Sawmill | Family, Stewardship & Craftsmanship
```

Keep titles concise enough to avoid unnecessary truncation. Do not append multiple keyword variations to the same title.

### Recommended meta description format

Write one clear sentence or two short sentences that explain the page and its audience. Aim for approximately 140–160 characters when practical, but prioritize clarity over an exact character count.

Example:

```text
Texas Urban Sawmill transforms salvaged Central Texas trees into custom lumber, slabs, millwork, and finished products through responsible urban wood utilization.
```

A good description should include:

- The service, product, or page topic.
- The relevant geographic area when useful.
- A differentiator such as stewardship, custom fabrication, or family-driven craftsmanship.
- A reason to click, without exaggerated claims.

### H1 and heading hierarchy

- Use exactly one primary H1 per page.
- Use H2 headings for major sections.
- Use H3 headings for subsections or grouped card content.
- Do not use heading tags only to make text appear larger; use the established typography classes instead.
- Make headings descriptive enough to stand on their own in a screen-reader heading list.

### URL rules

Use short, lowercase, readable slugs:

```text
/about-us
/services
/services/sawmilling
/services/lumber
/services/tree-reuse
/services/log-transport
/services/tree-care
/services/millworks
/blog/climate-smart-construction-projects
```

Avoid dates, unnecessary filler words, duplicate slugs, uppercase letters, and tracking parameters in canonical URLs. Preserve redirects when a public slug changes, as was done for the former Learn More page when it became `/about-us`.

---

## 3. Current TXUS SEO implementation notes

The project includes `client/src/components/SEOHead.tsx`. It currently supports:

- Page title and `meta[name="title"]`.
- Meta description.
- Viewport metadata.
- Canonical URL.
- Open Graph type, URL, title, description, and image.
- Twitter/X card, URL, title, description, and image.
- Optional JSON-LD structured data through the `schema` prop.

Example usage:

```tsx
<SEOHead
  title="Millworks, CNC & Laser Services | Texas Urban Sawmill"
  description="Precision CNC routing, laser engraving, and specialty millwork from a family-driven Central Texas urban sawmill."
  url="https://txurbansawmill.com/services/millworks"
  image="/manus-storage/millworks-hero.webp"
  type="website"
  schema={millworksSchema}
/>
```

### Implementation checks before production

- Confirm that every route renders `SEOHead` with page-specific values.
- Confirm that all canonical URLs use the final approved production domain: `https://txurbansawmill.com` unless the production domain is formally changed.
- Do not leave temporary Manus preview domains in canonical, Open Graph, Twitter, or structured-data URLs.
- Confirm that the `image` value resolves publicly and is an absolute URL when required by social crawlers.
- Confirm that article pages use `type="article"` and include article-specific schema where appropriate.
- Add `og:image:alt`, `og:image:width`, and `og:image:height` if the shared SEO component is expanded.
- Keep the existing `SEOHead` tests passing after metadata changes.

---

## 4. Image filename standard

Use filenames that describe the subject, service, and—when useful—the location or purpose. Use lowercase kebab-case.

### Good examples

```text
texas-urban-sawmill-team-crane-truck.webp
urban-oak-log-sawmilling-central-texas.webp
custom-live-edge-walnut-slab.webp
millworks-cnc-surfacing-bald-cypress.webp
co2-laser-engraved-baseball-bat.webp
log-transport-crane-service.webp
```

### Avoid

```text
IMG_4821.jpg
DSC00077.JPG
image-final-final-2.png
photo1.webp
```

Filename rules:

- Use meaningful words separated by hyphens.
- Do not use spaces, capital letters, or special characters.
- Do not stuff filenames with repeated keywords.
- Keep the filename stable after publishing whenever possible.
- If an image is replaced, preserve the same URL only when the subject and purpose remain equivalent; otherwise update references and metadata intentionally.

---

## 5. Image dimensions, crop, and responsive behavior

Prepare the image for its actual role rather than uploading one oversized file for every placement.

### Recommended working targets

| Image use | Recommended source size | Notes |
|---|---:|---|
| Full-width hero/banner | 1920–2400 px wide | Keep important subjects away from crop edges. |
| Desktop content image | 1200–1600 px wide | Good for service and About Us sections. |
| Card image | 800–1200 px wide | Use a consistent crop within the same card grid. |
| Square headshot | 600–1000 px square | Keep face and shoulders centered. |
| Social sharing image | 1200 × 630 px | Design a safe crop with readable subject matter. |
| Small icon or logo | SVG or appropriately sized PNG/WebP | Do not use a large photo for a small mark. |

These are production targets, not rigid requirements. Use the smallest source that remains sharp at the largest intended display size.

### Crop and layout rules

- Use `object-cover` when the image is a visual background or intentionally fills a fixed frame.
- Use `object-contain` when the full object must remain visible, such as a finished product, technical part, or artwork.
- Reserve a consistent aspect ratio for comparable service cards.
- Avoid cropping faces, finished joinery, beam ends, engraved details, and other subjects that carry the meaning of the image.
- For hero images, check the crop on desktop and mobile separately.
- Use CSS aspect-ratio or fixed image wrappers to reduce layout shift.

### CLS guardrails for fonts and banners

- Custom web-font declarations should use `font-display: swap` so text remains available while fonts load.
- Reserve the exact intended height for announcement bars, consent notices, and other dynamic banners before their content appears.
- Do not insert a banner above the hero without reserving its space in the layout.
- Give hero images, logos, and card images explicit dimensions or stable aspect-ratio containers.
- Verify the first viewport on mobile as well as desktop, because a small dynamic element can create a large shift on narrow screens.

---

## 6. Image formats and compression

Preferred formats:

- **WebP:** default choice for most TXUS photographs and gallery images.
- **AVIF:** consider for very large photographic assets if the delivery pipeline and browser support are verified.
- **SVG:** logos, simple icons, and line illustrations.
- **PNG:** transparent graphics or images that require lossless edges; do not use it by default for photographs.
- **JPEG:** acceptable fallback for photographic assets when WebP is not practical.

Compression guidance:

- Export photographs at a quality level that preserves wood grain, engraved detail, and faces without visible artifacting.
- Remove unnecessary metadata from public copies unless it is intentionally needed.
- Avoid uploading multiple near-identical originals when one optimized asset will serve the page.
- Check the final file size before publishing. Large hero images deserve special attention because they affect the first viewport.
- Store website media in the project storage workflow, not in `client/public/` or `client/src/assets/`. The project README requires uploaded assets to use Manus storage paths.

Suggested practical targets:

- Card image: normally under 250 KB when visual quality allows.
- Standard content image: normally under 500 KB.
- Hero image: optimize aggressively and verify the page remains fast on a mobile connection.

Do not sacrifice important visual evidence—such as slab grain, CNC detail, or a finished architectural element—just to meet an arbitrary file-size target.

---

## 7. Alt text and accessibility

Alt text should describe the image’s meaning in context, not simply repeat the filename.

### Good alt text examples

```text
TXUS team members standing beside a crane truck at the sawmill

CNC machine surfacing a large Texas bald cypress slab

Live-edge walnut slab with natural contours and visible grain

CO2 laser engraving a custom baseball bat
```

### Rules

- Describe the subject, action, and relevant context.
- Keep most alt text to one concise sentence.
- Do not begin with “Image of” or “Picture of.”
- Do not add keyword lists.
- If the image is decorative and adds no information, use an empty alt attribute: `alt=""`.
- For a linked image, make the alt text describe the destination or action when that is more useful.
- Do not duplicate a nearby caption word-for-word unless the duplication is necessary for comprehension.

Every meaningful `<img>` element must have an `alt` value. This is both an accessibility requirement and a useful content-quality check.

---

## 8. Loading, performance, and layout stability

Use loading behavior based on the image’s position and importance:

- The primary above-the-fold hero or LCP image should not be blindly lazy-loaded.
- Images below the first viewport should normally use `loading="lazy"`.
- Use `decoding="async"` where appropriate.
- Provide explicit width/height or a stable aspect-ratio wrapper to reduce Cumulative Layout Shift.
- Avoid rendering every gallery image at full resolution on initial load when a smaller responsive version is sufficient.
- Confirm that hover effects do not trigger image re-downloads or cause layout movement.
- Check mobile performance, not only desktop broadband performance.

Example:

```tsx
<img
  src={image.url}
  alt={image.alt}
  width={1200}
  height={800}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover"
/>
```

For the primary hero image, omit `loading="lazy"` when it is the main above-the-fold visual and verify that the resulting loading behavior is correct.

---

## 9. Open Graph and social sharing

Every important page should share cleanly when its URL is pasted into a message or social platform.

Required values:

- `og:type`
- `og:url`
- `og:title`
- `og:description`
- `og:image`
- Twitter/X card set to `summary_large_image`

Recommended additions:

- `og:image:alt`
- `og:image:width`
- `og:image:height`
- `og:site_name` set to Texas Urban Sawmill
- Article publication and modification dates for blog pages

The social image should be relevant to the page, not a generic site-wide image when a service-specific image is available. Test the final URL after publishing because preview caches can preserve old metadata.

---

## 10. Structured data recommendations

Use JSON-LD through the `schema` prop in `SEOHead` where the content supports it. Keep structured data truthful and synchronized with visible page content.

### Site-wide or organization-level data

Consider a `LocalBusiness` or appropriate business schema containing:

- Business name: Texas Urban Sawmill.
- Official website URL.
- Logo URL.
- Telephone and email when publicly intended.
- Service area or address only when accurate and approved for publication.
- Official social profiles, if available.

For a TXUS `LocalBusiness` object, the required implementation fields for the project standard are:

- `name`
- `logo`
- `url`
- `telephone`
- `geo` with valid latitude and longitude
- `areaServed`
- `address`

Only publish a telephone number, address, or geographic coordinates that TXUS has approved for public display. Keep `areaServed` focused on Central Texas and Texas-wide coverage as appropriate; do not use national `areaServed` for local on-site services merely because finished furniture can ship nationally.

### Page-specific data

- Service pages: `Service` with a clear service name, description, provider, and relevant area served.
- Blog articles: `Article` or `BlogPosting` with headline, description, image, author, date published, and date modified.
- Breadcrumbs: `BreadcrumbList` for nested service or blog routes if breadcrumbs are visible or otherwise represented consistently.
- Contact page: business/contact information only when it matches the visible page and approved public details.

For a TXUS `Service` object, the required implementation fields for the project standard are:

- `serviceType`
- `provider` set to Texas Urban Sawmill
- `description`
- `areaServed`

The service schema must describe the visible service on that page. For example, a Central Texas log transport page should not use the same national coverage language as a shippable furniture product page.

Do not add review, rating, FAQ, product, or offer markup unless the page visibly contains the required information and the implementation is accurate.

---

## 11. Internal linking and content relationships

Each page should help visitors move to the next relevant page.

Examples:

- Sawmilling → Lumber, Beams, Mantels & Slabs.
- Tree Care → Log Transport & Crane Services.
- Log Transport → Sawmilling and Tree Reuse.
- Millworks → Portfolio or Contact.
- About Us → Services and Contact.
- Blog articles → the service pages that relate to the article topic.

Use descriptive link text such as “Explore our urban wood sawmilling services” rather than repeated generic text such as “Click here.”

Maintain the site-wide navigation and footer consistently. Do not create page-specific navigation variants unless explicitly requested.

---

## 12. Service-card and image-grid consistency

For comparable image-and-description service cards, preserve the established TXUS layout rule:

- Cards in the same grid row use equal-height layouts.
- Card content uses a flex-column structure.
- Descriptions are allowed to grow naturally.
- The green CTA button is anchored at consistent bottom spacing across cards in the same row.
- Image framing and card spacing should remain consistent across comparable cards.

This prevents buttons from appearing at different vertical positions and should remain the default for future service pages unless Dev explicitly requests another layout.

---

## 13. Blog article SEO standard

Before publishing each blog article:

- Choose one primary search topic and one clear reader intent.
- Create a unique title, meta description, H1, URL slug, and hero image.
- Add a short introductory summary near the top of the article.
- Use descriptive H2 sections rather than one uninterrupted block of text.
- Link naturally to at least one relevant TXUS service page and the Contact page when appropriate.
- Provide a descriptive hero-image alt text.
- Set article schema with author and publication metadata.
- Confirm that the article’s social image is present and not a placeholder.
- Verify that no temporary preview URL appears in canonical or social metadata.

The three pending article topics identified in the project TODO are Climate-Smart Construction Projects, Tree Reuse, and Sustainable Furniture Design. Each should receive its own final hero image and metadata rather than sharing one generic placeholder image in the production release.

---

## 14. Pre-publish SEO and image checklist

### Content and metadata

- [ ] Page has a unique title.
- [ ] Page has a unique meta description.
- [ ] Page has one clear H1.
- [ ] H2/H3 hierarchy is logical.
- [ ] Primary topic is clear in the opening copy.
- [ ] Copy accurately reflects TXUS capabilities and service area.
- [ ] Canonical URL uses the approved production domain.
- [ ] No preview or temporary domain appears in metadata.

### Images

- [ ] Every meaningful image has useful alt text.
- [ ] Decorative images use empty alt text.
- [ ] Filenames use lowercase descriptive kebab-case.
- [ ] Images are in an appropriate format and compressed.
- [ ] Dimensions match the largest intended display size.
- [ ] Hero and social images have safe crops.
- [ ] Card images use consistent framing.
- [ ] Images load from the approved project storage workflow.
- [ ] Below-the-fold images use lazy loading where appropriate.
- [ ] Image wrappers reserve space to prevent layout shift.

### Sharing and structured data

- [ ] Open Graph title, description, URL, and image are present.
- [ ] Twitter/X `summary_large_image` metadata is present.
- [ ] Social image is page-specific when practical.
- [ ] JSON-LD matches visible page content.
- [ ] Article or service schema is used only where appropriate.

### Site quality

- [ ] Navigation and footer remain consistent.
- [ ] Service-card CTAs align at the bottom of comparable cards.
- [ ] Page works on mobile, tablet, and desktop.
- [ ] Keyboard focus remains visible and usable on every link, button, form control, and custom interactive element.
- [ ] Custom interactive elements use an explicit visible focus style, such as Tailwind `focus-visible:ring-2` with sufficient contrast and an appropriate ring offset.
- [ ] Contact links and forms work.
- [ ] Images do not overflow or distort at responsive breakpoints.
- [ ] Production build succeeds.
- [ ] SEOHead tests and the full test suite pass.
- [ ] All important routes and internal links have been walked through manually.

---

## 15. Recommended final verification tools

Use a combination of project tests and external page checks after deployment:

- Browser inspection of page title, description, canonical, Open Graph tags, and JSON-LD.
- Social preview testing for the production URL.
- Lighthouse or equivalent performance review on representative desktop and mobile pages.
- Accessibility review focused on image alt text, heading hierarchy, focus states, contrast, and keyboard navigation.
- Broken-link and missing-image review across all service and blog routes.
- Search-engine indexing tools after the production domain is live.

These checks should be performed after the final content and image pass, because changing the hero image, title, or URL after testing can invalidate the results.

---

## 16. TXUS publishing rule of thumb

Before any page goes live, a visitor should be able to answer these questions within a few seconds:

1. What does TXUS offer?
2. Is this the right service or story for my project?
3. Where does TXUS work?
4. What should I do next?

The SEO layer should make those answers easier to find without weakening the family-driven, material-focused character of Texas Urban Sawmill.
