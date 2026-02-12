"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

const areas = [
  "Rochester",
  "Irondequoit",
  "Brighton",
  "Pittsford",
  "Penfield",
  "Webster",
  "Greece",
  "Gates",
  "Henrietta",
  "Fairport",
  "Victor",
  "Chili",
];

function MapComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-cream-dark rounded-2xl flex items-center justify-center">
        <div className="animate-pulse text-brand-muted">Loading map...</div>
      </div>
    );
  }

  return <LeafletMap />;
}

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapReady) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mapInstance: any = null;

    const loadMap = async () => {
      const L = (await import("leaflet")).default;

      // Inject Leaflet CSS if not already loaded
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
        // Give CSS a moment to load
        await new Promise((r) => setTimeout(r, 200));
      }

      if (!mapRef.current) return;

      mapInstance = L.map(mapRef.current, {
        center: [43.1566, -77.6088],
        zoom: 11,
        scrollWheelZoom: false,
        attributionControl: true,
        zoomControl: true,
      });

      // OpenStreetMap tiles with a clean style
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(mapInstance);

      // Custom marker icon
      const customIcon = L.divIcon({
        className: "custom-map-marker",
        html: `<div style="
          width: 40px;
          height: 40px;
          background: #2E7D32;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      // Service area circle
      L.circle([43.1566, -77.6088], {
        color: "#4CAF50",
        fillColor: "#4CAF50",
        fillOpacity: 0.08,
        weight: 2,
        opacity: 0.4,
        radius: 16000,
      }).addTo(mapInstance);

      // Marker
      const marker = L.marker([43.1566, -77.6088], {
        icon: customIcon,
      }).addTo(mapInstance);

      marker.bindPopup(
        `<div style="text-align: center; padding: 4px;">
          <strong style="font-size: 14px; color: #2E7D32;">Adjacent Property Management</strong><br/>
          <span style="font-size: 12px; color: #6b7280;">Rochester, NY & Surrounding Areas</span><br/>
          <a href="tel:5857699008" style="font-size: 12px; color: #4CAF50; text-decoration: none; font-weight: 600;">(585) 769-9008</a>
        </div>`
      );

      setMapReady(true);
    };

    loadMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapReady]);

  return <div ref={mapRef} className="w-full h-full rounded-2xl z-0" />;
}

export default function ServiceArea() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="service-area"
      className="relative py-24 sm:py-32 bg-brand-dark grain-overlay"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-brand-green-light text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Where We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Proudly Serving Rochester
            <br />
            <span className="text-brand-green-light">& Surrounding Areas</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10"
          >
            <MapComponent />
          </motion.div>

          {/* Areas List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center">
                <Navigation size={20} className="text-brand-green-light" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Service Areas
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {areas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors"
                >
                  <MapPin size={14} className="text-brand-green-light shrink-0" />
                  <span className="text-white/80 text-sm font-medium">
                    {area}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-brand-green/10 border border-brand-green/20 rounded-2xl p-6">
              <p className="text-white/90 text-sm leading-relaxed">
                Don&apos;t see your area listed? We may still be able to help! Contact
                us to discuss your property&apos;s needs and location.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-brand-green-light text-sm font-semibold mt-3 hover:underline"
              >
                Contact Us
                <Navigation size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
