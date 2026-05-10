
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
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
      { label: "Custom Furniture", href: "/services#custom-furniture" },
      { label: "Sawmilling & Kiln Drying", href: "/services#sawmilling" },
      { label: "Tree Re-Use Construction", href: "/services#tree-reuse" },
      { label: "Log Transport & Crane", href: "/services#log-transport" },
      { label: "Tree Care & Removals", href: "/services#tree-care" },
      { label: "Millworks, CNC, & Laser", href: "/services#millworks" },
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
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/c/TexasUrbanSawmillLLC",
    icon: Youtube,
  },
  {
    label: "Facebook",
    href: "http://facebook.com/texasurbansawmill",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devin-ginther",
    icon: Linkedin,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceTreeReuse() {
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
        title="Climate-Smart Tree Re-Use Construction Projects | Texas Urban Sawmill"
        description="Adaptive tree re-use construction solutions that reduce waste and meet real-world building demands. Climate-smart material-driven solutions for sustainable projects."
        url="https://txsawmill-hnwf9q8m.manus.space/services/tree-reuse"
      />
      <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        {/* HERO BANNER SECTION */}
        <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh]">
          <img
            src="/manus-storage/20200427_142407_4fffcc85.webp"
            alt="Climate-Smart Tree Re-Use Construction Projects - Texas Urban Sawmill"
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
              <div>
                <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Adaptive Tree Re-Use Projects
                </h1>
                <p className="font-display text-lg font-semibold leading-tight text-white sm:text-xl lg:text-2xl mt-2">
                  Climate-Smart Construction
                </p>
              </div>
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
                TXUS specializes in providing Climate Smart Project™ solutions for construction and land improvement projects. Our work delivers measurable sustainability outcomes, including net-negative carbon impacts that help accelerate environmental goals. To date, we have helped save Texans over 1,000,000 lbs of CO₂e — making TXUS one of the few carbon-negative businesses in Texas.
              </p>
            </motion.div>

            {/* Large CTA to Process Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className="mb-10 mt-10"
            >
              <a href="#adaptive-process" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-base lg:text-lg font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] border-2 border-black">
                View Our Process
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Featured Services - Two Column Layout */}
            <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 mb-20">
              {/* Service 1: PMP Project Management */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <div className="overflow-hidden rounded-lg mb-0 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black">
                  <img
                    src="/manus-storage/AustinStateHospital-TreeSurvey35_cab1ad1f.webp"
                    alt="PMP Project Management - Tree Survey"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="bg-[#1b1612] text-white text-center py-4 px-6 rounded-b-lg">
                  <p className="italic text-sm">
                    What was once cleared is now preserved. TXUS rescues and reuses trees from the Austin State Hospital project, turning local urban wood into lasting value.
                  </p>
                </div>
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">PMP Project Management</h3>
                  <p className="text-[#6d5d50] mb-4">
                    The Texas Urban Sawmill is the only business in Texas and among the few in North America providing complete start-to-finish support for Adaptive Tree ReUse projects. Led by a certified Project Management Professional with over 20 years of global commercialization experience, TXUS delivers expert planning, scope management, scheduling, cost control, and quality assurance to help clients successfully execute complex, sustainability-driven projects.
                  </p>
                  <a href="/contact" className="inline-flex items-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a]">
                    Request Project Quote
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Service 2: Adaptive Tree Re-Use */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <div className="overflow-hidden rounded-lg mb-0 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black">
                  <img
                    src="/manus-storage/AustinStateHospital-TreeSurvey60_31935268.webp"
                    alt="Adaptive Tree Re-Use Projects - Log Processing"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="bg-[#1b1612] text-white text-center py-4 px-6 rounded-b-lg">
                  <p className="italic text-sm">
                    In the heart of the Austin State Hospital redevelopment, Devin Ginther is helping preserve the story of Central Texas trees through urban wood recovery and reuse.
                  </p>
                </div>
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Adaptive Tree Re-Use Projects</h3>
                  <p className="text-[#6d5d50] mb-4">
                    These Adaptive Tree ReUse projects offer a unique opportunity for clients to make a significant impact on environmental sustainability. By using trees that would typically be part of the waste stream or chipped or mulched, clients can create powerful and meaningful experiences for residents and customers. From these rescued trees, we produce Climate Smart Wood™ for our clients—the most sustainable form of lumber with net negative carbon benefits.
                  </p>
                  <a href="/contact" className="inline-flex items-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a]">
                    Request Project Quote
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 1.5: PMP PROCESS TIMELINE */}
        <section id="adaptive-process" className="bg-[#2a3a4a] px-6 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/CAHtb59ZUNY7YiqafFtZ8m/pmp-process-mockup-9YWVpCJLpB26SD93nPkMUA.webp"
                alt="Adaptive Tree Re-Use Process Timeline"
                className="w-full rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </section>


        {/* CTA SECTION */}
        <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl text-center">
            <h3 className="text-3xl font-bold mb-8 text-[#1b1612]">
              Partner with us to become part of the solution to a greener future!
            </h3>
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a]">
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </>
  );
}
