import { Phone, Mail, MapPin, FileText } from "lucide-react";

const ContactBanner = () => {
  return (
    <footer className="sticky bottom-0 left-0 right-0 bg-primary text-primary-foreground shadow-lg z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a 
              href="https://maps.google.com/?q=18847+Thorn+Crest+Ct+Santa+Clarita+CA+91351" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden lg:inline">18847 Thorn Crest Ct, Santa Clarita, CA 91351</span>
              <span className="lg:hidden">Santa Clarita, CA</span>
            </a>
            
            <a 
              href="tel:+12133922325" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Room Inquiries: (213) 392-2325</span>
              <span className="sm:hidden">(213) 392-2325</span>
            </a>
            
            <a 
              href="tel:+16613608505" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>(661) 360-8505</span>
            </a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Fax: (661) 360-8506</span>
            </div>
            
            <a 
              href="mailto:aseniorhomes@gmail.com" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>aseniorhomes@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactBanner;
