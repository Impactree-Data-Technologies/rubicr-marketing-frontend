import { useState } from "react";

const moduleData = {
  "Sustainability Reporting": {
    subheading: "Sustainability Reporting",
    cards: [
      {
        heading: "Extensive Standards Database",
        description: "Select from our supported standards or build your own standards database.",
      },
      {
        heading: "Task Management",
        description: "Collect data from authorised sources with validation using our maker-checker validation principle",
      },
      {
        heading: "Sustainable Intelligence Rating",
        description: "Link all relevant ESG databases to our Sustainable Intelligence engine to give numeric scores to track your sustainability performance",
      },
      {
        heading: "Performance Benchmarks",
        description: "Understand performance of peers through our benchmarking layer collating data from public sources",
      },
    ],
  },
  "Performance Management": {
    subheading: "Performance Management",
    cards: [
      {
        heading: "Supply Chain Tracking",
        description: "Integrate your supply chain into the ESG journey with custom surveys",
      },
      {
        heading: "Track Key Operational Indicators",
        description: "Link with individual equipment indicators, including energy, water and waste management",
      },
      {
        heading: "Easy to understand ESG pillars",
        description: "Track key sustainability metrics across our ESG pillars or customised to your organisation",
      },
      {
        heading: "Governance Tracker",
        description: "Integrate governance using our legal templates to track compliance",
      },
      {
        heading: "Social Tracker",
        description: "Track Human Resources and Community indicators using our platform integrationse",
      },
    ],
  },
  "Emission Tracking": {
    subheading: "Emission Tracking",
    cards: [
      {
        heading: "Scope-1 & Scope-2 accounting",
        description: "Track individual level Scope-1 and scope-2 emission at the equipment level",
      },
      {
        heading: "Scope-3 tracking",
        description: "Track and Report scope-3 emissions data using custom databases aligned to the GHG protocol",
      },
      {
        heading: "Non GHG Emissions Management",
        description: "Expand beyond Carbon emissions with Non-GHG emissions based tracking for reporting accuracy",
      },
      {
        heading: "Unit wise tracking",
        description: "Link aggregate level emissions with individual equipment consumption to track Op. efficiencies and identify candidates for performance improvement",
      },
    ],
  },
};

export default function Module() {
  const [activeModule, setActiveModule] = useState("Sustainability Reporting");

  const handleModuleClick = (module) => {
    setActiveModule(module);
  };

  return (
    <div className="py-8 px-4 md:px-8 bg-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-8 text-center md:text-left">
          Module
        </h1>
        <div className="mb-8 text-lg text-gray-700 dark:text-gray-300 flex flex-wrap justify-center md:justify-start">
          {Object.keys(moduleData).map((module) => (
            <button
              key={module}
              className={`text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-500 focus:outline-none mr-4 ${
                activeModule === module ? "underline" : ""
              }`}
              onClick={() => handleModuleClick(module)}
            >
              {module}
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-start items-start space-y-4 mt-8">
          <div className="flex flex-col justify-start p-6 bg-white dark:bg-gray-800 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {moduleData[activeModule].subheading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {moduleData[activeModule].cards.map((card, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.heading}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
