# TXUS Website Master Reconstruction Guide

**Project:** Texas Urban Sawmill (TXUS) Website  
**Purpose:** Re-create the current TXUS website from this guide and the companion reconstruction package without relying on prior conversation context.  
**Baseline:** Approved design baseline `d05f307e`  
**Prepared:** October 20, 2026  
**Status:** Master handoff / reconstruction specification

> **Use this guide with the companion archive:** `TXUS Website Master Reconstruction Package - 2026-10-20.zip`. The archive contains a source snapshot, route manifest, complete source-referenced asset manifest, human-readable design documents, and locally available uploaded assets. The source snapshot is the canonical reference for exact visible copy, JSX structure, image order, metadata, and page-specific content.

---

## 1. Reconstruction instruction for a new Manus session

Paste or attach this document and the companion package, then use the following instruction:

> Re-create the Texas Urban Sawmill website exactly from the attached TXUS Website Master Reconstruction Guide and package. Treat the source snapshot as canonical. Do not redesign, modernize, simplify, research alternatives, or invent copy, colors, images, routes, or layouts. Implement the route map, shared Navigation and Footer, exact page content, image references, SEO metadata, section background sequence, divider system, and equal-height service-card rule specified here. Preserve all existing public routes and redirects. Use the asset manifest to restore every image; where an asset is listed as an existing `/manus-storage/` reference or external URL, preserve that reference unless a new storage upload is explicitly requested. Run the documented tests and production build before presenting the result.

If a source file and this prose guide appear to conflict, use the source snapshot for exact page content and use this guide for the approved design and reconstruction constraints.

---

## 2. Product and design identity

TXUS is a Central Texas community sawmill built around family, stewardship, urban-tree reuse, traditional craftsmanship, and precision manufacturing. The visual philosophy is **Civic Industrial Stewardship**: credible regional service, ecological responsibility, material warmth, and disciplined industrial structure.

The site should feel crafted and operational rather than generic: natural wood and neutral surfaces, ecological green accents, condensed industrial headings, restrained borders, photographic project evidence, and practical calls to action.

Do not introduce a dashboard layout, generic SaaS styling, rounded-card-heavy patterns, gradients unrelated to the existing hero treatment, or a new navigation/footer system.

---

## 3. Technical reconstruction target

- **Frontend:** React 19 + TypeScript + Vite.
- **Styling:** Tailwind CSS 4 with `tw-animate-css` and project tokens in `client/src/index.css`.
- **Routing:** Wouter.
- **Backend:** Express 4 + tRPC 11 + Drizzle ORM where backend features are needed.
- **Testing:** Vitest with React Testing Library/jsdom tests.
- **Storage:** Manus storage references such as `/manus-storage/<key>`; do not put large images in `client/public` or `client/src/assets`.
- **Theme:** Light theme by default through `ThemeProvider`; preserve the existing semantic tokens.
- **Required scripts:** `pnpm test` and `pnpm build`.

### Recommended reconstruction order

1. Scaffold the React/WebDev project with the existing full-stack template.
2. Restore `client/src/index.css`, fonts, shared components, and route map.
3. Restore `Navigation`, `Footer`, `SEOHead`, hero components, and shared UI primitives.
4. Restore public page files from the source snapshot.
5. Restore the route-specific image references from `asset-manifest.csv`.
6. Restore `robots.txt`, `sitemap.xml`, package scripts, server contact submission behavior, and tests.
7. Run a route-by-route rendered QA pass.
8. Run `pnpm test` and `pnpm build`.

---

## 4. Non-negotiable design system

### 4.1 Approved section backgrounds

Ordinary adjacent content sections may use only these two exact colors:

| Token | HEX | Reference |
|---|---|---|
| Background #1 | `#f0f0f0` | Our Partners, Sponsors & Customers |
| Background #2 | `#f5f1e8` | Educational Series / USDA Forest Service Wood Innovations Grant Project |

Adjacent standard sections must visibly alternate between the two. Do not substitute `#f8f8f8`, `#f5f5f5`, `#fafafa`, `#fbf8f3`, or similar near-white values. Verify rendered contrast, not only source code.

The stylesheet tokens are:

```css
--txus-section-bg-1: #f0f0f0;
--txus-section-bg-2: #f5f1e8;
--txus-section-divider: #a8a29e;
--txus-section-divider-width: 2px;
```

