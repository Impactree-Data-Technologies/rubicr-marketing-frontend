"use client"
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, ChevronLeft,ArrowRight, Circle,Quote , Star, Shield, Zap } from 'lucide-react';
import { cache } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

// Keep existing dynamic imports
const Navbar = dynamic(() => import("./Components/navbar"), {
  loading: () => <div className="h-16 bg-white" />
});
const Footer = dynamic(() => import("./Components/footer"), {
  loading: () => <div className="h-20 bg-gray-100" />
});
const BotpressChat = dynamic(() => import("./Components/BotpressChat"), {
  ssr: false
});
const Button = dynamic(() => import("./Components/button"));

// Font configuration

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-200 animate-spin border-t-indigo-600"></div>
    </div>
  </div>
);

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] bg-red-50 rounded-lg p-6">
    <p className="text-red-600 font-medium">{message}</p>
  </div>
);

interface HomeData {
  title: string;
  description: string;
  subdescription: string;
}

interface Logo {
  attributes: {
    url: string;
    name: string;
  };
}

interface LogoData {
  title: string;
  description: string;
  logos: Logo[];
}

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

interface CaseCard {
  heading: string;
  description: string;
  link: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface UseCaseData {
  heading: string;
  case_card: CaseCard[];
}

interface RubicrCard {
  id: number;
  heading: string;
  description: string;
}

interface WhyRubicrData {
  title: string;
  description: string;
  card: RubicrCard[];
}

interface ImageTogglerData {
  with_rubicr: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  without_rubicr: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface PageData {
  home: HomeData | null;
  logos: LogoData;
  whyUs: WhyUsData | null;
  useCase: UseCaseData | null;
  imageToggler: ImageTogglerData | null;
}

interface FeedbackItem {
  quote: string;
  name: string;
  title?: string;
  image: string | null;
}

interface ImageAttributes {
  url: string;
}

interface ImageData {
  data?: {
    attributes?: ImageAttributes;
  };
}

interface Card {
  id: number;
  heading: string;
  description: string;
}

interface WhyRubicrData {
  title: string;
  description: string;
  card: Card[];
}

interface ApiResponse {
  data: Array<{
    attributes: {
      quote: string;
      name: string;
      title?: string;
      image?: ImageData;
    };
  }>;
}

// Component Props types
interface ErrorDisplayProps {
  message: string;
}

interface ImageToggleClientProps {
  withRubicrUrl: string;
  withoutRubicrUrl: string;
}

interface MediaAttributes {
  url: string;
  // Add other media attributes if needed
}

interface MediaData {
  data: {
    attributes: MediaAttributes;
  };
}



const EnhancedHomePage: React.FC = () => {


   // Add new state for Why Us and Use Case sections
   const [activeWhyUsIndex, setActiveWhyUsIndex] = useState(0);
   const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);

   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Keep existing state and data fetching logic
  const [pageData, setPageData] = useState<PageData>({
    home: null,
    logos: { title: '', description: '', logos: [] },
    whyUs: null,
    useCase: null,
    imageToggler: null
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        if (!process.env.NEXT_PUBLIC_API_URL) throw new Error('API URL is not configured');

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/home?populate=*,Logo.logo,use_case.case_card.link,why_us.us_card`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();

        setPageData({
          home: data.data.attributes,
          logos: {
            title: data.data.attributes.Logo?.logo_title || '',
            description: data.data.attributes.Logo?.logo_description || '',
            logos: data.data.attributes.Logo?.logo?.data || []
          },
          whyUs: data.data.attributes.why_us?.[0] || null,
          useCase: data.data.attributes.use_case,
          imageToggler: data.data.attributes.image_toggler
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <ErrorDisplay message={error} />;
  if (isLoading) return <LoadingSpinner />;

  // Enhanced Hero Section
  const Hero = () => (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/856572/856572-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">{pageData.home?.title}</h1>
        <p className="text-xl md:text-2xl mb-6 text-gray-200 max-w-3xl mx-auto">{pageData.home?.description}</p>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">{pageData.home?.subdescription}</p>
        <Button 
          label="Schedule a demo" 
          background="#FFCD1B" 
          color="black" 
          href="/contact-us"
          className="transform hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </section>
  );


  // Enhanced Logo Section

  
  const LogoSection = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3
        }
      }
    };
 
    const headerVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    };
 
    const duplicatedLogos = [...pageData.logos.logos, ...pageData.logos.logos];
 
    return (
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-100 opacity-40" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              variants={headerVariants}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sans">
                {pageData.logos.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans leading-relaxed">
                {pageData.logos.description}
              </p>
            </motion.div>
 
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 group relative"
                  >
                    <div className="relative p-6 bg-white rounded-xl border border-gray-100 backdrop-blur-sm hover:shadow-lg transition-all duration-300 w-48 h-24 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${logo.attributes.url}`}
                          alt={logo.attributes.name}
                          fill
                          className="object-contain transition-all duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-indigo-100" />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
 
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-pink-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </section>
    );
  }; 
  

 
  // Enhanced Why Us Section

  
  const WhyUs: React.FC = () => {
    const [whyUsData, setWhyUsData] = useState<WhyUsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentGroup, setCurrentGroup] = useState<number>(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
    // Minimum swipe distance for detection (in pixels)
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
    const cardsPerView = window.innerWidth >= 768 ? 3 : 1;
  
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
  

  


  // Enhanced Use Cases Section
  const UseCases = () => {
    const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);
  
    return (
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Main heading */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 font-sans">
              {pageData.useCase?.heading}
            </h2>
          </div>
  
          {/* Tabs - vertical on mobile, horizontal on desktop */}
          <div className="flex flex-col md:flex-row md:justify-center mb-8 md:mb-12 space-y-2 md:space-y-0 md:space-x-4">
            {pageData.useCase?.case_card.map((useCase, idx) => (
              <button
                key={useCase.heading}
                onClick={() => setActiveUseCaseIndex(idx)}
                className={`w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all ${
                  activeUseCaseIndex === idx
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Circle
                    className={`w-3 h-3 md:w-4 md:h-4 ${
                      activeUseCaseIndex === idx ? 'text-white' : 'text-blue-500'
                    }`}
                  />
                  <span className="text-sm md:text-base font-semibold">{useCase.heading}</span>
                </div>
              </button>
            ))}
          </div>
  
          {/* Content section */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
            {/* Left side: Description */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm order-2 lg:order-1 w-full">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 font-sans">
                {pageData.useCase?.case_card[activeUseCaseIndex]?.heading}
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                {pageData.useCase?.case_card[activeUseCaseIndex]?.description}
              </p>
            </div>
  
            {/* Right side: Video */}
            <div className="relative order-1 lg:order-2 w-full">
              {pageData.useCase?.case_card[activeUseCaseIndex]?.link?.data?.attributes?.url && (
                <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src={`${process.env.NEXT_PUBLIC_API_URL}${pageData.useCase.case_card[activeUseCaseIndex].link.data.attributes.url}`}
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };


  // Enhanced Why Rubicr Section

  const WhyRubicr: React.FC = () => {
    const [data, setData] = useState<WhyRubicrData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home?populate=whyrubicr.card`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const jsonData = await response.json();
        if (!jsonData.data?.attributes?.whyrubicr?.[0]) {
          throw new Error('Invalid data structure received from API');
        }
        
        setData(jsonData.data.attributes.whyrubicr[0]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!data) return null;

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent px-4">
            {data.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {data.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4">
          {data.card.map((cardData, index) => (
            <motion.div
              key={cardData.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div 
                className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-bl-full opacity-20 transform group-hover:scale-110 transition-transform duration-300" 
              />
              
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6">
                  {index % 3 === 0 && <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />}
                  {index % 3 === 1 && <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />}
                  {index % 3 === 2 && <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  {cardData.heading}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {cardData.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



  // Enhanced Feedback Section with new design

  
  const Feedback: React.FC = () => {
    const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    // Check if screen is mobile
    const isMobile = useMediaQuery({ maxWidth: 768 });
    
    useEffect(() => {
      const fetchFeedbackData = async () => {
        try {
          const response = await axios.get<ApiResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/feedbacks?populate=*`
          );
          setFeedbackData(
            response.data.data.map((item) => ({
              ...item.attributes,
              image: item.attributes.image?.data?.attributes?.url || null,
            }))
          );
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };
      fetchFeedbackData();
    }, []);

    // Swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.touches[0].clientX);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.touches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;
  
      if (isLeftSwipe) {
        handleNext();
      }
      if (isRightSwipe) {
        handlePrev();
      }
  
      setTouchStart(null);
      setTouchEnd(null);
    };
  
    const handleNext = () => {
      setCurrentFeedbackIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
    };
  
    const handlePrev = () => {
      setCurrentFeedbackIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length);
    };
  
    if (loading) return <div className="flex justify-center items-center min-h-[300px]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>;
    if (error) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;
    if (!feedbackData.length) return null;
  
    const { quote, name, title, image } = feedbackData[currentFeedbackIndex];
  
    return (
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Client Testimonials
              </h2>
              <div className="w-16 md:w-20 h-1 bg-blue-500 mx-auto"></div>
            </div>
  
            <div className="relative">
              <div 
                className="p-4 md:p-8 bg-white rounded-xl shadow-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="grid md:grid-cols-5 gap-4 md:gap-8">
                  {/* Image Column */}
                  <div className="md:col-span-2">
                    <div className="relative w-full aspect-square md:aspect-square overflow-hidden rounded-xl">
                      {image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
                          alt={name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image available</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                    </div>
                  </div>
  
                  {/* Content Column */}
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <div className="mb-4 md:mb-6">
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-3 md:mb-4" />
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        {quote}
                      </p>
                    </div>
  
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">{name}</h3>
                      {title && <p className="text-sm md:text-base text-gray-600">{title}</p>}
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Navigation - Only show on desktop */}
              {!isMobile && (
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
                  <div className="flex justify-between px-4">
                    <button
                      onClick={handlePrev}
                      className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
  
              {/* Progress Indicators */}
              <div className="flex justify-center mt-4 md:mt-8 gap-2">
                {feedbackData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentFeedbackIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

   // Enhanced Image Toggle Section
   const ImageToggleClient: React.FC<ImageToggleClientProps> = ({ withRubicrUrl, withoutRubicrUrl }) => {
    const [showRubric, setShowRubric] = useState(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleSelection = (isRubric: boolean) => {
      setShowRubric(isRubric);
    };

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
        });
      }
    }, [showRubric]);

    const renderMedia = () => {
      const url = showRubric ? withRubicrUrl : withoutRubicrUrl;
      const isVideo = url.toLowerCase().endsWith('.mov') || url.toLowerCase().endsWith('.mp4');

      if (isVideo) {
        return (
          <video
            ref={videoRef}
            src={url}
            width={800}
            height={800}
            loop
            muted
            playsInline
            autoPlay
            className="max-w-full h-auto rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105"
          >
            Your browser does not support video playback.
          </video>
        );
      }

      return (
        <Image
          src={url}
          width={800}
          height={800}
          alt={showRubric ? "With Rubicr" : "Without Rubicr"}
          className="max-w-full h-auto rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105"
        />
      );
    };

    return (
      <section className="bg-black py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              How Rubicr Simplifies Your ESG Journey
            </h2>
          </motion.div>

          <div className="flex justify-center mb-8">
            <div className="relative flex items-center w-64 h-12 p-1 bg-gray-800 rounded-full">
              <motion.div
                initial={false}
                animate={{
                  x: showRubric ? 0 : '100%'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute w-1/2 h-full bg-yellow-400 rounded-full"
              />
              <div className="relative z-10 flex w-full text-sm">
                <button
                  onClick={() => handleSelection(true)}
                  className={`w-1/2 transition-colors duration-200 ${
                    showRubric ? 'text-black' : 'text-white'
                  }`}
                >
                  With Rubicr
                </button>
                <button
                  onClick={() => handleSelection(false)}
                  className={`w-1/2 transition-colors duration-200 ${
                    !showRubric ? 'text-black' : 'text-white'
                  }`}
                >
                  Without Rubicr
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {renderMedia()}
          </motion.div>
        </div>
      </section>
    );
  };

  // Fetch image toggle data
  const ImageToggleServer: React.FC = () => {
    const [imageData, setImageData] = useState<ImageTogglerData | null>(null);
  const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const fetchImageData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/home?populate[0]=image_toggler.with_rubicr&populate[1]=image_toggler.without_rubicr`
          );
          
          if (!response.ok) throw new Error('Failed to fetch image data');
          
          const data = await response.json();
          setImageData(data.data.attributes.image_toggler);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      };

      fetchImageData();
    }, []);

    if (error) return <ErrorDisplay message="Error loading images" />;
    if (!imageData) return <LoadingSpinner />;

    return (
      <ImageToggleClient
        withRubicrUrl={`${process.env.NEXT_PUBLIC_API_URL}${imageData.with_rubicr.data.attributes.url}`}
        withoutRubicrUrl={`${process.env.NEXT_PUBLIC_API_URL}${imageData.without_rubicr.data.attributes.url}`}
      />
    );
  };



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
      <section className="py-12 bg-black text-white">
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
         
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className={`bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${stat.span}`}>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                  {stat.value}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">{stat.label}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    );
  };


  // Keep existing return statement structure with updated components
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <main className="relative">
        <Hero />
        <LogoSection />
        <WhyUs />
        <UseCases />
        <WhyRubicr />
        <Feedback />
        <ImageToggleServer />
        
        <OurReach />
        
        {/* Keep existing CTA section */}
        <div className="py-10">
          <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 py-20 mx-8 md:mx-20 rounded-3xl mb-20 shadow-2xl">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Started Today</h2>
              <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
              <p className="text-xl md:text-2xl mb-8 text-white">Ready to transform your ESG Performance?</p>
              <Button label="Schedule a demo" background="#FFCD1B" color="white" href="/contact-us" />
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BotpressChat />
    </div>
  );
};

export default EnhancedHomePage;