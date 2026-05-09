/**
 * Blog Article: Community Impact Stories
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

const heroImage = "/manus-storage/community-impact-hero_dfe2b974_945d2e07.webp";

export default function CommunityImpactStories() {
  return (
    <>
      <SEOHead
        title="Community Impact Stories | Texas Urban Sawmill"
        description="Discover how Texas Urban Sawmill is making a difference in Central Texas through sustainable practices, educational initiatives, and community partnerships that transform urban wood into lasting value."
        url="https://txsawmill-hnwf9q8m.manus.space/blog/community-impact-stories"
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* Hero Banner */}
          <FancyHeroBanner
            mainTitle="Community Impact Stories"
            imageUrl={heroImage}
            imageAlt="Community Impact Stories - Texas Urban Sawmill"
          />

          {/* Introduction Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Making a Difference in Central Texas
              </h1>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                At Texas Urban Sawmill, we believe that sustainable business practices and community engagement go hand in hand. Through our commitment to rescuing urban trees, supporting local education, and partnering with organizations that share our values, we're creating positive change that extends far beyond our sawmill.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d]">
                These stories showcase the real impact of our work—the lives touched, the communities strengthened, and the environmental benefits realized through full-circle urban wood utilization and stewardship.
              </p>
            </div>
          </section>

          {/* Educational Partnerships Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Investing in the Next Generation
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Education is at the heart of our community impact. We partner with schools, universities, and professional organizations to share knowledge about sustainable forestry, urban wood utilization, and the importance of environmental stewardship. Through workshops, speaking engagements, and mentorship programs, we're helping the next generation understand that rescued wood isn't waste—it's an opportunity.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Our involvement with Texas A&M Forest Service Leadership Institute, the International Society of Arborists, and the Urban Wood Network reflects our commitment to advancing industry standards and sharing best practices that benefit the entire forestry and construction communities.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  By investing in education and professional development, we're helping to create a future where sustainable urban wood utilization becomes the standard practice, not the exception.
                </p>
              </div>
            </div>
          </section>

          {/* Charitable Giving Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Giving Back to Our Community
              </h2>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                As a Texas Benefit Company, we're committed to using our success to support causes that align with our values. We make significant charitable contributions to organizations focused on environmental conservation, urban forestry, and community development. Our largest single donation to the TAMFS TreeCovery Fund demonstrates our commitment to reforestation and forest health across Texas.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                These contributions aren't just financial—they represent our belief that businesses have a responsibility to strengthen the communities they serve. Every tree we rescue, every piece of wood we transform, and every product we create contributes to a legacy of environmental stewardship and community prosperity.
              </p>

              <p className="text-lg leading-relaxed text-[#3d3d3d]">
                We're proud to support organizations like Austin Habitat for Humanity, Texas Parks & Wildlife, and local conservation initiatives that are working to protect and restore our natural heritage.
              </p>
            </div>
          </section>

          {/* Recognition & Awards Section */}
          <section className="bg-[#f0f0f0] py-16 sm:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                  Recognition of Our Commitment
                </h2>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  Our community impact work has been recognized through numerous awards and accolades. The Texas Parks & Wildlife Texas Trailblazer Award, USDA Forest Service Wood Innovations Grants, and recognition from the Urban Wood Network reflect our dedication to sustainable practices and community leadership.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d] mb-6">
                  These recognitions inspire us to continue pushing boundaries and setting new standards for what's possible when business success aligns with environmental responsibility and community benefit.
                </p>

                <p className="text-lg leading-relaxed text-[#3d3d3d]">
                  But the greatest recognition comes from the communities we serve—from the families living in homes built with our sustainable materials, from students learning about forestry and environmental stewardship, and from the trees we've rescued that continue to provide value for generations to come.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#1b1612] mb-6">
                Join Us in Making a Difference
              </h2>
              
              <p className="text-lg leading-relaxed text-[#3d3d3d] mb-8">
                Whether you're looking for sustainable building materials, custom furniture, or want to support our mission, you can be part of the solution. Every choice to use rescued wood, every partnership with us, and every conversation about sustainable practices contributes to a healthier future for Central Texas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#1a4d2e] hover:bg-[#0f3620] text-white">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
