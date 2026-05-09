/**
 * Blog Article: Climate-Smart Projects Overview
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

const heroImage = "/manus-storage/climate_smart_projects_hero.jpg";

export default function ClimateSmartProjects() {
  return (
    <>
      <SEOHead
        title="Climate-Smart Construction Projects | Texas Urban Sawmill"
        description="Discover how Texas Urban Sawmill integrates adaptive tree re-use and sustainable materials into climate-smart construction projects that reduce waste and environmental impact."
        url="https://txsawmill-hnwf9q8m.manus.space/blog/climate-smart-projects"
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* Hero Banner */}
          <FancyHeroBanner
            mainTitle="Climate-Smart Projects"
            subtitle="Sustainable Construction Solutions"
            imageUrl={heroImage}
            imageAlt="Climate-smart construction projects with sustainable materials - Texas Urban Sawmill"
          />

          {/* Project Overview Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Building for a Better Tomorrow: Climate-Smart Construction
              </h1>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Climate-smart construction represents a fundamental shift in how we approach building projects. By integrating adaptive tree re-use practices, sustainable materials, and responsible sourcing, we create buildings that reduce environmental impact while delivering lasting value. Texas Urban Sawmill partners with builders, architects, and developers to make climate-smart construction practical, beautiful, and economically viable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-[#3d3d3d]">
                <div><strong>Focus Area:</strong> Sustainable Construction</div>
                <div><strong>Primary Benefit:</strong> Waste Reduction & Carbon Neutrality</div>
                <div><strong>Material Source:</strong> Urban Rescued Wood</div>
                <div><strong>Geographic Reach:</strong> Central Texas & Beyond</div>
              </div>
            </div>
          </section>

          {/* What is Climate-Smart Construction Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  What is Climate-Smart Construction?
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Climate-smart construction is a holistic approach to building that prioritizes environmental responsibility at every stage—from material sourcing through final delivery. It recognizes that buildings are responsible for a significant portion of global carbon emissions, and that thoughtful design and material choices can dramatically reduce this impact.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Key principles of climate-smart construction include:
                </p>

                <ul className="space-y-4 ml-6 list-disc text-lg leading-relaxed text-[#3d3d3d]">
                  <li><strong>Adaptive Material Reuse:</strong> Rescuing and repurposing materials that would otherwise be wasted</li>
                  <li><strong>Local Sourcing:</strong> Minimizing transportation emissions through regional material procurement</li>
                  <li><strong>Carbon Accounting:</strong> Measuring and offsetting the carbon footprint of construction materials</li>
                  <li><strong>Durability & Longevity:</strong> Choosing materials built to last, reducing future replacement waste</li>
                  <li><strong>Sustainable Practices:</strong> Supporting forestry and harvesting methods that protect ecosystems</li>
                  <li><strong>Community Benefit:</strong> Creating economic opportunities and supporting local businesses</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Approach Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Our Climate-Smart Approach
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">1. Urban Tree Rescue & Assessment</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    We identify trees scheduled for removal in urban areas and evaluate their potential for reuse. Trees that would otherwise become mulch or firewood are carefully harvested, transported, and processed into premium materials. This single step diverts significant waste from landfills while creating valuable resources.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">2. Precision Processing & Milling</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    Using advanced sawmilling and kiln-drying technology, we transform raw logs into construction-grade lumber, architectural elements, and custom components. Our precision processing maximizes yield and minimizes waste, ensuring every board serves a purpose.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">3. Material-Driven Design</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    We work with architects and designers to create project specifications around available materials. Rather than specifying materials first and then sourcing them, we identify what sustainable materials are available and design beautiful, functional solutions around them. This approach reduces waste and often discovers unique design opportunities.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">4. Local Delivery & Installation</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    All materials are sourced, processed, and delivered within a 50-mile radius, eliminating long-distance transportation emissions. This local approach supports regional economies while ensuring carbon neutrality from source to site.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1b1612] mb-3">5. Impact Documentation & Verification</h3>
                  <p className="text-lg leading-relaxed text-[#3d3d3d]">
                    We track and document the environmental impact of every project—waste diverted, carbon stored, emissions avoided, and community benefits created. This transparency allows project stakeholders to understand and communicate the real-world impact of their climate-smart choices.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Impact Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Real-World Impact
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Climate-smart projects demonstrate that environmental responsibility and economic viability are not mutually exclusive. Consider the impact of a single mid-sized project:
                </p>

                <div className="space-y-4 text-lg leading-relaxed text-[#3d3d3d]">
                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <p><strong>Waste Diverted:</strong> 50+ tons of wood that would have been landfilled or burned</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <p><strong>Carbon Stored:</strong> Equivalent to removing 10+ cars from the road for a year</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <p><strong>Transportation Emissions:</strong> Reduced by 90% through local sourcing</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <p><strong>Local Economic Impact:</strong> Jobs created, wages paid, taxes supported</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a4d2e]">
                    <p><strong>Community Benefit:</strong> Educational opportunities, industry leadership, environmental stewardship</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Getting Started Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Getting Started with Climate-Smart Construction
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                Whether you're planning a new building, renovation, or interior project, climate-smart construction is achievable. The first step is to consider how sustainable materials and adaptive reuse can enhance your vision.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d]">
                Texas Urban Sawmill works with architects, builders, and project owners to integrate climate-smart practices into projects of any size. We provide material consulting, design collaboration, and full project support to ensure your climate-smart vision becomes reality.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Ready to Build Climate-Smart?
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Let's discuss how sustainable materials and adaptive reuse can enhance your next project.
              </p>

              <Button asChild className="bg-[#1a4d2e] hover:bg-[#0f2e1f] text-white">
                <Link href="/contact">
                  Start a Conversation
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
