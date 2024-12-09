import React from 'react';
import Image from 'next/image';
import { 
  ChartBarIcon, 
  CloudIcon, 
  DocumentCheckIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/solid';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

const ChemicalSectors = () => {
  const challengesData = [
    {
      title: "Hazardous Materials and Scope 3 Emissions",
      description: "Managing emissions from the direct handling of hazardous materials and the indirect impact across complex supply chains can be difficult",
      Icon: CloudIcon
    },
    {
      title: "Energy-Intensive Production",
      description: "The chemical sector is one of the most energy-intensive industries, resulting in high emissions that require innovative energy-saving solutions",
      Icon: GlobeAltIcon
    },
    {
      title: "Constant Regulatory Changes",
      description: "Environmental regulations are continuously evolving, making compliance a moving target",
      Icon: DocumentCheckIcon
    },
    {
      title: "Demand for Greener Processes",
      description: "There is increasing pressure to innovate and adopt more sustainable, low-impact production methods",
      Icon: ChartBarIcon
    }
  ];

  const solutionsData = [
    {
      title: "Lifecycle Emissions Management",
      description: "​Rubicr’s platform tracks emissions throughout the entire lifecycle of your operations, offering insights for targeted reductions",
      Icon: CloudIcon
    },
    {
      title: "Energy Efficiency Optimization",
      description: "Implement energy-efficient strategies to minimize costs and reduce emissions, improving overall sustainability​",
      Icon: ChartBarIcon
    },
    {
      title: "Custom Dashboards for Site-Specific Emissions",
      description: "Rubicr enables you to visualize emissions data by equipment and location, empowering informed decision-making",
      Icon: DocumentCheckIcon
    },
    {
      title: "Regulatory ComplianceRegulatory Compliance Support",
      description: "ur team provides expert guidance to help you stay ahead of shifting environmental laws and regulations",
      Icon: GlobeAltIcon
    }
  ];

  return (
    <div className="bg-white antialiased">
      <Navbar />
      
      {/* Hero Section */}
    {/* Header Section */}
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/chemical.avif")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold mb-4">Sustainability Solutions for</h1>
          <h1 className="text-4xl font-bold mb-4"> the Chemical Industry </h1>
          {/* <p className="text-xl mb-8">Explore tailored solutions to optimize your operations.</p> */}
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            Talk to an Expert
          </button>
        </div>
      </div>

      {/* Challenges Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Sustainability Challenges in the Chemical Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In the chemical industry, ESG is essential to mitigating environmental risks, enhancing energy efficiency, and maintaining compliance with stringent regulations. Companies must not only reduce their carbon footprint but also ensure the responsible management of hazardous materials and the implementation of sustainable production methods
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {challengesData.map((challenge, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex items-center mb-5">
                  <challenge.Icon 
                    className="mr-5 w-12 h-12 text-yellow-500 group-hover:text-yellow-600 transition-colors"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {challenge.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Solutions for Sustainability Challenges in the Chemical Industry            </h2>
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage our advanced technologies and expertise to transform your automotive logistics into a model of environmental efficiency.
            </p> */}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {solutionsData.map((solution, index) => (
              <div 
                key={index} 
                className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex items-center mb-5">
                  <solution.Icon 
                    className="mr-5 w-12 h-12 text-green-500 group-hover:text-green-600 transition-colors"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {solution.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-200 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Key Features of Our Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to address the most critical sustainability challenges in automotive logistics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Emissions Reduction",
                description: "Advanced strategies to minimize carbon footprint across your logistics network.",
                Icon: CloudIcon
              },
              {
                title: "Data-Driven Insights",
                description: "Real-time analytics and reporting for informed decision-making.",
                Icon: ChartBarIcon
              },
              {
                title: "Compliance Management",
                description: "Seamless navigation of complex environmental regulations.",
                Icon: DocumentCheckIcon
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <feature.Icon 
                  className="mx-auto mb-5 w-16 h-16 text-blue-500 group-hover:text-blue-600 transition-colors"
                />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="py-10">

<section className="bg-gradient-to-r from-yellow-500 to-yellow-700 py-20 mx-8 md:mx-20 rounded-3xl mb-20 shadow-2xl">
<div className="max-w-screen-xl mx-auto px-4 text-center">
  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Started Today</h2>
  <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
  <p className="text-xl md:text-2xl mb-8 text-white">Ready to transform your ESG Performance?</p>
  <Button label="Schedule a demo" background="#FFCD1B" color="white" href="/contact-us" />
</div>
</section>
</div>

      <Footer />
    </div>
  );
};

export default ChemicalSectors;