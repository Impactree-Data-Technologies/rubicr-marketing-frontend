"use client";
import Link from "next/link";
import { useState } from "react";

export default function Usecase() {
  const [activeUseCase, setActiveUseCase] = useState({
    heading: "Sustainability Reporting",
    description: "Be in total control of your ESG reporting needs. RubiCr's Sustainable Intelligence Platform helps you track all the required ESG indicators.\nRubiCr supports all major global frameworks, thereby giving you the power to choose the frameworks most relevant to your business.\nCollect data from multiple teams, track indicators and create a single view for all your ESG reports",
    videoSrc: "",
    icon: "📊",
  });

  const useCases = [
    {
      heading: "Sustainability Reporting",
      description: "Be in total control of your ESG reporting needs. RubiCr's Sustainable Intelligence Platform helps you track all the required ESG indicators.\nRubiCr supports all major global frameworks, thereby giving you the power to choose the frameworks most relevant to your business.\nCollect data from multiple teams, track indicators and create a single view for all your ESG reports",
      videoSrc: "",
      icon: "📊",
    },
    {
      heading: "Performance Management",
      description: "Make ESG reporting a part of the Regular performance or MIS monitoring.\n Track standard or custom indicators relevant to your business that enable you to make better decisions.\nIntegrate with key financial and non-financial indicators to know the health of your organisation,",
      videoSrc: "",
      icon: "📈",
    },
    {
      heading: "Emission Tracking",
      description: "Ground up emissions tracking platform that helps you accurately track both the absolute emissions and the drivers for scope-1/2/3 emissions. \n Track leading and lagging indicators like energy, fuels equipment wise and link it to scope-1 and 2 indicators to track performance \nIntegrate support with external databases for spent based approach to calculate Scope-3 emissions.",
      videoSrc: "",
      icon: "🌿",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Use Cases
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
              onClick={() => setActiveUseCase(useCase)}
            >
              {useCase.heading}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col justify-start p-8 bg-white dark:bg-gray-800 w-full md:w-1/2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">{activeUseCase.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeUseCase.heading}
              </h2>
            </div>
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
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center text-gray-500 dark:text-gray-400">
              Video placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}