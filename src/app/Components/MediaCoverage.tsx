import React from 'react';
import Image from 'next/image';

const MediaCoverage = () => {
  const mediaLogos = [
    { name: 'NDTV', src: '/ndtv.webp' },
    { name: 'The Times of India', src: '/toi.webp' },
    { name: 'The Hindu', src: '/hindu.webp' },
    { name: 'CNBC', src: '/cnbc.webp' },
    { name: 'News18', src: '/news18.webp' },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight">
          Featured In
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
            Top Media Outlets
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-stretch">
          {mediaLogos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={60}
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/2 left-1/3 w-1/3 h-1/3 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default MediaCoverage;