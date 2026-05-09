import { ArrowLeft } from 'lucide-react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function IBeamGallery() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = searchParams.get('from') || 'portfolio';
  const backLink = from === 'home' ? '/' : '/portfolio';
  const backText = from === 'home' ? 'Back to Home' : 'Back to Portfolio';
  return (
    <>
      <SEOHead
        title="IBeam - Texas Urban Sawmill"
        description="Custom handcrafted furniture by Texas Urban Sawmill"
        url="https://txsawmill-hnwf9q8m.manus.space/ibeamgallery"
      />
      <Navigation />
      <div className="min-h-screen bg-white text-[#1b1612] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-12 text-center">
          Bookmatched I-beam Black Walnut Conference Table
        </h1>

        {/* Gallery Grid with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-12">
          {/* Left Image - Table in Workshop */}
          <div className="flex justify-center">
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Texas_Urban_Sawmill_Billet_OmegaWalnut-56_b496c9ab.jpg"
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Texas_Urban_Sawmill_Billet_OmegaWalnut-56_b496c9ab.jpg"
                alt="I-Beam Walnut Table in Workshop"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          {/* Center Image - Finished Table Close-up */}
          <div className="flex justify-center">
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Texas_Urban_Sawmill_Billet_OmegaWalnut-58_98b79a8f.jpg"
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Texas_Urban_Sawmill_Billet_OmegaWalnut-58_98b79a8f.jpg"
                alt="Bookmatched Walnut Table Detail"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          {/* Right Image - Table in Conference Room */}
          <div className="flex justify-center">
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Texas_Urban_Sawmill_Billet_OmegaWalnut-94_ccd49edc.jpg"
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Texas_Urban_Sawmill_Billet_OmegaWalnut-94_ccd49edc.jpg"
                alt="I-Beam Walnut Table in Conference Room"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* Details Section */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold mb-6">Project Details</h2>
          <p className="text-base leading-8 text-stone-700 mb-6">
            At Texas Urban Sawmill, we reclaim trees with history—giving them new life as handcrafted pieces meant to be lived with, gathered around, and passed down.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Symmetrical elegance in rescued black walnut with bookmatched grain patterns that create visual balance and movement. Supported by a custom modern industrial I-beam base in natural blackened steel—a striking contrast that grounds the piece for refined, everyday living.
          </p>
          <div className="text-sm text-stone-600 space-y-2">
            <p><strong>Species:</strong> Black Walnut</p>
            <p><strong>Design:</strong> Bookmatched grain pattern</p>
            <p><strong>Base:</strong> Custom I-beam in blackened steel</p>
            <p><strong>Style:</strong> Modern industrial</p>
            <p><strong>Finish:</strong> Hand-rubbed natural</p>
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
