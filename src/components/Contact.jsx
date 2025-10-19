import { useState } from 'react';

const Contact = ({ data = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Default values
  const title = data?.title || 'Contact With Us';
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

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Left - Contact Form */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter your subject"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm block mb-1.5 sm:mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-emerald-600 transition-colors"
              >
                Send Message
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
