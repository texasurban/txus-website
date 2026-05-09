import { motion } from "framer-motion";

interface HeroBannerProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  fadeUp?: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
}

export function HeroBanner({
  title,
  imageUrl,
  imageAlt,
  fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}: HeroBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#1a4d2e] min-h-[54vh]">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative mx-auto min-h-[54vh] max-w-7xl px-6 py-12 lg:px-8 lg:py-14 flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="border-2 border-white px-5 py-7 lg:px-14 lg:py-22 text-center max-w-xl lg:max-w-4xl bg-black/[0.15] backdrop-blur-sm"
        >
          <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
