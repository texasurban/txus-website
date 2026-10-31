import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Leaf } from "lucide-react";

type ArticleImage = {
  src: string;
  alt: string;
  caption: string;
};

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  image?: ArticleImage;
};

export type LegacyArticleSpec = {
  title: string;
  heroTitle: string;
  subtitle: string;
  description: string;
  url: string;
  heroImage: ArticleImage;
  introHeading: string;
  intro: string[];
  sections: ArticleSection[];
  ctaHeading: string;
  ctaText: string;
};

const divider = "border-t-2 border-b-2 border-stone-400";
const sectionOne = `bg-[#f0f0f0] ${divider} py-12 sm:py-16 lg:py-20`;
const sectionTwo = `bg-[#f5f1e8] ${divider} py-12 sm:py-16 lg:py-20`;

function ArticleImageBlock({ image }: { image: ArticleImage }) {
  return (
    <figure className="mt-8">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-lg border-2 border-black shadow-lg"
      />
      <figcaption className="mt-3 text-center text-sm italic leading-relaxed text-[#666]">
        {image.caption}
      </figcaption>
    </figure>
  );
}

export function LegacyArticlePage({ article }: { article: LegacyArticleSpec }) {
  return (
    <>
      <SEOHead
        title={article.title}
        description={article.description}
        url={article.url}
        image={article.heroImage.src}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.heroTitle,
          description: article.description,
          url: article.url,
          image: article.heroImage.src,
          author: { "@type": "Person", name: "Devin Ginther" },
          publisher: { "@type": "Organization", name: "Texas Urban Sawmill" },
        }}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <section className={`relative w-full min-h-[54vh] overflow-hidden ${divider}`}>
            <img
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 flex min-h-[54vh] items-center justify-center px-4 py-16">
              <div className="max-w-4xl border-2 border-white bg-black/25 px-6 py-8 text-center backdrop-blur-sm sm:px-10">
                <h1 className="font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-5xl lg:text-6xl">
                  {article.heroTitle}
                </h1>
                <p className="mt-3 font-display text-lg italic font-bold text-[#d7a469] sm:text-xl">
                  {article.subtitle}
                </p>
              </div>
            </div>
          </section>

          <section className={`px-6 lg:px-8 ${sectionOne}`}>
            <div className="container max-w-4xl">
              <h2 className="font-display text-3xl uppercase tracking-[0.04em] text-[#1b1612] sm:text-4xl">
                {article.introHeading}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#3d3d3d]">
                {article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-8 flex items-start gap-3 border-l-4 border-[#1a4d2e] bg-white/70 px-5 py-4 text-[#1a4d2e]">
                <Leaf className="mt-1 h-5 w-5 shrink-0" />
                <p className="font-semibold">We help our customers tell a powerful story about unmatched sustainability practices and carbon savings.</p>
              </div>
            </div>
          </section>

          {article.sections.map((section, index) => (
            <section key={section.heading} className={`px-6 lg:px-8 ${index % 2 === 0 ? sectionTwo : sectionOne}`}>
              <div className="container max-w-4xl">
                <h2 className="font-display text-3xl uppercase tracking-[0.04em] text-[#1b1612] sm:text-4xl">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#3d3d3d]">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets && (
                  <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-[#3d3d3d]">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                {section.image && <ArticleImageBlock image={section.image} />}
              </div>
            </section>
          ))}

          <section className={`px-6 text-center lg:px-8 ${sectionTwo}`}>
            <div className="container max-w-3xl">
              <h2 className="font-display text-3xl uppercase tracking-[0.04em] text-[#1b1612] sm:text-4xl">
                {article.ctaHeading}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#3d3d3d]">{article.ctaText}</p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild className="bg-[#1a4d2e] text-white hover:bg-[#0f2e1f]">
                  <Link href="/contact">Start a Conversation</Link>
                </Button>
                <Button asChild variant="outline" className="border-black text-[#1b1612] hover:bg-white">
                  <Link href="/blog">Back to Blog</Link>
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

export const texasParksWildlifeArticle: LegacyArticleSpec = {
  title: "Texas Parks & Wildlife Trailblazer | Texas Urban Sawmill",
  heroTitle: "Texas Parks & Wildlife — Texas Trailblazer",
  subtitle: "New Life for Fallen Trees",
  description: "Texas Urban Sawmill’s Texas Parks & Wildlife feature explores full-circle forestry, rescued trees, sequestered carbon, and sustainable public-space projects.",
  url: "https://txurbansawmill.com/blog/texas-parks-wildlife-award",
  heroImage: {
    src: "/manus-storage/devin-and-article_4238cb04.jpg",
    alt: "Devin Ginther featured in the Texas Parks and Wildlife article - Texas Urban Sawmill",
    caption: "Devin Ginther during the Texas Parks & Wildlife feature on full-circle forestry and new life for fallen trees.",
  },
  introHeading: "Texas Urban Sawmill — New Life for Fallen Trees",
  intro: [
    "We were honored to be featured in the December 2023 issue of Texas Parks & Wildlife Magazine for our commitment to sustainable forestry and our work to preserve the sequestered carbon in fallen trees.",
    "Inspiration begins with a fallen tree and a mission for a more sustainable future. Devin Ginther and the Texas Urban Sawmill team balance social, environmental, and artistic responsibilities while furnishing some of Texas’ most visited public spaces.",
  ],
  sections: [
    {
      heading: "Full-Circle Forestry in Texas",
      paragraphs: [
        "By partnering with families, communities, and commercial developers, Texas Urban Sawmill finds new uses for fallen and dead trees across the state that would otherwise be mulched, burned, or discarded in a landfill.",
        "In our view, it is one of the most sustainable forms of lumber anywhere in the world because it is local, it is rescued, and we are not cutting down healthy trees. When people know the wood and where it is coming from, they know the story behind it. Reusing trees gives people the opportunity to share a second life with them.",
      ],
      image: {
        src: "/manus-storage/inks_lake_post_oak_interior_5d903a92_0419224f.webp",
        alt: "Rescued Texas wood used in an Inks Lake State Park interior - Texas Urban Sawmill",
        caption: "Rescued Texas wood can become cabinets, wall cladding, furniture, and other lasting public-space elements.",
      },
    },
    {
      heading: "Partnerships That Preserve the Story of the Tree",
      paragraphs: [
        "Texas Urban Sawmill is working on tree reuse projects with institutions such as the Texas Parks and Wildlife Department, Habitat for Humanity, Texas A&M Forest Service, and Austin State Hospital to produce environmentally sustainable lumber products and architectural installations.",
        "A current project at Inks Lake State Park turned trees from the new headquarters construction site—mainly mesquites—into cabinets, doors, wall cladding, and furniture for the building. The goal is to maximize natural resources found at the park, keep that carbon sequestered, and turn it into beautiful, historical products that Texans can see and interact with.",
      ],
      image: {
        src: "/manus-storage/ash_building_ribbon_cutting_45371dc6_3f2d06d1.webp",
        alt: "Sustainable public-space project using rescued Texas wood - Texas Urban Sawmill",
        caption: "Every project is an opportunity to connect with the environment, divert products from waste streams, and inspire Texans to think differently about trees.",
      },
    },
  ],
  ctaHeading: "Tell the Story of a Rescued Tree",
  ctaText: "Talk with Texas Urban Sawmill about tree reuse, sustainable lumber, or a public-space project that gives local wood a second life.",
};

export const treeRemovalArticle: LegacyArticleSpec = {
  title: "Redefining Tree Removal in Central Texas | TXUS",
  heroTitle: "Redefining Tree Removal in Central Texas",
  subtitle: "Partnering with Purpose",
  description: "Learn how Texas Urban Sawmill and Wilder Tree Service create a smarter Central Texas tree-removal model that reduces waste and preserves value.",
  url: "https://txurbansawmill.com/blog/tree-service-partnership",
  heroImage: {
    src: "/manus-storage/20200427_123813_d1beef85.webp",
    alt: "Central Texas tree reuse and log recovery project - Texas Urban Sawmill",
    caption: "Safety, care, and consideration go into every removal—and every opportunity to give the tree a second life.",
  },
  introHeading: "From Waste to Worth",
  intro: [
    "At Texas Urban Sawmill, we’ve always believed that every tree has value—even after it comes down. That is why we partner with purpose with Wilder Tree Service, a forward-thinking tree care company that shares our commitment to sustainability, craftsmanship, and community impact.",
    "Together, we are bringing Central Texas a smarter, more responsible alternative to traditional tree removal—one that reduces waste, lowers costs, and creates lasting value from every tree.",
  ],
  sections: [
    {
      heading: "A Better Tree Removal Solution",
      paragraphs: [
        "Almost all tree removal operations in Texas end with the biomass of a tree being chipped or hauled to the landfill. That costs clients, contributes to environmental waste, and releases valuable sequestered carbon stored within the trees.",
        "In a perfect world, when we remove a tree, we focus on upcycling the material for its best and highest value. If tree access allows for it, we transport and upcycle logs directly at our facility in Dripping Springs, where we process them into high-quality lumber, slabs, and custom wood products.",
      ],
      bullets: [
        "A reduction in landfill waste and disposal fees.",
        "Fewer hours of labor for tree crews.",
        "A more affordable option for homeowners and property managers.",
        "Local lumber, slabs, furniture, and architectural elements made from the rescued tree.",
      ],
      image: {
        src: "/manus-storage/WM1000_new_optimized_b6c172ae_75642c76.webp",
        alt: "Texas Urban Sawmill processing a rescued log on the WM1000 sawmill",
        caption: "The highest value for recovered material is lumber that can maintain sequestered carbon for decades, if not centuries.",
      },
    },
    {
      heading: "Why This Partnership Matters",
      paragraphs: [
        "By eliminating chipping and disposal where possible, the partnership allows tree crews to offer more competitive pricing. Trees that would otherwise be discarded are salvaged and repurposed, preserving stored carbon, keeping material out of landfills, and supporting Texas’s circular economy.",
        "The logs we rescue are not just timber—they are the beginning of a new chapter. Many become heirloom-quality furniture, architectural elements, and commercial features made right here in Central Texas.",
      ],
      image: {
        src: "/manus-storage/Brad&KerryPecanTrestleTable18_1856bb6b_3275a96b.jpg",
        alt: "Heirloom pecan table made from a rescued Central Texas tree",
        caption: "Local craftsmanship turns rescued logs into furniture with a lasting story.",
      },
    },
  ],
  ctaHeading: "Got a Tree Coming Down?",
  ctaText: "Let’s make sure it does not go to waste. Contact Texas Urban Sawmill to learn how your tree can be reclaimed, upcycled, and given a new life.",
};

export const urbanWoodBenefitsArticle: LegacyArticleSpec = {
  title: "Why Urban Wood Beats Reclaimed Wood | TXUS",
  heroTitle: "Why Urban Wood Is Better Than Reclaimed Wood",
  subtitle: "Local, Rescued, and Climate-Smart",
  description: "Compare urban and rescued wood with reclaimed wood, including local availability, quality, supply, safety, energy use, and sustainability.",
  url: "https://txurbansawmill.com/blog/urbanwoodbenefits",
  heroImage: {
    src: "/manus-storage/hillco_rescued_pecan_tree_4876d788_19f9a0dc.webp",
    alt: "Large rescued Texas pecan tree used for urban wood products",
    caption: "Sharing the history found within a rescued pecan tree offers a climate-smart solution with unmatched beauty and appeal.",
  },
  introHeading: "Benefits of Urban and Rescued Wood",
  intro: [
    "Reclaimed lumber is a very sustainable material, especially when processed locally. It helps conserve natural resources, reduce waste, and minimize energy consumption and carbon emissions associated with new lumber production.",
    "This article explores the proposed benefits of urban and rescued wood compared to reclaimed wood. Urban wood is most often produced locally from locally rescued trees, while reclaimed wood is typically a secondary material recovered from deconstructed buildings or manufactured structures.",
  ],
  sections: [
    {
      heading: "Local Availability and Higher Quality",
      paragraphs: [
        "Urban wood is most often produced locally from locally rescued trees, which means transportation emissions can be minimized compared to reclaimed wood that is shipped for secondary processing and end-good manufacturing to other regions of the United States.",
        "Urban wood harvested from trees that have been properly maintained and cared for can result in higher quality wood with fewer defects. There is also typically a much larger variety of rescued tree species available, allowing for a wider range of use applications.",
      ],
      image: {
        src: "/manus-storage/HillcoPartners-17FootPecanQuadMatch95_8c731067_ea305289.jpg",
        alt: "Large pecan conference table made from locally rescued Texas wood",
        caption: "Local rescued wood can become durable, high-value furniture and commercial features close to where the tree grew.",
      },
    },
    {
      heading: "Supply, Safety, and Fewer Physical Hazards",
      paragraphs: [
        "Urban wood can come from both community and rural trees, which are maintained and replaced regularly, and can be a more reliable supply source compared to reclaimed wood. Fallen, dead, hazard-prone, or diseased trees are in abundance across North America.",
        "Some reclaimed lumber may contain nails, screws, lead, asbestos, mold, or historic preservatives. Urban and rescued wood comes directly from trees with an extremely remote chance of toxic chemical exposure and typically contains fewer metal hazards for sawyers and woodworkers.",
      ],
      bullets: [
        "Urban wood is often hyper-local and can reduce transportation emissions.",
        "Rescued trees provide a larger range of regional species and sizes.",
        "Material can be assessed and processed by a trained local crew.",
        "The tree’s story and stored carbon remain part of the finished product.",
      ],
    },
    {
      heading: "Minimize Waste and Save Energy",
      paragraphs: [
        "By using urban and rescued wood, we minimize waste and promote sustainability by repurposing trees that might otherwise be discarded. Urban lumber requires less energy to produce than reclaimed lumber because it does not require the same extensive deconstruction, cleaning, and processing.",
        "Natural products made directly from fallen and diseased trees, often rescued within 100 miles of processors, offer an innovative climate-smart solution for individuals, builders, designers, and architects.",
      ],
      image: {
        src: "/manus-storage/pecan-bunker-conference-table-clean_e24a8899_ca056166.png",
        alt: "Custom conference table made from rescued Texas pecan",
        caption: "Furniture produced from locally rescued trees offers beauty, quality, and durability while preserving the story of the material.",
      },
    },
  ],
  ctaHeading: "Choose a More Local Wood Story",
  ctaText: "Talk with Texas Urban Sawmill about urban lumber, rescued Texas hardwoods, and climate-smart material choices for your next project.",
};

export const woodDefinitionsArticle: LegacyArticleSpec = {
  title: "Urban, Rescued, Salvaged, and Reclaimed Wood | TXUS",
  heroTitle: "What Is Urban, Rescued, Salvaged, and Reclaimed Wood?",
  subtitle: "A TXUS Guide to Climate-Smart Wood",
  description: "Understand the differences between urban, rescued, salvaged, and reclaimed wood and why the distinction matters for sustainability and local communities.",
  url: "https://txurbansawmill.com/blog/what-is-urban-rescued-salvaged-reclaimed-wood",
  heroImage: {
    src: "/manus-storage/20200427_123813_d1beef85.webp",
    alt: "Rescued Texas pecan boules prepared for kiln drying - Texas Urban Sawmill",
    caption: "These rescued Texas pecan boules came from trees that fell victim to Hurricane Harvey near Goliad, Texas.",
  },
  introHeading: "Why These Definitions Matter",
  intro: [
    "Sustainability is about meeting the needs of the present generation without compromising the ability of future generations to meet their own needs. Urban, rescued, salvaged, and reclaimed woods are all climate-smart or carbon-smart wood products that can help combat climate change while providing sustainable alternatives to traditional timber products.",
    "At Texas Urban Sawmill, we strive to contribute to standardized industry terms and definitions so customers, builders, designers, and communities can make informed decisions about wood materials.",
  ],
  sections: [
    {
      heading: "What Is Urban Wood?",
      paragraphs: [
        "Urban wood is derived from trees grown in communities and urban areas such as backyards, parks, and street plantings. When trees are pruned or taken down because of disease, damage, or expansion, they can be processed into highly sustainable lumber.",
        "When urban trees are removed, the carbon stored in the wood remains locked away from the atmosphere. Turning this wood into usable lumber extends the life of the trees, supports local economies, and reduces the carbon footprint of new wood products.",
      ],
      image: {
        src: "/manus-storage/SarahonWM1000_103d95c2_848f1059.webp",
        alt: "Sarah Ginther working with a rescued log on the WM1000 sawmill",
        caption: "Urban wood supports local arborists, sawyers, and woodworkers while highlighting the value of trees in urban landscapes.",
      },
    },
    {
      heading: "What Is Rescued Wood?",
      paragraphs: [
        "At Texas Urban Sawmill, we define rescued wood as wood recovered from fallen or dead trees due to natural causes such as storms or disease. This climate-smart or carbon-smart wood can be processed into usable or sellable lumber, also called urban wood or urban lumber.",
        "We use the terms urban wood and rescued wood synonymously when describing wood that comes from living, breathing plants. Rescued wood comes from trees, while salvaged wood comes from man-made structures and materials.",
      ],
      image: {
        src: "/manus-storage/hillco_rescued_pecan_tree_4876d788_19f9a0dc.webp",
        alt: "Rescued Texas pecan tree prepared for urban lumber production",
        caption: "Rescuing trees preserves material that can support natural habitats, local communities, and lasting products.",
      },
    },
    {
      heading: "What Is Salvaged Wood?",
      paragraphs: [
        "Salvaged wood and rescued wood are often used as generic terms for a broad category of sustainable wood types. That category can include urban wood, sinker wood, beetle-kill wood, wine-barrel wood, deconstructed wood, reclaimed wood, pallet wood, and barnwood.",
        "However, salvaged wood traditionally comes from the act of salvaging man-made structures or materials. Humans salvage ships and buildings; they do not salvage living trees. That distinction is important when describing the origin of a material.",
      ],
    },
    {
      heading: "What Is Reclaimed Wood?",
      paragraphs: [
        "Reclaimed wood refers to wood that has already served its primary purpose and is recovered as a secondary material or by-product from salvaging efforts. Common sources include buildings, construction sites, deconstruction sites, bridges, furniture, landfills, and other manufactured wood products or structures.",
        "Using reclaimed or deconstructed wood reduces waste and conserves resources by preventing the felling of large tracts of forests and maintaining stored carbon. Reclaimed and salvaged woods are climate-smart materials, but they are distinct from wood recovered directly from trees.",
      ],
      image: {
        src: "/manus-storage/ash_integration_correct_31ad93f5_0c93a177.webp",
        alt: "Rescued and reclaimed wood elements integrated into a Texas project",
        caption: "Understanding a material’s origin helps project teams communicate a more accurate sustainability story.",
      },
    },
  ],
  ctaHeading: "Need Help Choosing the Right Wood?",
  ctaText: "Talk with TXUS about urban lumber, rescued Texas hardwoods, reclaimed materials, and the best fit for your project.",
};

export const circularEconomyArticle: LegacyArticleSpec = {
  title: "Circular Economy Principles and Benefits | TXUS",
  heroTitle: "Sustainable Future: Principles of the Circular Economy",
  subtitle: "Full-Circle Forestry in Texas",
  description: "Learn how circular-economy principles keep wood in use, reduce waste, preserve carbon, and support sustainable forestry across Texas.",
  url: "https://txurbansawmill.com/blog/circular-economy",
  heroImage: {
    src: "/manus-storage/forestry-hero_e181aabc_fe653e22.jpeg",
    alt: "Texas forest and urban wood stewardship landscape - Texas Urban Sawmill",
    caption: "A circular economy keeps materials in use for as long as possible and turns environmental responsibility into practical value.",
  },
  introHeading: "What Is a Circular Economy?",
  intro: [
    "The circular economy is a model of production and consumption that aims to minimize waste and conserve natural resources by keeping materials in use for as long as possible.",
    "For Texas Urban Sawmill, this means recovering trees from communities and landscapes, processing them into valuable products, and creating a full-circle forestry model that supports climate-smart construction, local economies, and future tree canopies.",
  ],
  sections: [
    {
      heading: "From Wildfire Mitigation to Community Value",
      paragraphs: [
        "Texas is the second most disaster-prone state in the United States after California according to FEMA disaster declarations. Rapid population growth, unsustainable forest management, and expansion into the wildland-urban interface have increased wildfire risk across Central Texas.",
        "Texas Urban Sawmill’s Full Circle Woodland Forestry project investigates an economic approach that utilizes excess wood material, reduces wildfire threats, and generates revenue that can support replanting and tree-canopy expansion.",
      ],
      image: {
        src: "/manus-storage/TXUS-Ashe-Chainsaw-WUI-Property_30c2da2a_e8005384.webp",
        alt: "Ashe juniper and wildfire mitigation work in Central Texas - Texas Urban Sawmill",
        caption: "Material rescued from wildfire-mitigation projects can become lumber while supporting healthier landscapes.",
      },
    },
    {
      heading: "Reduce, Reuse, and Recycle—In That Order",
      paragraphs: [
        "Conserving resources by reducing consumption, reusing products, and recycling materials helps reduce waste and conserve natural resources. Reducing consumption should be prioritized as the most effective of the three fundamental principles of sustainability.",
        "Supporting local businesses that promote sustainability and purchasing locally sourced urban wood, rescued wood, or reclaimed wood products are practical ways individuals and organizations can participate in a more sustainable future.",
      ],
      bullets: [
        "Keep valuable wood in use instead of sending it to a landfill.",
        "Reduce transportation emissions through regional processing.",
        "Support local arborists, sawyers, builders, designers, and craftspeople.",
        "Use project value to support tree-canopy expansion and community benefit.",
      ],
      image: {
        src: "/manus-storage/TXUS-AHFH-Team-Cedar-Lumber_7b70e406_c5ee29ea.webp",
        alt: "Texas Urban Sawmill and Habitat for Humanity team with rescued lumber",
        caption: "The full-circle model connects recovered material with affordable housing, canopy expansion, and community partnerships.",
      },
    },
    {
      heading: "The Full-Circle Forestry Model",
      paragraphs: [
        "Wood recovered from project sites can be milled and offered as retail lumber, furniture material, architectural components, or other lasting products. The resulting value can support community organizations, tree-canopy expansion, education, and wildfire-risk mitigation.",
        "This approach demonstrates that economic activity and environmental stewardship can reinforce each other. A removed tree is not simply a disposal problem; it is a material, a story, a carbon store, and an opportunity to build a more resilient future.",
      ],
      image: {
        src: "/manus-storage/TXUS-USDA-Sarah-Hydraulic-Grappler_a3fd1af9_bd711baf.webp",
        alt: "Sarah Ginther supporting full-circle forestry work with a hydraulic grappler",
        caption: "The people behind the work make circular forestry practical—from recovery and processing to community use.",
      },
    },
  ],
  ctaHeading: "Build a More Circular Future",
  ctaText: "Connect with Texas Urban Sawmill to explore climate-smart wood utilization, wildfire mitigation, and full-circle forestry partnerships.",
};
