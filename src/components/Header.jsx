import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span>Call Us: +1 (855) 933-9318</span>
            <span>Mail: support@domain.com</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-emerald-400"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-emerald-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-emerald-400"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-emerald-400"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-3xl font-bold text-gray-900">
              <span className="text-emerald-500">≋</span> Levi
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium">About Us</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium">Services</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium">Team</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium">Blog</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 font-medium">Contact Us</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-emerald-500 font-medium">Sign In</button>
            <button className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 font-medium">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-4 p-4">
            <a href="#" className="text-gray-700 hover:text-emerald-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500">About Us</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500">Services</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500">Team</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500">Blog</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500">Contact Us</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
