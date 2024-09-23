"use client"

import React, { useState, useEffect } from 'react';
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface UseCase {
  heading: string;
  description: string;
  videoSrc: string | null;
}

interface Data {
  heading: string;
  case_card: {
    heading: string;
    description: string;
    link: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  }[];
}

export default function Usecase() {
  const [data, setData] = useState<Data | null>(null);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [activeUseCase, setActiveUseCase] = useState<UseCase | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/api/home?populate[0]=use_case.case_card.link`);
        const responseData = await response.json();
        const useCaseData = responseData.data.attributes.use_case;
        setData(useCaseData);

        const formattedUseCases = useCaseData.case_card.map((useCase: any) => ({
          heading: useCase.heading,
          description: useCase.description,
          videoSrc: useCase.link.data.attributes.url ? `${BASE_URL}${useCase.link.data.attributes.url}` : null,
        }));

        setUseCases(formattedUseCases);

        if (formattedUseCases.length > 0) {
          setActiveUseCase(formattedUseCases[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSelection = (useCase: UseCase) => {
    setActiveUseCase(useCase);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !activeUseCase) {
    return <div>No data available</div>;
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {data.heading}
        </h1>
        <div className="mb-12 flex flex-col sm:flex-row flex-wrap justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {useCases.map((useCase) => (
            <button
              key={useCase.heading}
              className={`px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 w-full sm:w-auto ${
                activeUseCase.heading === useCase.heading
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleSelection(useCase)}
            >
              {useCase.heading}
            </button>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col justify-start p-8 bg-white dark:bg-gray-800 w-full md:w-1/2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {activeUseCase.heading}
            </h2>
            {activeUseCase.description.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
                {paragraph}
              </p>
            ))}
            <Link
              className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              href={`/${activeUseCase.heading.toLowerCase().replace(/\s+/g, '-')}`}
            >
              Learn more about Our Use Case
            </Link>
          </div>
          <div className="flex justify-center items-center w-full md:w-1/2">
            {activeUseCase.videoSrc ? (
              <video
                key={activeUseCase.videoSrc}
                className="w-full aspect-video rounded-lg shadow-md"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={activeUseCase.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center text-gray-500 dark:text-gray-400">
                Video not available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}