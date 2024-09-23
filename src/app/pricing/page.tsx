'use client';

import React, { useState } from 'react';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

interface Feature {
  text: string;
  included: boolean;
}

interface PricingTier {
  title: string;
  price: number;
  features: Feature[];
  recommended?: boolean;
}

const PricingTierComponent: React.FC<PricingTier & { onChoosePlan: (plan: string) => void; isSelected: boolean }> = ({ 
  title, 
  price, 
  features, 
  recommended, 
  onChoosePlan,
  isSelected
}) => (
  <div className={`bg-white p-6 rounded-lg shadow-md flex flex-col h-full ${recommended ? 'border-2 border-green-500' : ''} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
    <div className="flex-grow">
      {recommended && (
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
          Recommended
        </span>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-4">${price}<span className="text-sm font-normal">/month</span></p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className={`w-4 h-4 mr-2 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
    <button 
      onClick={() => onChoosePlan(title)}
      className={`w-full py-2 px-4 rounded ${isSelected ? 'bg-blue-500 hover:bg-blue-600 text-white' : recommended ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition duration-200`}
    >
      {isSelected ? 'Selected' : 'Choose Plan'}
    </button>
  </div>
);

const ESGPricingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const pricingTiers: PricingTier[] = [
    {
      title: 'Basic ESG',
      price: 49,
      features: [
        { text: 'ESG Report Generation', included: true },
        { text: 'Carbon Footprint Calculator', included: true },
        { text: 'Basic Sustainability Metrics', included: true },
        { text: 'Email Support', included: true },
        { text: 'Advanced Analytics', included: false },
      ]
    },
    {
      title: 'Professional ESG',
      price: 99,
      features: [
        { text: 'All Basic Features', included: true },
        { text: 'Advanced ESG Analytics', included: true },
        { text: 'Customizable Dashboards', included: true },
        { text: 'Regulatory Compliance Tools', included: true },
        { text: 'Priority Support', included: true },
      ],
      recommended: true
    },
    {
      title: 'Enterprise ESG',
      price: 199,
      features: [
        { text: 'All Professional Features', included: true },
        { text: 'AI-Powered ESG Insights', included: true },
        { text: 'Supply Chain ESG Tracking', included: true },
        { text: 'Stakeholder Engagement Tools', included: true },
        { text: 'Dedicated Account Manager', included: true },
      ]
    }
  ];

  const handleChoosePlan = (planTitle: string) => {
    setSelectedPlan(planTitle);
    console.log(`Chosen plan: ${planTitle}`);
    // Here you would typically handle the plan selection, e.g., redirect to a checkout page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className=" mt-10 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ESG Solutions Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the right plan for your organization's ESG needs
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {pricingTiers.map((tier, index) => (
              <PricingTierComponent 
                key={index} 
                {...tier} 
                onChoosePlan={handleChoosePlan} 
                isSelected={selectedPlan === tier.title}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ESGPricingPage;