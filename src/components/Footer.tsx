"use client";

import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import Image from "next/image";

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

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Service Area", href: "#service-area" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Yard Cleanup",
  "Mulching",
  "Weeding",
  "Trimming",
  "Debris Removal",
  "Property Maintenance",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-brand-dark text-white">
      {/* Top green accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/Logo.jpg"
                alt="Adjacent Property Management"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <p className="font-display text-lg font-bold">Adjacent</p>
                <p className="text-brand-green-light text-xs tracking-wider uppercase">
                  Property Management
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Transforming Rochester&apos;s outdoor spaces for over 5 years. Professional
              residential and commercial property maintenance you can count on.
            </p>
            <a
              href="https://www.facebook.com/people/Adjacent-Property-Management/61575227498881/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#1877F2] transition-colors text-sm"
              aria-label="Follow us on Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
              <span>Facebook</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-bold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-white/60 hover:text-brand-green-light transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-bold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-bold mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:5857699008"
                  className="flex items-center gap-3 text-white/60 hover:text-brand-green-light transition-colors text-sm"
                >
                  <Phone size={16} className="shrink-0" />
                  (585) 769-9008
                </a>
              </li>
              <li>
                <a
                  href="mailto:adjacentpropertym@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-brand-green-light transition-colors text-sm break-all"
                >
                  <Mail size={16} className="shrink-0" />
                  adjacentpropertym@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <MapPin size={16} className="shrink-0" />
                  Rochester, NY & Surrounding Areas
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Adjacent Property Management. All
            rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/40 hover:text-brand-green-light transition-colors text-sm"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
