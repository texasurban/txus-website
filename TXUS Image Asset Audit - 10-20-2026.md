# TXUS Image Asset Audit — Inventory Pass

**Date:** October 20, 2026  
**Mode:** Inventory and reporting only; no website files, assets, visible copy, layout, or design were changed.

## Operating rules applied

- Current website design and visible content are locked.
- No website modification is made unless Dev explicitly says **“proceed.”**
- Findings, recommendations, invisible technical changes, and approval-required changes are separated.
- SEO and image review preserves the current visual experience and service-card alignment rule.

## Inventory summary

- JSX files scanned: **104**
- `<img>` elements found: **122**
- Unique static image references found: **162**
- Image tags with missing/undetectable alt text: **0**
- Image tags without explicit loading behavior: **84**
- External image URLs found in `<img>` tags: **6**

### Source distribution

- dynamic/other: 38
- external: 6
- manus-storage: 78

### Referenced file extensions

- `jpg`: 36
- `png`: 7
- `unknown/dynamic`: 38
- `webp`: 41

## Findings

### External image URLs requiring review

- `https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/CAHtb59ZUNY7YiqafFtZ8m/pmp-process-mockup-9YWVpCJLpB26SD93nPkMUA.webp`
- `https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/OHzHBFMifITIHGsL.webp`
- `https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/QtfRhkeujtrLSEBH.webp`
- `https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/ySmmZJTlgaIYEFJA.webp`
- `https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/zSbveSXPjvGzODFY.webp`
- `https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/49fac2ec-734b-4e8c-a1c4-561aafccfc03/USDA+FS+Grant+Recipient+%26+Sponsors.jpg`

### Missing explicit loading behavior

