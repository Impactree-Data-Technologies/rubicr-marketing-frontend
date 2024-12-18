import React from 'react';
import { 
  ChartBarIcon, 
  CloudIcon, 
  DocumentCheckIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/solid';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

const AutomobileSectors = () => {
  const challengesData = [
    {
      title: "Complexity of Scope 3 Emissions",
      description: "Automakers face the challenge of managing emissions across vast and intricate supply chains, spanning multiple suppliers and logistics partners",
      Icon: CloudIcon
    },
    {
      title: "Increasing Regulatory Pressure",
      description: "Global and local emissions standards are becoming more stringent, requiring companies to stay ahead of evolving laws",
      Icon: GlobeAltIcon
    },
    {
      title: "Consumer Demand for Greener Vehicles",
      description: "Customers increasingly seek eco-friendly vehicles, raising the bar for sustainability innovation in manufacturing and design",
      Icon: DocumentCheckIcon
    },
    {
      title: "Supplier Transparency Issues",
      description: "Limited visibility into supplier sustainability practices makes ensuring ESG compliance across the supply chain difficult",
      Icon: ChartBarIcon
    }
  ];

  const solutionsData = [
    {
      title: "Comprehensive Scope 3 Management",
      description: "Rubicr helps you track, manage, and reduce emissions throughout your supply chain",
      Icon: CloudIcon
    },
    {
      title: "Regulatory Compliance Expertise",
      description: "We provide in-depth, localized insights to help you navigate evolving regulations and stay compliant",
      Icon: ChartBarIcon
    },
    {
      title: "Custom Emission Dashboards",
      description: "Our tailored dashboards allow you to monitor emissions by location and equipment, enabling focused, data-driven reductions",
      Icon: DocumentCheckIcon
    },
    {
      title: "Supplier Collaboration Tools",
      description: "Facilitate improved sustainability practices by seamlessly engaging with suppliers and encouraging collaboration on green initiatives",
      Icon: GlobeAltIcon
    }
  ];

  const featuresData = [
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
  ];

  const CardSection = ({ data, title, subtitle, bgColor = "bg-white", textColor = "text-gray-800", iconColor = "text-blue-500", gridCols = "md:grid-cols-2 lg:grid-cols-2" }) => (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className={`grid ${gridCols} gap-6`}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex flex-col items-center text-center">
                <item.Icon 
                  className={`mb-4 w-12 h-12 ${iconColor} group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-white antialiased">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: 'url("/automobile.avif")', 
          backgroundPosition: 'center center' 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Sustainability Solutions
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white">
            for Auto-ancillary
          </h2>
          <Button 
            label="Talk to an Expert" 
            background="#FFCD1B" 
            color="white" 
            href="/contact-us"
            className="px-6 py-3 rounded-lg text-base md:text-lg"
          />
        </div>
      </div>

      {/* Challenges Section */}
      <CardSection 
        data={challengesData} 
        title="Sustainability Challenges in the Auto Ancillary Industry"
        subtitle="Sustainability is now a competitive advantage in the automotive sector. ESG initiatives can drive profit and operational excellence by improving efficiency, reducing costs, and meeting consumer demand for sustainability."
        bgColor="bg-gray-50"
        iconColor="text-yellow-500"
      />

      {/* Solutions Section */}
      <CardSection 
        data={solutionsData} 
        title="Our Solutions to Challenges in Auto Ancillary Sustainability"
        bgColor="bg-white"
        iconColor="text-green-500"
        gridCols="md:grid-cols-2 lg:grid-cols-2"
      />

      {/* Features Highlight */}
      <CardSection 
        data={featuresData} 
        title="Key Features of Our Approach"
        subtitle="Comprehensive solutions designed to address the most critical sustainability challenges in automotive logistics."
        bgColor="bg-gradient-to-br from-blue-100 to-blue-200"
        iconColor="text-blue-500"
        gridCols="grid-cols-1 md:grid-cols-3"
      />

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 py-16 rounded-3xl shadow-2xl">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Get Started Today
            </h2>
            <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
            <p className="text-xl md:text-2xl mb-8 text-white">
              Ready to transform your ESG Performance?
            </p>
            <Button 
              label="Schedule a demo" 
              background="#FFCD1B" 
              color="white" 
              href="/contact-us"
              className="px-6 py-3 rounded-lg text-base md:text-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomobileSectors;
