import { useState } from 'react';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    service: '',
    zipCode: ''
  });

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
    <section className="relative bg-gradient-to-r from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-emerald-500 font-semibold mb-4 uppercase tracking-wide">
              Home / Mortgage Landing Page
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Mortgage Is A<br />
              Great For You
            </h1>
            <div className="flex items-center gap-3 mt-8">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Join with Company</span>
            </div>

            {/* Background Image - Person with coffee */}
            <div className="mt-12">
              <img
                src="/images/hero-person.jpg"
                alt="Happy person with coffee"
                className="rounded-2xl shadow-2xl w-full object-cover h-96"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-white text-2xl font-bold mb-6">Calculate Your Mortgage</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white text-sm block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Loan Amount</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="home-loan">Home Loan</option>
                  <option value="refinance">Refinance</option>
                  <option value="personal-loan">Personal Loan</option>
                </select>
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
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
