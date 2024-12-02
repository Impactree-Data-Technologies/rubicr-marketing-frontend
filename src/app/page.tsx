"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from 'next/dynamic';
import { Poppins } from 'next/font/google';

// Dynamic imports
const Navbar = dynamic(() => import("../app/Components/navbar"), { ssr: false });
const WhyRubicr = dynamic(() => import("../app/Components/whyrubicr"), { ssr: false });
const WhyUs = dynamic(() => import("../app/Components/whyus"), { ssr: false });
const Usecase = dynamic(() => import("../app/Components/usecase"), { ssr: false });
const Feedback = dynamic(() => import("../app/Components/feedback"), { ssr: false });
const ImageToggle = dynamic(() => import("../app/Components/imagetoggle"), { ssr: false });
const OurReach = dynamic(() => import("../app/Components/ourreach"), { ssr: false });
const BotpressChat = dynamic(() => import("../app/Components/BotpressChat"), { ssr: false });
const Footer = dynamic(() => import("../app/Components/footer"), { ssr: false });
const Button = dynamic(() => import("../app/Components/button"), { ssr: false });
const Image = dynamic(() => import('next/image'), { ssr: false });

// Comprehensive Interfaces
interface LogoAttributes {
  url: string;
  name: string;
  alternativeText?: string;
}

interface Logo {
  attributes: LogoAttributes;
}

interface LogoData {
  title: string;
  description: string;
  logos: Logo[];
}

interface HomeData {
  title: string;
  description: string;
  subdescription: string;
}

interface ApiResponse<T> {
  data: {
    attributes: T;
  };
}

interface WithRubicrData {
  id: number;
  attributes: {
    url: string;
  };
}

interface WhyRubicrAttributes {
  card?: {
    heading?: string;
  };
}

interface ImageTogglerAttributes {
  image_toggler?: {
    with_rubicr?: {
      data: WithRubicrData;
    };
  };
}

// Animation Variants (kept as before)
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

