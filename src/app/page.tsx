"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from 'next/dynamic';
import Link from "next/link";

// Dynamic imports
const Navbar = dynamic(() => import("../app/Components/navbar"), { ssr: false });
const WhyRubicr = dynamic(() => import("../app/Components/whyrubicr"), { ssr: false });
const WhyUs = dynamic(() => import("../app/Components/whyus"), { ssr: false });
const Impact = dynamic(() => import("../app/Components/impact"), { ssr: false });
const Doit = dynamic(() => import("../app/Components/doit"), { ssr: false });
const Usecase = dynamic(() => import("../app/Components/usecase"), { ssr: false });
const SixStep = dynamic(() => import("../app/Components/sixstep"), { ssr: false });
const InteractiveMap = dynamic(() => import("../app/Components/map"), { ssr: false });
const TeamSection = dynamic(() => import("../app/Components/teamsection"), { ssr: false });
const ImageToggle = dynamic(() => import("../app/Components/imagetoggle"), { ssr: false });
const Feedback = dynamic(() => import("../app/Components/feedback"), { ssr: false });
const Footer = dynamic(() => import("../app/Components/footer"), { ssr: false });
const Button = dynamic(() => import("../app/Components/button"), { ssr: false });
const OurReach = dynamic(() => import("../app/Components/ourreach"), { ssr: false });
const MediaCoverage = dynamic(() => import("../app/Components/MediaCoverage"), { ssr: false });
const BotpressChat = dynamic(() => import("../app/Components/BotpressChat"), { ssr: false });
const Image = dynamic(() => import('next/image'), { ssr: false });

// Advanced animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

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

const scaleUpVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Interfaces remain the same
interface LogoAttributes {
  url: string;
  name: string;
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

interface WithRubicrData {
  id: number;
  attributes: {
    url: string;
  };
}

interface CompanyLogoProps {
  title: string;
  description: string;
  logos: Logo[];
}

// Enhanced AnimatedText component for text animations
const AnimatedText = ({ children, className = "", delay = 0 }) => {
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

// Enhanced CompanyLogo component
function CompanyLogo({ title, description, logos }: CompanyLogoProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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

  if (!Array.isArray(logos)) {
    console.error("logos is not an array:", logos);
    return null;
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-12 md:py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText className="mb-3 md:mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">
            {title}        
          </h2>
        </AnimatedText>
        <AnimatedText className="mb-8 md:mb-12" delay={0.2}>
          <p className="text-base md:text-lg lg:text-xl text-center text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </AnimatedText>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
        >
          {logos.map((logoData, index) => {
            const logo = logoData.attributes;
            return (
              <motion.div
                key={index}
                variants={scaleUpVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={`${BASE_URL}${logo.url}`}
                  alt={logo.name}
                  width={150}
                  height={75}
                  objectFit="contain"
                  className="max-w-full h-auto"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Main component
export default function Demo() {
  const [data1, setData1] = useState<HomeData | null>(null);
  const [data3, setData3] = useState<any>(null);
  const [data4, setData4] = useState<WithRubicrData | null>(null);
  const [logoData, setLogoData] = useState<LogoData>({ title: '', description: '', logos: [] });
  const [scrollY, setScrollY] = useState(0);

  // Data fetching useEffect remains the same
  useEffect(() => {
    async function fetchData() {
      if (typeof window !== 'undefined') {
        try {
          const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
          const response1 = await fetch(`${BASE_URL}/api/home?populate=*`);
          const response2 = await fetch(`${BASE_URL}/api/home?populate=Logo.logo`);
          const response3 = await fetch(`${BASE_URL}/api/home?populate[0]=whyrubicr.card.heading`);
          const response4 = await fetch(`${BASE_URL}/api/home?populate[0]=image_toggler.with_rubicr`);
          console.log(BASE_URL);
          if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
            throw new Error("Network response was not ok");
          }

          const responseData1 = await response1.json();
          const responseData2 = await response2.json();
          const responseData3 = await response3.json();
          const responseData4 = await response4.json();

          setData1(responseData1.data.attributes);
          setLogoData({
            title: responseData2.data.attributes.Logo.logo_title,
            description: responseData2.data.attributes.Logo.logo_description,
            logos: responseData2.data.attributes.Logo.logo.data.map((item: any) => ({
              attributes: {
                url: item.attributes.url,
                name: item.attributes.name || 'Logo'
              }
            }))
          });
          setData3(responseData3.data.attributes);
          setData4(responseData4.data.attributes.image_toggler.with_rubicr.data);
          console.log("url", responseData4.data.attributes.image_toggler.with_rubicr.data.attributes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div className="font-sans">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      
      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(112vh-4rem)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bgimage.webp')" }}
        />
        
        <div className="relative z-10 w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12">
          {data1 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto text-center text-white"
            >
              <AnimatedText className="mb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {data1.title}
                </h1>
              </AnimatedText>
              
              <AnimatedText className="mb-4" delay={0.2}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                  {data1.description}
                </h3>
              </AnimatedText>
              
              <AnimatedText className="mb-6" delay={0.4}>
                <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                  {data1.subdescription}
                </p>
              </AnimatedText>
              
              <AnimatedText delay={0.6}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    label="Begin Your Journey" 
                    background="#FFCD1B" 
                    color="black" 
                    href="/contact-us"
                  />
                </motion.div>
              </AnimatedText>
            </motion.div>
          )}
        </div>
      </div>

      {/* Logo Section */}
      {logoData.logos.length > 0 && (
        <CompanyLogo 
          title={logoData.title} 
          description={logoData.description} 
          logos={logoData.logos} 
        />
      )}

      {/* Animated Sections */}
      <AnimatedSection className="bg-gray-100">
        <WhyUs />
      </AnimatedSection>

      <AnimatedSection>
        <InteractiveMap />
      </AnimatedSection>

      <AnimatedSection>
        <Usecase />
      </AnimatedSection>

      <AnimatedSection className="bg-gray-100">
        <WhyRubicr />
      </AnimatedSection>

      <AnimatedSection className="bg-gray-100">
        <SixStep />
      </AnimatedSection>

      <AnimatedSection>
        <ImageToggle />
      </AnimatedSection>

      <AnimatedSection>
        <Feedback />
      </AnimatedSection>

      <AnimatedSection>
        <OurReach />
      </AnimatedSection>

      <AnimatedSection>
        <MediaCoverage />
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <motion.section 
          className="relative z-10 bg-[#f6e2cb] py-12 sm:py-16 md:py-20 mx-4 sm:mx-8 md:mx-12 lg:mx-20 rounded-3xl mb-20"
          variants={scaleUpVariants}
        >
          <div className="max-w-screen-xl mx-auto px-4">
            <AnimatedText>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Get Started Today
              </h2>
            </AnimatedText>
            
            <AnimatedText delay={0.2}>
              <hr className="border-t-2 border-[#64271F] w-1/4 mb-6" />
            </AnimatedText>
            
            <AnimatedText delay={0.4}>
              <p className="text-lg sm:text-xl md:text-2xl mb-8">
                Ready to transform your ESG Performance?
              </p>
            </AnimatedText>
            
            <AnimatedText delay={0.6}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  label="Begin Your Journey" 
                  background="#FFCD1B" 
                  color="black" 
                  href="/contact-us"
                />
              </motion.div>
            </AnimatedText>
          </div>
        </motion.section>
      </AnimatedSection>

      <Footer />
      <BotpressChat />
    </div>
  );
}

// Enhanced AnimatedSection component
function AnimatedSection({ children, className = "" }) {
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
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
        }
      }}
      className={`relative z-10 py-12 sm:py-16 md:py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}