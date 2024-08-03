import React from 'react';
import Image from 'next/image';

const OurReach = () => {
  const countries = [
    { name: 'Saudi Arabia', flag: '/saudi arabia.webp' },
    { name: 'United Arab Emirates', flag: '/united arab emirates.webp' },
    { name: 'Singapore', flag: '/singapore.webp' },
    { name: 'India', flag: '/india.webp' },
  ];

  const stats = [
    { value: '2017', label: 'Year of Establishment' },
    { value: '80+', label: 'Clients' },
    { value: '26 Million', label: 'Data Points Tracked' },
    { value: '10', label: 'Business Partners' },
    { value: '2 Million', label: 'People Impacted', span: 'col-span-full' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Our Global Reach
        </h2>
       
        <div className="flex justify-center mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {countries.map((country, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 border-4 border-transparent group-hover:border-blue-400 transition-all duration-300 transform group-hover:scale-110">
                  <Image src={country.flag} alt={country.name} width={96} height={96} className="object-cover" />
                </div>
                <span className="text-sm sm:text-base md:text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300 text-center">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${stat.span}`}>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                {stat.value}
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurReach;