import { ArrowLeft } from 'lucide-react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function OmegaGallery() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = searchParams.get('from') || 'portfolio';
  const backLink = from === 'home' ? '/' : '/portfolio';
  const backText = from === 'home' ? 'Back to Home' : 'Back to Portfolio';
  return (
    <>
      <SEOHead
        title="Omega - Texas Urban Sawmill"
        description="Custom handcrafted furniture by Texas Urban Sawmill"
        url="https://txsawmill-hnwf9q8m.manus.space/omegagallery"
      />
      <Navigation />
      <div className="min-h-screen bg-white text-[#1b1612] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 text-center">
          Stainless Omega Walnut Table
        </h1>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Rescued American Walnut | Stainless Steel Base | Modern Industrial Design
        </p>

        {/* Gallery - Full Width Composite */}
        <div className="flex justify-center mb-12">
          <a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HickmanWalnutComposite_5b15122d.jpg"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-5xl overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HickmanWalnutComposite_5b15122d.jpg"
              alt="Stainless Omega Walnut Table - Modern industrial furniture by Texas Urban Sawmill"
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
            The Stainless Omega pairs rescued American walnut with a sleek, architectural stainless steel base, creating a striking dialogue between natural warmth and industrial precision. The walnut's rich tones and organic grain are set against a form that is clean, modern, and intentionally bold—designed to complement both corporate and residential spaces.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            The base itself is a true expression of craftsmanship—designed and fabricated in-house by Devin Ginther from 1/4-inch stainless steel. Hand-formed and seamlessly TIG welded, the structure flows as a continuous, sculptural form. It is then meticulously hand-polished to a 2000-grit finish, achieving a refined, luminous surface that enhances the precision of the steel while elevating the entire piece.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Now residing in a modern home overlooking Lake Travis, the Stainless Omega reflects its surroundings—clean lines, open space, and a quiet balance between natural beauty and contemporary design. Together, these elements create a work that is both modern and timeless—where sustainability meets exacting craftsmanship, and where every detail is built to endure for generations.
          </p>
          <div className="text-sm text-stone-600 space-y-2">
            <p><strong>Species:</strong> Rescued American Walnut</p>
            <p><strong>Base:</strong> Stainless steel omega design</p>
            <p><strong>Style:</strong> Modern industrial</p>
            <p><strong>Sustainability:</strong> Carbon-negative, salvaged wood</p>
            <p><strong>Finish:</strong> Hand-rubbed natural with stainless accents</p>
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
