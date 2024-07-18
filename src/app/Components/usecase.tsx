"use client";
import Link from "next/link";
import { useState } from "react";

export default function Usecase() {
  const [activeUseCase, setActiveUseCase] = useState({
    heading: "Sustainability Reporting",
    description: "Be in total control of your ESG reporting needs. RubiCr's Sustainable Intelligence Platform helps you track all the required ESG indicators.\nRubiCr supports all major global frameworks, thereby giving you the power to choose the frameworks most relevant to your business.\nCollect data from multiple teams, track indicators and create a single view for all your ESG reports",
    videoSrc: "",
  });

  const handleSustainabilityReportingClick = () => {
    setActiveUseCase({
      heading: "Sustainability Reporting",
      description: "Be in total control of your ESG reporting needs. RubiCr's Sustainable Intelligence Platform helps you track all the required ESG indicators.\nRubiCr supports all major global frameworks, thereby giving you the power to choose the frameworks most relevant to your business.\nCollect data from multiple teams, track indicators and create a single view for all your ESG reports",
      videoSrc: "",
    });
  };

  const handlePerformanceManagementClick = () => {
    setActiveUseCase({
      heading: "Performance Management",
      description: "Make ESG reporting a part of the Regular performance or MIS monitoring.\n Track standard or custom indicators relevant to your business that enable you to make better decisions.\nIntegrate with key financial and non-financial indicators to know the health of your organisation,",
      videoSrc: "",
    });
  };

  const handleEmissionTrackingClick = () => {
    setActiveUseCase({
      heading: "Emission Tracking",
      description: "Ground up emissions tracking platform that helps you accurately track both the absolute emissions and the drivers for scope-1/2/3 emissions. \n Track leading and lagging indicators like energy, fuels equipment wise and link it to scope-1 and 2 indicators to track performance \nIntegrate support with external databases for spent based approach to calculate Scope-3 emissions.",
      videoSrc: "",
    });
  };

  return (
    <div className="py-12 px-6 md:px-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 text-center md:text-left">
          Use Cases
        </h1>
        <div className="mb-12 text-lg text-gray-700 dark:text-gray-300 flex flex-wrap justify-center md:justify-start space-x-4">
          <button
            className={`text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-500 focus:outline-none ${
              activeUseCase.heading === "Sustainability Reporting" ? "underline" : ""
            }`}
            onClick={handleSustainabilityReportingClick}
          >
            Sustainability Reporting
          </button>
          <button
            className={`text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-500 focus:outline-none ${
              activeUseCase.heading === "Performance Management" ? "underline" : ""
            }`}
            onClick={handlePerformanceManagementClick}
          >
            Performance Management
          </button>
          <button
            className={`text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-500 focus:outline-none ${
              activeUseCase.heading === "Emission Tracking" ? "underline" : ""
            }`}
            onClick={handleEmissionTrackingClick}
          >
            Emission Tracking
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col justify-start p-8 bg-white dark:bg-gray-800 w-full md:w-1/2 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {activeUseCase.heading}
            </h2>
            {activeUseCase.description.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
                {paragraph}
              </p>
            ))}
            {activeUseCase.heading === "Sustainability Reporting" && (
              <Link className="text-blue-500 hover:text-blue-700" href="/sustainability-reporting">
                Learn more about Our Use Case
              </Link>
            )}
            {activeUseCase.heading === "Performance Management" && (
              <Link className="text-blue-500 hover:text-blue-700" href="/performance-management">
                Learn more about Our Use Case
              </Link>
            )}
            {activeUseCase.heading === "Emission Tracking" && (
              <Link className="text-blue-500 hover:text-blue-700" href="/emission-tracking">
                Learn more about Our Use Case
              </Link>
            )}
          </div>
          <div className="flex justify-center items-center w-full md:w-1/2">
            <video
              className="w-full h-auto rounded-lg shadow-md"
              controls
              src={activeUseCase.videoSrc}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
