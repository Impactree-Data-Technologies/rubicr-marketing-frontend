import { cache } from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface UsCard {
  id: number;
  heading: string;
  description: string;
  link: string;
}

interface WhyUsData {
  id: number;
  heading: string;
  description: string;
  us_card: UsCard[];
}

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      why_us: WhyUsData[];
    };
  };
}

const getWhyUsData = cache(async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/home?populate=why_us.us_card`, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: ApiResponse = await response.json();
    if (data.data?.attributes?.why_us?.[0]) {
      return data.data.attributes.why_us[0];
    } else {
      throw new Error('Data structure is not as expected');
    }
  } catch (err) {
    console.error('Error fetching WhyUs data:', err);
    return null;
  }
});

export default async function WhyUs() {
  const whyUsData = await getWhyUsData();

  if (!whyUsData) {
    return <div className="text-center py-16">No data available</div>;
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {whyUsData.heading}
        </h1>
        <p className="mb-12 text-xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
          {whyUsData.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUsData.us_card.map((item) => (
            <div key={item.id} className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.link}</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 h-14 flex items-center">{item.heading}</h2>
              <p className="text-gray-600 dark:text-gray-400 flex-grow">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}