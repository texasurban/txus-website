---
name: txus-design-standard
description: Apply the approved Texas Urban Sawmill visual design system to public website pages. Use when creating, editing, auditing, or standardizing TXUS sections, page backgrounds, dividers, spacing, hero transitions, responsive rhythm, or comparable service-card layouts.
---

# TXUS Design Standard

Apply this skill to TXUS Website work before changing page-level visual structure. Treat the existing Services page and the approved master design document as the visual blueprint.

## Non-negotiable approval rule

Do not invent or substitute colors, spacing systems, divider styles, images, copy, navigation, or footer treatments. If a request conflicts with these rules, identify the conflict and ask for approval before implementing the exception.

Preserve existing content, image associations, navigation, footer, responsive behavior, and service-card content unless the user explicitly requests a change.

## Approved section backgrounds

Use only these two colors for ordinary adjacent content sections:

- **Background #1:** `#f0f0f0` — light neutral gray; reference: “Our Partners, Sponsors & Customers.”
- **Background #2:** `#f5f1e8` — warm ivory/natural material tone; reference: “Educational Series / USDA Forest Service Wood Innovations Grant Project.”

Adjacent standard sections must alternate between these two values. Never substitute near-identical values such as `#f8f8f8`, `#f5f5f5`, `#fafafa`, or `#fbf8f3` without explicit approval. Confirm the rendered contrast, not merely the source classes.

## Approved section divider

Every major standard content section must use:

```tsx
border-t-2 border-b-2 border-stone-400
```

Keep section padding inside the divider. A hero may use a bottom divider or rely on its first content section’s top divider when that preserves the established design. Intentional dark green, charcoal, photographic hero, and CTA sections are exceptions only when their purpose is clear or explicitly approved.

## Approved spacing and structure

Use this default for full-width content sections:

```tsx
<section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
  <div className="container">...</div>
</section>
```

Use `py-12 sm:py-16` for compact informational/article sections and `px-0 py-20 lg:py-28` for large feature sections. Preserve existing page-specific spacing when the user did not request spacing changes.

Use the reusable stylesheet utilities when appropriate:

```tsx
<section className="txus-section-bg-1 txus-section-divider ...">
```

or:

```tsx
<section className="txus-section-bg-2 txus-section-divider ...">
```

The stylesheet tokens are:

```css
--txus-section-bg-1: #f0f0f0;
--txus-section-bg-2: #f5f1e8;
--txus-section-divider: #a8a29e;
--txus-section-divider-width: 2px;
```

## Page workflow

1. Identify every major section in the target page.
2. Use the approved Services page as the structural reference.
3. Inventory each section’s rendered background, divider pair, spacing, and adjacent-section relationship before editing.
4. Assign `#f0f0f0` or `#f5f1e8` so adjacent standard sections visibly alternate.
5. Add the standard divider pair to each major standard section.
6. Leave hero, intentional dark, CTA, card, image, navigation, and footer treatments unchanged unless explicitly approved.
7. Preserve equal-height comparable service-card layouts: use flex-column cards, let descriptions grow, and anchor green CTA buttons at consistent bottom spacing within each row.
8. Render representative desktop and mobile views, checking actual contrast, line placement, section rhythm, and text wrapping.
9. Run the project tests and production build.
10. Save a checkpoint only after visual and technical verification.

## Homepage reference sequence

The approved homepage references are:

```text
Our Partners, Sponsors & Customers → #f0f0f0
Educational Series / WIG → #f5f1e8
```

The homepage Climate Smart Wood™ section was explicitly removed. Do not reintroduce it unless requested.

## QA checklist

Before completing a TXUS page task, verify:

- [ ] Every major standard section uses one of the two approved backgrounds.
- [ ] Adjacent standard sections visibly contrast.
- [ ] Each standard section has `border-t-2 border-b-2 border-stone-400`.
- [ ] Hero and dark-section exceptions are intentional.
- [ ] Section spacing remains consistent with the approved rhythm.
- [ ] Navigation and footer remain consistent.
- [ ] Comparable service cards retain equal height and bottom-aligned green CTAs.
- [ ] Existing copy, images, and image order remain unchanged unless requested.
- [ ] Desktop and mobile render checks pass.
- [ ] Tests and production build pass.
- [ ] Checkpoint is saved after verification.

For the complete human-readable standard, read `TXUS Master Website Design Standard - Section Backgrounds and Dividers.md` in the TXUS project when available.