// Logo Carousel Component with TypeScript Props
const LogoCarousel: React.FC<{ 
  logos: Logo[]; 
  BASE_URL?: string 
}> = ({ logos, BASE_URL = '' }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const animation = () => {
      const moveAmount = 2;
      setPosition((prevPosition) => {
        const totalWidth = (logos.length * 200);
        
        if (Math.abs(prevPosition) >= totalWidth) {
          return 0;
        }
        return prevPosition - moveAmount;
      });
    };

    const animationFrame = setInterval(animation, 30);

    return () => clearInterval(animationFrame);
  }, [logos.length]);

  return (
    <div className="relative w-full overflow-hidden bg-white py-8">
      <div 
        className="flex"
        style={{
          transform: `translateX(${position}px)`,
          transition: 'transform 0.1s linear'
        }}
      >
        {[...Array(3)].map((_, setIndex) => (
          logos.map((logoData, index) => (
            <div
              key={`logo-${setIndex}-${index}`}
              className="flex-shrink-0 mx-8"
              style={{ width: '200px' }}
            >
              <Image
                src={`${BASE_URL}${logoData.attributes.url}`}
                alt={logoData.attributes.name || 'Logo'}
                width={150}
                height={75}
                className="w-auto h-16 object-contain"
              />
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  style: 'normal'
});

// AnimatedText Component
const AnimatedText: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}> = ({ children, className = "", delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// AnimatedSection Component
const AnimatedSection: React.FC<{ 
  children: React.ReactNode; 
  className?: string 
}> = ({ children, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
        }
      }}
      className={`relative z-10 py-6 sm:py-8 md:py-8 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Main Component
export default function Demo() {
  const [data1, setData1] = useState<HomeData | null>(null);
  const [data3, setData3] = useState<WhyRubicrAttributes | null>(null);
  const [data4, setData4] = useState<WithRubicrData | null>(null);
  const [logoData, setLogoData] = useState<LogoData>({ 
    title: '', 
    description: '', 
    logos: [] 
  });

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== 'undefined') {
        try {
          const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
          const responses = await Promise.all([
            fetch(`${BASE_URL}/api/home?populate=*`),
            fetch(`${BASE_URL}/api/home?populate=Logo.logo`),
            fetch(`${BASE_URL}/api/home?populate[0]=whyrubicr.card.heading`),
            fetch(`${BASE_URL}/api/home?populate[0]=image_toggler.with_rubicr`)
          ]);

          // Check if all responses are okay
          if (!responses.every(response => response.ok)) {
            throw new Error("Network response was not ok");
          }

          const [
            responseData1, 
            responseData2, 
            responseData3, 
            responseData4
          ] = await Promise.all(responses.map(r => r.json()));

          // Type-safe data assignments
          setData1(responseData1.data.attributes);
          setLogoData({
            title: responseData2.data.attributes.Logo.logo_title,
            description: responseData2.data.attributes.Logo.logo_description,
            logos: responseData2.data.attributes.Logo.logo.data.map((item: any) => ({
              attributes: {
                url: item.attributes.url,
                name: item.attributes.name || 'Logo',
                alternativeText: item.attributes.alternativeText || ''
              }
            }))
          });
          setData3(responseData3.data.attributes);
          setData4(responseData4.data.attributes.image_toggler?.with_rubicr?.data ?? null);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();
  }, []);

  // Rest of the component remains the same as in the original code
  return (
    <div className={poppins.className}>
      {/* Previous JSX remains unchanged */}
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      
      {/* Hero Section with Video Background */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(111vh-4rem)]">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/856572/856572-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">
          {data1 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto text-center text-white"
            >
              <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28">
              <AnimatedText className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4">
                    {data1.title}
                  </h1>
                </AnimatedText>
              
                <AnimatedText className="mb-4 md:mb-6" delay={0.2}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold px-4">
                    {data1.description}
                  </h3>
                </AnimatedText>
                
                <AnimatedText className="mb-6 md:mb-8" delay={0.4}>
                  <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
                    {data1.subdescription}
                  </p>
                </AnimatedText>
              
              <AnimatedText delay={0.6}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                   className="px-4"
                >
                  <Button 
                    label="Schedule a demo" 
                    background="#FFCD1B" 
                    color="black" 
                    href="/contact-us"
                  />
                </motion.div>
              </AnimatedText>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Logo Section */}
      {logoData.logos.length > 0 && (
    <motion.section
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="py-6 md:py-10 bg-white"
>
  <div className="container mx-auto">
    <AnimatedText className="mb-2 md:mb-3">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">
        {logoData.title}
      </h2>
    </AnimatedText>
    
    <AnimatedText className="mb-4 md:mb-6" delay={0.2}>
      <p className="text-base md:text-lg lg:text-xl text-center text-gray-600 max-w-3xl mx-auto">
        {logoData.description}
      </p>
    </AnimatedText>

    <div className="w-full overflow-hidden">
      <LogoCarousel 
        logos={logoData.logos} 
        BASE_URL={process.env.NEXT_PUBLIC_API_URL} 
      />
    </div>
  </div>
</motion.section>

)}

      {/* Rest of the sections */}
      <AnimatedSection >
        <WhyUs />
      </AnimatedSection>

      {/* <AnimatedSection>
        <InteractiveMap />
      </AnimatedSection> */}

      <AnimatedSection>
        <Usecase />
      </AnimatedSection>

      <AnimatedSection >
        <WhyRubicr />
      </AnimatedSection>

      {/* <AnimatedSection >
        <SixStep />
      </AnimatedSection> */}

      
<AnimatedSection>
        <Feedback />
      </AnimatedSection>

      <AnimatedSection>
        <ImageToggle />
      </AnimatedSection>


      <AnimatedSection>
        <OurReach />
      </AnimatedSection>

      {/* <AnimatedSection>
        <MediaCoverage />
      </AnimatedSection> */}

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
      
      <Footer />
      <BotpressChat />
    </div>
  );
}