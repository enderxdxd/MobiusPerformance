'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRANDING, LogoVariant, LogoSize } from '@/lib/constants/branding';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  href?: string;
  animated?: boolean;
  priority?: boolean;
}

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-12 w-auto', 
  lg: 'h-16 w-auto',
  xl: 'h-24 w-auto'
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'main',
  size = 'md',
  className = '',
  href = '/',
  animated = false,
  priority = false
}) => {
  const logoConfig = BRANDING.logos[variant];
  
  const logoElement = (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <Image
        src={logoConfig.src}
        alt={logoConfig.alt}
        fill
        className="object-contain"
        priority={priority}
        sizes="(max-width: 768px) 120px, (max-width: 1200px) 160px, 200px"
      />
    </div>
  );

  const animatedLogo = animated ? (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {logoElement}
    </motion.div>
  ) : logoElement;

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {animatedLogo}
      </Link>
    );
  }

  return animatedLogo;
};

// Componente específico para o Hero com animação especial
export const HeroLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative ${className}`}
    >
      <Logo 
        variant="premium" 
        size="xl" 
        href={undefined}
        priority
        className="drop-shadow-2xl"
      />
    </motion.div>
  );
};
