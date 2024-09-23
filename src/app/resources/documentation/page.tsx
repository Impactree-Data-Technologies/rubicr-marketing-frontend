import React from 'react';
import { Search, Book, Newspaper } from 'lucide-react';
import Navbar from "../../Components/navbar";

const KnowledgeBasePage = () => {
  const documentationSections = [
    {
      title: 'Base Platform',
      items: [
        'Logging In to Rubicr',
        'Finding What You Are Looking For',
        'Managing Account Data',
        'Account Data Quality'
       
      ]
    },
    {
      title: 'System Administration',
      items: [
        'Managing Password Policies',
        'Setting up Contacts + Logins',
        'Setting up Locations',
        'Setting up Accounts'
      ]
    },
    {
      title: 'PowerReports',
      items: [
        'Introducing PowerReport',
        'PowerReport Standard Content',
        'Export to PDF & PowerPoint',
        'Share a link to a PowerReport via email'
      ]
},
    {
      title: 'Sustainability Data Management + Reporting',
      items: [
        'GRI Climate 2021',
        'TCFD Reporting',
        'NGERS Reporting',
        'Carbon Accounting'
      ]
    },
    {
      title: 'Targets',
      items: [
        'Target Tracking',
        'Setting up Targets',
        'Target Details',
        'Target Performance'
      ]
    },
    {
      title: 'Building Ratings and Benchmarks',
      items: [
        'NABERS',
        'Energy Star',
        'GRESB',
        'Setting up Building Ratings',
      ]
    }
  ];

  return (
      
    <div className="min-h-screen bg-gray-100 ">
      {/* Header Section */}
    
      <div className="relative bg-gray-800 text-white overflow-hidden ">
      <Navbar />
        {/* Background graphics */}
        <div className="absolute inset-0 mb-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4a5568', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#2d3748', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" />
            <path d="M0,0 L100,0 L100,50 Q50,100 0,50 Z" fill="#919a3c" opacity="0.1" />
            <path d="M100,100 L0,100 L0,50 Q50,0 100,50 Z" fill="#9a953c" opacity="0.1" />
            <circle cx="0" cy="0" r="5" fill="#919a3c" />
            <circle cx="100" cy="0" r="5" fill="#919a3c" />
            <circle cx="0" cy="100" r="5" fill="#919a3c" />
            <circle cx="100" cy="100" r="5" fill="#919a3c" />
            <path d="M0,50 Q25,25 50,50 T100,50" stroke="#919a3c" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Rubicr</h1>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              LOG A TICKET
            </button>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Knowledge Base
          </h2>
          <p className="text-xl mb-8">How can we help you?</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search the knowledge base..."
              className="w-full py-3 px-4 pr-12 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* News Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Newspaper className="w-6 h-6 mr-2 text-purple-600" />
            News
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Sandbox AddOn released</h4>
              <p className="text-gray-600">September 04, 2024</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">ESRS SRM Framework released</h4>
              <p className="text-gray-600">August 19, 2024</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">ESRS account styles released</h4>
              <p className="text-gray-600">August 09, 2024</p>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div> 
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Book className="w-6 h-6 mr-2 text-purple-600" />
            Documentation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentationSections.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-xl font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 hover:text-purple-600 cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;