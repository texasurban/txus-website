import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "wouter";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { SEOHead } from "@/components/SEOHead";

const heroImage = "/manus-storage/InksLakeRenderingwebp_29e8b629_4dc08ee4.webp";

export default function InksLakeSP() {
  return (
    <>
      <SEOHead
        title="Inks Lake State Park Climate-Smart Construction | Texas Urban Sawmill"
        description="Explore TXUS adaptive tree reuse at Inks Lake State Park, including rescued Texas mesquite and post oak used in climate-smart construction and custom interiors."
        url="https://txurbansawmill.com/blog/inks-lake-sp"
        image={heroImage}
        type="article"
      />
      <div className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <FancyHeroBanner
        imageUrl={heroImage}
        mainTitle="Inks Lake State Park"
        subtitle="Climate Smart Construction Project"
        imageAlt="Inks Lake State Park new headquarters architectural rendering - Texas Urban Sawmill"
      />

      <main className="container py-12 sm:py-16 lg:py-20">
        {/* Climate-Smart Construction Intro */}
        <section className="mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-foreground">
            Climate-Smart Construction at Inks Lake
          </h2>
          <p className="text-lg leading-relaxed mb-4 text-foreground/90">
            Construction of the new Inks Lake Park Headquarters, with a strong emphasis on sustainable building practices, was completed in 2024. The facility is two and a half times larger and incorporates adaptive design elements sourced from trees rescued on-site. More than 40 trees were salvaged and will be processed into reclaimed lumber and finished wood products. Native Texas mesquite and post oak were used throughout both the interior and exterior of the building.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div><strong>Owner:</strong> Texas Parks & Wildlife</div>
            <div><strong>Architect:</strong> McKinney York Architects</div>
            <div><strong>Project Status:</strong> Complete</div>
            <div><strong>Completion:</strong> Q1 2024</div>
          </div>
        </section>

        {/* Environmental Impact Section - White Background */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 rounded-lg mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8 text-foreground text-center">
            Environmental Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">&gt;8,164 lbs</p>
              <p className="text-sm text-foreground/70">Carbon Stored</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">416 gals</p>
              <p className="text-sm text-foreground/70">Equivalent in Gasoline</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">4,147 lbs</p>
              <p className="text-sm text-foreground/70">Equivalent in Coal Burned</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">450,449</p>
              <p className="text-sm text-foreground/70">Smart Phones Charged</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">9,495 miles</p>
              <p className="text-sm text-foreground/70">Miles Driven</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">1.28 tons</p>
              <p className="text-sm text-foreground/70">Waste Recycled</p>
            </div>
          </div>
        </section>

        {/* Sustainability Message with Leaf Icons */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-[#f0f0f0] border-l-4 border-[#1a4d2e] px-6 py-4 mb-6">
            <p className="text-base font-semibold text-[#1a4d2e] flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              We help our customers tell a powerful story about unmatched sustainability practices & carbon savings.
            </p>
          </div>

          <div className="bg-[#f0f0f0] border-l-4 border-[#1a4d2e] px-6 py-4">
            <p className="text-base font-semibold text-[#1a4d2e] flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              This project puts our sustainability commitments into practice—rescuing trees, reducing waste, and creating a functional space for staff and visitors
            </p>
          </div>
        </section>

        {/* Mesquite Revival Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-foreground">
            Mesquite Revival at Inks Lake State Park
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            Interior of Inks Lake State Park featuring custom mesquite cabinetry produced from ~40 of the trees rescued directly from the grounds of the new headquarters. Our forestry efforts prioritize sustainability—preserving the natural beauty of the land while supporting a place-based, environmentally responsible design approach.
          </p>
          <div className="my-8">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/OHzHBFMifITIHGsL.webp"
              alt="Mesquite cabinetry at Inks Lake State Park - Texas Urban Sawmill"
              loading="lazy"
              className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
            />
            <p className="text-sm text-[#666] italic mt-1 text-center">Custom mesquite cabinetry produced from rescued trees at Inks Lake State Park</p>
          </div>


        </section>

        {/* Locally Rescued Post Oak Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-foreground">
            Locally Rescued Post Oak – Crafted with Purpose
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            The Inks Lake Superintendent shares a conversation with the lead TPWD architect and Texas Urban Sawmill film producer. Post oak, a signature Texas hardwood, played a central role in the project—most notably in the large entry bench and custom-crafted interior tables for the staff.
          </p>
          <div className="my-8">
            <img
              src="/manus-storage/inks_lake_post_oak_interior_5d903a92_0419224f.webp"
              alt="Post oak interior with staff at Inks Lake State Park - Texas Urban Sawmill"
              loading="lazy"
              className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
            />
            <p className="text-sm text-[#666] italic mt-1 text-center">Post oak entry bench and interior tables crafted for Inks Lake State Park staff</p>
          </div>
        </section>

        {/* Construction Site Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-foreground">
            Trash or Treasure?
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            A total of over 40 old growth trees were rescued off this construction site. A majority of the trees were Texas Mesquites. We will give these trees a second life as interior elements within the adaptive design of the building including cabinets, barn doors, wall cladding and furniture elements. Their permanent design elements will serve as a memorial to the trees' rich history and allow the community to touch, feel, and enjoy this remarkable example of a Climate Smart Project™.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            So, the next time you consider the removal of trees, think responsibly and challenge yourself as we embrace the responsible world of sustainability.
          </p>
          <div className="my-8">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/QtfRhkeujtrLSEBH.webp"
              alt="Over 40 rescued trees from Inks Lake State Park construction site - Texas Urban Sawmill"
              loading="lazy"
              className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
            />
            <p className="text-sm text-[#666] italic mt-1 text-center">Over 40 rescued trees from the Inks Lake State Park construction site</p>
          </div>
        </section>

        {/* Roots and Purpose Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-foreground">
            Roots and Purpose: A First Visit
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            Devin Ginther visits the Texas Urban Sawmill headquarters for the first time—taking in the sights, sounds, and purpose of a space where rescued trees are transformed into meaningful, lasting work. A moment of connection between vision, craft, and community impact.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            This project is part of a <Link to="/#usda-videos" className="text-[#1a4d2e] font-semibold underline hover:text-[#0d3620] transition-colors">5-part film series sponsored by Texas Urban Sawmill, the USDA Forest Service, and the USDA Wood Innovations Grant</Link>—highlighting the impact of sustainable wood reuse across Texas.
          </p>
          <div className="my-8">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663535745618/zSbveSXPjvGzODFY.webp"
              alt="Devin Ginther at Texas Urban Sawmill headquarters - Texas Urban Sawmill"
              loading="lazy"
              className="w-2/3 max-w-2xl h-auto rounded-lg shadow-2xl border-2 border-[#1a4d2e] mx-auto"
            />
            <p className="text-sm text-[#666] italic mt-1 text-center">Devin Ginther at the Texas Urban Sawmill headquarters</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/5 py-12 sm:py-16 px-6 sm:px-8 rounded-lg text-center mb-12 sm:mb-16">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4 text-foreground">
            Embark on Your Sustainable Journey
          </h3>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Ready to tell your sustainability story? Partner with Texas Urban Sawmill to transform rescued trees into meaningful, lasting impact.
          </p>
          <Button asChild className="gap-2">
            <a href="/contact">
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </section>

        {/* Back to Blog */}
        <div className="text-center">
          <Link href="/blog">
            <a className="text-primary hover:text-primary/80 font-semibold flex items-center justify-center gap-2">
              ← Back to Blog
            </a>
          </Link>
        </div>
      </main>
      </div>
    </>
  );
}
