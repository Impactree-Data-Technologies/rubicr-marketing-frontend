"use client"
import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';


// Define TypeScript interfaces
interface Logo {
  data: any[];
}

interface WhyUs {
  us_card: any[];
}

interface UseCase {
  heading: string;
  case_card: Array<{
    heading: string;
    description: string;
    link: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  }>;
}

interface PageData {
  home: any;
  logos: {
    title: string;
    description: string;
    logos: any[];
  };
  whyUs: WhyUs | null;
  useCase: UseCase | null;
  imageToggler: any;
}

const UseCases = () => {
  const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);
  const [pageData, setPageData] = useState<PageData>({
    home: null,
    logos: { title: '', description: '', logos: [] },
    whyUs: null,
    useCase: null,
    imageToggler: null
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) throw new Error('API URL is not configured');

        const response = await fetch(
          `${apiUrl}/api/home?populate=*,Logo.logo,use_case.case_card.link,why_us.us_card`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();

        setPageData({
          home: data.data.attributes,
          logos: {
            title: data.data.attributes.Logo?.logo_title ?? '',
            description: data.data.attributes.Logo?.logo_description ?? '',
            logos: data.data.attributes.Logo?.logo?.data ?? []
          },
          whyUs: data.data.attributes.why_us?.[0] ?? null,
          useCase: data.data.attributes.use_case ?? null,
          imageToggler: data.data.attributes.image_toggler
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

 
  if (!pageData?.useCase?.case_card?.length) return null;

  const activeCase = pageData.useCase.case_card[activeUseCaseIndex];

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 font-sans">
            {pageData.useCase.heading}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center mb-8 md:mb-12 space-y-2 md:space-y-0 md:space-x-4">
          {pageData.useCase.case_card.map((useCase, idx) => (
            <button
              key={idx}
              onClick={() => setActiveUseCaseIndex(idx)}
              className={`
                w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg 
                transition-all duration-300 cursor-pointer
                ${activeUseCaseIndex === idx
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
                }
              `}
            >
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Circle
                  className={`w-3 h-3 md:w-4 md:h-4 ${
                    activeUseCaseIndex === idx ? 'text-white' : 'text-blue-500'
                  }`}
                />
                <span className="text-sm md:text-base font-semibold">
                  {useCase.heading}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
          <div 
            key={activeUseCaseIndex}
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm order-2 lg:order-1 w-full 
                     transform transition-all duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 font-sans">
              {activeCase.heading}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
              {activeCase.description}
            </p>
          </div>

          <div className="relative order-1 lg:order-2 w-full h-[300px] md:h-[400px]">
            {activeCase.link?.data?.attributes?.url && (
              <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                <video
                  key={activeCase.link.data.attributes.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src={`${process.env.NEXT_PUBLIC_API_URL}${activeCase.link.data.attributes.url}`}
                    type="video/mp4"
                  />
                  Your browser does not support video playback.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;