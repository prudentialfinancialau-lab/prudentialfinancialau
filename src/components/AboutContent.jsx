const AboutContent = ({ data = {} }) => {
  const sections = data?.sections || [];

  return (
    <>
      {sections.map((section, index) => {
        // Determine background color - alternate between white and gray
        const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

        return (
          <section key={index} className={`py-6 sm:py-8 md:py-10 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4">
              {section.title && (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-10 text-center">
                  {section.title}
                </h2>
              )}

              {section.paragraphs && (
                <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600 text-justify mb-5 leading-relaxed text-base sm:text-lg text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.list && (
                <div className="max-w-4xl mx-auto">
                  <ul className="space-y-4 sm:space-y-5 mb-8">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start bg-white rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                          {item.icon && item.icon.startsWith('fa') ? (
                            <i className={`${item.icon} text-emerald-600 text-xl`}></i>
                          ) : (
                            <span className="text-2xl">{item.icon || '✓'}</span>
                          )}
                        </div>
                        <div>
                          <strong className="text-gray-900 block mb-1.5 text-lg sm:text-xl">{item.title}</strong>
                          <span className="text-gray-600 text-justify text-sm sm:text-base leading-relaxed">{item.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.features && (
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
                  {section.features.map((feature, fIndex) => (
                    <div key={fIndex} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                          {feature.icon && feature.icon.startsWith('fa') ? (
                            <i className={`${feature.icon} text-emerald-600 text-2xl`}></i>
                          ) : (
                            <span className="text-3xl">{feature.icon}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg sm:text-xl">{feature.title}</h4>
                          <p className="text-gray-600 text-justify text-sm sm:text-base leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.clients && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                  {section.clients.map((client, cIndex) => (
                    <div key={cIndex} className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-emerald-200">
                      <div className="text-center mb-4">
                        <div className="inline-flex w-16 h-16 bg-white rounded-full items-center justify-center shadow-md mb-3">
                          {client.icon && client.icon.startsWith('fa') ? (
                            <i className={`${client.icon} text-emerald-600 text-3xl`}></i>
                          ) : (
                            <span className="text-4xl">{client.icon}</span>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg sm:text-xl">{client.title}</h4>
                      </div>
                      <p className="text-gray-700 text-justify text-sm sm:text-base leading-relaxed text-center">{client.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.testimonials && (
                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                  {section.testimonials.map((testimonial, tIndex) => (
                    <div key={tIndex} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-l-4 border-emerald-500">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 text-2xl">"</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-700 italic mb-4 text-base sm:text-lg text-justify leading-relaxed text-justify">
                            {testimonial.quote}
                          </p>
                          <p className="text-gray-900 font-bold text-sm sm:text-base">
                            — {testimonial.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.cta && (
                <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 sm:p-10 text-center shadow-2xl">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{section.cta.title}</h3>
                  <p className="text-emerald-50 mb-8 text-base sm:text-lg text-justify">{section.cta.description}</p>
                  <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    {section.cta.contact.map((item, cIndex) => (
                      <p key={cIndex} className="text-white font-semibold text-base sm:text-lg text-justify flex items-center justify-center gap-3">
                        {item.icon && item.icon.startsWith('fa') ? (
                          <i className={`${item.icon} text-xl`}></i>
                        ) : (
                          <span className="text-2xl">{item.icon}</span>
                        )}
                        <span>{item.label}: {item.value}</span>
                      </p>
                    ))}
                  </div>
                  <p className="text-emerald-50 text-sm mt-6">Free Consultation | No Obligation | Local Experts</p>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default AboutContent;
