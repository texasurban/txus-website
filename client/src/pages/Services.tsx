import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Wrench,
  Trees,
  Truck,
  Leaf,
  Zap,
  Hammer,
} from "lucide-react";

const heroImage = "/manus-storage/services-hero-optimized_2ca3ad5d_670d8eb2.webp";

const services = [
  {
    id: "sawmilling",
    title: "Sawmilling & Kiln Drying",
    description:
      "Custom milling for homeowners, builders, and makers—turning salvaged logs into usable lumber with the capability to handle projects others can't.",
    icon: Wrench,
    href: "/services/sawmilling",
    image: "/manus-storage/service-card-sawmilling-kiln_ba915b03_9db25c4d.webp",
  },
  {
    id: "custom-furniture",
    title: "Custom Heirloom Furniture",
    description:
      "Heirloom-quality furniture and one-of-a-kind architectural products from rescued trees, designed and crafted to last generations.",
    icon: Hammer,
    href: "/portfolio",
    image: "/manus-storage/service-card-custom-furniture_90b44b13_cc2509b2.webp",
  },
  {
    id: "tree-reuse",
    title: "Tree Re-Use Construction",
    description:
      "Material-driven solutions that integrate adaptive tree re-use practices into building projects—reducing waste while meeting real-world construction demands.",
    icon: Leaf,
    href: "/services/tree-reuse",
    image: "/manus-storage/service-card-tree-reuse_a7c1c3cf_f54de3e7.webp",
  },
  {
    id: "log-transport",
    title: "Log Transport & Crane Services",
    description:
      "Heavy-lift and transport services that make recovery possible—moving logs safely and efficiently from site to sawmill.",
    icon: Truck,
    href: "/services/log-transport",
    image: "/manus-storage/service-card-log-crane_d3287821_1ff3fbc6.webp",
  },
  {
    id: "tree-care",
    title: "Tree Care, Removals & Consulting",
    description:
      "Experienced tree care that looks beyond removal—prioritizing reuse, stewardship, and lasting value.",
    icon: Trees,
    href: "/services/tree-care",
    image: "/manus-storage/service-card-tree-care_0120b431_6368b4fd.webp",
  },
  {
    id: "millworks",
    title: "Lumber Surfacing, CNC & Fabrication",
    description:
      "Precision surfacing, CNC routing, laser etching & fabrication for custom architectural elements & engineered components.",
    icon: Zap,
    href: "/services/millworks",
    image: "/manus-storage/service-card-cnc-fabrication_e8d77a88_1c647dc4.webp",
  },
];

export default function Services() {
  return (
    <>
      <SEOHead
        title="Services | Texas Urban Sawmill"
        description="Explore our comprehensive services: custom sawmilling, furniture design, tree reuse construction, log transport, tree care, and precision fabrication."
        canonical="https://www.txurbansawmill.com/services"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <FancyHeroBanner
          imageUrl={heroImage}
          imageAlt="Services - Texas Urban Sawmill"
          mainTitle="Our Services"
        />

        <section className="section-shell py-16 sm:py-24">
          <div className="container">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Comprehensive Solutions for Your Project
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We solve problems that are often overlooked in today's world of laminates and engineered products by combining modern efficiency with hands-on craftsmanship, practical experience, and long-term material thinking.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Image with black outline and large shadow */}
                    <div className="relative h-60 overflow-hidden bg-muted border-2 border-[#8b7355]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Card content */}
                    <div className="p-4 pt-3">
                      <h3 className="text-xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <Button asChild className="w-full border-2 border-[#8b7355] text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]" style={{ background: 'linear-gradient(180deg, rgba(33, 121, 56, 0.9) 0%, rgba(24, 102, 47, 0.9) 100%)' }}>
                        <a href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell bg-muted py-16 sm:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contact us today to discuss your project and discover how we can
                help you achieve your sustainability and design goals.
              </p>
              <Button asChild size="lg" className="border-2 border-[#8b7355] text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]" style={{ background: 'linear-gradient(180deg, rgba(33, 121, 56, 0.9) 0%, rgba(24, 102, 47, 0.9) 100%)' }}>
                <a href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
