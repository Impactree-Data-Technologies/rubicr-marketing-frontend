// components/WhyRubicr.js
"use client"

import { motion } from 'framer-motion';
import { Star, Shield, Zap } from 'lucide-react';
import { staticData } from '@/data/static-data';

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
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-bl-full opacity-20 transform group-hover:scale-110 transition-transform duration-300" />
              
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

export default WhyRubicr;