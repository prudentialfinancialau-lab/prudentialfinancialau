import { useState } from 'react';

const ServiceTypes = ({ data = {} }) => {
  const [expandedService, setExpandedService] = useState(null);

  const introText = data?.introText || "You're in great hands";
  const services = data?.services || [];

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Intro Text */}
        {introText && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-10 sm:mb-14 text-center">
            {introText}
          </h2>
        )}

        {/* Service Type Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => toggleService(index)}
              className={`p-6 rounded-xl font-bold text-lg transition-all ${
                expandedService === index
                  ? 'bg-emerald-500 text-white shadow-xl scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:shadow-lg'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>

        {/* Expanded Service Content */}
        {expandedService !== null && services[expandedService] && (
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-10 shadow-xl animate-fadeIn">
            <div className="max-w-5xl mx-auto">
              {/* Service Header */}
              {services[expandedService].header && (
                <div className="text-center mb-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {services[expandedService].header.title}
                  </h3>
                  {services[expandedService].header.subtitle && (
                    <p className="text-xl text-emerald-600 font-semibold mb-4">
                      {services[expandedService].header.subtitle}
                    </p>
                  )}
                  {services[expandedService].header.description && (
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {services[expandedService].header.description}
                    </p>
                  )}
                </div>
              )}

              {/* Service Image */}
              {services[expandedService].image && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={services[expandedService].image}
                    alt={services[expandedService].name}
                    className="w-full h-64 sm:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/1200x400?text=' + encodeURIComponent(services[expandedService].name);
                    }}
                  />
                </div>
              )}

              {/* Service Content Sections */}
              {services[expandedService].content && services[expandedService].content.map((section, sIndex) => (
                <div key={sIndex} className="mb-8 last:mb-0">
                  {section.title && (
                    <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h4>
                  )}
                  {section.paragraphs && section.paragraphs.map((para, pIndex) => (
                    <p key={pIndex} className="text-gray-600 mb-4 leading-relaxed text-base sm:text-lg">
                      {para}
                    </p>
                  ))}
                </div>
              ))}

              {/* Sub-services Grid */}
              {services[expandedService].subServices && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {services[expandedService].subServices.map((sub, subIndex) => (
                    <div key={subIndex} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <h5 className="text-xl font-bold text-gray-900 mb-3">{sub.title}</h5>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{sub.description}</p>
                      {sub.learnMore && (
                        <button className="text-emerald-600 font-semibold hover:text-emerald-700 text-sm">
                          Learn More →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Benefits List */}
              {services[expandedService].benefits && (
                <div className="bg-white rounded-xl p-6 sm:p-8 mt-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">
                    {services[expandedService].benefitsTitle || 'Benefits'}
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {services[expandedService].benefits.map((benefit, bIndex) => (
                      <li key={bIndex} className="flex items-start">
                        <span className="text-emerald-500 mr-3 mt-1 flex-shrink-0 text-xl">✓</span>
                        <span className="text-gray-700 text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceTypes;
