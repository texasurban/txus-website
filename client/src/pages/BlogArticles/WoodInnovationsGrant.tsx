/**
 * Blog Article: Wood Innovations Grant - USDA Recognition
 * 
 * Design Philosophy: Matches established TXUS blog article standards (Hillco Partners template)
 * Content: Full Circle Woodland Forestry - Circular Economic Project
 * Color Scheme: #1a4d2e (green), #1b1612 (dark text), #3d3d3d (body text), #f0f0f0 (section backgrounds)
 */

import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight } from "lucide-react";
import { Link } from "wouter";


const heroBackgroundImage = "/manus-storage/PS-Hero-calcium-chloride-1600x500px_405e4c1c_11b6d31f.jpg";
const bannerAwardImage = "/manus-storage/USDA-FS-Grant-Recipients-Sponsors_c38bbcc8_f43000c1.webp";

// Schema.org Article markup for SEO
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "USDA Wood Innovations Grant Award | Texas Urban Sawmill",
  "description": "Texas Urban Sawmill received USDA Forest Service Wood Innovations Grant Awards in 2022 and 2024 for the Full Circle Woodland Forestry project, demonstrating innovative approaches to urban wood utilization, wildfire mitigation, and climate-smart forestry.",
  "url": "https://txurbansawmill.com/blog/wood-innovations-grant",
  "image": "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/49fac2ec-734b-4e8c-a1c4-561aafccfc03/USDA+FS+Grant+Recipient+%26+Sponsors.jpg",
  "author": {
    "@type": "Organization",
    "name": "Texas Urban Sawmill"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Texas Urban Sawmill",
    "logo": {
      "@type": "ImageObject",
      "url": "https://txurbansawmill.com/logo.png"
    }
  },
  "datePublished": "2024-05-07",
  "dateModified": "2026-05-08"
};

