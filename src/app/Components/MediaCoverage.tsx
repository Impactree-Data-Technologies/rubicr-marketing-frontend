import React, { useState, useEffect, useRef } from 'react';

// Define interface for media logo
interface MediaLogo {
  name: string;
  src: string;
}

const MediaCoverage: React.FC = () => {
  // Explicitly type the ref
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
 
  const mediaLogos: MediaLogo[] = [
    { name: 'NDTV', src: '/ndtv.webp' },
    { name: 'The Times of India', src: '/toi.webp' },
    { name: 'The Hindu', src: '/hindu.webp' },
    { name: 'CNBC', src: '/cnbc.webp' },
    { name: 'News18', src: '/news18.webp' },
  ];

  useEffect(() => {
    // Safely handle the ref
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Explicitly type the scroll event handler
    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        setIsVisible(false);
        setTimeout(() => {
          if (scrollContainer) {
            scrollContainer.scrollLeft = 0;
            setIsVisible(true);
          }
        }, 100);
      }
    };

    // Explicitly type the animate function
    const animate = () => {
      if (scrollContainer && isVisible) {
        scrollContainer.scrollLeft += 3; // Adjust speed here
      }
    };

    // Use NodeJS.Timeout for interval type
    const interval = setInterval(animate, 30);
    
    // Use type assertion for event listener
    scrollContainer.addEventListener('scroll', handleScroll as EventListener);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
      scrollContainer.removeEventListener('scroll', handleScroll as EventListener);
    };
  }, [isVisible]);

  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured In
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
            Top Media Outlets
          </span>
        </h2>
        <div className="relative w-full">
          {/* Fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
         
          <div
            ref={scrollRef}
            className="overflow-hidden relative w-full h-24 whitespace-nowrap"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className={`inline-flex gap-16 transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* First set of logos */}
              {mediaLogos.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="inline-flex flex-shrink-0 group relative"
                  style={{ width: '150px', height: '80px' }}
                >
                  <div className="absolute inset-0 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="w-full h-full object-contain p-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
              {/* Duplicate set for smooth transition */}
              {mediaLogos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="inline-flex flex-shrink-0 group relative"
                  style={{ width: '150px', height: '80px' }}
                >
                  <div className="absolute inset-0 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="w-full h-full object-contain p-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;