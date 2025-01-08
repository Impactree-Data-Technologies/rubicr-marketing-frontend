import React, { useState, useEffect, useCallback, TouchEvent } from 'react';
import { ChevronRight, ChevronLeft, Quote, Star } from 'lucide-react';
import Image from 'next/image';

interface FeedbackItem {
  quote: string;
  name: string;
  title?: string;
  image: string | null;
}

interface ApiResponse {
  data: Array<{
    attributes: {
      quote: string;
      name: string;
      title: string;
      image?: {
        data?: {
          attributes?: {
            url: string;
          };
        };
      };
    };
  }>;
}

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide interval (5 seconds)
  const slideInterval = 5000;
  
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => 
      prev === feedbackData.length - 1 ? 0 : prev + 1
    );
  }, [feedbackData.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => 
      prev === 0 ? feedbackData.length - 1 : prev - 1
    );
  }, [feedbackData.length]);

  // Auto-slide effect
  useEffect(() => {
    if (!isPaused && feedbackData.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [handleNext, feedbackData.length, isPaused]);

  // Touch handlers
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swiped left
      handleNext();
    } else {
      // Swiped right
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/feedbacks?populate=*`
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: ApiResponse = await response.json();
        
        const formattedData = data.data.map(item => ({
          quote: item.attributes.quote,
          name: item.attributes.name,
          title: item.attributes.title,
          image: item.attributes.image?.data?.attributes?.url || null
        }));

        setFeedbackData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex justify-center items-center h-[450px] z-[1]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fba900]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative text-red-500 text-center p-4 z-[1]">
        Error: {error.message}
      </div>
    );
  }

  if (!feedbackData.length) return null;

  const currentTestimonial = feedbackData[currentIndex];

  return (
    <div 
      className="relative w-full bg-[#fba900] h-[650px] md:h-[550px] lg:h-[500px] flex flex-col items-center justify-center p-4 z-[1]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-1/2 bg-cover bg-center opacity-20"
        // style={{ backgroundImage: "url('/api/placeholder/1200/600')" }}
      />
      
      <div className="relative w-full max-w-5xl mx-auto">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-6 md:mb-10">
          TESTIMONIAL
        </h1>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between z-[2]">
            <button
              onClick={handlePrev}
              className="transform -translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#fba900]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-[#fba900]" />
            </button>
            <button
              onClick={handleNext}
              className="transform translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#fba900]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-[#fba900]" />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-4 md:p-6 lg:p-8 relative mx-auto w-full max-w-4xl h-[450px] md:h-[300px] lg:h-[280px] transition-all duration-500">
            <div className="absolute -top-6 left-8 bg-gray-300 rounded-full p-3 md:p-4 hidden md:block z-[2]">
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#fba900]" />
            </div>

            <div className="h-full flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center w-full md:w-1/4 pt-2">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[#fba900] mb-3">
                  {currentTestimonial.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${currentTestimonial.image}`}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                <div className="text-center mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {currentTestimonial.title}
                  </p>
                </div>

                {/* <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        star <= 4 ? 'text-[#fba900] fill-[#fba900]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div> */}
              </div>

              <div className="w-full md:w-3/4 flex-1 overflow-hidden">
                <div className="h-[250px] md:h-full overflow-y-auto scrollbar-hide px-2">
                  <p className="text-gray-700 text-base md:text-lg">
                    {currentTestimonial.quote}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 right-8 bg-gray-300 rounded-full p-3 md:p-4 hidden md:block z-[2]">
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#fba900]" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {feedbackData.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;