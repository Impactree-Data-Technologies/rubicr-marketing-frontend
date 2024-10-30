import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe2 } from 'lucide-react';

const regions = [
  {
    name: 'North America',
    description: 'Climate action and diversity are front and center, with regulations pushing for reduced carbon footprints and inclusive workplaces.',
    status: 'Leading',
    color: 'from-green-500 to-blue-500'
  },
  {
    name: 'Europe',
    description: 'Leading in sustainability and governance, stringent regulations like the EU Taxonomy promote environmental alignment and transparent corporate governance.',
    status: 'Advanced',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Asia',
    description: 'Implementing frameworks for economic resilience, such as Japans Corporate Governance Code and Chinas Green Credit Guidelines.',
    status: 'Developing',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Africa',
    description: 'Focusing on social impact and ethical practices, emphasizing resource management and social responsibility.',
    status: 'Emerging',
    color: 'from-yellow-500 to-red-500'
  },
  {
    name: 'Latin America',
    description: 'Advancing environmental stewardship with regulations protecting biodiversity and promoting sustainable land use.',
    status: 'Progressing',
    color: 'from-teal-500 to-emerald-500'
  }
];

const RegionalCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.children[0].offsetWidth;
      const gap = 16; // Adjust based on your gap size
      const scrollLeft = index * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
      
      setActiveIndex(index);
    }
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    const newIndex = (activeIndex - 1 + regions.length) % regions.length;
    scrollToIndex(newIndex);
  };

  const handleNext = (fromAutoPlay = false) => {
    if (!fromAutoPlay) {
      setIsAutoPlaying(false);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }
    const newIndex = (activeIndex + 1) % regions.length;
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (isAutoPlaying) {
          handleNext(true);
        }
      }, 5000);
    };

    if (isAutoPlaying) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const handleScroll = (e) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.children[0].offsetWidth;
      const gap = 16;
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < regions.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center  sm:p-6 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">
          ESG Relevance Across Regions
          </h1>
          <p className="text-sm md:text-base text-gray-600">
          Explore how Environmental, Social, and Governance (ESG) factors impact our business across different regions.
          </p>
        </div>

        <div 
          className="relative" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handlePrevious}
            className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 
              w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg items-center justify-center
              transition-all duration-300 hover:bg-gray-50 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </button>

          <button
            onClick={() => handleNext(false)}
            className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 
              w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg items-center justify-center
              transition-all duration-300 hover:bg-gray-50 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </button>

          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scroll-smooth gap-4 md:gap-6 px-2 md:px-4 pb-6 md:pb-8 
              snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {regions.map((region, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-96 h-auto md:h-64 
                  bg-white rounded-xl shadow-lg transition-all duration-300 snap-center
                  ${activeIndex === index ? 'scale-100 opacity-100' : 'md:scale-95 md:opacity-70'}`}
              >
                <div className="p-4 md:p-6 h-full flex flex-col">
                  <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${region.color} 
                      flex items-center justify-center shadow-lg`}>
                      <Globe2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800">{region.name}</h3>
                      <span className="text-xs md:text-sm font-medium text-gray-500">{region.status}</span>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                    {region.description}
                  </p>
                  <div className={`h-1 w-full bg-gradient-to-r ${region.color} rounded-b-xl mt-3 md:mt-4`} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-1.5 md:space-x-2 mt-4 md:mt-6">
            {regions.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-300 
                  ${activeIndex === index 
                    ? 'bg-blue-600 w-6 md:w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalCarousel;