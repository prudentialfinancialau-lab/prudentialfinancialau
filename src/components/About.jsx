const About = ({ data = {} }) => {
  // Default values
  const label = data?.label || 'About Our Company';
  const title = data?.title || 'Why Should You Choose Us?';
  const paragraph1 = data?.paragraph1 || 'Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.';
  const paragraph2 = data?.paragraph2 || '';
  const quote = data?.quote || 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.';
  const quoteAuthor = data?.quoteAuthor || 'John Doe, President';
  const stat1Value = data?.stat1Value || '20+';
  const stat1Label = data?.stat1Label || 'Years Of Experience';
  const stat2Value = data?.stat2Value || '90%';
  const stat2Label = data?.stat2Label || 'Customer Worldwide';
  const image = data?.image || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop';

  return (
    <section id="about" className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Image Section */}
          <div>
            <img
              src={image}
              alt="Finance consultation"
              className="rounded-xl sm:rounded-2xl shadow-xl w-full h-64 sm:h-80 md:h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop';
              }}
            />
          </div>

          {/* Right Content Section */}
          <div>
            <p className="text-emerald-500 font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-xs sm:text-sm">
              {label}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 text-justify mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {paragraph1}
            </p>
            {paragraph2 && (
              <p className="text-gray-600 text-justify mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {paragraph2}
              </p>
            )}

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
