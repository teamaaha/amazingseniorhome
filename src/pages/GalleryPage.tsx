import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import ContactBanner from "@/components/ContactBanner";
import SEO from "@/components/SEO";

const GalleryPage = () => {
  return (
    <>
      <SEO 
        title="Photo Gallery - Amazing Upscale Senior Living"
        description="View photos of our beautiful senior living facility, comfortable living spaces, activities, and caring community at Amazing Upscale Senior Living."
        keywords="senior living photos, facility gallery, senior care facility images, upscale senior living"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28">
          <Gallery />
          <ContactBanner />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GalleryPage;
