import { ArrowLeft } from 'lucide-react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function GoldWalnutGallery() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = searchParams.get('from') || 'portfolio';
  const backLink = from === 'home' ? '/' : '/portfolio';
  const backText = from === 'home' ? 'Back to Home' : 'Back to Portfolio';
  return (
    <>
      <SEOHead
        title="GoldWalnut - Texas Urban Sawmill"
        description="Custom handcrafted furniture by Texas Urban Sawmill"
        url="https://txsawmill-hnwf9q8m.manus.space/goldwalnutgallery"
      />
      <Navigation />
      <div className="min-h-screen bg-white text-[#1b1612] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 text-center">
          1-Ton Gold Walnut Table
        </h1>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Rescued American Walnut | Massive Slab | Architectural Statement Piece
        </p>

        {/* Gallery - Full Width Composite */}
        <div className="flex justify-center mb-12">
          <a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/GoldWalnutComposite_99c6497e.jpg"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-5xl overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/GoldWalnutComposite_99c6497e.jpg"
              alt="1-Ton Gold Walnut Table - Massive statement furniture by Texas Urban Sawmill"
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
            The 1-Ton Gold Walnut Table is an architectural marvel—a two-piece, bookmatched slab of rescued American walnut, meticulously joined to create a seamless, symmetrical flow of grain across its surface. With the natural edges removed, the form is refined and intentional—allowing the richness of the walnut's golden tones and striking figure to take center stage in a clean, modern presentation.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Anchoring the top is a custom base built entirely in-house by Devin Ginther, fabricated from 2-inch-thick solid billet steel. This formidable foundation is as much a feat of engineering as it is of design—precision-crafted to support the immense scale of the piece while introducing a bold industrial contrast to the warmth of the wood.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            The result is a powerful balance of symmetry, mass, and refinement—a statement of permanence, sustainability, and the enduring beauty of natural materials. Built to last for generations, it stands not just as furniture, but as a legacy in solid form.
          </p>
          <div className="text-sm text-stone-600 space-y-2">
            <p><strong>Species:</strong> Rescued American Walnut</p>
            <p><strong>Weight:</strong> Approximately 1 ton</p>
            <p><strong>Slab:</strong> Single massive piece</p>
            <p><strong>Character:</strong> Golden tones, natural grain patterns</p>
            <p><strong>Sustainability:</strong> Carbon-negative, salvaged wood</p>
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