export default function WoodInnovationsGrant() {
  return (
    <>
      <SEOHead
        title="USDA Wood Innovations Grant Award - Texas Urban Sawmill"
        description="TXUS won USDA Wood Innovations Grants in 2022 & 2024 for Full Circle Woodland Forestry. Learn about our climate-smart urban wood utilization project. Explore our award-winning sustainable forestry solutions."
        url="https://txurbansawmill.com/blog/wood-innovations-grant"
        type="article"
        schema={articleSchema}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* Hero Banner - Centered Image with White Border (Option A) */}
          <section className="relative w-full min-h-[54vh] overflow-hidden">
            <img
              src={heroBackgroundImage}
              alt="Forest and road background - Texas Urban Sawmill"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
             decoding="async"/>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex items-center justify-center min-h-[54vh] px-4">
              <img
                src={bannerAwardImage}
                alt="2022 USDA Forest Service Wood Innovations Grant Award Recipient - Texas Urban Sawmill with ESG Participating Partners"
                className="max-w-[60%] h-auto max-h-[30vh] object-contain border-2 border-white"
                loading="lazy"
               decoding="async"/>
            </div>
          </section>

          {/* Project Overview Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Pioneering Urban Wood Innovation: USDA Recognition
              </h1>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Texas Urban Sawmill was proudly awarded a USDA Forest Service Wood Innovations Grant. Only two businesses in Texas have ever received this award. The novel grant application is entitled: <strong>"Full Circle Woodland Forestry a Circular Economic Project."</strong> This serves as a climate-smart sustainability project within the State of Texas.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                These prestigious awards recognize our commitment to advancing sustainable urban wood utilization, developing innovative practices in wood processing, and demonstrating leadership in climate-smart forestry solutions that benefit communities and the environment.
              </p>

              {/* Team Loading Cedar Lumber Image - First Image */}
              <div className="my-8 flex flex-col items-center justify-center">
                <div className="w-2/3">
                  <img
                    src="/manus-storage/TXUS-AHFH-Team-Cedar-Lumber_7b70e406_c5ee29ea.webp"
                    alt="TXUS and Austin Habitat for Humanity team loading mountain cedar lumber - Texas Urban Sawmill"
                    className="w-full h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                    loading="lazy"
                   decoding="async"/>
                  <p className="text-sm text-[#666] italic mt-3 text-center">This photo reflects the power of strong partnerships, with the Texas Urban Sawmill and Austin Habitat for Humanity loading the first shipment of mountain cedar lumber. Proceeds from the rescued timber support habitat restoration, canopy expansion, and wildfire risk mitigation—demonstrating a true full-circle forestry model.</p>
                </div>
              </div>

              <div className="bg-[#f0f0f0] border-l-4 border-[#1a4d2e] px-6 py-4 my-8">
                <p className="text-base font-semibold text-[#1a4d2e] flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  We help our customers tell a powerful story about unmatched sustainability practices & carbon savings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-[#3d3d3d]">
                <div><strong>Organization:</strong> Texas Urban Sawmill</div>
                <div><strong>Award Program:</strong> <a href="https://www.fs.usda.gov/science-technology/energy-forest-products/wood-innovation/grants" target="_blank" rel="noopener noreferrer" className="text-[#1a4d2e] font-semibold hover:underline">USDA Forest Service Wood Innovations Grant</a></div>
                <div><strong>Award Years:</strong> 2022, 2024</div>
                <div><strong>Focus:</strong> Sustainable Urban Wood Utilization</div>
              </div>
            </div>
          </section>

          {/* What is the USDA FS "WIG" Grant Program Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6 text-center">
                  What is the USDA FS "WIG" Grant Program?
                </h2>

                {/* USDA Team Award Image - Second Image in WIG Section */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <div className="w-2/3">
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/49fac2ec-734b-4e8c-a1c4-561aafccfc03/USDA+FS+Grant+Recipient+%26+Sponsors.jpg"
                      alt="TXUS team with USDA Wood Innovations Grant Award - Texas Urban Sawmill"
                      className="w-full h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                      loading="lazy"
                     decoding="async"/>
                    <p className="text-sm text-[#666] italic mt-3 text-center">The Texas Urban Sawmill was the first Texas-based company to receive a Wood Innovations award in the history of the program, reinforcing our commitment to innovative forestry solutions.</p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  The <a href="https://www.fs.usda.gov/science-technology/energy-forest-products/wood-innovation/grants" target="_blank" rel="noopener noreferrer" className="text-[#1a4d2e] font-semibold hover:underline">USDA Forest Service Wood Innovations Grant Program</a> is a funding initiative established by the United States Department of Agriculture (USDA) Forest Service to support projects that focus on increasing the use of wood as a sustainable building material. The program provides financial assistance to eligible entities, such as non-profits, universities, and state and local governments, to promote the use of wood products and reduce the use of non-renewable materials in construction.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  The program aims to stimulate the economy in rural areas by creating jobs in the forestry and manufacturing industries, while also supporting sustainable forest management practices. The Wood Innovations Grant Program provides funding for a variety of projects, including the development of new technologies, the design of innovative wood products, and the construction of new wood-based buildings or retrofitting existing structures to incorporate more wood.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Texas Urban Sawmill's awards reflect our dedication to transforming urban wood waste into valuable products, supporting local economies, and demonstrating that responsible stewardship of urban forests creates lasting environmental and economic benefits.
                </p>

              </div>
            </div>
          </section>

          {/* Full Circle Woodland Forestry Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6 text-center">
                Full Circle Woodland Forestry: A Circular Economic Project
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-[#3d3d3d]">
                <p>
                  Texas is the second most disaster-prone state in the U.S. after California, according to FEMA disaster declarations. Rapid population growth, unsustainable forest management, and expansion into the wildland-urban interface (WUI) have increased wildfire risk across Central Texas, making it one of the state's most vulnerable regions. Ashe juniper, commonly known as mountain cedar, is a major source of combustible fuel in these woodlands. Traditionally, this material is chipped or burned after removal, a practice that fails to preserve long-term carbon sequestration.
                </p>

                <p>
                  Texas Urban Sawmill is investigating a novel economic approach that not only utilizes excess wood material for economic gain but also reduces the threat of wildfires. This innovative model generates revenue that can be used to fund replanting and expand the tree canopy. The material rescued from these project sites will be milled and then offered as retail lumber at the <a href="https://austinhabitat.org/" target="_blank" rel="noopener noreferrer" className="text-[#1a4d2e] font-semibold hover:underline">Austin Habitat ReStores</a>. 100% of profits will directly support the <a href="https://austinhabitat.org/" target="_blank" rel="noopener noreferrer" className="text-[#1a4d2e] font-semibold hover:underline">Austin Habitat for Humanity (HFH)</a> for affordable housing projects and the <a href="https://tfsweb.tamu.edu/trees/tree-care/trees-and-natural-disasters/treecovery/" target="_blank" rel="noopener noreferrer" className="text-[#1a4d2e] font-semibold hover:underline">Texas A&M Forest Service (TAMFS)</a> for tree canopy expansion.
                </p>
              </div>

              {/* Sarah Image */}
              <div className="my-8 flex flex-col items-center justify-center">
                <div className="w-2/3">
                  <img
                    src="/manus-storage/TXUS-USDA-Sarah-Hydraulic-Grappler_a3fd1af9_bd711baf.webp"
                    alt="Sarah extracting ashe juniper with hydraulic grappler - Texas Urban Sawmill"
                    className="w-full h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                    loading="lazy"
                   decoding="async"/>
                  <p className="text-sm text-[#666] italic mt-3 text-center">Sarah stands ready to extract more ashe juniper from the site with a hydraulic grappler. Her remarkable contributions make her an inspiring role model for the next generation of female leaders in forestry utilization.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Climate-Smart and Carbon-Smart Goals Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6 text-center">
                  Climate-Smart and Carbon-Smart ESG Stretch Goals
                </h2>

                <div className="space-y-8 text-lg leading-relaxed text-[#3d3d3d]">
                  <div>
                    <h3 className="font-display text-2xl text-[#1b1612] mb-4">
                      Economic Impact
                    </h3>
                    <p className="mb-4">
                      Generate over $150,000 in lumber and equivalent carbon savings across the life of the project. Funds will be allocated to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Support the Habitat for Humanity for affordable housing development within Austin metroplex</li>
                      <li>Support the Forest Service for growth of our shrinking tree canopy across Texas</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-[#1b1612] mb-4">
                      Carbon Sequestration
                    </h3>
                    <p className="mb-4">
                      Capture or maintain carbon sequestration &gt; 100,000 lbs CO2e. This is equivalent to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>50,809 lbs of coal burned</li>
                      <li>195 barrels of oil consumed</li>
                      <li>5,517,618 number of smartphones charged</li>
                      <li>15.7 tons of waste recycled instead of landfilled</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-[#1b1612] mb-4">
                      Community Awareness and Outreach
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Support community education through social media outreach and shared partner campaigns</li>
                      <li>Offer Public Open House events at the Texas Urban Sawmill in Dripping Springs, TX</li>
                      <li>Offer Public Open House events at the Austin Habitat for Humanity Restores</li>
                      <li>Develop and produce an inspiring film series to spread national awareness</li>
                    </ul>
                  </div>
                </div>

                {/* Ashe Juniper Chainsawing Image */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <div className="w-2/3">
                    <img
                      src="/manus-storage/TXUS-Ashe-Chainsaw-WUI-Property_30c2da2a_e8005384.webp"
                      alt="TXUS team chainsawing ashe juniper on WUI property - Texas Urban Sawmill"
                      className="w-full h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                      loading="lazy"
                     decoding="async"/>
                    <p className="text-sm text-[#666] italic mt-3 text-center">This Wildland Urban Interface (WUI) property had not seen forestry activity in over 100 years. Ashe juniper, commonly called Texas mountain cedar, is typically chipped or burned in Texas, despite producing stable, aromatic lumber with tight grain, rich red color, and excellent exterior durability.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strength in Our Partnerships Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6 text-center">
                Strength in Our Partnerships
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-[#3d3d3d]">
                <p>
                  We have aligned with strategic partners committed to collaboration, community, and environmental sustainability. Each of our supporting partners is volunteering in-kind contributions to the project and are focused on doing what's right for Texas and our residents. These prominent public and private institutions in Texas are actively contributing to environmental and social progress by dedicating themselves to reducing carbon emissions, minimizing waste, and optimizing the utilization of our water resources.
                </p>

                <div className="bg-[#fffbf0] border-l-4 border-[#d7a469] p-6 mt-8">
                  <p className="font-semibold text-[#1b1612] mb-4">
                    We are actively seeking support from commercial developers and public & private land owners who want to donate material and/or help fund utilization forestry efforts that DIRECTLY support this sustainability grant project.
                  </p>
                  <p className="mb-4">
                    Your contribution will have a meaningful impact and help us reach our desired outcomes. 100% of the profits go to the Habitat for Humanity (HFH) and Texas A&M Forest Service (TAMFS). Supporters will receive a HFH charitable contribution that can be used as a tax deduction.
                  </p>
                  <p>
                    The major requirement is that the property is located within the Texas Hill Country or what is referred to as the Wildland Urban Interface (WUI). Basically, this is any wildland or wooded area across Central Texas that does not reside within an urban metroplex. All residential and commercial partners will receive sponsorship recognition in our 5 to 6-part film series, published articles and key note presentations as a Special Thanks. Additionally, key contributors will be given the opportunity to be interviewees and featured within the film series.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-[#e0e0e0]">
            <div className="container max-w-3xl mx-auto">
              <div className="text-center">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6 text-center">
                  Ready to Partner?
                </h2>
                <p className="font-sans text-lg text-[#666666] mb-10">
                  Learn how Texas Urban Sawmill can support your project with innovative, sustainable wood solutions.
                </p>
                <Button
                  asChild
                  className="bg-[#2d5016] hover:bg-[#1f3810] text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg uppercase tracking-[0.08em] rounded-none"
                >
                  <a href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Related Links Section for SEO */}
          <section className="bg-[#f5f5f5] py-8 sm:py-12">
            <div className="container max-w-3xl mx-auto">
              <div className="space-y-4">
                <div>
                  <Link href="/blog" className="inline-flex items-center text-[#2d5016] font-semibold hover:gap-2 transition-all">
                    ← Back to Blog
                  </Link>
                </div>
                <div className="text-sm text-[#666] space-y-2">
                  <p>Explore more: <Link href="/services" className="text-[#2d5016] font-semibold hover:underline">Our Services</Link> • <Link href="/shop" className="text-[#2d5016] font-semibold hover:underline">Shop Lumber</Link></p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
