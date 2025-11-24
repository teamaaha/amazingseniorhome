import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import ContactBanner from "@/components/ContactBanner";
import SEO from "@/components/SEO";

const ServicesPage = () => {
  return (
    <>
      <SEO 
        title="Our Services - Amazing Upscale Senior Living"
        description="Comprehensive senior care services including personal care, medication management, housekeeping, and nutritious meals at Amazing Upscale Senior Living."
        keywords="senior care services, personal care, medication management, housekeeping, senior living meals"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28">
          <Services />
          <ContactBanner />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
