const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-3xl font-bold">
                <span className="text-emerald-500">≋</span> Levi
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Sustainability Challenge</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Mortgage Calculator</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Home Warranty</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Mortgage & Insurance</a></li>
            </ul>
          </div>
        </div>

        {/* Address Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-400">1250 US-46 Unit 205</p>
              <p className="text-gray-400">Parsippany NJ 07054</p>
              <p className="text-gray-400">United States of America</p>
            </div>
            <div>
              <p className="text-gray-400">support@domain.com</p>
            </div>
            <div>
              <p className="text-gray-400">Terms & Conditions</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2023 Levi Consulting Platform. All Rights Reserved.
          </p>
          <div className="flex gap-2">
            <img src="/images/payment-visa.png" alt="Visa" className="h-8 bg-white rounded px-2" onError={(e) => e.target.style.display = 'none'} />
            <img src="/images/payment-mastercard.png" alt="Mastercard" className="h-8 bg-white rounded px-2" onError={(e) => e.target.style.display = 'none'} />
            <img src="/images/payment-amex.png" alt="Amex" className="h-8 bg-white rounded px-2" onError={(e) => e.target.style.display = 'none'} />
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
