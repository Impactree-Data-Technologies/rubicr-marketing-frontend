import React, { useState, useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface CardData {
  id: number;
  heading: string;
  description: string;
  subdescription: string;
}

interface ImpactCardProps {
  heading: string;
  description: string;
  subdescription: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ heading, description, subdescription }) => {
  const icon = heading.split(' ')[0];
  const number = heading.split(' ')[1];

  return (
    <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
      <div className="flex items-center mb-6">
        <span className="text-4xl mr-4">{icon}</span>
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">{number}</h2>
      </div>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      <p className="text-gray-600 dark:text-gray-400">{subdescription}</p>
    </div>
  );
};

interface ImpactData {
  title: string;
  impact_card: CardData[];
}

const Impact: React.FC = () => {
  const [impactData, setImpactData] = useState<ImpactData | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/home?populate=Impact.impact_card`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.attributes && data.data.attributes.Impact && data.data.attributes.Impact.length > 0) {
          setImpactData(data.data.attributes.Impact[0]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!impactData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {impactData.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactData.impact_card.map((cardData) => (
            <ImpactCard
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

export default Impact;