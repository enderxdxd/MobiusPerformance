'use client';

import React, { useState } from 'react';

const brands = [
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/logos/mercedeslogo.jpeg' },
  { id: 'ford', name: 'Ford', logo: '/logos/fordlogo.jpg' },
  { id: 'porsche', name: 'Porsche', logo: '/logos/porschelogo.jpg' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/logos/lambologo.jpg' },
  { id: 'chevrolet', name: 'Chevrolet', logo: '/logos/chevylogo.jpg' },
  { id: 'volkswagen', name: 'Volkswagen', logo: '/logos/volkslogo.jpg' },
  { id: 'bmw', name: 'BMW', logo: '/logos/bmwlogo.jpeg' },
  { id: 'audi', name: 'Audi', logo: '/logos/audilogo.webp' },
];

function BrandGrid() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 px-4">
            Selecione a sua marca
          </h2>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1250px] mx-auto justify-items-center">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className="group relative cursor-pointer w-full max-w-[300px]"
              onClick={() => setSelectedBrand(selectedBrand === brand.id ? null : brand.id)}
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`
              }}
            >
              <div 
                className="relative overflow-hidden rounded-lg transition-all duration-300 aspect-square"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  transform: hoveredBrand === brand.id ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredBrand === brand.id 
                    ? '0 20px 40px rgba(220, 38, 38, 0.3)' 
                    : selectedBrand === brand.id
                    ? '0 10px 30px rgba(220, 38, 38, 0.2)'
                    : '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Image container */}
                <div className="w-full h-full relative">
                  <img 
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{
                      objectPosition: brand.id === 'mercedes' ? 'center 100%' : 'center',
                      filter: hoveredBrand === brand.id 
                        ? 'brightness(1.1) contrast(1.1) saturate(1.2)' 
                        : 'brightness(0.65) contrast(1.15) saturate(0.9) sepia(0.25) hue-rotate(-5deg)'
                    }}
                  />
                  
                  {/* Overlay gradient */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: hoveredBrand === brand.id 
                        ? 'linear-gradient(to top, rgba(220, 38, 38, 0.4), transparent)' 
                        : 'linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)',
                      opacity: hoveredBrand === brand.id ? 1 : 0.8
                    }}
                  />

                  {/* Brand name - appears on hover */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300"
                    style={{
                      transform: hoveredBrand === brand.id ? 'translateY(0)' : 'translateY(20px)',
                      opacity: hoveredBrand === brand.id ? 1 : 0
                    }}
                  >
                    <h3 className="text-white text-2xl font-bold text-center drop-shadow-lg">
                      {brand.name}
                    </h3>
                  </div>

                  {/* Selection indicator */}
                  {selectedBrand === brand.id && (
                    <div 
                      className="absolute top-4 right-4 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
                      style={{
                        animation: 'scaleIn 0.3s ease-out',
                        boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)'
                      }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  )}
                </div>

                {/* Border highlight on hover */}
                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                  style={{
                    border: '2px solid rgba(220, 38, 38, 0.5)',
                    opacity: hoveredBrand === brand.id ? 1 : 0
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export { BrandGrid };
export default BrandGrid;