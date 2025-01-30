"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Star } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-500">
        Error: {error.message}
      </div>
    );
  }

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

export default WhyRubicr;