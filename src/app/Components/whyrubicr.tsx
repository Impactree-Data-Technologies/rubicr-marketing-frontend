import React, { useState, useEffect } from 'react';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface CardData {
  id: number;
  heading: string;
  description: string;
  subdescription: string;
}

interface FeatureCardProps {
  heading: string;
  description: string;
  subdescription: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ heading, description, subdescription }) => {
  return (
    <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
      <div className="text-5xl mb-6">{subdescription}</div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{heading}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

interface WhyRubicrData {
  title: string;
  description: string;
  card: CardData[];
}

const WhyRubicr: React.FC = () => {
  const [whyRubicrData, setWhyRubicrData] = useState<WhyRubicrData | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/home?populate=whyrubicr.card`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.attributes && data.data.attributes.whyrubicr && data.data.attributes.whyrubicr.length > 0) {
          setWhyRubicrData(data.data.attributes.whyrubicr[0]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!whyRubicrData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {whyRubicrData.title}
        </h1>
        <p className="mb-12 text-xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
          {whyRubicrData.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyRubicrData.card.map((cardData) => (
            <FeatureCard
              key={cardData.id}
              heading={cardData.heading}
              description={cardData.description}
              subdescription={cardData.subdescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyRubicr;