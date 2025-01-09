import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Components/button';

interface HeroProps {
  title: string;
  description: string;
  subdescription: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, subdescription }) => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/bgvideo2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">{title}</h1>
        <p className="text-xl md:text-2xl mb-6 text-gray-200 max-w-3xl mx-auto">{description}</p>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">{subdescription}</p>
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
};

export default Hero;