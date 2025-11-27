"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg", "/image4.jpg"];

const HeaderSection = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleStart = () => {
    if (session?.user) return router.push("/manage-toys");
    router.push("/login");
  };

  const handleExplore = () => {
    if (session?.user) return router.push("/add-toys");
    router.push("/register");
  };

  const IMAGE_DURATION = 12;
  const TOTAL_CYCLE = IMAGE_DURATION * images.length;

  return (
    <section className="w-full py-8 md:py-16 bg-gradient-to-b from-blue-500 via-blue-400 to-white text-white rounded-b-md overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl">
            <span className="font-bold">Toy Haven</span>
            <br />
            <span className="text-xl md:text-2xl">
              {" "}
              - Buy & Sell Toys Easily
            </span>
          </h1>

          <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl">
            Find the best toy deals, buy/sell your toys, and join a trusted
            online shop.
          </p>

          <div className="mt-8 flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              onClick={handleStart}
              className="btn py-6 w-40 shadow-md text-xl bg-blue-500 text-white hover:bg-blue-700 hover:scale-[1.02] transition"
            >
              {session?.user ? "My Toys" : "Get Started"}
            </button>

            <button
              onClick={handleExplore}
              className="btn py-6 w-40 shadow-md text-xl bg-blue-500 text-white hover:bg-blue-700 hover:scale-[1.02] transition"
            >
              {session?.user ? "Add Toys" : "Register"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start md:font-semibold text-blue-700">
            <span>🔒 Secure transactions</span>
            <span>⚡ Fast listings</span>
            <span>🛒 Trusted ToyShop</span>
          </div>
        </div>

        {/* Right — Ken Burns Slideshow */}
        <div className="w-full lg:w-6/12 flex justify-center">
          <div className="relative w-[600px] h-[400px] overflow-hidden rounded-xl">
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{
                  zIndex: images.length - i,
                }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [1.1, 1.2],
                }}
                transition={{
                  duration: IMAGE_DURATION,
                  delay: i * IMAGE_DURATION,
                  repeat: Infinity,
                  repeatDelay: TOTAL_CYCLE - IMAGE_DURATION,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={src}
                  width={500}
                  height={100}
                  className="w-full h-full object-cover rounded-xl"
                  alt="Banner Image"
                />

                {/* Shine */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-200%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: i * IMAGE_DURATION + 5,
                    repeat: Infinity,
                    repeatDelay: TOTAL_CYCLE - 2,
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
