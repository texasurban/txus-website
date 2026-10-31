# TXUS Legacy Link and Missing Page Audit

**Project:** Texas Urban Sawmill Website

**Audit date:** October 31, 2026

**Scope:** Read-only comparison of the current TXUS repository and live site against the legacy `txurbansawmill.com` site. The audit checked source references, current routes, current crawl files, the legacy sitemap, and known unresolved destinations.

**Implementation status:** No page, link, metadata, sitemap, or design changes were made during this audit.

## Main findings

There are four issues to address before the new site replaces the legacy site:

1. The current live site’s `robots.txt` points to the legacy sitemap, and the current sitemap itself lists legacy-domain URLs. This is the most urgent technical issue because search engines are being directed to `txurbansawmill.com` instead of a sitemap owned by the new deployment. [1] [2]
2. Several visible homepage links still point to legacy paths. Some already have equivalent new blog or service routes, while others require new Phase II pages. [3] [4]
3. The legacy sitemap contains 57 distinct public paths. The current application declares approximately 30 public content routes, leaving multiple articles, project pages, service/information pages, and store pages unrepresented. [5] [6]
4. The existing site still contains known unresolved destinations, including the shared `/shop` link and unfinished Blog cards. These should be handled separately from the legacy-page migration where appropriate. [7]

## Legacy links that already have current equivalents

These links should eventually be changed from legacy absolute URLs to the corresponding current internal routes. They do not necessarily require new page creation:

- `https://www.txurbansawmill.com/services` → `/services`
- `https://www.txurbansawmill.com/portfolio` → `/portfolio`
- `https://www.txurbansawmill.com/climatesmartproj` → `/blog/climate-smart-projects`
- `https://www.txurbansawmill.com/climatesmartprojects/ash` → `/blog/austin-state-hospital`
- `https://www.txurbansawmill.com/climatesmartprojects/inklakesp` → `/blog/inks-lake-sp`
- `https://www.txurbansawmill.com/hillco` → `/blog/hillco-partners`
- `https://www.txurbansawmill.com/articles/woodinnovationsgrant` → `/blog/wood-innovations-grant`

The current homepage source contains these legacy-domain links directly in its Impact initiatives data. [8]

The project-specific migration rule should be: preserve the link’s intent and visible wording, but replace the legacy absolute URL with the approved current internal route after the destination page is confirmed.

## Recommended Phase II blog/article pages

The following five legacy articles are the strongest candidates for the 4–5 additional blog-associated pages discussed for Phase II. They are live on the legacy site, appear in the legacy sitemap, and do not currently have an equivalent route in `client/src/App.tsx`.

### 1. Texas Parks & Wildlife — Texas Trailblazer

**Legacy path:** `/articles/texas-parks-wildlife-new-life-for-fallen-trees`

**Legacy title:** “Texas Parks & WildLife Magazine - Texas Trailblazer”

**Why preserve it:** It documents an external publication, a Texas-wide credibility signal, and the story of rescued trees. The current homepage links to this legacy article, so losing it would remove an existing content and authority path.

### 2. Redefining Tree Removal in Central Texas

**Legacy path:** `/articles/tree-service-partnership`

**Legacy title:** “Redefining Tree Removal in Central Texas”

**Why preserve it:** It directly supports the Tree Care, Tree Reuse, and Log Transport service story and has strong Central Texas search intent.

### 3. Why Urban Wood Is Better Than Reclaimed Wood

**Legacy path:** `/articles/urbanwoodbenefits`

**Legacy title:** “Why Urban Wood is better than Reclaimed Wood”

**Why preserve it:** It is an educational article that explains TXUS’s material distinction and supports urban-wood search intent.

### 4. What Is Urban, Rescued, Salvaged, and Reclaimed Wood?

**Legacy path:** `/articles/sustainablewood`

**Legacy title:** “What is Urban, Rescued, Salvaged, and Reclaimed Wood?”

**Why preserve it:** It provides foundational educational content and definitions that can support internal links to Services, Lumber, Tree Reuse, and the future inventory catalog.

### 5. Sustainable Future: Principles and Benefits of the Circular Economy

**Legacy path:** `/articles/circulareconomy`

**Legacy title:** “Sustainable Future: the Principles and Benefits of the Circular Economy”

**Why preserve it:** It supports the Civic Industrial Stewardship narrative and gives the new site a deeper educational article about the circular-economy model.

These should be treated as **content migration candidates**, not automatic implementation instructions. Each page needs an approved wireframe and blueprint before development begins.

## Additional legacy project pages worth preserving

These are not necessarily part of the five blog pages, but they are meaningful omissions from the current route map:

- `/climatesmartprojects` — Climate Smart Projects index
- `/climatesmartprojects/fourseasons` — Four Seasons Lake Austin project
- `/climatesmartprojects/9092rainey` — 9092 Rainey Street project
- `/preparing-for-tree-reuse` — Preparing for Tree ReUse Projects
- `/partner` — Let’s Unite for Impact

