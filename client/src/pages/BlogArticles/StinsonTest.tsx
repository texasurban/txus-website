/**
 * Blog Article: Stinson Test - Replicating Original Page Content
 * 
 * This test article replicates the content and layout from the original Stinson page
 * to demonstrate how the full page content looks in blog article format.
 */

import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const heroImage = "/manus-storage/stinson_table_installation_home_857fc377_df7c985c.webp";

export default function StinsonTest() {
  return (
    <>
      <SEOHead
        title="Stinson Gallery - Custom Walnut Dining Table | Texas Urban Sawmill"
        description="An 800-pound masterpiece: The Stinson S-Base Walnut Table, designed and built entirely in-house by Texas Urban Sawmill. A one-of-a-kind creation featuring a 300-year-old walnut slab and custom-fabricated steel base."
        url="https://txurbansawmill.com/blog/stinson-test"
        image={heroImage}
      
        type="article"
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* Hero Banner */}
          <FancyHeroBanner
            mainTitle="Stinson Gallery"
            subtitle="Custom Walnut Dining Table"
            imageUrl={heroImage}
            imageAlt="Stinson Gallery Custom Walnut Dining Table - Texas Urban Sawmill"
          />

          {/* Main Content Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-8">
                An 800-Pound Masterpiece: The Stinson "S-Base" Walnut Table
              </h1>

              <div className="space-y-8 text-lg leading-relaxed text-[#3d3d3d]">
                <p>
                  Designed and built entirely in-house by Texas Urban Sawmill, the Stinson Gallery walnut dining table is a truly one-of-a-kind creation. From the custom-fabricated steel base to the 3-inch-thick solid walnut slab top, no other table like it exists anywhere in the world.
                </p>

                <p>
                  The full process—from design through fabrication and finishing—spanned more than six months, a testament to the meticulous craftsmanship behind the piece. Work of this caliber cannot be rushed, and the patience of our clients was a key factor in achieving its elegance and rare beauty.
                </p>

                <p>
                  The steel base, designed in collaboration with our clients and handbuilt by Devin Ginther, highlights his expertise as a metal fabricator and design engineer. With over 30 years of MIG and TIG welding experience—honed originally on custom Jeeps and hot rods—Devin applied his skills to create a refined architectural form.
                </p>

                <p>
                  The tabletop was crafted from a single old-growth black walnut tree over 70 inches in diameter—the largest live-edge slab ever used by Texas Urban Sawmill. Jesse Mahoney oversaw the selection, design, and finishing, highlighting the subtle beauty of the wood's natural wane and eye-opening character. Walnut trees of this size are exceptionally rare, especially in Texas, and this remarkable slab was sourced from Oregon.
                </p>
              </div>
            </div>
          </section>

          {/* The Walnut Slab Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-8">
                  A 300-Year-Old Walnut Slab from Oregon
                </h2>

                <div className="space-y-8">
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    It all began with a massive old-growth black walnut slab from Oregon. Harvested from a 300-year-old tree over 70 inches in diameter, this 3-inch-thick slab was carefully kiln-dried to preserve its character and stability.
                  </p>

                  <div className="flex justify-center">
                    <img
                      src="/manus-storage/stinson_walnut_slab_raw_7e4cc9d5_6f092572.webp"
                      alt="The massive 300-year-old walnut slab from Oregon - Texas Urban Sawmill"
                      className="w-2/3 max-w-2xl rounded-lg border-2 border-[#1a4d2e] shadow-2xl"
                     decoding="async"/>
                  </div>
                  <p className="text-center text-sm text-[#666] mt-2 italic">
                    The massive 300-year-old walnut slab from Oregon—over 70 inches in diameter and 3 inches thick
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Steel Base Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-8">
                The Sculptural Steel Base: A Work of Art
              </h2>

              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  The base design was inspired by our client's last name, making it truly personal. Fabricated entirely in-house, from bending the steel to precise TIG and MIG welding, the base took about three months to complete. Its 13 steel components are seamlessly integrated into a striking sculpture.
                </p>

                <div className="flex justify-center">
                    <img
                      src="/manus-storage/stinson_steel_base_fabrication_f45666e3_86105e2d.webp"
                      alt="The steel base design inspired by the Stinson family name - Texas Urban Sawmill"
                      className="w-2/3 max-w-2xl rounded-lg border-2 border-[#1a4d2e] shadow-2xl"
                     decoding="async" loading="lazy"/>
                </div>
                <p className="text-center text-sm text-[#666] mt-2 italic">
                  The steel base design inspired by the Stinson family name—13 components seamlessly integrated through precision TIG and MIG welding
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  The lead designers at Texas Urban Sawmill set out to create a base that was truly one-of-a-kind, unlike anything else in the world. They combined the modern aesthetic of a handcrafted steel structure with the warmth of a solid 3-inch walnut slab, shaped with custom tooling to achieve a distinctive and elegant edge profile.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  The base is a work of art in its own right—a handcrafted sculpture that showcases the meticulous attention to detail and exceptional craftsmanship of Texas Urban Sawmill. Its beauty stands alone, commanding admiration from every angle. The base alone weighs over 500 lbs, and combined with the solid 3-inch walnut top, the finished table tips the scales at approximately 800 lbs!
                </p>
              </div>
            </div>
          </section>

          {/* Precision Finishing Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-8">
                  Precision Finishing and Custom Paint
                </h2>

                <div className="space-y-8">
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Extra care and attention went into the final finish of the walnut. Jesse Mahoney worked to maximize the rich color tones while highlighting the dramatic figure and unique character of this rare grain. You can also see the precision recess for the base top mount, which sits flush with the underside of the tabletop.
                  </p>

                  <div className="flex justify-center">
                    <img
                      src="/manus-storage/stinson_walnut_finishing_samples_b59439b7_5c9a205c.webp"
                      alt="Extra care and attention to the final finish - Texas Urban Sawmill"
                      className="w-2/3 max-w-2xl rounded-lg border-2 border-[#1a4d2e] shadow-2xl"
                     decoding="async" loading="lazy"/>
                  </div>
                  <p className="text-center text-sm text-[#666] mt-2 italic">
                    Extra care and attention to the final finish—maximizing rich color tones and highlighting the dramatic grain character
                  </p>

                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Given the high cost of bronze electro-plating, our clients chose a custom-painted base, perfectly color-matched to the fixtures in their new home. The base was professionally finished by a custom hot-rod paint shop, providing a superior, durable alternative to industrial powder coating. This is an epoxy base coat after the initial "body" work was complete.
                  </p>

                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Behold the breathtaking fiddleback figuring that flows across the entire surface of this walnut slab. Coveted for its rare, shimmering chatoyance, fiddleback embodies luxury and precision, revered in the gunstock industry and beyond for its unparalleled beauty.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Installation and Impact Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-8">
                Installation and Generational Impact
              </h2>

              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  Installing this dining table in the newly constructed home took nearly three hours of careful, precise work. The sheer weight and complexity of the piece required expert handling and attention to detail. Once in place, the table became the centerpiece of the Stinson family's home—a daily reminder of the power of responsible stewardship and sustainable design.
                </p>

                <div className="flex justify-center">
                    <img
                      src="/manus-storage/stinson_final_home_family_ded41447_d38ca067.webp"
                      alt="The finished 800-pound masterpiece installed in the Stinson family home - Texas Urban Sawmill"
                      className="w-2/3 max-w-2xl rounded-lg border-2 border-[#1a4d2e] shadow-2xl"
                     decoding="async" loading="lazy"/>
                </div>
                <p className="text-center text-sm text-[#666] mt-2 italic">
                  The finished 800-pound masterpiece installed in the Stinson family's home—a generational work of functional art
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  Such a beautiful home, filled with wonderful people. We are truly honored to work with such special clients, and the entire Texas Urban Sawmill team is deeply grateful for their trust and the opportunity to create a generational work of functional art. Thank you, Stinson family!
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Ready to Create Your Masterpiece?
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Let Texas Urban Sawmill design and build a custom piece that will become a family heirloom.
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
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
