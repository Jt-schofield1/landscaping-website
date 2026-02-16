"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight, Expand } from "lucide-react";
import Image from "next/image";

const galleryItems = [
  {
    src: "/images/adja.jpg",
    alt: "Beautiful residential landscaping - manicured lawn with mulch beds and brick walkway",
    caption: "Residential Curb Appeal",
    category: "Residential",
  },
  {
    src: "/images/547922570_17907337131227912_3905841548778538970_n.jpg",
    alt: "Stone border garden bed with decorative shrubs and yellow flowers",
    caption: "Garden Bed Installation",
    category: "Hardscape",
  },
  {
    src: "/images/547750537_17907337107227912_2367544317307916057_n.jpg",
    alt: "Completed landscape renovation with stone border and white gravel bed",
    caption: "Landscape Renovation",
    category: "Renovation",
  },
  {
    src: "/images/532995642_17904138912227912_9010220082071991325_n.jpg",
    alt: "Aerial view of commercial property grounds maintenance",
    caption: "Commercial Property Care",
    category: "Commercial",
  },
  {
    src: "/images/gallery-mulch-beds.png",
    alt: "Residential property with fresh dark mulch beds and manicured ornamental shrubs",
    caption: "Mulch Bed Installation",
    category: "Residential",
  },
  {
    src: "/images/gallery-front-yard.png",
    alt: "Beautiful front yard landscaping with Japanese maple, shrubs, and fresh mulch borders",
    caption: "Front Yard Landscaping",
    category: "Residential",
  },
];

const beforeAfter = {
  before: {
    src: "/images/546685773_17907337026227912_8277873945725338556_n.jpg",
    alt: "Before - overgrown landscaping needing renovation",
  },
  after: {
    src: "/images/547750537_17907337107227912_2367544317307916057_n.jpg",
    alt: "After - clean stone border with white gravel and new plantings",
  },
};

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [baSlider, setBaSlider] = useState(50);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryItems.length : null
    );

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-brand-green-dark text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark mb-6"
          >
            Project Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-muted text-lg max-w-2xl mx-auto"
          >
            See the difference our work makes. From residential curb appeal to
            commercial grounds maintenance.
          </motion.p>
        </div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight size={20} className="text-brand-green-dark" />
            <h3 className="font-display text-2xl font-bold text-brand-dark">
              Before & After
            </h3>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-black/10 h-[300px] sm:h-[400px] lg:h-[500px] cursor-col-resize select-none">
            {/* After (full) */}
            <Image
              src={beforeAfter.after.src}
              alt={beforeAfter.after.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${baSlider}%` }}
            >
              <div className="relative w-full h-full" style={{ minWidth: "calc(100vw)" }}>
                <Image
                  src={beforeAfter.before.src}
                  alt={beforeAfter.before.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${baSlider}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <ChevronLeft size={14} className="text-brand-dark" />
                <ChevronRight size={14} className="text-brand-dark" />
              </div>
            </div>
            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
              Before
            </div>
            <div className="absolute top-4 right-4 bg-brand-green/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
              After
            </div>
            {/* Invisible slider input */}
            <input
              type="range"
              min={0}
              max={100}
              value={baSlider}
              onChange={(e) => setBaSlider(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-20"
              aria-label="Before and after comparison slider"
            />
          </div>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 aspect-[4/3]"
            >
              {/* Image - no zoom, brightness shift on hover */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-all duration-500 group-hover:brightness-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Green-tinted overlay that fades in */}
              <div className="absolute inset-0 bg-brand-green-dark/0 group-hover:bg-brand-green-dark/30 transition-all duration-500" />

              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-9 h-9 bg-white/0 group-hover:bg-white/90 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 backdrop-blur-sm">
                <Expand size={16} className="text-brand-dark" />
              </div>

              {/* Caption area */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-brand-green-light text-xs font-semibold tracking-wider uppercase">
                  {item.category}
                </span>
                <p className="text-white font-display text-lg font-semibold">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-[16/10] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center">
              <p className="font-display text-lg font-semibold">
                {galleryItems[lightboxIndex].caption}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {lightboxIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
