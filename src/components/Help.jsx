const Help = ({ data = {} }) => {
  // Default values
  const title = data?.title || 'We Are Here To Help You';
  const description = data?.description || 'Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo, lacinia eget consectetur sed.';
  const statValue = data?.statValue || '56+';
  const statLabel = data?.statLabel || 'Consulting Awards';
  const image = data?.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop';

  const features = data?.features || [
    {
      icon: "💡",
      title: "Make A New Dream",
      description: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit sed do."
    },
    {
      icon: "📋",
      title: "Create A Plans",
      description: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit sed do."
    },
    {
      icon: "🤝",
      title: "Be A Part Of Community",
      description: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit sed do."
    },
    {
      icon: "💰",
      title: "Pay Principal",
      description: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit sed do."
    },
    {
      icon: "🔒",
      title: "Get Tax Savings",
      description: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit sed do."
    },
    {
      icon: "💳",
      title: "Build Credit",
      description: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit sed do."
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Left Image */}
          <div className="relative">
            <img
              src={image}
              alt="Couple moving"
              className="rounded-xl sm:rounded-2xl shadow-xl w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop';
              }}
            />

            {/* Stats Card */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 bg-emerald-500 text-white px-6 sm:px-7 md:px-8 py-4 sm:py-5 md:py-6 rounded-lg sm:rounded-xl shadow-2xl">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">{statValue}</div>
              <p className="text-xs sm:text-sm font-medium">{statLabel}</p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">{feature.icon}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
