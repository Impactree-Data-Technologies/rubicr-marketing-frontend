"use client"

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Circle } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState(0);
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
        setActiveUseCase(formattedUseCases[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSelection = (useCase: UseCase, index: number) => {
    setActiveUseCase(useCase);
    setActiveIndex(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || !activeUseCase) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600">
            {data.heading}
          </h1>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left sidebar navigation */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.heading}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-2 last:mb-0"
                >
                  <button
                    onClick={() => handleSelection(useCase, index)}
                    className={`w-full group relative p-4 rounded-xl transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md'
                        : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Circle className={`w-2 h-2 ${
                        activeIndex === index ? 'text-purple-600 fill-purple-600' : 'text-gray-400'
                      }`} />
                      <div className={`flex-1 text-left ${
                        activeIndex === index ? 'text-purple-600 font-semibold' : 'text-gray-700'
                      }`}>
                        <h3 className="text-lg">{useCase.heading}</h3>
                      </div>
                      <ArrowRight className={`w-4 h-4 transform transition-transform ${
                        activeIndex === index ? 'text-purple-600 translate-x-1' : 'text-gray-400 group-hover:translate-x-1'
                      }`} />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right content area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeUseCase.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                <div className="order-2 md:order-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {activeUseCase.heading}
                  </h2>
                  <div className="prose prose-purple max-w-none text-gray-600">
                    {activeUseCase.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-base leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={`/${activeUseCase.heading.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Learn more
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                <div className="order-1 md:order-2">
                  <div className="relative rounded-xl overflow-hidden shadow-md">
                    {activeUseCase.videoSrc ? (
                      <div className="relative aspect-video">
                        <video
                          key={activeUseCase.videoSrc}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={activeUseCase.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Video not available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}