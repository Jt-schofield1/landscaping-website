"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, ExternalLink, MapPin } from "lucide-react";

const JOBBER_URL =
  "https://clienthub.getjobber.com/client_hubs/0b43c1db-c364-4f74-88f5-38f931d30a05/public/work_request/new?source=social_media";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-brand-green-dark text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark mb-6"
          >
            Ready to Transform
            <br />
            <span className="text-brand-green-dark">Your Property?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-muted text-lg max-w-2xl mx-auto"
          >
            Get a free quote today. Fill out our quick request form or reach out
            directly — we&apos;d love to hear about your project.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Phone */}
            <a
              href="tel:5857699008"
              className="group flex items-start gap-5 bg-white rounded-2xl p-6 border border-brand-green/5 hover:border-brand-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/5"
            >
              <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-green/20 transition-colors">
                <Phone size={24} className="text-brand-green-dark" />
              </div>
              <div>
                <p className="text-sm text-brand-muted font-medium mb-1">
                  Call Us
                </p>
                <p className="text-xl font-display font-bold text-brand-dark group-hover:text-brand-green-dark transition-colors">
                  (585) 769-9008
                </p>
                <p className="text-sm text-brand-muted mt-1">
                  Call or text anytime
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:adjacentpropertym@gmail.com"
              className="group flex items-start gap-5 bg-white rounded-2xl p-6 border border-brand-green/5 hover:border-brand-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/5"
            >
              <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-green/20 transition-colors">
                <Mail size={24} className="text-brand-green-dark" />
              </div>
              <div>
                <p className="text-sm text-brand-muted font-medium mb-1">
                  Email Us
                </p>
                <p className="text-lg font-display font-bold text-brand-dark group-hover:text-brand-green-dark transition-colors break-all">
                  adjacentpropertym@gmail.com
                </p>
                <p className="text-sm text-brand-muted mt-1">
                  We&apos;ll respond within 24 hours
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-brand-green/5">
              <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-brand-green-dark" />
              </div>
              <div>
                <p className="text-sm text-brand-muted font-medium mb-1">
                  Location
                </p>
                <p className="text-lg font-display font-bold text-brand-dark">
                  Rochester, NY
                </p>
                <p className="text-sm text-brand-muted mt-1">
                  Serving the Greater Rochester area
                </p>
              </div>
            </div>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Adjacent-Property-Management/61575227498881/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white rounded-2xl p-6 border border-brand-green/5 hover:border-brand-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/5"
            >
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#1877F2]/20 transition-colors">
                <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-display font-bold text-brand-dark group-hover:text-[#1877F2] transition-colors">
                  Follow Us on Facebook
                </p>
                <p className="text-sm text-brand-muted">
                  See our latest projects and updates
                </p>
              </div>
              <ExternalLink
                size={18}
                className="text-brand-muted group-hover:text-[#1877F2] transition-colors"
              />
            </a>
          </motion.div>

          {/* Quote Form CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl border border-brand-green/10 shadow-xl shadow-brand-green/5 overflow-hidden h-full flex flex-col">
              {/* Form Header */}
              <div className="bg-gradient-to-br from-brand-green-dark to-brand-green p-8 text-center">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  Request a Free Quote
                </h3>
                <p className="text-white/80 text-sm">
                  Fill out our quick form and we&apos;ll get back to you within
                  24 hours
                </p>
              </div>

              {/* Embedded Form */}
              <div className="flex-1 p-0">
                <iframe
                  src={JOBBER_URL}
                  title="Request a Quote - Adjacent Property Management"
                  className="w-full border-0"
                  style={{ minHeight: "600px", height: "100%" }}
                  loading="lazy"
                />
              </div>

              {/* Fallback link */}
              <div className="p-4 text-center border-t border-brand-green/5">
                <p className="text-brand-muted text-xs mb-2">
                  Having trouble with the form?
                </p>
                <a
                  href={JOBBER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-green-dark text-sm font-semibold hover:underline"
                >
                  Open Form in New Tab
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
