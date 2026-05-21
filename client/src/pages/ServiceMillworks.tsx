
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
      { label: "Custom Furniture", href: "/portfolio" },
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

export default function ServiceMillworks() {
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
        title="Millworks, CNC & Laser Services - Precision Woodworking | Texas Urban Sawmill"
        description="Professional CNC routing, laser engraving, and precision millworks services. Camaster CNC machine and large-format CO2 laser for custom projects."
        url="https://txsawmill-hnwf9q8m.manus.space/services/millworks"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* HERO BANNER SECTION */}
          <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh]">
            <img
              src="/manus-storage/placeholder-hero.webp"
              alt="Millworks, CNC & Laser Services - Texas Urban Sawmill"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="relative mx-auto min-h-[40vh] max-w-7xl px-6 py-12 lg:px-8 lg:py-14 flex items-center justify-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="border-2 border-white px-3 py-5 lg:px-9 lg:py-14 text-center max-w-sm lg:max-w-3xl bg-black/[0.10] backdrop-blur-sm"
              >
                <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Millworks, CNC & Laser Services
                </h1>
              </motion.div>
            </div>
          </section>

          {/* INTRO TEXT SECTION */}
          <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="text-center mb-8 -mt-12 bg-[#fbf8f3] px-8 py-6 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-2 border-[#8b7355]"
              >
                <p className="text-lg lg:text-xl text-[#1b1612] max-w-6xl mx-auto font-bold leading-relaxed">
                  Transform your vision into reality with our state-of-the-art CNC routing and laser engraving capabilities. From intricate woodworking details to custom signage and personalized gifts, we combine precision technology with expert craftsmanship to deliver exceptional results on every project.
                </p>
              </motion.div>
            </div>
          </section>

          {/* SERVICE CARDS SECTION */}
          <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 mb-20">
                {/* Service 1: CNC Routing */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="CNC Routing Services"
                      className="w-full h-96 object-cover"
                    />
                    <div className="bg-[#1b1612] text-white text-center py-4 px-6">
                      <p className="italic text-sm">Precision CNC routing for custom woodworking</p>
                    </div>
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">CNC Routing & Surfacing</h3>
                    <p className="text-[#6d5d50] mb-4">
                      Our Camaster Cobra CNC machine features a 6 ft x 16 ft cutting bed, enabling precise routing, surfacing, and shaping of wood and composite materials. Perfect for detailed architectural elements, furniture components, and custom millwork.
                    </p>
                    <p className="text-[#6d5d50] mb-6">
                      Whether you need intricate designs, repeatable patterns, or precision cuts, our CNC capabilities deliver professional-grade results with exceptional accuracy and efficiency.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] border-2 border-[#8b7355] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      REQUEST CNC QUOTE
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>

                {/* Service 2: Laser Engraving */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="Laser Engraving Services"
                      className="w-full h-96 object-cover"
                    />
                    <div className="bg-[#1b1612] text-white text-center py-4 px-6">
                      <p className="italic text-sm">Custom laser engraving and cutting services</p>
                    </div>
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Laser Engraving & Cutting</h3>
                    <p className="text-[#6d5d50] mb-4">
                      Our large-format CO2 laser system features dual 70W and 180W laser heads, capable of engraving and cutting materials up to 42" wide x 32" deep. Perfect for signage, personalized gifts, awards, and decorative elements.
                    </p>
                    <p className="text-[#6d5d50] mb-6">
                      With our rotary setup for round objects and cylinders, we can laser engrave everything from wooden boxes to wine bottles, creating stunning personalized products for any occasion.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] border-2 border-[#8b7355] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      REQUEST LASER QUOTE
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* EQUIPMENT SPECIFICATIONS */}
          <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h2 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                  Equipment Specifications
                </h2>
                
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                  <div className="bg-white p-6 rounded-lg border border-[#e0e0e0]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Camaster Cobra CNC Machine</h3>
                    <ul className="space-y-3 text-[#6d5d50]">
                      <li><strong>Cutting Bed:</strong> 6 ft x 16 ft</li>
                      <li><strong>Capabilities:</strong> Routing, surfacing, shaping</li>
                      <li><strong>Materials:</strong> Wood, composites, soft metals</li>
                      <li><strong>Precision:</strong> High-accuracy repeatable cuts</li>
                      <li><strong>Applications:</strong> Architectural elements, furniture, millwork</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#e0e0e0]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Large-Format CO2 Laser</h3>
                    <ul className="space-y-3 text-[#6d5d50]">
                      <li><strong>Cutting Area:</strong> 42" wide x 32" deep</li>
                      <li><strong>Laser Heads:</strong> Dual 70W and 180W</li>
                      <li><strong>Capabilities:</strong> Engraving, cutting, marking</li>
                      <li><strong>Materials:</strong> Wood, acrylic, leather, fabric</li>
                      <li><strong>Rotary Setup:</strong> For cylindrical objects</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* APPLICATIONS & SERVICES */}
          <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h2 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                  Applications & Services
                </h2>
                
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-lg font-bold mb-2 text-[#1b1612]">Custom Signage</h3>
                    <p className="text-[#6d5d50]">
                      Professional laser-cut and engraved signs for businesses, homes, and events. Create lasting impressions with precision-crafted custom signage.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-lg font-bold mb-2 text-[#1b1612]">Personalized Gifts</h3>
                    <p className="text-[#6d5d50]">
                      Unique, personalized gifts including engraved boxes, wine glasses, cutting boards, and more. Perfect for weddings, anniversaries, and corporate gifts.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-lg font-bold mb-2 text-[#1b1612]">Architectural Millwork</h3>
                    <p className="text-[#6d5d50]">
                      Precision-routed architectural elements including trim, molding, decorative panels, and custom details for high-end residential and commercial projects.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-lg font-bold mb-2 text-[#1b1612]">Furniture Components</h3>
                    <p className="text-[#6d5d50]">
                      Custom-routed furniture parts, inlays, and decorative elements. From simple cuts to complex designs, we bring your furniture vision to life.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-lg font-bold mb-2 text-[#1b1612]">Awards & Recognition</h3>
                    <p className="text-[#6d5d50]">
                      Custom-engraved awards, plaques, and recognition items. Celebrate achievements with professionally crafted, personalized pieces.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-lg font-bold mb-2 text-[#1b1612]">Decorative Elements</h3>
                    <p className="text-[#6d5d50]">
                      Wall art, decorative panels, and custom designs. Transform your space with precision-crafted, uniquely personalized decorative pieces.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h3 className="text-3xl font-bold mb-8 text-[#1b1612]">
                  Ready to Create Something Extraordinary?
                </h3>
                <p className="text-lg text-[#6d5d50] mb-8 max-w-2xl mx-auto">
                  Contact us today to discuss your CNC routing or laser engraving project. Our team is ready to bring your ideas to life with precision and creativity.
                </p>
                <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a]">
                  CONTACT US TODAY
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
