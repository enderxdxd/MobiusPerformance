import Head from 'next/head';
import { BRANDING } from '@/lib/constants/branding';

interface BrandMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const BrandMetadata: React.FC<BrandMetadataProps> = ({
  title,
  description = BRANDING.brand.description,
  image = '/mobius-logo-premium.png',
  url = 'https://mobiusmotorsports.com'
}) => {
  const fullTitle = title 
    ? `${title} | ${BRANDING.brand.name}` 
    : `${BRANDING.brand.name} - ${BRANDING.brand.tagline}`;

  return (
    <Head>
      {/* Favicons */}
      <link rel="icon" href={BRANDING.favicon.ico} />
      <link rel="icon" type="image/png" sizes="16x16" href={BRANDING.favicon.png16} />
      <link rel="icon" type="image/png" sizes="32x32" href={BRANDING.favicon.png32} />
      <link rel="apple-touch-icon" href={BRANDING.favicon.appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="192x192" href={BRANDING.favicon.androidChrome192} />
      <link rel="icon" type="image/png" sizes="512x512" href={BRANDING.favicon.androidChrome512} />

      {/* Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content={BRANDING.brand.colors.primary} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={BRANDING.brand.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Brand Colors for Browser UI */}
      <meta name="msapplication-TileColor" content={BRANDING.brand.colors.primary} />
      <meta name="msapplication-navbutton-color" content={BRANDING.brand.colors.primary} />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
  );
};
