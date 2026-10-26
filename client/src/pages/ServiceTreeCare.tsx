
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
        url="https://txurbansawmill.com/services/tree-care"
        image="/manus-storage/tree-care-hero_27d9548f.webp"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* HERO BANNER SECTION */}
          <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh] border-t-2 border-b-2 border-stone-400">
            <img
              src="/manus-storage/tree-care-hero_27d9548f.webp"
              alt="Tree Care, Removals & Consulting - Texas Urban Sawmill"
              className="absolute inset-0 h-full w-full object-cover object-center"
             decoding="async"/>

            <div className="relative mx-auto min-h-[40vh] max-w-7xl px-6 py-12 lg:px-8 lg:py-14 flex items-center justify-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="border-2 border-white px-3 py-5 lg:px-9 lg:py-14 text-center max-w-sm lg:max-w-3xl bg-black/[0.10] backdrop-blur-sm"
              >
                <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Tree Care, Removals & Consulting
                </h1>
              </motion.div>
            </div>
          </section>

          {/* INTRO SECTION */}
          <section className="bg-[#f0f0f0] px-6 py-12 lg:px-8 lg:py-16 border-t-2 border-stone-400 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                {/* Image on the left */}
                <div className="w-full">
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-2 border-black">
                    <img
                      src="/manus-storage/tree-service-team_b4b7aa0b.webp"
                      alt="Texas Urban Sawmill tree service team with crane truck"
                      className="w-full h-auto object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-black p-3 -mt-1">
                    <p className="text-center text-white text-xs italic leading-relaxed">
                      Devin Ginther and Eric Wilder, alongside Wilder Tree Service's lead climber, working together on a central Austin urban tree removal project focused on safety, efficiency, and sustainable urban timber recovery.
                    </p>
                  </div>
                </div>
                {/* Text on the right */}
                <div className="w-full bg-white p-8 rounded-lg shadow-md border-2 border-black">
                  <h4 className="text-2xl font-bold text-[#1b1612] mb-4">Power in Partnership</h4>
                  <div className="text-[#6d5d50] text-lg space-y-4">
                    <p>At Texas Urban Sawmill, we've always believed that every tree has value—even after it comes down. That's why we're proud to partner with Eric Wilder, ISA Certified Arborist and owner of Wilder Tree Service, a forward-thinking tree care company that shares our commitment to sustainability, craftsmanship, and community impact. By recognizing the utilization value of urban timber, this partnership helps maximize the value of every tree removed—creating a more sustainable approach while also helping deliver highly cost-competitive tree services to the community. Together, we're giving urban and community trees a second life through responsible stewardship, smart resource utilization, and purposeful collaboration.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* IMAGE GALLERY - CARD LAYOUT */}
          <section className="bg-white px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
                {/* Card 1 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black mb-4">
                    <img
                      src="/manus-storage/tree-care-apartments_f4f18c46.webp"
                      alt="Urban tree removal with crane truck"
                      className="w-full h-96 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                    <h4 className="text-lg font-bold text-[#1b1612] mb-2">Urban Tree Removal with Crane Truck</h4>
                    <p className="text-[#6d5d50] text-sm">Professional removal of trees in urban settings using specialized crane equipment for safe and efficient extraction.</p>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black mb-4">
                    <img
                      src="/manus-storage/tree-care-removal_b6ecda71.webp"
                      alt="Professional tree removal and rigging"
                      className="w-full h-96 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                    <h4 className="text-lg font-bold text-[#1b1612] mb-2">Professional Tree Removal & Rigging</h4>
                    <p className="text-[#6d5d50] text-sm">Expert rigging and removal techniques by certified arborists to safely bring down trees while maximizing lumber recovery.</p>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black mb-4">
                    <img
                      src="/manus-storage/tree-care-cutting_26d62dc5.webp"
                      alt="Expert chainsaw work and tree cutting"
                      className="w-full h-96 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                    <h4 className="text-lg font-bold text-[#1b1612] mb-2">Expert Chainsaw Work & Tree Cutting</h4>
                    <p className="text-[#6d5d50] text-sm">Skilled chainsaw operation and precise cutting techniques to process trees into manageable sections for transport and milling.</p>
                  </div>
                </motion.div>

                {/* Card 4 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black mb-4">
                    <img
                      src="/manus-storage/tree-care-chipping_a57cd7b5.webp"
                      alt="Land clearing and wood chipping operations"
                      className="w-full h-96 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                    <h4 className="text-lg font-bold text-[#1b1612] mb-2">Sustainable Land Services</h4>
                    <p className="text-[#6d5d50] text-sm">Sustainable land clearing services with wood chipping operations to process debris and maximize material recovery.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FEATURED SERVICES - TWO COLUMN */}
          <section className="bg-[#f0f0f0] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
                {/* Service 1 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Professional Tree Care & Removal</h3>
                    <p className="text-[#6d5d50] mb-4">
                      Our certified arborist and specialized tree crew handle removals with expertise and care. We prioritize the highest and best utilization of wood, ensuring that valuable timber is rescued rather than wasted.
                    </p>
                    <p className="text-[#6d5d50] mb-6 flex-grow">
                      We offer the most competitive rates in Texas without compromising on quality or service. We also work with independent tree service companies to advance sustainable forestry practices across the region.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      REQUEST TREE CARE QUOTE
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>

                {/* Service 2 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Sustainable Land Services</h3>
                    <p className="text-[#6d5d50] mb-4">
                      We provide the most sustainable land services in Texas with careful planning and execution. Our selective land clearing preserves natural habitats and protects local wildlife while maximizing wood utilization.
                    </p>
                    <p className="text-[#6d5d50] mb-6 flex-grow">
                      Unlike typical clearing companies, we prioritize education and responsible land management. We salvage trees and materials that would otherwise be discarded, processing them into Climate Smart Wood™ products.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      LAND SERVICES ESTIMATE
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SUSTAINABILITY COMMITMENT */}
          <section className="bg-[#f5f1e8] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1b1612] mb-4">Our Sustainability Commitment</h2>
              </motion.div>

              <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                {/* Commitment 1 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-[#1b1612] mb-3">Eco-Friendly Alternative</h3>
                  <p className="text-[#6d5d50]">
                    By choosing our services, you opt for a more environmentally friendly approach that maximizes resource utilization and minimizes carbon emissions.
                  </p>
                </motion.div>

                {/* Commitment 2 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-[#1b1612] mb-3">Landowner Benefits</h3>
                  <p className="text-[#6d5d50]">
                    We assist landowners in unlocking the potential of fallen trees, allowing them to produce valuable lumber and enjoy the advantages of sustainable land management.
                  </p>
                </motion.div>

                {/* Commitment 3 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-[#1b1612] mb-3">Charitable Giving</h3>
                  <p className="text-[#6d5d50]">
                    We offer 501(c) charitable donations for logs not desired by property owners. A portion of donated material is sold at Austin Habitat for Humanity ReStores.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
