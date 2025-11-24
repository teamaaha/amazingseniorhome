import fullLogo from "@/assets/Full_Logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start mb-6">
            {/* Logo */}
            <div className="flex items-start">
              <img 
                src={fullLogo} 
                alt="Amazing Upscale Senior Living" 
                className="h-16 w-auto filter invert brightness-0 invert"
              />
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-base mb-2">Contact Us</h3>
              <div className="space-y-0.5 text-base">
                <p>For Inquiries: <a href="tel:+12133922325" className="hover:underline">213-392-2325</a></p>
                <p>Fax: <a href="tel:+16613608506" className="hover:underline">661-360-8506</a></p>
              </div>
            </div>

            {/* Address and Email */}
            <div>
              <div className="space-y-0.5 text-base">
                <p>
                  <a 
                    href="https://maps.google.com/?q=18847+Thorncrest+Ct+Santa+Clarita+CA+91351" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline font-bold"
                  >
                    18847 Thorncrest Ct.<br />
                    Santa Clarita, CA 91351
                  </a>
                </p>
                <p>
                  <a href="mailto:aseniorhomes@gmail.com" className="hover:underline">
                    aseniorhomes@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm">
              © {new Date().getFullYear()} Amazing Upscale Senior Living. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