Reusable classes:

```css
.txus-section-bg-1 { background-color: var(--txus-section-bg-1); }
.txus-section-bg-2 { background-color: var(--txus-section-bg-2); }
.txus-section-divider {
  border-top: var(--txus-section-divider-width) solid var(--txus-section-divider);
  border-bottom: var(--txus-section-divider-width) solid var(--txus-section-divider);
}
```

### 4.2 Divider / line-break standard

Every major ordinary content section uses:

```tsx
border-t-2 border-b-2 border-stone-400
```

The divider is a 2px muted stone-gray line at both the top and bottom of a section. Keep content inside section padding. Use the divider to make each section boundary visually explicit.

Hero, photographic, intentional charcoal/green CTA, and intentional dark timeline surfaces may remain exceptions when their role is clear. The first content section must still have a clear line break from the hero.

### 4.3 Typography

- Body: **Source Sans 3**, sans-serif.
- Display headings: **Barlow Condensed**, sans-serif.
- Serif utility: **Source Serif 4**, only when explicitly used by a page.
- Eyebrows: Source Sans 3, bold, uppercase, `0.28em` tracking, green primary color, `1rem` / `1.125rem` at `sm`.
- Section titles: Barlow Condensed, uppercase, `clamp(2.4rem, 4vw, 4.4rem)`, `0.95` line-height, `0.03em` tracking.
- Preserve page-specific font sizes from the source snapshot.

### 4.4 Layout and spacing

- `.container`: full width, centered, `1rem` horizontal padding.
- Default full section shell: `px-6 py-16 lg:px-8 lg:py-24`.
- Compact article/information section: `py-12 sm:py-16`.
- Large feature section: `px-0 py-20 lg:py-28`.
- Preserve existing asymmetry, image crops, and card order.
- Use responsive breakpoints already present in the source; do not replace the mobile layout with a desktop-only layout.

### 4.5 Color palette

Preserve the current semantic palette in `client/src/index.css`:

- Primary ecological green: semantic `--primary` (`oklch(0.47 0.122 145.5)`).
- Header surface: `rgba(250, 249, 243, 0.88)` with backdrop blur.
- Footer: `#2a2a2a`.
- Footer gold/warm accent: `#d7a469`.
- Strong ink: `--ink-strong`.
- Soft body ink: `--ink-soft`.
- Divider: `#a8a29e` through the TXUS token.
- Existing hero green, photographic, charcoal, and CTA exceptions must remain as in the source snapshot.

### 4.6 Card rule

All comparable image-and-description service cards must:

- Fill equal height within each grid row.
- Use a flex-column content layout.
- Let the description grow naturally.
- Anchor the green CTA button at consistent bottom spacing using `mt-auto` or equivalent.
- Preserve image order, captions, wording, and CTA destinations.

This rule applies to the Services page and all service subpages, including future pages.

---

## 5. Shared site shell

### Navigation

Use `client/src/components/Navigation.tsx` as canonical.

- Sticky top bar, `z-50`, translucent header, backdrop blur, bottom border.
- Desktop breakpoint: `lg` and above.
- Desktop logo: `/manus-storage/TXUSBlack4.5inx3in72DPI_fe5f0d81_0f47ce66.png`, approximately `h-14` / `sm:h-16`.
- Desktop navigation: uppercase, Source Sans 3, small text, `0.08em` tracking.
- Desktop menu: Home, Shop, Portfolio, Services dropdown, About Us, Blog dropdown, Contact.
- Right-side social chips: Instagram, YouTube, Facebook, LinkedIn.
- Mobile: logo, Menu button, collapsible menu, nested Services and Blog accordions, social chips.
- Preserve active-link green treatment, keyboard/ARIA behavior, menu titles, and external-link `target`/`rel` behavior.

### Footer

Use `client/src/components/Footer.tsx` as canonical.

- Full-width `#2a2a2a` surface with white text.
- Gold accent `#d7a469` for heading, labels, borders, and branding.
- Centered Contact heading and italic description.
- Three info tiles: phone, email, Dripping Springs, Texas.
- Phone: `512-762-5898`; email: `info@txurbansawmill.com`.
- Email link subject: `Texas Urban Sawmill Inquiry`.
- Bottom branding: `Texas Urban Sawmill · Dripping Springs, Texas`.
- Copyright line currently reads `@ 2026 Texas Urban Sawmill LLC | All Rights Reserved`.
- Keep the footer identical across public pages.

