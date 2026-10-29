# Contributing to Texas Urban Sawmill

Thank you for helping improve the Texas Urban Sawmill website. TXUS is a public-facing service and portfolio site, so contributions should protect the existing visual language, content accuracy, accessibility, and regional credibility.

## Before you begin

Please read these project references before making a substantive change:

- `README.md`
- `TXUS Master Website Design Standard - Section Backgrounds and Dividers.md`
- `SERVICES_PAGE_DESIGN_SYSTEM.md`
- `TXUS Website Master Reconstruction Guide - 2026-10-20.md`
- `TXUS SEO & Image Optimization Guide - 10-20-2026.md`

For page work, first describe the intended page structure, section order, image treatment, and responsive behavior. Do not redesign an existing page or invent replacement copy, imagery, routes, colors, or layouts without approval.

## Development setup

```bash
pnpm install
pnpm dev
```

Run the standard checks before submitting a change:

```bash
pnpm test
pnpm check
pnpm build
```

If a command is not relevant to the change, explain why in the pull request. Never treat a browser-only visual check as a replacement for automated tests.

## Branches and commits

Use a focused branch for each change:

```bash
git switch -c feature/short-description
```

Keep commits small and descriptive. Use imperative wording, for example:

```text
Add canonical metadata to portfolio galleries
```

Do not combine unrelated refactors, formatting passes, content rewrites, or asset migrations in the same commit.

## Design and layout rules

- Preserve the shared Navigation and Footer. Do not create page-specific replacements.
- Use the approved TXUS section backgrounds and divider tokens rather than guessing new near-white colors.
- Preserve the Civic Industrial Stewardship visual direction and the established typography.
- For comparable image-and-description service cards, use equal-height cards, flex-column content, naturally growing descriptions, and bottom-aligned green CTAs with consistent spacing.
- Keep service-card image order, captions, copy, and CTA destinations unchanged unless the change specifically addresses them.
- Preserve responsive behavior across phone, tablet, and desktop widths.
- Avoid unnecessary scrolling, oversized empty areas, generic dashboard patterns, and unrelated visual effects.
- Preserve visible content and layout when making invisible SEO or performance improvements.

## Content and SEO

Use the shared `SEOHead` component for public-page metadata. Include a page-specific title, description, canonical URL, social image, and structured data when appropriate. Keep internal-only routes no-indexed.

Content should reflect TXUS’s actual services, capabilities, geography, materials, and partnerships. Regional references should support real search intent without creating repetitive doorway pages. When a project visibly features a distinct wood species, use accurate species-specific image alt text and filenames where practical.

Do not change customer names, project claims, dimensions, service capabilities, phone numbers, email addresses, or partnership statements without confirming their accuracy.

## Images and assets

Before adding an image:

1. Confirm that TXUS owns or is permitted to use it.
2. Upload large media through the project-managed storage workflow rather than placing it in `client/public/` or `client/src/assets/`.
3. Use a descriptive filename and meaningful alt text.
4. Preserve the intended crop and provide stable dimensions or layout constraints to reduce layout shift.
5. Keep primary hero images eager and defer only appropriate below-the-fold images.
6. Check the image at all supported breakpoints.

Do not commit personal photographs, customer information, API responses, raw uploads, credentials, or redundant generated archives unless the change explicitly requires them and the repository owner approves it.

## Accessibility

Every interactive control should be keyboard reachable and have a visible focus indicator. Preserve semantic headings and meaningful link text. Images that convey information require descriptive alt text; purely decorative images should be marked appropriately. Test mobile navigation and nested menu controls with keyboard and accessible labels in mind.

## Database and contact functionality

Do not add real customer or contact-submission data to tests, fixtures, commits, or screenshots. Keep secrets and database credentials in the deployment environment. Follow the existing Drizzle and tRPC patterns when changing server behavior, and include tests for new procedures or validation rules.

## Pull requests

A pull request should include:

- A concise summary of what changed and why
- The affected routes or components
- Screenshots or a short visual description for UI changes at relevant breakpoints
- Test, type-check, and build results
- Any migration, storage, environment, or publishing considerations
- A note identifying any intentionally unchanged findings or follow-up work

Before requesting review, confirm:

- `git diff` contains only intended changes.
- No secrets, `.env` files, generated build output, logs, or dependency directories are included.
- Navigation, Footer, section backgrounds, dividers, and service-card alignment remain consistent.
- Canonical URLs, alt text, and loading behavior are correct for affected pages.
- Tests and the production build pass.

## Review and release

Changes that alter visible design, page structure, navigation, footer behavior, service-card alignment, or public copy require explicit review before publishing. Save a descriptive Manus checkpoint before a release, then push the reviewed commit and publish through the approved WebDev workflow.

GitHub history, Manus checkpoints, and the reconstruction backup serve different purposes. Keep all three layers healthy when preparing a significant release.
