import { useState } from 'react';

const Hero = ({ data = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    service: '',
    zipCode: ''
  });

  // Default values
  const breadcrumb = data?.breadcrumb || 'Home / Mortgage Landing Page';
  const title = data?.title || 'Mortgage Is A Great For You';
  const buttonText = data?.buttonText || 'Join with Company';
  const formTitle = data?.formTitle || 'Calculate Your Mortgage';
  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-gray-50 to-white py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <p className="text-emerald-500 font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-xs sm:text-sm">
              {breadcrumb}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-3 mt-6 sm:mt-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium text-sm sm:text-base">{buttonText}</span>
            </div>

            {/* Background Image - Person with coffee */}
            <div className="mt-8 sm:mt-12 hidden lg:block">
              <img
                src={heroImage}
                alt="Happy person with coffee"
                className="rounded-2xl shadow-2xl w-full object-cover h-64 sm:h-80 lg:h-96"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl order-1 lg:order-2">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Loan Amount</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="home-loan">Home Loan</option>
                  <option value="refinance">Refinance</option>
                  <option value="personal-loan">Personal Loan</option>
                </select>
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-emerald-600 transition-colors"
              >
                Calculate Mortgage
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
