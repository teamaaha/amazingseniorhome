import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEO = ({
  title = "Amazing Upscale Senior Living - Assisted Living in Santa Clarita, CA | RCFE Licensed",
  description = "Premier assisted living facility in Canyon Country, Santa Clarita. Personalized elderly care, memory care, and 24/7 professional nursing in a small, family-like setting. California RCFE licensed. Maximum 6 residents.",
  keywords = "assisted living Santa Clarita, senior care Canyon Country, elderly care California, memory care facility, RCFE licensed, residential care facility, nursing care, senior housing, retirement home, assisted living near me, personalized senior care, 24/7 elderly care, small assisted living, boutique senior living, Valencia senior care",
  canonical = "https://amazingseniorhome.com",
  ogType = "website",
  ogImage,
  structuredData,
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
