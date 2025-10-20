const About = ({ data = {} }) => {
  // Default values
  const label = data?.label || 'About Our Company';
  const title = data?.title || 'Why Should You Choose Us?';
  const paragraph1 = data?.paragraph1 || 'Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.';
  const paragraph2 = data?.paragraph2 || 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat.';
  const quote = data?.quote || 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.';
  const quoteAuthor = data?.quoteAuthor || 'John Doe, President';
  const stat1Value = data?.stat1Value || '20+';
  const stat1Label = data?.stat1Label || 'Years Of Experience';
  const stat2Value = data?.stat2Value || '90%';
  const stat2Label = data?.stat2Label || 'Customer Worldwide';
  const image = data?.image || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop';

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Image Section */}
          <div className="relative">
            <img
              src={image}
              alt="Happy family"
              className="rounded-xl sm:rounded-2xl shadow-xl w-full h-64 sm:h-80 md:h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop';
              }}
            />

            {/* Quote Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 bg-emerald-500 text-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-2xl">
              <p className="text-sm sm:text-base md:text-lg italic mb-3 sm:mb-4 leading-relaxed">
                "{quote}"
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xs sm:text-sm md:text-base">- {quoteAuthor}</p>
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Section */}
          <div>
            <p className="text-emerald-500 font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-xs sm:text-sm">
              {label}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {paragraph1}
            </p>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {paragraph2}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-500 mb-1 sm:mb-2">{stat1Value}</div>
                <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">{stat1Label}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-500 mb-1 sm:mb-2">{stat2Value}</div>
                <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">{stat2Label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
