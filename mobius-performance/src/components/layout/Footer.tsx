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
  Shield
} from 'lucide-react';
import { siteConfig } from '../../../config/site.config';

const footerSections = [
  {
    title: 'Serviços',
    links: [
      { name: 'Reprogramação ECU', href: '/services/ecu-tuning' },
      { name: 'Preparação de Motor', href: '/services/engine-build' },
      { name: 'Turbo & Supercharger', href: '/services/forced-induction' },
      { name: 'Suspensão Esportiva', href: '/services/suspension' },
      { name: 'Escapamento Performance', href: '/services/exhaust' },
    ],
  },
  {
    title: 'Tuning Stages',
    links: [
      { name: 'Stage 1 - ECU', href: '/tuning-stages?stage=1' },
      { name: 'Stage 2 - Hardware', href: '/tuning-stages?stage=2' },
      { name: 'Stage 3 - Turbo', href: '/tuning-stages?stage=3' },
      { name: 'Stage 4 - Motor', href: '/tuning-stages?stage=4' },
    ],
  },
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
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Mobius <span className="text-primary-400">Performance</span>
              </span>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Especialistas em tuning automotivo premium. Transformamos seu veículo 
              com tecnologia de ponta e expertise comprovada.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-300">{siteConfig.contact.address}</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary-400" />
                Horário de Funcionamento
              </h4>
              <div className="space-y-1 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span>{siteConfig.business.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span>{siteConfig.business.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span>{siteConfig.business.hours.sunday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features/Benefits */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg"
            >
              <Settings className="w-8 h-8 text-primary-400" />
              <div>
                <h4 className="font-semibold text-white">Tecnologia Avançada</h4>
                <p className="text-gray-400 text-sm">Equipamentos de última geração</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg"
            >
              <Zap className="w-8 h-8 text-primary-400" />
              <div>
                <h4 className="font-semibold text-white">Performance Máxima</h4>
                <p className="text-gray-400 text-sm">Resultados comprovados</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg"
            >
              <Shield className="w-8 h-8 text-primary-400" />
              <div>
                <h4 className="font-semibold text-white">Garantia Total</h4>
                <p className="text-gray-400 text-sm">Segurança e confiabilidade</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mobius Performance. Todos os direitos reservados.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>

            {/* WhatsApp CTA */}
            <Link
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
