
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

const services = [
  {
    title: "Lumber, Beams, Mantels & Slabs",
    body: "Locally rescued wood, milled, kiln-dried, and prepared for long-term use—from complex architectural millwork projects to fine furniture.",
  },
  {
    title: "Sawmilling & Custom Lumber Production",
    body: "Custom milling for homeowners, builders, and makers—turning salvaged logs into usable lumber with the capability to handle projects others can't.",
  },
  {
    title: "Climate-Smart Construction Projects",
    body: "Material-driven solutions that integrate adaptive tree re-use practices into building projects—reducing waste while meeting real-world construction demands.",
  },
  {
    title: "Log Transport & Crane Services",
    body: "Heavy-lift and transport services that make recovery possible—moving logs safely and efficiently from site to sawmill.",
  },
  {
    title: "Tree Care, Removals & Consulting",
    body: "Experienced tree care that looks beyond removal—prioritizing reuse, stewardship, and lasting value.",
  },
  {
    title: "Lumber Surfacing, CNC & Fabrication",
    body: "Precision surfacing, CNC routing, Laser etching, and fabrication services for custom architectural elements, furniture components, and one-of-a-kind work.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceSawmilling() {
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
        title="Sawmilling & Kiln Drying Services - Custom Lumber Milling | Texas Urban Sawmill"
        description="Professional sawmilling and kiln drying services for custom lumber production. Locally rescued wood, milled and kiln-dried for long-term use. Learn more."
        url="https://txsawmill-hnwf9q8m.manus.space/services/sawmilling"
      />
      <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        {/* HERO BANNER SECTION - CORRECT SPECIFICATION */}
        <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh]">
          <img
            src="/manus-storage/hero-sawmill-timber-edge_e2f38fbf_c180a6f2.webp"
            alt="Sawmilling & Kiln Drying Services - Texas Urban Sawmill"
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
                Sawmilling & Kiln Drying
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
                Texas Urban Sawmill transforms logs, beams, and timbers into high-end, climate-smart lumber ready for any application. As the only sawmill in Texas operating 480V electric industrial sawmills, we deliver high-efficiency, zero-emission processing—ensuring every log is handled with technical precision and environmental care. From custom dimensions to construction-grade stock, our advanced milling and kiln-drying capabilities produce consistent, high-quality material at scale.
              </p>
            </motion.div>

            {/* Featured Services - Two Column Layout */}
            <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 mb-20">
              {/* Service 1: Custom Sawmilling */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                  <img
                    src="/manus-storage/sawmilling-hero-wm1000-final_e97520f2_490e46b9.webp"
                    alt="Custom Sawmilling"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                  <p className="italic text-sm">
                    Sarah Ginther is the Lead Sawyer and stands ready to mill on the Woodmizer WM1000, one of the largest sawmills in Texas built in Poland. It can mill a 67" diameter log with a length up to 25 feet.
                  </p>
                </div>
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Custom Sawmilling</h3>
                  <p className="text-[#6d5d50] mb-4">
                    We mill logs of all sizes with precision and consistency. Our Baker industrial sawmill is built for production, while the Wood-Mizer WM1000 allows us to process large-diameter logs and specialized cuts others can't. With capacity up to 50,000 board feet per month, we handle everything from one-off jobs to large-scale commercial orders. Powered by 480V electric industrial sawmills, our operation delivers high-efficiency, zero-emission processing at scale.
                  </p>
                  <a href="/contact" className="inline-flex items-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] border-2 border-[#8b7355] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                    Request Sawmilling Quote
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Service 2: Kiln Drying */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <div className="overflow-hidden rounded-lg mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-[#8b7355]">
                  <img
                    src="/manus-storage/kiln-drying-chamber-final_3e08b431_d77bef5d.webp"
                    alt="Kiln Drying Services"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="bg-[#8b7355] text-white text-center py-4 px-6 rounded-b-lg">
                  <p className="italic text-sm">
                    Our traditional dehumidification (DH) kiln can dry up to 6,000 board feet of lumber per cycle, with sterilization temperatures exceeding 180°F to ensure quality, stability, and pest-free material.
                  </p>
                </div>
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h3 className="text-2xl font-bold mb-4 text-[#1b1612]">Kiln Drying Services</h3>
                  <p className="text-[#6d5d50] mb-4">
                    We operate two advanced kiln systems for efficient, high-quality lumber drying. Our Nyle dehumidification (DH) kiln provides consistent, controlled drying for general lumber, while the high-frequency (HF) vacuum kiln rapidly dries higher-value material with reduced turnaround times. Depending on species and thickness, drying cycles range from 2–6 weeks in the HF kiln and 2–3 months in the DH kiln, allowing us to balance speed, stability, and craftsmanship across projects of all sizes.
                  </p>
                  <a href="/contact" className="inline-flex items-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] border-2 border-[#8b7355] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                    Request Kiln Drying Quote
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 1.5: SAWMILL SPECIFICATIONS - PRICING - TAN */}
        <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <h3 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                Sawmilling Services & Pricing
              </h3>
              <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
                {/* Baker Sawmill */}
                <div className="bg-white p-8 rounded-lg">
                  <h4 className="text-xl font-bold mb-6 text-[#1b1612]">480V Electric Baker Sawmill</h4>
                  
                  <p className="font-bold text-[#1b1612] mb-3">Capacity:</p>
                  <p className="text-[#6d5d50]">Maximum diameter: 32" | Maximum length: 28 feet</p>

                  <p className="font-bold text-[#1b1612] mb-3">Pricing:</p>
                  <ul className="space-y-2 text-[#6d5d50] mb-6">
                    <li>Hourly Rate: $200/hour (Min. $100)</li>
                    <li>Multi-day Projects: 10% discount</li>
                  </ul>

                  <p className="font-bold text-[#1b1612] mb-3">Specifications:</p>
                  <ul className="space-y-2 text-[#6d5d50] mb-6">
                    <li>• Minimum log length: 36"</li>
                    <li>• Recommended minimum diameter: 8-10"</li>
                    <li>• Larger logs yield more efficient milling</li>
                  </ul>

                  <p className="font-bold text-[#1b1612] mb-3">Blade Fees:</p>
                  <ul className="space-y-2 text-[#6d5d50]">
                    <li><span className="font-semibold">Hit Metal/Tooth Damage:</span> $100</li>
                    <li><span className="font-semibold">Live Oak:</span> Automatic $50 fee (dulls blades quickly)</li>
                    <li><span className="font-semibold">Turnaround:</span> 1-2 weeks typically</li>
                  </ul>

                  {/* Baker Sawmill Image */}
                  <div className="mt-8 rounded-lg overflow-hidden">
                    <img src="/manus-storage/Sarah_Baker_optimized_d4406d7c_e59994a8.webp" alt="Baker Sawmill" loading="lazy" className="w-full h-auto object-cover rounded-lg" />
                  </div>
                </div>

                {/* Wood-Mizer WM1000 */}
                <div className="bg-white p-8 rounded-lg">
                  <h4 className="text-xl font-bold mb-6 text-[#1b1612]">480V Electric Wood-Mizer WM1000</h4>
                  
                  <p className="font-bold text-[#1b1612] mb-3">Capacity:</p>
                  <p className="text-[#6d5d50]">Maximum diameter: 67" | Maximum length: 24 feet</p>

                  <p className="font-bold text-[#1b1612] mb-3">Pricing:</p>
                  <ul className="space-y-2 text-[#6d5d50] mb-6">
                    <li>Hourly Rate: $300/hour (Min. $100)</li>
                    <li>Multi-day Projects: 10% discount</li>
                  </ul>

                  <p className="font-bold text-[#1b1612] mb-3">Specifications:</p>
                  <ul className="space-y-2 text-[#6d5d50] mb-6">
                    <li>• Minimum log length: 48"</li>
                    <li>• Ideal for oversized logs and specialty cuts</li>
                    <li>• One of the largest thin-kerf sawmills in Texas</li>
                  </ul>

                  <p className="font-bold text-[#1b1612] mb-3">Blade Fees:</p>
                  <ul className="space-y-2 text-[#6d5d50]">
                    <li><span className="font-semibold">Hit Metal/Tooth Damage:</span> $225</li>
                    <li><span className="font-semibold">Live Oak:</span> Automatic $225 fee (specialty carbide blades required, non-sharpenable)</li>
                    <li><span className="font-semibold">Turnaround:</span> 1-2 weeks typically</li>
                  </ul>

                  {/* WM1000 Sawmill Image */}
                  <div className="mt-8 rounded-lg overflow-hidden">
                    <img src="/manus-storage/WM1000_new_optimized_b6c172ae_75642c76.webp" alt="WM1000 Sawmill" loading="lazy" className="w-full h-auto object-cover rounded-lg" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: KILN TECHNOLOGY - CREAM */}
        <section className="bg-[#f0f0f0] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <h3 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                Kiln Technology
              </h3>
              <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
                {/* Vacuum High Frequency Kiln */}
                <div>
                  <h4 className="text-xl font-bold mb-4 text-[#1b1612]">Vacuum High Frequency (VHF) Kiln Drying</h4>
                  <p className="text-[#6d5d50] mb-4">
                    For our thickest slabs and most challenging timbers, we utilize Vacuum High Frequency (VHF) technology. This advanced system dries wood from the inside out, combining a vacuum environment with radio-frequency energy to deliver rapid, uniform results with virtually no defects. It is the most sophisticated way to stabilize "heavy" timber while preserving its natural beauty.
                  </p>
                  <p className="font-bold text-[#1b1612] mb-3">The VHF Advantage</p>
                  <ul className="space-y-3 text-[#6d5d50] mb-6">
                    <li><strong>The Vacuum:</strong> By reducing internal air pressure, we lower the boiling point of water. This allows moisture to evaporate at much lower temperatures, protecting the wood from heat-related stress.</li>
                    <li><strong>High Frequency (HF):</strong> Much like a microwave, radio waves excite water molecules directly in the core of the timber. This ensures that even the thickest beams heat evenly from the inside out, rather than relying on surface-level air temperature.</li>
                  </ul>
                  <p className="font-bold text-[#1b1612] mb-3">The Process</p>
                  <ol className="space-y-3 text-[#6d5d50]">
                    <li><strong>Sealing:</strong> Timbers are loaded into a specialized, airtight pressure chamber.</li>
                    <li><strong>Depressurizing:</strong> The vacuum system pulls the air out, creating a low-pressure environment.</li>
                    <li><strong>Molecular Heating:</strong> High-frequency energy penetrates the wood, vaporizing internal moisture at a gentle, low temperature.</li>
                    <li><strong>Extraction:</strong> The vacuum system continuously draws out the vaporized moisture.</li>
                    <li><strong>Completion:</strong> The cycle repeats with technical precision until the core reaches its target moisture content—leaving the timber stable and ready for any application.</li>
                  </ol>
                </div>

                {/* Dehumidification Kiln */}
                <div>
                  <h4 className="text-xl font-bold mb-4 text-[#1b1612]">Dehumidification (DH) Kiln Drying</h4>
                  <p className="text-[#6d5d50] mb-4">
                    Unlike traditional steam kilns that vent heat, our Dehumidification (DH) Kiln uses a sophisticated closed-loop system. By removing moisture internally, this energy-efficient process gently stabilizes the unique character of our reclaimed Texas timber.
                  </p>
                  <p className="font-bold text-[#1b1612] mb-3">The DH Advantage</p>
                  <ul className="space-y-3 text-[#6d5d50] mb-6">
                    <li><strong>Lower Operating Costs:</strong> DH kilns generally have lower energy requirements and maintenance costs compared to the complex radio-frequency and vacuum systems of a VHF kiln.</li>
                    <li><strong>Setup Simplicity:</strong> The technology is less specialized, making it a more cost-effective solution for standard-thickness lumber (1" to 3") without the high overhead of vacuum technology.</li>
                  </ul>
                  <p className="font-bold text-[#1b1612] mb-3">The Process</p>
                  <ul className="space-y-3 text-[#6d5d50] mb-6">
                    <li><strong>The Stack:</strong> Lumber is layered with "stickers" to ensure 360-degree airflow.</li>
                    <li><strong>The Warm-Up:</strong> Steady heat (90–160°F) draws moisture from the heart of the wood to the surface.</li>
                    <li><strong>The Extraction:</strong> Our industrial system condenses air-bound moisture into liquid and drains it away.</li>
                    <li><strong>The Recirculation:</strong> Instead of wasting energy, dry air is reheated and recirculated back through the load.</li>
                    <li><strong>The Target:</strong> The cycle continues until we reach the perfect moisture content—ensuring stable, furniture-ready lumber.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 text-center">
                <a href="/contact" className="inline-flex items-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a]">
                  Get Your Kiln Drying Quote
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: PROCESS STEPS - WHITE */}
        <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <h3 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                Our Process
              </h3>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
                {[
                  { step: "1", title: "Log Selection", desc: "We carefully evaluate and select logs for optimal milling potential and material quality." },
                  { step: "2", title: "Sawing", desc: "Precision cutting using our Baker or Wood-Mizer mills to achieve exact dimensions." },
                  { step: "3", title: "Kiln Drying", desc: "Advanced DH or HF kiln systems ensure consistent moisture content and stability." },
                  { step: "4", title: "Quality Inspection", desc: "Final inspection ensures every board meets our high standards for quality and grade." },
                ].map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="bg-[#217938] text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-[#1b1612] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#6d5d50]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: WHY CHOOSE TXUS - CREAM */}
        <section className="bg-[#f0f0f0] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <h3 className="text-3xl font-bold mb-12 text-center text-[#1b1612]">
                Why Choose Texas Urban Sawmill
              </h3>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                {[
                  { title: "Advanced Technology", desc: "480V electric industrial sawmills deliver high-efficiency, zero-emission processing at scale." },
                  { title: "Precision & Consistency", desc: "State-of-the-art equipment and experienced operators ensure every board meets exacting standards." },
                  { title: "Sustainable Practices", desc: "We rescue trees, minimize waste, and support climate-smart construction and urban wood utilization." },
                ].map((item) => (
                  <div key={item.title} className="bg-white p-8 rounded-lg border-l-4 border-[#217938]">
                    <h4 className="font-bold text-[#1b1612] mb-3">{item.title}</h4>
                    <p className="text-[#6d5d50]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: CALL TO ACTION - GREEN */}
        <section className="bg-[#404040] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className="text-center"
            >
              <h3 className="text-3xl font-bold mb-4 text-[#d7a469]">Ready to Learn More?</h3>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-white">
                Explore our sawmilling and kiln drying services, and discover how we can transform your logs into premium lumber.
              </p>
              <Button asChild className="bg-[#d7a469] text-[#2a2a2a] hover:bg-[#e8b87a] px-8 py-3 font-bold">
                <a href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
}
