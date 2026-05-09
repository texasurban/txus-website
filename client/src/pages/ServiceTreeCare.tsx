
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const logoUrl =
  "/manus-storage/TXUSBlack4.5inx3in72DPI_fe5f0d81_0f47ce66.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "Lumber, Beams, Mantels & Slabs", href: "/services/lumber" },
      { label: "Sawmilling & Kiln Drying", href: "/services/sawmilling" },
      { label: "Custom Furniture", href: "/services/furniture" },
      { label: "Tree Re-Use Construction", href: "/services/tree-reuse" },
      { label: "Log Transport & Crane", href: "/services/log-transport" },
      { label: "Tree Care & Removals", href: "/services/tree-care" },
      { label: "Millworks, CNC, & Laser", href: "/services/millworks" },
    ],
  },
  { label: "Learn More", href: "/learn-more" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceTreeCare() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const contactMailto = useMemo(
    () =>
      "mailto:info@txurbansawmill.com?subject=Texas%20Urban%20Sawmill%20Inquiry",
    [],
  );

  return (
    <>
      <SEOHead
        title="Tree Care, Removals & Consulting - Stewardship-Focused Services | Texas Urban Sawmill"
        description="Experienced tree care and removal services that prioritize reuse, stewardship, and lasting value. Expert consulting for sustainable tree management."
        url="https://txsawmill-hnwf9q8m.manus.space/services/tree-care"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* HERO BANNER SECTION - CORRECT SPECIFICATION */}
          <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh]">
            <img
              src="/manus-storage/placeholder-hero.webp"
              alt="Tree Care, Removals & Consulting - Texas Urban Sawmill"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="relative mx-auto min-h-[40vh] max-w-7xl px-6 py-12 lg:px-8 lg:py-14 flex items-center justify-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="border-2 border-white px-5 py-7 lg:px-14 lg:py-22 text-center max-w-xl lg:max-w-4xl bg-black/[0.15] backdrop-blur-sm"
              >
                <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Tree Care, Removals & Consulting
                </h1>
              </motion.div>
            </div>
          </section>

          {/* SECTION 1: FEATURED SERVICES - WHITE */}
          <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              {/* Section Description */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="text-center mb-8 -mt-12 bg-[#fbf8f3] px-8 py-6 rounded-lg shadow-lg border-2 border-black"
              >
                <p className="text-lg lg:text-xl text-[#1b1612] max-w-6xl mx-auto font-bold leading-relaxed">
                  [Placeholder: Tree Care, Removals & Consulting Introduction]
                </p>
              </motion.div>

              {/* Featured Services - Two Column Layout */}
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 mb-20">
                {/* Service 1 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="Tree Care Service 1"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  <div className="bg-[#1b1612] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      [Placeholder: Image caption]
                    </p>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Service Title</h3>
                    <p className="text-[#6d5d50] mb-6">
                      [Placeholder: Service description]
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a]">
                      <a href="/contact">
                        Request Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Service 2 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="Tree Care Service 2"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  <div className="bg-[#1b1612] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      [Placeholder: Image caption]
                    </p>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Service Title</h3>
                    <p className="text-[#6d5d50] mb-6">
                      [Placeholder: Service description]
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a]">
                      <a href="/contact">
                        Request Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SECTION 2: DETAILS - CREAM */}
          <section className="bg-[#f0f0f0] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h3 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                  [Placeholder: Section Title]
                </h3>
                <p className="text-[#6d5d50] mb-6 text-center">
                  [Placeholder: Detailed content section]
                </p>
              </motion.div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl text-center">
              <h3 className="text-3xl font-bold mb-8 text-[#1b1612]">
                Ready to Start Your Project?
              </h3>
              <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a] px-8 py-3">
                <a href="/contact">
                  Contact Us Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
