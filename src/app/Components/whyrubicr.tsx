import React from 'react';
import { cache } from 'react';
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

interface ApiResponse {
  data: {
    attributes: {
      whyrubicr: WhyRubicrData[];
    };
  };
}

const getWhyRubicrData = cache(async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/home?populate=whyrubicr.card`, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: ApiResponse = await response.json();
    if (data.data?.attributes?.whyrubicr?.[0]) {
      return data.data.attributes.whyrubicr[0];
    } else {
      throw new Error('Data structure is not as expected');
    }
  } catch (err) {
    console.error('Error fetching WhyRubicr data:', err);
    return null;
  }
});

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
        
        {/* <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          {subdescription}
        </div> */}
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{heading}</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        
       
      </div>
    </motion.div>
  );
};

export default async function WhyRubicr() {
  const whyRubicrData = await getWhyRubicrData();

  if (!whyRubicrData) {
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
            {whyRubicrData.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {whyRubicrData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyRubicrData.card.map((cardData, index) => (
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