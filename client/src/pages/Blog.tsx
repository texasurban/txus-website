import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trees, Hammer, Sofa, Home, Users, Wrench, Droplets } from "lucide-react";

const heroImage =
  "/manus-storage/forestry-hero_e181aabc_fe653e22.jpeg";
const blogHeroImage =
  "/manus-storage/forestry-hero_e181aabc_fe653e22.jpeg";
const bannerTextImage =
  "/manus-storage/TXUSBannerText-Blog2_a8c755af_888f078d.png";

// Category icons for quick links
const categoryIcons: Record<string, any> = {
  "Sawmill Projects": Trees,
  "Climate-Smart Construction": Hammer,
  "Custom Interior Projects": Sofa,
  "Custom Exterior Projects": Home,
  "Community & Non-Profit Projects": Users,
  "Facility & Operations": Wrench,
  "Kiln Drying Projects": Droplets,
};

// Blog categories with featured articles
const blogCategories = [
  {
    title: "Sawmill Projects",
    description: "Custom milling, lumber production, and sawmill operations",
    articles: [
      {
        id: "sawmill-1",
        title: "Coming Soon",
        excerpt: "Featured sawmill projects and operations",
        image: heroImage,
        link: "/blog/sawmill-1",
      },
    ],
  },
  {
    title: "Climate-Smart Construction",
    description: "Adaptive tree re-use and sustainable building practices",
    articles: [
      {
        id: "austin-state-hospital",
        title: "Austin State Hospital - Largest Adaptive Tree Re-Use Project",
        excerpt: "The largest adaptive tree re-use project in the State of Texas",
        image: "/manus-storage/ash_hero_image_ab6d1664_9d2bd537.webp",
        link: "/blog/austin-state-hospital",
      },
      {
        id: "inks-lake",
        title: "Inks Lake State Park - New Park Headquarters",
        excerpt: "Adaptive tree re-use for new park headquarters",
        image: "/manus-storage/InksLakeRenderingwebp_29e8b629_4dc08ee4.webp",
        link: "/blog/inks-lake-sp",
      },
    ],
  },
  {
    title: "Custom Interior Projects",
    description: "Bespoke furniture and interior woodwork",
    articles: [
      {
        id: "hillco",
        title: "Hillco Partners - Quad Matched Pecan Table",
        excerpt: "Net carbon negative custom furniture project",
        image: "/manus-storage/Hillco-TXUS_Team_b909193b_d9e9a683.webp",
        link: "/blog/hillco-partners",
      },
    ],
  },
  {
    title: "Custom Exterior Projects",
    description: "Outdoor installations and architectural elements",
    articles: [
      {
        id: "exterior-1",
        title: "Coming Soon",
        excerpt: "Featured exterior projects",
        image: heroImage,
        link: "/blog/exterior-1",
      },
    ],
  },
  {
    title: "Community & Non-Profit Projects",
    description: "Partnerships and community impact initiatives",
    articles: [
      {
        id: "usda-grant",
        title: "USDA Forest Service Wood Innovations Grant",
        excerpt: "Award recipients 2022 and 2024 - Turning wildfire mitigation into education",
        image: "https://images.squarespace-cdn.com/content/v1/63e239416016765b92d685ac/49fac2ec-734b-4e8c-a1c4-561aafccfc03/USDA+FS+Grant+Recipient+%26+Sponsors.jpg",
        link: "/blog/wood-innovations-grant",
      },
      {
        id: "texas-parks-wildlife",
        title: "Texas Parks & Wildlife - Texas Trailblazer Award",
        excerpt: "Recognized for new approaches to conservation and land stewardship",
        image: heroImage,
        link: "/blog/texas-parks-wildlife-award",
      },
      {
        id: "community-impact-stories",
        title: "Community Impact Stories",
        excerpt: "Building a sustainable future through education, partnerships, and charitable giving",
        image: "/manus-storage/community-impact-hero_dfe2b974_945d2e07.webp",
        link: "/blog/community-impact-stories",
      },
    ],
  },
  {
    title: "Facility & Operations",
    description: "Sawmill facility updates and operational insights",
    articles: [
      {
        id: "facility-1",
        title: "Coming Soon",
        excerpt: "Featured facility and operations updates",
        image: heroImage,
        link: "/blog/facility-1",
      },
    ],
  },
  {
    title: "Kiln Drying Projects",
    description: "Kiln drying techniques and wood processing",
    articles: [
      {
        id: "kiln-1",
        title: "Coming Soon",
        excerpt: "Featured kiln drying projects",
        image: heroImage,
        link: "/blog/kiln-1",
      },
    ],
  },
];

