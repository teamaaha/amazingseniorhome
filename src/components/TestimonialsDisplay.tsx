import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  author: string;
  content: string;
  display_order: number;
}

const TestimonialsDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--background)/0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              What Families Say
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-white mx-auto" />
          </div>
          
          <div className="relative min-h-[320px] sm:min-h-[360px] md:min-h-[380px] px-2">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`absolute inset-x-2 inset-y-0 border-white/20 bg-background shadow-soft transition-all duration-700 ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : index < currentIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12 h-full flex flex-col justify-center">
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary/30 mb-4 sm:mb-5 md:mb-6 flex-shrink-0" />
                  <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed mb-5 sm:mb-6 md:mb-7 italic break-words overflow-wrap-anywhere">
                    "{testimonial.content}"
                  </blockquote>
                  <p className="text-xs sm:text-sm md:text-base text-right text-muted-foreground font-medium break-words">
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-6 sm:w-8"
                      : "bg-white/40 w-2 sm:w-3 hover:bg-white/60"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsDisplay;
