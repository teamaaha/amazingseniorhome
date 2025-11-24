import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import floorPlan from "@/assets/floor-plan.webp";

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <div className="space-y-3 sm:space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Home
            </h2>
            <div className="h-1 w-20 sm:w-24 bg-white" />
            <p className="text-sm sm:text-base md:text-lg text-white">
              Take a look at our beautiful facility and welcoming spaces designed for comfort and care.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center p-4">
              <Skeleton className="w-full max-w-4xl h-[600px]" />
            </div>
          ) : galleryImages.length > 0 ? (
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {galleryImages.map((image) => (
                  <CarouselItem key={image.id} className="basis-full">
                    <div className="flex justify-center items-center p-4">
                      <img 
                        src={image.image_url} 
                        alt={image.alt_text || "Gallery image"} 
                        className="w-full h-auto max-h-[600px] object-contain shadow-soft"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <p className="text-center text-white">No gallery images available. Add some in the admin panel!</p>
          )}
          
          <div className="mt-16">
            <div className="mb-8 text-left">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Floor Plan
              </h3>
              <div className="h-1 w-20 bg-white mb-4" />
              <p className="text-white">
                Explore our thoughtfully designed living space with 4 bedrooms, multiple bathrooms, and comfortable common areas.
              </p>
            </div>
            <Card className="overflow-hidden border-border/50 shadow-soft bg-gradient-to-br from-warm-bg to-background/50 p-6 md:p-8">
              <div className="bg-white p-4 shadow-inner">
                <img
                  src={floorPlan} 
                  alt="Floor plan of Amazing Upscale Senior Living facility showing 4 bedrooms, master suite, kitchen, living areas, and garage" 
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
