# TXUS Website Phase 2 - Project TODO

## Phase 1: Copy Phase 1 Source Files and Restore Project Structure
- [x] Copy all client source files (pages, components, styles)
- [x] Copy all server files and database schema
- [x] Copy configuration files (tsconfig, vite, vitest, drizzle)
- [x] Copy patches directory
- [x] Download all 77 images from Phase 1 manus-storage URLs
- [x] Upload 71 images to new Phase 2 project storage
- [x] Update all image references to use new storage paths
- [x] Install missing dependencies (react-helmet-async, framer-motion, wouter, @testing-library/react)
- [x] Fix TypeScript errors (SEOHead, FancyHeroBanner, storageProxy, Home.tsx, Blog.tsx)
- [x] Fix test assertions in Navigation.test.tsx and Footer.test.tsx
- [x] Verify dev server is running with 0 compilation errors
- [x] Download and upload 3 external CloudFront images to Manus storage
- [x] Update Home.tsx to use new Manus storage paths for hero, furniture, and about images

## Phase 2: Restore All Routes, Components, and Global Styles
- [x] Verify all routes in App.tsx are working (Home, Services, Blog, Portfolio, Contact)
- [x] Test navigation dropdown links for Services menu
- [x] Verify all reusable components render correctly (Navigation, Footer, SEOHead, FancyHeroBanner, HeroBanner, Map)
- [x] Verify global styling consistency (dark charcoal footer #2a2a2a, gold accents #d7a469, light grey alternating backgrounds)
- [x] Test responsive design across mobile, tablet, and desktop
- [x] Update Services dropdown to link Custom Heirloom Furniture to /portfolio

## Phase 3: Re-upload and Wire All Manus-Storage Assets
- [x] Migrate remaining 24 unique external CloudFront URLs from gallery/portfolio pages to Manus storage
- [x] Download all 24 CloudFront images
- [x] Upload all 24 images to Manus storage
- [x] Update 9 gallery/portfolio files with new Manus storage paths
- [x] Select confirmed existing internal hero images as placeholders for the 3 missing blog articles (dedicated replacement assets remain optional)
- [x] Use confirmed existing project-storage images; no new upload was required for the temporary placeholders
- [x] Update blog article components to reference new storage paths

## Phase 4: Complete Placeholder Service Pages
- [x] Complete ServiceLumber.tsx (Lumber, Beams, Mantels & Slabs) using ServiceSawmilling.tsx as template
- [x] Remove ServiceFurniture.tsx and redirect /services/furniture to /portfolio
- [x] Complete ServiceTreeReuse.tsx (Tree Re-Use Construction) with full copy and imagery
- [x] Complete ServiceLogTransport.tsx (Log Transport & Crane Services) with full copy and imagery
  - Updated access and clearance requirements section
  - Added comprehensive site preparation guide
  - Synced pricing with Sawmilling page
  - Made email address clickable
  - Added full-width clearance image
  - Aligned CTAs at bottom of text boxes
  - Increased pricing font size for readability
- [x] Complete ServiceTreeCare.tsx (Tree Care, Removals & Consulting) with full copy and imagery
  - Added 4 full-width, full-height images to gallery section
  - Redesigned with side-by-side layout (image left, text right)
  - Added caption overlay below image with brown background
  - Top-aligned boxes for visual balance
  - 4 service cards with images and descriptions
  - Updated 4th card title to "Sustainable Land Services"
  - Increased fonts 25% for better readability
  - Added Eric Wilder partnership details
- [x] Complete ServiceMillworks.tsx (Millworks, CNC, & Laser) with full copy and imagery
- [x] Verify all 6 service pages render correctly with consistent styling

## Phase 5: Finalize Remaining Blog Articles
- [x] Complete ClimateSmartProjects.tsx blog article with full content
- [x] Complete TreeReuseUrbanDevelopment.tsx blog article with full content
- [x] Complete SustainableFurnitureDesign.tsx blog article with full content
- [x] Verify all 3 blog articles match established blog article standard
- [x] Ensure all blog articles have proper hero images and metadata

## Phase 6: Fix Services Dropdown Navigation and Verify All Routes
- [x] Test Services dropdown menu opens/closes correctly
- [x] Verify each Services menu item links to correct individual service page
- [ ] Test all navigation links across the entire site
- [ ] Verify back navigation works on all subpages
- [x] Test breadcrumb navigation (not applicable; no public breadcrumb system is currently implemented)

## Phase 7: Verify Global Styling Consistency Across All Pages
- [x] Verify dark charcoal footer (#2a2a2a) appears on all public pages (shared Footer now renders on every public page component)
- [ ] Verify gold accents (#d7a469) are consistent across all pages
- [ ] Verify light grey alternating section backgrounds on all pages
- [ ] Verify Civic Industrial Stewardship typography is consistent
- [ ] Test responsive design on all pages (mobile, tablet, desktop)
- [ ] Verify all images load correctly and display properly

## Phase 8: Test, Verify, and Publish the Completed Baseline
- [x] Run all unit tests and ensure they pass
- [ ] Perform full site walkthrough (all pages, all links, all images)
- [ ] Test contact form functionality
- [ ] Test social media links
- [x] Verify SEO meta tags on all public pages (internal ComponentShowcase and NotFound routes are intentionally no-indexed)
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Create final checkpoint for production baseline
- [ ] Publish to production

- [x] Align green CTA buttons across all six service cards so their bottom spacing matches the reference cards #3, #4, and #6
- [x] Apply the same consistent CTA button alignment to the six cards on the main Services page
- [x] Correct CTA vertical alignment for card 04, Log Transport & Crane Services
- [x] Replace Learn More with About Us in the site navigation
- [x] Create the About Us page using the supplied Makers section layout and TXUS content
- [x] Add the supplied Jesse, Sarah, and Devin team photo near the top of the About Us page
- [x] Verify the About Us route and navigation links
- [x] Update navigation tests for the About Us label and /about-us route
- [x] Fix the Footer React runtime import so the existing Footer Vitest suite passes
- [x] Update stale Footer tests to match the current footer component and contact-link structure

## Notes
- All images have been successfully uploaded to the new project (71 Phase 1 images + 3 hero images + 24 gallery images = 98 total)
- All Phase 1 source files have been copied and integrated
- Dev server is running with 0 TypeScript errors
- All dependencies have been installed and configured
- Navigation and Footer components are rendering correctly
- All external CloudFront URLs have been migrated to Manus storage
- Custom Heirloom Furniture now links directly to Portfolio page
