const Team = ({ data = {} }) => {
  const title = data?.title || 'Our Team';
  const members = data?.members || [];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 sm:mb-14 text-center">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {members.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {member.image && (
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(member.name);
                    }}
                  />
                </div>
              )}
              <div className="p-5 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                {member.title && (
                  <p className="text-sm text-gray-600">
                    {member.title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
