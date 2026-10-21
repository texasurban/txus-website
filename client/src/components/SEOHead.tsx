import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, any>;
}

/**
 * SEO Head Component
 * 
 * Handles all meta tags, Open Graph tags, canonical URLs, and schema markup.
 * Use this component on every page for consistent SEO implementation.
 * 
 * Example:
 * <SEOHead
 *   title="Sawmilling Services - Custom Lumber Milling | Texas Urban Sawmill"
 *   description="Professional sawmilling services for custom lumber production..."
 *   url="https://txurbansawmill.com/services/sawmilling"
 *   image="https://cdn.../sawmilling-hero.webp"
 *   schema={localBusinessSchema}
 * />
 */
export function SEOHead({
  title,
  description,
  url = typeof window !== 'undefined' ? window.location.href : '',
  canonical,
  image,
  type = 'website',
  schema,
}: SEOHeadProps) {
  // Prefer an explicit canonical URL; fall back to the page URL.
  const canonicalUrl = canonical || url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}

      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