The Austin State Hospital and Inks Lake project paths already have current article equivalents, but the broader Climate Smart Projects index and the Four Seasons and 9092 Rainey project pages do not.

## Legacy service and information pages not represented by current routes

The legacy sitemap also contains these non-store pages without current equivalents:

- `/sawmill`
- `/sawmilling`
- `/kiln`
- `/treecare`
- `/landservices`
- `/climatesmartfurniture`
- `/climatesmartmarks`

Some of these may be redundant with the current service pages. They should be reviewed for unique copy, project evidence, inbound links, and search value before deciding whether to clone, redirect, or retire them.

## Shopping and inventory pages

The legacy site contains a separate commerce family that should be handled by the new Shopping Cart and Inventory task rather than mixed into the Phase II blog migration:

- `/cart`
- `/store`
- `/store/lumber`
- `/store/lumber/cookies-rounds`
- `/store/lumber/english-walnut-slabs`
- `/store/lumber/live-edge-slabs`
- `/store/lumber/sycamore-slabs`
- `/store/lumber/sycamore-slabs/test`
- `/store/p/sycamore-slab-120-l-x-42-w-x-25-t`
- `/store/p/walnut-round`
- `/store/vessels`
- `/store/vessels/oak-rounds`
- `/store/vessels/pecan-rounds`
- `/store/vessels/walnut-rounds`
- `/merchandise`
- `/merchandise/tumblers`
- `/merchandise/water-bottles`
- Several merchandise product detail paths

These pages confirm that the future catalog will need product detail, category, and cart routes, but they do not need to be cloned as blog pages.

## Current broken or unresolved destinations

### Shared Shop destination

The current shared navigation includes `/shop`, but the current route map does not declare a Shop page. The same unresolved path also appears in the Wood Innovations article and Lumber service source. The prior live audit confirmed that `/shop` resolves to the application’s not-found experience. [7]

This should remain a separate decision:

- Create the future inventory/shop landing page under the Shopping Cart task; or
- Temporarily remove or rename the Shop navigation item until that page exists.

It should not silently point to an unrelated page.

### Blog placeholder destinations

The Blog index still contains unfinished or placeholder destinations:

- `/blog/sawmill-1`
- `/blog/exterior-1`
- `/blog/facility-1`
- `/blog/kiln-1`
- `/blog/texas-parks-wildlife-award`

These should be mapped to the five migration candidates only after the content and blueprint are approved. Do not redirect them automatically based only on similar wording.

### Internal component link

`/components` appears in the internal `ComponentShowcase` source but is not a public route in `App.tsx`. This is an internal/demo reference, not a legacy content migration candidate.

## Crawl-control and canonical issue

The current live `robots.txt` contains:

```text
Sitemap: https://txurbansawmill.com/sitemap.xml
```

The current live sitemap also lists URLs on `txurbansawmill.com`, not the current deployment host. [1] [2]

This is not a missing-page issue, but it must be corrected during the launch-domain transition. The final sitemap and robots file should use the approved production host. The page canonical URLs should use that same final host. If `txurbansawmill.com` will become the production domain after cutover, then the canonical host can remain `txurbansawmill.com`; the sitemap still needs to be served and validated by the final production site.

## Recommended next sequence

1. Approve the five blog/article migration candidates listed above.
2. Create a wireframe and blueprint for each approved page before implementation.
3. Decide whether the Climate Smart project pages should be separate project pages or consolidated into blog articles.
4. Replace homepage links that already have current equivalents.
5. Decide how the five unresolved Blog cards map to the approved migration pages.
6. Keep store, merchandise, and cart paths in the separate Shopping Cart and Inventory task.
7. Correct the final production `robots.txt`, sitemap host, and canonical host during launch preparation.
8. After page blueprints are approved, implement pages one at a time and run tests/build after each bounded batch.

## References

[1]: https://txusphase-cahtb59z.manus.space/robots.txt "Current TXUS robots.txt"
[2]: https://txusphase-cahtb59z.manus.space/sitemap.xml "Current TXUS sitemap response"
[3]: https://txusphase-cahtb59z.manus.space/ "Current TXUS live homepage"
[4]: https://txurbansawmill.com/ "Legacy TXUS live homepage"
[5]: https://www.txurbansawmill.com/sitemap.xml "Legacy TXUS sitemap"
[6]: https://github.com/texasurban/txus-website/blob/main/client/src/App.tsx "TXUS current route map"
[7]: https://github.com/texasurban/txus-website/blob/main/TXUS%20Responsive%20and%20SEO%20Audit%20-%2010-26-2026.md "Prior TXUS responsive and SEO audit"
[8]: https://github.com/texasurban/txus-website/blob/main/client/src/pages/Home.tsx "TXUS homepage source links"
