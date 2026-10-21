/**
 * Stinson Gallery - Walnut Furniture Showcase
 * 
 * Design Philosophy: Matches Austin State Hospital article design standards
 * Color Scheme: #1a4d2e (green), #1b1612 (dark text), #3d3d3d (body text), #f0f0f0 (section backgrounds)
 * SEO Focus: Stinson Gallery, custom walnut table, luxury furniture, handcrafted design
 */

import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { Link } from "wouter";

// Hero image for the banner
const heroImage = "/manus-storage/stinson_table_hero_installation_6a1d814c_5a3196d2.webp";

// Gallery images
const galleryImages = [
  {
    src: "/manus-storage/stinson_walnut_slab_raw_db5b5f93_5018c96d.webp",
    alt: "Raw old-growth walnut slab from Oregon - Texas Urban Sawmill",
    caption: "The massive 300-year-old walnut slab from Oregon—over 70 inches in diameter and 3 inches thick"
  },
  {
    src: "/manus-storage/stinson_steel_base_fabrication_68946290_470e5400.webp",
    alt: "Steel base fabrication and welding process - Texas Urban Sawmill",
    caption: "The steel base design inspired by the Stinson family name—13 components seamlessly integrated through precision TIG and MIG welding"
  },
  {
    src: "/manus-storage/stinson_walnut_finishing_e780f271_0fe80963.webp",
    alt: "Walnut tabletop finishing and precision work - Texas Urban Sawmill",
    caption: "Extra care and attention to the final finish—maximizing rich color tones and highlighting the dramatic grain character"
  },
  {
    src: "/manus-storage/stinson_table_hero_installation_6a1d814c_5a3196d2.webp",
    alt: "Completed Stinson walnut table installed in home - Texas Urban Sawmill",
    caption: "The finished 800-pound masterpiece installed in the Stinson family's home—a generational work of functional art"
  }
];

