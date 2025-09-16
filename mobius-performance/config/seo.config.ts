import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'Mobius Performance - Tuning Automotivo Premium',
  description: 'Especialistas em reprogramação ECU, preparação de motores e performance automotiva. Transforme seu carro com a Mobius Performance.',
  canonical: 'https://mobiusperformance.com',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mobiusperformance.com',
    siteName: 'Mobius Performance',
    title: 'Mobius Performance - Tuning Automotivo Premium',
    description: 'Especialistas em reprogramação ECU, preparação de motores e performance automotiva.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mobius Performance',
      },
    ],
  },
  twitter: {
    handle: '@mobiusperf',
    site: '@mobiusperf',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: 'tuning, reprogramação, ECU, performance, automotivo, preparação, motor, turbo, BMW, Mercedes, Audi, Porsche',
    },
    {
      name: 'author',
      content: 'Mobius Performance',
    },
  ],
};
