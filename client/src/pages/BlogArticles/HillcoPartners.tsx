/*
 * Hillco Partners - Net Carbon Negative Conference Table
 * 
 * Design Philosophy: Matches Austin State Hospital article design standards
 * Color Scheme: #1a4d2e (green), #1b1612 (dark text), #3d3d3d (body text), #f0f0f0 (section backgrounds)
 * SEO Focus: Hillco Partners, custom conference table, sustainable furniture, net carbon negative
 */

import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { Link } from "wouter";

// Hero image for the banner
const heroImage = "/manus-storage/HillcoPartners-17FootPecanQuadMatch95_8c731067_ea305289.jpg";

// Gallery images - from TXUS website
const galleryImages = [
  {
    src: "/manus-storage/hillco_rescued_pecan_tree_4876d788_19f9a0dc.webp",
    alt: "Rescued pecan tree on truck - Texas Urban Sawmill",
    caption: "The very pecan tree that was rescued from 3rd Street in Austin, TX in 2021"
  },
  {
    src: "/manus-storage/hillco_jesse_grain_patterns_2b132676_c71edcc1.webp",
    alt: "Jesse studying grain patterns on wood - Texas Urban Sawmill",
    caption: "Jesse studies the grain patterns—a critical and often complex step in crafting a true \"Quad-Match\" table, where precision and visual harmony are everything."
  },
  {
    src: "/manus-storage/Jesse-Pecan-Meditation_2e0375ad_5ec826a0.webp",
    alt: "Jesse meditating on pecan wood in workshop - Texas Urban Sawmill",
    caption: "At TXUS, we take pride in the quiet craft of design meditation."
  },
  {
    src: "/manus-storage/Hillco_9ftsections_441acab7_9135260e.webp",
    alt: "Two 9-foot pecan table sections in workshop - Texas Urban Sawmill",
    caption: "The table was crafted in two 9-foot sections with meticulous integration"
  },
  {
    src: "/manus-storage/HillcoTable_FrenchPolish_6fb70559_6c7b367d.webp",
    alt: "Craftspeople applying French Polish finish to pecan table - Texas Urban Sawmill",
    caption: "French Polish finishing enhances the natural beauty of the wood"
  },
  {
    src: "/manus-storage/hillco_power_usb_hdmi_8f567de9_e3797e37.webp",
    alt: "Soft-touch media ports with power, USB, and HDMI - Texas Urban Sawmill",
    caption: "Soft-touch media ports for seamlessly integrated power, USB, and HDMI"
  },
  {
    src: "/manus-storage/Hillco_Cable_Legs_ccc976b3_96864b9c.webp",
    alt: "Custom drilled cable routing holes in table bases - Texas Urban Sawmill",
    caption: "Expert cable routing maintains a clean and uncluttered design"
  },
  {
    src: "/manus-storage/Hillco_QuadMatch_d00e3b22_3b131033.webp",
    alt: "Finished quad-match pecan table in office setting - Texas Urban Sawmill",
    caption: "Quad-match seamless across four matched pieces from a single tree"
  },
  {
    src: "/manus-storage/Hillco_9ft_Assembly_78c71196_a5271d91.webp",
    alt: "Two 9-foot sections assembled in office with Capitol view - Texas Urban Sawmill",
    caption: "The table was crafted in two 9-foot sections with meticulous integration"
  },
  {
    src: "/manus-storage/Hillco_CapitalView_eac96651_8a9d3044.webp",
    alt: "Complete pecan table with Texas State Capitol view - Texas Urban Sawmill",
    caption: "Installation and final assembly with an incredible view of the Texas State Capitol"
  },
  {
    src: "/manus-storage/hillco_final_assembly_two_halves_5ab476f2_86c55932.webp",
    alt: "Final assembly of the two 9-foot halves - Texas Urban Sawmill",
    caption: "Final assembly of the two 9-foot halves requires precision and teamwork"
  },
  {
    src: "/manus-storage/hillco_capitol_view_32948ad5_a2be4d13.webp",
    alt: "Finished Hillco conference table with Capitol view - Texas Urban Sawmill",
    caption: "A view worth sitting at—the Texas State Capitol as backdrop"
  },
];

