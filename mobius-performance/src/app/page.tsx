import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { StatsCounter } from '@/components/home/StatsCounter';
import { BrandGrid } from '@/components/home/BrandGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <BrandGrid />
      <ServicesPreview />
      <StatsCounter />
    </div>
  );
}
