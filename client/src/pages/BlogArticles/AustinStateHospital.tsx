/**
 * Austin State Hospital - Adaptive Tree Re-Use Project
 * 
 * Design Philosophy: Climate-Smart Construction showcase with environmental impact focus
 * SEO Focus: Austin State Hospital, adaptive tree re-use, sustainable design, climate-smart construction
 */

import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";
import { Link } from "wouter";

// Hero image for the banner
const heroImage = "/manus-storage/Texas_Urban_Sawmill_Adaptive-Tree_ReUse-5_46b47d5e_122e0f11.webp";

// Gallery images - preserved from original TXUS site
const galleryImages = [
  {
    src: "/manus-storage/ash_building_ribbon_cutting_45371dc6_3f2d06d1.webp",
    alt: "Austin State Hospital building with Devin Ginther and Mayor Kirk Watson - Texas Urban Sawmill",
    caption: "Austin State Hospital - Ribbon Cutting Ceremony"
  },
  {
    src: "/manus-storage/ash_conference_table_correct_ca510450_2acedc50.webp",
    alt: "ASH Board Room Pecan Conference Table - Texas Urban Sawmill",
    caption: "ASH Board Room Pecan Conference Table"
  },
  {
    src: "/manus-storage/ash_nursing_station_36a5505a_ecb77170.webp",
    alt: "Natural wood nursing care station at Austin State Hospital - Texas Urban Sawmill",
    caption: "Natural Wood Nursing Care Station"
  },
  {
    src: "/manus-storage/ash_integration_correct_31ad93f5_0c93a177.webp",
    alt: "Integration of natural wood into Austin State Hospital interior - Texas Urban Sawmill",
    caption: "Integration into Hospital Interior"
  },
];

// Environmental impact statistics
const environmentalImpact = [
  { label: "Carbon Stored", value: ">199,000 lbs" },
  { label: "Equivalent Gasoline", value: "10,184 gallons" },
  { label: "Equivalent Coal Burned", value: "101,437 lbs" },
  { label: "Smart Phones Charged", value: "11,017,344" },
  { label: "Miles Driven Equivalent", value: "232,228 miles" },
  { label: "Waste Recycled", value: "31.4 tons" },
];

