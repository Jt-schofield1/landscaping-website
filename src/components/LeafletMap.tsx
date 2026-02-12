"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map
    const map = L.map(mapRef.current, {
      center: [43.1566, -77.6088],
      zoom: 11,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

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
    }).addTo(map);

    // Marker with popup
    const marker = L.marker([43.1566, -77.6088], {
      icon: customIcon,
    }).addTo(map);

    marker.bindPopup(
      `<div style="text-align: center; padding: 4px;">
        <strong style="font-size: 14px; color: #2E7D32;">Adjacent Property Management</strong><br/>
        <span style="font-size: 12px; color: #6b7280;">Rochester, NY &amp; Surrounding Areas</span><br/>
        <a href="tel:5857699008" style="font-size: 12px; color: #4CAF50; text-decoration: none; font-weight: 600;">(585) 769-9008</a>
      </div>`
    );

    // Force map to recalculate size after render
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Also invalidate on window resize
    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-2xl"
      style={{ zIndex: 0 }}
    />
  );
}
