"use client"

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, ArrowRight, Circle, Quote, Star, Shield, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic imports
const Navbar = dynamic(() => import("./Components/navbar"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white animate-pulse" />
});

const Footer = dynamic(() => import("./Components/footer"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white animate-pulse" />
});

const Button = dynamic(() => import("./Components/button"), {
  ssr: false
});

const Feedback = dynamic(() => import("./Components/feedback"), {
  ssr: false
});

// Static Data
const staticData = {
  logos: {
    title: "Join the Movement",
    description: "Trusted By a Growing Network of Companies Globally",
    logos: [
      { attributes: { url: "/Autoline images.jpg", name: "Company 1" } },
      { attributes: { url: "/dnavin.png", name: "Company 2" } },
      { attributes: { url: "/fine.png", name: "Company 3" } },
      { attributes: { url: "/samarth-logo-300-x-120.webp", name: "Company 4" } },
      { attributes: { url: "/acgc.png", name: "Company 5" } },
      { attributes: { url: "/tvs_image.jpg", name: "Company 6" } }
    ]
  },
  whyUs: {
    heading: "How Sustainability Initiatives Can Enhance Business Performance",
    us_card: [
      {
        id: 1,
        link: "📈",
        heading: "Supply Chain Transparency",
        description: "Tracking suppliers' environmental impact with sustainability tools ensures adherence to sustainability goals, reduces risks, and fosters responsible sourcing throughout the supply chain"
      },
      {
        id: 2,
        link: "💰",
        heading: "Operational Efficiency",
        description: "Leveraging sustainability software to monitor energy consumption enables cost reductions. Similarly, businesses can minimise waste and cut expenses by utilizing real-time data for smarter resource management"
      },
      {
        id: 3,
        link: "⚙️",
        heading: "Product Innovation",
        description: "Developing eco-friendly products allows businesses in sectors such as fashion and consumer goods to differentiate themselves by meeting the growing demand for sustainable options"
      },
      {
        id: 4,
        link: "🚀",
        heading: "Regulatory Compliance",
        description: "Sustainability software helps businesses stay ahead of evolving global regulations. For example, automotive companies can use it to comply with emissions standards, avoiding penalties while ensuring operational continuity"
      }
    ]
  },
  useCase: {
    heading: "Use Cases",
    case_card: [
      {
        heading: "Sustainability Reporting",
        description: "Be in total control of your ESG reporting needs. helps you track all the required ESG indicators.  RubiCr supports all major global frameworks, thereby giving you the power to choose the frameworks most relevant to your business.  Collect data from multiple teams, track indicators and create a single view for all your ESG reports",
        link: { data: { attributes: { url: "/videos/demo1.mp4" } } }
      },
      {
        heading: "Performance Management",
        description: "Make ESG reporting a part of the Regular performance or MIS monitoring.  Track standard or custom indicators relevant to your business that enable you to make better decisions.  Integrate with key financial and non-financial indicators to know the health of your organisation,",
        link: { data: { attributes: { url: "/videos/demo2.mp4" } } }
      },
      {
        heading: "Emission Tracking",
        description: "Ground up emissions tracking platform that helps you accurately track both the absolute emissions and the drivers for scope-1/2/3 emissions.  Track leading and lagging indicators like energy, fuels equipment wise and link it to scope-1 and 2 indicators to track performance  Integrate support with external databases for spent based approach to calculate Scope-3 emissions.",
        link: { data: { attributes: { url: "/videos/demo3.mp4" } } }
      }
    ]
  },
  whyRubicr: {
    title: "Why Choose Rubicr",
    description: "We understand that ESG data can be manual and unstructured. Our Sustainable Intelligence engine ensures you get the right data and insights to grow your business sustainably.",
    card: [
      {
        id: 1,
        heading: "End-to-End Lifecycle Solutions",
        description: "We offer a complete end-to-end lifecycle solution for ESG management. From initial assessment to reporting and beyond, our integrated approach ensures seamless sustainability performance management."
      },
      {
        id: 2,
        heading: "Extensive Experience",
        description: "With nearly 80 clients across diverse industries, our experience is both broad and deep. We understand unique challenges and tailor solutions to meet specific needs effectively."
      },
      {
        id: 3,
        heading: "Demonstration of Value",
        description: "We provide a holistic approach encompassing the entire value chain of the market. Our clarity and depth of expertise empower clients to achieve sustainability goals efficiently and effectively."
      }
    ]
  },
  imageToggler: {
    with_rubicr: {
      data: {
        attributes: {
          url: "/MacBook Pro 16_ - 4 (2).jpg"
        }
      }
    },
    without_rubicr: {
      data: {
        attributes: {
          url: "/MacBook Pro 16_ - 7 (1).jpg"
        }
      }
    }
  }
};

