import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Illumineer Vault';
const DEFAULT_DESCRIPTION =
  'Track your Disney Lorcana card collection. Browse cards, build collections by set, color, and character.';
// NOTE: Convert og-default.svg to og-default.png (1200x630) for production.
// Most social media crawlers don't support SVG for og:image.
const DEFAULT_OG_IMAGE = 'https://illumineer-vault.com/og-default.png';
const SITE_URL = 'https://illumineer-vault.com';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullCanonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
