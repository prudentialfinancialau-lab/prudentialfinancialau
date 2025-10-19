const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image Section */}
          <div className="relative">
            <img
              src="/images/family.jpg"
              alt="Happy family"
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop';
              }}
            />

            {/* Quote Card Overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-emerald-500 text-white p-6 rounded-xl shadow-2xl">
              <p className="text-lg italic mb-4">
                "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula."
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold">- John Doe, President</p>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Section */}
          <div>
            <p className="text-emerald-500 font-semibold mb-4 uppercase tracking-wide">
              About Our Company
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Should You Choose Us?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-500 mb-2">20+</div>
                <p className="text-gray-700 font-medium">Years Of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-500 mb-2">90%</div>
                <p className="text-gray-700 font-medium">Customer Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
