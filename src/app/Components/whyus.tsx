"use client"

import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { staticData } from '../../data/static-data';

// Define interfaces for the data structure
interface Card {
  id: number;  // Changed from string to number to match actual data
  link: string;
  heading: string;
  description: string;
}

interface WhyUsData {
  heading: string;
  us_card: Card[];
}

// Type assertion for the staticData
const whyUsDataTyped = staticData.whyUs as WhyUsData;

const WhyUs = () => {
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const whyUsData = whyUsDataTyped;
  const totalCards: number = whyUsData.us_card.length;
  const cardsPerView: number = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;
  const minSwipeDistance: number = 50;

  const handleNext = (): void => {
    setCurrentGroup((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = (): void => {
    setCurrentGroup((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const getVisibleCards = (): Card[] => {
    const cards: Card[] = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentGroup + i) % totalCards;
      cards.push(whyUsData.us_card[index]);
    }
    return cards;
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (): void => {
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

  const visibleCards = getVisibleCards();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 md:mb-4">
          {whyUsData.heading}
        </h1>
      </div>

      <div className="relative">
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

        <div className="flex justify-center mt-6 md:mt-8 space-x-2">
          {whyUsData.us_card.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentGroup(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentGroup ? 'bg-blue-600': 'bg-gray-300'
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