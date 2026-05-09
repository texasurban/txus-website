/**
 * Footer Component - TXUS Standard Footer
 * 
 * This component provides the consistent footer used across all TXUS pages.
 * It uses the exact code from the Home page to ensure 100% identical styling and layout.
 * 
 * Usage:
 * import { Footer } from "@/components/Footer";
 * 
 * <Footer />
 */

export function Footer() {
  return (
    <footer className="bg-[#2a2a2a] text-white">
      <div className="border-t border-stone-700">
        <div className="px-4 py-4 lg:py-6 pb-2 lg:pb-4 max-w-7xl mx-auto">
          {/* CONTACT Heading */}
          <h2 className="text-center text-sm lg:text-base font-bold uppercase tracking-[0.2em] text-[#d7a469] mb-3">
            Contact
          </h2>

          {/* Description Text - ITALIC (not bold) */}
          <p className="text-center text-xs lg:text-sm text-white italic max-w-3xl mx-auto mb-4 leading-relaxed">
            Whether you're inquiring about custom pieces, material availability, or have woodworking questions, we're here to help. Feel free to call or email—we're always happy to discuss your project.
          </p>

          {/* Three Info Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-4">
            {/* Phone Tile */}
            <a
              href="tel:+15127625898"
              className="border border-[#d7a469] p-3 hover:bg-stone-700/20 transition-colors group"
            >
              <div className="flex items-start gap-2">
                <svg className="h-4 w-4 text-[#d7a469] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[#d7a469] font-semibold">
                    Phone
                  </p>
                  <p className="text-white text-xs mt-1">512-762-5898</p>
                </div>
              </div>
            </a>

            {/* Email Tile */}
            <a
              href="mailto:info@txurbansawmill.com?subject=Texas%20Urban%20Sawmill%20Inquiry"
              className="border border-[#d7a469] p-3 hover:bg-stone-700/20 transition-colors group"
            >
              <div className="flex items-start gap-2">
                <svg className="h-4 w-4 text-[#d7a469] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[#d7a469] font-semibold">
                    Email
                  </p>
                  <p className="text-white text-xs mt-1">info@txurbansawmill.com</p>
                </div>
              </div>
            </a>

            {/* Location Tile */}
            <div className="border border-[#d7a469] p-3">
              <div className="flex items-start gap-2">
                <svg className="h-4 w-4 text-[#d7a469] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[#d7a469] font-semibold">
                    Location
                  </p>
                  <p className="text-white text-xs mt-1">Dripping Springs, Texas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="mb-4 pb-4 border-b border-stone-700"></div>

          {/* Branding and Copyright */}
          <div className="text-center space-y-1">
            <p className="text-[#d7a469] text-[0.7rem] uppercase tracking-[0.12em] font-semibold">
              Texas Urban Sawmill · Dripping Springs, Texas
            </p>
            <p className="text-stone-500 text-[0.6rem] uppercase tracking-[0.08em]">
              @ 2026  Texas Urban Sawmill LLC | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
