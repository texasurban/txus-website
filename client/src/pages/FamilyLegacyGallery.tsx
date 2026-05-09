import { ArrowLeft } from 'lucide-react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function FamilyLegacyGallery() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = searchParams.get('from') || 'portfolio';
  const backLink = from === 'home' ? '/' : '/portfolio';
  const backText = from === 'home' ? 'Back to Home' : 'Back to Portfolio';
  return (
    <>
      <SEOHead
        title="FamilyLegacy - Texas Urban Sawmill"
        description="Custom handcrafted furniture by Texas Urban Sawmill"
        url="https://txsawmill-hnwf9q8m.manus.space/familylegacygallery"
      />
      <Navigation />
      <div className="min-h-screen bg-white text-[#1b1612] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 text-center">
          Family Legacy: Pecan Kitchen Island & Bar Back
        </h1>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Rescued Texas Pecan | Custom Kitchen Architecture | Handcrafted by Texas Urban Sawmill
        </p>

        {/* Gallery - Full Width Composite */}
        <div className="flex justify-center mb-12">
          <a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/WomackPecanComposite_d92e3597.jpg"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-5xl overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/WomackPecanComposite_d92e3597.jpg"
              alt="Family Legacy Pecan Kitchen Island - Custom kitchen furniture by Texas Urban Sawmill"
              className="w-full h-auto object-contain"
            />
          </a>
        </div>

        {/* Details Section */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold mb-6">Project Details</h2>
          <p className="text-base leading-8 text-stone-700 mb-6">
            At Texas Urban Sawmill, The Family Legacy begins long before the first cut—it starts on the land itself. This custom kitchen island and bar back were crafted from standing dead pecan trees salvaged from the client's own Texas ranch, trees that had quietly witnessed generations before finding new purpose at the center of the home.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Our team carefully milled and transformed this pecan in-house, preserving its natural character while honoring the story it carries. The wood reveals warm, intricate grain patterns shaped by years under the Texas sun—subtle variations that make every surface deeply personal and entirely one of a kind.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Designed as an architectural centerpiece, this piece brings together function, craftsmanship, and meaning. It's where meals are shared, conversations unfold, and memories are made—now rooted in the very trees that once stood on the family's land. At Texas Urban Sawmill, we don't just build furniture—we help turn stories into something you can live with for generations.
          </p>
          <div className="text-sm text-stone-600 space-y-2">
            <p><strong>Species:</strong> Rescued Texas Pecan</p>
            <p><strong>Design:</strong> Custom kitchen island with bar back</p>
            <p><strong>Function:</strong> Residential kitchen centerpiece</p>
            <p><strong>Philosophy:</strong> Built for family gatherings and everyday living</p>
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
