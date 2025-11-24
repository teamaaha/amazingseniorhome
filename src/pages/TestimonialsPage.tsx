import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialsDisplay from "@/components/TestimonialsDisplay";
import ContactBanner from "@/components/ContactBanner";
import SEO from "@/components/SEO";

const TestimonialsPage = () => {
  return (
    <>
      <SEO 
        title="Testimonials - Amazing Upscale Senior Living"
        description="Read testimonials and reviews from families who have chosen Amazing Upscale Senior Living for their loved ones. Hear about our exceptional care and community."
        keywords="senior living testimonials, reviews, family feedback, senior care reviews"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28">
          <TestimonialsDisplay />
          <ContactBanner />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TestimonialsPage;
