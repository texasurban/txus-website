import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function PecanTrestleGallery() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = searchParams.get('from') || 'home';
  const backLink = from === 'portfolio' ? '/portfolio' : '/';
  const backText = from === 'portfolio' ? 'Back to Portfolio' : 'Back to Home';

  return (
    <>
      <SEOHead
        title="PecanTrestle - Texas Urban Sawmill"
        description="Custom handcrafted furniture by Texas Urban Sawmill"
        url="https://txsawmill-hnwf9q8m.manus.space/pecantrestlegallery"
      />
      <Navigation />
      <div className="min-h-screen bg-white text-[#1b1612] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 text-center">
          Pecan Trestle Table
        </h1>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Spalted Pecan | Local Craftsmanship | 100% Solid Hardwood
        </p>

        {/* Gallery - 3-Picture Composite */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-6xl grid grid-cols-3 gap-8">
            {/* Left Image */}
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Brad&KerryPecanTrestleTable47_94111cec.jpg"
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Brad&KerryPecanTrestleTable47_94111cec.jpg"
                alt="Pecan Trestle Table - Team installation"
                className="w-full h-full object-cover"
              />
            </a>
            {/* Center Image - Brad & Kerry */}
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Brad&KerryPecanTrestleTable45_17014b2e.jpg"
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Brad&KerryPecanTrestleTable45_17014b2e.jpg"
                alt="Pecan Trestle Table - Brad and Kerry with finished piece"
                className="w-full h-full object-cover"
              />
            </a>
            {/* Right Image */}
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Brad&KerryPecanTrestleTable18_1856bb6b.jpg"
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden shadow-2xl border-4 border-[#d7a469] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer block"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Brad&KerryPecanTrestleTable18_1856bb6b.jpg"
                alt="Pecan Trestle Table - Installation in timber frame home"
                className="w-full h-full object-cover"
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
            A masterwork of local craftsmanship, this 2-piece bookmatched spalted pecan table celebrates the raw beauty of Central Texas. Designed from 100% solid native Texas pecan, this piece contains no veneers, no composites, and no shortcuts—just honest material, thoughtfully transformed. In an era where true solid hardwood construction is becoming increasingly rare, this table reflects a commitment to a dying craft that Texas Urban Sawmill continues to preserve.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            The spalted pecan reveals dramatic lines and organic figure, each pattern shaped naturally over time and mirrored through careful bookmatching. Every wood element was sourced and produced within 100 miles of Dripping Springs, reinforcing a deep connection to place and material.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            Built on our signature Texas Urban Sawmill trestle base, the design was thoughtfully tailored to complement the architectural language of the client's timber frame home—echoing its structural honesty, natural materials, and enduring presence.
          </p>
          <p className="text-base leading-8 text-stone-700 mb-6">
            The result is a piece that feels both rooted and refined—crafted to belong to its environment, and built to be lived with for generations.
          </p>
          <div className="text-sm text-stone-600 space-y-2">
            <p><strong>Species:</strong> Spalted Pecan</p>
            <p><strong>Design:</strong> 2-piece bookmatched with trestle base</p>
            <p><strong>Construction:</strong> 100% Solid Hardwood</p>
            <p><strong>Sourcing:</strong> Within 100 miles of Dripping Springs, Texas</p>
            <p><strong>Craftsmanship:</strong> Local artisan production</p>
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
        <div className="mt-8 text-center">
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
