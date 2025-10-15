import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Mobius Performance - Tuning Automotivo Premium",
  description: "Especialistas em reprogramação ECU, preparação de motores e performance automotiva. Transforme seu carro com a Mobius Performance.",
  keywords: "tuning, reprogramação, ECU, performance, automotivo, preparação, motor, turbo, BMW, Mercedes, Audi, Porsche",
  authors: [{ name: "Mobius Performance" }],
  creator: "Mobius Performance",
  publisher: "Mobius Performance",
  metadataBase: new URL("https://mobiusperformance.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://mobiusperformance.com",
    siteName: "Mobius Performance",
    title: "Mobius Performance - Tuning Automotivo Premium",
    description: "Especialistas em reprogramação ECU, preparação de motores e performance automotiva.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mobius Performance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mobiusperf",
    creator: "@mobiusperf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Meta tags básicas já são gerenciadas pelo Next.js 13+ */}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="min-h-screen">
          <Navbar />
          <main className="lg:ml-64 transition-all duration-300">
            {children}
          </main>
          <div className="lg:ml-64 transition-all duration-300">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}