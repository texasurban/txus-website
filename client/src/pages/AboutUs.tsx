import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, MapPin, Trees } from "lucide-react";
import { motion } from "framer-motion";

const teamPhoto = "/manus-storage/Jesse,Sarah&Devin-MeettheMakers_81ab58a5.webp";
const aboutImage = "/manus-storage/devin-and-article_4238cb04.jpg";
const inksLakeImage = "/manus-storage/pasted_file_gFjMIt_TXUSInksLakeSP6_e96af79f_93801767.jpg";

const makers = [
  {
    name: "Sarah Ginther",
    role: "Co-Founder, Lead Sawyer & CFO",
    image: "/manus-storage/SarahHeadshot_b87f6c24.jpg",
    alt: "Sarah Ginther, Co-Founder and Lead Sawyer",
    bio: "One of the few women sawyers in the country, Sarah brings a discerning eye to the mill that few can match. She hand-selects and mills every log, identifying the character and grain that define each piece. As CFO, she balances hands-on artistry with financial stewardship, ensuring our mission remains sustainable and our Tree-to-Table process remains the gold standard.",
  },
  {
    name: "Jesse Mahoney",
    role: "Lead Designer & Production Manager",
    image: "/manus-storage/JesseHeadshot_f56f3dd8.jpg",
    alt: "Jesse Mahoney, Lead Designer and Production Manager",
    bio: "Jesse brings a background in computer science and hardware innovation from his tenure in the semiconductor industry, including time at Apple. He translates that technical discipline into his role as a master craftsman, conceiving and executing product designs with precision and structural integrity that defines our work.",
  },
  {
    name: "Devin Ginther",
    role: "Co-Founder & CEO",
    image: "/manus-storage/DevinHeadshot_2715b832.jpg",
    alt: "Devin Ginther, Co-Founder and CEO",
    bio: "Founder and visionary behind Texas Urban Sawmill, Devin brings technical rigor from his background as a certified Project Management Professional (PMP), R&D biomedical engineer, and holder of multiple patents. He applies this inventive precision to every phase of material selection, milling, and kiln stabilization, transforming each rescued tree into a structurally sound, legacy-grade masterpiece.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutUs() {
  return (
    <>
      <SEOHead
        title="About Us | Texas Urban Sawmill"
        description="Meet the family and makers behind Texas Urban Sawmill, a Central Texas community sawmill built around stewardship, reuse, and traditional craftsmanship."
        canonical="https://txurbansawmill.com/about-us"
        image="/manus-storage/Jesse,Sarah&Devin-MeettheMakers_81ab58a5.webp"
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          <section className="border-b-2 border-stone-400 bg-[#1a4d2e] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-b-2 border-stone-400">
            <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="order-2 text-white lg:order-1"
              >
                <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  The People Behind the Work
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90 lg:text-xl">
                  A community sawmill built around family, stewardship, reuse, and traditional craftsmanship.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-1 overflow-hidden border-2 border-[#8b7355] bg-[#fbf8f3] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.4)] lg:order-2"
              >
                <img
                  src={teamPhoto}
                  alt="Jesse, Sarah, and Devin with a finished Texas Urban Sawmill table"
                  className="h-auto max-h-[520px] w-full object-contain"
                 decoding="async"/>
              </motion.div>
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
                    decoding="async"
                    loading="lazy"
                  />
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
              <a
                href="https://tpwmagazine.com/archive/2023/dec/scout10_trailblazers/"
                target="_blank"
                rel="noreferrer"
                className="block cursor-pointer overflow-hidden border-2 border-[#8b7355] shadow-[0_18px_40px_rgba(11,18,9,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(11,18,9,0.15)]"
              >
                <img
                  src={aboutImage}
                  alt="Texas Urban Sawmill team portrait in the workshop - Texas Parks & Wildlife Trailblazer"
                  className="h-full min-h-[420px] w-full object-cover shadow-lg"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
          </section>

          <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-8 lg:py-28 border-t-2 border-b-2 border-stone-400">
            <div className="container">
              <div className="mb-16 lg:mb-20">
                <p className="text-center text-sm uppercase tracking-[0.32em] text-stone-600 lg:text-base">
                  The Makers
                </p>
                <h2 className="mt-6 text-center font-display text-5xl leading-[1.1] text-stone-950 sm:text-6xl lg:text-7xl">
                  Meet the Craftsman
                </h2>
              </div>

              <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
                {makers.map((maker) => (
                  <motion.div
                    key={maker.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                  >
                    <div className="relative mb-8 overflow-hidden border-2 border-[#d7a469] bg-stone-100 shadow-[0_18px_36px_rgba(11,18,9,0.16)]">
                      <div className="aspect-square">
                        <img
                          src={maker.image}
                          alt={maker.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                         decoding="async"/>
                      </div>
                    </div>
                    <h3 className="font-display text-2xl text-stone-950">{maker.name}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-stone-600 lg:text-base">
                      {maker.role}
                    </p>
                    <p className="mt-4 text-left text-base leading-8 text-stone-700 lg:text-lg">
                      {maker.bio}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