### SEOHead

Use `client/src/components/SEOHead.tsx` on every public page.

Props: `title`, `description`, `url`, `canonical`, `image`, `type`, `schema`, `noindex`.

It emits title, title meta, description, viewport, explicit canonical preference, Open Graph type/site name/url/title/description/image, Twitter summary-large-image metadata, optional JSON-LD, and optional `noindex, nofollow` for internal routes.

Public pages use production canonical URLs. Internal `NotFound` and `ComponentShowcase` routes are no-indexed.

---

## 6. Route map and page inventory

The exact route/component mapping is also available in `manifests/route-manifest.csv`.

| Route | Component / target | Type |
|---|---|---|
| `/?` | `Home` | direct route |
| `/blog` | `Blog` | direct route |
| `/blog/austin-state-hospital` | `AustinStateHospital` | direct route |
| `/blog/inks-lake-sp` | `InksLakeSP` | direct route |
| `/blog/hillco-partners` | `HillcoPartners` | direct route |
| `/blog/stinson-gallery` | `StinsonGalleryBlog` | direct route |
| `/blog/wood-innovations-grant` | `WoodInnovationsGrant` | direct route |
| `/blog/climate-smart-projects` | `ClimateSmartProjects` | direct route |
| `/blog/tree-reuse-urban-development` | `TreeReuseUrban` | direct route |
| `/blog/sustainable-furniture-design` | `SustainableFurnitureDesign` | direct route |
| `/blog/stinson-test` | `StinsonTest` | direct route |
| `/blog/community-impact-stories` | `CommunityImpactStories` | direct route |
| `/portfolio` | `Portfolio` | direct route |
| `/stinson-gallery` | `StinsonGallery` | direct route |
| `/omega-gallery` | `OmegaGallery` | direct route |
| `/ibeam-gallery` | `IBeamGallery` | direct route |
| `/pecan-bunker-gallery` | `PecanBunkerGallery` | direct route |
| `/family-legacy-gallery` | `FamilyLegacyGallery` | direct route |
| `/gold-walnut-gallery` | `GoldWalnutGallery` | direct route |
| `/hillco-gallery` | `HillcoGallery` | direct route |
| `/pecan-trestle-gallery` | `PecanTrestleGallery` | direct route |
| `/contact` | `Contact` | direct route |
| `/about-us` | `AboutUs` | direct route |
| `/learn-more` | `() => <Redirect to="/about-us" />` | direct route |
| `/services` | `Services` | direct route |
| `/services/lumber` | `ServiceLumber` | direct route |
| `/services/sawmilling` | `ServiceSawmilling` | direct route |
| `/services/furniture` | `() => <Redirect to="/portfolio" />` | direct route |
| `/services/tree-reuse` | `ServiceTreeReuse` | direct route |
| `/services/log-transport` | `ServiceLogTransport` | direct route |
| `/services/tree-care` | `ServiceTreeCare` | direct route |
| `/services/millworks` | `ServiceMillworks` | direct route |
| `/404` | `NotFound` | direct route |
| `/learn-more` | `Redirect -> /about-us` | redirect |
| `/services/furniture` | `Redirect -> /portfolio` | redirect |

### Page-source inventory

The archive includes the following page files as the canonical exact-copy source:

- `AboutUs.tsx`
- `Blog.tsx`
- `BlogArticles/AustinStateHospital.tsx`
- `BlogArticles/ClimateSmartProjects.tsx`
- `BlogArticles/CommunityImpactStories.tsx`
- `BlogArticles/HillcoPartners.tsx`
- `BlogArticles/InksLakeSP.tsx`
- `BlogArticles/StinsonGallery.tsx`
- `BlogArticles/StinsonTest.tsx`
- `BlogArticles/SustainableFurnitureDesign.tsx`
- `BlogArticles/TreeReuseUrban.tsx`
- `BlogArticles/WoodInnovationsGrant.tsx`
- `ComponentShowcase.tsx`
- `Contact.tsx`
- `FamilyLegacyGallery.tsx`
- `GoldWalnutGallery.tsx`
- `HillcoGallery.tsx`
- `Home.tsx`
- `IBeamGallery.tsx`
- `NotFound.tsx`
- `OmegaGallery.tsx`
- `PecanBunkerGallery.tsx`
- `PecanTrestleGallery.tsx`
- `Portfolio.tsx`
- `ServiceLogTransport.tsx`
- `ServiceLumber.tsx`
- `ServiceMillworks.tsx`
- `ServiceSawmilling.tsx`
- `ServiceTreeCare.tsx`
- `ServiceTreeReuse.tsx`
- `Services.tsx`
- `StinsonGallery.tsx`

