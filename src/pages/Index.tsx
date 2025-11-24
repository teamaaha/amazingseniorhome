import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TestimonialsDisplay from "@/components/TestimonialsDisplay";
import BlogDisplay from "@/components/BlogDisplay";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SeniorCareService",
    "name": "Amazing Upscale Senior Living",
    "alternateName": "Mameleh and Tateleh's Upscale Senior Living",
    "description": "Licensed residential care facility for the elderly (RCFE) in Canyon Country, California offering personalized assisted living, memory care, medication management, and 24-hour professional nursing care in a small, homelike environment with maximum 6 residents.",
    "url": "https://amazingseniorhome.com",
    "telephone": "+16613608505",
    "email": "aseniorhomes@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "18847 Thorn Crest Ct",
      "addressLocality": "Santa Clarita",
      "addressRegion": "CA",
      "postalCode": "91351",
      "addressCountry": "US"
    },
    "areaServed": ["Santa Clarita", "Canyon Country", "Valencia", "Newhall"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "2"
    }
  };

  return (
    <>
      <SEO
        title="Amazing Upscale Senior Living - Assisted Living in Santa Clarita, CA | RCFE Licensed"
        description="Premier assisted living facility in Canyon Country, Santa Clarita. Personalized elderly care, memory care, and 24/7 professional nursing in a small, family-like setting. California RCFE licensed. Maximum 6 residents."
        canonical="https://amazingseniorhome.com"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <TestimonialsDisplay />
        <BlogDisplay />
        <Footer />
      </div>
    </>
  );
};

export default Index;
