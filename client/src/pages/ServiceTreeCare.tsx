
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
                className="border-2 border-white px-3 py-5 lg:px-9 lg:py-14 text-center max-w-sm lg:max-w-3xl bg-black/[0.10] backdrop-blur-sm"
              >
                <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
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
                className="text-center mb-8 -mt-12 bg-[#fbf8f3] px-8 py-6 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-2 border-[#8b7355]"
              >
                <p className="text-lg lg:text-xl text-[#1b1612] max-w-6xl mx-auto font-bold leading-relaxed">
                  We are paving the way for change in Texas and believe in a full-circle approach to forestry management and urban tree care. That means we take part in all aspects, from plantings to sustainable reuse of woody materials. We have a certified arborist on our team and a specialized tree crew that handles removals, ensuring the highest and best utilization of the wood.
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
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="Professional Tree Care Services"
                      className="w-full h-96 object-cover"
                    />
                    <div className="bg-[#8b7355] text-white text-center py-4 px-6">
                      <p className="italic text-sm">Expert certified arborist tree care and removal</p>
                    </div>
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Professional Tree Care & Removal</h3>
                    <p className="text-[#6d5d50] mb-4">
                      Our certified arborist and specialized tree crew handle removals with expertise and care. We prioritize the highest and best utilization of wood, ensuring that valuable timber is rescued rather than wasted.
                    </p>
                    <p className="text-[#6d5d50] mb-6">
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
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="Sustainable Land Services"
                      className="w-full h-96 object-cover"
                    />
                    <div className="bg-[#8b7355] text-white text-center py-4 px-6">
                      <p className="italic text-sm">Sustainable land clearing and forestry management</p>
                    </div>
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Sustainable Land Services</h3>
                    <p className="text-[#6d5d50] mb-4">
                      We provide the most sustainable land services in Texas with careful planning and execution. Our selective land clearing preserves natural habitats and protects local wildlife while maximizing wood utilization.
                    </p>
                    <p className="text-[#6d5d50] mb-6">
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
          <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h2 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                  Our Sustainability Commitment
                </h2>
                
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white p-6 rounded-lg border border-[#e0e0e0]">
                    <h3 className="text-lg font-bold mb-3 text-[#1b1612]">Eco-Friendly Alternative</h3>
                    <p className="text-[#6d5d50]">
                      By choosing our services, you opt for a more environmentally friendly approach that maximizes resource utilization and minimizes carbon emissions.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#e0e0e0]">
                    <h3 className="text-lg font-bold mb-3 text-[#1b1612]">Landowner Benefits</h3>
                    <p className="text-[#6d5d50]">
                      We assist landowners in unlocking the potential of fallen trees, allowing them to produce valuable lumber and enjoy the advantages of sustainable land management.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#e0e0e0]">
                    <h3 className="text-lg font-bold mb-3 text-[#1b1612]">Charitable Giving</h3>
                    <p className="text-[#6d5d50]">
                      We offer 501(c) charitable donations for logs not desired by property owners. A portion of donated material is sold at Austin Habitat for Humanity ReStores.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ADDITIONAL SERVICES */}
          <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h2 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                  Additional Services
                </h2>
                
                <div className="space-y-8">
                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-xl font-bold mb-2 text-[#1b1612]">Design & Tree Reuse Consultation</h3>
                    <p className="text-[#6d5d50] mb-3">
                      Our team brings over 30 years of experience in product commercialization and sustainable lumber utilization. We prioritize sustainability by utilizing lumber from rescued trees, offering significant carbon savings compared to other construction materials.
                    </p>
                    <p className="text-[#6d5d50]">
                      We refer to these projects as Climate Smart Projects™ as they focus on accelerating the sustainability goals of our clients. With a certified project management professional on staff, we bridge the gap between desired outcomes and the material science of working with rescued urban wood.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-xl font-bold mb-2 text-[#1b1612]">Crane Pick-Up & Log Transport</h3>
                    <p className="text-[#6d5d50] mb-3">
                      The removal and transportation of logs is a significant challenge that prevents many people from salvaging fallen trees. We strive to make the process easier for Texas residents and business owners.
                    </p>
                    <p className="text-[#6d5d50]">
                      Our service fees are typically based on mileage at $7/mile round-trip from Dripping Springs, including up to 45 minutes of loading time. For large-scale projects, we offer project-based quotes and long-distance mileage discounts.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-xl font-bold mb-2 text-[#1b1612]">Neighborhood Sawmill Services</h3>
                    <p className="text-[#6d5d50] mb-3">
                      We offer top-quality wood milling services to the general public with state-of-the-art sawmills. Our Baker Sawmill has a cutting capacity of up to 28" x 20' and is billed at $200/hour. Our Woodmizer WM-1000 has a cutting capacity of up to 72" x 18' and is billed at $300/hour.
                    </p>
                    <p className="text-[#6d5d50]">
                      Customers are responsible for replacing damaged blades, and turnaround time is usually 1-2 weeks. Contact us for more information or to schedule a drop-off time.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-xl font-bold mb-2 text-[#1b1612]">Sustainable Construction Projects</h3>
                    <p className="text-[#6d5d50] mb-3">
                      We specialize in providing Climate Smart Project™ solutions in construction and land improvement projects. These projects can offer net negative carbon savings and help accelerate sustainability goals.
                    </p>
                    <p className="text-[#6d5d50]">
                      As a company, we have saved Texans over 1,000,000 lbs of carbon and are one of the few carbon-negative businesses in Texas. By using locally fallen trees, clients can create powerful and meaningful experiences that evoke emotions and demonstrate sustainability commitments.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#217938] pl-6">
                    <h3 className="text-xl font-bold mb-2 text-[#1b1612]">Heirloom Furniture & Climate Smart Wood™</h3>
                    <p className="text-[#6d5d50] mb-3">
                      We offer locally made, net-carbon negative furniture products that bring the history of our fallen trees into your home while supporting a sustainable future. Our furniture collection comprises stunning heirloom pieces made from Climate Smart Wood™.
                    </p>
                    <p className="text-[#6d5d50]">
                      Every piece of furniture can be traced back to the rescued trees' original location, and we guarantee the tree's history with a certificate of authenticity. Discover the beauty of our collection and join us in shaping a sustainable future.
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
                  Join the Movement for Sustainable Forestry
                </h3>
                <p className="text-lg text-[#6d5d50] mb-8 max-w-2xl mx-auto">
                  Together, we can make a lasting impact on the environment. Contact us today to learn more about our tree care, removal, and sustainable land services.
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
