'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navigation = [
  { name: 'Início', href: '/' },
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
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <button
            onClick={() => handleDropdownToggle(item.name)}
            className={`
              flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg
              transition-all duration-200 group
              ${isActive 
                ? 'text-red-400 bg-red-500/10 border border-red-500/20' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }
            `}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <span>{item.name}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
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
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`
                          block px-4 py-2.5 text-sm rounded-md transition-all duration-200
                          ${isSubActive 
                            ? 'text-red-400 bg-red-500/10 font-medium' 
                            : 'text-gray-400 hover:text-red-400 hover:bg-gray-800/30'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {subItem.icon && <span>{subItem.icon}</span>}
                            <span>{subItem.name}</span>
                          </div>
                          {subItem.desc && (
                            <span className="text-xs text-gray-500">{subItem.desc}</span>
                          )}
                        </div>
                      </Link>
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
      <Link
        href={item.href}
        className={`
          block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
          ${isActive 
            ? 'text-red-400 bg-red-500/10 border border-red-500/20' 
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
          }
        `}
      >
        {item.name}
      </Link>
    );
  };

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`
          fixed top-0 left-0 h-full z-50 
          transition-all duration-300
          ${scrolled ? 'w-20' : 'w-64'}
        `}
      >
        <div className={`
          h-full backdrop-blur-md border-r
          ${scrolled 
            ? 'bg-gray-900/98 border-gray-700/50' 
            : 'bg-gray-900/95 border-gray-700'
          }
        `}>
          <div className="flex flex-col h-full px-4 py-6">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ scale: scrolled ? 0.8 : 1 }}
                className="relative"
              >
                {scrolled ? (
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                ) : (
                  <Logo 
                    variant="main"
                    size="md"
                    animated={true}
                    priority={true}
                    className="transition-all duration-300"
                  />
                )}
                {!scrolled && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -right-2 -bottom-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"
                  />
                )}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto space-y-2">
              <AnimatePresence mode="wait">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {scrolled ? (
                      <Link
                        href={item.href}
                        className="flex items-center justify-center p-3 text-gray-400 hover:text-red-400 hover:bg-gray-800/50 rounded-lg transition-all"
                        title={item.name}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    ) : (
                      <NavItem item={item} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.div
              animate={{ scale: scrolled ? 0.9 : 1 }}
              className="mt-4"
            >
              <Link
                href="/contact"
                className={`
                  flex items-center justify-center gap-2 w-full
                  bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                  text-white px-4 py-3 rounded-lg font-medium
                  transition-all duration-200 shadow-lg shadow-red-500/20
                  ${scrolled ? 'text-xs' : 'text-sm'}
                `}
              >
                <Phone className="w-4 h-4" />
                {!scrolled && <span>Orçamento</span>}
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
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'bg-gray-900/98 backdrop-blur-md' : 'bg-transparent'}
        `}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Logo 
            variant="main"
            size="sm"
            animated={true}
            priority={true}
          />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-gray-800/50 rounded-lg transition-colors"
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
              className="fixed top-0 left-0 bottom-0 w-80 bg-gray-900 z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full p-6">
                <div className="mb-8">
                  <Logo 
                    variant="main"
                    size="md"
                    animated={true}
                    priority={true}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  {navigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-medium mt-4"
                >
                  <Phone className="w-4 h-4" />
                  <span>Orçamento Grátis</span>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
