import { motion } from "framer-motion";

interface FancyHeroBannerProps {
  mainTitle: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt: string;
  bannerTextImage?: string;
  fadeUp?: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
  hideBackground?: boolean;
  minHeight?: string;
}

export function FancyHeroBanner({
  mainTitle,
  subtitle,
  imageUrl,
  imageAlt,
  bannerTextImage,
  fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  hideBackground = false,
  minHeight = "min-h-[40vh]",
}: FancyHeroBannerProps) {
  return (
    <section className={`relative isolate overflow-hidden bg-[#1a4d2e] ${minHeight}`}>
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className={`relative mx-auto ${minHeight} max-w-7xl px-6 py-12 lg:px-8 lg:py-14 flex items-center justify-center`}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className={`${hideBackground ? '' : 'border-2 border-white bg-black/[0.15] backdrop-blur-sm'} px-5 py-7 lg:px-14 lg:py-22 text-center max-w-xl lg:max-w-4xl`}
        >
          {bannerTextImage ? (
            <img
              src={bannerTextImage}
              alt={mainTitle}
              className={`w-5/8 h-auto mx-auto shadow-2xl ${hideBackground ? 'border border-white' : 'border-none'}`}
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {mainTitle}
              </h1>
              {subtitle && (
                <p className="font-sans text-base font-bold leading-tight text-white sm:text-lg lg:text-xl tracking-wide italic">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
