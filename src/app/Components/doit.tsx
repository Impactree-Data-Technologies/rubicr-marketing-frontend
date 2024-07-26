import React, { useState, useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface MethodCardProps {
  heading: string;
  description: string;
  link: string;
}

interface MethodCardData extends MethodCardProps {
  id: number;
}

function MethodCard({ heading, description, link }: MethodCardProps) {
  return (
    <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <span className="text-4xl mr-4">{link}</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{heading}</h2>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

interface DoItData {
  title: string;
  do_card: MethodCardData[];
}

export default function DoIt() {
  const [doItData, setDoItData] = useState<DoItData | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/home?populate=do_it.do_card`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.attributes && data.data.attributes.do_it) {
          setDoItData(data.data.attributes.do_it);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!doItData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {doItData.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doItData.do_card.map((card) => (
            <MethodCard
              key={card.id}
              heading={card.heading}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}