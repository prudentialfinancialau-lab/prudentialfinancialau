const Lenders = ({ data = {} }) => {
  // Default values
  const title = data?.title || 'Our Lenders';
  const description = data?.description || 'We compare hundreds of loans for you from our network of lenders.';

  // Default lenders if not provided
  const defaultLenders = [
    { name: "Commonwealth" }, { name: "Westpac" }, { name: "ANZ" },
    { name: "NAB" }, { name: "St.George" }, { name: "Adelaide Bank" },
    { name: "AFG" }, { name: "AMP" }, { name: "BankSA" },
    { name: "Bank of Melb" }, { name: "Beyond Bank" }, { name: "Macquarie" },
    { name: "Greater" }, { name: "Heritage" }, { name: "Mortgage Choice" },
    { name: "NAB Broker" }, { name: "Liberty" }, { name: "BOQ" },
    { name: "RACQ" }, { name: "Teachers Mutual" }, { name: "Newcastle Permanent" },
    { name: "P&N Bank" }, { name: "Police Bank" }, { name: "IMB" }
  ];

  const lenders = data?.lenderList || defaultLenders;

  return (
    <section id="lenders" className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{title}</h2>
          <p className="text-gray-600 text-justify max-w-2xl mx-auto text-sm sm:text-base">
            {description}
          </p>
        </div>

        {/* Lenders Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {lenders.map((lender, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                {lender.logo ? (
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-1.5 sm:mb-2 flex items-center justify-center">
                    <img
                      src={lender.logo}
                      alt={lender.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gray-100 rounded-lg mx-auto mb-1.5 sm:mb-2 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-400">
                      {lender.name.charAt(0)}
                    </span>
                  </div>
                )}
                <p className="text-xs text-gray-600 text-justify font-medium line-clamp-2">{lender.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lenders;
