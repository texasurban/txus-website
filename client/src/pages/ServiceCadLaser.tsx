import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const heroImage = "/manus-storage/20260507_121057_bd6dc2e7.jpg";

const capabilities = [
  {
    image: "/manus-storage/20260423_150042_29fd5f52.jpg",
    alt: "CO2 laser engraving on a personalized product - Texas Urban Sawmill",
    title: "Custom Laser Engraving",
    description:
      "Our dual-headed CO2 laser system creates personalized products ranging from custom signage and engraved gifts to decorative architectural elements. We operate 70W and 180W power configurations for detailed engraving and precision cutting.",
  },
  {
    image: "/manus-storage/TXUSDripNaturalSigns_4ce82498.jpg",
    alt: "CO2 laser-cut custom signage - Texas Urban Sawmill",
    title: "Laser Cutting & Signage",
    description:
      "Precision laser cutting and engraving for signage, custom components, branding, and decorative applications across a wide range of project types.",
  },
  {
    image: "/manus-storage/20260508_105250_676b21d1.jpg",
    alt: "Architectural millwork produced with CAD and CNC fabrication - Texas Urban Sawmill",
    title: "CAD/CAM & Precision CNC",
    description:
      "We also offer CAD/CAM services and precision CNC support for architectural elements, custom parts, prototypes, and specialty fabrication projects.",
  },
  {
    image: "/manus-storage/20260406_110142_2461b5a9.jpg",
    alt: "Laser engraved custom water bottles - Texas Urban Sawmill",
    title: "Personalized Products",
    description:
      "From custom gifts and promotional items to detailed graphics and text, our team helps bring personalized product ideas to life with accurate, repeatable results.",
  },
];

const projectCards = [
  {
    title: "For Individuals",
    body: "Personalized gifts, custom engraving, signage, art, and decor for projects that deserve a distinctive finish.",
    cta: "REQUEST A PROJECT ESTIMATE",
  },
  {
    title: "For Businesses & Trade Partners",
    body: "CAD/CAM support, prototypes, architectural models, signage, and precision CNC services for designers, builders, makers, and commercial project teams.",
    cta: "DISCUSS YOUR PROJECT",
  },
];

export default function ServiceCadLaser() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "CAD & Laser Services",
    provider: {
      "@type": "Organization",
      name: "Texas Urban Sawmill",
      url: "https://txurbansawmill.com",
    },
    description:
      "CAD/CAM, CO2 laser engraving and cutting, signage, prototyping, architectural models, art and decor, and precision CNC services.",
    areaServed: ["Central Texas", "Texas"],
  };

  return (
    <>
      <SEOHead
        title="CAD & Laser Services | Texas Urban Sawmill"
        description="CO2 laser engraving and cutting, custom signage, CAD/CAM, prototyping, architectural models, art and decor, and precision CNC services for Central Texas and Texas."
        url="https://txurbansawmill.com/services/cad-laser-services"
        image={heroImage}
        schema={serviceSchema}
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh] border-t-2 border-b-2 border-stone-400">
            <img
              src={heroImage}
              alt="CAD and CO2 laser services at Texas Urban Sawmill"
              className="absolute inset-0 h-full w-full object-cover object-center"
              decoding="async"
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
                  CAD &amp; Laser Services
                </h1>
              </motion.div>
            </div>
          </section>

          <section className="bg-[#f0f0f0] px-6 py-12 lg:px-8 lg:py-16 border-t-2 border-stone-400 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                <div className="w-full">
                  <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-2 border-black">
                    <img
                      src="/manus-storage/TXUSDripNaturalSigns_4ce82498.jpg"
                      alt="Large-format CO2 laser cutting and engraving example - Texas Urban Sawmill"
                      className="w-full h-auto object-cover"
                      decoding="async"
                    />
                  </div>
                  <div className="bg-black p-3 -mt-1">
                    <p className="text-center text-white text-xs italic leading-relaxed">
                      Precision technology for custom engraving, laser cutting, signage, prototyping, architectural models, art, and decor.
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white p-8 rounded-lg shadow-md border-2 border-black">
                  <h2 className="text-2xl font-bold text-[#1b1612] mb-4">CNC Laser Cutting &amp; Gifts</h2>
                  <div className="text-[#6d5d50] text-lg space-y-4">
                    <p>
                      Our precision technology services are available for individuals and businesses seeking unique and personalized items. We use a large-format CO2 dual-headed laser with both 70W and 180W power configurations to provide custom engraving, laser cutting, signage, prototyping, architectural models, and art and decor.
                    </p>
                    <p>
                      Our team of designers will help bring your vision to life with high-quality and accurate results. We also offer CAD/CAM services and precision CNC.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#217938] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1a5a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217938] focus-visible:ring-offset-2">
                      Contact Us for a Project Estimate
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="bg-[#f5f1e8] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
                {capabilities.map((capability) => (
                  <motion.div key={capability.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="flex flex-col h-full">
                    <div className="overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-black">
                      <img src={capability.image} alt={capability.alt} className="w-full h-80 object-cover" decoding="async" loading="lazy" />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black flex flex-col flex-1">
                      <h2 className="text-xl font-bold mb-3 text-[#1b1612]">{capability.title}</h2>
                      <p className="text-[#6d5d50] flex-grow">{capability.description}</p>
                      <a href="/contact" className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1a5a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217938] focus-visible:ring-offset-2">
                        PROJECT ESTIMATE
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#f0f0f0] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
                {projectCards.map((card) => (
                  <div key={card.title} className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full border-2 border-black">
                    <h2 className="text-2xl font-bold mb-4 text-[#1b1612]">{card.title}</h2>
                    <p className="text-[#6d5d50] mb-6 flex-grow">{card.body}</p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217938] focus-visible:ring-offset-2">
                      {card.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#f5f1e8] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-b-2 border-stone-400">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1b1612] mb-6">Precision Technology, Practical Craftsmanship</h2>
              <p className="text-lg text-[#6d5d50] mb-8">From a detailed engraving to a complex fabricated component, our team combines digital tools with hands-on craftsmanship to help turn a clear idea into a finished result.</p>
              <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#217938] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a5a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217938] focus-visible:ring-offset-2">
                CONTACT US FOR A PROJECT ESTIMATE
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
