import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Adjacent Property Management | Rochester NY Landscaping & Property Maintenance",
  description:
    "Adjacent Property Management has been serving the Rochester, NY community for over 5 years. Specializing in residential and commercial outdoor property maintenance including yard cleanup, mulching, weeding, trimming, and debris removal.",
  keywords: [
    "landscaping",
    "Rochester NY",
    "property management",
    "yard cleanup",
    "mulching",
    "weeding",
    "trimming",
    "debris removal",
    "lawn care",
    "commercial landscaping",
    "residential landscaping",
  ],
  openGraph: {
    title: "Adjacent Property Management | Rochester NY Landscaping",
    description:
      "Transforming Rochester's outdoor spaces for over 5 years. Residential & commercial property maintenance.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/images/Logo.jpg" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
