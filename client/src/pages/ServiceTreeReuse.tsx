
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
            className="absolute inset-0 h-full w-full object-cover object-bottom"
          />

          <div className="relative mx-auto min-h-[40vh] max-w-7xl px-6 py-12 lg:px-8 lg:py-14 flex items-center justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="border-2 border-white px-5 py-7 lg:px-14 lg:py-22 text-center max-w-xl lg:max-w-4xl bg-black/[0.15] backdrop-blur-sm"
            >
              <div>
                <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Adaptive Tree Re-Use Projects
                </h1>
                <p className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl mt-2">
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
              className="mb-20"
            >
              <Button asChild className="w-full bg-[#217938] text-white hover:bg-[#1a5a2a] py-8 lg:py-12 text-lg lg:text-2xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-black">
                <a href="#adaptive-process" className="flex items-center justify-center gap-3">
                  View Our Process
                  <ArrowRight className="h-6 w-6 lg:h-8 lg:w-8" />
                </a>
              </Button>
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
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">PMP Project Management</h3>
                  <p className="text-[#6d5d50] mb-6">
                    The Texas Urban Sawmill stands as the sole business in Texas and one of the rare enterprises in North America dedicated to providing comprehensive support for adaptive tree re-use projects from start to finish. Our Project Management Professional (PMP) oversees every facet of these endeavors, having over 20 years of global commercialization project experience. We prioritize meticulous planning, effective scope management, efficient scheduling, prudent cost management, and rigorous quality assurance.
                  </p>
                  <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a]">
                    <a href="/contact">
                      Request Project Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
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
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Adaptive Tree Re-Use Projects</h3>
                  <p className="text-[#6d5d50] mb-6">
                    These Adaptive Tree ReUse projects offer a unique opportunity for clients to make a significant impact on environmental sustainability. By using trees that would typically be part of the waste stream or chipped or mulched, clients can create powerful and meaningful experiences for residents and customers. From these rescued trees, we produce Climate Smart Wood™ for our clients—the most sustainable form of lumber with net negative carbon benefits.
                  </p>
                  <Button asChild className="bg-[#217938] text-white hover:bg-[#1a5a2a]">
                    <a href="/contact">
                      Request Project Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
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
