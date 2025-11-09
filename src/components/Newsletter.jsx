import { useState } from 'react';

const Newsletter = ({ data = {} }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Default values
  const title = data?.title || "Do You Want To Get Update What's Upcoming?";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Subscription failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-emerald-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              {title}
            </h3>
          </div>

          <div className="w-full md:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex-1 md:w-80 lg:w-96 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white"
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-emerald-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message.text && (
              <div className={`mt-3 text-sm sm:text-base font-medium ${message.type === 'success' ? 'text-white' : 'text-red-200'}`}>
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
