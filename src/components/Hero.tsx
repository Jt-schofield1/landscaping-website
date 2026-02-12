"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Leaf, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <Image
          src="/images/adja.jpg"
          alt="Beautiful landscaped property by Adjacent Property Management"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 mb-8"
            style={{ borderRadius: "8px 20px 8px 20px" }}
          >
            <Leaf size={16} className="text-brand-green-light" />
            <span className="text-white/90 text-sm font-medium">
              Serving Rochester, NY for Over 5 Years
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-6"
          >
            Transforming
            <br />
            <span className="text-brand-green-light">Outdoor</span> Spaces
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/80 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Professional residential and commercial property maintenance that
            brings your vision to life. Quality craftsmanship, every yard, every
            time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary CTA - organic asymmetric shape */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("#contact");
              }}
              className="group relative overflow-hidden bg-brand-green text-white px-9 py-4 text-lg font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-brand-green/30 text-center inline-flex items-center justify-center gap-3"
              style={{
                borderRadius: "14px 32px 14px 32px",
              }}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">
                Get a Free Quote
              </span>
              <ArrowRight
                size={18}
                className="relative z-10 transition-all duration-300 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
              />
              <div className="absolute inset-0 bg-brand-green-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>

            {/* Secondary CTA - complementary shape */}
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("#services");
              }}
              className="group relative overflow-hidden border-2 border-white/25 hover:border-white/50 text-white px-9 py-4 text-lg font-semibold transition-all duration-500 backdrop-blur-sm text-center inline-flex items-center justify-center gap-3"
              style={{
                borderRadius: "32px 14px 32px 14px",
              }}
            >
              <span className="relative z-10">Our Services</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
