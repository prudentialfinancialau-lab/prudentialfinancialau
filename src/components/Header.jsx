import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data = {} }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Default values
  const phone = data?.phone || '+1 (855) 933-9318';
  const email = data?.email || 'support@domain.com';
  const logo = data?.logo || '/logo.svg';
  const facebookUrl = data?.facebookUrl || 'https://facebook.com';
  const twitterUrl = data?.twitterUrl || 'https://twitter.com';
  const linkedinUrl = data?.linkedinUrl || 'https://linkedin.com';
  const youtubeUrl = data?.youtubeUrl || 'https://youtube.com';

  return (
    <header className="bg-white shadow-md border-b-4 border-emerald-500 sticky top-0 z-50">
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
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors"><i className="fab fa-facebook-f"></i></a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors"><i className="fab fa-twitter"></i></a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors"><i className="fab fa-linkedin-in"></i></a>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 sm:h-12 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">About Us</Link>
            <Link to="/services" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Our Services</Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors">Contact Us</Link>
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
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">About Us</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Our Services</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-emerald-500 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors">Contact Us</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
