"use client"
import React, { useState } from 'react';
import { Circle } from 'lucide-react';

interface CaseCard {
  heading: string;
  description: string;
  link: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface UseCaseProps {
  useCase: {
    heading: string;
    case_card: CaseCard[];
  } | null;
}

const VIDEO_PATH = '/demo.mp4';

const UseCases: React.FC<UseCaseProps> = ({ useCase }) => {
  const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);

  if (!useCase?.case_card?.length) return null;

  const activeCase = useCase.case_card[activeUseCaseIndex];

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 font-sans">
            {useCase.heading}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center mb-8 md:mb-12 space-y-2 md:space-y-0 md:space-x-4">
          {useCase.case_card.map((useCase, idx) => (
            <button
              key={idx}
              onClick={() => setActiveUseCaseIndex(idx)}
              className={`
                w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg
                transition-all duration-300 cursor-pointer
                ${activeUseCaseIndex === idx
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50'}
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
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm w-full transform transition-all duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 font-sans">
              {activeCase.heading}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
              {activeCase.description}
            </p>
          </div>

          <video
            preload="none"
            className="w-full rounded-xl shadow-lg aspect-video object-cover"
            controls
            src={VIDEO_PATH}
            poster="/rubcr thumbnail.jpg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default UseCases;