const Lenders = () => {
  // Placeholder lender names - in production these would be actual logo images
  const lenders = [
    "Commonwealth", "Westpac", "ANZ", "NAB", "St.George",
    "Adelaide Bank", "AFG", "AMP", "BankSA", "Bank of Melb",
    "Beyond Bank", "Macquarie", "Greater", "Heritage", "Mortgage Choice",
    "NAB Broker", "Liberty", "BOQ", "RACQ", "Teachers Mutual",
    "Newcastle Permanent", "P&N Bank", "Police Bank", "IMB"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Lenders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We compare hundreds of loans for you from our network of lenders.
          </p>
        </div>

        {/* Lenders Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {lenders.map((lender, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {lender.charAt(0)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium">{lender}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lenders;
