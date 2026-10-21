import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const teamPhoto = "/manus-storage/Jesse,Sarah&Devin-MeettheMakers_81ab58a5.webp";

const makers = [
  {
    name: "Sarah Ginther",
    role: "Co-Founder, Lead Sawyer & CFO",
    image: "/manus-storage/SarahHeadshot_b87f6c24.jpg",
    alt: "Sarah Ginther, Co-Founder and Lead Sawyer",
    bio: "Sarah brings a discerning eye to the mill, hand-selecting and milling logs to reveal the character and grain that define each piece. She balances hands-on artistry with financial stewardship, helping keep our mission sustainable and our Tree-to-Table process focused on lasting value.",
  },
  {
    name: "Jesse Mahoney",
    role: "Lead Designer & Production Manager",
    image: "/manus-storage/JesseHeadshot_f56f3dd8.jpg",
    alt: "Jesse Mahoney, Lead Designer and Production Manager",
    bio: "Jesse brings technical discipline and a maker's mindset to production. He translates ideas into carefully considered designs and helps guide each project from concept through fabrication with precision and structural integrity.",
  },
  {
    name: "Devin Ginther",
    role: "Co-Founder & CEO",
    image: "/manus-storage/DevinHeadshot_2715b832.jpg",
    alt: "Devin Ginther, Co-Founder and CEO",
    bio: "Devin brings technical rigor from his background as an R&D biomedical engineer, certified project manager, and inventor to every phase of material selection, milling, and fabrication. His focus is turning rescued trees into structurally sound, legacy-grade products.",
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
                <p className="text-sm uppercase tracking-[0.32em] text-white/75">
                  The People Behind the Work
                </p>
                <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  About Us
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
                className="order-1 overflow-hidden border-2 border-[#d7a469] bg-[#fbf8f3] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.4)] lg:order-2"
              >
                <img
                  src={teamPhoto}
                  alt="Jesse, Sarah, and Devin with a finished Texas Urban Sawmill table"
                  className="h-auto max-h-[520px] w-full object-contain"
                 decoding="async"/>
              </motion.div>
            </div>
          </section>

          <section className="border-b-2 border-stone-400 bg-[#fafafa] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-b-2 border-stone-400">
            <div className="container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="mx-auto max-w-4xl text-center"
              >
                <p className="text-sm uppercase tracking-[0.32em] text-stone-600">
                  Welcome to Texas Urban Sawmill
                </p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-stone-950 sm:text-5xl">
                  Rooted in family. Built for lasting value.
                </h2>
                <p className="mt-7 text-lg leading-8 text-stone-700 lg:text-xl">
                  We provide full-service urban wood utilization for Central Texas, converting salvaged trees into usable lumber, custom millwork, and one-of-a-kind finished products. Our capabilities bridge sustainable material recovery with precision manufacturing and traditional craftsmanship.
                </p>
              </motion.div>
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

          <section className="border-b-2 border-stone-400 bg-[#fbf8f3] px-6 py-16 lg:px-8 lg:py-24 border-t-2 border-b-2 border-stone-400">
            <div className="container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-stone-600">Our commitment</p>
                <h2 className="mt-4 font-display text-4xl text-stone-950 sm:text-5xl">
                  Every tree has more than one life.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
                  From rescue and transport to milling, design, and finishing, we keep useful Texas wood in circulation and make its story part of the finished work.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#217938] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-colors hover:bg-[#1a5a2a] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              >
                Contact Us
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

