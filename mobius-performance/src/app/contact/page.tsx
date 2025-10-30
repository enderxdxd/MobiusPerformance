'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefone',
    info: '+55 62 99702-4871',
    link: 'tel:+5511999999999'
  },
  {
    icon: Mail,
    title: 'Email',
    info: 'contato@mobiusmotorsports.com',
    link: 'mailto:contato@mobiusmotorsports.com'
  },
  {
    icon: MapPin,
    title: 'Endereço',
    info: 'Rua da Performance, 123 - São Paulo, SP',
    link: 'https://maps.google.com'
  },
  {
    icon: Clock,
    title: 'Horário',
    info: 'Seg-Sex: 8h-18h | Sáb: 8h-12h',
    link: null
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    message: ''
  });

  const [isHovered, setIsHovered] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Video */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="videoContactUs.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-4xl">
            <div className="overflow-hidden mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white animate-[slideUp_1s_ease-out]">
                Entre em <span className="text-red-600">Contato</span>
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-300 animate-[slideUp_1s_ease-out_0.2s_both]">
                Transforme seu veículo em uma máquina de alta performance
              </p>
            </div>
            {/* Animated Line */}
            <div className="w-32 h-1 bg-red-600 mx-auto mt-8 animate-[expandWidth_1s_ease-out_0.4s_both]"></div>
          </div>
        </div>


      </section>

      {/* Contact Info Cards */}
      <section className="py-20 relative">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 transition-all duration-500 hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:-translate-y-2"
                  style={{
                    animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Red Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent transition-all duration-500 ${
                      isHovered === index ? 'border-r-red-600' : 'border-r-transparent'
                    }`}></div>
                  </div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isHovered === index 
                        ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                        : 'bg-white'
                    }`}>
                      <Icon className={`w-8 h-8 transition-colors duration-500 ${
                        isHovered === index ? 'text-white' : 'text-black'
                      }`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a 
                      href={item.link}
                      className="text-gray-400 hover:text-red-600 transition-colors duration-300 text-sm"
                    >
                      {item.info}
                    </a>
                  ) : (
                    <p className="text-gray-400 text-sm">{item.info}</p>
                  )}

                  {/* Bottom Line Animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              );
            })}
          </div>

          {/* Form and WhatsApp Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form - 3 columns */}
            <div 
              className="lg:col-span-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 lg:p-10"
              style={{ animation: 'fadeInLeft 0.8s ease-out 0.4s both' }}
            >
              <div className="mb-8">
                <h2 className="text-4xl font-black text-white mb-3">
                  Solicite seu <span className="text-red-600">Orçamento</span>
                </h2>
                <div className="w-20 h-1 bg-red-600"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-all duration-300 peer"
                      placeholder="Nome Completo *"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 peer-focus:w-full transition-all duration-300"></div>
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-all duration-300 peer"
                      placeholder="Email *"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 peer-focus:w-full transition-all duration-300"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-all duration-300 peer"
                      placeholder="Telefone *"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 peer-focus:w-full transition-all duration-300"></div>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-all duration-300 peer"
                      placeholder="Veículo (Ex: BMW M3 F80)"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 peer-focus:w-full transition-all duration-300"></div>
                  </div>
                </div>

                <div className="relative group">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none transition-all duration-300 appearance-none cursor-pointer peer"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="ecu-tuning">Reprogramação ECU</option>
                    <option value="engine-build">Preparação de Motor</option>
                    <option value="turbo">Turbo & Supercharger</option>
                    <option value="suspension">Suspensão Esportiva</option>
                    <option value="exhaust">Escapamento Performance</option>
                    <option value="other">Outro</option>
                  </select>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 peer-focus:w-full transition-all duration-300"></div>
                </div>

                <div className="relative group">
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-all duration-300 resize-none peer"
                    placeholder="Conte-nos mais sobre seu projeto..."
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 peer-focus:w-full transition-all duration-300"></div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full bg-red-600 hover:bg-red-700 text-white px-8 py-5 rounded-lg font-bold text-lg transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    ENVIAR MENSAGEM
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>

            {/* WhatsApp & Map - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* WhatsApp */}
              <div 
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 hover:border-green-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                style={{ animation: 'fadeInRight 0.8s ease-out 0.5s both' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-black text-white">Atendimento Rápido</h3>
                </div>
                <div className="w-16 h-1 bg-green-500 mb-6"></div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Precisa de uma resposta rápida? Entre em contato via WhatsApp 
                  e receba atendimento imediato.
                </p>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Chamar no WhatsApp
                </a>
              </div>

              {/* Map */}
              <div 
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 hover:border-red-600 transition-all duration-500"
                style={{ animation: 'fadeInRight 0.8s ease-out 0.6s both' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-black text-white">Nossa Localização</h3>
                </div>
                <div className="w-16 h-1 bg-red-600 mb-6"></div>
                <div className="h-64 bg-black border-2 border-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden group">
                  {/* Animated Grid */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, #dc2626 20px, #dc2626 21px),
                                       repeating-linear-gradient(90deg, transparent, transparent 20px, #dc2626 20px, #dc2626 21px)`,
                      backgroundSize: '40px 40px',
                      animation: 'gridMove 20s linear infinite'
                    }}></div>
                  </div>
                  
                  <div className="text-center text-gray-400 relative z-10">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <p className="font-bold text-white mb-1">Rua da Performance, 123</p>
                    <p className="text-sm">São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 8rem;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gridMove {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(40px, 40px);
          }
        }
      `}</style>
    </div>
  );
}