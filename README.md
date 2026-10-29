# Texas Urban Sawmill Website

The public website for **Texas Urban Sawmill (TXUS)**, a Central Texas community sawmill focused on urban-tree reuse, traditional craftsmanship, precision manufacturing, custom millwork, and heirloom-quality furniture.

The site’s visual and content philosophy is **Civic Industrial Stewardship**: practical regional service, responsible material reuse, evidence-based craftsmanship, and disciplined industrial design.

Repository: [github.com/texasurban/txus-website](https://github.com/texasurban/txus-website)

## Technology

- React 19 and TypeScript
- Vite 7
- Tailwind CSS 4 with project tokens in `client/src/index.css`
- Wouter routing
- Express 4
- tRPC 11
- Drizzle ORM
- Vitest, React Testing Library, and jsdom
- pnpm 10

## Project structure

```text
client/
  public/              Small public files such as robots.txt and sitemap.xml
  src/
    components/        Shared Navigation, Footer, SEO, heroes, and UI components
    pages/             Public pages, services, portfolio galleries, and blog articles
    App.tsx            Route map and application shell
    index.css          Global theme, typography, layout, and TXUS design tokens
    main.tsx           React entry point and providers
server/
  _core/               Manus/WebDev framework services
  db.ts                Database helpers
  routers.ts           tRPC procedures
  storage.ts           Storage helpers
drizzle/               Database schema and migrations
shared/                Shared types and constants
TXUS*.md               Design, SEO, audit, and reconstruction documentation
```

## Local development

### Requirements

Install Node.js, pnpm, and Git. The project currently uses the package-manager version declared in `package.json`.

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

The development server uses the project’s configured WebDev runtime and normally serves the site on port 3000.

### Type-check

```bash
pnpm check
```

### Run tests

```bash
pnpm test
```

### Create a production build

```bash
pnpm build
```

### Start the production build

```bash
pnpm start
```

### Formatting

```bash
pnpm format
```

Do not run broad formatting over unrelated files in a focused change. Review the resulting diff before committing.

## Design standards

The authoritative design references are:

- `TXUS Master Website Design Standard - Section Backgrounds and Dividers.md`
- `SERVICES_PAGE_DESIGN_SYSTEM.md`
- `TXUS Website Master Reconstruction Guide - 2026-10-20.md`
- `TXUS SEO & Image Optimization Guide - 10-20-2026.md`

Important rules include:

- Preserve the shared Navigation and Footer across public pages.
- Ordinary adjacent sections use the approved alternating backgrounds `#f0f0f0` and `#f5f1e8`.
- Major ordinary sections use the standard 2px muted divider at the top and bottom.
- Comparable image-and-description service cards use equal-height flex-column layouts.
- Service-card descriptions may grow naturally, and green CTA buttons remain aligned at consistent bottom spacing.
- Preserve approved typography, image crops, route structure, section order, and visible copy unless a change is explicitly requested.
- Avoid introducing generic SaaS styling, dashboard layouts, unrelated gradients, or a replacement navigation/footer system.

## Images and file storage

Large images and media should not be added to `client/public/` or `client/src/assets/`. TXUS uses project-managed storage references such as:

```text
/manus-storage/<storage-key>
```

When adding or replacing an image:

1. Confirm the asset is approved for the page and does not alter the intended visual composition.
2. Upload it through the project’s managed file-storage workflow.
3. Use the returned storage path in the page component.
4. Provide descriptive, species-specific `alt` text when the wood species or project type is visually meaningful.
5. Use appropriate loading behavior: primary hero imagery should remain eager; below-the-fold imagery may use lazy loading when layout dimensions are preserved.
6. Check the image at mobile, tablet, and desktop widths.

The reconstruction package and asset manifests in this repository document the current image inventory. The large reconstruction archive is retained as a backup artifact; source changes should be made in the application files rather than by editing generated archives.

## SEO and accessibility

Public pages should use the shared `SEOHead` component with page-specific title, description, canonical URL, social image, and structured data where appropriate. Internal-only routes must remain no-indexed.

SEO work should preserve the visible design and content unless a copy change is explicitly approved. Follow the TXUS SEO guide for regional targeting, Texas-wide priorities, B2B terminology, image metadata, schema properties, internal links, and quarterly review practices.

Interactive elements must remain keyboard reachable and expose a visible focus state. Preserve semantic headings, meaningful image alt text, accessible labels, and responsive navigation behavior.

## Data and environment configuration

Do not commit secrets, API keys, database credentials, session tokens, or `.env` files. Environment-specific values are supplied by the deployment environment. Review `.gitignore` before adding configuration files.

Database changes should follow the existing Drizzle workflow and be tested against the project’s configured environment. Never add real customer or contact-submission data to fixtures, tests, or the repository.

## Testing expectations

Every functional or layout change should include an appropriate verification pass:

- Run the relevant Vitest tests.
- Run `pnpm check` when TypeScript or component contracts change.
- Run `pnpm build` before publishing or opening a release PR.
- Verify affected routes at mobile, tablet, and desktop widths when responsive behavior could change.
- Inspect the diff for unintended copy, route, asset, navigation, footer, or design-token changes.

The baseline test suite covers authentication logout behavior, contact submission behavior, Navigation, Footer, and SEO metadata.

## Publishing and project backups

Publishing is managed through the Manus WebDev project. Save a Manus checkpoint before publishing significant changes. GitHub provides portable source history; Manus checkpoints preserve restorable WebDev project state; the reconstruction archive preserves a clone-oriented source and asset package. These are complementary backups, not interchangeable systems.

Before a release:

1. Run tests and the production build.
2. Review the affected routes visually.
3. Save a descriptive Manus checkpoint.
4. Push the reviewed commit to `main`.
5. Publish through the approved WebDev workflow.

## License

The project package is marked MIT in `package.json`. Confirm ownership and usage rights for photographs, logos, customer work, and third-party assets before redistributing or reusing them outside the TXUS project.
