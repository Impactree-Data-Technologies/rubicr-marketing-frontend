// components/OurReach.js
"use client"

import Image from 'next/image';

const OurReach = () => {
  const countries = [
    { name: 'Saudi Arabia', flag: '/saudi.jpg' },
    { name: 'United Arab Emirates', flag: '/uae.png' },
    { name: 'Singapore', flag: '/singapore.jpg' },
    { name: 'India', flag: '/india.jpg' },
    { name: 'Vietnam', flag: '/vietnam.png' },
    { name: 'Belgium', flag: '/belgium.png' }
  ];

  return (
    <section className="py-12 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Our Global Reach
        </h2>
       
        <div className="flex justify-center mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            {countries.map((country, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 border-4 border-transparent group-hover:border-blue-400 transition-all duration-300 transform group-hover:scale-110">
                  <Image 
                    src={country.flag} 
                    alt={country.name} 
                    width={96} 
                    height={96} 
                    className="object-cover" 
                  />
                </div>
                <span className="text-sm sm:text-base md:text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300 text-center">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurReach;