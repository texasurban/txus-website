import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FancyHeroBanner } from "@/components/FancyHeroBanner";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const heroImage = "/manus-storage/HillcoPartners-17FootPecanQuadMatch95_8c731067_ea305289.jpg";

const storyImages = {
  team: "/manus-storage/Hillco-TXUS_Team_b909193b_d9e9a683.webp",
  rescuedTree: "/manus-storage/hillco_rescued_pecan_tree_4876d788_19f9a0dc.webp",
  grain: "/manus-storage/hillco_jesse_grain_patterns_2b132676_c71edcc1.webp",
  meditation: "/manus-storage/Jesse-Pecan-Meditation_2e0375ad_5ec826a0.webp",
  sections: "/manus-storage/Hillco_9ftsections_441acab7_9135260e.webp",
  frenchPolish: "/manus-storage/HillcoTable_FrenchPolish_6fb70559_6c7b367d.webp",
  mediaPorts: "/manus-storage/hillco_power_usb_hdmi_8f567de9_e3797e37.webp",
  cableRouting: "/manus-storage/Hillco_Cable_Legs_ccc976b3_96864b9c.webp",
  quadMatch: "/manus-storage/Hillco_QuadMatch_d00e3b22_3b131033.webp",
  assembly: "/manus-storage/Hillco_9ft_Assembly_78c71196_a5271d91.webp",
  capitol: "/manus-storage/Hillco_CapitalView_eac96651_8a9d3044.webp",
  finalAssembly: "/manus-storage/hillco_final_assembly_two_halves_5ab476f2_86c55932.webp",
};

type StoryImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

function StoryImage({ src, alt, caption }: StoryImageProps) {
  return (
    <figure className="my-5 text-center">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="mx-auto block w-full max-w-2xl rounded-none border-2 border-[#1a4d2e] shadow-sm"
      />
      {caption && <figcaption className="mx-auto mt-2 max-w-xl text-sm italic leading-relaxed text-[#666]">{caption}</figcaption>}
    </figure>
  );
}

