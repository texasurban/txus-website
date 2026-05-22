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

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/txurbansawmill",
    icon: "Instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/c/TexasUrbanSawmillLLC",
    icon: "YouTube",
  },
  {
    label: "Facebook",
    href: "http://facebook.com/texasurbansawmill",
    icon: "Facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devin-ginther",
    icon: "LinkedIn",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceLogTransport() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const contactMailto = useMemo(
    () =>
      "mailto:info@txurbansawmill.com?subject=Texas%20Urban%20Sawmill%20Log%20Transport%20Inquiry",
    [],
  );

  return (
    <>
      <SEOHead
        title="Log Transport & Crane Services - Heavy-Lift Solutions | Texas Urban Sawmill"
        description="Professional log transport and heavy-lift crane services. Moving logs safely and efficiently from site to sawmill. Expert handling of large timber."
        url="https://txsawmill-hnwf9q8m.manus.space/services/log-transport"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* HERO BANNER SECTION */}
          <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh]">
            <img
              src="/manus-storage/pasted_file_1NUlMM_TXUS20-tonCraneTruck1_b41c4db2.jpg"
              alt="Log Transport & Crane Services - Texas Urban Sawmill"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="relative mx-auto min-h-[50vh] max-w-7xl px-6 py-16 lg:px-8 lg:py-20 flex items-center justify-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="border-2 border-white px-3 py-5 lg:px-9 lg:py-14 text-center max-w-sm lg:max-w-3xl bg-black/[0.10] backdrop-blur-sm"
              >
                <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Log Transport & Crane Services
                </h1>
              </motion.div>
            </div>
          </section>

          {/* INTRO TEXT SECTION */}
          <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="text-center mb-8 -mt-12 bg-[#fbf8f3] px-8 py-6 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-2 border-[#8b7355]"
              >
                <p className="text-lg lg:text-xl text-[#1b1612] max-w-6xl mx-auto font-bold leading-relaxed">
                  Professional log transport and heavy-lift crane services. Moving logs safely and efficiently from site to sawmill. Expert handling of large timber.
                </p>
              </motion.div>
            </div>
          </section>

          {/* SERVICE CARDS SECTION */}
          <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 mb-20">
                {/* Service 1: Equipment & Capabilities */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="20-Ton Crane Truck with Logs"
                      className="w-full h-96 object-cover"
                    />
                    <div className="bg-[#8b7355] text-white text-center py-4 px-6">
                      <p className="italic text-sm">Professional crane truck loading large logs</p>
                    </div>
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Equipment & Capabilities</h3>
                    <p className="text-[#6d5d50] mb-4">
                      We are the only sawmill in Texas that operates a 20-ton national crane truck—a low emissions certified vehicle designed with a 14-foot flat bed for easier access into tight spaces. We can haul logs up to 16 feet long on the truck deck.
                    </p>
                    <p className="text-[#6d5d50] mb-6">
                      For higher volume rescue projects, we offer additional trucks, trailers, and construction equipment to handle large-scale operations efficiently and sustainably.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      REQUEST TRANSPORT QUOTE
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>

                {/* Service 2: Site Preparation & Access */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                >
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/placeholder-image.webp"
                      alt="Site Preparation for Tree Rescue"
                      className="w-full h-96 object-cover"
                    />
                    <div className="bg-[#8b7355] text-white text-center py-4 px-6">
                      <p className="italic text-sm">Proper site preparation ensures efficient rescue operations</p>
                    </div>
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Site Preparation & Access</h3>
                    <p className="text-[#6d5d50] mb-4">
                      Our crane truck requires an overhead clearance of over 13 feet along driveways and access points. During the craning process, we need clear line of sight to the sky or a minimum of 30 feet of overhead clearance to safely lift logs onto the truck deck.
                    </p>
                    <p className="text-[#6d5d50] mb-6">
                      The truck is 29 feet long and 102 inches wide. We work closely with clients to ensure access requirements are met before arrival, and we offer onsite assessments and consultation appointments to evaluate tree reuse opportunities.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      SCHEDULE SITE ASSESSMENT
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SERVICE AREA & PREPARATION */}
          <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h2 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                  Service Area & Site Preparation
                </h2>
                
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 mb-12">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Service Area</h3>
                    <p className="text-[#6d5d50] mb-4">
                      We have the ability to service all areas of Texas, but due to transport costs, we typically rescue trees within a 200-mile radius of Austin, TX. For projects outside this radius, we offer project-based quotes and long-distance mileage discounts.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">How to Prepare Your Site</h3>
                    <ul className="text-[#6d5d50] space-y-3">
                      <li><strong>Log Location:</strong> Position logs along a curb or major access point for easy loading.</li>
                      <li><strong>Log Preparation:</strong> Buck logs to lengths under 16 feet and trim all limbs and branches.</li>
                      <li><strong>Tree Service:</strong> Consult with us before tree removal to maximize lumber potential.</li>
                      <li><strong>Ease of Access:</strong> Trim surrounding branches that may interfere with crane clearance.</li>
                      <li><strong>Plan Early:</strong> Email high-quality pictures to info@txurbansawmill.com for assessment.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#1b1612] p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Pricing & Fees</h3>
                  <div className="space-y-4 text-[#6d5d50]">
                    <div>
                      <p className="font-semibold text-[#1b1612]">Crane Truck Pick-Up & Transport: $7/mile</p>
                      <p className="text-sm">Billed round-trip from Dripping Springs. Includes 45 minutes loading time. Additional time: $150/hour.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1b1612]">Tree Service & Land Improvement</p>
                      <p className="text-sm">Contact us directly for competitive quotes on sustainable tree removal and land services.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <h3 className="text-3xl font-bold mb-8 text-[#1b1612]">
                  Ready to Rescue Your Fallen Trees?
                </h3>
                <p className="text-lg text-[#6d5d50] mb-8 max-w-2xl mx-auto">
                  Contact us today for a site assessment and project estimate. We'll help you turn your fallen trees into valuable, sustainable resources.
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