export default function Blog() {
  return (
    <>
      <SEOHead
        title="The TXUS Wood Journal | Texas Urban Sawmill"
        description="Explore our latest projects, case studies, and insights into sustainable forestry, custom furniture, and climate-smart construction."
        canonical="https://txsawmill-hnwf9q8m.manus.space/blog"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          {/* Hero Banner - Centered Image with White Border (Option A) */}
          <section className="relative w-full min-h-[54vh] overflow-hidden">
            <img
              src={blogHeroImage}
              alt="The TXUS Wood Journal - Forest and logs background"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex items-center justify-center min-h-[54vh] px-4">
              <img
                src={bannerTextImage}
                alt="The TXUS Wood Journal - Lines of Grain, Acts of Stewardship"
                className="max-w-[60%] h-auto max-h-[30vh] object-contain border-2 border-white"
                loading="lazy"
              />
            </div>
          </section>

          {/* Quick Links to Categories */}
          <div className="bg-[#f5f5f5] border-b border-[#e0e0e0]">
            <div className="container py-12 sm:py-14">
              {/* Section Label */}
              <div className="text-center mb-8">
                <p className="text-sm sm:text-base font-bold uppercase tracking-[0.34em] text-[#1b1612] mb-2">
                  Explore by Category
                </p>
              </div>

              {/* Category Buttons with Icons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                {blogCategories.map((category) => {
                  const categoryId = category.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
                  const IconComponent = categoryIcons[category.title];
                  return (
                    <a
                      key={category.title}
                      href={`#${categoryId}`}
                      className="group inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-[#d7a469] text-[#1b1612] font-semibold text-xs sm:text-sm uppercase tracking-[0.05em] hover:bg-[#d7a469] hover:text-white shadow-[0_8px_16px_rgba(11,18,9,0.12)] hover:shadow-[0_16px_32px_rgba(11,18,9,0.24)] transition-all duration-300"
                      title={`View ${category.title} articles`}
                    >
                      {IconComponent && (
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
                      )}
                      <span className="hidden sm:inline">{category.title}</span>
                      <span className="sm:hidden text-xs">{category.title.split(" ")[0]}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Blog Categories Sections */}
          <div className="container py-16 sm:py-20">
            {blogCategories.map((category, index) => {
              const categoryId = category.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
              return (
              <section
                key={category.title}
                id={categoryId}
                className={`mb-20 sm:mb-28 ${
                  index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
                } rounded-lg p-8 sm:p-12 scroll-mt-20`}
              >
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-[0.04em] text-[#1b1612] mb-4">
                    {category.title}
                  </h2>
                  <p className="text-lg text-[#666666] max-w-2xl">
                    {category.description}
                  </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.articles.map((article) => (
                    <a
                      key={article.id}
                      href={article.link}
                      className="group block overflow-hidden rounded-lg border border-[#e0e0e0] shadow-[0_8px_16px_rgba(11,18,9,0.12)] hover:shadow-[0_16px_32px_rgba(11,18,9,0.24)] transition-all duration-300"
                    >
                      <div className="relative h-64 sm:h-80 overflow-hidden bg-black flex items-center justify-center">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 bg-white">
                        <h3 className="text-lg sm:text-xl font-bold text-[#1b1612] mb-2 group-hover:text-[#d7a469] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center text-[#d7a469] font-semibold text-sm group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            );
            })}
          </div>

          {/* CTA Section */}
          <section className="bg-[#404040] px-6 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4 text-[#d7a469]">Ready to Learn More?</h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto text-white">
                  Explore our projects, services, and expertise in sustainable wood utilization and custom craftsmanship.
                </p>
                <Button asChild className="bg-[#d7a469] text-[#2a2a2a] hover:bg-[#e8b87a] px-8 py-3 font-bold">
                  <a href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
