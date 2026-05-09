import { ArrowLeft } from 'lucide-react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function HillcoGallery() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = searchParams.get('from') || 'portfolio';
  const backLink = from === 'home' ? '/' : '/portfolio';
  const backText = from === 'home' ? 'Back to Home' : 'Back to Portfolio';
  return (
    <>
      <SEOHead
        title="Hillco - Texas Urban Sawmill"
        description="Custom handcrafted furniture by Texas Urban Sawmill"
        url="https://txsawmill-hnwf9q8m.manus.space/hillcogallery"
      />
      <Navigation />
      <div className="min-h-screen bg-white text-[#1b1612] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-12 text-center">
          Hillco Quad Matched Pecan Table
        </h1>

        {/* Gallery Grid with Certificate in Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Image - Workshop/Production */}
          <div className="flex justify-center">
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch75_10aeadf3.jpg"
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch75_10aeadf3.jpg"
                alt="Hillco Pecan Slabs in Workshop - Production Process"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          {/* Center Certificate */}
          <div className="flex justify-center">
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch1_c07b8296.jpg"
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch1_c07b8296.jpg"
                alt="Certificate of Authenticity - Hillco Partners"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch89_512f043c.jpg"
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch89_512f043c.jpg"
                alt="Hillco Table in Conference Room"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* Bottom Image - Full Width */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch,16to9Ratio_4b880936.jpg"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-4xl overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch,16to9Ratio_4b880936.jpg"
              alt="Hillco Table with Team Members"
              className="w-full h-auto object-contain"
            />
          </a>
        </div>

        {/* Details Section */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold mb-6">Project Details</h2>
          <p className="text-base leading-8 text-stone-700 mb-6">
            At Texas Urban Sawmill, we reclaim trees with history—giving them new life as handcrafted pieces meant to be lived with, gathered around, and passed down.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Crafted from a single Texas pecan tree that grew, died, and was rescued within just a three-mile radius, this 18-foot boardroom masterpiece represents a true full-circle journey. Rather than leaving the land, the tree was thoughtfully transformed—given a second life in the very place it once stood.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            From that single tree, we achieved something exceptionally rare: a precision quad-bookmatch. By milling sequential, adjacent slabs from the same log, the grain is mirrored across four sections with seamless continuity—creating a unified, flowing surface that cannot be replicated without access to the same tree and deliberate craftsmanship at every step.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            This is a pure, 100% solid hardwood table—no veneers, no composites, no shortcuts. It's a level of craftsmanship that has largely been lost to time, and one that Texas Urban Sawmill is proud to preserve. Every inch reflects a commitment to authenticity, integrity, and the enduring value of building things the right way.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Fully integrated with custom-matched media ports and concealed cable routing, the piece balances modern functionality with timeless material strength. Now residing as a permanent fixture of the Austin skyline overlooking the State Capitol, this carbon-negative showpiece stands as both a statement of design and a lasting connection between land, craft, and purpose.
          </p>
          <div className="text-sm text-stone-600 space-y-2">
            <p><strong>Species:</strong> Texas Pecan</p>
            <p><strong>Length:</strong> 18 feet</p>
            <p><strong>Construction:</strong> 100% Solid Hardwood</p>
            <p><strong>Features:</strong> Quad-match grain, custom media ports, concealed cable routing</p>
            <p><strong>Location:</strong> Austin, Texas (overlooking State Capitol)</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 mb-12 border-t border-stone-300 pt-12">
          <div className="text-center">
            <p className="text-sm text-stone-600 mb-4">Interested in this piece or a similar custom table?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-[#22863a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#1a6430]"
            >
              Request a Custom Quote
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Context-Aware Back Button */}
        <div className="mt-12 text-center">
          <a
            href={backLink}
            className="inline-flex items-center gap-2 rounded-sm bg-[#1b1612] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#2d2620]"
          >
            <ArrowLeft className="h-4 w-4" />
            {backText}
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
