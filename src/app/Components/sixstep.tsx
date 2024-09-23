"use client"

import React, { useState, useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface StepData {
  id: number;
  title: string;
  description: string;
}

interface StepProps extends StepData {
  number: number;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, onHover, onLeave, isHovered }) => (
  <div className="flex flex-col items-center relative group">
    <div
      className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 relative ${isHovered ? 'bg-green-500' : 'bg-gray-950'}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span className="text-white font-bold">{number}</span>
      {isHovered && (
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-50"></div>
      )}
    </div>
    <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 bg-white text-black text-sm rounded shadow-md z-10 w-72 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${number === 1 ? 'md:left-0 md:translate-x-0' : number === 6 ? 'md:left-auto md:right-0 md:translate-x-0' : ''}`}>
      <p>{description}</p>
    </div>
    <h3 className="text-sm font-bold text-center mt-2">{title}</h3>
  </div>
);

interface SixStepData {
  title: string;
  step_card: StepData[];
}

const SixStep: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [sixStepData, setSixStepData] = useState<SixStepData | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/home?populate=six_step.step_card`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.attributes && data.data.attributes.six_step) {
          setSixStepData(data.data.attributes.six_step);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!sixStepData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-yellow-400 py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {sixStepData.title}
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between relative">
          {sixStepData.step_card.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="relative flex flex-col items-center w-full md:w-auto">
                <Step
                  {...step}
                  number={index + 1}
                  onHover={() => setHoveredStep(step.id)}
                  onLeave={() => setHoveredStep(null)}
                  isHovered={hoveredStep === step.id}
                />
              </div>
              {index < sixStepData.step_card.length - 1 && (
                <>
                  <div className="md:hidden flex flex-col justify-center items-center h-16 w-full">
                    <div className="h-12 w-1 bg-gray-950"></div>
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-950"></div>
                  </div>
                  <div className="hidden md:flex flex-1 items-center justify-center">
                    <div className="w-16 h-1 bg-gray-950 -translate-y-6"></div>
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-950 -translate-y-6"></div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SixStep;