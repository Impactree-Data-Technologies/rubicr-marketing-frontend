"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Logo {
  attributes: {
    url: string;
    name: string;
  };
}

interface LogoSectionProps {
  title: string;
  description: string;
  logos: Logo[];
}

const LogoSection: React.FC<LogoSectionProps> = ({ title, description, logos }) => {
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

  const duplicatedLogos = [...logos, ...logos, ...logos];

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
          <motion.div variants={headerVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sans">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans leading-relaxed">
              {description}
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
                <div key={index} className="flex-shrink-0 group relative">
                  <div className="relative p-3 md:p-6 bg-white rounded-xl border border-gray-100 backdrop-blur-sm hover:shadow-lg transition-all duration-300 w-32 h-16 md:w-48 md:h-24 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${logo.attributes.url}`}
                        alt={logo.attributes.name}
                        fill
                        className="object-contain transition-all duration-300"
                        loading="lazy"
                        quality={75}
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

      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-pink-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </section>
  );
};

export default LogoSection;