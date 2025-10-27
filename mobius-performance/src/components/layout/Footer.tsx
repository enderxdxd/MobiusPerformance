'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube,
  Clock,
  Settings,
  Zap,
  Shield,
  MessageCircle
} from 'lucide-react';
import { siteConfig } from '../../../config/site.config';

const footerSections = [
  {
    title: 'Empresa',
    links: [
      { name: 'Sobre Nós', href: '/about' },
      { name: 'Portfólio', href: '/portfolio' },
      { name: 'Depoimentos', href: '/testimonials' },
      { name: 'Blog', href: '/blog' },
      { name: 'Carreiras', href: '/careers' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { name: 'Contato', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Garantia', href: '/warranty' },
      { name: 'Política de Privacidade', href: '/privacy' },
      { name: 'Termos de Uso', href: '/terms' },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-3">
              <img src="/LogoParaDireita.png" alt="Mobius Performance" className="h-8 sm:h-10 md:h-12 w-auto" />
            </Link>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-red-600" />
                <span className="text-gray-300 text-sm">{siteConfig?.contact?.phone || '+5562997024871'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-gray-300 text-sm">{siteConfig?.contact?.email || 'contato@mobiusperformance.com'}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                <span className="text-gray-300 text-sm">{siteConfig?.contact?.address || 'São Paulo, SP'}</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-3 text-base">{section.title}</h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-red-600 active:text-red-600 focus:text-red-600 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center text-base">
              <Clock className="w-4 h-4 mr-2 text-red-600" />
              Horário de Funcionamento
            </h4>
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Segunda - Sexta:</span>
                <span>08:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado:</span>
                <span>08:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span>Fechado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mobius Performance. Todos os direitos reservados.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://instagram.com/mobiusperformance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 active:text-red-600 focus:text-red-600 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://facebook.com/mobiusperformance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 active:text-red-600 focus:text-red-600 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com/mobiusperformance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 active:text-red-600 focus:text-red-600 transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              {/* WhatsApp styled like social icons */}
              <Link
                href="https://wa.me/5562997024871"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 active:text-red-600 focus:text-red-600 transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};