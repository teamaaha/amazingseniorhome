import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Shield } from "lucide-react";
import ownersPhoto from "@/assets/owners-photo.jpg";
import staffPhoto from "@/assets/new-staff-photo.jpg";

const About = () => {
  const caregivers = [
    { name: "Daniel", description: "retired attorney, enjoys spending time chatting with residents and ensuring the smooth, day-to-day operation of the home" },
    { name: "Wendy", description: "former surgical nurse and current hospice nurse, brings her extensive medical knowledge to promote residents' health and well-being. She also mentors the caregiving team" },
    { name: "Mark", description: "busy repairing or improving something around the home" },
    { name: "Irma", description: "in the kitchen making her famous waffles" },
    { name: "Andre", description: "sharing warm conversations with residents" },
    { name: "Nash", description: "spreading cheer with his love of good food" },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-primary">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-4">
            About Our Team
          </h2>
          <div className="h-1 w-20 sm:w-24 bg-white mx-auto" />
        </div>
      </div>

      {/* Images Section - Full Width */}
      <div className="w-full pb-8 sm:pb-10 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6">
            <Card className="md:col-span-3 overflow-hidden border-border/50 shadow-soft bg-gradient-to-br from-warm-bg to-background/50 p-2">
              <div className="overflow-hidden h-64 sm:h-80 md:h-96">
                <img 
                  src={ownersPhoto} 
                  alt="Daniel and Wendy, owners of Amazing Upscale Senior Living" 
                  className="w-full h-full object-contain md:object-cover"
                  loading="lazy"
                />
              </div>
            </Card>
            <Card className="md:col-span-7 overflow-hidden border-border/50 shadow-soft bg-gradient-to-br from-warm-bg to-background/50 p-2">
              <div className="overflow-hidden h-64 sm:h-80 md:h-96">
                <img 
                  src={staffPhoto} 
                  alt="Amazing Upscale Senior Living caregiving team members" 
                  className="w-full h-full object-contain md:object-cover"
                  loading="lazy"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Text Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <Card className="shadow-soft bg-primary p-6 sm:p-8 border-0">
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-white leading-relaxed space-y-4 sm:space-y-6">
              <p>
                The owners and administrators of Amazing Upscale Senior Living are proud to call Canyon Country home. Their commitment to excellent elderly care comes from being part of the same community as their residents. Daniel, a retired attorney, enjoys spending time chatting with residents and ensuring the smooth, day-to-day operation of the assisted living facility. Wendy, a former surgical nurse and current hospice nurse, brings her extensive medical knowledge to promote residents' health and well-being in our California RCFE. She also mentors the caregiving team, sharing techniques and best practices gained throughout her nursing career in senior care and memory care.
              </p>
              
              <p>
                The caregivers at our assisted living home have been part of the family for many years. Their dedication shines through in the skilled, compassionate care they provide every day. You might find Mark busy repairing or improving something around the senior living facility, Irma in the kitchen making her famous waffles, Andre sharing warm conversations with residents, or Nash spreading cheer with his love of good food.
              </p>
              
              <p>
                Amazing Senior Home is a licensed Residential Care Facility for the Elderly (RCFE) under the State of California, serving Santa Clarita, Valencia, Newhall, and surrounding areas. Our assisted living home is designed for up to six residents, allowing us to provide truly personal attention in a warm and supportive setting. We welcome individuals who need a little extra help with daily living, are managing health challenges including Alzheimer's and dementia, or simply want the comfort and companionship of a caring senior living environment.
              </p>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
            <Card className="border-white/20 shadow-card hover:shadow-soft transition-shadow bg-background">
              <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 text-primary">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">Maximum 6 Residents</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Intimate setting for truly personal attention
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/20 shadow-card hover:shadow-soft transition-shadow bg-background">
              <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 text-accent">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">Family-Like Care</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Dedicated team who know each resident by heart
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/20 shadow-card hover:shadow-soft transition-shadow bg-background">
              <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-secondary/30 text-primary">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">Licensed & Professional</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  State-licensed RCFE
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
