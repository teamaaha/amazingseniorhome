import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import emblem from "@/assets/Emblem1.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = ["services", "testimonials", "gallery"];
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Gallery", path: "/gallery" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm shadow-md`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img src={emblem} alt="Amazing Upscale Senior Living" className="h-12 w-12" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <Button 
                      variant="ghost" 
                      className={`font-medium ${location.pathname === item.path ? 'text-primary' : ''}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <Link to="/auth">
                  <Button variant="outline">
                    Admin
                  </Button>
                </Link>
                <Button onClick={() => scrollToSection("contact")}>
                  Contact
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-foreground p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Separate from nav */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-50 md:hidden py-4 border-t border-border bg-background shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link key={item.label} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start font-medium ${
                        location.pathname === item.path ? 'text-primary' : ''
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    Admin
                  </Button>
                </Link>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full"
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
