const Benefits = ({ data = {} }) => {
  const title = data?.title || 'Why Choose Us';
  const features = data?.features || [];

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 sm:mb-6">
                <i className={`${feature.icon} text-4xl sm:text-5xl md:text-6xl text-emerald-500`}></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-justify leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
