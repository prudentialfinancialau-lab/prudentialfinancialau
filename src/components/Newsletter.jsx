import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-emerald-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              Do You Want To Get Update<br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>What's Upcoming?
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex-1 md:w-80 lg:w-96 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-emerald-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
