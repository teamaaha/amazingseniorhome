import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/Full_Logo.png";

const Hero = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("image_url")
        .order("display_order", { ascending: true })
        .limit(1)
        .single();

      if (!error && data) {
        setHeroImage(data.image_url);
      }
    } catch (error) {
      console.error("Error fetching hero image:", error);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Logo and Subtitle Section */}
      <section className="bg-primary pt-28 sm:pt-32 pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-3">
            <div className="flex justify-start">
              <img 
                src={logo} 
                alt="Amazing Upscale Senior Living Logo" 
                className="h-13 sm:h-16 md:h-18 lg:h-21 w-auto brightness-0 invert"
              />
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-white font-semibold">
              Mameleh and Tateleh's Upscale Senior Living
            </p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="bg-background">
        <div className="w-full">
          {heroImage && (
            <img 
              src={heroImage} 
              alt="Compassionate senior care at Amazing Upscale Senior Living" 
              className="w-full h-auto object-cover shadow-soft aspect-video"
            />
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-primary py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed text-left">
              <p>
                At Amazing Upscale Senior Home, we believe home is more than just a place. It is where you feel cared for, respected, and loved. Located in the heart of Canyon Country, Santa Clarita, our California-licensed assisted living facility welcomes a maximum of six residents. This allows us to provide truly personalized attention in a comfortable, family-like setting. Our RCFE (Residential Care Facility for the Elderly) offers comprehensive senior care for all activities of daily living.
              </p>
              
              <p>
                Our experienced caregivers know each resident not only by name and family, but also their favorite foods and stories. We know the importance of taking time to understand their routines, preferences, and loves. Whether it is a perfectly brewed cup of tea or a morning walk in the garden, we love to discover what makes our residents smile. We are equipped to support a wide range of senior care needs, from light assistance with meals, laundry, and daily tasks to comprehensive memory care and dementia care for those who require more specialized attention. Our personalized approach to assisted living ensures your loved one receives the compassionate care they deserve.
              </p>
              
              <p className="text-white font-semibold italic text-base sm:text-lg md:text-xl">
                "Families often tell us they can feel the difference and the peace of knowing their loved one is not just cared for, but truly cared about."
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto bg-white text-primary hover:bg-white/90"
              >
                Contact Us Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  navigate('/about');
                  window.scrollTo(0, 0);
                }}
                className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
