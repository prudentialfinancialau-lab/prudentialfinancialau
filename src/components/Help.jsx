const Help = () => {
  const features = [
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Image */}
          <div className="relative">
            <img
              src="/images/couple.jpg"
              alt="Couple moving"
              className="rounded-2xl shadow-xl w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop';
              }}
            />

            {/* Stats Card */}
            <div className="absolute bottom-8 left-8 bg-emerald-500 text-white px-8 py-6 rounded-xl shadow-2xl">
              <div className="text-5xl font-bold mb-2">56+</div>
              <p className="text-sm font-medium">Consulting Awards</p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We Are Here To Help You
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo, lacinia eget consectetur sed.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
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
