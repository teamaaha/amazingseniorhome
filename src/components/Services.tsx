import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import personalCareImg from "@/assets/personal-care.jpg";
import medicationImg from "@/assets/medication-management.jpg";
import housekeepingImg from "@/assets/housekeeping.jpg";
import mealsImg from "@/assets/meals.jpg";

const Services = () => {
  const services = [
    {
      image: personalCareImg,
      title: "Personal Care & Assisted Living",
      description: "Our professional caregivers provide respectful, hands-on assistance with bathing, dressing, grooming, and toileting as part of our comprehensive assisted living services. We focus on maintaining each resident's dignity and comfort while encouraging as much independence as possible. Every interaction in our elderly care facility is guided by patience, compassion, and an understanding of each person's unique preferences and routines.",
    },
    {
      image: medicationImg,
      title: "Medication Management",
      description: "All medications are securely stored and carefully administered according to each resident's physician orders. Our professional caregivers monitor for any changes or side effects and communicate closely with resident's families to ensure safety and consistency in care. This essential senior care service provides peace of mind for families.",
    },
    {
      image: housekeepingImg,
      title: "Housekeeping & Laundry Services",
      description: "We maintain a clean, tidy, and welcoming assisted living environment through professional housekeeping and laundry services. Residents can relax knowing their rooms, linens, and clothing are fresh and well cared for in our senior living facility, helping them feel comfortable and at home every day.",
    },
    {
      image: mealsImg,
      title: "Nutritious Meals & Dining",
      description: "Residents enjoy three nutritious home-cooked meals each day in our assisted living dining room, thoughtfully prepared to meet individual tastes and dietary needs. Snacks and beverages are available throughout the day, and our caregivers provide feeding assistance when needed to ensure every senior resident stays well-nourished and comfortable.",
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <div className="space-y-3 sm:space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Services
            </h2>
            <div className="h-1 w-20 sm:w-24 bg-white" />
            <p className="text-sm sm:text-base md:text-lg text-white">
              Amazing Upscale Senior Home provides 24-hour non-medical care for elderly residents in our California-licensed RCFE. Our assisted living facility is designed to support your loved one in the way they need most, from gentle assistance with daily activities to complete care for individuals who are bedbound or living with Alzheimer's, dementia, and other memory challenges. Our comprehensive senior care services include medication management, personal care, and specialized memory care.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={`${service.title} at Amazing Upscale Senior Living`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
