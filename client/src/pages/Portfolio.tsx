/**
 * Portfolio Page - Refined Elements
 * 
 * Main portfolio page showcasing custom furniture projects with links to individual gallery pages.
 * Uses existing TXUS Navigation and Footer components.
 * 
 * Featured Projects:
 * - Stinson "S-Base" Walnut Table
 * - Stainless Omega Walnut
 * - Modern I-Beam Conference Table
 * - 24ft Pecan Bunker Conference Table
 * - Family Legacy: Pecan Kitchen Island & Bar Back
 * - 1-Ton Gold Walnut Table
 * - Hillco Quad Matched Pecan Table
 * - Pecan Trestle Table
 */

import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";

export default function Portfolio() {
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  const hero = {
    title: "Rooted in Heritage. Crafted for Legacy.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/portfolio-hero-cropped_a8f3310a.webp",
    description:
      "We turn rescued Texas trees into statement tables and heirloom pieces—each one shaped by time, nature, family, and skilled hands. No two are alike. They're made to be lived with, enjoyed daily, and passed down to live for generations.",
  };

  const featuredProjects = [
    {
      name: 'Stinson "S-Base" Walnut Table',
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/stinson-s-base-walnut-table-clean_48bfa6d4.png",
      clickImage: "/stinson-gallery?from=portfolio",
    },
    {
      name: "Stainless Omega Walnut",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/stainless-omega-walnut-clean_37eab0f9.png",
      clickImage: "/omega-gallery?from=portfolio",
    },
    {
      name: "Modern I-Beam Conference Table",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/modern-i-beam-conference-table-clean_57d6a49e.png",
      clickImage: "/ibeam-gallery?from=portfolio",
    },
    {
      name: "24ft Pecan Bunker Conference Table",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/pecan-bunker-conference-table-clean_e24a8899.png",
      clickImage: "/pecan-bunker-gallery?from=portfolio",
    },
    {
      name: "Family Legacy: Pecan Kitchen Island & Bar Back",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/womack-pecan-ranch-island-bar-back-clean_5b997e1c.png",
      clickImage: "/family-legacy-gallery?from=portfolio",
    },
    {
      name: "1-Ton Gold Walnut Table",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/one-ton-gold-walnut-table-clean_63acf842.png",
      clickImage: "/gold-walnut-gallery?from=portfolio",
    },
    {
      name: "Hillco Quad Matched Pecan Table",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/HillcoPartners-17FootPecanQuadMatch,16to9Ratio_4b880936.jpg",
      clickImage: "/hillco-gallery?from=portfolio",
    },
    {
      name: "Pecan Trestle Table",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/Brad&KerryPecanTrestleTable45_17014b2e.jpg",
      clickImage: "/pecan-trestle-gallery?from=portfolio",
    },
  ];

  return (
    <>
      <SEOHead
        title="Custom Heirloom Furniture Portfolio - Texas Urban Sawmill"
        description="Explore our collection of custom dining tables, conference tables, and heirloom furniture crafted from rescued Texas trees. Each piece is unique and built to last generations."
        url="https://txsawmill-hnwf9q8m.manus.space/portfolio"
      />
      <Navigation />

      <div className="min-h-screen bg-background text-foreground">
        {/* CUSTOM HERO BANNER */}
        <section className="relative isolate overflow-hidden bg-[#1a1714] text-white min-h-[54vh] pt-20">
          <img
            src={hero.image}
            alt="Custom Heirloom Furniture Portfolio"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,0.82)_0%,rgba(13,10,8,0.54)_42%,rgba(13,10,8,0.3)_72%,rgba(13,10,8,0.56)_100%)]" />

          <div className="relative mx-auto flex min-h-[54vh] max-w-7xl items-center px-6 py-8 lg:px-8 lg:py-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-[64rem]"
            >
              <h1 className="mt-0 max-w-none font-serif text-2xl font-semibold leading-[1.02] text-white sm:text-4xl lg:text-[3.35rem] lg:whitespace-nowrap">
                {hero.title}
              </h1>
              <p className="mt-5 max-w-[56rem] text-base font-semibold leading-7 text-white sm:text-lg sm:leading-8">
                {hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 max-w-xs">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612] transition-colors duration-300 hover:bg-[#efe5d8]"
                >
                  Request a Quotation
                  <ArrowRight className="ml-auto h-4 w-4" />
                </a>
                <a
                  href="https://www.txurbansawmill.com/portfolio/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612] transition-colors duration-300 hover:bg-[#efe5d8]"
                >
                  See More - Texas Urban Sawmill Portfolio Page
                  <ArrowRight className="ml-auto h-6 w-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section className="bg-[#fbf8f3] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 border-b border-[#e8ddd1] pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
              <div className="max-w-5xl">
                <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#8d755f]">
                  Custom Dining Tables
                </p>
                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#1b1612] sm:text-4xl lg:text-[3rem]">
                  Solid Wood Dining Tables, Conference Tables, Custom Furniture
                </h2>
              </div>
            </div>

            <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <article key={project.name} className="group">
                  <a
                    href={project.clickImage || project.image}
                    target="_blank"
                    rel="noreferrer"
                    className="block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d755f] focus-visible:ring-offset-4"
                    aria-label={`Open ${project.name} gallery page in a new tab`}
                  >
                    <div className="border border-[#eadfce] bg-white p-4 shadow-[0_28px_70px_-52px_rgba(44,27,14,0.34)] transition-transform duration-500 group-hover:-translate-y-1">
                      <div className="overflow-hidden bg-[#f4eee7]">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </a>
                  <div className="border-b border-[#e8ddd1] pb-4 pt-5 text-center">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a38b75]">
                      0{index + 1}
                    </p>
                    <p className="mt-3 font-serif text-xl leading-snug text-[#1c1714] sm:text-2xl">
                      {project.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOM FURNITURE SECTION */}
        <section className="bg-[#faf6f0] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#8d755f]">
                Custom Furniture
              </p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#1b1612] sm:text-4xl lg:text-[3rem]">
                Custom-made tables shaped around the room, the wood, and the way you live.
              </h2>
              <div className="mt-8 mb-12">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/TXUS-Devin&SarahASHDelivery_24b29f79.webp"
                    alt="Owners, Devin and Sarah Ginther standing next to kilned dried pecan boules"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-sm text-[#8d755f] italic">
                  Owners, Devin and Sarah Ginther standing next to kilned dried pecan boules.
                </p>
              </div>
            </div>
            <div>
              <p className="text-base leading-8 text-[#574b41] sm:text-lg">
                At Refined Elements, a{" "}
                <a
                  href="https://www.txurbansawmill.com/portfolio"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[#8d755f] transition-colors"
                >
                  Texas Urban Sawmill
                </a>{" "}
                company, we take a more intentional approach to how furniture is made—rooted in respect for the material, the process, and the generations each tree has already served, and those it's meant to serve next. As a family business, our work is grounded in a commitment to the people and communities we're part of, and to doing things the right way. Every piece begins with the character of the slab and the intent of the space it will anchor. Using rescued and sustainably sourced Texas trees, we design and build beautifully handcrafted pieces that become part of your family's story.
              </p>
            </div>
          </div>
        </section>

        {/* FULLY CUSTOM-MADE SECTION */}
        <section className="bg-[#f8f8f8] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#8d755f]">
                  Fully Custom-Made
                </p>
                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#1b1612] sm:text-4xl lg:text-[3rem]">
                  Furniture conceived as a one-of-one response to material, architecture, and use.
                </h2>
                <p className="mt-8 text-base leading-8 text-[#574b41] sm:text-lg">
                  Whether it's a statement dining table, a boardroom centerpiece, or a custom architectural piece, we begin with the wood and let it guide what it becomes. The result is furniture that carries the character of the material, the precision of hand-finished craftsmanship, and a grounded presence meant to be lived with every day.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663535745618/V2neQFy7ZU5AwL5qB2Dckt/20190523_150303_c7919b73.webp"
                  alt="Custom furniture craftsmanship detail"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TREE-TO-HOME PROCESS SECTION */}
        <section className="bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 border-b border-[#e8ddd1] pb-10">
              <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#8d755f]">
                Our Process
              </p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#1b1612] sm:text-4xl lg:text-[3rem]">
                Tree-to-Home Process
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#574b41] sm:text-lg">
                From Rescued Tree to Final Inspection
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Process Step 1 */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-white">
                  <span className="font-serif text-2xl font-semibold">1</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1b1612] mb-3">
                  Tree Rescue & Assessment
                </h3>
                <p className="text-base leading-7 text-[#574b41]">
                  We identify and rescue trees destined for removal, assessing their quality and potential for transformation into premium lumber and furniture.
                </p>
              </div>

              {/* Process Step 2 */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-white">
                  <span className="font-serif text-2xl font-semibold">2</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1b1612] mb-3">
                  Milling & Preparation
                </h3>
                <p className="text-base leading-7 text-[#574b41]">
                  Our expert sawyers mill the logs into lumber, carefully planning each cut to maximize yield and showcase the wood's natural character.
                </p>
              </div>

              {/* Process Step 3 */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-white">
                  <span className="font-serif text-2xl font-semibold">3</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1b1612] mb-3">
                  Kiln Drying
                </h3>
                <p className="text-base leading-7 text-[#574b41]">
                  Using state-of-the-art VHF and dehumidification kilns, we carefully dry the wood to optimal moisture levels for stability and longevity.
                </p>
              </div>

              {/* Process Step 4 */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-white">
                  <span className="font-serif text-2xl font-semibold">4</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1b1612] mb-3">
                  Design & Fabrication
                </h3>
                <p className="text-base leading-7 text-[#574b41]">
                  Our craftspeople design and fabricate each piece with precision, using CNC routing, hand finishing, and traditional joinery techniques.
                </p>
              </div>

              {/* Process Step 5 */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-white">
                  <span className="font-serif text-2xl font-semibold">5</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1b1612] mb-3">
                  Hand Finishing
                </h3>
                <p className="text-base leading-7 text-[#574b41]">
                  Each piece receives meticulous hand finishing—sanding, staining, and sealing—to bring out the wood's natural beauty and ensure durability.
                </p>
              </div>

              {/* Process Step 6 */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-white">
                  <span className="font-serif text-2xl font-semibold">6</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1b1612] mb-3">
                  Final Inspection & Delivery
                </h3>
                <p className="text-base leading-7 text-[#574b41]">
                  Every piece undergoes rigorous quality inspection before delivery, ensuring it meets our exacting standards for craftsmanship and durability.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