### Page implementation expectations

- **Home `/`:** Hero over Austin skyline/river photography, welcome/team story, impact initiatives, partners/sponsors/customers, services, rescued-tree/furniture story, educational series, makers/family content, blog/video/CTA content, and standard footer. Climate Smart Wood™ homepage section remains removed.
- **Services `/services`:** Services hero, intro, six comparable service cards, equal-height/bottom-aligned green CTAs, contact CTA, footer.
- **Service pages:** Preserve each existing page’s hero, intro, imagery, technical descriptions, project cards, section order, CTA destinations, and approved alternating backgrounds.
- **Portfolio `/portfolio`:** Portfolio hero, project categories/cards, gallery routes, contrasting sections, footer.
- **About Us `/about-us`:** TXUS story, team photo, Makers section, Sarah Ginther, Jesse Mahoney, Devin Ginther, biographies, stewardship/family content, footer. `/learn-more` redirects to `/about-us`.
- **Blog `/blog`:** Category sections and article cards. Dynamic category sections must alternate `#f0f0f0` and `#f5f1e8` with standard dividers.
- **Blog articles:** Preserve article titles, body copy, project imagery, article metadata, schema, internal links, and section boundaries from the source snapshot.
- **Contact `/contact`:** Contact hero, form with project-category subject dropdown, phone/email/location, social links, and footer.
- **Gallery routes:** Preserve image grids, captions, project-specific copy, and route links from each source file.

---

## 7. SEO, accessibility, and image rules

### SEO

- Use page-specific title and meta description.
- Use explicit production canonical URLs.
- Use `og:type=article` for articles and `website` for ordinary pages.
- Add an appropriate existing hero/primary image to social metadata.
- Use JSON-LD where present in the source snapshot.
- Keep `robots.txt` and `sitemap.xml` from the source snapshot.
- Do not expose `/404` or `ComponentShowcase` to search engines.
- Preserve regional language naturally: Central Texas, Dripping Springs, Austin, Blanco, Wimberley, Fredericksburg, and Texas-wide service context where already present.
- Preserve B2B terminology and species-specific copy/alt text when present.

### Images

- Preserve the `asset-manifest.csv` references exactly unless explicitly replacing an asset.
- Use `/manus-storage/...` paths for project storage assets; do not move large media into `client/public` or `client/src/assets`.
- Keep meaningful alt text; include project context and wood species when known.
- Keep hero images eager/visible above the fold; lazy-load below-fold images.
- Preserve `decoding="async"` and existing `loading` behavior from the source snapshot.
- Preserve `object-cover` versus `object-contain`, crop position, borders, shadows, and aspect ratios.
- The package contains the 15 locally available uploaded binaries; many production images are already referenced through Manus storage or external URLs and are listed in the manifest.

### Accessibility

- Keep semantic headings in order.
- Keep visible focus treatment for custom interactive elements.
- Preserve `aria-label`, `aria-expanded`, `aria-controls`, menu roles, and descriptive link titles.
- Keep keyboard-reachable navigation and mobile menu controls.
- Preserve sufficient text/background contrast.

---

## 8. Asset manifest and restoration policy

The complete source-referenced manifest is in `manifests/asset-manifest.csv`, with **152 unique image references** and **168 source reference rows**. A download pass successfully captured all 152 unique referenced images into `assets/referenced/`; use `manifests/asset-download-status.csv` to map each original URL to its local package path.

### Local binary assets included in the package

