import { ArrowLeft } from 'lucide-react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function PecanBunkerGallery() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = searchParams.get('from') || 'portfolio';
  const backLink = from === 'home' ? '/' : '/portfolio';
  const backText = from === 'home' ? 'Back to Home' : 'Back to Portfolio';
  return (
    <>
      <SEOHead
        title="PecanBunker - Texas Urban Sawmill"
        description="Custom handcrafted furniture by Texas Urban Sawmill"
        url="https://txsawmill-hnwf9q8m.manus.space/pecanbunkergallery"
      />
      <Navigation />
      <div className="min-h-screen bg-white text-[#1b1612] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 text-center">
          24ft Pecan Bunker Conference Table
        </h1>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Rescued Texas Pecan | Grand-Scale Executive Piece | Handcrafted by Texas Urban Sawmill
        </p>

        {/* Gallery - Full Width Composite */}
        <div className="flex justify-center mb-12">
          <a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/PecanBunkerComposite_4d5f2f52.jpg"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-5xl overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/PecanBunkerComposite_4d5f2f52.jpg"
              alt="24ft Pecan Bunker Conference Table - Executive furniture by Texas Urban Sawmill"
              className="w-full h-auto object-contain"
            />
          </a>
        </div>

        {/* Details Section */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold mb-6">Project Details</h2>
          <p className="text-base leading-8 text-stone-700 mb-6">
            At Texas Urban Sawmill, we reclaim trees with history—giving them new life as handcrafted pieces meant to be lived with, gathered around, and passed down.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Commissioned by one of the largest construction companies in the United States, the Bunker Conference Table is a 24-foot masterpiece that reflects both scale and significance. Crafted entirely from a single native Texas pecan tree, this piece achieves something exceptionally rare—a true quad-bookmatched surface. By milling sequential, adjacent slabs from the same log, we are able to mirror the grain across four sections, creating a continuous, symmetrical flow that moves across the entire length of the table. It's a level of cohesion and visual harmony that simply cannot be replicated without access to the same tree and careful, intentional milling.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Designed to anchor high-level decision-making, the table now resides within a private bunker on a 2,000-acre corporate ranch—an environment where permanence and performance are paramount. The custom bunker-style base reinforces that presence, delivering both structural integrity and a bold architectural statement.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Across its expansive surface, the pecan reveals rich, flowing grain patterns shaped by time and environment—each detail a testament to its origin and transformation. The result is a truly one-of-a-kind table—impossible to duplicate, built to command, and crafted to endure as a legacy piece for generations.
          </p>
          <div className="text-sm text-stone-600 space-y-2">
            <p><strong>Species:</strong> Rescued Texas Pecan</p>
            <p><strong>Length:</strong> 24 feet</p>
            <p><strong>Design:</strong> Bunker-style base architecture</p>
            <p><strong>Application:</strong> Executive boardrooms, hospitality</p>
            <p><strong>Sustainability:</strong> Carbon-negative, salvaged wood from Texas</p>
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
