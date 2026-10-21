
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

export default function ServiceLumber() {
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
        title="Lumber, Beams, Mantels & Slabs - Rescued Texas Wood | Texas Urban Sawmill"
        description="Locally rescued wood, milled, kiln-dried, and prepared for long-term use. From architectural millwork to fine furniture. Premium quality lumber."
        url="https://txurbansawmill.com/services/lumber"
        image="/manus-storage/TXUSHeroBannerWebsite1920x600_a3cb474e.png"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* HERO BANNER SECTION - CORRECT SPECIFICATION */}
        <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh]">
          <img
            src="/manus-storage/TXUSHeroBannerWebsite1920x600_a3cb474e.png"
            alt="Lumber Milling Services - Texas Urban Sawmill"
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
                  Lumber, Beams, Mantels & Slabs
                </h1>
              </motion.div>
            </div>
          </section>

          {/* SECTION 1: FEATURED SERVICES - WHITE */}
          <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-stone-400 border-b-2 border-stone-400">
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
                  Texas Urban Sawmill provides precision‑milled lumber, beams, mantles, cookies, and fully custom milling solutions for any log brought to our facility. With advanced CNC capabilities and specialty processing, we transform reclaimed Texas hardwoods into high‑quality, project‑ready materials tailored to exact specifications.
                </p>
              </motion.div>

              {/* Large CTA to Shop */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="mb-10 mt-10"
              >
                <a href="/shop" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-base lg:text-lg font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>

              {/* Featured Services - Three Column Layout (2 Rows) */}
              <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
                {/* Service 1: Lumber */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="h-full flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/TXUSSarah&Dogs-AsheJuniper-AusinHabitatforHumanity_00a231bf.jpg"
                      alt="Lumber"
                      className="w-full h-64 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      Milled Ashe Juniper for Austin Habitat for Humanity ReStore—USDA FS Wood Innovations Project
                    </p>
                  </div>
                  <div className="mt-8 flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Lumber</h3>
                    <p className="text-[#6d5d50] mb-6 text-sm flex-grow">
                      We can mill virtually any fractional dimension to meet your project's needs. The most common thicknesses are 4/4, 6/4, 8/4, and 10/4, which equate to approximately 1 inch, 1.5 inches, 2 inches, and 3 inches respectively. Each board is precisely sawn, and we can also offer kiln‑drying services.
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a] text-xs mt-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      <a href="/shop">
                        Shop Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Service 2: Beams */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="h-full flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/TXUSOakBeam_f9cc7e55.webp"
                      alt="Beams"
                      className="w-full h-64 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      Post Oak beam—milled up to 28 feet long with tight grain and exceptional stability
                    </p>
                  </div>
                  <div className="mt-8 flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Beams</h3>
                    <p className="text-[#6d5d50] mb-6 text-sm flex-grow">
                      Our beams are milled from reclaimed logs and cut to a wide range of sizes and profiles. Whether structural or decorative, we produce solid timbers with exceptional character, stability, and craftsmanship. Each beam can undergo millwork, planing, or CNC shaping for custom architectural applications and exposed timber features.
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a] text-xs mt-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      <a href="/shop">
                        Shop Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Service 3: Mantles */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="h-full flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/TXUSEnglishWalnutMantle5_d288d81d.jpg"
                      alt="Mantles"
                      className="w-full h-64 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      English Walnut mantle milled to reveal the most appealing grains and natural shapes
                    </p>
                  </div>
                  <div className="mt-8 flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Mantles</h3>
                    <p className="text-[#6d5d50] mb-6 text-sm flex-grow">
                      We craft fireplace mantles from select slabs and beams chosen for their grain and figure. Each mantle is flattened, sanded, and finished to your specifications for a precise fit. Options include live‑edge, squared, or custom profiles. Every mantle is built as a standout feature in your space.
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a] text-xs mt-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      <a href="/shop">
                        Shop Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Service 4: Cookies */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="h-full flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/TXUS-CindyWalnutGoldOBase16_41c05dce.jpg"
                      alt="Cookies"
                      className="w-full h-64 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      Rare Mesquite cookie burls being finished out for display and functional use
                    </p>
                  </div>
                  <div className="mt-8 flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Cookies</h3>
                    <p className="text-[#6d5d50] mb-6 text-sm flex-grow">
                      Cookies (also called rounds) are cross‑sectional slices cut from logs, showing the full growth‑ring pattern of the tree. We cut cookies perpendicular to the trunk to produce clean, stable rounds in a variety of diameters. Each piece can be flattened, stabilized, and sanded to your specifications for display or functional use.
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a] text-xs mt-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      <a href="/shop">
                        Shop Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Service 5: Custom */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="h-full flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/CustomMilled_03fc4026.webp"
                      alt="Custom"
                      className="w-full h-64 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      Custom milled components—CNC shaping, surfacing, and specialty cuts
                    </p>
                  </div>
                  <div className="mt-8 flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Custom</h3>
                    <p className="text-[#6d5d50] mb-6 text-sm flex-grow">
                      For projects beyond standard milling, we provide custom processing tailored to the character and purpose of each log. Our capabilities include CNC shaping, surfacing, flattening, specialty cuts, custom molding, and precision profile matching or replication. We work with irregular or meaningful material to create functional, one-of-a-kind components with lasting value.
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a] text-xs mt-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      <a href="/contact">
                        Request Quote
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Service 6: Slabs */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  className="h-full flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                    <img
                      src="/manus-storage/Texas_Urban_Sawmilll_31_6a41e9b9.webp"
                      alt="Slabs"
                      className="w-full h-64 object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                    <p className="italic text-sm">
                      Live edge slabs preserving natural contours, grain, and organic edge profiles
                    </p>
                  </div>
                  <div className="mt-8 flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[320px]">
                    <h3 className="text-xl font-bold mb-4 text-[#1b1612]">Slabs</h3>
                    <p className="text-[#6d5d50] mb-6 text-sm flex-grow">
                      Live edge slabs preserve the natural contours of the tree, showcasing the full grain structure and organic edge profile. Cut in common thicknesses—4/4, 6/4, 8/4, and 10/4 (approximately 1", 1.5", 2", and 3")—each slab is flattened, sanded, and finished to your specifications.
                    </p>
                    <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a] text-xs mt-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                      <a href="/shop">
                        Shop Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
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
