import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ContactBanner from "@/components/ContactBanner";
import SEO from "@/components/SEO";

const AboutPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Amazing Upscale Senior Living",
    "description": "Learn about our licensed residential care facility for the elderly (RCFE) in Canyon Country, California. We provide personalized assisted living, memory care, and 24-hour professional nursing care.",
    "url": "https://amazingseniorhome.com/about"
  };

  return (
    <>
      <SEO
        title="About Us - Amazing Upscale Senior Living | RCFE Licensed Care in Santa Clarita"
        description="Learn about our family-operated assisted living facility in Canyon Country. We provide personalized elderly care, memory care, and 24/7 nursing supervision in a small, homelike setting with maximum 6 residents."
        canonical="https://amazingseniorhome.com/about"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24">
          <About />
          <ContactBanner />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
