# TXUS Services Page Design System
## Standard Template & Layout Specifications

**Document Version:** 1.0  
**Last Updated:** May 10, 2026  
**Reference Page:** Sawmilling & Kiln Drying Service Page  
**Purpose:** Establish consistent design standards for all service pages to ensure brand cohesion and ease of reproduction

---

## 1. PAGE STRUCTURE OVERVIEW

All service pages follow this hierarchical structure from top to bottom:

```
1. Navigation Bar (Fixed)
2. Hero Banner with Background Image
3. Intro Text Box (bordered)
4. Service Cards (White Background - Two Column Layout)
5. Service Details Section with Images
6. Pricing/Specifications Table (if applicable)
7. CTA Section
8. Footer
```

---

## 2. NAVIGATION BAR

### Specifications
- **Position:** Fixed at top of page
- **Height:** 64px (4rem)
- **Background:** White with subtle shadow
- **Logo:** TXUS Black Logo (4.5" x 3" @ 72 DPI)
- **Logo URL:** `/manus-storage/TXUSBlack4.5inx3in72DPI_fe5f0d81_0f47ce66.png`

### Navigation Items
- Home
- Shop
- Portfolio
- Services (with dropdown submenu)
- Learn More
- Blog
- Contact

### Social Links (Top Right)
- Instagram
- YouTube
- Facebook
- LinkedIn

### Styling
- Font: Sans-serif (system font)
- Text Color: #1b1612 (dark charcoal)
- Hover State: Subtle color change or underline
- Mobile: Hamburger menu at breakpoint

---

## 3. HERO BANNER

### Specifications
- **Height:** 400px (mobile), 500px (tablet), 600px (desktop)
- **Background:** Full-width background image with overlay
- **Overlay:** Semi-transparent dark overlay (rgba(0,0,0,0.3))
- **Text Alignment:** Center
- **Position:** Absolute centered text box