export default function HillcoPartners() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Hillco Partners - Net Carbon Negative Conference Table | TXUS"
        description="Explore Texas Urban Sawmill's custom 18-foot pecan conference table for Hillco Partners. A net carbon negative project showcasing sustainable craftsmanship and precision engineering."
        url="https://txsawmill-hnwf9q8m.manus.space/blog/hillco-partners"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          {/* Hero Banner */}
          <FancyHeroBanner
            mainTitle="Hillco Partners"
            subtitle="Net Carbon Negative Conference Table"
            imageUrl={heroImage}
            imageAlt="Hillco Partners 17-foot pecan conference table in modern office with Capitol view - Texas Urban Sawmill"
          />

          {/* Project Overview Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                An 18-Foot Pecan Conference Table: From Tree to Treasure
              </h1>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Hillco Partners commissioned an 18-foot pecan conference table—a net carbon negative project that showcases the highest standards of sustainable craftsmanship. From tree to table, every step—from sourcing and milling to final construction—was completed within 40 miles of Austin, making this one of our most environmentally responsible projects to date.
              </p>

              {/* Photo: Hillco Partners Table with Team */}
              <div className="my-8 flex flex-col items-center justify-center">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/ySmmZJTlgaIYEFJA.webp"
                  alt="Hillco Partners team with 17-foot pecan conference table in modern office - Texas Urban Sawmill"
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                  loading="lazy"
                />
                <p className="text-sm text-[#666] italic mt-3 text-center">TXUS team with the completed 17-foot pecan conference table</p>
              </div>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                The table not only preserves the natural beauty and rich history of a native Texas pecan, but also symbolizes Hillco's commitment to excellence and environmental stewardship. This is more than furniture—it's a statement of values.
              </p>

              <div className="bg-[#f0f0f0] border-l-4 border-[#1a4d2e] px-6 py-4 my-8">
                <p className="text-base font-semibold text-[#1a4d2e] flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  We help our customers tell a powerful story about unmatched sustainability practices & carbon savings.
                </p>
              </div>

              <p className="text-lg leading-relaxed text-[#3d3d3d]">
                This project is a great example of our sustainability promises being put to practice. By rescuing this tree and integrating it into Hillco's custom conference table, we've prevented significant waste while creating a functional work of art for their downtown Austin office.
              </p>
            </div>
          </section>

          {/* The Rescued Pecan Tree Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  The Very Pecan Tree That Was Rescued
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  This is the very pecan tree that was rescued from 3rd Street in Austin, TX in 2021—and later transformed into the Hillco Partners conference table. What could have been destined for the landfill is now a centerpiece of their office, a daily reminder of the power of responsible stewardship and sustainable design.
                </p>

                {/* Photo: Rescued Tree */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                    loading="lazy"
                  />
                  <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[0].caption}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Grain Patterns Study Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Jesse Studies the Grain Patterns
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Jesse studies the grain patterns—a critical and often complex step in crafting a true "Quad-Match" table, where precision and visual harmony are everything. This meticulous process ensures that every detail of the wood's natural character is celebrated and perfectly aligned.
              </p>

              {/* Photo: Grain Patterns */}
              <div className="my-8">
                <img
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                  loading="lazy"
                />
                <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[1].caption}</p>
              </div>
            </div>
          </section>

          {/* Quiet Craft of Design Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  The Quiet Craft of Design Meditation
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  At TXUS, we take pride in the quiet craft of design meditation—mindfully considering every detail of our solid hardwood creations. To build with a design this intricate, you only get one chance to do it right. This philosophy guides every decision, every cut, and every finish.
                </p>

                {/* Photo: Design Meditation */}
                <div className="my-8">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                    loading="lazy"
                  />
                  <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[2].caption}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Engineering Excellence Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Engineering Excellence: Two 9-Foot Sections
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                The table was crafted in two 9-foot sections, with each piece meticulously integrated to achieve perfect harmony and precision. This engineering approach ensures strength and a flawless, long-lasting result that stands the test of time.
              </p>

              {/* Photo: Two Sections */}
              <div className="my-8">
                <img
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                  loading="lazy"
                />
                <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[3].caption}</p>
              </div>
            </div>
          </section>

          {/* French Polish Finishing Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  French Polish Finishing: Timeless Elegance
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Our tables are finished with a modified version of a French Polish—a time-consuming, meticulous process that enhances the natural beauty of the wood, resulting in a finish that truly showcases its rich grain and character. This traditional technique produces a depth and warmth that no modern finish can replicate.
                </p>

                {/* Photo: French Polish */}
                <div className="my-8">
                  <img
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                    loading="lazy"
                  />
                  <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[4].caption}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Power and Technology Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Power? USB Charging? HDMI?
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                We've got you covered—seamlessly integrated and ready for anything. This media console is designed to be fully upgradeable and future-proof, ensuring long-term functionality without compromising design.
              </p>

              {/* Photo: Power USB HDMI */}
              <div className="my-8">
                <img
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                  loading="lazy"
                />
                <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[5].caption}</p>
              </div>
            </div>
          </section>

          {/* Cable Routing Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Expert Cable Routing: Hidden Complexity
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Our bases are expertly engineered to allow for seamless routing of media cables, completely concealed from the floor plate to the top. This maintains a clean and uncluttered design while ensuring all technology is accessible and organized.
                </p>

                {/* Photo: Cable Routing */}
                <div className="my-8">
                  <img
                    src={galleryImages[6].src}
                    alt={galleryImages[6].alt}
                    className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                    loading="lazy"
                  />
                  <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[6].caption}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quad-Match Seamless Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Quad-Match Seamless: The Holy Grail
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                This half of the quad-match is virtually seamless across four matched pieces. A feat that can only be achieved through sequential cuts from a single tree, ensuring perfect alignment and harmony. This is woodworking at its finest.
              </p>

              {/* Photo: Quad-Match Seamless */}
              <div className="my-8">
                <img
                  src={galleryImages[7].src}
                  alt={galleryImages[7].alt}
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                  loading="lazy"
                />
                <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[7].caption}</p>
              </div>
            </div>
          </section>

          {/* Installation and Final Assembly Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Installation and Final Assembly
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Installation and final assembly took a full day—an effort well worth it, especially with an incredible view of the Texas State Capitol as the backdrop. This meticulous approach ensures both strength and seamless beauty.
              </p>

              {/* Photo: Installation */}
              <div className="my-8 flex flex-col items-center justify-center">
                <img
                  src="/manus-storage/Hillco_elevator_95a571cc_f7006b3b.webp"
                  alt="Team maneuvering table leg through freight elevator - Texas Urban Sawmill"
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e]"
                  loading="lazy"
                />
                <div className="w-2/3 mt-3">
                  <p className="text-sm text-[#666] italic text-center">The table was designed specifically to maximize the freight elevator, we had less than 1" of clearance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* The Central Joint Line Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  The Central Joint Line: Strength and Beauty
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  The most challenging aspect of this table was the central joint line. To ensure strength and a flawless fit, we incorporated our hidden mortise-and-tenon joints along with specialized concealed clamps—balancing precision engineering with seamless design.
                </p>

                {/* Photo: Central Joint Line */}
                <div className="my-8">
                  <img
                    src={galleryImages[8].src}
                    alt={galleryImages[8].alt}
                    className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                    loading="lazy"
                  />
                  <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[8].caption}</p>
                </div>
              </div>
            </div>
          </section>



          {/* A View Worth Sitting At Section */}
          <section className="container py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                A View Worth Sitting At
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Not a bad view of the Texas State Capitol—we definitely prefer to sit on this side! The table's placement offers an inspiring backdrop for strategic conversations and meaningful work.
              </p>

              {/* Photo: Capitol View */}
              <div className="my-8">
                <img
                  src={galleryImages[11].src}
                  alt={galleryImages[11].alt}
                  className="w-2/3 h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
                  loading="lazy"
                />
                <p className="text-sm text-[#666] italic mt-3 text-center">{galleryImages[11].caption}</p>
              </div>
            </div>
          </section>

          {/* Commission Your Own Custom Conference Table Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Commission Your Own Custom Conference Table
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                  Ready to create a conference table that tells your sustainability story? Partner with Texas Urban Sawmill to design a custom piece that reflects your values and vision.
                </p>

                <div className="flex justify-center">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/contact">
                      Contact Us Today
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Back to Blog Navigation */}
        <div className="container py-8 border-t border-border">
          <Link href="/blog" className="text-[#1a4d2e] hover:underline flex items-center gap-2">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}
