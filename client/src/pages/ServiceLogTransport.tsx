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

          {/* INTRO TEXT & SERVICE CARDS SECTION */}
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
                      src="/manus-storage/TXUS-20-ton-Crane-Truck-1_c58fd3b0.webp"
                      alt="20-Ton Crane Truck with Logs"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px] justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Equipment & Capabilities</h3>
                      <p className="text-[#6d5d50] mb-4">
                        We are the only sawmill in Texas that operates a 20-ton national crane truck—a low emissions certified vehicle designed with a 14-foot flat bed for easier access into tight spaces. We can haul logs up to 16 feet long on the truck deck.
                      </p>
                      <p className="text-[#6d5d50] mb-6">
                        For higher volume rescue projects, we offer additional trucks, trailers, and construction equipment to handle large-scale operations efficiently and sustainably.
                      </p>
                    </div>
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
                      src="/manus-storage/Texas_Urban_Sawmill_CameronOak-41_e01fadeb.webp"
                      alt="Site Preparation for Tree Rescue"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px] justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Site Preparation & Access</h3>
                      <p className="text-[#6d5d50] mb-4">
                        Our crane truck requires an overhead clearance of over 13 feet along driveways and access points. During the craning process, we need clear line of sight to the sky or a minimum of 30 feet of overhead clearance to safely lift logs onto the truck deck.
                      </p>
                      <p className="text-[#6d5d50] mb-6">
                        The truck is 29 feet long and 102 inches wide. We work closely with clients to ensure access requirements are met before arrival, and we offer onsite assessments and consultation appointments to evaluate tree reuse opportunities.
                      </p>
                    </div>
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
                
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[#1b1612]">What Access and Clearance is Required Before Arriving?</h2>
                  <p className="text-[#6d5d50] mb-4">
                    This is VERY IMPORTANT and is a responsibility of the client to confirm access requirements are met. Our crane truck requires an overhead clearance of over 13 feet along any private driveways, roadways, and access points. This sometimes mean that low overhanging branches need to be trimmed, and we must be observant for low hanging communications and electrical lines.
                  </p>
                  <p className="text-[#6d5d50] mb-4">
                    During the craning process, we must have clear line of sight to the sky or a minimum of 30 feet of overhead clearance in order to safely lift the log(s) onto the truck deck. Extremely large and heavy logs require up to 42 feet of clearance. These are typically logs that are 30-36" in diameter or larger. See image below.
                  </p>
                  <p className="text-[#6d5d50] mb-4">
                    The truck is 29 feet long and 102 inches wide. We must have sufficient clearance along drives and thru gates in order to safely access the rescue site. It is basically the size of a cement or 15-cubic yard dump truck.
                  </p>
                  <p className="text-[#6d5d50] mb-4">
                    <strong>NOTE:</strong> Unfortunately, we are still required to charge for a trip, even if the log cannot be accessed or removed. We work very closely with our clients to ensure this does not occur. Additionally, we offer onsite assessments and consultation appointments to evaluate tree reuse opportunities.
                  </p>
                </div>

                <div className="mb-12 flex justify-center">
                  <div className="w-3/4 border-2 border-[#8b7355] shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                    <img
                      src="/manus-storage/TXUS-20-Ton-Crane-Truck-Clearance_fc13e360.webp"
                      alt="Crane Truck Clearance Requirements"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[#1b1612]">How Can I Best Prepare the Site?</h2>
                  <p className="text-[#6d5d50] mb-6">
                    We have experienced a large array of rescue sites and offer services even within the most challenging circumstances. With proper planning and good site preparation, you can keep our service charges to a minimum. If additional site work is necessary to access and safely load logs, beyond our standard 45-minute loading time, we bill at $150/hour.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-[#1b1612] mb-2">Log Location</h3>
                      <p className="text-[#6d5d50]">
                        In the best case, your log(s) are left along a curb or along a major access point. Avoid a massive, unorganized pile of logs that we are forced to sort through.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-[#1b1612] mb-2">Log Preparation</h3>
                      <p className="text-[#6d5d50]">
                        In the best case, the logs are bucked or chainsawed to lengths less than 16 feet long. All limbs and branches are trimmed along the length of the trunk. We always bring a chainsaw and can assist in log preparation. We also suggest that you paint or seal the end of your logs to prevent cracking and checking (any oil or latex paint will suffice in thick application coats).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-[#1b1612] mb-2">Tree Felling & Tree Service</h3>
                      <p className="text-[#6d5d50]">
                        We can offer highly competitive, certified arborists that specialize in tree removals and reuse. Our tree professionals understand how to take down a tree safety and efficiently while also maximizing the lumber opportunity. We are also happy to work with your own preferred tree service company. In an ideal situation, we are consulted early in the process before the tree is cut up into sections. Please take into consideration that tree service companies will cut and fell trees into small sections, for the benefit of their removal process, but not for the benefit of maximizing the lumber. They haul off this material as green biomass waste and pay associated dump fees.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-[#1b1612] mb-2">Ease of Access</h3>
                      <p className="text-[#6d5d50]">
                        We find that protruding limbs from surrounding trees along the access pathway and near the rescue site tend to interfere with our crane truck clearance. Please do your best to trim any surrounding low handing branches. Remove any major obstacles or equipment that may impede our access. If we are trimming trees along an access point, we are spending valuable loading time to gain access and may need to charge additional fees.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-[#1b1612] mb-2">Plan Early</h3>
                      <p className="text-[#6d5d50]">
                        It appears that in 80% of cases, when we receive a service request to repurpose a tree, the tree service work has already been completed. Moreover, nearly 95% of the time, we discover that the tree service company has significantly damaged the usable lumber. We are delighted to assist our clients by evaluating their trees and offering cutting recommendations. This process is simple and typically only requires emailing us high-quality pictures of the tree and its surroundings for assessment. You can email pictures to <a href="mailto:info@txurbansawmill.com" className="text-[#1b1612] font-semibold hover:underline">info@txurbansawmill.com</a>. We also offer the most competitive rates for tree service removals as we save time, energy and dump fees by upcycling a large mass of the fallen tree. This typically means we offer a savings that helps to cover the log transport fees.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#1b1612] p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#1b1612]">What Are Your Fees?</h3>
                  
                  <div className="space-y-6 text-[#6d5d50] text-base">
                    <div>
                      <h4 className="font-bold text-[#1b1612] mb-2">Crane Truck Pick-Up & Transport</h4>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>$7/mile (round-trip from Dripping Springs)</li>
                        <li>Includes 45 minutes loading time</li>
                        <li>Additional time: $150/hour</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#1b1612] mb-2">Baker Sawmill (Max 32&quot; diameter, 28 ft long)</h4>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>$200/hr (minimum $100)</li>
                        <li>Minimum log length: 36"</li>
                        <li>Recommended minimum diameter: 8-10"</li>
                        <li>Live Oak: Automatic $50 fee (dulls blades quickly)</li>
                        <li>Metal hit: $100</li>
                        <li>Turnaround: 1-2 weeks typically</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#1b1612] mb-2">Wood-Hizer WM1000 (Max 67&quot; diameter, 24 ft long)</h4>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>$300/hr (minimum $300)</li>
                        <li>Minimum log length: 48"</li>
                        <li>Ideal for oversized logs and specialty cuts</li>
                        <li>One of the largest thin-kerf sawmills in Texas</li>
                        <li>Live Oak: Automatic $225 fee (specialty carbide blades, non-sharpenable)</li>
                        <li>Metal hit: $225</li>
                        <li>Turnaround: 1-2 weeks typically</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#1b1612] mb-2">Tree Service & Land Improvement</h4>
                      <p className="mb-2">Contact us for quotes. We follow sustainable land and forestry management philosophies.</p>
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