export default function StinsonGallery() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Stinson Gallery - Custom Walnut Dining Table | TXUS"
        description="Discover Texas Urban Sawmill's masterpiece: an 800-pound custom walnut dining table with handcrafted steel base. Six months of meticulous craftsmanship in one-of-a-kind furniture."
        url="https://txurbansawmill.com/blog/stinson-gallery"
        image={heroImage}
      
        type="article"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          {/* Hero Banner */}
          <FancyHeroBanner
            mainTitle="Stinson Gallery"
            subtitle="Custom Walnut Dining Table"
            imageUrl={heroImage}
            imageAlt="Stinson Gallery custom walnut dining table with sculptural steel base - Texas Urban Sawmill"
          />

          {/* Project Overview Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                An 800-Pound Masterpiece: The Stinson "S-Base" Walnut Table
              </h1>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Designed and built entirely in-house by Texas Urban Sawmill, the Stinson Gallery walnut dining table is a truly one-of-a-kind creation. From the custom-fabricated steel base to the 3-inch-thick solid walnut slab top, no other table like it exists anywhere in the world. This project represents six months of meticulous craftsmanship, precision engineering, and unwavering commitment to excellence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-[#3d3d3d]">
                <div><strong>Owner:</strong> Stinson Family</div>
                <div><strong>Designers:</strong> Devin Ginther & Jesse Mahoney</div>
                <div><strong>Project Status:</strong> Complete</div>
                <div><strong>Completion:</strong> 2024</div>
              </div>


            </div>
          </section>

          {/* The Walnut Slab Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  A 300-Year-Old Walnut Slab from Oregon
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  It all began with a massive old-growth black walnut slab from Oregon. Harvested from a 300-year-old tree over 70 inches in diameter, this 3-inch-thick slab was carefully kiln-dried to preserve its character and stability. The tabletop was crafted from this single old-growth black walnut tree—the largest live-edge slab ever used by Texas Urban Sawmill. Walnut trees of this size are exceptionally rare, especially in Texas, making this remarkable slab a true treasure.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Jesse Mahoney oversaw the selection, design, and finishing, highlighting the subtle beauty of the wood's natural wane and eye-opening character. Extra care and attention went into the final finish of the walnut. Jesse worked to maximize the rich color tones while highlighting the dramatic figure and unique character of this rare grain.
                </p>

                {/* Photo: Walnut Slab */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                    loading="lazy"
                   decoding="async"/>
                  <div className="w-2/3 mx-auto mt-1">
                    <p className="text-sm text-[#666] italic text-center">{galleryImages[0].caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Steel Base Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                The Sculptural Steel Base: A Work of Art
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                The steel base, designed in collaboration with the Stinson family and handbuilt by Devin Ginther, highlights his expertise as a metal fabricator and design engineer. With over 30 years of MIG and TIG welding experience—honed originally on custom Jeeps and hot rods—Devin applied his skills to create a refined architectural form inspired by the client's last name, making it truly personal.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Fabricated entirely in-house, from bending the steel to precise TIG and MIG welding, the base took about three months to complete. Its 13 steel components are seamlessly integrated into a striking sculpture. The lead designers at Texas Urban Sawmill set out to create a base that was truly one-of-a-kind, unlike anything else in the world. They combined the modern aesthetic of a handcrafted steel structure with the warmth of a solid 3-inch walnut slab, shaped with custom tooling to achieve a distinctive and elegant edge profile.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                The base is a work of art in its own right—a handcrafted sculpture that showcases the meticulous attention to detail and exceptional craftsmanship of Texas Urban Sawmill. Its beauty stands alone, commanding admiration from every angle. The base alone weighs over 500 lbs, and combined with the solid 3-inch walnut top, the finished table tips the scales at approximately 800 lbs!
              </p>

              {/* Photo: Steel Base Fabrication */}
              <div className="my-8 flex flex-col items-center justify-center">
                <img
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                  loading="lazy"
                 decoding="async"/>
                <div className="w-2/3 mx-auto mt-1">
                  <p className="text-sm text-[#666] italic text-center">{galleryImages[1].caption}</p>
                </div>
              </div>
            </div>
          </section>

          {/* The Finishing Process Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Precision Finishing and Custom Paint
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Given the high cost of bronze electro-plating, the Stinson family chose a custom-painted base, perfectly color-matched to the fixtures in their new home. The base was professionally finished by a custom hot-rod paint shop, providing a superior, durable alternative to industrial powder coating. The base was primed with a 2-part epoxy, received 2 color-matched coats, and a final satin-matte clear coat for a refined, lasting finish.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Behold the breathtaking fiddleback figuring that flows across the entire surface of this walnut slab. Coveted for its rare, shimmering chatoyance, fiddleback embodies luxury and precision, revered in the gunstock industry and beyond for its unparalleled beauty. You can also see the precision recess for the base top mount, which sits flush with the underside of the tabletop, showcasing the meticulous engineering that went into every aspect of this piece.
                </p>

                {/* Photo: Walnut Finishing */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                    loading="lazy"
                   decoding="async"/>
                  <div className="w-2/3 mx-auto mt-1">
                    <p className="text-sm text-[#666] italic text-center">{galleryImages[2].caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Installation and Impact Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Installation and Generational Impact
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Installing this dining table in the newly constructed home took nearly three hours of careful, precise work. The sheer weight and complexity of the piece required expert handling and attention to detail. Once in place, the table became the centerpiece of the Stinson family's home—a daily reminder of the power of responsible stewardship and sustainable design.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Such a beautiful home, filled with wonderful people. The entire Texas Urban Sawmill team is deeply grateful for the Stinson family's trust and the opportunity to create a generational work of functional art. This table will be treasured for centuries to come, a testament to the enduring value of handcrafted excellence and the beauty of rescued wood transformed into something extraordinary.
              </p>

              {/* Photo: Completed Installation */}
              <div className="my-8 flex flex-col items-center justify-center">
                <img
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                  loading="lazy"
                 decoding="async"/>
                <div className="w-2/3 mx-auto mt-1">
                  <p className="text-sm text-[#666] italic text-center">{galleryImages[3].caption}</p>
                </div>
              </div>

              <div className="bg-[#f0f0f0] border-l-4 border-[#1a4d2e] px-6 py-4 my-8">
                <p className="text-base font-semibold text-[#1a4d2e] flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  This project demonstrates our commitment to creating heirloom-quality furniture that tells a story of sustainability, craftsmanship, and lasting value for future generations.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Ready to Tell Your Sustainability Story?
                </h2>
                
                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Let Texas Urban Sawmill create a custom piece that reflects your values and stands the test of time.
                </p>

                <Button asChild className="bg-[#1a4d2e] hover:bg-[#0f2e1f] text-white">
                  <Link href="/contact">
                    Start Your Project
                  </Link>
                </Button>

                <div className="mt-8">
                  <Link href="/blog" className="text-[#1a4d2e] font-semibold hover:underline">
                    ← Back to Blog
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
