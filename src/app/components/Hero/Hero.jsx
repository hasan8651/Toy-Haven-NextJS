"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/image1.jpg",
    campaign: "STEM Week Sale - 20% off on STEM & Robotics toys",
  },
  {
    image: "/image2.jpg",
    campaign: "New Arrivals - Fresh picks for ages 3-5",
  },
  {
    image: "/image3.jpg",
    campaign: "Best Sellers - Toys loved by thousands of parents",
  },
  {
    image: "/image4.jpg",
    campaign: "Outdoor Fun - Up to 15% off on sports & outdoor toys",
  },
];

const IMAGE_DURATION = 12; // seconds

export default function HeaderSection () {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto‑change slide OK
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, IMAGE_DURATION * 1000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  const handleShopNow = () => {
    router.push("/toys");
  };

  const handleViewBestSellers = () => {
    router.push("/toys"); //?filter=best-sellers  need update
  };

  return (
    <section className="relative w-full  text-white overflow-hidden">
      {/* Background Slideshow OK */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" }, // crossfade
              scale: { duration: IMAGE_DURATION, ease: "linear" }, // slow zoom
            }}
          >
            <Image
              src={currentSlide.image}
              alt="Hero Background"
              fill
              priority={currentIndex === 0}
              className="object-cover"
            />

            {/* Shine effect OK */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: "-200%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                delay: 2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              style={{
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                width: "140%",
                height: "260%",
                transform: "rotate(25deg)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlay for read text OK */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/40 to-black/70" />

      {/* Foreground content OK */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 py-6 md:py-4 flex items-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          {/* Campaign (changes per slide) */}
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-200 backdrop-blur-sm border border-blue-500/20">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-400" />
            <span>{currentSlide.campaign}</span>
          </div>

          {/* Main Heading OK */}
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Discover Safe & <br/> Educational Toys <br/> for Every Age
          </h1>

          {/* Subheading OK */}
          <p className="mt-4 text-base md:text-xl text-gray-200 max-w-xl">
            Handpicked toys trusted by thousands of parents since 2010.
          </p>

          {/* CTA need update */}
         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-3/7 md:w-4/7">
          <button onClick={handleShopNow} className="inline-flex w-full items-center justify-center rounded-full border border-blue-500 bg-blue-500/10 py-3 text-sm md:text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-blue-600 cursor-pointer">
            Shop Now
            </button>
            <button onClick={handleViewBestSellers} className="inline-flex w-full items-center justify-center rounded-full border border-blue-500 bg-blue-500/10 py-3 text-sm md:text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-blue-600 cursor-pointer">
View Best Sellers
</button> 
</div>

          {/* Trust badges OK */}
          <div className="mt-6 flex md:flex-row flex-col gap-4 text-sm ">
            <span>🔒 Secure checkout</span>
            <span>📦 Fast delivery across Bangladesh</span>
            <span>✅ Safety-tested toys only</span>
          </div>
        </div>
      </div>
    </section>
  );
};