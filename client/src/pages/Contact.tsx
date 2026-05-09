/**
 * Design philosophy for Contact.tsx
 * - Master Navigation Bar and Master Footer match Homepage exactly
 * - Hero section: Full-width banner image with centered "CONTACT US" heading (compact height ~35vh)
 * - Two-column layout: Left side contact form in white box, right side contact information in white box
 * - Side-by-side design with equal visual weight
 * - Typography: Consistent with homepage
 * - Colors: Green nav/footer, gold accents, green CTA button
 */

import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, CheckCircle, AlertCircle, Youtube, Linkedin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const logoUrl = "/manus-storage/TXUSBlack4.5inx3in72DPI_fe5f0d81_0f47ce66.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "Custom Furniture", href: "/services#custom-furniture" },
      { label: "Sawmilling & Kiln Drying", href: "/services/sawmilling" },
      { label: "Tree Re-Use Construction", href: "/services#tree-reuse" },
      { label: "Log Transport & Crane", href: "/services#log-transport" },
      { label: "Tree Care & Removals", href: "/services#tree-care" },
      { label: "Millworks, CNC, & Laser", href: "/services#millworks" },
    ],
  },
  { label: "Learn More", href: "/learn-more" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/txurbansawmill", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@texasurbansawmill", icon: Youtube },
  { label: "Facebook", href: "https://www.facebook.com/texasurbansawmill", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/texas-urban-sawmill", icon: Linkedin },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      setSuccessMessage(result.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      setErrorMessage(errorMsg);
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <SEOHead
        title="Contact Texas Urban Sawmill - Custom Sawmill & Sustainable Services"
        description="Get in touch with Texas Urban Sawmill. Contact us for custom sawmilling, heirloom furniture, tree reuse construction, and sustainable forestry services in Central Texas."
        url="https://txsawmill-hnwf9q8m.manus.space/contact"
      />
      <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* HERO BANNER SECTION */}
      <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[40vh]">
        <img
          src="/manus-storage/TXUSHeroBannerWebsite1920x600_3c5a40ee_767c8a62.png"
          alt="Contact Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="relative mx-auto min-h-[40vh] max-w-7xl px-6 py-12 lg:px-8 lg:py-14 flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="border-2 border-white px-5 py-7 lg:px-14 lg:py-22 text-center max-w-xl lg:max-w-4xl bg-black/[0.15] backdrop-blur-sm"
          >
            <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Contact Us
            </h1>
          </motion.div>
        </div>
      </section>



      {/* SIDE-BY-SIDE FORM & INFO SECTION */}
      <section className="bg-[#f0f0f0] px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {/* LEFT: CONTACT FORM IN WHITE BOX */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="border-4 border-[#d7a469] bg-white p-8 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <h2 className="font-display text-2xl font-semibold text-[#1b1612]">Your Information</h2>
              <p className="mt-3 text-sm leading-6 text-[#6d5d50]">
                Tell us about your project, and we'll get back to you within 24-48 hours.
              </p>

              {/* Success Message */}
              {successMessage && (
                <div className="mt-4 flex items-start gap-3 rounded-sm bg-green-50 border border-green-200 p-4">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-4 flex items-start gap-3 rounded-sm bg-red-50 border border-red-200 p-4">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Full Name & Email - Two columns */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject - Two columns */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50"
                      placeholder="(512) 555-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50"
                      placeholder="e.g., Custom Sawmilling Inquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center rounded-sm bg-[#217938] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#1a5a2a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center rounded-sm border border-[#d7a469] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612] transition-colors duration-300 hover:bg-[#f0ebe2] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </motion.div>

            {/* RIGHT: CONTACT INFORMATION IN WHITE BOX */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-4 border-[#d7a469] bg-white p-8 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <h2 className="font-display text-2xl font-semibold text-[#1b1612]">Contact Information</h2>
              <p className="mt-3 text-sm leading-6 text-[#6d5d50]">
                Whether you're inquiring about custom pieces, material availability, or have woodworking questions, we're here to help.
              </p>

              <div className="mt-8 space-y-6">
                {/* Email */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a08860]">Email</p>
                  <a href="mailto:info@txurbansawmill.com" className="mt-1 text-sm font-semibold text-[#1b1612] hover:text-[#d7a469] transition-colors">
                    info@txurbansawmill.com
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a08860]">Phone</p>
                  <a href="tel:+15127625898" className="mt-1 text-sm font-semibold text-[#1b1612] hover:text-[#d7a469] transition-colors">
                    512-762-5898
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a08860]">Hours</p>
                  <p className="mt-1 text-sm font-semibold text-[#1b1612]">M-F 9am-4pm</p>
                  <p className="text-xs text-[#6d5d50]">Sat/Sun Closed or by Special Request</p>
                </div>

                {/* Address */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a08860]">Address</p>
                  <p className="mt-1 text-sm font-semibold text-[#1b1612]">4610 W. Hwy 290</p>
                  <p className="text-xs text-[#6d5d50]">Dripping Springs, TX 78620</p>
                </div>

                {/* Response Time */}
                <div className="border-t border-[#e8ddd1] pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a08860]">Response Time</p>
                  <p className="mt-2 text-sm text-[#6d5d50]">
                    We aim to respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://www.facebook.com/texasurbansawmill/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#d7a469] bg-white text-[#1877f2] transition-colors duration-300 hover:bg-[#f0ebe2]"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/txurbansawmill/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#d7a469] bg-white text-[#e1306c] transition-colors duration-300 hover:bg-[#f0ebe2]"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* MAP BOX */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 border-4 border-[#d7a469] bg-white p-8 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <h2 className="font-display text-2xl font-semibold text-[#1b1612] mb-4">Visit Us</h2>
            <div className="h-96 w-full rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55000!2d-98.3456789!3d30.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5c5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2s4610%20W%20Hwy%20290%2C%20Dripping%20Springs%2C%20TX%2078620!5e0!3m2!1sen!2sus!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-4 text-sm text-[#6d5d50]">
              4610 W. Hwy 290, Dripping Springs, TX 78620
            </p>
          </motion.div>
        </div>
      </section>

      {/* MASTER FOOTER - Same as Homepage */}
      <Footer />
    </div>
    </>
  );
}
