"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface UsCard {
  id: number;
  link: string;
  heading: string;
  description: string;
}

interface WhyUsData {
  heading: string;
  description: string;
  us_card: UsCard[];
}

const WhyUs: React.FC = () => {
  const [whyUsData, setWhyUsData] = useState<WhyUsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const minSwipeDistance = 50;

  const getWhyUsData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/home?populate=why_us.us_card`, {
        next: { revalidate: 3600 },
      });
      
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      return data.data?.attributes?.why_us?.[0] || null;
    } catch (err) {
      console.error('Error fetching WhyUs data:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWhyUsData();
        setWhyUsData(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-600">Error: {error}</div>;
  if (!whyUsData) return <div className="text-center py-16">No data available</div>;

  const totalCards = whyUsData.us_card.length;
  const cardsPerView = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;

  const handleNext = () => {
    setCurrentGroup((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentGroup((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentGroup + i) % totalCards;
      cards.push(whyUsData.us_card[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 md:mb-4">
          {whyUsData.heading}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
          {whyUsData.description}
        </p>
      </div>

      <div className="relative">
        {/* Navigation arrows - visible only on desktop */}
        <div className="hidden md:flex absolute inset-y-0 -left-8 -right-8 items-center justify-between z-10">
          <button 
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all"
            aria-label="Previous cards"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button 
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all"
            aria-label="Next cards"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cards Container with touch events */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {visibleCards.map((card, index) => (
            <div 
              key={`${card.id}-${index}`}
              className="transform transition-all duration-500 h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 h-[300px] md:h-[350px] flex flex-col">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4 text-blue-600">
                  {card.link}
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                  {card.heading}
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 flex-grow overflow-y-auto">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 md:mt-8 space-x-2">
          {whyUsData.us_card.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentGroup(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentGroup ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to group ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;