// components/Hero.js
"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
        <a 
          href="/contact-us"
          className="inline-block px-8 py-3 bg-[#FFCD1B] text-black rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          Schedule a demo
        </a>
      </div>
    </section>
  );
};

export default Hero;