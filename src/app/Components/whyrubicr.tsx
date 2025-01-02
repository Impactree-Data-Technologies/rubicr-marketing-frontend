'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface CardData {
  id: number;
  heading: string;
  description: string;
  subdescription: string;
}

interface WhyRubicrData {
  title: string;
  description: string;
  card: CardData[];
}

const getIconForCard = (index: number) => {
  switch (index % 3) {
    case 0:
      return <Zap className="w-8 h-8 text-purple-500" />;
    case 1:
      return <Shield className="w-8 h-8 text-blue-500" />;
    case 2:
      return <Star className="w-8 h-8 text-yellow-500" />;
    default:
      return <Star className="w-8 h-8 text-yellow-500" />;
  }
};

const FeatureCard = ({ heading, description, subdescription, index }: CardData & { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-bl-full opacity-20 transform group-hover:scale-110 transition-transform duration-300" />
      
      <div className="relative z-10">
        <div className="mb-6">
          {getIconForCard(index)}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{heading}</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      </div>
    </motion.div>
  );
};

const LoadingState = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

const ErrorState = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="min-h-[400px] flex flex-col items-center justify-center">
    <p className="text-lg text-red-600 mb-4">Failed to load content</p>
    <button
      onClick={retry}
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default function WhyRubicr() {
  const [data, setData] = useState<WhyRubicrData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!BASE_URL) {
        throw new Error('API URL is not configured');
      }

      const response = await fetch(`${BASE_URL}/api/home?populate=whyrubicr.card`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      
      if (!jsonData.data?.attributes?.whyrubicr?.[0]) {
        throw new Error('Invalid data structure received from API');
      }

      setData(jsonData.data.attributes.whyrubicr[0]);
    } catch (err) {
      console.error('Error fetching WhyRubicr data:', err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} retry={fetchData} />;
  }

  if (!data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {data.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.card.map((cardData, index) => (
            <FeatureCard
              key={cardData.id}
              {...cardData}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}