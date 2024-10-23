import { cache } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

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

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 pb-3">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="px-6 pb-4">
    {children}
  </div>
);

const CardFooter = ({ children }) => (
  <div className="px-6 pb-6">
    {children}
  </div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const getWhyUsData = cache(async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/home?populate=why_us.us_card`, {
      next: { revalidate: 3600 },
    });
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
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 opacity-0 animate-fade-in">
            {whyUsData.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200">
            {whyUsData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsData.us_card.map((item, index) => (
            <div
              key={item.id}
              className={`opacity-0 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.heading}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </CardContent>
                {/* <CardFooter>
                  <a 
                    href={item.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardFooter> */}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}