
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
  { label: "About Us", href: "/about-us" },
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
              src="/manus-storage/20260507_121057_bd6dc2e7.jpg"
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

          {/* TOP UNIFIED SECTION: INTRO + GALLERY + SERVICE CARDS */}
          <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              {/* INTRO TEXT */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="text-center mb-12 bg-[#fbf8f3] px-8 py-6 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-2 border-[#8b7355]"
              >
                <p className="text-lg lg:text-xl text-[#1b1612] max-w-6xl mx-auto font-bold leading-relaxed">
                  Transform your vision into reality with our state-of-the-art CNC routing and laser engraving capabilities. From intricate woodworking details to custom signage and personalized gifts, we combine precision technology with expert craftsmanship to deliver exceptional results on every project.
                </p>
              </motion.div>

              {/* GALLERY SECTION - 4 PICTURES WITH DESCRIPTIONS */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="mb-20"
              >
                <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
                  {/* Gallery Item 1 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/TXUSCNCServices_d7715daf.jpg"
                        alt="CNC Routing Gallery"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Precision CNC Routing</h4>
                      <p className="text-[#6d5d50]">Our Camaster Cobra CNC machine can handle jobs as large as 72" wide x 184" long. Here we are surfacing a larger Texas Bald Cypress Slab. It can utilize up to 10 different bits within a project file.</p>
                    </div>
                  </div>

                  
                  
                  {/* Gallery Item 3 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260508_105250_676b21d1.jpg"
                        alt="Architectural Millwork"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Architectural Millwork</h4>
                      <p className="text-[#6d5d50]">Precision-routed trim, molding, panels, and custom architectural components for residential and commercial projects. We produce clean, repeatable parts with the flexibility to support one-of-a-kind designs and complex fabrication needs.</p>
                    </div>
                  </div>

                  
                  
                  {/* Gallery Item 5 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260423_150042_29fd5f52.jpg"
                        alt="Laser Engraved Coasters"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Custom Laser Engraving</h4>
                      <p className="text-[#6d5d50]">Our dual-head CO₂ laser system creates personalized products ranging from custom signage and engraved gifts to decorative architectural elements. Equipped with both 70W and 130W lasers, we handle everything from fine-detail engraving to precision cutting of thicker materials.</p>
                    </div>
                  </div>

                  
                  
                  {/* Gallery Item 2 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/TXUSDripNaturalSigns_4ce82498.jpg"
                        alt="Laser Engraving Gallery"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">CO2 Laser Services</h4>
                      <p className="text-[#6d5d50]">Precision laser engraving and cutting for detailed patterns, custom components, branding, and decorative applications across a wide range of materials and project types.</p>
                    </div>
                  </div>

                  
                  
                  {/* Gallery Item 4 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/Texas_Urban_Sawmill_Team-137_1de71412.jpg"
                        alt="Personalized Products"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Precision CNC Routing</h4>
                      <p className="text-[#6d5d50]">Devin Ginther preparing custom CNC toolpaths for precision architectural millwork and specialty fabrication projects. With more than 25 years of experience working with CNC technology dating back to his time as an R&D engineer within a Johns Hopkins University technology incubator.</p>
                    </div>
                  </div>

                  {/* Gallery Item 6 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260508_110854_489d1428.jpg"
                        alt="CNC Brush Detail Work"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Precision Structural Timber Machining</h4>
                      <p className="text-[#6d5d50]">We manufacture detailed timber frame profiles on beams up to 10 inches thick using specialized tooling with indexable carbide inserts for precision, consistency, and clean finishes. This advanced tooling allows for efficient production of complex architectural details, joinery, and custom beam profiles.</p>
                    </div>
                  </div>

                  {/* Gallery Item 7 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260507_154809_76af8f02.jpg"
                        alt="CNC Decorative Piece"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Beam End Profiling</h4>
                      <p className="text-[#6d5d50]">A series of four matched beam-end profiles designed to add intricate architectural detail and craftsmanship to the exterior of a custom-built home.</p>
                    </div>
                  </div>

                  {/* Gallery Item 8 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260406_110142_2461b5a9.jpg"
                        alt="Laser Engraved Water Bottles"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Laser Engraved Water Bottles</h4>
                      <p className="text-[#6d5d50]">Custom laser engraving on water bottles creates personalized gifts and promotional items with detailed graphics and text.</p>
                    </div>
                  </div>

                  {/* Gallery Item 9 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260417_155829_2268ef7c.jpg"
                        alt="CNC Curved Woodwork"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">CNC Decorative Arch</h4>
                      <p className="text-[#6d5d50]">This finished piece was precision CNC-machined to serve as a decorative architectural arch for the exterior of a timber frame home, combining detailed craftsmanship with structural-scale fabrication.</p>
                    </div>
                  </div>

                  {/* Gallery Item 10 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260417_145707_8cd935ee.jpg"
                        alt="CNC Decorative Elements"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">CNC Decorative Elements</h4>
                      <p className="text-[#6d5d50]">CNC routing produces decorative trim, molding, and architectural details that add character and elegance to any project.</p>
                    </div>
                  </div>

                  {/* Gallery Item 11 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260419_181047_b4bc96a5.jpg"
                        alt="CNC Spindle Production"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">A Family-Driven Business</h4>
                      <p className="text-[#6d5d50]">The entire Ginther family plays a role in supporting our business. Our two boys, Ryker and Boden, especially enjoy helping develop new products and exploring the creativity of working with lasers, 3D printers, and CNC technology.</p>
                    </div>
                  </div>

                  {/* Gallery Item 12 */}
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                      <img
                        src="/manus-storage/20260420_090741_a048ffe3.jpg"
                        alt="Laser Engraved Baseball Bat"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="mt-6 bg-[#fbf8f3] p-6 rounded-lg border-2 border-[#8b7355] shadow-md">
                      <h4 className="text-xl font-bold mb-3 text-[#1b1612]">Laser Engraved Baseball Bat</h4>
                      <p className="text-[#6d5d50]">Custom laser engraving on sports equipment creates personalized commemorative pieces, team awards, and one-of-a-kind gifts for players, coaches, and special events. At TXUS, we are proud supporters of the Dripping Springs High School Baseball Booster Club and enjoy creating custom engraved items that celebrate the athletes, families, and community behind the program.</p>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* DETAILED SERVICE SECTIONS */}
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 mb-20">
                {/* CNC Routing & Surfacing */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">CNC Routing & Surfacing</h3>
                  <p className="text-[#6d5d50] mb-4 flex-grow">
                    Our Camaster Cobra CNC machine features a 6 ft x 16 ft cutting bed, enabling precise routing, surfacing, and shaping of wood and composite materials. Perfect for detailed architectural elements, furniture components, and custom millwork.
                  </p>
                  <p className="text-[#6d5d50] mb-6 flex-grow">
                    Whether you need intricate designs, repeatable patterns, or precision cuts, our CNC capabilities deliver professional-grade results with exceptional accuracy and efficiency.
                  </p>
                  <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] mt-auto">
                    REQUEST CNC QUOTE
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Laser Engraving & Cutting */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Laser Engraving & Cutting</h3>
                  <p className="text-[#6d5d50] mb-4 flex-grow">
                    Our large-format CO2 laser system features dual 70W and 180W laser heads, capable of engraving and cutting materials up to 42" wide x 32" deep. Perfect for signage, personalized gifts, awards, and decorative elements.
                  </p>
                  <p className="text-[#6d5d50] mb-6 flex-grow">
                    With our rotary setup for round objects and cylinders, we can laser engrave everything from wooden boxes to wine bottles, creating stunning personalized products for any occasion.
                  </p>
                  <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] mt-auto">
                    REQUEST LASER QUOTE
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* APPLICATIONS & SERVICES */}
          <section className="bg-white px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
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
          <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
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
