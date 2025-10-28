import { useState } from 'react';

const Contact = ({ data = {} }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    suburb: '',
    postcode: '',
    state: '',
    purpose: '',
    comments: ''
  });

  // Default values
  const title = data?.title || 'Contact Us';
  const mapUrl = data?.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564932666!5m2!1sen!2s';
  const location = data?.location || 'New York, NY, USA';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const states = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
  const purposes = [
    'First home buyer',
    'Buying next home',
    'Refinance existing loan',
    'Investing',
    'Debt consolidation',
    'Commercial/business finance',
    'Car loan',
    'Asset/equipment finance',
    'Other'
  ];

  return (
    <section id="contact" className="py-6 sm:py-8 md:py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Left - Contact Form */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* First Name */}
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name *"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                />
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name *"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+614 XX XXX XXX"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                />
              </div>

              {/* Suburb and Postcode */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <input
                    type="text"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleChange}
                    placeholder="Suburb *"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="Postcode *"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">State *:</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Purpose */}
              <div>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Purpose *:</option>
                  {purposes.map(purpose => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>

              {/* Additional Comments */}
              <div>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Additional comments?"
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg text-justify hover:bg-emerald-600 transition-colors uppercase tracking-wide"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* Right - Map */}
          <div className="h-64 sm:h-80 lg:h-full min-h-64 sm:min-h-80 lg:min-h-96 bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full"
              title={`Map of ${location}`}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