- `20260406_110142.jpg` — 242,267 bytes
- `20260417_145707.jpg` — 274,243 bytes
- `20260417_155829.jpg` — 202,379 bytes
- `20260419_181047.jpg` — 223,267 bytes
- `20260420_090741.jpg` — 222,743 bytes
- `20260423_150042.jpg` — 141,465 bytes
- `20260507_121057.jpg` — 159,404 bytes
- `20260507_154809.jpg` — 210,174 bytes
- `20260508_105250.jpg` — 232,617 bytes
- `20260508_110854.jpg` — 202,561 bytes
- `Jesse,Sarah&Devin-MeettheMakers.webp` — 75,842 bytes
- `TXUSCNCServices.jpg` — 472,445 bytes
- `TXUSDripNaturalSigns.jpg` — 402,408 bytes
- `Texas_Urban_Sawmill_Team-134.jpg` — 144,636 bytes
- `Texas_Urban_Sawmill_Team-137.jpg` — 140,757 bytes

### Asset classes

1. **Project storage:** `/manus-storage/...` references. Preserve keys and use the same paths after reconstructing the project. If a new project cannot resolve an existing key, upload the corresponding source binary and update only the reference that is explicitly approved.
2. **External CDN:** CloudFront, Squarespace CDN, or other external references. Preserve the URL and attribution/behavior from the source snapshot unless the user explicitly requests migration.
3. **Downloaded referenced assets:** The package includes every accessible project-storage and external image under `assets/referenced/`, preserving the original URL in `manifests/asset-download-status.csv`.
4. **Local uploaded assets:** Included under `assets/local-upload/` for reuse or comparison. These are not automatically substituted for production images.

Do not silently replace an existing image because a local upload has a similar filename. Match by page, subject, crop, and manifest reference.

---

## 9. File structure to restore

```text
client/
  index.html
  public/
    robots.txt
    sitemap.xml
  src/
    App.tsx
    index.css
    main.tsx
    components/
      Navigation.tsx
      Footer.tsx
      SEOHead.tsx
      HeroBanner.tsx
      FancyHeroBanner.tsx
      ...shared UI components from source snapshot
    pages/
      Home.tsx
      Services.tsx
      AboutUs.tsx
      Contact.tsx
      Portfolio.tsx
      service pages
      gallery pages
      Blog.tsx
      BlogArticles/*.tsx
server/
  contact.submit.test.ts
  ...template server files from source snapshot
drizzle/
shared/
package.json
vite.config.ts
tsconfig.json
```

Restore the source snapshot rather than manually rewriting page copy. Keep infrastructure files under the template’s expected locations and do not put media in public/source asset directories.

---

## 10. Verification and acceptance criteria

A reconstruction is complete only when all of the following are true:

- [ ] Every route in `route-manifest.csv` resolves, including redirects and fallback handling.
- [ ] Navigation is identical on desktop and mobile.
- [ ] Footer is identical across public pages.
- [ ] Ordinary sections use only `#f0f0f0` and `#f5f1e8`, alternating between adjacent sections.
- [ ] Every ordinary major section has the 2px top and bottom stone divider.
- [ ] Hero/dark/timeline exceptions are intentional and preserved.
- [ ] Services and comparable cards have equal heights and bottom-aligned green CTAs.
- [ ] Images preserve source references, crops, alt text, loading behavior, and associations.
- [ ] Page-specific SEO metadata, canonical URLs, Open Graph, Twitter, and JSON-LD are restored.
- [ ] Internal routes are no-indexed where specified.
- [ ] Contact form and category subject behavior work.
- [ ] `pnpm test` passes.
- [ ] `pnpm build` succeeds.
- [ ] Desktop and mobile rendered QA passes on Home, Services, Portfolio, About Us, Blog, one service page, one gallery page, and one article page.
- [ ] A checkpoint is saved after verification.

### Current known build note

The production build may report a Vite chunk-size warning for the large main bundle. This is a warning, not a build failure, and is part of the current baseline unless code-splitting is explicitly requested.

---

## 11. Handoff files

- Human-readable master: this document.
- Machine-readable route list: `manifests/route-manifest.csv`.
- Machine-readable image list: `manifests/asset-manifest.csv`.
- Exact source snapshot: `source-snapshot/`.
- Locally available uploaded binaries: `assets/local-upload/`.
- Approved visual specification: `TXUS Master Website Design Standard - Section Backgrounds and Dividers.md`.
- Reusable agent skill: `txus-design-standard/SKILL.md` in the supplied environment; its content is also included in the package under `design-skill/SKILL.md`.
