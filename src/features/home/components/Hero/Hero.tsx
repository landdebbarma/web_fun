"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AnomalousMatterHero } from "@/components/ui/anomalous";
import { Marquee } from "@/components/ui/marquee";
import { ArrowRight, Play } from "lucide-react";

const heroTitles = ["Design", "Build", "Deliver", "With confidence"];

const heroSubheading =
  "Helping Developers turn ideas into production ready systems within minutes - not weeks.";

// marquee logos and texts
const logos = [
  { name: "Google", src: "/logos/" },
  { name: "Microsoft", src: "/logos/microsoft.png" },
  { name: "TCS", src: "/logos/tcs.png" },
  { name: "Infosys", src: "/logos/infosys.png" },
  { name: "Accenture", src: "/logos/accenture.png" },
  { name: "Deloitte", src: "/logos/deloitte.png" },
  { name: "Capgemini", src: "/logos/capgemini.png" },
  { name: "IBM", src: "/logos/ibm.png" },
];

const stats = [
  { number: "10M+", label: "Active Users" },
  { number: "99.9%", label: "Uptime" },
  { number: "50+", label: "Countries" },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroTitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0 px-6 sm:px-8 md:px-20 py-20 md:py-0 min-h-screen">
        {/* TEXT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Beta v1.0.0 Release
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-[0_0_15px_rgba(0,255,100,0.3)] mb-4"
            >
              {heroTitles[index]}
            </motion.h1>
          </AnimatePresence>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mt-4 leading-relaxed max-w-[600px] mb-8">
            {heroSubheading}
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
          >
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:gap-3">
              Get Started
              <ArrowRight size={20} />
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300">
              <Play size={20} />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-[400px] mb-20 sm:mb-0"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center md:items-start"
              >
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {stat.number}
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ANIMATION SIDE */}
        <div className="absolute md:relative inset-0 md:inset-auto w-full md:w-1/2 flex items-center justify-center opacity-30 md:opacity-100 pointer-events-none md:pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-[60vh] md:h-screen flex items-center justify-center"
          >
            <AnomalousMatterHero />
          </motion.div>
        </div>
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:hidden pointer-events-none" />

      {/* MARQUEE */}
      <div className="absolute bottom-0 w-full mt-10">
        <Marquee pauseOnHover speed={30} className="bg-black/40 py-4">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-6 sm:mx-10 opacity-80 hover:opacity-100 transition"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
