import { cache } from 'react'

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

function FeatureCard({ heading, description, subdescription }: CardData) {
  return (
    <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
      <div className="text-5xl mb-6">{subdescription}</div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{heading}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default async function WhyRubicr() {
  const whyRubicrData = await getWhyRubicrData();

  if (!whyRubicrData) {
    return <div className="text-center py-16">No data available</div>;
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
              {...cardData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}