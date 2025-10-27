const Footer = ({ data = {} }) => {
  // Default values
  const logo = data?.logo || '/logo.svg';
  const description = data?.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  // Handle address - it can be an object or a string
  const address = data?.address;
  const addressLine1 = typeof address === 'object' ? (address?.line1 || '1250 US-46 Unit 205') : '1250 US-46 Unit 205';
  const addressLine2 = typeof address === 'object' ? (address?.line2 || 'Parsippany NJ 07054') : 'Parsippany NJ 07054';
  const addressLine3 = typeof address === 'object' ? (address?.line3 || 'United States of America') : 'United States of America';

  const email = data?.email || 'support@domain.com';
  const copyright = data?.copyright || '© 2025 Prudential Financial. All Rights Reserved.';

  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-3 sm:mb-4">
              <img src={logo} alt="Logo" className="h-10 sm:h-12 object-contain" />
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {description}
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors text-sm sm:text-base">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors text-sm sm:text-base">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors text-sm sm:text-base">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors text-sm sm:text-base">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">About Us</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Our Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Our Services</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Home Loans</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">SMSF Loans</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Commercial Loans</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Personal Loans</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Vehicle Loans</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="tel:0385554063" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">03 8555 4063</a></li>
              <li><a href="mailto:info@prudentialfinancial.com.au" className="text-gray-400 hover:text-emerald-500 transition-colors text-xs sm:text-sm break-words">info@prudentialfinancial.com.au</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm sm:text-base">Get In Touch</a></li>
            </ul>
          </div>
        </div>

        {/* Address Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div>
              <p className="text-gray-400">{addressLine1}</p>
              <p className="text-gray-400">{addressLine2}</p>
              <p className="text-gray-400">{addressLine3}</p>
            </div>
            <div>
              <p className="text-gray-400">{email}</p>
            </div>
            <div>
              <p className="text-gray-400">Terms & Conditions</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            {copyright}
          </p>
          <div className="flex gap-2">
            <img src="/images/payment-visa.png" alt="Visa" className="h-6 sm:h-8 bg-white rounded px-1.5 sm:px-2" onError={(e) => e.target.style.display = 'none'} />
            <img src="/images/payment-mastercard.png" alt="Mastercard" className="h-6 sm:h-8 bg-white rounded px-1.5 sm:px-2" onError={(e) => e.target.style.display = 'none'} />
            <img src="/images/payment-amex.png" alt="Amex" className="h-6 sm:h-8 bg-white rounded px-1.5 sm:px-2" onError={(e) => e.target.style.display = 'none'} />
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg text-lg sm:text-xl"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
