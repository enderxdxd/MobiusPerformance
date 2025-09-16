import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { StatsCounter } from '@/components/home/StatsCounter';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <ServicesPreview />
      <StatsCounter />
    </div>
  );
}
