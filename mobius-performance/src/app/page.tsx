import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { BrandGrid } from '@/components/home/BrandGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <BrandGrid />
      <ServicesSection />
      
    </div>
  );
}
