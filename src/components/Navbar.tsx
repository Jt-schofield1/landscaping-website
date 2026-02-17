"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Service Area", href: "#service-area" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    // If it's a page link (starts with /), navigate to it
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    // If we're on the homepage, just scroll
    if (pathname === "/") {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate home first then scroll
      router.push("/" + href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || pathname !== "/"
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-3.5 shrink-0 group"
            >
              <div className="relative">
                <Image
                  src="/images/Logo.jpg"
                  alt="Adjacent Property Management"
                  width={44}
                  height={44}
                  className="rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span
                  className={`font-display text-[17px] font-bold tracking-tight leading-none transition-colors duration-500 ${
                    scrolled || pathname !== "/" ? "text-brand-dark" : "text-white"
                  }`}
                >
                  Adjacent
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div
                    className={`h-[2px] w-4 rounded-full transition-colors duration-500 ${
                      scrolled || pathname !== "/" ? "bg-brand-green" : "bg-brand-green-light"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold tracking-[0.15em] uppercase transition-colors duration-500 ${
                      scrolled || pathname !== "/"
                        ? "text-brand-green-dark"
                        : "text-brand-green-light"
                    }`}
                  >
                    Property Management
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href.startsWith("/") ? link.href : link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group/link ${
                    scrolled || pathname !== "/"
                      ? "text-brand-dark/70 hover:text-brand-green-dark"
                      : "text-white/75 hover:text-white"
                  } ${pathname === link.href ? "!text-brand-green-dark" : ""}`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                      pathname === link.href ? "w-5" : "w-0 group-hover/link:w-5"
                    } ${
                      scrolled || pathname !== "/" ? "bg-brand-green-dark" : "bg-brand-green-light"
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:5857699008"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${
                  scrolled || pathname !== "/" ? "text-brand-dark" : "text-white"
                }`}
              >
                <Phone size={15} />
                <span>(585) 769-9008</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="group relative overflow-hidden bg-brand-green text-white px-6 py-2.5 text-sm font-semibold transition-all duration-400 hover:shadow-lg hover:shadow-brand-green/25"
                style={{
                  borderRadius: "12px 24px 12px 24px",
                }}
              >
                <span className="relative z-10">Free Quote</span>
                <div className="absolute inset-0 bg-brand-green-dark translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                scrolled || pathname !== "/"
                  ? "text-brand-dark bg-brand-green/5 hover:bg-brand-green/10"
                  : "text-white bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="text-white text-2xl font-display font-semibold py-3 px-6 hover:text-brand-green-light transition-colors relative group/mob"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 group-hover/mob:w-1 h-6 bg-brand-green-light rounded-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 flex flex-col items-center gap-5"
              >
                <a
                  href="tel:5857699008"
                  className="flex items-center gap-2 text-white/70 text-base"
                >
                  <Phone size={18} />
                  (585) 769-9008
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="relative overflow-hidden bg-brand-green text-white px-10 py-3.5 text-lg font-semibold group"
                  style={{ borderRadius: "14px 28px 14px 28px" }}
                >
                  <span className="relative z-10">Get a Free Quote</span>
                  <div className="absolute inset-0 bg-brand-green-dark translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