function StoryText({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-relaxed text-[#3d3d3d] sm:text-lg">{children}</p>;
}

export default function HillcoPartners() {
  return (
    <>
      <SEOHead
        title="Hillco Partners - Net Carbon Negative Conference Table | TXUS"
        description="Explore Texas Urban Sawmill's custom 18-foot pecan conference table for Hillco Partners, a compact project story about rescued Texas wood, precision craftsmanship, and sustainable design."
        url="https://txurbansawmill.com/blog/hillco-partners"
        image={heroImage}
        type="article"
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          <FancyHeroBanner
            mainTitle="The Hillco Partners Texas Pecan Table"
            subtitle="A Legacy Rooted in Austin"
            imageUrl={heroImage}
            imageAlt="Hillco Partners 17-foot pecan conference table in a modern Austin office - Texas Urban Sawmill"
          />

          <article className="bg-[#f0f0f0] px-4 py-8 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-5 text-center font-display text-3xl uppercase tracking-[0.04em] text-[#1b1612] sm:text-4xl">
                The Hillco Partners Texas Pecan Table: A Legacy Rooted in Austin
              </h1>

              <StoryImage
                src={storyImages.team}
                alt="TXUS team with the completed 17-foot pecan conference table in a modern office - Texas Urban Sawmill"
                caption="Crafted and designed by Texas Urban Sawmill for Hillco Partners."
              />

              <div className="space-y-4">
                <StoryText>
                  Crafted and designed by the Texas Urban Sawmill, the Hillco Partners conference table is more than just furniture—it’s a story of local heritage and sustainability. This stunning quad-matched showpiece was handcrafted from a rescued Texas pecan tree that once stood less than two miles from Hillco’s downtown Austin office.
                </StoryText>
                <StoryText>
                  From tree to table, every step—from sourcing and milling to final construction—was completed within 40 miles of Austin, making this one of our most environmentally responsible, carbon-negative projects to date. The table not only preserves the natural beauty and rich history of a native Texas pecan, but also symbolizes Hillco’s commitment to excellence.
                </StoryText>
              </div>

              <div className="my-6 border-l-4 border-[#1a4d2e] bg-white/60 px-5 py-4 text-base font-semibold leading-relaxed text-[#1a4d2e]">
                We help our customers tell a powerful story about unmatched sustainability practices and carbon savings.
              </div>

              <div className="space-y-6 border-t border-[#b9b9b9] pt-6">
                <StoryImage
                  src={storyImages.rescuedTree}
                  alt="Rescued pecan tree from 3rd Street in Austin - Texas Urban Sawmill"
                  caption="This is the very pecan tree that was rescued from 3rd Street in Austin, TX in 2021."
                />
                <StoryText>
                  Jesse studies the grain patterns—a critical and often complex step in crafting a true “Quad-Match” table, where precision and visual harmony are everything.
                </StoryText>

                <StoryImage
                  src={storyImages.grain}
                  alt="Jesse studying grain patterns for the Hillco quad-match pecan table - Texas Urban Sawmill"
                  caption="Precision and visual harmony begin with understanding the grain."
                />
                <StoryText>
                  At TXUS, we take pride in the quiet craft of design meditation—mindfully considering every detail of our solid hardwood creations. To build with intention, we must first listen to the wood. Be one with the wood!
                </StoryText>

                <StoryImage
                  src={storyImages.meditation}
                  alt="Jesse working with pecan wood in the TXUS workshop - Texas Urban Sawmill"
                  caption="The quiet craft of design meditation."
                />
                <StoryText>
                  The table was crafted in two 9-foot sections, with each piece meticulously integrated to achieve perfect harmony and continuity. No detail is overlooked, and we prioritize quality over deadlines, ensuring that every product we create meets the highest standards.
                </StoryText>

                <StoryImage
                  src={storyImages.sections}
                  alt="Two 9-foot sections of the Hillco pecan conference table - Texas Urban Sawmill"
                  caption="Two 9-foot sections, meticulously integrated."
                />
                <StoryText>
                  Our tables are finished with a modified version of a French Polish. Though time-consuming, this meticulous process enhances the natural beauty of the wood, resulting in a finish that truly showcases its rich grain and character.
                </StoryText>

                <StoryImage
                  src={storyImages.frenchPolish}
                  alt="French Polish finishing on the Hillco pecan conference table - Texas Urban Sawmill"
                  caption="A finish that showcases the wood’s rich grain and character."
                />
                <StoryText>
                  Our soft-touch media ports are the best in the industry. Installing them correctly required an immense amount of precision and care—because with a design this intricate, you only get one chance to do it right. Power? USB charging? HDMI? We’ve got you covered—seamlessly integrated and ready for anything.
                </StoryText>

                <StoryImage
                  src={storyImages.mediaPorts}
                  alt="Integrated power, USB, and HDMI media ports in the Hillco table - Texas Urban Sawmill"
                  caption="Soft-touch media ports, seamlessly integrated."
                />
                <StoryText>
                  Our bases are expertly engineered to allow for seamless routing of media cables, completely concealed from the floor plate to the top, maintaining a clean and uncluttered design. This 8&quot;x8&quot; vertical post is crafted from 2&quot; thick pecan, expertly glued to create a seamless, solid structure.
                </StoryText>

                <StoryImage
                  src={storyImages.cableRouting}
                  alt="Hidden cable routing in the Hillco table base - Texas Urban Sawmill"
                  caption="Efficient cable routing without compromising the design."
                />
                <StoryText>
                  We never compromise quality for speed. Every component is meticulously finished before final assembly, ensuring a flawless, long-lasting result that stands the test of time. Not a single screw was used in the construction of this one-of-a-kind conference table, with the exception of stainless steel fasteners used to attach the bases and media ports.
                </StoryText>

                <StoryImage
                  src={storyImages.quadMatch}
                  alt="Quad-matched pecan surface on the finished Hillco conference table - Texas Urban Sawmill"
                  caption="Virtually seamless across four matched planks from a single tree."
                />
                <StoryText>
                  The most challenging aspect of this table was the central joint line. To ensure strength and a flawless fit, we incorporated four hidden mortise-and-tenon joints along with specialized concealed clamps—balancing precision engineering with seamless design.
                </StoryText>

                <StoryImage
                  src={storyImages.assembly}
                  alt="Final assembly of the two 9-foot Hillco table sections - Texas Urban Sawmill"
                  caption="Final assembly of the two 9-foot halves requires precision and teamwork."
                />
                <StoryText>
                  Installation and final assembly took a full day—an effort well worth it, especially with an incredible view of the Texas State Capitol as the backdrop. Final assembly of the two 9-foot halves took time, precision—and plenty of hours spent on our backs. Craftsmanship isn’t always glamorous, but the result is always worth it.
                </StoryText>

                <StoryImage
                  src={storyImages.capitol}
                  alt="Finished Hillco pecan conference table with Texas State Capitol view - Texas Urban Sawmill"
                  caption="Not a bad view of the Texas State Capitol—we definitely prefer to sit on this side!"
                />
                <StoryImage
                  src={storyImages.finalAssembly}
                  alt="Final assembly of the Hillco conference table halves - Texas Urban Sawmill"
                  caption="A lasting, functional work of art from a rescued Texas pecan."
                />
              </div>

              <div className="mt-8 border-t border-[#b9b9b9] pt-7 text-center">
                <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-[#1b1612] sm:text-3xl">
                  Commission Your Own Custom Conference Table
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#3d3d3d]">
                  Words can hardly capture the craftsmanship and presence of this conference table—it’s a piece you truly have to see to believe.
                </p>
                <Link href="/contact">
                  <Button className="mt-5 bg-[#1a4d2e] px-6 py-3 text-white hover:bg-[#143b23]">Start a Conversation</Button>
                </Link>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