- `client/src/components/FancyHeroBanner.tsx` image 1: source `dynamic`
- `client/src/components/HeroBanner.tsx` image 1: source `dynamic`
- `client/src/components/ManusDialog.tsx` image 1: source `dynamic`
- `client/src/components/Navigation.tsx` image 1: source `dynamic`
- `client/src/components/Navigation.tsx` image 2: source `dynamic`
- `client/src/pages/AboutUs.tsx` image 1: source `dynamic`
- `client/src/pages/BlogArticles/AustinStateHospital.tsx` image 1: source `/manus-storage/ash_building_ribbon_cutting_45371dc6_3f2d06d1.webp`
- `client/src/pages/BlogArticles/AustinStateHospital.tsx` image 2: source `/manus-storage/ash_conference_table_correct_ca510450_2acedc50.webp`
- `client/src/pages/BlogArticles/AustinStateHospital.tsx` image 4: source `/manus-storage/ash_integration_correct_31ad93f5_0c93a177.webp`
- `client/src/pages/BlogArticles/StinsonTest.tsx` image 1: source `/manus-storage/stinson_walnut_slab_raw_7e4cc9d5_6f092572.webp`
- `client/src/pages/BlogArticles/StinsonTest.tsx` image 2: source `/manus-storage/stinson_steel_base_fabrication_f45666e3_86105e2d.webp`
- `client/src/pages/BlogArticles/StinsonTest.tsx` image 3: source `/manus-storage/stinson_walnut_finishing_samples_b59439b7_5c9a205c.webp`
- `client/src/pages/BlogArticles/StinsonTest.tsx` image 4: source `/manus-storage/stinson_final_home_family_ded41447_d38ca067.webp`
- `client/src/pages/Contact.tsx` image 1: source `/manus-storage/TXUSHeroBannerWebsite1920x600_3c5a40ee_767c8a62.png`
- `client/src/pages/FamilyLegacyGallery.tsx` image 1: source `/manus-storage/WomackPecanComposite_d92e3597_6233c744.jpg`
- `client/src/pages/GoldWalnutGallery.tsx` image 1: source `/manus-storage/GoldWalnutComposite_99c6497e_cc14ebaa.jpg`
- `client/src/pages/HillcoGallery.tsx` image 1: source `/manus-storage/HillcoPartners-17FootPecanQuadMatch75_10aeadf3_86caba2b.jpg`
- `client/src/pages/HillcoGallery.tsx` image 2: source `/manus-storage/HillcoPartners-17FootPecanQuadMatch1_c07b8296_50946ead.jpg`
- `client/src/pages/HillcoGallery.tsx` image 3: source `/manus-storage/HillcoPartners-17FootPecanQuadMatch89_512f043c_6b483791.jpg`
- `client/src/pages/HillcoGallery.tsx` image 4: source `/manus-storage/HillcoPartners-17FootPecanQuadMatch,16to9Ratio_4b880936_1099e1d3.jpg`
- `client/src/pages/Home.tsx` image 1: source `/manus-storage/team_photo_web_5972aded_dbac91fb.webp`
- `client/src/pages/Home.tsx` image 2: source `dynamic`
- `client/src/pages/Home.tsx` image 3: source `dynamic`
- `client/src/pages/Home.tsx` image 4: source `dynamic`
- `client/src/pages/Home.tsx` image 5: source `dynamic`
- `client/src/pages/Home.tsx` image 6: source `dynamic`
- `client/src/pages/Home.tsx` image 7: source `dynamic`
- `client/src/pages/Home.tsx` image 8: source `/manus-storage/TXUSUSDAWoodInnovationsVideo1_5055760d_eda7e1a6_d7e0f144.png`
- `client/src/pages/Home.tsx` image 9: source `/manus-storage/TXUSUSDAWoodInnovationsVideo2_b14eb930_ae8b9e6e_c9af2b62.png`
- `client/src/pages/Home.tsx` image 10: source `/manus-storage/TXUSUSDAWoodInnovationsVideo3_83a6a534_7e583308_0a7912a1.png`
- `client/src/pages/Home.tsx` image 11: source `/manus-storage/TXUSUSDAWoodInnovationsVideo4_25518123_cdd95b23_57dd1ff8.png`
- `client/src/pages/Home.tsx` image 12: source `/manus-storage/TXUSUSDAWoodInnovationsVideo5_fe058513_ed4f0fc1_caf11f14.png`
- `client/src/pages/Home.tsx` image 13: source `dynamic`
- `client/src/pages/Home.tsx` image 14: source `dynamic`
- `client/src/pages/Home.tsx` image 15: source `/manus-storage/SarahHeadshot_07208f28_4b44cdce.jpg`
- `client/src/pages/Home.tsx` image 16: source `/manus-storage/JesseHeadshot_f5af6ed9_2121f513.jpg`
- `client/src/pages/Home.tsx` image 17: source `/manus-storage/DevinHeadshot_aba8be4f_e3604300.jpg`
- `client/src/pages/IBeamGallery.tsx` image 1: source `/manus-storage/Texas_Urban_Sawmill_Billet_OmegaWalnut-56_b496c9ab_f0ccafa1.jpg`
- `client/src/pages/IBeamGallery.tsx` image 2: source `/manus-storage/Texas_Urban_Sawmill_Billet_OmegaWalnut-58_98b79a8f_09cba683.jpg`
- `client/src/pages/IBeamGallery.tsx` image 3: source `/manus-storage/Texas_Urban_Sawmill_Billet_OmegaWalnut-94_ccd49edc_39c96252.jpg`
- `client/src/pages/OmegaGallery.tsx` image 1: source `/manus-storage/HickmanWalnutComposite_5b15122d_63d19e6e.jpg`
- `client/src/pages/PecanBunkerGallery.tsx` image 1: source `/manus-storage/PecanBunkerComposite_4d5f2f52_35f6af16.jpg`
- `client/src/pages/PecanTrestleGallery.tsx` image 1: source `/manus-storage/Brad&KerryPecanTrestleTable47_94111cec_bebd8d24.jpg`
- `client/src/pages/PecanTrestleGallery.tsx` image 2: source `/manus-storage/Brad&KerryPecanTrestleTable45_17014b2e_280733e2.jpg`
- `client/src/pages/PecanTrestleGallery.tsx` image 3: source `/manus-storage/Brad&KerryPecanTrestleTable18_1856bb6b_3275a96b.jpg`
- `client/src/pages/ServiceLogTransport.tsx` image 1: source `/manus-storage/pasted_file_1NUlMM_TXUS20-tonCraneTruck1_b41c4db2.jpg`
- `client/src/pages/ServiceLogTransport.tsx` image 2: source `/manus-storage/TXUS-20-ton-Crane-Truck-1_c58fd3b0.webp`
- `client/src/pages/ServiceLogTransport.tsx` image 3: source `/manus-storage/Texas_Urban_Sawmill_CameronOak-41_e01fadeb.webp`
- `client/src/pages/ServiceLogTransport.tsx` image 4: source `/manus-storage/TXUS-20-Ton-Crane-Truck-Clearance_fc13e360.webp`
- `client/src/pages/ServiceLumber.tsx` image 1: source `/manus-storage/TXUSHeroBannerWebsite1920x600_a3cb474e.png`
- `client/src/pages/ServiceLumber.tsx` image 2: source `/manus-storage/TXUSSarah&Dogs-AsheJuniper-AusinHabitatforHumanity_00a231bf.jpg`
- `client/src/pages/ServiceLumber.tsx` image 3: source `/manus-storage/TXUSOakBeam_f9cc7e55.webp`
- `client/src/pages/ServiceLumber.tsx` image 4: source `/manus-storage/TXUSEnglishWalnutMantle5_d288d81d.jpg`
- `client/src/pages/ServiceLumber.tsx` image 5: source `/manus-storage/TXUS-CindyWalnutGoldOBase16_41c05dce.jpg`
- `client/src/pages/ServiceLumber.tsx` image 6: source `/manus-storage/CustomMilled_03fc4026.webp`
- `client/src/pages/ServiceLumber.tsx` image 7: source `/manus-storage/Texas_Urban_Sawmilll_31_6a41e9b9.webp`
- `client/src/pages/ServiceMillworks.tsx` image 1: source `/manus-storage/20260507_121057_bd6dc2e7.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 2: source `/manus-storage/TXUSCNCServices_d7715daf.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 3: source `/manus-storage/20260508_105250_676b21d1.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 4: source `/manus-storage/20260423_150042_29fd5f52.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 5: source `/manus-storage/TXUSDripNaturalSigns_4ce82498.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 6: source `/manus-storage/Texas_Urban_Sawmill_Team-137_1de71412.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 7: source `/manus-storage/20260508_110854_489d1428.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 8: source `/manus-storage/20260507_154809_76af8f02.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 9: source `/manus-storage/20260406_110142_2461b5a9.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 10: source `/manus-storage/20260417_155829_2268ef7c.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 11: source `/manus-storage/20260417_145707_8cd935ee.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 12: source `/manus-storage/20260419_181047_b4bc96a5.jpg`
- `client/src/pages/ServiceMillworks.tsx` image 13: source `/manus-storage/20260420_090741_a048ffe3.jpg`
- `client/src/pages/ServiceSawmilling.tsx` image 1: source `/manus-storage/hero-sawmill-timber-edge_e2f38fbf_c180a6f2.webp`
- `client/src/pages/ServiceSawmilling.tsx` image 2: source `/manus-storage/sawmilling-hero-wm1000-final_e97520f2_490e46b9.webp`
- `client/src/pages/ServiceSawmilling.tsx` image 3: source `/manus-storage/kiln-drying-chamber-final_3e08b431_d77bef5d.webp`
- `client/src/pages/ServiceTreeCare.tsx` image 1: source `/manus-storage/tree-care-hero_27d9548f.webp`
- `client/src/pages/ServiceTreeCare.tsx` image 2: source `/manus-storage/tree-service-team_b4b7aa0b.webp`
- `client/src/pages/ServiceTreeCare.tsx` image 3: source `/manus-storage/tree-care-apartments_f4f18c46.webp`
- `client/src/pages/ServiceTreeCare.tsx` image 4: source `/manus-storage/tree-care-removal_b6ecda71.webp`
- `client/src/pages/ServiceTreeCare.tsx` image 5: source `/manus-storage/tree-care-cutting_26d62dc5.webp`
- `client/src/pages/ServiceTreeCare.tsx` image 6: source `/manus-storage/tree-care-chipping_a57cd7b5.webp`
- `client/src/pages/ServiceTreeReuse.tsx` image 1: source `/manus-storage/20200427_123813_d1beef85.webp`
- `client/src/pages/ServiceTreeReuse.tsx` image 2: source `/manus-storage/AustinStateHospital-TreeSurvey35_cab1ad1f.webp`
- `client/src/pages/ServiceTreeReuse.tsx` image 3: source `/manus-storage/AustinStateHospital-TreeSurvey60_31935268.webp`
- `client/src/pages/ServiceTreeReuse.tsx` image 4: source `https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/CAHtb59ZUNY7YiqafFtZ8m/pmp-process-mockup-9YWVpCJLpB26SD93nPkMUA.webp`
- `client/src/pages/Services.tsx` image 1: source `dynamic`
- `client/src/pages/StinsonGallery.tsx` image 1: source `/manus-storage/StinsonWalnutComposite_e04c8d8a_49846453.jpg`

## TXUS standards to compare during the next pass

- General default: approximately **1200 × 1200 px at 72 DPI**, except where the existing layout or source composition requires another aspect ratio.
- Blog images: **WebP**, maximum width **1000 px**, quality approximately **85**, medium **50–150 KB**, large **150–300 KB**.
- Blog alt text: `[Description] - Texas Urban Sawmill`.
- Preserve important wood grain, species detail, faces, engraving, and craftsmanship.
- Use descriptive lowercase kebab-case filenames for new or replacement assets.
- Use `loading="lazy"` for appropriate below-fold images; keep primary above-the-fold heroes from being blindly lazy-loaded.
- Use explicit dimensions or stable aspect-ratio wrappers where needed to reduce layout shift.

## Limitations of this inventory pass

- A local byte-level sample was available in `/home/ubuntu/upload` and was inspected without modifying the originals.
- Ten project photographs are **1200 × 676 px at 72 DPI**, with file sizes from approximately **141–274 KB**. These are reasonable landscape assets for project cards or content sections, but they are not square 1200 × 1200 images; the wide ratio should be treated as an intentional layout exception where those assets are used.
- `Jesse,Sarah&Devin-MeettheMakers.webp` is **1000 × 563 px** and approximately **76 KB**, which is a strong web-delivery result for a wide team image. Its source filename is not lowercase kebab-case, so it is a filename-standard review item if the asset is ever replaced or re-uploaded.
- `TXUSCNCServices.jpg` is **1280 × 721 px** and approximately **472 KB**. It is above the preferred 1000 px blog maximum and should be reviewed as a page-role exception, not changed automatically.
- `TXUSDripNaturalSigns.jpg` is **2048 × 1153 px** and approximately **402 KB** with no embedded DPI reported. It is a high-priority review candidate if it is used as an embedded page image; retain the larger original only if it is intended for separate viewing or detailed inspection.
- The two 600 × 338 team images are approximately **141–145 KB** at 72 DPI and appear reasonable for card or content use, subject to visual review.
- Most project images are delivered through Manus storage paths and are not present as local source files in the restored workspace; byte-level dimensions, file sizes, compression quality, and embedded DPI cannot be certified from JSX references alone.
- This report therefore distinguishes source/reference compliance from file-byte compliance.
- A follow-up asset-byte pass should download or otherwise inspect approved storage objects, then record dimensions, file size, format, quality, and any intentional exception.
- No assets were downloaded, resized, recompressed, renamed, replaced, or removed during this pass.

## Approved invisible remediation pass

The following website changes were approved after the inventory pass and were implemented without changing visible copy, layout, image placement, navigation, footer, or design:

- Added page-specific Open Graph/Twitter images to the core, service, portfolio, About Us, Contact, and Blog pages using existing project assets.
- Added shared `og:site_name` metadata for Texas Urban Sawmill.
- Added no-index support and applied it to the internal Component Showcase and 404 routes.
- Added `decoding="async"` to image elements and `loading="lazy"` to appropriate non-primary images.
- Corrected the Portfolio primary hero so it is not lazy-loaded.
- Applied the approved blog alt-text suffix to remaining meaningful article images.
- Standardized the About Us and Services canonical URLs to the approved non-`www` production domain.
- Replaced three non-rendering dedicated blog hero references with confirmed internal TXUS storage assets; dedicated replacement artwork remains optional and approval-gated.
- Deferred all external image URL migration until the actual production domain is published.

Tests and production build should be re-run after this pass before the next checkpoint.

## Proposed next step — approval required

After Dev reviews this inventory, choose one of:

1. **Continue audit only:** inspect storage-object dimensions and file sizes without changing assets.
2. **Proceed with invisible technical changes:** add loading/dimension metadata and migrate approved external assets while preserving visual output.
3. **Approve selected asset changes:** replace or recompress specific files after visual comparison.

No option will be implemented automatically.
