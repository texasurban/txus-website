# TXUS Master Website Design Standard
## Section Backgrounds, Dividers, Spacing, and Page Consistency

**Project:** Texas Urban Sawmill (TXUS) Website  
**Status:** Approved master standard  
**Approved:** October 20, 2026  
**Scope:** All future TXUS public-page design and implementation work

---

## 1. Purpose

This document establishes the approved visual standard for separating major content sections throughout the TXUS website. It exists to prevent pages from drifting into inconsistent background colors, divider treatments, spacing, or visual rhythm.

The standard applies to the homepage, service pages, Portfolio, About Us, Contact, Blog, blog articles, gallery pages, and future public pages unless Dev explicitly approves an exception.

The existing TXUS navigation and footer designs remain locked and must remain visually consistent across all pages.

---

## 2. Approved Section Background Colors

Only these two colors are approved for standard adjacent content sections:

### Background #1 — Light Neutral Gray

```text
HEX: #f0f0f0
RGB: 240, 240, 240
Reference: Our Partners, Sponsors & Customers
```

This is the neutral industrial background. Use it for one side of an alternating section pair.

### Background #2 — Warm Ivory / Natural Material Tone

```text
HEX: #f5f1e8
RGB: 245, 241, 232
Reference: Educational Series / USDA Forest Service Wood Innovations Grant Project
```

This is the warm, material-inspired background. Use it for the other side of an alternating section pair.

### Required contrast rule

Adjacent standard content sections must alternate between `#f0f0f0` and `#f5f1e8`. Do not use visually indistinguishable substitutes such as `#f8f8f8`, `#f5f5f5`, `#fafafa`, or `#fbf8f3` for standard alternating sections without explicit approval.

Before saving a page, verify that adjacent sections do not share the same standard background and that the difference is visible in the rendered page—not only in the source code.

---

## 3. Section Divider Standard

Every major standard content section must use the same two-line separator:

```tsx
border-t-2 border-b-2 border-stone-400
```

This produces:

- A 2px top divider.
- A 2px bottom divider.
- A consistent muted stone-gray color.
- A clear visual break between adjacent sections.

Example:

```tsx
<section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
  <div className="container">
    {/* Section content */}
  </div>
</section>
```

The divider is a visual separator and does not replace section padding. Text, cards, and images must remain comfortably inside the section boundaries.

---

## 4. Standard Alternating Sequence

The default sequence for ordinary content sections is:

```text
Section A: #f0f0f0
Divider
Section B: #f5f1e8
Divider
Section C: #f0f0f0
Divider
Section D: #f5f1e8
```

A page may begin with either approved color when needed to preserve continuity with its hero or preceding page context. The requirement is that consecutive standard sections visibly alternate.

The homepage reference sequence is:

```text
Our Partners, Sponsors & Customers: #f0f0f0
Educational Series / WIG: #f5f1e8
```

The homepage furniture and other standard content sections must be reviewed against this approved pair before any additional color is introduced.

---

## 5. Standard Content Section Spacing

Use the following default spacing for full-width content sections:

```tsx
px-6 py-16 lg:px-8 lg:py-24
```

For smaller informational or article sections, use:

```tsx
py-12 sm:py-16
```

For larger feature sections, use the existing TXUS rhythm:

```tsx
px-0 py-20 lg:py-28
```

Do not change section spacing merely to introduce the background standard. Preserve established page-specific spacing unless the page has an approved spacing correction.

---

## 6. Section Structure

Standard sections should follow this structure whenever practical:

```tsx
<section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 px-6 py-16 lg:px-8 lg:py-24">
  <div className="container">
    {/* eyebrow, heading, copy, imagery, cards, or CTA */}
  </div>
</section>
```

Required structure principles:

- Use the shared `.container` layout for content alignment.
- Keep headings, copy, images, and CTAs inside the section padding.
- Preserve the existing Civic Industrial Stewardship typography.
- Preserve existing imagery and image associations unless explicitly asked to change them.
- Maintain responsive behavior at mobile, tablet, and desktop widths.

---

## 7. Exceptions

The two approved standard backgrounds apply to ordinary content sections. These treatments remain allowed when they serve a clear, intentional purpose:

### Hero sections

Hero banners may use photography, green overlays, charcoal, or other established hero treatments. They should still have a clear divider where they meet the first content section.

### Intentional dark CTA or impact sections

Dark charcoal or green sections may remain for high-emphasis impact, CTA, or brand-story sections when their purpose is clear. They are not part of the ordinary alternating two-color sequence.

### Cards and nested elements

Cards, image frames, metric panels, and nested content blocks may use their own approved surface colors. The two-color standard applies to the major page-level section background, not every nested card.

Any new exception must be explicitly approved before implementation.

---

## 8. Locked Site-Wide Rules

These rules remain active alongside the section standard:

- Navigation design must remain 100% consistent across all pages.
- Footer design must remain 100% consistent across all pages.
- Comparable image-and-description service cards must use equal-height layouts.
- Service-card content must use a flex-column structure.
- Descriptions may grow naturally within the card.
- Green CTA buttons must be anchored at consistent bottom spacing within each grid row.
- Existing page copy, imagery, and layout should not be changed unless explicitly requested.
- Never make a visual assumption when a reference section or approved blueprint is available.
- Do not implement a new page or page-wide visual system until its wireframe or blueprint is approved.

---

## 9. Page-by-Page Verification Checklist

Before saving any page-level design work:

- [ ] Identify every major page-level section.
- [ ] Record each section’s rendered background color.
- [ ] Confirm adjacent standard sections alternate between `#f0f0f0` and `#f5f1e8`.
- [ ] Confirm every standard section has `border-t-2 border-b-2 border-stone-400`.
- [ ] Confirm hero sections and intentional dark sections are deliberate exceptions.
- [ ] Confirm section spacing remains consistent with the approved rhythm.
- [ ] Confirm navigation and footer are unchanged.
- [ ] Confirm service-card equal-height and bottom-CTA alignment remains intact.
- [ ] Check the rendered page at desktop and mobile widths.
- [ ] Run the project test suite and production build.
- [ ] Save a checkpoint only after visual and technical verification.

---

## 10. Implementation Tokens

The master stylesheet should expose reusable tokens for these approved values:

```css
:root {
  --txus-section-bg-1: #f0f0f0;
  --txus-section-bg-2: #f5f1e8;
  --txus-section-divider: #a8a29e;
  --txus-section-divider-width: 2px;
}
```

Tailwind classes may continue to use the explicit approved values when needed for readability, but new shared components should prefer these tokens or shared utility classes.

---

## 11. Change-Control Rule

If a requested page design appears to conflict with this document, stop before implementation and identify the conflict. Ask for explicit approval of the exception rather than silently substituting another color, divider, spacing system, or page structure.