### Hero Content
- **Main Heading:** Large, bold, white text
- **Font Size:** 3xl (mobile), 4xl (tablet), 5xl (desktop)
- **Font Weight:** Bold (700)
- **Color:** White (#ffffff)
- **Text Shadow:** Optional subtle shadow for readability

### Hero Image Requirements
- **Aspect Ratio:** 16:9 or wider
- **Format:** WebP or JPEG
- **Size:** Optimized for web (< 500KB)
- **Content:** Relevant to service (e.g., sawmill, logs, kiln)
- **Position:** Keep bottom edge visible (avoid cropping key elements)

### Example Hero Image
- **Current:** Sawmill with logs and equipment
- **Positioning:** `object-cover` with center focus

---

## 4. INTRO TEXT BOX

### Specifications
- **Background:** White
- **Border:** 2px solid #1b1612 (dark charcoal)
- **Padding:** 24px (p-6)
- **Margin:** 40px top/bottom (my-10)
- **Border Radius:** None (sharp corners)
- **Max Width:** 6xl (56rem)
- **Centering:** mx-auto

### Typography
- **Font:** Sans-serif
- **Font Size:** text-base (16px)
- **Font Weight:** Bold (700)
- **Line Height:** 1.6
- **Color:** #1b1612 (dark charcoal)
- **Text Alignment:** Center
- **Letter Spacing:** Normal

### Content
- 2-3 sentences describing the service
- Focus on value proposition and sustainability
- Include quantifiable metrics if available

### Example Content
"Texas Urban Sawmill transforms logs, beams, and timbers into high-end, climate-smart lumber ready for any application. As the only sawmill in Texas operating 480V electric industrial sawmills, we deliver high-efficiency, zero-emission processing—ensuring every log is handled with technical precision and environmental care."

---

## 5. SERVICE CARDS (WHITE BACKGROUND)

### Layout
- **Grid:** 2 columns (desktop), 1 column (mobile/tablet)
- **Gap:** 48px (gap-12)
- **Margin:** 80px top/bottom (mb-20)

### Card Specifications
- **Background:** White
- **Border:** None
- **Box Shadow:** `0_20px_40px_rgba(0,0,0,0.3)` (default)
- **Hover Shadow:** `0_40px_80px_rgba(0,0,0,0.5)` (on hover)
- **Hover Transform:** `-translate-y-3` (lift effect)
- **Border Radius:** 8px (rounded-lg)
- **Transition:** All 300ms ease
- **Padding:** 0 (image flush to edges)

### Card Image
- **Height:** 384px (h-96)
- **Object Fit:** Cover
- **Border Radius:** 8px on top
- **Aspect Ratio:** 16:9 or similar

### Card Caption Box
- **Background:** #1b1612 (dark charcoal)
- **Text Color:** White
- **Padding:** 16px 24px (py-4 px-6)
- **Border Radius:** 0 0 8px 8px (bottom corners only)
- **Font Size:** text-sm (14px)
- **Font Style:** Italic
- **Line Height:** 1.6

### Card Sizing
- **Natural sizing:** Cards expand/contract based on content
- **No fixed height:** Allows flexibility for varying text lengths
- **Responsive:** Stacks to single column on mobile

---

## 6. SERVICE DETAILS SECTION

### Two-Column Layout (Desktop)
- **Left Column:** Image with caption
- **Right Column:** Text content
- **Gap:** 48px (gap-12)
- **Margin:** 80px top/bottom (my-20)

### Image Specifications
- **Width:** 100% of column
- **Border Radius:** 8px (rounded-lg)
- **Box Shadow:** `0_20px_40px_rgba(0,0,0,0.3)`
- **Hover Effect:** Shadow intensifies on hover

### Text Content
- **Heading:** Bold, dark charcoal (#1b1612)
- **Font Size:** 2xl (text-2xl)
- **Font Weight:** Bold (700)
- **Margin Bottom:** 16px (mb-4)
- **Paragraph Font Size:** text-base (16px)
- **Paragraph Line Height:** 1.8
- **Paragraph Margin Bottom:** 16px (mb-4)
- **Color:** #1b1612 (dark charcoal)

---

## 7. CTA BUTTONS - STANDARD STYLE

### Button Specifications
- **Display:** Inline-flex
- **Alignment:** Items center, gap-2
- **Width:** Full width (w-full)
- **Background Color:** #217938 (TXUS Green)
- **Hover Background:** #1a5a2a (darker green)
- **Text Color:** White (#ffffff)
- **Padding:** 12px 32px (px-8 py-3)
- **Font Size:** text-sm (14px)
- **Font Weight:** Semibold (600)
- **Text Transform:** UPPERCASE
- **Letter Spacing:** 0.18em (tracking-[0.18em])
- **Border Radius:** None (sharp corners)
- **Transition:** Colors 200ms ease
- **Cursor:** Pointer

### Button Icon
- **Icon:** ArrowRight (lucide-react)
- **Size:** h-4 w-4
- **Position:** Right of text
- **Spacing:** 8px gap

### Button Text Examples
- "REQUEST SAWMILLING QUOTE"
- "REQUEST KILN DRYING QUOTE"
- "REQUEST PROJECT QUOTE"
- "CONTACT US TODAY"

### Special CTA: "View Our Process"
- **Additional Border:** 2px solid #000000 (black)
- **Font Size:** text-base lg:text-lg (slightly larger)
- **Margin:** mt-10 mb-10 (reduced padding)
- **Width:** Full width (w-full)

---

## 8. COLOR PALETTE

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| TXUS Green | #217938 | CTA buttons, accents |
| Dark Green (Hover) | #1a5a2a | Button hover state |
| Dark Charcoal | #1b1612 | Text, borders, headings |
| White | #ffffff | Backgrounds, text on dark |
| Black | #000000 | Borders, special accents |

### Background Colors
- **Page Background:** White (#ffffff)
- **Card Background:** White (#ffffff)
- **Text Box Background:** White (#ffffff)
- **Caption Background:** #1b1612 (dark charcoal)

---

## 9. TYPOGRAPHY

### Font Family
- **Primary Font:** System sans-serif stack
- **Fallback:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

### Font Sizes
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Hero Heading | 3xl-5xl | Bold (700) | White |
| Section Heading | 2xl-3xl | Bold (700) | #1b1612 |
| Intro Text | text-base | Bold (700) | #1b1612 |
| Body Text | text-base | Regular (400) | #1b1612 |
| Caption Text | text-sm | Italic | White |
| Button Text | text-sm | Semibold (600) | White |

### Line Heights
- **Headings:** 1.2
- **Body Text:** 1.6-1.8
- **Captions:** 1.6

---

## 10. SPACING & LAYOUT

### Vertical Spacing
| Element | Margin |
|---------|--------|
| Hero Banner | 0 |
| Intro Text Box | my-10 (40px) |
| Service Cards Grid | mb-20 (80px) |
| Service Section | my-20 (80px) |
| CTA Button | mt-10 mb-10 (40px) |
| Footer | mt-20 (80px) |

### Horizontal Spacing
| Element | Padding |
|---------|---------|
| Container | px-4 (mobile), px-6 (tablet), px-8 (desktop) |
| Card Padding | 0 (images flush) |
| Caption Box | px-6 py-4 |
| Intro Text Box | p-6 |
| Text Sections | max-w-6xl mx-auto |

### Grid Gaps
- **Service Cards:** gap-12 (48px)
- **Two-Column Layout:** gap-12 (48px)

---

## 11. FOOTER

### Specifications
- **Background:** Dark (charcoal or navy)
- **Text Color:** White
- **Padding:** 40px top/bottom (py-10)
- **Layout:** Multi-column on desktop, stacked on mobile

### Footer Sections
1. **Company Info**
   - Logo
   - Brief description
   - Social links

2. **Quick Links**
   - Services
   - Portfolio
   - Blog
   - Contact

3. **Contact Information**
   - Phone: 512-762-5898
   - Email: info@txurbansawmill.com
   - Address (if applicable)

4. **Social Media Icons**
   - Instagram
   - YouTube
   - Facebook
   - LinkedIn

---

## 12. RESPONSIVE BREAKPOINTS

### Mobile (< 640px)
- Single column layout
- Hamburger menu
- Reduced font sizes
- Full-width buttons
- Stacked cards

### Tablet (640px - 1024px)
- 2-column grid for cards
- Adjusted spacing
- Responsive images
- Touch-friendly buttons

### Desktop (> 1024px)
- Full 2-column layout
- Maximum spacing
- Optimized typography
- Hover effects enabled

---

## 13. ANIMATION & TRANSITIONS

### Fade-Up Animation
```javascript
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
```

### Button Transitions
- **Hover:** Background color change (200ms ease)
- **Card Hover:** Shadow intensifies + lift (-translate-y-3)
- **Transition Duration:** 300ms

### Scroll Triggers
- **Viewport Trigger:** Once true, amount 0.25
- **Animation:** Fade-up on scroll into view

---

## 14. IMPLEMENTATION CHECKLIST

- [ ] Navigation bar with logo and menu items
- [ ] Hero banner with background image and overlay
- [ ] Intro text box with border and centered text
- [ ] Service cards (2-column grid) with images and captions
- [ ] Service details section with images and text
- [ ] CTA buttons with consistent styling
- [ ] Pricing/specifications table (if applicable)
- [ ] Footer with company info and social links
- [ ] Responsive design for mobile/tablet/desktop
- [ ] Animations and transitions
- [ ] Color consistency across all elements
- [ ] Typography hierarchy and sizing
- [ ] Spacing and padding consistency
- [ ] Hover states and interactions

---

## 15. QUICK REFERENCE: COMPONENT COPY-PASTE

### Hero Banner Template
```jsx
<div className="relative w-full h-[600px] bg-cover bg-center" 
     style={{backgroundImage: `url('...')`}}>
  <div className="absolute inset-0 bg-black/30"></div>
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-5xl font-bold text-white text-center">Service Title</h1>
  </div>
</div>
```

### Intro Text Box Template
```jsx
<div className="max-w-6xl mx-auto my-10 border-2 border-[#1b1612] p-6 bg-white">
  <p className="text-base font-bold text-[#1b1612] text-center leading-relaxed">
    Service description text here...
  </p>
</div>
```

### CTA Button Template
```jsx
<a href="#" className="inline-flex items-center justify-center gap-2 w-full 
  bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] 
  text-white transition-colors hover:bg-[#1a5a2a]">
  BUTTON TEXT
  <ArrowRight className="h-4 w-4" />
</a>
```

### Service Card Template
```jsx
<div className="overflow-hidden rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.3)] 
  hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-300 
  transform hover:-translate-y-3">
  <img src="..." alt="..." className="w-full h-96 object-cover" />
  <div className="bg-[#1b1612] text-white text-center py-4 px-6">
    <p className="italic text-sm">Caption text here...</p>
  </div>
</div>
```

---

## 16. NOTES FOR REPRODUCTION

1. **Image Optimization:** All images should be WebP format when possible, JPEG as fallback
2. **Color Consistency:** Use exact hex codes provided—no approximations
3. **Spacing:** Use Tailwind classes exactly as specified (e.g., gap-12, my-20)
4. **Typography:** Maintain font weights and sizes for visual hierarchy
5. **Animations:** Use Framer Motion with provided fadeUp variant
6. **Responsive Design:** Test on mobile, tablet, and desktop viewports
7. **Accessibility:** Ensure proper contrast ratios and semantic HTML
8. **Performance:** Lazy-load images, optimize bundle size
9. **Consistency:** Apply this template to all service pages for brand cohesion

---

## 17. CONTACT & UPDATES

For questions or updates to this design system, contact the TXUS design team.

**Last Reviewed:** May 10, 2026  
**Next Review:** Q3 2026
