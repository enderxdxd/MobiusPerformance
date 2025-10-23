'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navigation = [
  { 
    name: 'Serviços', 
    href: '/services',
    dropdown: [
      { name: 'Reprogramação ECU', href: '/services/ecu-tuning', icon: '⚡' },
      { name: 'Preparação de Motor', href: '/services/engine-build', icon: '🔧' },
      { name: 'Turbo & Supercharger', href: '/services/forced-induction', icon: '🌪️' },
      { name: 'Suspensão Esportiva', href: '/services/suspension', icon: '🏎️' },
      { name: 'Escapamento Performance', href: '/services/exhaust', icon: '💨' },
    ]
  },
  { 
    name: 'Tuning Stages', 
    href: '/tuning-stages',
    dropdown: [
      { name: 'Stage 1', href: '/tuning-stages?stage=1', desc: 'Até +30% potência' },
      { name: 'Stage 2', href: '/tuning-stages?stage=2', desc: 'Até +50% potência' },
      { name: 'Stage 3', href: '/tuning-stages?stage=3', desc: 'Até +80% potência' },
      { name: 'Stage 4', href: '/tuning-stages?stage=4', desc: 'Full Build' },
    ]
  },
  { name: 'Portfólio', href: '/portfolio' },
  { name: 'Sobre', href: '/about' },
  { name: 'Contato', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
<<<<<<< Updated upstream
=======
  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on home, prevent full reload and smooth scroll to top
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
>>>>>>> Stashed changes

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownToggle = useCallback((name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  }, []);

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isDropdownOpen = activeDropdown === item.name;

    if (hasDropdown) {
      return (
        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => handleDropdownToggle(item.name)}
            className={`
              flex items-center justify-between w-full px-4 py-3 text-base font-semibold rounded-lg
              transition-all duration-300 group relative overflow-hidden
              ${isActive 
                ? 'text-red-600' 
                : 'text-white hover:text-red-600 active:text-red-600 focus:text-red-600'
              }
            `}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            whileHover={{ 
              scale: 1.03, 
              x: 8,
              transition: { type: 'spring', stiffness: 500, damping: 20 }
            }}
            whileTap={{ 
              scale: 0.97,
              transition: { duration: 0.1 }
            }}
          >
            <span className="relative z-10">{item.name}</span>
            <motion.div
              className="relative z-10"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
            
          </motion.button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 ml-4 space-y-1 border-l-2 border-gray-700 pl-2">
                  {item.dropdown.map((subItem: any) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <motion.div
                        key={subItem.name}
                        whileHover={{ 
                          scale: 1.03, 
                          x: 8,
                          transition: { type: 'spring', stiffness: 500, damping: 20 }
                        }}
                        whileTap={{ 
                          scale: 0.97,
                          transition: { duration: 0.1 }
                        }}
                      >
                        <Link
                          href={subItem.href}
                          className={`
                            block px-4 py-2.5 text-base rounded-md transition-all duration-300 relative overflow-hidden group min-h-[44px] flex items-center
                            ${isSubActive 
                              ? 'text-red-600 font-semibold' 
                              : 'text-white hover:text-red-600 active:text-red-600 focus:text-red-600 font-medium'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-2">
                              
                              <span>{subItem.name}</span>
                            </div>
                            {subItem.desc && (
                              <span className="text-xs text-gray-400">{subItem.desc}</span>
                            )}
                          </div>
                          
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <motion.div
        whileHover={{ 
          scale: 1.03, 
          x: 8,
          transition: { type: 'spring', stiffness: 500, damping: 20 }
        }}
        whileTap={{ 
          scale: 0.97,
          transition: { duration: 0.1 }
        }}
      >
        <Link
          href={item.href}
          className={`
            block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group min-h-[44px] flex items-center
            ${isActive 
              ? 'text-red-600' 
              : 'text-white hover:text-red-600 active:text-red-600 focus:text-red-600'
            }
          `}
        >
          <span className="relative z-10">{item.name}</span>
          
        </Link>
      </motion.div>
    );
  };

  // Desktop Navbar - Left Side
  if (!isMobile) {
    return (
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-0 left-0 h-full w-64 z-50 overflow-x-hidden"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)' }}
      >
        <div className="h-full backdrop-blur-md border-r border-white/10">
          <div className="flex flex-col h-full px-4 py-6">
            {/* Logo */}
            <div className="mb-8 px-4">
              <Link href="/" onClick={handleLogoClick}>
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    transition: { 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 15 
                    }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 10 
                    }
                  }}
                  className="cursor-pointer inline-block"
                >
                  <motion.img 
                    src="/LogoMobiusALLWHITE.png" 
                    alt="Logo" 
                    className="w-14 h-auto"
                    whileHover={{
                      filter: "brightness(1.15)",
                      transition: { duration: 0.3, ease: 'easeInOut' }
                    }}
                  />
                </motion.div>
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-transparent">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavItem item={item} />
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div 
              className="mt-4"
              whileHover={{ 
                scale: 1.06,
                transition: { type: 'spring', stiffness: 500, damping: 20 }
              }}
              whileTap={{ 
                scale: 0.94,
                transition: { duration: 0.1 }
              }}
            >
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full bg-black hover:bg-red-600 active:bg-red-600 focus:bg-red-600 text-white border-2 border-white/20 hover:border-red-600 active:border-red-600 focus:border-red-600 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-black/50 relative overflow-hidden group min-h-[44px]"
              >
                <Phone className="w-5 h-5 relative z-10" />
                <span className="relative z-10 text-base">Orçamento</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    );
  }

  // Mobile Menu
  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)' }}
      >
        <div className="flex items-center justify-between px-4 py-4 backdrop-blur-md">
          <Link href="/" onClick={handleLogoClick}>
            <img 
              src="/LogoMobiusALLWHITE.png"  
              alt="Logo" 
              className="w-9 h-auto"
            />
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-red-600/20 rounded-lg transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
<<<<<<< Updated upstream
              className="fixed top-0 left-0 bottom-0 w-80 z-50 overflow-y-auto"
              style={{ backgroundColor: 'rgba(30, 30, 30, 0.4)' }}
=======
              className="fixed top-0 left-0 bottom-0 w-80 z-50 overflow-y-auto overflow-x-hidden"
              style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)' }}
>>>>>>> Stashed changes
            >
              <div className="flex flex-col h-full p-6 backdrop-blur-md">
                <div className="mb-8">
                  <img 
                    src="/LogoMobiusALLWHITE.png" 
                    alt="Logo" 
                    className="w-12 h-auto mx-auto"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  {navigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </div>

                <Link
                  href="/contact"
<<<<<<< Updated upstream
                  className="flex items-center justify-center gap-2 w-full bg-black hover:bg-gray-900 text-white border-2 border-white/20 hover:border-white/40 px-4 py-3 rounded-lg font-medium mt-4 transition-all duration-300 shadow-lg shadow-black/50"
=======
                  className="flex items-center justify-center gap-2 w-full bg-black hover:bg-red-600 active:bg-red-600 focus:bg-red-600 text-white border-2 border-white/20 hover:border-red-600 active:border-red-600 focus:border-red-600 px-4 py-3 rounded-lg font-medium mt-4 transition-all duration-300 shadow-lg shadow-black/50 min-h-[44px]"
>>>>>>> Stashed changes
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-base">Orçamento Grátis</span>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};