const EnhancedHomePage: React.FC = () => {
  // Hero Section
  const Hero = () => {
    const [mounted, setMounted] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
    useEffect(() => {
      const video = document.getElementById('hero-video');
      if (video) {
        video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
      }
      return () => {
        if (video) {
          video.removeEventListener('loadeddata', () => setIsVideoLoaded(true));
        }
      };
    }, []);
  
    return (
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
             src="/forest3.jpg"
            alt="Background"
            className="absolute w-full h-full object-cover"
            priority
            width={1920}
            height={1080}
            quality={75}
            style={{
              opacity: isVideoLoaded ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
          
          <video
            id="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute w-full h-full object-cover"
            style={{
              opacity: isVideoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            <source src="/videos/bgvideo21.mp4" type="video/mp4" />
          </video>
  
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
  
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Go Beyond Reporting
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-200 max-w-3xl mx-auto">
            Improve your Business Outcomes through Sustainability initiatives
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            The worlds leading AI-powered ESG platform
          </p>
          <Button
            label="Schedule a demo"
            background="#FFCD1B"
            color="black"
            href="/contact-us"
            className="transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>
    );
  };

  // Logo Section
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
  
    const duplicatedLogos = [
      ...staticData.logos.logos,
      ...staticData.logos.logos,
      ...staticData.logos.logos
    ];
  
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {staticData.logos.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {staticData.logos.description}
              </p>
            </motion.div>
  
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex gap-4 md:gap-8"
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
                    <div className="relative p-3 md:p-6 bg-white rounded-xl border border-gray-100 backdrop-blur-sm hover:shadow-lg transition-all duration-300 w-32 h-16 md:w-48 md:h-24 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={logo.attributes.url}
                          alt={logo.attributes.name}
                          fill
                          className="object-contain transition-all duration-300"
                          loading="lazy"
                          quality={75}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Why Us Section
  const WhyUs = () => {
    const [currentGroup, setCurrentGroup] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;
    
    const whyUsData = staticData.whyUs;
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
  
    const visibleCards = getVisibleCards();
  
    return (
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 md:mb-4">
            {whyUsData.heading}
          </h1>
          {/* <p className="text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            {whyUsData.description}
          </p> */}
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

  // Use Cases Section
  const UseCases = () => {
    const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);
    const VIDEO_PATH = '/demo.mp4';
    const activeCase = staticData.useCase.case_card[activeUseCaseIndex];
  
    return (
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 font-sans">
              {staticData.useCase.heading}
            </h2>
          </div>
  
          <div className="flex flex-col md:flex-row md:justify-center mb-8 md:mb-12 space-y-2 md:space-y-0 md:space-x-4">
            {staticData.useCase.case_card.map((useCase, idx) => (
              <button
                key={idx}
                onClick={() => setActiveUseCaseIndex(idx)}
                className={`
                  w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg
                  transition-all duration-300 cursor-pointer
                  ${activeUseCaseIndex === idx
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50'}
                `}
              >
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Circle
                    className={`w-3 h-3 md:w-4 md:h-4 ${
                      activeUseCaseIndex === idx ? 'text-white' : 'text-blue-500'
                    }`}
                  />
                  <span className="text-sm md:text-base font-semibold">
                    {useCase.heading}
                  </span>
                </div>
              </button>
            ))}
          </div>
  
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
            <div
              key={activeUseCaseIndex}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm w-full transform transition-all duration-300"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 font-sans">
                {activeCase.heading}
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                {activeCase.description}
              </p>
            </div>
  
            <video
              preload="none"
              className="w-full rounded-xl shadow-lg aspect-video object-cover"
              controls
              src={VIDEO_PATH}
              poster="/rubcr thumbnail.jpg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    );
  };

  // Why Rubicr Section
  const WhyRubicr = () => {
    const data = staticData.whyRubicr;
  
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

  // Image Toggle Section
  const ImageToggleClient = () => {
    const [showRubric, setShowRubric] = useState(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const imageData = staticData.imageToggler;

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
      const url = showRubric 
        ? imageData.with_rubicr.data.attributes.url 
        : imageData.without_rubicr.data.attributes.url;
      
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
          quality={75}
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

  // Our Reach Section
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

  // Main Return
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
        <ImageToggleClient />
        <OurReach />
        
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
    </div>
  );
};

export default EnhancedHomePage;
