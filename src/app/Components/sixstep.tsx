import React, { useState } from 'react';

const Step = ({ number, title, description, isActive, onHover, onLeave, isHovered }) => (
  <div className="flex flex-col items-center relative">
    <div
      className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 relative ${isActive || isHovered ? 'bg-green-500' : 'bg-gray-300'}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span className="text-white font-bold">{number}</span>
      {(isActive || isHovered) && (
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-50"></div>
      )}
    </div>
    {isHovered && (
      <div className={`absolute left-20 -top-20 p-4 bg-white text-black text-sm rounded shadow-md z-10 ${number === 4 || number === 5 ? 'w-96' : 'w-72'}`}>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1">{description}</p>
      </div>
    )}
    <h3 className="text-sm font-medium text-white text-center">{title}</h3>
  </div>
);

const SixStep = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    { number: 1, title: 'Evaluate ESG Preparedness', description: 'Detailed info about ESG Preparedness.', isActive: false },
    { number: 2, title: 'Identify the need to invest in ESG', description: 'Detailed info about the need to invest in ESG.', isActive: false },
    { number: 3, title: 'What are the ESG Risks / Opportunities', description: 'Detailed info about ESG Risks / Opportunities.', isActive: false },
    { number: 4, title: 'Where does the data lie?', description: 'Detailed info about where the data lies.', isActive: false },
    { number: 5, title: 'Set Relevant Targets', description: 'Detailed info about setting relevant targets.', isActive: false },
    { number: 6, title: 'Streamline Data Collection & Reporting', description: 'Detailed info about streamlining data collection & reporting.', isActive: false },
  ];

  const handleMouseEnter = (index) => {
    setHoveredStep(index);
  };

  const handleMouseLeave = () => {
    setHoveredStep(null);
  };

  return (
    <div className="bg-yellow-400 py-8 px-4 md:px-8 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          How does one achieve Sustainable Performance Management
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center flex-grow flex-shrink"
            >
              <Step
                number={step.number}
                title={step.title}
                description={step.description}
                isActive={step.isActive}
                isHovered={hoveredStep === index}
                onHover={() => handleMouseEnter(index)}
                onLeave={handleMouseLeave}
              />
              {index < steps.length - 1 && (
                <div className="relative flex items-center ml-4">
                  <div className="w-16 h-1 bg-gray-400"></div>
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-400 -translate-y-1"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SixStep;
