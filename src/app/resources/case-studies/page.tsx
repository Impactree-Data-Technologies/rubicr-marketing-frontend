import React from 'react';
import Image from 'next/image';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

const StatItem = ({ number, description }) => (
  <div className="text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-2">{number}</h2>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const CaseStudyCard = ({ image, tag, title, description, tags, buttonText }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-48">
      <Image src={image} alt={title} layout="fill" objectFit="cover" />
    </div>
    <div className="p-4">
      <span className="text-xs font-semibold text-pink-500">{tag}</span>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs bg-gray-200 rounded-full px-2 py-1">{tag}</span>
        ))}
      </div>
      <button className="mt-4 w-full bg-white text-gray-800 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition-colors">
        {buttonText}
      </button>
    </div>
  </div>
);

const CaseStudies = () => {
  const caseStudies = [
    {
      image: "/merge-it.jpg",
      tag: "Case Study",
      title: "Merge IT",
      description: "Merge IT, we are proud to announce that we have finalized a complete audit with Greenly!",
      tags: ["Digital & Technology", "Carbon Accounting"],
      buttonText: "Open"
    },
    {
      image: "/wind-turbines.jpg",
      tag: "Pdf",
      title: "Tech Carbon Footprint Report",
      description: "This report acts as an example of a Greenly Tech Carbon Footprint Report!",
      tags: ["Digital & Technology", "Carbon Accounting"],
      buttonText: "Open"
    },
    {
      image: "/easy-vista.jpg",
      tag: "Case Study",
      title: "Easy Vista",
      description: "\"We have led the way among companies our size with our profound commitment to CSR, an...",
      tags: ["Digital & Technology"],
      buttonText: "Open"
    },
    {
      image: "/tenth-revolution.jpg",
      tag: "Case Study",
      title: "Tenth Revolution Group",
      description: "Today, we are proud to announce that we have finalized a complete audit with Greenly in orde...",
      tags: ["Digital & Technology"],
      buttonText: "Open"
    },
    {
      image: "/payfit.jpg",
      tag: "Case Study",
      title: "PayFit",
      description: "When PayFit contacted Greenly, its objective was to easily carry out an initial GHG...",
      tags: ["Digital & Technology"],
      buttonText: "Open"
    },
    {
      image: "/platform-sh.jpg",
      tag: "Case Study",
      title: "Platform.sh",
      description: "Today, Platform.sh is proud to announce the completion of their second carbon assessmen...",
      tags: ["Digital & Technology"],
      buttonText: "Open"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Header section */}
      <section className="bg-yellow-500 text-white p-6 md:p-12 lg:p-24 py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Companies that are making the world a better place
            </h1>
            <p className="text-lg mb-6">
              With over 2000 clients, Rubicr manages more than 40 million tons of CO2
              equivalent, which is approximately 8% of French emissions. Amidst new
              worldwide regulations and current situation requirements, an increasing
              number of companies are taking the step to conduct a Greenhouse Gas
              Inventory (GHG Inventory) in order to reduce their footprint.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src="/sports.jpg"
                alt="Illustrative image"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white rounded-full p-4 shadow-lg">
                  <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem
              number="+2000"
              description="clients have already committed to the climate with Greenly"
            />
            <StatItem
              number="+20"
              description="Industries trust Greenly"
            />
            <StatItem
              number="+40M"
              description="tCO2e are managed by our team of experts"
            />
            <StatItem
              number="+500000"
              description="approved emission factors from client and industry databases"
            />
          </div>
        </div>
      </section>

      {/* Case Studies section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CaseStudies;