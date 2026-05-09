/**
 * Blog Article: Sustainable Furniture Design
 * 
 * Design Philosophy: Matches established TXUS blog article standards
 * Color Scheme: #1a4d2e (green), #1b1612 (dark text), #3d3d3d (body text), #f0f0f0 (section backgrounds)
 */

import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const heroImage = "/manus-storage/sustainable_furniture_design_hero.jpg";

export default function SustainableFurnitureDesign() {
  return (
    <>
      <SEOHead
        title="Sustainable Furniture Design | Texas Urban Sawmill"
        description="Discover the art and science of sustainable furniture design. Learn how Texas Urban Sawmill creates heirloom-quality pieces from reclaimed urban wood that last generations."
        url="https://txsawmill-hnwf9q8m.manus.space/blog/sustainable-furniture-design"
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* Hero Banner */}
          <FancyHeroBanner
            mainTitle="Sustainable Furniture Design"
            subtitle="Crafting Heirloom Pieces from Rescued Wood"
            imageUrl={heroImage}
            imageAlt="Sustainable furniture design and custom woodworking - Texas Urban Sawmill"
          />

          {/* Project Overview Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                The Art of Sustainable Furniture: Design Principles for Lasting Value
              </h1>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Sustainable furniture design is more than an aesthetic choice—it's a philosophical commitment to creating pieces that endure, tell stories, and honor the materials from which they're made. At Texas Urban Sawmill, we believe that the most sustainable furniture is furniture that lasts generations. Every piece we create is designed to become a family heirloom, a testament to craftsmanship, and a daily reminder of responsible stewardship.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-[#3d3d3d]">
                <div><strong>Design Philosophy:</strong> Heirloom-Quality Craftsmanship</div>
                <div><strong>Primary Material:</strong> Reclaimed Urban Wood</div>
                <div><strong>Design Approach:</strong> Material-Driven & Timeless</div>
                <div><strong>Target Lifespan:</strong> Generations, Not Years</div>
              </div>
            </div>
          </section>

          {/* The Problem with Disposable Furniture Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  The Problem with Disposable Furniture
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Modern furniture culture has embraced a throwaway mentality. Pieces are designed for short lifespans, made with cheap materials and poor construction, and destined for landfills within a few years. This approach creates massive environmental waste and misses the opportunity to create lasting value.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Consider the lifecycle of typical mass-produced furniture:
                </p>

                <ul className="space-y-3 ml-6 list-disc text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  <li>Cheap materials sourced globally, creating transportation emissions</li>
                  <li>Poor construction that fails within 3-5 years</li>
                  <li>Difficult or impossible to repair</li>
                  <li>Ends up in landfills, creating waste</li>
                  <li>Cycle repeats: buy, use briefly, discard, buy again</li>
                </ul>

                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  This cycle is economically wasteful and environmentally destructive. Sustainable furniture design offers a different path.
                </p>
              </div>
            </div>
          </section>

          {/* Core Principles Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Core Principles of Sustainable Furniture Design
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">1. Timeless Design Over Trends</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Sustainable furniture is designed to remain beautiful and relevant for decades. We avoid trendy styles that will feel dated in a few years. Instead, we create pieces with clean lines, classic proportions, and enduring appeal. A well-designed piece becomes more valuable over time, not less.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">2. Quality Materials & Craftsmanship</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Every piece begins with premium materials. Reclaimed urban wood offers character, stability, and a story. Combined with expert joinery, precision finishing, and attention to detail, we create furniture built to last centuries. Quality materials and craftsmanship are not luxuries—they're investments in longevity.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">3. Repairability & Adaptability</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Sustainable furniture is designed to be repaired and adapted. Joints are accessible, finishes can be refreshed, and components can be replaced if needed. A leg can be re-turned, a finish can be renewed, a cushion can be recovered. This repairability extends the life of pieces indefinitely.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">4. Material Honesty & Storytelling</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    We celebrate the materials we use. Rather than hiding wood grain or character, we showcase it. Each piece tells a story: where the tree came from, how it was rescued, who crafted it. This transparency and storytelling creates emotional connection and meaning that mass-produced furniture can never achieve.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">5. Local Sourcing & Production</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    All materials are sourced, processed, and crafted locally. This minimizes transportation emissions, supports local economies, and ensures quality control at every step. You know exactly where your furniture comes from and who made it.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">6. Functional Beauty</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Sustainable furniture prioritizes function. A piece must work beautifully for its intended purpose, day after day, year after year. Form follows function, and beauty emerges from that functional excellence. Pieces that work well are pieces people keep and treasure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Design Process Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Our Sustainable Design Process
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  At Texas Urban Sawmill, sustainable furniture design begins with understanding the materials available. Rather than designing first and sourcing materials second, we let the wood guide the design.
                </p>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <h3 className="text-lg font-semibold text-[#1b1612] mb-2">1. Material Discovery</h3>
                    <p className="text-lg leading-relaxed text-[#3d3d3d]">
                      We identify exceptional reclaimed wood—unique grain patterns, colors, and character. This material becomes the starting point for design inspiration.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <h3 className="text-lg font-semibold text-[#1b1612] mb-2">2. Concept Development</h3>
                    <p className="text-lg leading-relaxed text-[#3d3d3d]">
                      We sketch and develop designs that showcase the material's beauty while meeting functional requirements. The design celebrates, not hides, the wood's character.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <h3 className="text-lg font-semibold text-[#1b1612] mb-2">3. Precision Crafting</h3>
                    <p className="text-lg leading-relaxed text-[#3d3d3d]">
                      Expert craftspeople bring the design to life using traditional joinery techniques, precision tools, and meticulous attention to detail. Every joint is engineered for strength and longevity.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <h3 className="text-lg font-semibold text-[#1b1612] mb-2">4. Finishing & Testing</h3>
                    <p className="text-lg leading-relaxed text-[#3d3d3d]">
                      Finishes are applied to enhance and protect the wood. Each piece is tested for stability, function, and durability before it leaves our workshop.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <h3 className="text-lg font-semibold text-[#1b1612] mb-2">5. Storytelling & Documentation</h3>
                    <p className="text-lg leading-relaxed text-[#3d3d3d]">
                      Every piece is documented with its story—the tree's origin, the crafting process, care instructions, and repair guidance. This documentation becomes part of the piece's value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Long-Term Value Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                The Long-Term Value of Sustainable Furniture
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                While sustainable furniture may cost more initially than mass-produced alternatives, the long-term value is incomparable. Consider the math:
              </p>

              <div className="space-y-4 text-lg leading-relaxed text-[#3d3d3d]">
                <p>
                  <strong>Disposable Furniture:</strong> $500 piece, lasts 3 years = $167/year. Replace 10 times in 30 years = $5,000 total cost + waste.
                </p>
                <p>
                  <strong>Sustainable Furniture:</strong> $3,000 piece, lasts 50+ years = $60/year. One piece for 30 years = $3,000 total cost + no waste + increased value.
                </p>
              </div>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mt-6">
                Beyond economics, sustainable furniture offers intangible value: the joy of owning a beautiful piece you know will last, the story of the wood and its makers, the satisfaction of making an environmentally responsible choice, and the privilege of passing heirloom pieces to future generations.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Ready to Invest in Sustainable Furniture?
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Let's create a custom piece that will become a family heirloom.
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
