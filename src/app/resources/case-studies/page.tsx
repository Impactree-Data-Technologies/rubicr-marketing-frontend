"use client"
import React from 'react';
import Image from 'next/image';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";

interface StatItemProps {
  number: string;
  description: string;
}

const StatItem: React.FC<StatItemProps> = ({ number, description }) => (
  <div className="text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-2">{number}</h2>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

interface CaseStudyCardProps {
  image: string;
  tag: string;
  title: string;
  description: string;
  tags: string[];
  buttonText: string;
  onClick?: () => void;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  image, 
  tag, 
  title, 
  description, 
  tags, 
  buttonText, 
  onClick 
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
    <div className="relative h-48">
      <Image 
        src={image} 
        alt={title} 
        layout="fill" 
        objectFit="cover" 
        className="transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <span className="text-xs font-semibold text-pink-500">{tag}</span>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <button 
        onClick={onClick}
        className="mt-4 w-full bg-emerald-500 text-white rounded-md py-2 hover:bg-emerald-600 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  </div>
);

const CaseStudies: React.FC = () => {
  const caseStudies = [
    {
      image: "/case-study-1.jpg",
      tag: "Digital Transformation",
      title: "Sustainable Tech Solutions",
      description: "Innovative approach to reducing carbon footprint in digital infrastructure.",
      tags: ["Green Tech", "Carbon Neutrality"],
      buttonText: "View Case Study"
    },
    {
      image: "/case-study-2.jpg",
      tag: "Energy Efficiency",
      title: "Renewable Energy Integration",
      description: "Transforming traditional energy models through cutting-edge sustainable practices.",
      tags: ["Renewable Energy", "Climate Action"],
      buttonText: "View Case Study"
    },
    {
      image: "/case-study-3.jpg",
      tag: "Corporate Sustainability",
      title: "Zero Waste Initiative",
      description: "Comprehensive strategy for minimizing waste and maximizing resource efficiency.",
      tags: ["Circular Economy", "Waste Reduction"],
      buttonText: "View Case Study"
    },
    {
      image: "/case-study-4.jpg",
      tag: "Green Innovation",
      title: "Smart City Solutions",
      description: "Implementing sustainable urban development through intelligent technologies.",
      tags: ["Urban Planning", "Smart Cities"],
      buttonText: "View Case Study"
    },
    {
      image: "/case-study-5.jpg",
      tag: "Environmental Impact",
      title: "Carbon Credit Program",
      description: "Developing innovative carbon offset strategies for global businesses.",
      tags: ["Carbon Credits", "Sustainability"],
      buttonText: "View Case Study"
    },
    {
      image: "/case-study-6.jpg",
      tag: "Circular Economy",
      title: "Supply Chain Optimization",
      description: "Revolutionizing supply chain management for maximum sustainability.",
      tags: ["Supply Chain", "Efficiency"],
      buttonText: "View Case Study"
    }
  ];

  const handleCaseStudyClick = (title: string) => {
    // Placeholder for case study navigation or modal
    console.log(`Clicked case study: ${title}`);
    // In a real implementation, this would navigate to a detailed case study page
    // or open a modal with more information
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Transforming Businesses Through Sustainable Innovation
            </h1>
            <p className="text-lg mb-6 opacity-90">
              We empower companies to achieve their sustainability goals through cutting-edge strategies, 
              comprehensive carbon management, and innovative environmental solutions.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                Learn More
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-emerald-500 transition">
                Contact Us
              </button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/sustainability-hero.jpg"
                alt="Sustainability Innovation"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem
              number="2,500+"
              description="Businesses Transformed"
            />
            <StatItem
              number="500,000+"
              description="Tons of CO2 Reduced"
            />
            <StatItem
              number="25+"
              description="Industries Served"
            />
            <StatItem
              number="95%"
              description="Client Satisfaction Rate"
            />
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Impactful Case Studies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore how weve helped diverse businesses across industries 
              achieve their sustainability goals and drive meaningful environmental change.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard 
                key={index} 
                {...study} 
                onClick={() => handleCaseStudyClick(study.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Sustainability Strategy?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Our expert team is ready to help you develop a comprehensive, 
            innovative approach to sustainability that drives business value.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition">
              Schedule Consultation
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-emerald-500 transition">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CaseStudies;