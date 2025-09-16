import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { StatsCounter } from '@/components/home/StatsCounter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesPreview />
      <StatsCounter />
    </div>
  );
}
