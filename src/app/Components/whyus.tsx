'use client'
import React, { useState, useEffect } from 'react';
import { cache } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Interfaces for type safety
interface UsCard {
  id: number;
  heading: string;
  description: string;
  link: string;
}

interface WhyUsData {
  id: number;
  heading: string;
  description: string;
  us_card: UsCard[];
}

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      why_us: WhyUsData[];
    };
  };
}

// Type for NavigationDots props
interface NavigationDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

// Type for NavigationArrows props
interface NavigationArrowsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}



const ESGPlatform: React.FC = () => {


  const NavigationDots: React.FC<NavigationDotsProps> = ({ total, current, onDotClick }) => (
    <div className="flex justify-center space-x-2">
      {[...Array(total)].map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 rounded-full transition-colors ${
            index === current ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
  
  const NavigationArrows: React.FC<NavigationArrowsProps> = ({ onPrevClick, onNextClick }) => (
    <div className="flex space-x-4">
      <button
        onClick={onPrevClick}
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={onNextClick}
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
  
  const getWhyUsData = cache(async (): Promise<WhyUsData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/api/home?populate=why_us.us_card`, {
        next: { revalidate: 3600 },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.data?.attributes?.why_us?.[0]) {
        return data.data.attributes.why_us[0];
      } else {
        throw new Error('Data structure is not as expected');
      }
    } catch (err) {
      console.error('Error fetching WhyUs data:', err);
      return null;
    }
  });
  // Explicitly type state variables
  const [whyUsData, setWhyUsData] = useState<WhyUsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Mobile
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) { // Tablet
        setItemsPerPage(2);
      } else { // Desktop
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWhyUsData();
        setWhyUsData(data);
        setLoading(false);
      } catch (err: unknown) {
        // Type safe error handling
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-600">Error: {error}</div>;
  }

  if (!whyUsData) {
    return <div className="text-center py-16">No data available</div>;
  }

  const totalCards = whyUsData.us_card.length;
  const totalPages = Math.ceil((totalCards - itemsPerPage + 1) / 1);

  const handlePrevClick = () => {
    setCurrentIndex(prev => {
      const newIndex = prev - 1;
      return newIndex < 0 ? totalCards - itemsPerPage : newIndex;
    });
  };

  const handleNextClick = () => {
    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      return newIndex > totalCards - itemsPerPage ? 0 : newIndex;
    });
  };

  const visibleCards = whyUsData.us_card.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {whyUsData.heading}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {whyUsData.description}
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCards.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{item.link}</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.heading}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <NavigationArrows
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
            />
          </div>
          <div className="w-full pb-4">
            <NavigationDots
              total={totalPages}
              current={currentIndex}
              onDotClick={setCurrentIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGPlatform;