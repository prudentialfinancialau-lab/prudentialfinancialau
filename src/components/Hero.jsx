const Hero = ({ data = {} }) => {
  // Default values
  const breadcrumb = data?.breadcrumb || 'Home / Mortgage Landing Page';
  const title = data?.title || 'Mortgage Is A Great For You';
  const content = data?.content || '';
  const buttonText = data?.buttonText || 'Join with Company';
  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop';

  return (
    <section id="home" className="relative bg-gradient-to-r from-gray-50 to-white py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-emerald-500 font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-xs sm:text-sm">
              {breadcrumb}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {title}
            </h1>
            {content && (
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {content}
              </p>
            )}
            <div className="flex items-center gap-3 mt-6 sm:mt-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium text-sm sm:text-base">{buttonText}</span>
            </div>
          </div>

          {/* Right Image */}
          <div>
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
      </div>
    </section>
  );
};

export default Hero;
