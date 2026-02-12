"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TreePine,
  Flower2,
  Scissors,
  Trash2,
  Building2,
  Shovel,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Shovel,
    title: "Yard Cleanup",
    description:
      "Complete seasonal yard cleanups to keep your property looking pristine. Spring and fall cleanup, leaf removal, and bed preparation.",
    image: "/images/service-cleanup.jpg",
  },
  {
    icon: TreePine,
    title: "Mulching",
    description:
      "Premium mulch installation to protect your plants, retain moisture, and enhance your landscape's curb appeal year-round.",
    image: "/images/service-mulching.jpg",
  },
  {
    icon: Flower2,
    title: "Weeding",
    description:
      "Thorough weed removal and prevention to keep your garden beds healthy, clean, and free from invasive growth.",
    image: "/images/service-weeding.jpg",
  },
  {
    icon: Scissors,
    title: "Trimming",
    description:
      "Expert hedge, shrub, and ornamental trimming to maintain shape, promote growth, and keep your landscape looking sharp.",
    image: "/images/service-trimming.jpg",
  },
  {
    icon: Trash2,
    title: "Debris Removal",
    description:
      "Fast, reliable removal of storm debris, fallen branches, yard waste, and construction materials from your property.",
    image: "/images/service-debris.jpg",
  },
  {
    icon: Building2,
    title: "Property Maintenance",
    description:
      "Full-service commercial and residential property maintenance programs tailored to your property's unique needs.",
    image: "/images/service-property.jpg",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-white">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-brand-green-dark text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-muted text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From routine maintenance to complete landscape transformations, we
            offer comprehensive outdoor property services for homes and
            businesses across Rochester.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: "easeOut",
                }}
                className="group relative bg-cream rounded-2xl overflow-hidden border border-brand-green/5 hover:border-brand-green/20 transition-all duration-500 hover:shadow-xl hover:shadow-brand-green/5 hover:-translate-y-1"
              >
                {/* Image - no zoom, subtle brightness + green tint on hover */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient overlay - shifts to a green tint on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-brand-dark/10 to-transparent transition-all duration-500 group-hover:from-brand-green-dark/40 group-hover:via-brand-green-dark/5" />

                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-4 bg-brand-green/90 backdrop-blur-sm rounded-xl p-2.5 transition-all duration-300 group-hover:bg-brand-green group-hover:shadow-lg group-hover:shadow-brand-green/30">
                    <Icon size={22} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-green-dark transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
