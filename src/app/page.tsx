"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ImageToggle from './Components/imagetoggle';
import OurReach from './Components/ourreach';
import UseCases from './Components/usecase';

// Keep existing dynamic imports
const Navbar = dynamic(() => import("./Components/navbar"), {
  ssr:true,
  loading: () =>  <div className="h-16 bg-white animate-pulse" />
});
const Footer = dynamic(() => import("./Components/footer"), {
  ssr:true,
  loading: () =>  <div className="h-16 bg-white animate-pulse" />
});

const Button = dynamic(() => import("./Components/button"),{
  ssr : true
});


const Feedback = dynamic(() => import("./Components/feedback") ,{
  ssr : true
});

const WhyRubicr = dynamic(() => import("./Components/whyrubicr"), {
  ssr: true
});

const WhyUs = dynamic(() => import("./Components/whyus"), {
  ssr: true
});




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



interface Logo {
  data: any[];
}

interface WhyUs {
  us_card: any[];
}

interface UseCase {
  heading: string;
  case_card: Array<{
    heading: string;
    description: string;
    link: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  }>;
}

interface PageData {
  home: any;
  logos: {
    title: string;
    description: string;
    logos: any[];
  };
  whyUs: WhyUs | null;
  useCase: UseCase | null;
  imageToggler: any;
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


interface ErrorDisplayProps {
  message: string;
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

 

  // Enhanced Hero Section

  const Hero = () => {
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
          {/* Fallback image that shows immediately */}
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
          
          {/* Lazy loaded video */}
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
            <source 
              src="/bgvideo21.mp4" 
              type="video/mp4" 
            />
          </video>
  
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
  
        <div 
          className="relative z-10 container mx-auto px-6 text-center animate-fade-in"
        >
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
  
    // Create enough duplicates to ensure smooth infinite scroll
    const duplicatedLogos = [...pageData.logos.logos, ...pageData.logos.logos, ...pageData.logos.logos];
  
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
                          src={`${process.env.NEXT_PUBLIC_API_URL}${logo.attributes.url}`}
                          alt={logo.attributes.name}
                          fill
                          className="object-contain transition-all duration-300"
                          loading="lazy"
                          quality={75} // Adjust quality
                          priority={false}
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
  

  

  // Keep existing return statement structure with updated components
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <main className="relative">
        <Hero />
        <LogoSection />
        <WhyUs />
        <UseCases useCase={pageData.useCase} />
        <WhyRubicr />
        <Feedback />
        <ImageToggle/>
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
    </div>
  );
};

export default EnhancedHomePage;