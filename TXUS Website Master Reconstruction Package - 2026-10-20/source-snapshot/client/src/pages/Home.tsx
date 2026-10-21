/**
 * Design Philosophy: Civic Industrial Stewardship.
 * This page should preserve the recognizable Texas Urban Sawmill structure and tone:
 * landscape-led, service-forward, industrially credible, and sustainability-centered.
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Trees,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const logoUrl =
  "/manus-storage/TXUSBlack4.5inx3in72DPI_fe5f0d81_0f47ce66.png";
const heroImage =
  "/manus-storage/city-of-austin-skyline_aa4fd65d.jpg";
const serviceImage =
  "/manus-storage/Stinsonwalnuttable(1)_b16011bc_d23806d2.jpg";
const furnitureImage =
  "/manus-storage/walnut-hybrid-v-table_7d305618.jpg";
const aboutImage =
  "/manus-storage/devin-and-article_4238cb04.jpg";

const serviceImages = [
  "/manus-storage/TXUS-Devin&SarahASHDelivery_2b8a6df7_b6b1a081.webp",
  "/manus-storage/SarahonWM1000_103d95c2_848f1059.webp",
  "/manus-storage/pasted_file_ogWYNU_AustinStateHospitalPecanTreeReuse20240412_103852_5080ed3e_eb310c7f.jpg",
  "/manus-storage/pasted_file_OSocQQ_TXUS20-tonCraneTruck2_94741e2a_1acb277e.jpg",
  "/manus-storage/pasted_file_H5OWzx_TXUSTreeService3_10ffb62e_5cebc799.jpg",
  "/manus-storage/pasted_file_dFyV0K_TXUSCobraCNC6ftx16ftv2_1ffe0863_b814c172.jpg",
];

const furnitureImages = [
  "/manus-storage/pasted_file_lClGnM_HillcoPartners-17FootPecanQuadMatch,16to9Ratio_8f1e82c8_61a620aa.jpg",
  "/manus-storage/pasted_file_gYqAxa_image_e82365df_9673f804.png",
  "/manus-storage/WomackIsland&BarBack_bbc26660_fc14df84.webp",
  "/manus-storage/Stinsonwalnuttable(1)_a5cacfd6.jpg",
];

const inksLakeImage = "/manus-storage/pasted_file_gFjMIt_TXUSInksLakeSP6_e96af79f_93801767.jpg";

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
      { label: "Custom Heirloom Furniture", href: "/portfolio" },
      { label: "Tree Re-Use Construction", href: "/services/tree-reuse" },
      { label: "Log Transport & Crane", href: "/services/log-transport" },
      { label: "Tree Care & Removals", href: "/services/tree-care" },
      { label: "Millworks, CNC, & Laser", href: "/services/millworks" },
    ],
  },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const achievementLinks = [
  { text: "Best practices in ", boldText: "sustainable construction projects to meet sustainability & ESG goals", textAfter: ".", href: "https://www.txurbansawmill.com/climatesmartproj" },
  { text: "", boldText: "Sawmilling and Tree Re-Use Services", textAfter: " available to the general public.", href: "https://www.txurbansawmill.com/services" },
  { text: "", boldText: "Heirloom custom furniture", textAfter: " and one-of-a-kind architectural products from rescued trees.", href: "https://www.txurbansawmill.com/portfolio" },
  { text: "Largest ", boldText: "Adaptive Tree Re-Use Project in the State of Texas", textAfter: " - Austin State Hospital", href: "https://www.txurbansawmill.com/climatesmartprojects/ash" },
  { text: "", boldText: "USDA Forest Service Wood Innovations Grant Award", textAfter: " Recipients - 2022 and 2024.", href: "https://www.txurbansawmill.com/articles/woodinnovationsgrant" },
  { text: "", boldText: "Net Carbon Negative Products", textAfter: " sourced, produced, & delivered within 50 miles.", href: "https://www.txurbansawmill.com/hillco" },
  { text: "", boldText: "Inks Lake State Park", textAfter: " - New Park Headquarters Adaptive Tree Re-Use", href: "https://www.txurbansawmill.com/climatesmartprojects/inklakesp" },
  { text: "Largest single donation to the ", boldText: "TAMFS TreeCovery Fund", textAfter: " of $19,122 in FY26.", href: "http://treecovery.tamu.edu/" },
  { text: "", boldText: "Texas Parks & Wildlife - Texas Trailblazer Award - December 2023", textAfter: "", href: "https://www.txurbansawmill.com/articles/texas-parks-wildlife-new-life-for-fallen-trees" },
  { text: "", boldText: "Waco International Society of Arborist Tree Conf", textAfter: " - Keynote Speaker in 2021 & 2022.", href: "https://isatexas.com/" },
  { text: "", boldText: "Texas A&M Forest Service Leadership Institute", textAfter: " - Graduating Class of 2022", href: "https://tfsweb.tamu.edu/about/leadership-institute/" },
  { text: "", boldText: "Urban Wood Network", textAfter: ", Steering Committee Member & TX Chapter Lead in FY22 & FY23", href: "https://urbanwoodnetwork.org/" },
  { text: "", boldText: "Sustainable Furnishing Council", textAfter: ", National Urban Wood Academy - Speaker 2020", href: "https://sustainablefurnishings.org/educate-the-industry" },
];

const services = [
  {
    title: "Lumber, Beams, Mantels & Slabs",
    body: "Locally rescued wood, milled, kiln-dried, and prepared for long-term use—from complex architectural millwork projects to fine furniture.",
    cta: { label: "Learn More", href: "/services/lumber" },
  },
  {
    title: "Sawmilling & Custom Lumber Production",
    body: "Custom milling for homeowners, builders, and makers—turning salvaged logs into usable lumber with the capability to handle projects others can't.",
    cta: { label: "Learn More", href: "/services/sawmilling" },
  },
  {
    title: "Climate-Smart Construction Projects",
    body: "Material-driven solutions that integrate adaptive tree re-use practices into building projects—reducing waste while meeting real-world construction demands.",
    cta: { label: "Learn More", href: "/services/tree-reuse" },
  },
  {
    title: "Log Transport & Crane Services",
    body: "Heavy-lift and transport services that make recovery possible—moving logs safely and efficiently from site to sawmill.",
    cta: { label: "Learn More", href: "/services/log-transport" },
  },
  {
    title: "Tree Care, Removals & Consulting",
    body: "Experienced tree care that looks beyond removal—prioritizing reuse, stewardship, and lasting value.",
    cta: { label: "Learn More", href: "/services/tree-care" },
  },
  {
    title: "Lumber Surfacing, CNC & Fabrication",
    body: "Precision surfacing, CNC routing, laser etching & fabrication for custom architectural elements & engineered components.",
    cta: { label: "Learn More", href: "/services/millworks" },
  },
];

const featuredFurniture = [
  {
    title: 'Hybrid "V" Natural Edge Walnut Table',
    body: "A one-of-a-kind design built in Dripping Springs with a salvaged walnut bookmatch top and a sculptural stainless core.",
  },
  {
    title: "Mesquite 2-piece Eye-Lid Dining Table",
    body: "A rare wide mesquite bookmatch made from one of the largest rescued mesquite trees documented in Texas.",
  },
  {
    title: "I-beam Walnut Conference Table",
    body: "Industrial steel structure and highly figured walnut come together in a statement piece for a commercial interior.",
  },
];

const partnerLogos = [
  {
    name: "Austin Habitat for Humanity",
    url: "https://www.austinhabitat.org",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/a751d1b0-652b-4456-b66b-a532b3d9876a/Austin+HFH.png",
  },
  {
    name: "Texas A&M Forest Service",
    url: "https://tfsweb.tamu.edu",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/13f078cc-8e63-401b-86b3-6aab0decf856/texas_A%26M_forest_service_mid.png",
  },
  {
    name: "Turner Construction",
    url: "https://www.turnerconstruction.com",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/70c1feee-a766-4007-9275-0d49a91b9273/logo-turner-construction-300x165.jpg",
  },
  {
    name: "USDA Forest Service",
    url: "https://www.fs.usda.gov",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/a76f7d38-5812-41c4-9c67-e1169ef137e1/USDA+FS+PNG+Logo+1200x600.png",
    scale: 1.75,
  },
  {
    name: "Texas Parks & Wildlife",
    url: "https://tpwd.texas.gov",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/e14ae699-cb0b-4b0e-b660-557737111ab1/tpwd-logo-large.gif",
    scale: 1.75,
  },
  {
    name: "Austin Capital Partners",
    url: "https://www.austincapitalpartners.com",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/8f1c186a-2455-4f4f-b4f0-3fe1879f46fc/Austin+Capital+Partners+Logo+500x500.png",
  },
  {
    name: "Hines",
    url: "https://www.hines.com",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/154091dd-ff76-47fb-bca0-0591dfa350a5/Hines+Logo+600x600.png",
  },
  {
    name: "Davey Tree",
    url: "https://www.davey.com",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/34af599c-453a-46c6-9ac9-e48b90269c9b/Logo-davey-tree-color.png",
  },
  {
    name: "Urban Wood Network",
    url: "https://urbanwoodnetwork.org",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/cfce633e-f042-49d7-ab78-3a731e48c2c0/UWN+Logo.png",
  },
  {
    name: "Concordia University Texas",
    url: "https://www.concordia.edu",
    logo: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/2517234b-f3cc-4c8f-8fb4-f20b82cc42d3/Concordia_University_Texas_logo.jpg",
  },
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

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const partnerCarouselRef = useRef<HTMLDivElement>(null);
  
  // Auto-carousel effect for partner logos
  useEffect(() => {
    const carousel = partnerCarouselRef.current;
    if (!carousel) return;
    
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    let currentScroll = 0;
    
    const autoScroll = setInterval(() => {
      currentScroll += 2; // Scroll 2px per interval
      
      // Reset to beginning when reaching the end
      if (currentScroll >= scrollWidth - clientWidth) {
        currentScroll = 0;
      }
      
      carousel.scrollLeft = currentScroll;
    }, 50); // Update every 50ms for smooth scrolling
    
    return () => clearInterval(autoScroll);
  }, []);
  
  const contactMailto = useMemo(
    () =>
      "mailto:info@txurbansawmill.com?subject=Texas%20Urban%20Sawmill%20Inquiry",
    [],
  );

  return (
    <>
      <SEOHead
        title="Texas Urban Sawmill - Full Circle Urban Sawmill & Sustainable Forestry"
        description="Full-circle urban sawmill offering custom lumber, heirloom furniture, tree reuse construction, and sustainable services. Central Texas's community sawmill. Learn more."
        url="https://txurbansawmill.com"
        image="/manus-storage/city-of-austin-skyline_aa4fd65d.jpg"
      />
      <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <section
          id="home"
          className="relative isolate overflow-hidden bg-neutral-900 text-white border-b-2 border-stone-400"
        >
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `linear-gradient(90deg, rgba(9,20,12,0.34) 0%, rgba(9,20,12,0.18) 35%, rgba(9,20,12,0.18) 100%), url(${heroImage})`, backgroundPosition: '50% 20%' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(154,255,96,0.18),transparent_35%)]" />

          <div className="container relative z-10 flex min-h-[65vh] items-center py-16 sm:py-20 lg:py-28">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="hero-panel max-w-2xl"
            >
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.34em] text-white/80">
                Central Texas’s Community Sawmill
              </p>
              <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
                Full Circle Urban Sawmill
              </h1>
              <p className="mt-5 max-w-xl font-sans leading-[1.9] text-white/92" style={{fontSize: '1.03rem'}}>
                We offer custom sawmilling, native Texas lumber, specialty millwork, and heirloom-quality furniture for homes and businesses. As a Texas Benefit Company, we rescue trees, support community education, and give back through charitable donations.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="outline" className="hero-button-outline">
                  <a href="/services">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="hero-button-outline">
                  <a href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="hero-curve" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full">
              <path
                d="M0,68 C220,112 360,118 540,96 C720,74 900,28 1120,40 C1260,48 1368,76 1440,88 L1440,120 L0,120 Z"
                fill="var(--background)"
              />
            </svg>
          </div>
        </section>

        <section className="section-shell -mt-10 pt-12 sm:pt-20 bg-[#f5f1e8] border-t-2 border-stone-400 border-b-2 border-stone-400">
          <div className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow">Welcome to Texas Urban Sawmill</p>
              <h2 className="section-title max-w-2xl text-2xl sm:text-3xl">
                A community sawmill built around family, stewardship, reuse, and traditional craftsmanship.
              </h2>
              <p className="section-copy mt-6">
                We provide full-service urban wood utilization for Central Texas, converting salvaged trees into usable lumber, custom millwork, and one-of-a-kind finished products. Our capabilities bridge sustainable material recovery with precision manufacturing and traditional craftsmanship.
              </p>
              <img
                src="/manus-storage/team_photo_web_5972aded_dbac91fb.webp"
                alt="Texas Urban Sawmill Team"
                className="mt-8 w-full rounded-lg shadow-lg object-cover"
               decoding="async"/>
              <p className="mt-4 text-center text-sm sm:text-base text-[color:var(--ink-soft)] italic">
                The soul of Texas Urban Sawmill is built on the calloused hands and relentless hard work of Devin Ginther, Sarah Ginther, and Jesse Mahoney. Through long days, skilled craftsmanship, and an unwavering commitment to quality and stewardship, they have transformed overlooked timber into enduring products that reflect both hard-earned labor and lasting value for their community.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="impact-card"
            >
              <div className="mb-5 flex items-center gap-3 text-primary">
                <Leaf className="h-5 w-5" />
                <p className="eyebrow">
                  Impact initiatives
                </p>
              </div>
              <div className="space-y-4">
                {achievementLinks.map((item, index) => (
                  <div key={index} className="impact-row">
                    <div className="impact-dot" />
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm leading-6 text-[color:var(--ink-soft)] sm:text-[15px] hover:text-primary transition-colors"
                    >
                      {item.text}
                      <span className="font-bold text-primary underline">{item.boldText}</span>
                      {item.textAfter}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell pt-12 sm:pt-16 lg:pt-20 bg-[#f0f0f0] border-t-2 border-stone-400 border-b-2 border-stone-400">
          <div className="container">
            <div className="flex flex-col gap-8 border-y border-[color:var(--line-strong)] py-12 sm:py-16">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <p className="eyebrow text-base sm:text-lg">Our Partners, Sponsors & Customers</p>
                <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl">
                  Institutions, builders, agencies, and organizations we are proud to support and partner with.
                </p>
              </div>
              <div className="overflow-x-auto scrollbar-hide" ref={partnerCarouselRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex gap-6 min-w-max px-4 py-2">
                  {partnerLogos.map((partner) => (
                    <a
                      key={partner.name}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partner-card hover:opacity-80 transition-opacity flex-shrink-0"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-28 w-28 object-contain mix-blend-multiply sm:h-36 sm:w-36"
                        style={{ transform: partner.scale ? `scale(${partner.scale})` : 'scale(1)' }}
                       decoding="async" loading="lazy"/>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section-shell bg-[#f5f1e8] border-t-2 border-stone-400 border-b-2 border-stone-400">
          <div className="container">
            <div className="mx-auto text-center">
              <p className="eyebrow">Our Services</p>
              <h2 className="section-title max-w-xl text-2xl sm:text-3xl mx-auto">
                Practical reuse, industrial capability, and custom wood solutions.
              </h2>
              <p className="section-copy mt-6 max-w-lg mx-auto">
                We turn reclaimed wood into custom solutions—with the engineering to do it right, the care of a family-owned business, and a commitment to preserving hardwood craftsmanship as a lost art.
              </p>
            </div>

            <div className="mt-10 grid gap-0 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={fadeUp}
                  transition={{ duration: 0.55, delay: index * 0.04 }}
                  className="service-card"
                >
                  <div className="mb-4 overflow-hidden border-2 border-[#8b7355] bg-neutral-100 h-48">
                    <img
                      src={serviceImages[index]}
                      alt={service.title}
                      className="h-48 w-full object-cover rounded-sm shadow-[0_25px_60px_rgba(11,18,9,0.25)]"
                     decoding="async" loading="lazy"/>
                  </div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="service-index">0{index + 1}</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl uppercase leading-tight tracking-[0.03em] text-[color:var(--ink-strong)]">
                    {service.title}
                  </h3>
                  <p className="mt-4 font-sans text-[15px] leading-7 text-[color:var(--ink-soft)]">
                    {service.body}
                  </p>
                  {service.cta && (
                    <Button asChild className="mt-6 w-full border-2 border-[#8b7355] text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]" style={{ background: 'linear-gradient(180deg, rgba(33, 121, 56, 0.9) 0%, rgba(24, 102, 47, 0.9) 100%)' }}>
                      <a href={service.cta.href}>
                        {service.cta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="furniture" className="section-shell bg-[#f0f0f0] border-t-2 border-stone-400 border-b-2 border-stone-400">
          <div className="container">
            <div className="mx-auto text-center mb-12 max-w-3xl">
              <p className="eyebrow">Our Fallen and Forgotten Trees Reimagined</p>
              <h2 className="section-title max-w-xl text-2xl sm:text-3xl mx-auto">
                Heirloom furniture that retains the story of the rescued tree.
              </h2>
              <div className="mt-8 text-center">
                <Button asChild className="hero-button border-2 border-[#8b7355] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                  <a href="/portfolio">See Our Portfolio</a>
                </Button>
              </div>
              <p className="section-copy mt-6 mx-auto">
                Every piece starts with a tree that still has a story to carry forward, and a commitment to do right by the land it came from. Through persistence, hard work and an undying commitment to our mission, we carry that story forward and maintain the legacy of our fallen trees as transformational, highly sustainable wood products.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden border-2 border-[#8b7355] shadow-[0_40px_80px_rgba(11,18,9,0.35)]">
                <img
                  src={furnitureImages[0]}
                  alt="Hillco Partners 17-foot Pecan Quad Match table"
                  className="h-full min-h-[280px] w-full object-cover"
                 decoding="async" loading="lazy"/>
              </div>
              <div className="overflow-hidden border-2 border-[#8b7355] shadow-[0_40px_80px_rgba(11,18,9,0.35)]">
                <img
                  src={furnitureImages[1]}
                  alt="SEI bookmatched walnut conference table"
                  className="h-full min-h-[280px] w-full object-cover"
                 decoding="async" loading="lazy"/>
              </div>
              <div className="overflow-hidden border-2 border-[#8b7355] shadow-[0_40px_80px_rgba(11,18,9,0.35)]">
                <img
                  src={furnitureImages[2]}
                  alt="Womack Island & Bar Back"
                  className="h-full min-h-[280px] w-full object-cover"
                 decoding="async" loading="lazy"/>
              </div>
              <div className="overflow-hidden border-2 border-[#8b7355] shadow-[0_40px_80px_rgba(11,18,9,0.35)]">
                <img
                  src={furnitureImages[3]}
                  alt="Stinson Walnut Table"
                  className="h-full min-h-[280px] w-full object-cover"
                 decoding="async" loading="lazy"/>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild className="hero-button border-2 border-[#8b7355] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                <a href="/portfolio">See More Furniture</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f5f1e8] px-0 py-20 lg:py-28 border-t-2 border-stone-400 border-b-2 border-stone-400">
          <div className="container">
            <div className="mx-auto text-center mb-12 max-w-3xl">
              <p className="eyebrow">Educational Series</p>
              <h2 className="section-title max-w-xl text-2xl sm:text-3xl mx-auto">
                USDA Forest Service Wood Innovations Grant Project
              </h2>
              <p className="section-copy mt-6 mx-auto">
                Together with the USDA Forest Service, Texas Urban Sawmill is turning wildfire mitigation into education, sustainable craftsmanship, and a full-circle, innovative approach to forestry across Texas.
              </p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <div className="w-full max-w-2xl">
                <div className="flex flex-col items-center">
                  <a aria-label="Watch Part 1: Doing the RIGHT THING on YouTube" className="group relative w-full overflow-hidden transition-all duration-300" href="https://youtu.be/bEc_CQ_hYW8?si=eXe6jSCyybxrpKZb" rel="noreferrer" target="_blank">
                    <div className="bg-stone-200 relative overflow-hidden border-2 border-black shadow-[0_30px_70px_rgba(0,0,0,0.35)]" style={{ aspectRatio: '1.5 / 1' }}>
                      <img alt="Part 1: Doing the RIGHT THING" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-[0_30px_70px_rgba(0,0,0,0.35)]" src="/manus-storage/TXUSUSDAWoodInnovationsVideo1_5055760d_eda7e1a6_d7e0f144.png"  decoding="async" loading="lazy"/>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#d7a469] to-[#22863a] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-md">
                          <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                  <p className="mt-4 text-center text-sm lg:text-base uppercase tracking-[0.16em] text-stone-700 group-hover:text-[#d7a469] transition-colors duration-300">Part 1: Doing the RIGHT THING</p>
                </div>
              </div>
              <div className="w-full grid gap-6 lg:grid-cols-4">
                <div className="flex flex-col items-center">
                  <a aria-label="Watch Part 2: Realities of DEVELOPMENT on YouTube" className="group relative w-full overflow-hidden transition-all duration-300" href="https://youtu.be/0gdHg3KUKrw?si=XYF-88by6uP8xbMo" rel="noreferrer" target="_blank">
                    <div className="bg-stone-200 relative overflow-hidden border-2 border-black shadow-[0_30px_70px_rgba(0,0,0,0.35)]" style={{ aspectRatio: '1.5 / 1' }}>
                      <img alt="Part 2: Realities of DEVELOPMENT" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-2xl" src="/manus-storage/TXUSUSDAWoodInnovationsVideo2_b14eb930_ae8b9e6e_c9af2b62.png"  decoding="async" loading="lazy"/>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#d7a469] to-[#22863a] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-md">
                          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                  <p className="mt-3 text-center text-xs lg:text-sm uppercase tracking-[0.16em] text-stone-700 group-hover:text-[#d7a469] transition-colors duration-300 line-clamp-2">Part 2: Realities of DEVELOPMENT</p>
                </div>
                <div className="flex flex-col items-center">
                  <a aria-label="Watch Part 3: Fire MITIGATION on YouTube" className="group relative w-full overflow-hidden transition-all duration-300" href="https://youtu.be/5bAgA9TorkQ?si=_xUvwTVy3P_1SnMa" rel="noreferrer" target="_blank">
                    <div className="bg-stone-200 relative overflow-hidden border-2 border-black shadow-[0_30px_70px_rgba(0,0,0,0.35)]" style={{ aspectRatio: '1.5 / 1' }}>
                      <img alt="Part 3: Fire MITIGATION" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-2xl" src="/manus-storage/TXUSUSDAWoodInnovationsVideo3_83a6a534_7e583308_0a7912a1.png"  decoding="async" loading="lazy"/>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#d7a469] to-[#22863a] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-md">
                          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                  <p className="mt-3 text-center text-xs lg:text-sm uppercase tracking-[0.16em] text-stone-700 group-hover:text-[#d7a469] transition-colors duration-300 line-clamp-2">Part 3: Fire MITIGATION</p>
                </div>
                <div className="flex flex-col items-center">
                  <a aria-label="Watch Part 4: Circular Economy on YouTube" className="group relative w-full overflow-hidden transition-all duration-300" href="https://youtu.be/aQEepiDk0og?si=kIQlteoV_TWLFtpu" rel="noreferrer" target="_blank">
                    <div className="bg-stone-200 relative overflow-hidden border-2 border-black shadow-[0_30px_70px_rgba(0,0,0,0.35)]" style={{ aspectRatio: '1.5 / 1' }}>
                      <img alt="Part 4: Circular Economy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-2xl" src="/manus-storage/TXUSUSDAWoodInnovationsVideo4_25518123_cdd95b23_57dd1ff8.png"  decoding="async" loading="lazy"/>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#d7a469] to-[#22863a] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-md">
                          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                  <p className="mt-3 text-center text-xs lg:text-sm uppercase tracking-[0.16em] text-stone-700 group-hover:text-[#d7a469] transition-colors duration-300 line-clamp-2">Part 4: Circular Economy</p>
                </div>
                <div className="flex flex-col items-center">
                  <a aria-label="Watch Part 5: Repurposed Beauty on YouTube" className="group relative w-full overflow-hidden transition-all duration-300" href="https://youtu.be/UiM2ojKEUdc?si=AGtJARIXkPJPDkBG" rel="noreferrer" target="_blank">
                    <div className="bg-stone-200 relative overflow-hidden border-2 border-black shadow-[0_30px_70px_rgba(0,0,0,0.35)]" style={{ aspectRatio: '1.5 / 1' }}>
                      <img alt="Part 5: Repurposed Beauty" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-2xl" src="/manus-storage/TXUSUSDAWoodInnovationsVideo5_fe058513_ed4f0fc1_caf11f14.png"  decoding="async" loading="lazy"/>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#d7a469] to-[#22863a] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-md">
                          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                  <p className="mt-3 text-center text-xs lg:text-sm uppercase tracking-[0.16em] text-stone-700 group-hover:text-[#d7a469] transition-colors duration-300 line-clamp-2">Part 5: Repurposed Beauty</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell border-t-2 border-stone-400 border-b-2 border-stone-400 pt-12 sm:pt-16 lg:pt-20 bg-[#f0f0f0]">
          <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="eyebrow">About Us</p>
              <h2 className="section-title max-w-xl text-2xl sm:text-3xl">
                A small family-owned business with a wide practical skill set.
              </h2>
              <p className="section-copy mt-6">
                Texas Urban Sawmill is a family-owned business built by engineers, educators, veterans, athletes, and makers—a mix that keeps us hands-on in the work and always looking for better ways to do it. We combine practical experience with the use of modern tools and technology, allowing us to approach each project with both precision and adaptability.
              </p>
              <p className="section-copy mt-4">
                We take on the challenges others avoid, working through difficult problems to find real solutions. From complex reuse scenarios to unconventional materials, we figure out what's possible—and then make it work. The result is practical, lasting solutions that carry value forward instead of letting it go to waste.
              </p>
              <p className="section-copy mt-4">
                Recognized as a Texas Parks & Wildlife Trailblazer, Texas Urban Sawmill is part of a small group leading new approaches to conservation and land stewardship in Texas. This recognition highlights a rare, full-circle model—giving new life to fallen trees while balancing environmental responsibility, community impact, and craftsmanship. By keeping valuable material in use and reconnecting people to the story of the land, this work represents a different path forward for how we value our natural resources. It's not common—and that's exactly the point.
              </p>
              <div className="mt-8">
                <img
                  src={inksLakeImage}
                  alt="Jesse admires the mesquite cabinetry at Inks Lake State Park"
                  className="w-full h-auto object-cover rounded-sm shadow-lg border-2 border-[#8b7355]"
                 decoding="async" loading="lazy"/>
                <p className="mt-3 text-sm text-stone-600 italic">
                  Jesse admires the mesquite cabinetry, once part of the landscape at Inks Lake State Park and now thoughtfully repurposed in the new headquarters.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="info-chip">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Dripping Springs, Texas</span>
                </div>
                <div className="info-chip">
                  <Trees className="h-4 w-4 text-primary" />
                  <span>Community sawmill open to the public</span>
                </div>
                <div className="info-chip">
                  <Trees className="h-4 w-4 text-primary" />
                  <span>ISA Certified Arborist</span>
                </div>
                <div className="info-chip">
                  <Trees className="h-4 w-4 text-primary" />
                  <span>Texas Benefit Company</span>
                </div>
                <div className="info-chip">
                  <Trees className="h-4 w-4 text-primary" />
                  <span>20+ Years Experience</span>
                </div>
                <div className="info-chip">
                  <Trees className="h-4 w-4 text-primary" />
                  <span>Architectural Millwork Services</span>
                </div>
                <div className="info-chip">
                  <Trees className="h-4 w-4 text-primary" />
                  <span>Sustainable Construction & Forestry Practices</span>
                </div>
                <div className="info-chip">
                  <Trees className="h-4 w-4 text-primary" />
                  <span>Tree Re-Use & Forestry Consultations</span>
                </div>
              </div>
            </div>
            <a href="https://tpwmagazine.com/archive/2023/dec/scout10_trailblazers/" target="_blank" rel="noreferrer" className="overflow-hidden border-2 border-[#8b7355] shadow-[0_18px_40px_rgba(11,18,9,0.08)] block hover:shadow-[0_24px_48px_rgba(11,18,9,0.15)] transition-shadow duration-300 cursor-pointer">
              <img
                src={aboutImage}
                alt="Texas Urban Sawmill team portrait in the workshop - Texas Parks & Wildlife Trailblazer"
                className="h-full min-h-[420px] w-full object-cover shadow-lg"
               decoding="async" loading="lazy"/>
            </a>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f5f1e8] px-0 py-20 lg:py-28 border-t-2 border-stone-400 border-b-2 border-stone-400">
          <div className="container">
            <div className="mb-16 lg:mb-20">
              <p className="eyebrow text-center">The Makers</p>
              <h2 className="section-title max-w-xl text-2xl sm:text-3xl mx-auto text-center">
                Meet the Craftsman
              </h2>
            </div>
            
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Team Member 1: Sarah Ginther */}
              <div>
                <div className="relative overflow-hidden bg-stone-100 mb-8 border-2 border-[#8b7355] shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                  <div className="aspect-square">
                    <img
                      src="/manus-storage/SarahHeadshot_07208f28_4b44cdce.jpg"
                      alt="Sarah Ginther, Co-Founder and Lead Sawyer"
                      className="h-full w-full object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                </div>
                <h3 className="font-display text-2xl text-stone-950">
                  Sarah Ginther
                </h3>
                <p className="mt-2 text-sm lg:text-base uppercase tracking-[0.24em] text-stone-600">
                  Co-Founder, Lead Sawyer & CFO
                </p>
                <p className="mt-4 text-base leading-8 text-stone-700 text-left lg:text-lg">
                  One of the few women sawyers in the country, Sarah brings a discerning eye to the mill that few can match. She hand-selects and mills every log, identifying the character and grain that define each piece. As CFO, she balances hands-on artistry with financial stewardship, ensuring our mission remains sustainable and our Tree-to-Table process remains the gold standard.
                </p>
              </div>
              
              {/* Team Member 2: Jesse Mahoney */}
              <div>
                <div className="relative overflow-hidden bg-stone-100 mb-8 border-2 border-[#8b7355] shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                  <div className="aspect-square">
                    <img
                      src="/manus-storage/JesseHeadshot_f5af6ed9_2121f513.jpg"                   alt="Jesse Mahoney, Lead Designer and Production Manager"
                      className="h-full w-full object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                </div>
                <h3 className="font-display text-2xl text-stone-950">
                  Jesse Mahoney
                </h3>
                <p className="mt-2 text-sm lg:text-base uppercase tracking-[0.24em] text-stone-600">
                  Lead Designer & Production Mgr
                </p>
                <p className="mt-4 text-base leading-8 text-stone-700 text-left lg:text-lg">
                  Jesse brings a background in computer science and hardware innovation from his tenure in the semiconductor industry, including time at Apple. He translates that technical discipline into his role as a master craftsman, conceiving and executing product designs with precision and structural integrity that defines our work.
                </p>
              </div>
              
              {/* Team Member 3: Devin Ginther */}
              <div>
                <div className="relative overflow-hidden bg-stone-100 mb-8 border-2 border-[#8b7355] shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                  <div className="aspect-square">
                    <img
                      src="/manus-storage/DevinHeadshot_aba8be4f_e3604300.jpg"
                      alt="Devin Ginther, Founder and CEO"
                      className="h-full w-full object-cover"
                     decoding="async" loading="lazy"/>
                  </div>
                </div>
                <h3 className="font-display text-2xl text-stone-950">
                  Devin Ginther
                </h3>
                <p className="mt-2 text-sm lg:text-base uppercase tracking-[0.24em] text-stone-600">
                  Co-Founder & CEO
                </p>
                <p className="mt-4 text-base leading-8 text-stone-700 text-left lg:text-lg">
                  Founder and visionary behind Texas Urban Sawmill, Devin brings technical rigor from his background as a certified Project Management Professional (PMP), R&D biomedical engineer, and holder of multiple patents. He applies this inventive precision to every phase of material selection, milling, and kiln stabilization, transforming each rescued tree into a structurally sound, legacy-grade masterpiece.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell bg-[color:var(--surface-tint)] border-t-2 border-stone-400 border-b-2 border-stone-400">
          <div className="container grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="eyebrow">Stay in Touch</p>
              <h2 className="section-title max-w-xl text-2xl sm:text-3xl">
                Join Our Monthly Newsletter
              </h2>
              <p className="section-copy mt-6 max-w-2xl">
                Subscribe to receive updates on our latest projects, sustainability initiatives, and stories from the sawmill. Our monthly newsletter features behind-the-scenes insights, industry news, and exclusive content delivered directly to your inbox.
              </p>
            </div>

            <div className="contact-panel">
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  window.location.href = contactMailto;
                }}
              >
                <label className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">
                  Email Address
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="mt-3 w-full border border-[color:var(--line-strong)] bg-white px-4 py-4 text-base text-[color:var(--ink-strong)] outline-none transition focus:border-primary"
                  />
                </label>
                <Button type="submit" className="hero-button w-full sm:w-auto border-2 border-[#8b7355] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                  Sign Up
                </Button>
              </form>

              <div className="mt-8 space-y-4 border-t border-[color:var(--line-strong)] pt-6">
                <a href="tel:+15127625898" className="contact-link">
                  <Phone className="h-4 w-4" />
                  <span>(512) 762-5898</span>
                </a>
                <a href="mailto:info@txurbansawmill.com" className="contact-link">
                  <Mail className="h-4 w-4" />
                  <span>info@txurbansawmill.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Master Footer - White with Black Text and Gold Accents */}
      <Footer />
    </div>
    </>
  );
}