export default function AustinStateHospital() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Austin State Hospital - Adaptive Tree Re-Use Project | TXUS"
        description="Explore Texas Urban Sawmill's largest adaptive tree re-use project in Texas. Discover how 60+ old growth trees were transformed into sustainable hospital interiors with 199,000+ lbs of carbon stored."
        url="https://txurbansawmill.com/blog/austin-state-hospital"
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
            mainTitle="Austin State Hospital"
            subtitle="Adaptive Tree Re-Use Project"
            imageUrl={heroImage}
            imageAlt="Austin State Hospital construction site with rescued logs - Texas Urban Sawmill"
          />

          {/* Project Overview Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Climate-Smart Construction in Action
              </h1>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                The Austin State Hospital project represents one of the largest tree re-use initiatives in the State of Texas. Involving over 60 old growth trees from the historically registered grounds, this groundbreaking project demonstrates how adaptive tree re-use can transform construction waste into meaningful, sustainable design elements.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Texas Urban Sawmill transported over 200 logs from the construction site over a period of 3 months during the initial project phases. This comprehensive effort showcases our commitment to sustainability, community stewardship, and the creative reuse of materials that might otherwise end up in landfills.
              </p>

              <div className="bg-[#f0f0f0] border-l-4 border-[#1a4d2e] px-6 py-4 my-5">
                <p className="text-base font-semibold text-[#1a4d2e] flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  We help our customers tell a powerful story about unmatched sustainability practices & carbon savings.
                </p>
              </div>
            </div>
          </section>

          {/* Environmental Impact Section */}
          <section className="bg-white py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-12">
                  Environmental Impact
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {environmentalImpact.map((stat, index) => (
                    <div key={index} className="bg-white border border-[#e0e0e0] p-6 rounded-lg shadow-sm">
                      <p className="text-xs uppercase tracking-[0.08em] text-[#999] font-semibold mb-2">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-[#1a4d2e]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f0f0f0] border-l-4 border-[#1a4d2e] px-6 py-4 mt-8">
                  <p className="text-base font-semibold text-[#1a4d2e] flex items-center gap-2">
                    <Leaf className="h-6 w-6" />
                    This project is a great example of our sustainability promises being put to practice. By rescuing these trees and integrating them into the hospital's construction, we've prevented significant waste while creating a therapeutic environment for patients.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Historical Pecan Trees Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                We Proudly Saved Historical Pecan Trees
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                The interior design elements of the project focused on the unique qualities and beauty of the State Tree of Texas. The Texas Urban Sawmill additionally repurposed a variety of additional species such as sycamore and live oaks, which we sold back into the community as kiln-dried lumber or heirloom furniture pieces.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                These historical trees, which had stood on the hospital grounds for generations, now serve as lasting reminders of stewardship and sustainability. Their transformation into functional architectural elements demonstrates how heritage materials can be honored while meeting modern construction standards.
              </p>

              {/* Photo: Devin & Mayor */}
              <div className="my-8 flex flex-col items-center justify-center">
                <img
                  src="/manus-storage/ash_building_ribbon_cutting_45371dc6_3f2d06d1.webp"
                  alt="Devin Ginther with Mayor Kirk Watson at Austin State Hospital ribbon cutting"
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                />
                <div className="w-2/3 mt-3">
                  <p className="text-sm text-[#666] italic text-center">Devin Ginther with Mayor Kirk Watson at the Austin State Hospital ribbon cutting ceremony</p>
                </div>
              </div>
            </div>
          </section>

          {/* ASH Board Room Conference Table Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  ASH Board Room Pecan Conference Table
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  This massive 5 ft × 30 ft conference table stands as a centerpiece of both function and meaning—expertly crafted from a portion of the rescued Texas pecan harvested directly from the construction site. More than just furniture, it's a symbol of sustainability and thoughtful design.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  The table showcases the natural beauty and character of locally sourced wood that might otherwise have gone to waste. The table's rich grain patterns and unique imperfections speak to the tree's history and the craftsmanship involved in giving it new life.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Now serving as a gathering place for collaboration and decision-making, it reflects the values of restoration, connection, and long-term stewardship embedded in the new Austin State Hospital.
                </p>

                {/* Photo: Conference Table */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <img
                    src="/manus-storage/ash_conference_table_correct_ca510450_2acedc50.webp"
                    alt="ASH Board Room Pecan Conference Table"
                    className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                  />
                  <div className="w-2/3 mt-3">
                  <p className="text-sm text-[#666] italic text-center">The 5 ft × 30 ft pecan conference table crafted from rescued trees</p>
                </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mental Health Benefits Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  The Mental Health Benefits of Natural Wood Elements
                </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                With over half a dozen natural hardwood nursing care stations, the hospital provides much-needed warmth to an otherwise clinical environment. Incorporating natural wood into interior spaces does more than enhance aesthetics—it supports mental well-being.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                Research shows that wood surfaces can lower cortisol levels, helping reduce stress in a way that mirrors the calming effects of nature. Its warm tones and organic textures create a soothing atmosphere that boosts mood and emotional comfort.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Additionally, wood's biophilic qualities have been linked to improved focus, creativity, and cognitive performance, making it a smart choice for healthcare facilities, schools, and workspaces alike.
              </p>

                {/* Photo: Mental Health Benefits */}
                <div className="my-8 flex justify-center">
                  <div className="w-full max-w-sm">
                    <img
                      src="/manus-storage/natural_exploratory_areas_uvalde_fff52aa2_9fc866fe.webp"
                      alt="Natural Exploratory Areas Uvalde - Texas Urban Sawmill"
                      loading="lazy"
                      className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                    />
                    <div className="w-2/3 mt-3">
                  <p className="text-sm text-[#666] italic text-center">Natural Exploratory Area in Uvalde, material donated by the Texas Urban Sawmill</p>
                </div>
                  </div>
                </div>

              <div className="bg-[#f8f8f8] border border-[#e0e0e0] p-6 rounded-lg mt-8">
                <h3 className="font-semibold text-[#1b1612] mb-3">Key Benefits of Natural Wood in Healthcare:</h3>
                <ul className="space-y-2 text-[#3d3d3d]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a4d2e] font-bold">✓</span>
                    <span>Reduces cortisol levels and stress responses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a4d2e] font-bold">✓</span>
                    <span>Creates warm, welcoming therapeutic environments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a4d2e] font-bold">✓</span>
                    <span>Improves mood and emotional comfort</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a4d2e] font-bold">✓</span>
                    <span>Enhances focus and cognitive performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a4d2e] font-bold">✓</span>
                    <span>Supports patient well-being and recovery</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Integration Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Integration into Austin State Hospital
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  In the Austin State Hospital, the use of natural wood millwork, including the rescued pecan, fosters a sense of "home" for patients. This design choice supports the facility's goal of creating a therapeutic and comforting environment.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  The integration of local materials not only enhances the aesthetic appeal but also reflects a commitment to community and sustainability. By choosing to work with Texas Urban Sawmill, the hospital demonstrated leadership in sustainable design practices.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  This project is a proud step toward helping the City of Austin meet its ambitious goal of becoming carbon neutral by 2040. It proves that sustainability and exceptional design are not mutually exclusive—they can work together to create spaces that heal, inspire, and endure.
                </p>

                {/* Photo: Integration */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <img
                    src="/manus-storage/ash_integration_correct_31ad93f5_0c93a177.webp"
                    alt="Integration of natural wood into Austin State Hospital interior"
                    className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                  />
                  <div className="w-2/3 mt-3">
                  <p className="text-sm text-[#666] italic text-center">The integration of rescued wood creates a therapeutic environment throughout the hospital</p>
                </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-4">
                Ready to Tell Your Sustainability Story?
              </h2>
              
              <p className="text-lg text-[#3d3d3d] mb-8">
                Let us help you create a climate-smart construction project that combines sustainability with exceptional design.
              </p>

              <Button asChild className="bg-[#1a4d2e] hover:bg-[#0f3620] text-white px-8 py-3 h-auto text-base font-semibold">
                <a href="/contact">
                  Contact Us Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </section>

          {/* Back to Blog Navigation */}
          <section className="container py-12">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog">
                <a className="inline-flex items-center gap-2 text-[#1a4d2e] hover:text-[#0f3620] font-semibold transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </a>
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
