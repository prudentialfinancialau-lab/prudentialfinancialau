import { useState } from 'react';

const Header = ({ data = {} }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Default values
  const phone = data?.phone || '+1 (855) 933-9318';
  const email = data?.email || 'support@domain.com';
  const logo = data?.logo || 'Prudential Financial';
  const logoIcon = data?.logoIcon || '🏦';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-gray-900 text-white py-2 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-1">
              <i className="fas fa-phone"></i>
              <span className="hidden sm:inline">Call Us: </span>
              <span>{phone}</span>
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-envelope"></i>
              <span className="hidden sm:inline">Mail: </span>
              <span>{email}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="hover:text-emerald-400 transition-colors"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-emerald-400 transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-emerald-400 transition-colors"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-emerald-400 transition-colors"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">{logoIcon}</span>
              <span>{logo}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">About Us</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Services</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Team</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Blog</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Contact Us</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-emerald-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col p-4 space-y-1">
            <a href="#" className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">About Us</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Services</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Team</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Blog</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Contact Us</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
